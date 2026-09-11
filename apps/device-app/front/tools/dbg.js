// 调试单个模块的去压缩：node dbg.js <space> <modId>
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const { unpack } = require('./unpack');
const { deminify } = require('./lib/demin');

const WWW = 'E:/AILab/17yoo/github/gitlab/com.qzwlvp.qzapp_1.2.0/assets/apps/__UNI__7115D8B/www';
const [space, modId] = process.argv.slice(2);

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
  return { svc, view: ['app-view.js'], nvue };
}
const B = listBundles();
const mods = {};
const interop = new Set();
for (const f of B[space]) {
  try {
    const r = unpack(path.join(WWW, f));
    for (const [id, fn] of Object.entries(r.modules)) {
      const src = typeof fn === 'function' ? fn.toString() : String(fn);
      if (!mods[id] || mods[id].length < src.length) mods[id] = src;
    }
  } catch {}
}
for (const [id, src] of Object.entries(mods)) {
  if (/__esModule\s*\?\s*\w+\s*:\s*\{\s*default\s*:/.test(src) && src.length < 400) interop.add(id);
}

const src = mods[modId];
if (!src) { console.log('模块不存在'); process.exit(1); }
console.log('=== 原始（前 500 字符）===');
console.log(src.slice(0, 500));

const r = deminify(src, (p) => '@/m/' + p + '.js', { isInterop: (p) => interop.has(p) });
console.log('\n=== notes ===');
console.log((r.notes || []).join('\n'));
console.log('\n=== 悬空引用上下文 ===');
const removed = new Set(r.removed || []);
let ast;
try { ast = acorn.parse(r.code, { ecmaVersion: 2022, sourceType: 'module' }); }
catch (e) { console.log('产物解析失败:', e.message); process.exit(0); }
const seen = new Set();
(function scan(n, parent, key) {
  if (!n || typeof n !== 'object') return;
  if (Array.isArray(n)) { n.forEach((x) => scan(x, parent, key)); return; }
  if (n.type === 'Identifier' && removed.has(n.name)) {
    const isProp = parent && parent.type === 'MemberExpression' && key === 'property' && !parent.computed;
    const isKey = parent && parent.type === 'Property' && key === 'key' && !parent.computed;
    const isDecl = parent && /Declarator|FunctionDeclaration/.test(parent.type) && key === 'id';
    const isParam = parent && /Function/.test(parent.type) && key === 'params';
    if (!isProp && !isKey && !isDecl && !isParam) {
      const ctx = r.code.slice(Math.max(0, n.start - 90), n.start + 60).replace(/\s+/g, ' ');
      if (!seen.has(ctx)) { seen.add(ctx); console.log(`[${n.name}] ...${ctx}...`); }
    }
  }
  for (const k of Object.keys(n)) {
    if (k === 'type' || k === 'start' || k === 'end') continue;
    scan(n[k], n, k);
  }
})(ast, null, null);
