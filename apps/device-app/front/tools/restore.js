// uni-app v2 (Vue2 / uni-v3 编译器) 打包产物 -> 源码工程 重建
const fs = require('fs');
const path = require('path');
const astring = require('astring');
const acorn = require('acorn');
const { unpack } = require('./unpack');
const { analyzeModule, walk, requireIdOf } = require('./lib/analyze');
const { decompileRender, collectBindings, collectTextTemplates } = require('./lib/decompile');
const { parseModule } = require('./lib/modparse');
const { deminifySafe, findRegenerators } = require('./lib/demin');
const { scan: npmScan } = require('./lib/npmmap');
const { unshadowedRefs } = require('./lib/scope');
const { deregen } = require('./lib/deregen');

const WWW = process.argv[2];
const OUT = process.argv[3];

const log = (...a) => console.log(...a);
const W = (p, c) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c, 'utf8'); };

/* ------------------------------------------------------------------ */
/* 1. 收集 bundle                                                      */
/* ------------------------------------------------------------------ */
function listBundles() {
  const svc = ['app-service.js'], nvue = [];
  const walkDir = (d) => {
    for (const f of fs.readdirSync(path.join(WWW, d), { withFileTypes: true })) {
      const rel = d + '/' + f.name;
      if (f.isDirectory()) { walkDir(rel); continue; }
      if (!f.name.endsWith('.js')) continue;
      if (f.name === 'app-sub-service.js') svc.push(rel); else nvue.push(rel);
    }
  };
  for (const d of ['pages', 'pagesCore', 'pagesFunc', 'pagesMore', 'pagesPay']) walkDir(d);
  // app-service.js / app-sub-service.js 与 app-view.js 是两次独立的 webpack 编译，
  // 模块 id 会撞车，必须拆成不同的 space
  return { svc, view: ['app-view.js'], nvue };
}

function buildSpace(files) {
  const mods = {}, from = {};
  for (const f of files) {
    let r;
    try { r = unpack(path.join(WWW, f)); } catch (e) { log('  [!] unpack fail', f, e.message); continue; }
    for (const [id, fn] of Object.entries(r.modules)) {
      const src = typeof fn === 'function' ? fn.toString() : String(fn);
      if (!mods[id] || mods[id].length < src.length) mods[id] = src;
      (from[id] = from[id] || []).push(f);
    }
  }
  return { mods, from };
}

/* ------------------------------------------------------------------ */
/* 2. 分析                                                             */
/* ------------------------------------------------------------------ */
function analyzeSpace(sp) {
  const info = {};
  for (const [id, src] of Object.entries(sp.mods)) info[id] = analyzeModule(id, src);
  const names = {};      // modId -> tag
  for (const id of Object.keys(info)) {
    for (const map of info[id].componentMaps) {
      for (const [tag, mid] of Object.entries(map)) {
        if (!info[mid] || !info[mid].assembly) continue;   // 只认真正的组件模块
        (names[mid] = names[mid] || new Set()).add(tag);
      }
    }
  }
  const pages = {};      // route -> assembly modId
  let appRoot = null, mainModule = null;
  for (const id of Object.keys(info)) {
    for (const dp of info[id].definePages) if (dp.mod) pages[dp.route] = dp.mod;
    if (info[id].routeAssign && info[id].routeAssign.mod) pages[info[id].routeAssign.route] = info[id].routeAssign.mod;
    if (info[id].appRoot) { appRoot = info[id].appRoot; mainModule = id; }
  }
  return { info, names, pages, appRoot, mainModule };
}

/* ------------------------------------------------------------------ */
/* 3. 命名 / 分类                                                      */
/* ------------------------------------------------------------------ */
const UVIEW_RE = /^(u|uv)-?[A-Z]/;                 // uButton / uvInput / u-Image
const UNIUI_RE = /^uni[A-Z]/;                      // uniIcons / uniNavBar
function kebab(s) { return s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/^-/, '').toLowerCase(); }

function classify(tag) {
  if (UVIEW_RE.test(tag)) return 'uview';
  if (UNIUI_RE.test(tag)) return 'uniui';
  return 'business';
}

