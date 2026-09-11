// 平台/结构检查 —— 专门针对「从某一平台的构建产物还原源码」会踩的两类坑。
//
// 背景：打包产物里混着三层东西
//   1) 业务源码        —— 我们要的
//   2) 平台运行时胶水  —— 编译器按平台注入的（全局对象、引导文件、页面注册）
//   3) 打包器机制      —— 模块包装、动态 require
// verify.js 管的是第 3 层加一部分第 1 层，而且**明确跳过了 .unpacked/**。
// 这几次运行时崩溃全都出在第 2 层且全都在 .unpacked/ 里 —— 正好是双重盲区。
//
// 用法: node tools/platform-check.js .
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const { collectFree } = require('./lib/scope');

const ROOT = process.argv[2] || '.';
const SRC = path.join(ROOT, 'src');

/* ---------- 1) 可执行重复副本 ---------- */
// 一个模块如果既有正式文件、又在 .unpacked/ 里留了一份，那份副本是**会被执行**的。
// main.js 的副本被引到就会让整个应用引导跑第二遍。
function findDuplicates() {
  const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'docs', 'restore-map.json'), 'utf8')).plan;
  const dups = [];
  for (const [key, p] of Object.entries(map)) {
    const [space, id] = key.split(':');
    const copy = path.join(SRC, '.unpacked', space, id + '.js');
    if (fs.existsSync(copy)) {
      dups.push({ key, canonical: p.file, copy: path.relative(SRC, copy), kind: p.kind });
    }
  }
  return dups;
}

/* ---------- 2) 平台专有全局 ---------- */
// 这些在 app-plus / nvue 运行时由平台注入，H5 下不存在（或只是打日志的空壳）。
const FATAL = {
  Vue: '必须改成 import Vue from "vue"，H5 无此全局',
  __definePage: '编译器生成的页面注册，应由 pages.json 承担',
  __uniConfig: '编译器注入的配置对象',
  __uniRoutes: '编译器注入的路由表',
};
// 这两个在 app-plus 存在、H5 不存在，但业务代码里常有平台判断包着，只作提示
const WARN = { plus: 'app-plus 专有', weex: 'nvue 专有' };

const SAFE = new Set([
  'Object', 'Array', 'String', 'Number', 'Boolean', 'Function', 'Symbol', 'BigInt', 'Math', 'JSON',
  'Date', 'RegExp', 'Error', 'TypeError', 'RangeError', 'SyntaxError', 'Promise', 'Map', 'Set',
  'WeakMap', 'WeakSet', 'Proxy', 'Reflect', 'ArrayBuffer', 'Uint8Array', 'Int8Array', 'Uint8ClampedArray',
  'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array',
  'BigInt64Array', 'BigUint64Array', 'DataView', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
  'NaN', 'Infinity', 'undefined', 'encodeURIComponent', 'decodeURIComponent', 'encodeURI', 'decodeURI',
  'escape', 'unescape', 'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'globalThis',
  'console', 'arguments', 'eval', 'btoa', 'atob', 'TextDecoder', 'TextEncoder', 'URL', 'Intl',
  'requestAnimationFrame', 'cancelAnimationFrame', 'queueMicrotask', 'structuredClone',
  'require', 'module', 'exports', '__dirname', '__filename', 'process', 'Buffer', 'global',
  'uni', 'wx', 'getApp', 'getCurrentPages', 'regeneratorRuntime',
  'window', 'document', 'navigator', 'location', 'history', 'localStorage', 'sessionStorage',
  'screen', 'XMLHttpRequest', 'WebSocket', 'fetch', 'alert', 'confirm', 'prompt',
  'FileReader', 'Blob', 'FormData', 'Image', 'CSS', 'HTMLElement', 'Element', 'Node',
  'Event', 'CustomEvent', 'MutationObserver', 'UniViewJSBridge', 'UniServiceJSBridge',
  '__f__', '__log__',
]);

