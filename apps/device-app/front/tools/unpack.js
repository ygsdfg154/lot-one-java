// 把 webpack bundle 拆成一个个模块（不执行业务代码）
// 用法: node unpack.js <bundle.js> <outDir>
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function unpack(file) {
  let src = fs.readFileSync(file, 'utf8');

  // 形式 A: IIFE  !function(e){...; n(n.s=925)}([...])
  //         (function(t){...; a(a.s="2cc4")})({...})
  // 把入口调用替换成捕获 n.m（bootstrap 里 n.m = modules）
  const entryRe = /(\b[A-Za-z_$][\w$]*)\(\1\.s\s*=\s*(?:"[^"]*"|'[^']*'|\d+)\)/;
  let replaced = false;
  if (entryRe.test(src)) {
    src = src.replace(entryRe, (m, id) => {
      replaced = true;
      return `(globalThis.__CAPTURE__=${id}.m)`;
    });
  }

  const sandbox = {
    globalThis: null,
    console: { log() {}, warn() {}, error() {} },
    window: undefined,
    __CAPTURE__: null,
  };
  sandbox.globalThis = sandbox;
  sandbox.self = sandbox;
  // 形式 B: webpackJsonp.push([[chunk],{modules}])
  const captured = [];
  const jsonp = [];
  jsonp.push = function (item) {
    captured.push(item);
    return Array.prototype.push.call(this, item);
  };
  sandbox.webpackJsonp = jsonp;

  vm.createContext(sandbox);
  try {
    vm.runInContext(src, sandbox, { filename: path.basename(file), timeout: 30000 });
  } catch (e) {
    // bootstrap 之外的东西报错无所谓，模块通常已捕获
    if (!sandbox.__CAPTURE__ && !captured.length) throw e;
  }

  const modules = {};
  const meta = { file: path.basename(file), form: null, chunks: [], entry: null };

  if (sandbox.__CAPTURE__) {
    meta.form = 'iife';
    const m = sandbox.__CAPTURE__;
    for (const k of Object.keys(m)) modules[k] = m[k];
    const em = /\b([A-Za-z_$][\w$]*)\(\1\.s\s*=\s*("[^"]*"|'[^']*'|\d+)\)/.exec(
      fs.readFileSync(file, 'utf8')
    );
    if (em) meta.entry = em[2].replace(/['"]/g, '');
  }
  for (const item of captured) {
    meta.form = meta.form || 'jsonp';
    const [chunkIds, mods] = item;
    meta.chunks.push(chunkIds);
    for (const k of Object.keys(mods)) modules[k] = mods[k];
  }

  return { modules, meta, replaced };
}

if (require.main === module) {
  const [file, outDir] = process.argv.slice(2);
  const { modules, meta } = unpack(file);
  fs.mkdirSync(outDir, { recursive: true });
  const ids = Object.keys(modules);
  for (const id of ids) {
    const fn = modules[id];
    const code = typeof fn === 'function' ? fn.toString() : String(fn);
    fs.writeFileSync(path.join(outDir, encodeURIComponent(id) + '.js'), code, 'utf8');
  }
  fs.writeFileSync(path.join(outDir, '_meta.json'), JSON.stringify({ ...meta, count: ids.length, ids }, null, 2));
  console.log(file, '->', ids.length, 'modules, form=', meta.form, 'entry=', meta.entry);
}

module.exports = { unpack };
