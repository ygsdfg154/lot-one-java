// regenerator 状态机 -> async/await
//
// 只处理「纯顺序」的状态机：case 标号递增、只有直落、没有条件跳转 / try-catch / 循环。
// 做法是把整个 asyncToGenerator(mark(F)) 表达式替换成一个等价的 async 函数，
// 不动外层函数、不动 `var e = this` 捕获 —— 语义完全一致（两者都返回 Promise），
// 调用点无论是 (...)() 还是 .apply(...) 都不受影响。
const acorn = require('acorn');
const astring = require('astring');

const gen = (n) => { try { return astring.generate(n); } catch { return ''; } };
const id = (name) => ({ type: 'Identifier', name });

function walk(n, cb, parent, key) {
  if (!n || typeof n !== 'object') return;
  if (Array.isArray(n)) { n.forEach((x, i) => walk(x, cb, parent, key)); return; }
  if (n.type) cb(n, parent, key);
  for (const k of Object.keys(n)) {
    if (k === 'type' || k === 'start' || k === 'end') continue;
    walk(n[k], cb, n, k);
  }
}
function transform(n, fn) {
  if (!n || typeof n !== 'object') return n;
  if (Array.isArray(n)) return n.map((x) => transform(x, fn));
  for (const k of Object.keys(n)) {
    if (k === 'type' || k === 'start' || k === 'end') continue;
    n[k] = transform(n[k], fn);
  }
  return fn(n) || n;
}

const isMember = (n, obj, prop) =>
  n && n.type === 'MemberExpression' && !n.computed &&
  n.object && n.object.name === obj && n.property && n.property.name === prop;

// asyncToGenerator( X.mark(F) )  —— 判据：单参数调用，参数是 .mark(函数)
function matchWrapper(node) {
  if (node.type !== 'CallExpression' || node.arguments.length !== 1) return null;
  const a = node.arguments[0];
  if (!a || a.type !== 'CallExpression' || !a.callee || a.callee.type !== 'MemberExpression') return null;
  if (!a.callee.property || a.callee.property.name !== 'mark') return null;
  const F = a.arguments[0];
  if (!F || !/Function/.test(F.type)) return null;
  return F;
}

// F 的躯干：var 声明... ; return X.wrap(function(ctx){ for(;;) switch(ctx.prev=ctx.next){...} }, ...)
function matchBody(F) {
  if (!F.body || F.body.type !== 'BlockStatement') return null;
  const stmts = F.body.body;
  const decls = [], rest = [];
  let wrapCall = null;
  for (const st of stmts) {
    if (st.type === 'VariableDeclaration' && !wrapCall) { decls.push(st); continue; }
    if (st.type === 'ReturnStatement' && st.argument && st.argument.type === 'CallExpression' &&
        st.argument.callee.type === 'MemberExpression' &&
        st.argument.callee.property && st.argument.callee.property.name === 'wrap') {
      wrapCall = st.argument; continue;
    }
    rest.push(st);
  }
  if (!wrapCall || rest.length) return null;
  const inner = wrapCall.arguments[0];
  if (!inner || !/Function/.test(inner.type)) return null;
  const ctx = inner.params[0] && inner.params[0].name;
  if (!ctx) return null;
  let sw = null;
  walk(inner.body, (x) => { if (!sw && x.type === 'SwitchStatement') sw = x; });
  if (!sw) return null;
  return { decls, ctx, sw };
}