// uView 2.x 里有一类「双横线」组件（u--input / u--form / u--text ...），
// 因为在 nvue 下 u-input 之类会和内置组件重名，所以对外用 u--input 包一层。
//   模板写 <u--input>  ->  Vue camelize 成 u-Input   -> 文件是 components/u--input/u--input.vue
//   包装组件内部把实现注册成 uvInput                  -> 文件是 components/u-input/u-input.vue
// 两者是不同的组件，映射错了就会互相顶掉。
function uviewFile(tag) {
  if (/^u-[A-Z]/.test(tag)) return 'u--' + tag.slice(2).toLowerCase();
  if (/^uv[A-Z]/.test(tag)) return 'u-' + kebab(tag.slice(2));
  return kebab(tag);
}

/* ------------------------------------------------------------------ */
/* 4. 代码生成辅助                                                     */
/* ------------------------------------------------------------------ */
function beautify(src) {
  try {
    const ast = acorn.parse('(' + src + ')', { ecmaVersion: 2022 });
    return astring.generate(ast.body[0].expression, { indent: '  ' });
  } catch { return src; }
}

// 把模块函数里的 n(<id>) 换成 require('<path>')
function rewriteRequires(src, mapId) {
  let ast, fn;
  try { ast = acorn.parse('(' + src + ')', { ecmaVersion: 2022 }); fn = ast.body[0].expression; }
  catch { return { code: src, deps: [] }; }
  const reqName = fn.params[2] && fn.params[2].name;
  const deps = new Set();
  if (reqName) {
    // 只重写真正指向模块 require 形参的调用。内层可能有同名的局部函数
    // （regenerator-runtime 里就有 `function n(n,r){}` 并调用 `n("end")`），
    // 不做作用域分析就会把它改成 require("...end.js")。
    const real = unshadowedRefs(fn, reqName);
    walk(fn, (n) => {
      if (n.type === 'CallExpression' && n.callee.type === 'Identifier' && n.callee.name === reqName &&
          n.arguments.length === 1 && n.arguments[0].type === 'Literal' && real.has(n.callee)) {
        const id = String(n.arguments[0].value);
        const p = mapId(id);
        deps.add(id);
        n.callee = { type: 'Identifier', name: 'require' };
        n.arguments = [{ type: 'Literal', value: p, raw: JSON.stringify(p) }];
      }
    });
  }
  let code;
  try { code = astring.generate(fn, { indent: '  ' }); } catch { code = src; }
  return { code, deps: [...deps], params: (fn.params || []).map((p) => p.name) };
}

const deminStats = { ok: 0, fallback: 0, regenLinear: 0, regenComplex: 0, failures: [] };
const regenStats = { converted: 0, skipped: 0 };
let bootstrapStubs = 0;

