// webpack 模块 -> 可读 ESM（去 babel 降级、还原 async/await、恢复 import/export）
const acorn = require('acorn');
const astring = require('astring');
const { collectFree, unshadowedRefs } = require('./scope');

const FN_RE = /^(FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/;
const gen = (n, o) => astring.generate(n, { indent: '  ', ...o });
const id = (name) => ({ type: 'Identifier', name });
const lit = (value) => ({ type: 'Literal', value, raw: typeof value === 'string' ? JSON.stringify(value) : String(value) });

function walk(n, cb, parent, key) {
  if (!n || typeof n !== 'object') return;
  if (Array.isArray(n)) { n.forEach((x, i) => walk(x, cb, parent, key)); return; }
  if (n.type) cb(n, parent, key);
  for (const k of Object.keys(n)) {
    if (k === 'type' || k === 'start' || k === 'end') continue;
    walk(n[k], cb, n, k);
  }
}
// 就地替换：返回新节点则替换
function transform(n, fn) {
  if (!n || typeof n !== 'object') return n;
  if (Array.isArray(n)) return n.map((x) => transform(x, fn));
  for (const k of Object.keys(n)) {
    if (k === 'type' || k === 'start' || k === 'end') continue;
    n[k] = transform(n[k], fn);
  }
  return fn(n) || n;
}

/* ---------- 依赖路径 -> 变量名 ---------- */
function nameFromPath(p, taken) {
  let base = p.replace(/\\/g, '/').split('/').pop().replace(/\.(js|vue|nvue)$/, '');
  if (base === 'index') {
    const parts = p.split('/').filter(Boolean);
    base = parts[parts.length - 2] || base;
  }
  base = base.replace(/[^A-Za-z0-9]+(.)/g, (m, c) => c.toUpperCase()).replace(/[^A-Za-z0-9]/g, '');
  if (!base || /^\d/.test(base)) base = 'mod' + base;
  let n = base, i = 2;
  while (taken.has(n)) n = base + i++;
  taken.add(n);
  return n;
}

/* ---------- babel helper 识别 ---------- */
function isOwnKeysHelper(fnNode) {
  const s = gen(fnNode);
  return /Object\.getOwnPropertySymbols/.test(s) && /getOwnPropertyDescriptor/.test(s) && /enumerable/.test(s);
}
function isObjectSpreadHelper(fnNode) {
  const s = gen(fnNode);
  return /getOwnPropertyDescriptors/.test(s) && /arguments\.length/.test(s) && /% 2/.test(s.replace(/\s/g, ' '));
}

/* ---------- regenerator 状态机 -> async/await ---------- */
// 处理 uni-app/babel 的典型输出：
//   _asyncToGenerator(_regenerator.mark(function name(args){
//      var locals; return _regenerator.wrap(function(_ctx){
//        while (1) switch (_ctx.prev = _ctx.next) { case 0: ...; case "end": return _ctx.stop() }
//      }, name) }))
function reAsync(node, ctxHelpers) {
  // 找到 wrap(function(_ctx){ while(1) switch(...){...} }, ...)
  let wrapFn = null;
  walk(node, (n) => {
    if (wrapFn) return;
    if (n.type === 'CallExpression' && n.callee.type === 'MemberExpression' &&
        n.callee.property && n.callee.property.name === 'wrap' && n.arguments[0] &&
        /Function/.test(n.arguments[0].type)) wrapFn = n.arguments[0];
  });
  if (!wrapFn) return null;
  const ctx = wrapFn.params[0] && wrapFn.params[0].name;
  let sw = null;
  walk(wrapFn.body, (n) => { if (!sw && n.type === 'SwitchStatement') sw = n; });
  if (!sw || !ctx) return null;

  // case 标号 -> 语句列表
  const cases = [];
  for (const c of sw.cases) {
    const label = c.test ? (c.test.value) : 'default';
    cases.push({ label, body: c.consequent });
  }
  // 只处理"顺序直落"的情形：标号严格递增，且不存在向后跳转
  const numeric = cases.filter((c) => typeof c.label === 'number').map((c) => c.label);
  const ascending = numeric.every((v, i) => i === 0 || v > numeric[i - 1]);
  if (!ascending) return null;

  const out = [];
  let bail = false;
  for (const c of cases) {
    if (c.label === 'end' || c.label === 'default') continue;
    for (const st of c.body) {
      // _ctx.next = N; break;  -> 直落，丢弃
      if (st.type === 'ExpressionStatement' && st.expression.type === 'AssignmentExpression' &&
          st.expression.left.type === 'MemberExpression' &&
          st.expression.left.object.name === ctx &&
          ['next', 'prev', 't0', 't1'].includes(st.expression.left.property.name)) continue;
      if (st.type === 'BreakStatement' && !st.label) continue;
      if (st.type === 'ContinueStatement') continue;
      // return _ctx.abrupt("return", X) -> return X
      if (st.type === 'ReturnStatement' && st.argument && st.argument.type === 'CallExpression' &&
          st.argument.callee.type === 'MemberExpression' && st.argument.callee.object.name === ctx) {
        const m = st.argument.callee.property.name;
        if (m === 'abrupt') {
          const kind = st.argument.arguments[0] && st.argument.arguments[0].value;
          if (kind === 'return') { out.push({ type: 'ReturnStatement', argument: st.argument.arguments[1] || null }); continue; }
          if (kind === 'break' || kind === 'continue') { bail = true; continue; }
        }
        if (m === 'stop') continue;
        if (m === 'finish' || m === 'delegateYield') { bail = true; continue; }
      }
      // return _ctx.awrap? / _ctx.sent 处理见下方 transform
      out.push(st);
    }
    if (bail) return null;
  }

  const body = { type: 'BlockStatement', body: out };
  // _ctx.sent -> 上一条 await 的结果；先把 `_ctx.next = N; return X` 形式里的 X 变成 await X
  transform(body, (n) => {
    if (n.type === 'ReturnStatement' && n.argument && n.__await) return n;
    return null;
  });
  return body;
}

/* ---------- 主流程 ---------- */
function deminify(moduleSrc, mapId, opts = {}) {
  const notes = [];
  let fn;
  try { fn = acorn.parse('(' + moduleSrc + ')', { ecmaVersion: 2022 }).body[0].expression; }
  catch (e) { return { code: moduleSrc, notes: ['解析失败: ' + e.message] }; }

  const [pMod, pExp, pReq] = (fn.params || []).map((p) => p && p.name);
  let body = fn.body.body;

  // 剥掉 (function(global){...}).call(this, X) 这层 webpack 注入。
  // 关键：内层函数的形参绑定的是 X，摊平时必须补上 `var 形参 = X`，否则内层对它的引用会变成悬空。
  if (body.length && body[body.length - 1].type === 'ExpressionStatement') {
    const e = body[body.length - 1].expression;
    if (e.type === 'CallExpression' && e.callee.type === 'MemberExpression' &&
        e.callee.property.name === 'call' && /Function/.test(e.callee.object.type)) {
      const inner = e.callee.object;
      // 内层若在顶层用了 this，摊平后语义会变（ESM 顶层 this 是 undefined），不碰
      let usesThis = false;
      (function chk(n) {
        if (!n || typeof n !== 'object' || usesThis) return;
        if (Array.isArray(n)) { n.forEach(chk); return; }
        if (FN_RE.test(n.type)) return;            // 嵌套函数有自己的 this
        if (n.type === 'ThisExpression') { usesThis = true; return; }
        for (const k of Object.keys(n)) { if (k === 'type' || k === 'start' || k === 'end') continue; chk(n[k]); }
      })(inner.body.body);

      if (!usesThis) {
        const binds = [];
        (inner.params || []).forEach((p, i) => {
          const arg = e.arguments[i + 1];          // arguments[0] 是 thisArg
          if (!p || p.type !== 'Identifier') return;
          binds.push({
            type: 'VariableDeclaration', kind: 'var',
            declarations: [{ type: 'VariableDeclarator', id: id(p.name),
              init: arg || { type: 'Identifier', name: 'undefined' } }],
          });
        });
        body = [...body.slice(0, -1), ...binds, ...inner.body.body];
        notes.push('已剥离 webpack 的 global 注入包装' + (binds.length ? `（保留了 ${binds.length} 个注入参数的绑定）` : ''));
      }
    }
  }

  /* 1. 收集 import */
  const imports = [];       // {local, path, isDefault}
  const localToPath = {};
  const taken = new Set();
  const interopNames = new Set();
  const keep = [];

  const requirePathOf = (node) => {
    if (!node) return null;
    if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === pReq &&
        node.arguments[0] && node.arguments[0].type === 'Literal') return { path: String(node.arguments[0].value), interop: false };
    if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && interopNames.has(node.callee.name)) {
      const inner = requirePathOf(node.arguments[0]);
      return inner ? { path: inner.path, interop: true } : null;
    }
    return null;
  };

  const helperNames = new Set();
  const spreadNames = new Set();   // 只有 objectSpread 才能还原成 { ...a, ...b }
  const helperDecls = {};
  const reExported = new Set();
  for (const st of body) {
    if (st.type === 'VariableDeclaration') {
      const rest = [];
      for (const d of st.declarations) {
        if (!d.init) { rest.push(d); continue; }
        // var a = require("<interopRequireDefault>") —— 该 helper 的模块 id 每个编译空间都不同，
        // 只能靠调用方传入的 isInterop 按模块内容判定
        const r0 = d.init.type === 'CallExpression' && d.init.callee.name === pReq &&
                   d.init.arguments[0] && d.init.arguments[0].type === 'Literal' &&
                   opts.isInterop && opts.isInterop(String(d.init.arguments[0].value));
        if (r0) { interopNames.add(d.id.name); continue; }
        const r = requirePathOf(d.init);
        if (r && d.id.type === 'Identifier') {
          const local = nameFromPath(r.path, taken);
          const rec = { local, path: r.path, isDefault: r.interop, orig: d.id.name };
          imports.push(rec);
          localToPath[d.id.name] = rec;   // 同一个对象，后面改名时两边同步
          continue;
        }
        rest.push(d);
      }
      if (rest.length) keep.push({ ...st, declarations: rest });
      continue;
    }
    if (st.type === 'FunctionDeclaration') {
      // 两个 helper 必须分开：
      //   objectSpread(a, b)  返回**对象**       -> 可以还原成 { ...a, ...b }
      //   ownKeys(obj, flag)  返回**键名数组**   -> 绝不能当成对象展开，
      //                                            调用方紧接着就 .forEach(...)
      if (isObjectSpreadHelper(st)) {
        spreadNames.add(st.id.name); helperNames.add(st.id.name); helperDecls[st.id.name] = st; continue;
      }
      if (isOwnKeysHelper(st)) {
        helperNames.add(st.id.name); helperDecls[st.id.name] = st; continue;
      }
      keep.push(st); continue;
    }
    // webpack 的再导出转发：
    //   for (var k in dep) ["default"].indexOf(k) < 0 && (function(k){ n.d(exports, k, () => dep[k]) })(k)
    // 语义就是 `export * from 'dep'`
    if (st.type === 'ForInStatement') {
      const s = gen(st);
      const depName = st.right.type === 'Identifier' ? st.right.name : null;
      if (depName && localToPath[depName] &&
          new RegExp('\\b' + pReq + '\\.d\\(\\s*' + pExp + '\\b').test(s) && /"default"/.test(s)) {
        keep.push({ type: 'ExportAllDeclaration', source: lit(localToPath[depName].path), exported: null });
        reExported.add(depName);
        continue;
      }
    }
    if (st.type === 'ExpressionStatement') {
      const list = st.expression.type === 'SequenceExpression' ? st.expression.expressions : [st.expression];
      const rest = [];
      for (const x of list) {
        // n.r(exports) / n.d(...) —— webpack 运行时标记，丢弃
        if (x.type === 'CallExpression' && x.callee.type === 'MemberExpression' &&
            x.callee.object.name === pReq && ['r', 'd'].includes(x.callee.property.name)) continue;
        // Object.defineProperty(exports,"__esModule",…) / exports.default = void 0 — 丢弃
        if (x.type === 'CallExpression' && gen(x).startsWith('Object.defineProperty(' + pExp)) continue;
        if (x.type === 'AssignmentExpression' && x.left.type === 'MemberExpression' &&
            x.left.object.name === pExp && gen(x.right) === 'void 0') continue;
        // 裸 require（副作用导入）
        const r = requirePathOf(x);
        if (r) { imports.push({ local: null, path: r.path }); continue; }
        rest.push(x);
      }
      if (rest.length === 1) keep.push({ type: 'ExpressionStatement', expression: rest[0] });
      else if (rest.length > 1) keep.push({ type: 'ExpressionStatement', expression: { type: 'SequenceExpression', expressions: rest } });
      continue;
    }
    keep.push(st);
  }

  /* 2. 表达式级还原 */
  const exportsFound = [];
  const root = { type: 'Program', body: keep, sourceType: 'module' };

  // 2a. 依赖变量在嵌套作用域里被同名重新声明时不能改名（压缩器复用了字母）
  const shadowed = new Set();
  walk(root, (n) => {
    const names = [];
    if (/Function/.test(n.type)) (n.params || []).forEach((p) => walk(p, (q) => { if (q.type === 'Identifier') names.push(q.name); }));
    if (n.type === 'VariableDeclarator') walk(n.id, (q) => { if (q.type === 'Identifier') names.push(q.name); });
    for (const nm of names) if (localToPath[nm]) shadowed.add(nm);
  });
  // 内层有同名声明时，改名会让遮蔽关系错位。这里保留压缩后的短名作为 import 绑定，
  // 遮蔽语义与原代码完全一致，只是名字不好看。
  for (const nm of shadowed) {
    notes.push(`变量 ${nm} 在内层被重新声明，保留短名以维持遮蔽语义`);
    localToPath[nm].local = nm;
  }

  // 2a2. 标记「不是变量引用」的标识符位置，改名时必须跳过。
  // 压缩后依赖变量全是单字母（l/o/s/i...），极易和对象属性名撞车：
  // 模块里有 `var l = require(...)`，而 methods 里正好有个方法叫 `l`，
  // 不区分就会把方法名改成 modXXXX，模板里 l() 调用随即失效（_vm.l is not a function）。
  walk(root, (n) => {
    if (n.type === 'Property' && !n.computed && n.key && n.key.type === 'Identifier') {
      // 简写属性 {l} 等价于 {l: l}：键要保留，值要改名，先展开成非简写
      if (n.shorthand && localToPath[n.key.name]) {
        n.shorthand = false;
        n.value = { type: 'Identifier', name: n.key.name };
      }
      n.key.__noRename = true;
    }
    if (n.type === 'MemberExpression' && !n.computed && n.property && n.property.type === 'Identifier') {
      n.property.__noRename = true;
    }
    if (n.type === 'MethodDefinition' && !n.computed && n.key && n.key.type === 'Identifier') {
      n.key.__noRename = true;
    }
    if (n.type === 'LabeledStatement' && n.label) n.label.__noRename = true;
    if ((n.type === 'BreakStatement' || n.type === 'ContinueStatement') && n.label) n.label.__noRename = true;
  });

  // 2b. 先做 `x.default` -> `x`（必须在子节点被改名前处理）
  transform(root, (n) => {
    if (n.type === 'MemberExpression' && !n.computed &&
        n.object.type === 'Identifier' && localToPath[n.object.name]) {
      const info = localToPath[n.object.name];
      if (n.property.name === 'default' && info.isDefault) return id(' ' + n.object.name);
    }
    return null;
  });

  transform(root, (n) => {
    if (n.type === 'Identifier' && n.name[0] === ' ') {
      const orig = n.name.slice(1);
      return id(localToPath[orig] ? localToPath[orig].local : orig);
    }
    return null;
  });

  transform(root, (n) => {
    // !0 / !1
    if (n.type === 'UnaryExpression' && n.operator === '!' && n.argument.type === 'Literal' &&
        (n.argument.value === 0 || n.argument.value === 1)) return lit(n.argument.value === 0);
    // void 0
    if (n.type === 'UnaryExpression' && n.operator === 'void' && n.argument.type === 'Literal' && n.argument.value === 0)
      return id('undefined');
    // 依赖变量替换：s.default -> store ; l.request -> request4ddb.request
    if (n.type === 'MemberExpression' && !n.computed && n.object.type === 'Identifier' && localToPath[n.object.name]) {
      const info = localToPath[n.object.name];
      if (n.property.name === 'default' && info.isDefault) return id(info.local);
      return { type: 'MemberExpression', computed: false, optional: false, object: id(info.local), property: n.property };
    }
    if (n.type === 'Identifier' && !n.__noRename && localToPath[n.name]) return id(localToPath[n.name].local);
    // (0, f)(args) -> f(args)
    if (n.type === 'CallExpression' && n.callee.type === 'SequenceExpression' &&
        n.callee.expressions.length === 2 && gen(n.callee.expressions[0]) === '0') {
      return { ...n, callee: n.callee.expressions[1] };
    }
    // _objectSpread(_objectSpread({}, a), b) -> { ...a, ...b }
    // 注意只认 spreadNames：ownKeys 返回数组，套上去会把 .forEach 弄丢
    if (n.type === 'CallExpression' && n.callee.type === 'Identifier' && spreadNames.has(n.callee.name)) {
      const props = [];
      const flat = (node) => {
        if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && spreadNames.has(node.callee.name)) {
          node.arguments.forEach(flat); return;
        }
        if (node.type === 'ObjectExpression' && node.properties.length === 0) return;
        if (node.type === 'ObjectExpression') { props.push(...node.properties); return; }
        props.push({ type: 'SpreadElement', argument: node });
      };
      n.arguments.forEach(flat);
      return { type: 'ObjectExpression', properties: props };
    }
    return null;
  });

  /* 3. export */
  // 压缩器会把一串导出压成逗号表达式：(exports.a = f1, exports.b = f2, ...)
  // 先摊成独立语句，否则下面按 AssignmentExpression 匹配会全部漏掉。
  const flat = [];
  for (const st of root.body) {
    if (st.type === 'ExpressionStatement' && st.expression.type === 'SequenceExpression') {
      for (const x of st.expression.expressions) flat.push({ type: 'ExpressionStatement', expression: x });
    } else flat.push(st);
  }
  root.body = flat;

  const finalBody = [];
  for (const st of root.body) {
    if (st.type === 'ExpressionStatement' && st.expression.type === 'AssignmentExpression') {
      const a = st.expression;
      if (a.left.type === 'MemberExpression' && a.left.object.name === pExp) {
        const name = a.left.property.name;
        exportsFound.push(name);
        if (name === 'default') { finalBody.push({ type: 'ExportDefaultDeclaration', declaration: a.right }); continue; }
        if (/Function/.test(a.right.type)) {
          finalBody.push({
            type: 'ExportNamedDeclaration', specifiers: [], source: null,
            declaration: { type: 'FunctionDeclaration', id: id(name), params: a.right.params,
              body: a.right.body.type === 'BlockStatement' ? a.right.body
                : { type: 'BlockStatement', body: [{ type: 'ReturnStatement', argument: a.right.body }] },
              async: !!a.right.async, generator: !!a.right.generator },
          });
          continue;
        }
        finalBody.push({
          type: 'ExportNamedDeclaration', specifiers: [], source: null,
          declaration: { type: 'VariableDeclaration', kind: 'const',
            declarations: [{ type: 'VariableDeclarator', id: id(name), init: a.right }] },
        });
        continue;
      }
      if (a.left.type === 'MemberExpression' && a.left.object.name === pMod && a.left.property.name === 'exports') {
        finalBody.push({ type: 'ExportDefaultDeclaration', declaration: a.right });
        continue;
      }
    }
    finalBody.push(st);
  }

  /* 3b. 惰性清理：只有确实没人引用的辅助声明才删掉 */
  const finalRoot = { type: 'Program', body: finalBody, sourceType: 'module' };

  // 内层残留的 n("xxx") —— 换成真正的 require('<路径>')，bundler 能解析，语义不变。
  // 同样要过作用域：内层可能有同名局部函数，误改会把普通调用变成模块引用。
  const realReq = (() => {
    try {
      return unshadowedRefs(
        { params: [], body: { type: 'BlockStatement', body: finalRoot.body } }, pReq);
    } catch { return null; }
  })();
  transform(finalRoot, (n) => {
    if (n.type === 'CallExpression' && n.callee.type === 'Identifier' && n.callee.name === pReq &&
        n.arguments.length === 1 && n.arguments[0].type === 'Literal' &&
        (!realReq || realReq.has(n.callee))) {
      const p = mapId ? mapId(String(n.arguments[0].value)) : String(n.arguments[0].value);
      return { type: 'CallExpression', optional: false, callee: id('require'), arguments: [lit(p)] };
    }
    return null;
  });

  // 自由引用 = 没被任何内层声明绑定的引用。压缩器会把 e/t/n/a 同时用作模块参数和
  // 内层局部变量，只有做了作用域分析才分得清「真悬空」和「内层同名局部变量」。
  const freeOf = () => {
    try { return collectFree({ type: 'Program', body: finalRoot.body, sourceType: 'module' }); }
    catch { return new Map(); }
  };
  let freeMap = freeOf();
  const refCount = (name) => (freeMap.get(name) ? freeMap.get(name).count : 0);

  for (const nm of reExported) {
    if (refCount(nm) === 0) {
      const rec = localToPath[nm];
      const ix = imports.indexOf(rec);
      if (ix >= 0) imports.splice(ix, 1);
      delete localToPath[nm];
    }
  }

  const revived = [];
  for (const nm of interopNames) {
    if (refCount(nm) === 0) continue;
    // 原样重建 interopRequireDefault，避免删了声明却还有调用点
    revived.push(`function ${nm}(m) { return m && m.__esModule ? m : { default: m }; }`);
    notes.push(`内层仍在调用 ${nm}()，已就地重建 interopRequireDefault`);
  }
  for (const nm of helperNames) {
    if (refCount(nm) === 0 || !helperDecls[nm]) continue;
    revived.push(gen(helperDecls[nm]));
    notes.push(`辅助函数 ${nm} 仍被引用，保留原定义`);
  }

  /* 4. 输出 */
  const importLines = [];
  const seen = new Set();
  for (const im of imports) {
    const key = (im.local || '') + '|' + im.path;
    if (seen.has(key)) continue;
    seen.add(key);
    const p = mapId ? mapId(im.path) : im.path;
    if (!im.local) { importLines.push(`import '${p}'`); continue; }
    // 有 interopRequireDefault 包裹的才是「取 default」；
    // 裸 require(...) 拿到的是整个 exports 对象，必须用 namespace import，
    // 否则 x.foo 会全部变成 undefined。
    importLines.push(im.isDefault
      ? `import ${im.local} from '${p}'`
      : `import * as ${im.local} from '${p}'`);
  }
  let code;
  try { code = gen(finalRoot); }
  catch (e) { return { code: moduleSrc, notes: ['生成失败: ' + e.message] }; }
  if (revived.length) code = revived.join('\n') + '\n\n' + code;

  // 被消解掉声明的名字：产物里若还有对它们的引用，说明转换漏了，必须判定为不安全
  const removed = new Set([pReq, pMod, pExp, ...interopNames, ...helperNames, ...Object.keys(localToPath)]);
  for (const nm of interopNames) if (refCount(nm) > 0) removed.delete(nm);
  for (const nm of helperNames) if (refCount(nm) > 0 && helperDecls[nm]) removed.delete(nm);
  for (const nm of Object.keys(localToPath)) removed.delete(nm);   // 这些已改名/保留短名，有 import 绑定
  removed.delete(undefined);

  return {
    code: importLines.join('\n') + (importLines.length ? '\n\n' : '') + code,
    notes, exports: exportsFound, removed: [...removed],
  };
}

