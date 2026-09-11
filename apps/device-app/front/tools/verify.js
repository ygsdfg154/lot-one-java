// 独立校验：产物里的自由标识符必须全部是「已知全局」或「本文件 import 进来的」。
// 出现任何第三类名字，就说明去压缩漏掉了某个绑定 —— 这是能自动发现"静默改坏"的最强信号。
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const { collectFree } = require('./lib/scope');

const OUT = process.argv[2];

const GLOBALS = new Set([
  // JS 内置
  'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'Symbol', 'BigInt',
  'Math', 'JSON', 'Date', 'RegExp', 'Error', 'TypeError', 'RangeError', 'SyntaxError',
  'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Proxy', 'Reflect', 'ArrayBuffer',
  'Uint8Array', 'Int8Array', 'Float32Array', 'Float64Array', 'DataView',
  'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'NaN', 'Infinity', 'undefined',
  'encodeURIComponent', 'decodeURIComponent', 'encodeURI', 'decodeURI', 'escape', 'unescape',
  'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'globalThis', 'console',
  'arguments', 'eval', 'btoa', 'atob', 'TextDecoder', 'TextEncoder', 'URL', 'Intl',
  'requestAnimationFrame', 'cancelAnimationFrame', 'queueMicrotask', 'structuredClone',
  // CommonJS / 打包器
  'require', 'module', 'exports', '__dirname', '__filename', 'process', 'Buffer', 'global',
  // uni-app / 5+ / weex 运行时
  'uni', 'plus', 'wx', 'weex', 'Vue', 'getApp', 'getCurrentPages', 'UniViewJSBridge',
  'UniServiceJSBridge', '__uniConfig', '__uniRoutes', '__definePage', '__f__', '__log__',
  'regeneratorRuntime', 'window', 'document', 'navigator', 'location', 'history',
  'localStorage', 'sessionStorage', 'screen', 'XMLHttpRequest', 'WebSocket', 'fetch',
  'alert', 'confirm', 'prompt', 'FileReader', 'Blob', 'FormData', 'Image', 'CSS',
  'HTMLElement', 'Element', 'Node', 'Event', 'CustomEvent', 'MutationObserver',
]);

function scriptOf(src, file) {
  if (/\.(vue|nvue)$/.test(file)) {
    const m = /<script>([\s\S]*?)<\/script>/.exec(src);
    return m ? m[1] : null;
  }
  return src;
}

function listFiles(dir, acc = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (['.unpacked', 'static', 'docs', 'tools', 'node_modules', 'locale'].includes(f.name)) continue;
      listFiles(p, acc);
    } else if (/\.(vue|nvue|js)$/.test(f.name)) acc.push(p);
  }
  return acc;
}

const files = listFiles(OUT);
let checked = 0, clean = 0, wrapped = 0;
const problems = [];

for (const f of files) {
  const raw = fs.readFileSync(f, 'utf8');
  const code = scriptOf(raw, f);
  if (!code || !code.trim()) continue;
  checked++;

  // 仍保留 webpack 包装的（退回形式）不参与本项校验
  if (/\(module, exports, require\);/.test(code)) { wrapped++; continue; }

  let ast;
  try { ast = acorn.parse(code, { ecmaVersion: 2022, sourceType: 'module' }); }
  catch (e) { problems.push({ file: f, kind: 'parse', detail: e.message }); continue; }

  const imported = new Set();
  for (const st of ast.body) {
    if (st.type === 'ImportDeclaration') for (const sp of st.specifiers) imported.add(sp.local.name);
  }

  let free;
  try { free = collectFree(ast); } catch (e) { problems.push({ file: f, kind: 'scope', detail: e.message }); continue; }

  const unknown = [];
  for (const [name, info] of free) {
    if (GLOBALS.has(name) || imported.has(name)) continue;
    unknown.push(`${name}(${info.count})`);
  }
  if (unknown.length) problems.push({ file: path.relative(OUT, f), kind: 'unbound', detail: unknown.join(', ') });
  else clean++;
}

console.log(`检查文件: ${checked}   通过: ${clean}   仍是 webpack 包装(跳过): ${wrapped}   有问题: ${problems.length}`);
if (problems.length) {
  const byKind = {};
  for (const p of problems) (byKind[p.kind] = byKind[p.kind] || []).push(p);
  for (const [k, v] of Object.entries(byKind)) {
    console.log(`\n--- ${k}: ${v.length} ---`);
    for (const p of v.slice(0, 15)) console.log(`  ${p.file}\n      ${String(p.detail).slice(0, 160)}`);
  }
}
fs.mkdirSync(path.join(OUT, 'docs'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'docs', 'verify-report.json'),
  JSON.stringify({ checked, clean, wrapped, problems }, null, 2));
