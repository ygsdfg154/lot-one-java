// 统计源码树实际引用了哪些 .unpacked 模块，以及它们的传递闭包
const fs = require('fs');
const path = require('path');

const OUT = process.argv[2];
const npmMap = JSON.parse(fs.readFileSync(path.join(OUT, 'docs', 'npm-map.json'), 'utf8'));

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

const REF = /@\/\.unpacked\/(svc|view|nvue)\/([^'"]+)\.js/g;

// 1. 源码树直接引用
const direct = new Map();           // "space:id" -> Set(引用它的文件)
for (const f of listFiles(OUT)) {
  const s = fs.readFileSync(f, 'utf8');
  let m;
  REF.lastIndex = 0;
  while ((m = REF.exec(s))) {
    const key = m[1] + ':' + m[2];
    if (!direct.has(key)) direct.set(key, new Set());
    direct.get(key).add(path.relative(OUT, f));
  }
}

// 2. 传递闭包（.unpacked 内部互相引用）
const closure = new Set(direct.keys());
const queue = [...direct.keys()];
const REF2 = /require\('\.\/([^']+)\.js'\)|@\/\.unpacked\/(svc|view|nvue)\/([^'"]+)\.js/g;
while (queue.length) {
  const key = queue.pop();
  const [space, id] = key.split(':');
  const p = path.join(OUT, '.unpacked', space, id + '.js');
  if (!fs.existsSync(p)) continue;
  const s = fs.readFileSync(p, 'utf8');
  let m;
  REF2.lastIndex = 0;
  while ((m = REF2.exec(s))) {
    const k = m[1] ? space + ':' + m[1] : m[2] + ':' + m[3];
    if (k.endsWith(':__runtime')) continue;
    if (!closure.has(k)) { closure.add(k); queue.push(k); }
  }
}

const isNpm = (key) => {
  const [space, id] = key.split(':');
  return (npmMap[space] || {})[id] || null;
};

const npmHit = [], business = [];
for (const k of closure) (isNpm(k) ? npmHit : business).push(k);

console.log(`源码树直接引用: ${direct.size} 个模块`);
console.log(`传递闭包共:     ${closure.size} 个模块`);
console.log(`  其中已识别为 npm 包: ${npmHit.length}`);
console.log(`  其余（业务/未识别）: ${business.length}`);

const byPkg = {};
for (const k of npmHit) (byPkg[isNpm(k)] = byPkg[isNpm(k)] || []).push(k);
console.log('\n--- 需要装的 npm 包 ---');
for (const [pkg, ks] of Object.entries(byPkg).sort()) console.log(`  ${pkg.padEnd(52)} <- ${ks.join(', ')}`);

// 未识别的按体积排序，帮助人工判断
const sized = business.map((k) => {
  const [space, id] = k.split(':');
  const p = path.join(OUT, '.unpacked', space, id + '.js');
  return { k, size: fs.existsSync(p) ? fs.statSync(p).size : 0, refs: direct.has(k) ? direct.get(k).size : 0 };
}).sort((a, b) => b.size - a.size);
console.log('\n--- 未识别模块（按体积，前 25）---');
for (const x of sized.slice(0, 25)) console.log(`  ${x.k.padEnd(14)} ${String(x.size).padStart(8)} B  被源码树直接引用 ${x.refs} 处`);

fs.writeFileSync(path.join(OUT, 'docs', 'depgraph.json'), JSON.stringify({
  direct: Object.fromEntries([...direct].map(([k, v]) => [k, [...v]])),
  closure: [...closure], npmHit, business: sized,
}, null, 2));
