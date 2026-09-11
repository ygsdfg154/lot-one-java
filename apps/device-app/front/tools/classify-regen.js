// 给 regenerator 状态机分类，决定哪些能安全地改回 async/await
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const astring = require('astring');

const SRC = process.argv[2];
const gen = (n) => { try { return astring.generate(n); } catch { return ''; } };

function listFiles(dir, acc = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) { if (['static', 'docs', 'node_modules'].includes(f.name)) continue; listFiles(p, acc); }
    else if (/\.(vue|nvue|js)$/.test(f.name)) acc.push(p);
  }
  return acc;
}
const scriptOf = (s, f) => (/\.(vue|nvue)$/.test(f) ? (/<script>([\s\S]*?)<\/script>/.exec(s) || [, null])[1] : s);

function walk(n, cb) {
  if (!n || typeof n !== 'object') return;
  if (Array.isArray(n)) { n.forEach((x) => walk(x, cb)); return; }
  if (n.type) cb(n);
  for (const k of Object.keys(n)) { if (k === 'type' || k === 'start' || k === 'end') continue; walk(n[k], cb); }
}

const stats = { A: 0, B: 0, C: 0, total: 0 };
const samples = { A: [], B: [], C: [] };
const reasons = {};

for (const f of listFiles(SRC)) {
  const code = scriptOf(fs.readFileSync(f, 'utf8'), f);
  if (!code) continue;
  let ast;
  try { ast = acorn.parse(code, { ecmaVersion: 2022, sourceType: 'module' }); } catch { continue; }

  walk(ast, (n) => {
    if (n.type !== 'CallExpression' || !n.callee || n.callee.type !== 'MemberExpression') return;
    if (!n.callee.property || n.callee.property.name !== 'wrap') return;
    const fn = n.arguments[0];
    if (!fn || !/Function/.test(fn.type)) return;
    stats.total++;

    const ctx = fn.params[0] && fn.params[0].name;
    let sw = null;
    walk(fn.body, (x) => { if (!sw && x.type === 'SwitchStatement') sw = x; });
    if (!sw || !ctx) { stats.C++; (reasons['无法定位 switch'] = (reasons['无法定位 switch'] || 0) + 1); return; }

    const src = gen(fn);
    const labels = sw.cases.filter((c) => c.test && typeof c.test.value === 'number').map((c) => c.test.value);
    const ascending = labels.every((v, i) => i === 0 || v > labels[i - 1]);

    const hasTry = new RegExp('\\b' + ctx + '\\.(t0|t1)\\b').test(src) ||
                   new RegExp('\\b' + ctx + '\\.prev\\s*=\\s*\\d').test(src) ||
                   /finish\(|catch\(/.test(src);
    const hasAbrupt = new RegExp('abrupt\\("(break|continue)"').test(src);
    const hasDelegate = /delegateYield/.test(src);

    // 条件跳转：case 体里出现 `ctx.next = N` 且不是「case 末尾直落」的形式
    let condJump = false;
    for (const c of sw.cases) {
      walk(c.consequent, (x) => {
        if (x.type === 'AssignmentExpression' && x.left.type === 'MemberExpression' &&
            x.left.object.name === ctx && x.left.property.name === 'next') {
          // 出现在 if / 逻辑表达式里 => 条件跳转
          // 简化判定：若该赋值不在 `return (ctx.next=N, EXPR)` 里，就算条件跳转
          condJump = condJump || !(x.__inReturn);
        }
      });
      // 标记 return (ctx.next=N, EXPR) 里的那些
      walk(c.consequent, (x) => {
        if (x.type === 'ReturnStatement' && x.argument && x.argument.type === 'SequenceExpression') {
          for (const e of x.argument.expressions) {
            if (e.type === 'AssignmentExpression' && e.left.type === 'MemberExpression' &&
                e.left.object.name === ctx && e.left.property.name === 'next') e.__inReturn = true;
          }
        }
      });
    }
    // 重新判定（先标记再判定）
    condJump = false;
    for (const c of sw.cases) {
      walk(c.consequent, (x) => {
        if (x.type === 'AssignmentExpression' && x.left.type === 'MemberExpression' &&
            x.left.object && x.left.object.name === ctx && x.left.property.name === 'next' && !x.__inReturn) {
          condJump = true;
        }
      });
    }

    let cls;
    if (hasTry || hasDelegate || hasAbrupt || !ascending) {
      cls = 'C';
      const r = hasTry ? 'try/catch' : hasDelegate ? 'yield*' : hasAbrupt ? 'break/continue 跳转' : '标号非递增(循环)';
      reasons[r] = (reasons[r] || 0) + 1;
    } else if (condJump) {
      cls = 'B'; reasons['条件跳转(if/else)'] = (reasons['条件跳转(if/else)'] || 0) + 1;
    } else {
      cls = 'A'; reasons['纯顺序 await'] = (reasons['纯顺序 await'] || 0) + 1;
    }
    stats[cls]++;
    if (samples[cls].length < 2) samples[cls].push({ file: path.relative(SRC, f), code: src.slice(0, 500) });
  });
}

console.log(`状态机总数: ${stats.total}`);
console.log(`  A 纯顺序 await（可安全自动转换）: ${stats.A}`);
console.log(`  B 含条件跳转（需重建 if/else）  : ${stats.B}`);
console.log(`  C 含 try/循环/中断（最难）      : ${stats.C}`);
console.log('\n细分原因:');
for (const [k, v] of Object.entries(reasons).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(4)}  ${k}`);
for (const c of ['A', 'B']) {
  if (samples[c][0]) { console.log(`\n===== ${c} 类样例 (${samples[c][0].file}) =====`); console.log(samples[c][0].code); }
}