// interopRequireDefault 这个 helper 在每个编译空间的模块 id 都不同，按内容认
const INTEROP = { svc: new Set(), view: new Set(), nvue: new Set() };
function detectInterop(space, mods) {
  for (const [id, src] of Object.entries(mods)) {
    if (/__esModule\s*\?\s*\w+\s*:\s*\{\s*default\s*:/.test(src) && src.length < 400) INTEROP[space].add(id);
  }
}

function sfcScript(modId, space, src, mapId, header) {
  const regen = findRegenerators(src);
  deminStats.regenLinear += regen.filter((r) => r.linear).length;
  deminStats.regenComplex += regen.filter((r) => !r.linear).length;

  const d = deminifySafe(src, mapId, { isInterop: (p) => INTEROP[space].has(p) });
  const head = ['/*', ' * ' + header, ' * 反编译自 webpack 模块 ' + modId + '（' + space + ' 编译空间）'];
  if (d.ok) {
    deminStats.ok++;
    // 纯顺序的 regenerator 状态机改回 async/await；含条件跳转 / try-catch 的保持原样
    let body = d.code;
    const dr = deregen(body);
    if (!dr.error) {
      if (dr.converted) body = dr.code;
      regenStats.converted += dr.converted;
      regenStats.skipped += dr.skipped;
      if (dr.converted || dr.skipped) {
        head.push(` * async/await 还原: ${dr.converted} 个已转换` +
                  (dr.skipped ? `, ${dr.skipped} 个含条件跳转/try-catch 保持状态机原样` : ''));
      }
    }
    for (const n of d.notes || []) head.push(' * ' + n);
    head.push(' */');
    return head.join('\n') + '\n' + body;
  }
  if (regen.length) {
    head.push(` * 注意: 含 ${regen.length} 个 regenerator 状态机（原 async/await）`);
  }
  // 转换不安全 —— 保留原始 webpack 包装，宁可难看也不能改错
  deminStats.fallback++;
  deminStats.failures.push({ modId, space, notes: d.notes });
  const { code, deps } = rewriteRequires(src, mapId);
  head.push(' * [去压缩已跳过] ' + (d.notes || []).join('; '));
  if (deps.length) head.push(' * 依赖: ' + deps.map((x) => `${x} -> ${mapId(x)}`).join(', '));
  head.push(' */');
  return [head.join('\n'),
    'const module = { exports: {} };',
    'const exports = module.exports;',
    '',
    '(' + code + ')(module, exports, require);',
    '',
    'export default exports.default || module.exports;'].join('\n');
}

// nvue 样式对象 -> CSS
function styleObjectToCss(objNode) {
  const out = [];
  for (const p of objNode.properties) {
    if (p.type !== 'Property') continue;
    const sel = p.key.name || p.key.value;
    // {"@VERSION":2} 这类是编译器塞的元信息，不是样式规则
    if (typeof sel === 'string' && sel.startsWith('@')) continue;
    if (p.value.type !== 'ObjectExpression') continue;
    const decls = [];
    for (const q of p.value.properties) {
      if (q.type !== 'Property') continue;
      const k = String(q.key.name || q.key.value).replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
      let v;
      if (q.value.type === 'Literal') v = q.value.value;
      else if (q.value.type === 'UnaryExpression') v = astring.generate(q.value);
      else v = astring.generate(q.value);
      decls.push(`  ${k}: ${v};`);
    }
    // uni-app nvue 会把 "a b" 复合选择器拆成 "a>b"、伪类等，这里原样输出
    const selector = /^[.#[]|^[a-zA-Z][\w-]*$/.test(sel) && !/[ >:.[]/.test(sel) ? '.' + sel : sel;
    out.push(`${selector} {\n${decls.join('\n')}\n}`);
  }
  return out.join('\n\n');
}

/* ------------------------------------------------------------------ */
/* 主流程                                                              */
/* ------------------------------------------------------------------ */
log('== 1. 解包 ==');
const B = listBundles();
log(`   svc bundles: ${B.svc.length}, view bundles: ${B.view.length}, nvue bundles: ${B.nvue.length}`);
const SP = { svc: buildSpace(B.svc), view: buildSpace(B.view), nvue: buildSpace(B.nvue) };
log(`   modules: svc=${Object.keys(SP.svc.mods).length} view=${Object.keys(SP.view.mods).length} nvue=${Object.keys(SP.nvue.mods).length}`);

for (const sp of ['svc', 'view', 'nvue']) detectInterop(sp, SP[sp].mods);
log(`   interop helper: ${['svc', 'view', 'nvue'].map((s) => s + '=' + [...INTEROP[s]].join('/')).join(' ')}`);

log('== 2. 分析 ==');
const AN = { svc: analyzeSpace(SP.svc), view: analyzeSpace(SP.view), nvue: analyzeSpace(SP.nvue) };
for (const k of ['svc', 'nvue']) {
  log(`   ${k}: assemblies=${Object.values(AN[k].info).filter((i) => i.assembly).length} pages=${Object.keys(AN[k].pages).length} named=${Object.keys(AN[k].names).length} appRoot=${AN[k].appRoot}`);
}

/* ---- 为每个组件/页面分配输出路径 ---- */
const plan = {};   // `${space}:${modId}` -> {file, kind, tag, route}
const usedFiles = new Set();
const NPM_COMPONENT = {};   // 'space:modId' -> npm 包内的组件路径

function assign(space, modId, file, kind, extra = {}) {
  const key = space + ':' + modId;
  if (plan[key]) return plan[key];
  let f = file, i = 2;
  while (usedFiles.has(f)) { f = file.replace(/(\.[^.]+)$/, `-${i}$1`); i++; }
  usedFiles.add(f);
  plan[key] = { file: f, kind, space, modId, ...extra };
  return plan[key];
}

// 页面
for (const space of ['nvue', 'svc']) {
  const ext = space === 'nvue' ? '.nvue' : '.vue';
  for (const [route, mod] of Object.entries(AN[space].pages)) {
    assign(space, mod, route + ext, 'page', { route });
  }
}
// App.vue
if (AN.svc.appRoot) assign('svc', AN.svc.appRoot, 'App.vue', 'app');

// 组件
for (const space of ['nvue', 'svc']) {
  const ext = space === 'nvue' ? '.nvue' : '.vue';
  for (const [mod, tags] of Object.entries(AN[space].names)) {
    if (plan[space + ':' + mod]) continue;
    const tag = [...tags].sort()[0];
    const cls = classify(tag);
    let file;
    if (cls === 'uview') {
      // uView 用 npm 包，反编译副本只作参照物落到 docs/ 下，
      // 所以引用路径直接指向 npm，不要再指进 src/uni_modules。
      const name = uviewFile(tag);
      NPM_COMPONENT[space + ':' + mod] = `uview-ui/components/${name}/${name}.vue`;
      file = `../docs/decompiled-uview/components/${name}/${name}${ext}`;
    } else if (cls === 'uniui') {
      const name = kebab(tag);
      file = `uni_modules/uni-ui/components/${name}/${name}${ext}`;
    } else file = `components/${tag}/${tag}${ext}`;
    assign(space, mod, file, 'component', { tag, cls });
  }
}
// 未命名装配（兜底）
for (const space of ['nvue', 'svc']) {
  const ext = space === 'nvue' ? '.nvue' : '.vue';
  for (const [id, i] of Object.entries(AN[space].info)) {
    if (!i.assembly || plan[space + ':' + id]) continue;
    const nm = i.optionName || ('unknown-' + id);
    assign(space, id, `components/_unnamed/${nm}${ext}`, 'component', { tag: nm, cls: 'business' });
  }
}
log(`   计划输出 SFC: ${Object.keys(plan).length}`);

/* ---- 给几个关键的非组件模块起名 ---- */
for (const space of ['svc', 'nvue']) {
  const info = AN[space].info;
  // 同一份源码在两次编译里都存在，用后缀区分，避免互相覆盖
  const mf = (base) => (space === 'svc' ? base : base.replace(/\.js$/, '.nvue.js'));
  // 1) Vuex store / i18n messages —— 从入口模块的 new Vue({store, i18n}) 里认
  const mainId = AN[space].mainModule;
  let storeId = null;
  if (mainId) {
    const src = SP[space].mods[mainId];
    const l2m = info[mainId].localToMod;
    const grab = (re, file) => {
      const m = re.exec(src);
      if (m && l2m[m[1]] && !plan[space + ':' + l2m[m[1]]]) { assign(space, l2m[m[1]], mf(file), 'module'); return l2m[m[1]]; }
      return null;
    };
    storeId = grab(/[,{]store:\s*(\w+)\.default/, 'store/index.js');
    grab(/[,{]messages:\s*(\w+)\.default/, 'locale/messages.js');
  }
  // 1b) store 的子模块： new Vuex.Store({ modules: { app: x.default, ... } })
  if (storeId) {
    const l2m = info[storeId].localToMod;
    const sm = /modules:\s*\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/.exec(SP[space].mods[storeId]);
    if (sm) {
      for (const m of sm[1].matchAll(/([A-Za-z_$][\w$]*)\s*:\s*(\w+)\.default/g)) {
        const mid = l2m[m[2]];
        if (mid && !plan[space + ':' + mid]) assign(space, mid, mf(`store/modules/${m[1]}.js`), 'module');
      }
    }
  }
  // 2) 全局配置 / 请求封装 —— 按导出特征认
  for (const [id, i] of Object.entries(info)) {
    if (i.assembly || plan[space + ':' + id]) continue;
    const src = SP[space].mods[id];
    if (src.length < 30000 && /\bcdn\s*:/.test(src) && /\bdefaultScale\s*:/.test(src)) {
      assign(space, id, mf('common/config.js'), 'module');
    } else if (/\.request\s*=\s*(function|void 0)/.test(src) && /\bheader\b/.test(src) && src.length < 40000) {
      assign(space, id, mf('common/request.js'), 'module');
    }
  }
}
// main.js 也要登记进 plan —— 必须早于任何一次 modPath 调用，
// 否则 common/request.js 之类会拿到 @/.unpacked/svc/<entry>.js 这个旧路径，
// 而那份副本随后会被去重逻辑跳过，导致构建时找不到模块。
if (AN.svc.mainModule && !plan['svc:' + AN.svc.mainModule]) {
  plan['svc:' + AN.svc.mainModule] = { file: 'main.js', kind: 'entry', space: 'svc', modId: AN.svc.mainModule };
  usedFiles.add('main.js');
}

const namedModules = Object.values(plan).filter((p) => p.kind === 'module');
log(`   额外命名模块: ${namedModules.map((p) => p.file).join(', ') || '无'}`);

/* ---- 第三方库识别：能换成 npm 包的就不再落 .unpacked ---- */
const NPM = { svc: {}, view: {}, nvue: {} };
for (const sp of ['svc', 'view', 'nvue']) NPM[sp] = npmScan(SP[sp].mods);
{
  const pkgs = new Set();
  for (const sp of ['svc', 'view', 'nvue']) {
    for (const d of Object.values(NPM[sp])) if (d.kind === 'npm') pkgs.add(d.name);
  }
  log(`   识别为 npm 包: ${[...pkgs].sort().join(', ')}`);
  // 业务模块在两个编译空间各有一份，合并到同一个文件（内容等价，取 svc 版）
  for (const sp of ['svc', 'nvue']) {
    for (const [id, d] of Object.entries(NPM[sp])) {
      if (d.kind === 'business' && !plan[sp + ':' + id]) {
        const key = sp + ':' + id;
        const file = sp === 'svc' ? d.file : d.file.replace(/\.js$/, '.nvue.js');
        plan[key] = { file, kind: 'module', space: sp, modId: id };
        usedFiles.add(file);
      }
    }
  }
}

/* ---- 模块 id -> 引用路径 ---- */
function modPath(space, id, fromFile) {
  const key = space + ':' + id;
  if (NPM_COMPONENT[key]) return NPM_COMPONENT[key];       // uView 组件 -> npm 包
  const npm = NPM[space] && NPM[space][id];
  if (npm && npm.kind === 'npm') return npm.name;          // 直接指向 npm 包
  if (plan[key]) {
    let rel = path.relative(path.dirname(fromFile), plan[key].file).replace(/\\/g, '/');
    if (!rel.startsWith('.')) rel = './' + rel;
    return rel;
  }
  return `@/.unpacked/${space}/${id}.js`;
}

/* ---- scopeId -> css：CSS 文本里自带 [data-v-xxxx]，直接按它归类 ---- */
const cssByScope = {};
let globalCss = '';
for (const space of ['view', 'svc']) {
  for (const i of Object.values(AN[space].info)) {
    if (!i.cssText) continue;
    const scopes = [...new Set([...i.cssText.matchAll(/\[data-v-([0-9a-f]+)\]/g)].map((m) => m[1]))];
    if (scopes.length === 1) cssByScope[scopes[0]] = (cssByScope[scopes[0]] || '') + i.cssText + '\n';
    else if (scopes.length === 0) globalCss += i.cssText + '\n';
    else for (const s of scopes) cssByScope[s] = (cssByScope[s] || '') + i.cssText + '\n';
  }
}
log(`   从 app-view 提取到 ${Object.keys(cssByScope).length} 份组件级 CSS，全局 CSS ${globalCss.length} 字节`);

/* ---- 生成 SFC ---- */
log('== 3. 生成 SFC ==');
const stats = { sfc: 0, tplOk: 0, tplFail: 0, styleOk: 0 };
const failures = [];

for (const [key, p] of Object.entries(plan)) {
  const { space, modId } = p;
  const info = AN[space].info;
  const asm = info[modId] && info[modId].assembly;
  if (!asm) continue;
  const outFile = path.join(OUT, p.file);
  const mapId = (id) => modPath(space, id, p.file);

  // --- template ---
  // svc(逻辑层) 的 render 里只有表达式，静态文本/静态 class 在 view(视图层)；
  // 两边节点结构一致，用 view 的结构 + svc 的 _$s 绑定值做合并还原
  let template = null, tplWarn = [];
  const getRender = (sp, id) => {
    if (!SP[sp].mods[id]) return null;
    const tm = parseModule(SP[sp].mods[id]);
    const local = tm.exportsMap.b || tm.exportsMap.render;
    return local && tm.decls[local] ? astring.generate(tm.decls[local]) : null;
  };
  // 该组件模板里注册了哪些子组件（用来区分 uView 组件和 nvue 内置组件）
  const registered = new Set();
  if (asm.template && info[asm.template]) {
    for (const m of info[asm.template].componentMaps) Object.keys(m).forEach((k) => registered.add(k));
  }
  if (info[modId]) for (const m of info[modId].componentMaps) Object.keys(m).forEach((k) => registered.add(k));
  if (asm.script && info[asm.script]) {
    for (const m of info[asm.script].componentMaps) Object.keys(m).forEach((k) => registered.add(k));
    for (const dep of info[asm.script].requires) {
      if (info[dep]) for (const m of info[dep].componentMaps) Object.keys(m).forEach((k) => registered.add(k));
    }
  }
  if (asm.template) {
    try {
      const svcRender = getRender(space, asm.template);
      const viewRender = space === 'svc' ? getRender('view', asm.template) : null;
      if (viewRender && svcRender) {
        // svc 提供结构/标签/属性/事件，view 提供静态文本
        const r = decompileRender(svcRender, {
          bindings: collectBindings(svcRender),
          textTemplates: collectTextTemplates(viewRender),
          registered,
        });
        template = r.template; tplWarn = r.warnings;
      } else if (svcRender) {
        const r = decompileRender(svcRender, { registered: space === 'nvue' ? registered : null });
        template = r.template; tplWarn = r.warnings;
      }
    } catch (e) { tplWarn.push(e.message); }
  }
  if (template) stats.tplOk++; else { stats.tplFail++; failures.push({ file: p.file, reason: 'template', warn: tplWarn }); }

  // --- script ---
  let script = '';
  if (asm.script && SP[space].mods[asm.script]) {
    // script 模块常是 `t.default = a.a` 的转发层，往下钻一层取真正的 options 模块
    let sid = asm.script;
    const si = info[sid];
    if (si && si.requires.length === 1 && SP[space].mods[sid].length < 400) {
      const inner = si.requires[0];
      if (SP[space].mods[inner]) sid = inner;
    }
    script = sfcScript(sid, space, SP[space].mods[sid], (id) => modPath(space, id, p.file),
      `${p.kind === 'page' ? '页面' : '组件'}: ${p.route || p.tag || modId}`);
  }

  // --- style ---
  let style = '', styleLang = '';
  if (space === 'nvue') {
    // 一个 nvue 组件可能挂多个样式模块，其中还夹着 {"@VERSION":2} 这种版本标记。
    // 早先的写法是「找到第一个样式对象就 break」，结果常常撞上版本标记就收工，
    // 真正的样式模块（往往排在后面）永远取不到 —— 表现为整页没有 <style>，行高全塌。
    // 所以改成：在依赖子树里把所有样式对象**全部收集并合并**。
    const seen = new Set();
    const collect = (id, depth) => {
      if (!id || depth > 4 || seen.has(id)) return;
      seen.add(id);
      const d = info[id];
      if (!d) return;
      if (d.styleObject) {
        const css = styleObjectToCss(d.styleObject);
        if (css.trim()) style += css + '\n';
      }
      // 不要钻进别的组件，那是它们自己的样式
      if (d.assembly) return;
      for (const next of d.requires) collect(next, depth + 1);
    };
    for (const dep of (info[modId] ? info[modId].requires : [])) collect(dep, 1);
  } else if (asm.scopeId && cssByScope[asm.scopeId]) {
    // 去掉编译期注入的 [data-v-xxxx]，还原成 scoped 写法
    style = cssByScope[asm.scopeId].split('}').map((s) => s.replace(/\[data-v-[0-9a-f]+\]/g, '')).join('}');
  }

  // App.vue 的 <style> 就是**全局样式表**。产物里它被拆成两份：
  //   app-view.js 里没有 [data-v-] 作用域的那部分 CSS（H5/vue 侧）
  //   nvue 的 Vue.prototype.__$appStyle__ 注入（nvue 侧，已按平台生成物置空）
  // 不放回去的话，模板里大量使用的工具类（flex-row / p-t-xl / bg-page …）全部失效，
  // 表现就是每个页面布局塌掉。放回 App.vue 后 uni-app 会自动为两个平台各编译一份。
  if (p.kind === 'app' && globalCss.trim()) {
    style = globalCss;
    log(`   App.vue <- 全局样式 ${globalCss.length} 字节`);
  }
  if (style.trim()) stats.styleOk++;

  const parts = [];
  // 组件本来就没有模板时（normalizeComponent 的 render 传的是 void 0，App.vue 就是这样），
  // **绝不能**补一个空 <template>：vue-loader 会把它编成「渲染 nothing」的 render，
  // 顶掉运行时本该提供的根渲染 —— H5 下表现为整站白屏。
  if (asm.noRender && !template) {
    stats.noTemplate = (stats.noTemplate || 0) + 1;
    parts.push('<!-- 该组件没有模板（原包中 render 即为 undefined），刻意不生成 <template> -->');
  } else {
    parts.push('<template>\n' + (template ||
      '  <!-- [反编译失败] 该组件的 render function 未能还原，请查看 .unpacked/' + space + '/' + asm.template + '.js -->') +
      '\n</template>');
  }
  parts.push('<script>\n' + script + '\n</script>');
  if (style.trim()) {
    if (space === 'nvue') {
      // nvue 的样式要在 H5 下生效，必须同时满足两件事（缺一不可）：
      //
      //  1) 必须写成 <style scoped>。裸 <style> 会被 uni-app 的 H5 编译整块丢弃，
      //     页面级样式一条都进不来（表现为控件全部退化成默认尺寸）。
      //  2) rpx 必须换成浏览器认识的单位。uni-app 只对 .vue 做 rpx 转换，
      //     .nvue 在 weex 模式下靠运行时处理，H5 这边没人转，带 rpx 的声明会被浏览器丢弃。
      //     rpx 的定义就是 750rpx = 100% 视口宽，所以 vw 是精确等价物。
      //
      // 但 nvue 运行时不认 vw，直接换会破坏 app-plus。用条件编译给两个平台各自的单位。
      const toVw = (css) => css.replace(/(-?\d*\.?\d+)rpx/g,
        (_, n) => `${+(parseFloat(n) / 750 * 100).toFixed(4)}vw`);
      const src = style.trim();
      const h5 = toVw(src);
      const body = h5 === src
        ? src                                   // 没有 rpx，两端通用
        : ['/* #ifdef APP-PLUS */', src, '/* #endif */',
           '/* #ifdef H5 */', h5, '/* #endif */'].join('\n');
      parts.push(`<style scoped>\n${body}\n</style>`);
    } else {
      const scoped = asm.scopeId ? ' scoped' : '';
      parts.push(`<style${scoped}>\n${style.trim()}\n</style>`);
    }
  }
  W(outFile, parts.join('\n\n') + '\n');
  stats.sfc++;
}
log(`   SFC=${stats.sfc} 模板成功=${stats.tplOk} 失败=${stats.tplFail} 带样式=${stats.styleOk}`);
log(`   去压缩: 成功=${deminStats.ok} 退回原样=${deminStats.fallback} | regenerator 状态机: 线性=${deminStats.regenLinear} 复杂=${deminStats.regenComplex}`);

/* ---- 命名模块单独落盘（同样走去压缩 + 双重校验） ---- */
// 重新取一次：识别 npm 包那一步又往 plan 里补了业务模块（common/utils.js 等）
for (const p of Object.values(plan).filter((p) => p.kind === 'module')) {
  const src = SP[p.space].mods[p.modId];
  W(path.join(OUT, p.file),
    sfcScript(p.modId, p.space, src, (id) => modPath(p.space, id, p.file), `模块: ${p.file}`) + '\n');
}

/* ---- main.js ---- */
if (AN.svc.mainModule) {
  const mid = AN.svc.mainModule;
  W(path.join(OUT, 'main.js'),
    sfcScript(mid, 'svc', SP.svc.mods[mid], (id) => modPath('svc', id, 'main.js'), '应用入口 main.js') + '\n');
  log('   main.js <- 模块 ' + mid);
}
log(`   去压缩合计: 成功=${deminStats.ok} 退回原样=${deminStats.fallback}`);
log(`   async/await 还原: ${regenStats.converted} 个已转换, ${regenStats.skipped} 个保持状态机`);

/* ---- 转储全部原始模块 ---- */
log('== 4. 转储原始模块 ==');
const RUNTIME = `// webpack require 兼容垫片（供 .unpacked/ 下的模块互相引用）
// 注意：这里**不能**再提供动态的 r(id) —— 打包器无法静态分析 require('./' + id + '.js')，
// 编译期只报一条 Critical dependency 警告，运行期才抛 Cannot find module。
// 所有 n(<id>) 调用已在生成阶段静态重写成字面量 require('...')，这里只保留 webpack 的辅助方法。
function wrap() {
  const r = function (id) {
    throw new Error('[.unpacked] 动态 require 未被静态重写: ' + id + '（这是反编译工具的 bug，请反馈）');
  };
  r.d = function (exports, name, getter) { Object.defineProperty(exports, name, { enumerable: true, get: getter }); };
  r.r = function (exports) { Object.defineProperty(exports, '__esModule', { value: true }); };
  r.n = function (m) { const g = m && m.__esModule ? function () { return m.default; } : function () { return m; }; r.d(g, 'a', g); return g; };
  r.o = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  r.t = function (v) { return v; };
  r.p = '/';
  r.m = {}; r.c = {}; r.s = undefined;
  return r;
}
module.exports = { wrap };
`;
if (globalCss.trim()) W(path.join(OUT, 'common', 'app.extracted.css'), globalCss);
for (const space of ['svc', 'view', 'nvue']) {
  W(path.join(OUT, '.unpacked', space, '__runtime.js'), RUNTIME);
  let n = 0;
  for (const [id, src] of Object.entries(SP[space].mods)) {
    if (NPM[space] && NPM[space][id]) continue;   // 已换成 npm 包 / 已提升为业务模块
    // 已经有正式文件的模块（main.js / App.vue / 页面 / 组件 / store / common）绝不能再往
    // .unpacked 里放一份：那是一份**会被执行**的副本。main.js 的副本被 request.js 引到后，
    // 整个应用引导会跑第二遍，此时 App.vue 还在循环依赖中未初始化完 -> mpType 赋值到 undefined。
    if (plan[space + ':' + id]) continue;

    // uni-app 编译器按平台生成的引导文件不是项目源码，原样搬进来会出两个问题：
    //   1) 它调用 uni.requireGlobal() / uni.restoreGlobal() —— app-plus 专有，H5 下直接崩
    //   2) 它的 __definePage(...) 与 pages.json 重复，重新编译时编译器会自己生成
    // 所以置空，原文留到 docs/decompiled-bootstrap/ 供查阅。
    const isBootstrap =
      (AN[space].info[id] && AN[space].info[id].definePages.length > 0) ||
      /uni\.restoreGlobal|uni\.requireGlobal/.test(src) ||
      // nvue 每个页面 bundle 的入口：设置 mpType/route 后 new Vue(...) 启动页面。
      // 页面注册现由 pages.json 承担，且这里的裸 Vue 全局在 H5 下不存在。
      (/\.mpType\s*=\s*["'](page|app)["']/.test(src) && /new\s+Vue\s*\(/.test(src)) ||
      // nvue 的全局样式注入胶水，App.vue 的 <style> 会由编译器重新注入
      /Vue\.prototype\.__\$appStyle__/.test(src);
    if (isBootstrap) {
      W(path.join(OUT, '..', 'docs', 'decompiled-bootstrap', `${space}-${id}.js`), beautify(src));
      W(path.join(OUT, '.unpacked', space, `${id}.js`),
        [`// [反编译] webpack 模块 ${id} [${space}] —— uni-app 编译器生成的 ${space === 'nvue' ? 'nvue' : 'app-plus'} 平台引导文件，`,
         '// 不是项目源码，已置空。它原本做两件事：',
         '//   1) uni.requireGlobal() / uni.restoreGlobal() 还原 App 环境的全局对象（app-plus 专有，H5 下会抛错）',
         '//   2) __definePage(...) 注册页面 —— 现已由 pages.json 承担，重新编译时编译器会自动生成',
         `// 原始内容见 docs/decompiled-bootstrap/${space}-${id}.js`,
         'module.exports = {};', ''].join('\n'));
      bootstrapStubs++;
      n++;
      continue;
    }

    let body = beautify(src);
    // .unpacked 里的模块同样做 async/await 还原（外面包一层括号才是合法表达式语句）
    const drr = deregen('(' + body + ')', { sourceType: 'script' });
    if (!drr.error && drr.converted) {
      const stripped = drr.code.trim().replace(/;\s*$/, '').replace(/^\(/, '').replace(/\)$/, '');
      try {
        acorn.parse('(' + stripped + ')', { ecmaVersion: 2022 });
        body = stripped;
        regenStats.converted += drr.converted;
      } catch { /* 剥括号后不合法就放弃转换，保留原样 */ }
    }
    // 把模块内的 n(<id>) 静态重写成字面量 require('...')，让打包器能解析
    const selfPath = `.unpacked/${space}/${id}.js`;
    const rw = rewriteRequires(body, (depId) => modPath(space, depId, selfPath));
    if (rw.code) body = rw.code;

    const code = `// webpack 模块 ${id}  [${space}]\n` +
      `// 出现于: ${[...new Set(SP[space].from[id] || [])].slice(0, 6).join(', ')}${(SP[space].from[id] || []).length > 6 ? ' ...' : ''}\n` +
      `const __r = require('./__runtime.js').wrap();\n` +
      `(${body})(module, exports, __r);\n`;
    W(path.join(OUT, '.unpacked', space, `${id}.js`), code);
    n++;
  }
  log(`   .unpacked/${space}: ${n} 个模块`);
}

/* ---- 输出计划表 ---- */
W(path.join(OUT, 'docs', 'restore-map.json'), JSON.stringify({ plan, stats, failures, deminStats }, null, 2));
log('== 完成 ==');