// 是否纯顺序：标号递增、无条件跳转、无 try/循环/中断
function isSequential(ctx, sw) {
  const src = gen(sw);
  if (new RegExp('\\b' + ctx + '\\.(t0|t1)\\b').test(src)) return false;
  if (new RegExp('\\b' + ctx + '\\.prev\\s*=\\s*\\d').test(src)) return false;
  if (/abrupt\("(break|continue)"/.test(src) || /delegateYield|finish\(/.test(src)) return false;

  const labels = sw.cases.filter((c) => c.test && typeof c.test.value === 'number').map((c) => c.test.value);
  if (!labels.every((v, i) => i === 0 || v > labels[i - 1])) return false;

  // 标记「return (ctx.next=N, EXPR)」里的 next 赋值，其余 next 赋值即条件跳转
  const inReturn = new Set();
  for (const c of sw.cases) {
    walk(c.consequent, (x) => {
      if (x.type === 'ReturnStatement' && x.argument && x.argument.type === 'SequenceExpression') {
        for (const e of x.argument.expressions) {
          if (e.type === 'AssignmentExpression' && isMember(e.left, ctx, 'next')) inReturn.add(e);
        }
      }
    });
  }
  let bad = false;
  for (const c of sw.cases) {
    walk(c.consequent, (x) => {
      if (x.type === 'AssignmentExpression' && isMember(x.left, ctx, 'next') && !inReturn.has(x)) bad = true;
    });
  }
  return !bad;
}

// 线性化：拼出 async 函数体
function linearize(ctx, sw, tmpBase) {
  const out = [];
  let pending = null;      // 上一次 await 的临时变量名（供 ctx.sent 使用）
  let tmpN = 0;
  let bailed = false;

  const substSent = (node, name) => transform(node, (x) => {
    if (isMember(x, ctx, 'sent')) return id(name);
    return null;
  });

  const push = (st) => {
    if (pending) out.push(substSent(st, pending));
    else out.push(st);
  };

  for (const c of sw.cases) {
    if (bailed) break;
    const label = c.test ? c.test.value : null;
    if (label === 'end') continue;
    for (const st of c.consequent) {
      if (bailed) break;
      // ctx.prev = N / ctx.next = N（裸语句）
      if (st.type === 'ExpressionStatement' && st.expression.type === 'AssignmentExpression' &&
          (isMember(st.expression.left, ctx, 'next') || isMember(st.expression.left, ctx, 'prev'))) continue;
      if (st.type === 'BreakStatement' && !st.label) continue;
      if (st.type === 'ContinueStatement') continue;

      if (st.type === 'ReturnStatement' && st.argument) {
        const arg = st.argument;
        // return (ctx.next = N, EXPR)  => await EXPR
        if (arg.type === 'SequenceExpression') {
          const exprs = arg.expressions;
          const iNext = exprs.findIndex((e) => e.type === 'AssignmentExpression' && isMember(e.left, ctx, 'next'));
          if (iNext >= 0 && iNext === exprs.length - 2) {
            // next 赋值之前的副作用照常执行
            for (let k = 0; k < iNext; k++) push({ type: 'ExpressionStatement', expression: exprs[k] });
            const awaited = { type: 'AwaitExpression', argument: exprs[exprs.length - 1] };
            const sub = pending ? substSent(awaited, pending) : awaited;
            const name = `${tmpBase}${tmpN++}`;
            out.push({
              type: 'VariableDeclaration', kind: 'let',
              declarations: [{ type: 'VariableDeclarator', id: id(name), init: sub }],
            });
            pending = name;
            continue;
          }
          // return (副作用..., ctx.abrupt("return", X))  /  return (副作用..., ctx.stop())
          const last = exprs[exprs.length - 1];
          if (last && last.type === 'CallExpression' &&
              (isMember(last.callee, ctx, 'abrupt') || isMember(last.callee, ctx, 'stop'))) {
            for (let k = 0; k < exprs.length - 1; k++) push({ type: 'ExpressionStatement', expression: exprs[k] });
            if (isMember(last.callee, ctx, 'stop')) continue;
            const kind = last.arguments[0] && last.arguments[0].value;
            if (kind === 'return') {
              const v = last.arguments[1] || null;
              out.push({ type: 'ReturnStatement', argument: v ? (pending ? substSent(v, pending) : v) : null });
              continue;
            }
            bailed = true; break;
          }
          bailed = true; break;
        }
        // return ctx.abrupt("return", X) => return X
        if (arg.type === 'CallExpression' && isMember(arg.callee, ctx, 'abrupt')) {
          const kind = arg.arguments[0] && arg.arguments[0].value;
          if (kind === 'return') {
            const v = arg.arguments[1] || null;
            out.push({ type: 'ReturnStatement', argument: v ? (pending ? substSent(v, pending) : v) : null });
            continue;
          }
          bailed = true; break;
        }
        // return ctx.stop() => 结束
        if (arg.type === 'CallExpression' && isMember(arg.callee, ctx, 'stop')) continue;
        bailed = true; break;
      }
      push(st);
    }
  }
  if (bailed) return null;
  // 收尾：若最后一次 await 的结果没人用，把 `let __x = await ...` 降级成 `await ...`
  const used = new Set();
  walk({ type: 'Program', body: out }, (x, parent, key) => {
    if (x.type === 'Identifier' && x.name.startsWith(tmpBase)) {
      const isDeclId = parent && parent.type === 'VariableDeclarator' && key === 'id';
      if (!isDeclId) used.add(x.name);
    }
  });
  for (let i = 0; i < out.length; i++) {
    const st = out[i];
    if (st.type === 'VariableDeclaration' && st.declarations.length === 1 &&
        st.declarations[0].id.type === 'Identifier' && st.declarations[0].id.name.startsWith(tmpBase) &&
        !used.has(st.declarations[0].id.name)) {
      out[i] = { type: 'ExpressionStatement', expression: st.declarations[0].init };
    }
  }

  // 窥孔：临时变量只被用到一次、且用它的就是紧邻的下一条语句时，把 await 直接内联进去。
  // 限定「紧邻」是为了不改变求值顺序（中间若有别的语句，内联就把 await 推后了）。
  const countIn = (node, name) => {
    let c = 0;
    walk(node, (x, parent, key) => {
      if (x.type !== 'Identifier' || x.name !== name) return;
      if (parent && parent.type === 'VariableDeclarator' && key === 'id') return;
      c++;
    });
    return c;
  };
  for (let i = 0; i < out.length - 1; i++) {
    const st = out[i];
    if (st.type !== 'VariableDeclaration' || st.declarations.length !== 1) continue;
    const d = st.declarations[0];
    if (!d.id || d.id.type !== 'Identifier' || !d.id.name.startsWith(tmpBase)) continue;
    const name = d.id.name;
    let totalAfter = 0;
    for (let k = i + 1; k < out.length; k++) totalAfter += countIn(out[k], name);
    if (totalAfter !== 1) continue;
    if (countIn(out[i + 1], name) !== 1) continue;      // 唯一那次必须在紧邻的下一条
    out[i + 1] = transform(out[i + 1], (x) => (x.type === 'Identifier' && x.name === name ? d.init : null));
    out.splice(i, 1);
    i--;
  }
  return out;
}

/**
 * 把源码里所有「纯顺序」状态机改写成 async/await。
 * 返回 { code, converted, skipped }
 */
function deregen(code, opts = {}) {
  let ast;
  try { ast = acorn.parse(code, { ecmaVersion: 2022, sourceType: opts.sourceType || 'module' }); }
  catch (e) { return { code, converted: 0, skipped: 0, error: e.message }; }

  let converted = 0, skipped = 0, seq = 0;
  const reasons = {};
  const bump = (r) => { reasons[r] = (reasons[r] || 0) + 1; skipped++; };

  transform(ast, (node) => {
    const F = matchWrapper(node);
    if (!F) return null;
    const m = matchBody(F);
    if (!m) { bump('躯干形态不匹配'); return null; }
    if (!isSequential(m.ctx, m.sw)) { bump('非纯顺序(含条件跳转/try/循环)'); return null; }
    const body = linearize(m.ctx, m.sw, `_r${seq}_`);
    if (!body) { bump('线性化时遇到未知语句形态'); return null; }
    seq++;
    converted++;
    return {
      type: 'FunctionExpression', id: null, async: true, generator: false,
      params: F.params || [],
      body: { type: 'BlockStatement', body: [...m.decls, ...body] },
    };
  });

  let out;
  try { out = astring.generate(ast, { indent: '  ' }); }
  catch (e) { return { code, converted: 0, skipped: 0, error: 'generate: ' + e.message }; }
  return { code: out, converted, skipped, reasons };
}

module.exports = { deregen };
