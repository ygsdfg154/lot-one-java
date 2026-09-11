// 不装工具链也能做的检查：源码树里每一条 import/require 路径都必须解析得到
// —— 要么是磁盘上真实存在的文件，要么是 package.json 里声明了的 npm 包。
const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2];              // code/
const SRC = path.join(ROOT, 'src');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const declared = new Set([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
]);

function listFiles(dir, acc = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { if (f.name === 'node_modules') continue; listFiles(p, acc); }
    // __runtime.js 里只有注释在讲 require('./' + id) 这种写法，会被下面的正则误判
    else if (/\.(vue|nvue|js)$/.test(f.name) && f.name !== '__runtime.js') acc.push(p);
  }
  return acc;
}

const SPEC = /(?:^|[^\w.])(?:import\s+(?:[\w${},*\s]+\s+from\s+)?|require\s*\(\s*)['"]([^'"]+)['"]/g;

const exists = (p) => {
  for (const c of [p, p + '.js', p + '.vue', p + '.nvue',
                   path.join(p, 'index.js'), path.join(p, 'index.vue'), path.join(p, 'index.nvue')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return true;
  }
  return false;
};

const missingFile = [], missingPkg = new Map();
let total = 0;
for (const f of listFiles(SRC)) {
  const s = fs.readFileSync(f, 'utf8');
  let m; SPEC.lastIndex = 0;
  while ((m = SPEC.exec(s))) {
    const spec = m[1];
    total++;
    if (spec.startsWith('@/')) {
      if (!exists(path.join(SRC, spec.slice(2)))) missingFile.push({ from: path.relative(SRC, f), spec });
    } else if (spec.startsWith('.')) {
      if (!exists(path.resolve(path.dirname(f), spec))) missingFile.push({ from: path.relative(SRC, f), spec });
    } else {
      // 裸模块名：取包名（含 scope）
      const name = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];
      if (!declared.has(name)) {
        if (!missingPkg.has(name)) missingPkg.set(name, new Set());
        missingPkg.get(name).add(path.relative(SRC, f));
      }
    }
  }
}

console.log(`共检查 ${total} 条 import/require`);
console.log(`路径解析失败: ${missingFile.length}`);
for (const x of missingFile.slice(0, 20)) console.log(`   ${x.from}  ->  ${x.spec}`);
console.log(`package.json 未声明的 npm 包: ${missingPkg.size}`);
for (const [name, files] of [...missingPkg].sort((a, b) => b[1].size - a[1].size)) {
  console.log(`   ${name.padEnd(38)} 被 ${files.size} 个文件引用`);
}