function listFiles(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (['static', 'docs', 'node_modules'].includes(f.name)) continue;
      listFiles(p, acc);
    } else if (/\.(vue|nvue|js)$/.test(f.name) && f.name !== '__runtime.js') acc.push(p);
  }
  return acc;
}
const scriptOf = (s, f) =>
  (/\.(vue|nvue)$/.test(f) ? (/<script>([\s\S]*?)<\/script>/.exec(s) || [, null])[1] : s);

function scanGlobals() {
  const fatal = [], warn = [], unknown = [];
  for (const f of listFiles(SRC)) {
    const code = scriptOf(fs.readFileSync(f, 'utf8'), f);
    if (!code || !code.trim()) continue;
    let ast;
    try { ast = acorn.parse(code, { ecmaVersion: 2022, sourceType: 'module' }); }
    catch { try { ast = acorn.parse(code, { ecmaVersion: 2022, sourceType: 'script' }); } catch { continue; } }

    const imported = new Set();
    for (const st of ast.body) {
      if (st.type === 'ImportDeclaration') for (const sp of st.specifiers) imported.add(sp.local.name);
    }
    let free;
    try { free = collectFree(ast); } catch { continue; }

    const rel = path.relative(SRC, f);
    for (const [name, info] of free) {
      if (imported.has(name)) continue;
      if (FATAL[name]) fatal.push({ file: rel, name, count: info.count, why: FATAL[name] });
      else if (WARN[name]) warn.push({ file: rel, name, count: info.count, why: WARN[name] });
      else if (!SAFE.has(name)) unknown.push({ file: rel, name, count: info.count });
    }
  }
  return { fatal, warn, unknown };
}

/* ---------- 输出 ---------- */
const dups = findDuplicates();
const { fatal, warn, unknown } = scanGlobals();

console.log('=== 1) 可执行重复副本（正式文件 + .unpacked 里各一份）===');
console.log(`   ${dups.length} 个`);
for (const d of dups.slice(0, 15)) console.log(`   [${d.kind}] ${d.canonical}  ←→  ${d.copy}`);
if (dups.length > 15) console.log(`   …其余 ${dups.length - 15} 个见 docs/platform-check.json`);

console.log('\n=== 2) 平台专有全局（H5 下不存在，会运行时崩）===');
const byName = {};
for (const x of fatal) (byName[x.name] = byName[x.name] || []).push(x);
if (!fatal.length) console.log('   无');
for (const [name, list] of Object.entries(byName)) {
  console.log(`   ${name}  —— ${FATAL[name]}`);
  for (const x of list.slice(0, 6)) console.log(`      ${x.file}  (${x.count} 处)`);
  if (list.length > 6) console.log(`      …共 ${list.length} 个文件`);
}

console.log('\n=== 3) 平台相关全局（提示，通常有平台判断包着）===');
const wByName = {};
for (const x of warn) (wByName[x.name] = wByName[x.name] || []).push(x);
for (const [name, list] of Object.entries(wByName)) {
  console.log(`   ${name} (${WARN[name]})：${list.length} 个文件，共 ${list.reduce((a, b) => a + b.count, 0)} 处`);
}

console.log('\n=== 4) 既非已知全局、也未 import 的标识符 ===');
const uByName = {};
for (const x of unknown) (uByName[x.name] = uByName[x.name] || []).push(x);
const uSorted = Object.entries(uByName).sort((a, b) => b[1].length - a[1].length);
console.log(`   ${uSorted.length} 个不同名字`);
for (const [name, list] of uSorted.slice(0, 12)) {
  console.log(`   ${name}: ${list.length} 个文件  例: ${list[0].file}`);
}

fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'docs', 'platform-check.json'),
  JSON.stringify({ duplicates: dups, fatal, warn, unknown }, null, 2));

const bad = dups.length + fatal.length;
console.log(`\n结论: ${bad === 0 ? '通过' : '发现 ' + bad + ' 个必须处理的问题'}`);
process.exitCode = bad ? 1 : 0;
