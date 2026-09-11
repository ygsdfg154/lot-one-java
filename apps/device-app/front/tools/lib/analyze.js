// 扫描 webpack 模块，识别：组件装配点 / 组件名 / 页面注册 / 样式模块
const acorn = require('acorn');
const astring = require('astring');
const { parseModule } = require('./modparse');

function gen(n) { try { return astring.generate(n); } catch { return ''; } }

function walk(node, cb) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) { for (const x of node) walk(x, cb); return; }
  if (node.type) cb(node);
  for (const k of Object.keys(node)) {
    if (k === 'type' || k === 'start' || k === 'end') continue;
    walk(node[k], cb);
  }
}

// 从表达式里挖出 n(<id>)  ——  支持 a(n(22)) / n(22).default / n("6921")
function requireIdOf(node, reqName) {
  let found = null;
  walk(node, (n) => {
    if (found) return;
    if (n.type === 'CallExpression' && n.callee.type === 'Identifier' && n.callee.name === reqName &&
        n.arguments.length === 1 && n.arguments[0].type === 'Literal') {
      found = String(n.arguments[0].value);
    }
  });
  return found;
}

function analyzeModule(id, src) {
  let m;
  try { m = parseModule(src); } catch (e) { return { id, error: e.message }; }
  const req = m.params.require;
  const out = {
    id,
    localToMod: {},      // 局部变量名 -> 模块 id
    assembly: null,      // {script, template, scopeId, moduleId, styleMods:[]}
    componentMaps: [],   // [{name -> moduleId}]
    definePages: [],     // [{route, mod}]
    routeAssign: null,   // nvue 入口: {route, mod}
    optionName: null,
    requires: m.requires,
    cssText: null,
    isNormalizeComponent: false,
    styleObject: null,
  };
  // --- nvue 样式对象模块: e.exports = { cls: {prop:val} }（无 require 参数，先处理）---
  if (m.assigns['module.exports'] && m.assigns['module.exports'].type === 'ObjectExpression') {
    out.styleObject = m.assigns['module.exports'];
  }
  // --- css-loader 输出模块: exports.push([module.i, "css text", ""]) ---
  const cssM = /\.push\(\[\w+\.i,\s*('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/.exec(src);
  if (cssM) {
    try {
      out.cssText = cssM[1][0] === "'"
        ? JSON.parse('"' + cssM[1].slice(1, -1).replace(/\\'/g, "'").replace(/"/g, '\\"') + '"')
        : JSON.parse(cssM[1]);
    } catch { /* ignore */ }
  }
  if (!req) return out;

  // 变量名 -> 模块 id（模块体可能被 (function(e){...}).call() 包裹，所以全量遍历）
  walk(m.fn, (n) => {
    if (n.type !== 'VariableDeclarator' || !n.init || n.id.type !== 'Identifier') return;
    if (n.init.type === 'ObjectExpression' || n.init.type === 'ArrayExpression') return;
    const rid = requireIdOf(n.init, req);
    if (rid !== null && out.localToMod[n.id.name] === undefined) out.localToMod[n.id.name] = rid;
  });

  const resolve = (node) => {
    if (!node) return null;
    if (node.type === 'MemberExpression') return resolve(node.object);
    if (node.type === 'Identifier') return out.localToMod[node.name] || null;
    if (node.type === 'CallExpression') return requireIdOf(node, req);
    return requireIdOf(node, req);
  };

  walk(m.fn, (n) => {
    // --- normalizeComponent 装配 ---
    if (n.type === 'CallExpression' && n.arguments.length >= 8) {
      const a = n.arguments;
      const sid = a[5];
      const isScope = sid && sid.type === 'Literal' &&
        (sid.value === null || (typeof sid.value === 'string' && /^[0-9a-f]{6,12}$/.test(sid.value)));
      if (isScope) {
        // 区分「本来就没有模板」和「有模板但我没还原出来」：
        // normalizeComponent 的第 2 个参数是 render，传 void 0 表示该组件确实无模板
        // （App.vue 就是这样）。误当成失败去补一个空 <template>，会把运行时的根渲染顶掉。
        const renderArg = a[1];
        const noRender = !renderArg ||
          (renderArg.type === 'UnaryExpression' && renderArg.operator === 'void') ||
          (renderArg.type === 'Identifier' && renderArg.name === 'undefined') ||
          (renderArg.type === 'Literal' && renderArg.value === null);

        out.assembly = {
          script: resolve(a[0]),
          template: resolve(a[1]),
          noRender,
          functional: gen(a[3]) === '!1' || gen(a[3]) === 'false',
          scopeId: sid.value,
          moduleId: a[6] && a[6].type === 'Literal' ? a[6].value : null,
          styleMods: [],
        };
      }
    }
    // --- __definePage("route", function(){return Vue.extend(n("id").default)}) ---
    if (n.type === 'CallExpression' && n.callee.type === 'Identifier' && n.callee.name === '__definePage' &&
        n.arguments.length >= 2 && n.arguments[0].type === 'Literal') {
      out.definePages.push({ route: String(n.arguments[0].value), mod: requireIdOf(n.arguments[1], req) });
    }
    // --- X.default.route = "pages/home/home"  (nvue 入口) ---
    if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' &&
        n.left.property && n.left.property.name === 'route' && n.right.type === 'Literal') {
      out.routeAssign = { route: String(n.right.value), mod: resolve(n.left.object) };
    }
    if (n.type === 'AssignmentExpression' && n.left.type === 'MemberExpression' &&
        n.left.property && n.left.property.name === 'mpType' && n.right.type === 'Literal' &&
        n.right.value === 'app') {
      out.appRoot = resolve(n.left.object);
    }
    // --- components: { tag: X.default } ---
    if (n.type === 'Property' && (n.key.name === 'components' || n.key.value === 'components') &&
        n.value.type === 'ObjectExpression') {
      const map = {};
      for (const p of n.value.properties) {
        if (p.type !== 'Property') continue;
        const key = p.key.name || p.key.value;
        const mid = resolve(p.value);
        if (mid) map[key] = mid;
      }
      if (Object.keys(map).length) out.componentMaps.push(map);
    }
    // --- 模板模块里的 var r = {uIcon: n(10).default} ---
    if (n.type === 'VariableDeclarator' && n.init && n.init.type === 'ObjectExpression' &&
        n.init.properties.length && n.init.properties.every(
          (p) => p.type === 'Property' && requireIdOf(p.value, req))) {
      const map = {};
      for (const p of n.init.properties) map[p.key.name || p.key.value] = requireIdOf(p.value, req);
      out.componentMaps.push(map);
    }
    // --- name: "u-icon" ---
    if (n.type === 'Property' && (n.key.name === 'name' || n.key.value === 'name') &&
        n.value.type === 'Literal' && typeof n.value.value === 'string' &&
        /^[a-zA-Z][\w-]*$/.test(n.value.value) && !out.optionName) {
      out.optionName = n.value.value;
    }
  });

  if (/function\s+\w+\([^)]{10,}\)\s*\{[^]*?_scopeId\s*=\s*"data-v-"/.test(src)) out.isNormalizeComponent = true;

  return out;
}

module.exports = { analyzeModule, walk, requireIdOf, gen };
