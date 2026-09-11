/**
 * 页面 ↔ store 的连线校验：每个 `mapActions("模块", ["动作"])` / `mapMutations` 引用的
 * 名字都必须在对应 store 模块里真实存在。
 *
 * 起因是一次真实回归：重写 store/modules/device.js 时删掉了 `GetSharePositionRecord`，
 * 分享落地页仍在 mapActions 里引用它，运行时才报 "[vuex] unknown local action type"
 * ——页面点进去整块功能是空的。这类断裂靠肉眼看 diff 看不出来（调用点在 53 个页面里），
 * 静态扫一遍最省事。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PAGE_DIRS = ['src/pages', 'src/pagesCore', 'src/pagesFunc', 'src/pagesMore', 'src/pagesPay', 'src/components'];

/** 递归列出所有 .vue/.nvue 页面文件。 */
function pageFiles() {
  const out = [];
  const walk = (dir) => {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) return;
    for (const name of fs.readdirSync(abs)) {
      const rel = path.join(dir, name);
      const st = fs.statSync(path.join(ROOT, rel));
      if (st.isDirectory()) walk(rel);
      else if (/\.n?vue$/.test(name)) out.push(rel);
    }
  };
  PAGE_DIRS.forEach(walk);
  return out;
}

/** 从 store 模块源码里取出导出的 actions / mutations 名字。 */
function storeMembers(moduleName) {
  const file = path.join(ROOT, 'src/store/modules', moduleName + '.js');
  if (!fs.existsSync(file)) return null;
  const src = fs.readFileSync(file, 'utf8');
  const names = new Set();
  // 覆盖两种写法：反编译产物的 `Name: function (` 与手写的 `Name(` / `async Name(`
  const re = /(?:^|[\s,{])(?:async\s+)?([A-Za-z_$][\w$]*)\s*(?::\s*(?:async\s*)?function|\()/gm;
  let m;
  while ((m = re.exec(src))) names.add(m[1]);
  return names;
}

/** 扫出所有 mapActions/mapMutations 引用：[{file, module, kind, names[]}] */
function mapRefs() {
  const refs = [];
  const re = /map(Actions|Mutations)\(\s*["']([\w$]+)["']\s*,\s*\[([^\]]*)\]/g;
  for (const file of pageFiles()) {
    const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
    let m;
    while ((m = re.exec(src))) {
      const names = m[3]
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
      refs.push({ file, kind: m[1], module: m[2], names });
    }
  }
  return refs;
}

/**
 * 反编译产物里 vuex 的导入别名**每个文件都不一样**（`o`/`s`/`c`/`mod25`…）。
 * 批量替换 mapActions 时很容易把别的文件的别名抄过来，运行时才报
 * "ReferenceError: s is not defined"，整页白屏——静态扫一遍能立刻发现。
 */
describe('mapActions/mapGetters 的调用别名必须在本文件里声明过', () => {
  test('别名都能在同文件找到定义', () => {
    const bad = [];
    for (const file of pageFiles()) {
      const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
      const re = /\.\.\.([\w$]+)\.(?:mapActions|mapGetters|mapMutations|mapState)\(/g;
      let m;
      const seen = new Set();
      while ((m = re.exec(src))) seen.add(m[1]);
      for (const alias of seen) {
        // 别名要么是 import 进来的，要么是 var/const 声明的
        const declared = new RegExp(
          `(?:import\\s+(?:\\*\\s+as\\s+)?${alias}\\b|import\\s*\\{[^}]*\\b${alias}\\b[^}]*\\}|(?:var|let|const)\\s+${alias}\\b)`
        ).test(src);
        if (!declared) bad.push(`${file}: ${alias} 未声明`);
      }
    }
    if (bad.length) {
      throw new Error('vuex 别名对不上（运行时 ReferenceError，整页白屏）：\n  ' + bad.join('\n  '));
    }
  });
});

describe('页面引用的 store 动作都必须存在', () => {
  const refs = mapRefs();

  test('扫到了引用（扫不到说明正则失效，先修测试）', () => {
    expect(refs.length).toBeGreaterThan(20);
  });

  test('每个 mapActions/mapMutations 的名字都能在对应模块里找到', () => {
    const missing = [];
    for (const ref of refs) {
      const members = storeMembers(ref.module);
      if (!members) {
        missing.push(`${ref.file}: 模块 store/modules/${ref.module}.js 不存在`);
        continue;
      }
      for (const name of ref.names) {
        if (!members.has(name)) {
          missing.push(`${ref.file}: ${ref.module}/${name} 未定义`);
        }
      }
    }
    if (missing.length) {
      throw new Error(
        '页面引用了不存在的 store 成员（运行时报 "[vuex] unknown ... type"，' +
          '整块功能会静默变空）：\n  ' + missing.join('\n  ')
      );
    }
  });
});