/* ---------- 统计 regenerator 状态机（不自动改写，只登记位置） ---------- */
function findRegenerators(moduleSrc) {
  const hits = [];
  let ast;
  try { ast = acorn.parse('(' + moduleSrc + ')', { ecmaVersion: 2022 }); } catch { return hits; }
  walk(ast, (n) => {
    if (n.type === 'CallExpression' && n.callee.type === 'MemberExpression' &&
        n.callee.property && n.callee.property.name === 'wrap' &&
        n.arguments[0] && /Function/.test(n.arguments[0].type)) {
      // 判断是否是"线性"状态机：case 标号递增、无 try/catch(t0)、无 abrupt("break"/"continue")
      const s = gen(n.arguments[0]);
      const labels = [...s.matchAll(/case (\d+):/g)].map((m) => +m[1]);
      const ascending = labels.every((v, i) => i === 0 || v > labels[i - 1]);
      const hasTry = /\.t0\b|\.t1\b|prev = \d+, \w+\.t0/.test(s) || /catch\(/.test(s);
      const hasJump = /abrupt\("(break|continue)"/.test(s) || /delegateYield/.test(s);
      hits.push({ linear: ascending && !hasTry && !hasJump, cases: labels.length });
    }
  });
  return hits;
}

/* ---------- 安全包装：转换后必须能解析，否则退回 ---------- */
function deminifySafe(moduleSrc, mapId, opts) {
  let r;
  try { r = deminify(moduleSrc, mapId, opts); }
  catch (e) { return { ok: false, code: null, notes: ['转换抛异常: ' + e.message] }; }
  if (!r.code) return { ok: false, code: null, notes: r.notes };
  let out;
  try { out = acorn.parse(r.code, { ecmaVersion: 2022, sourceType: 'module' }); }
  catch (e) { return { ok: false, code: null, notes: [...(r.notes || []), '产物语法校验失败: ' + e.message] }; }

  // 绑定完整性校验（作用域感知）：被消解声明的名字如果还有「自由引用」，说明转换漏了。
  // 内层同名局部变量不算 —— 那是压缩器复用字母，不是悬空。
  const removed = new Set(r.removed || []);
  const dangling = new Set();
  let free;
  try { free = collectFree(out); }
  catch (e) { return { ok: false, code: null, notes: [...(r.notes || []), '作用域分析失败: ' + e.message] }; }
  for (const nm of removed) if (free.has(nm)) dangling.add(nm);

  if (dangling.size) {
    return { ok: false, code: null,
      notes: [...(r.notes || []), '绑定校验失败，仍引用已消解的变量: ' + [...dangling].join(', ')] };
  }
  return { ok: true, ...r };
}

module.exports = { deminify, deminifySafe, reAsync, findRegenerators };
