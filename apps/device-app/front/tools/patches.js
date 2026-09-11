// 源码级补丁：反编译是机械还原，原包里本来就有的 bug 会被忠实保留。
// 这里集中记录「明确要偏离原包」的修改，每条都必须写清依据。
// 用法: node patches.js <code/src>
const fs = require('fs');
const path = require('path');

const SRC = process.argv[2];

/* ---------------- 需要新建的文件 ---------------- */
// src/ 每次都会被 restore.js 重新生成，所以工程新增的文件也得登记在这里才不会丢。
const CREATE = [
  {
    path: 'common/h5-layout-fix.css',
    why: 'nvue 与 H5 的布局模型差异：nvue 下页面/scroll-view 默认铺满视口，H5 下不会，' +
         '导致 uni-page-body 往下整条链高度为 0，flex:1 的子元素（如首页地图）算不出高度。',
    content: `/**
 * H5 预览专用的布局垫片 —— 只被 common/h5-plus-shim.js 引入，
 * 而那个文件整体处于 H5 条件编译块内，所以 app-plus 构建完全不会包含本文件。
 *
 * 注意：本文件里不要写条件编译指令，靠"只在 H5 侧被 import"来限定作用范围即可。
 *
 * 解决的问题：
 *   nvue 里每个元素默认 display:flex、flex-direction:column，页面与 scroll-view
 *   天然铺满视口；编译到 H5 后走普通 CSS，这层默认行为不存在，于是
 *   uni-page-body -> uni-scroll-view -> .flex-1 -> uni-map 整条链高度全为 0，
 *   地图容器高度为 0 自然什么都看不到。
 *
 * 这是**预览用的近似**，不代表真机布局。真机以 app-plus 构建为准。
 */

uni-page-wrapper,
uni-page-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

/* 让页面里的滚动容器吃掉剩余空间，而不是塌成 0 */
uni-page-body > uni-scroll-view,
uni-page-body > uni-view {
  flex: 1 1 auto;
  min-height: 0;
}

/* scroll-view 内部有三层包装（uni-scroll-view > div.uni-scroll-view >
   div.uni-scroll-view > div.uni-scroll-view-content），任何一层塌成 0
   都会让 flex:1 的后代算不出高度，所以整条链都要撑开 */
/* uni-h5 自带的规则优先级更高，会把 flex 压成 0 0 auto 让容器塌成 0，
   这里是预览用垫片，直接用 !important 压住 */
uni-page-body > uni-scroll-view,
uni-page-body > uni-view {
  flex: 1 1 auto !important;
  min-height: 0 !important;
}

uni-scroll-view {
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}
uni-scroll-view > .uni-scroll-view,
.uni-scroll-view > .uni-scroll-view,
.uni-scroll-view > .uni-scroll-view-content {
  min-height: 0;
  height: 100%;
  flex: 1 1 auto;
}

/* flex:1 的子项在 H5 下需要 min-height:0 才能真正收缩/撑开 */
uni-view.flex-1,
uni-view[class*="flex-1"] {
  min-height: 0;
}
`,
  },
  {
    path: 'common/h5-plus-shim.js',
    why: 'H5 预览用的 plus/weex 桩：原始代码里的 #ifdef APP-PLUS 在构建产物中已被抹除，' +
         'App 专有 API 现在会在 H5 下无条件执行并抛错，导致整个应用白屏。',
    content: `/**
 * H5 预览专用桩 —— 仅用于让浏览器预览跑得起来，**不参与 app-plus 构建**。
 *
 * 背景：原始代码里的 App 专有调用本来包在 APP-PLUS 条件编译块里，
 * 而条件编译块在构建产物中被彻底抹除（和注释一样不可恢复），
 *
 * ⚠️ 本文件的注释里**不要**出现条件编译指令的字面写法：
 *    uni-app 的预处理器是逐行扫 token 的，注释里的指令同样会被计入配对，
 *    多出一个开启标记就会导致「条件编译失败」，整个构建起不来。
 * 于是 plus.* / weex.* 在 H5 下无条件执行 -> ReferenceError -> 全站白屏。
 *
 * 这里用条件编译把桩限定在 H5：app-plus 上整段代码会被编译器删掉，行为完全不变。
 *
 * ⚠️ 桩会让 App 逻辑走到假分支，**H5 的行为不等于真机**。
 *    功能验证请以 HBuilderX 运行 dist/build/app-plus 到真机为准。
 */

// #ifdef H5

/**
 * uni-app H5 的框架外壳样式。
 *
 * 少了它，<uni-app> / <uni-page> / <uni-tabbar> 这些自定义元素拿不到任何样式，
 * 浏览器按未知元素处理成 display:inline，于是整个应用外壳塌掉 ——
 * 最明显的症状就是底部 tabBar 被挤出视口、看不见。
 *
 * 为什么反编译产物里没有它：原包是 app-plus 构建，那边 tabBar 是**原生**的，
 * 根本不在 DOM 里，所以 app-view.js 的 CSS 里从来就没有 uni-tabbar 规则。
 * 这份样式属于 H5 平台运行时，只能从 npm 包引。
 */
import '@dcloudio/uni-h5/dist/index.css';

// nvue -> H5 的布局差异补丁（详见该文件头部说明）
import './h5-layout-fix.css';

(function () {
  if (typeof window === 'undefined') return;

  // 记录页面实际用到了哪些 App 专有 API —— 冒烟测试会把它收集起来，
  // 这样桩不只是"让它别崩"，还能告诉我们哪些地方依赖了原生能力。
  const used = new Set();
  const report = () => {
    if (!used.size) return;
    console.info('[h5-plus-shim] 本页用到的 App 专有 API: ' + [...used].sort().join(', '));
  };
  window.__h5PlusShimUsed = used;
  setTimeout(report, 2000);

  const makeStub = (path) => new Proxy(function () {}, {
    get(_t, k) {
      // 这几个必须返回真值，否则会破坏字符串拼接 / await / 迭代
      if (k === Symbol.toPrimitive) return () => '';
      if (k === 'toString' || k === 'valueOf') return () => '';
      if (k === 'then' || k === Symbol.iterator || k === Symbol.asyncIterator) return undefined;
      if (k === Symbol.toStringTag) return 'H5PlusShim';
      if (typeof k === 'symbol') return undefined;
      used.add(path + '.' + String(k));
      return makeStub(path + '.' + String(k));
    },
    apply() { return makeStub(path + '()'); },
    construct() { return makeStub('new ' + path); },
    has() { return true; },
  });

  if (typeof window.plus === 'undefined') window.plus = makeStub('plus');
  if (typeof window.weex === 'undefined') window.weex = makeStub('weex');
})();
// #endif
`,
  },
];

const PATCHES = [
  {
    id: 'alarmOn-undeclared',
    why: [
      '原包 bug：getBuffer() 里引用了从未声明的 alarmOn，运行到这行会抛 ReferenceError。',
      '依据：同文件紧邻的兄弟方法写的是 `e.selectedRadioValue = e.radioValue = n.data ? 0 : 1`，',
      '而这里是 `(!!n.data, ... = alarmOn ? 0 : 1)` —— 作者本意是 `const alarmOn = !!n.data`，漏了赋值。',
      '`!!x ? 0 : 1` 与 `x ? 0 : 1` 等价，所以修复后的行为与兄弟方法完全一致。',
    ],
    files: ['components/directivePopup/directivePopup.nvue', '.unpacked/nvue/370.js'],
    // 直接对齐兄弟方法的写法，不引入新变量：`!!x ? 0 : 1` 与 `x ? 0 : 1` 完全等价。
    // （试过补一个 `var alarmOn` 声明，但按文本锚点会插错函数 —— 少改一处更稳。）
    find: '(!!n.data, e.selectedRadioValue = e.radioValue = alarmOn ? 0 : 1)',
    replace: '(e.selectedRadioValue = e.radioValue = n.data ? 0 : 1)',
  },
  {
    id: 'guard-app-only-permission-api',
    why: [
      '`uni.createRequestPermissionListener()` 是 Android(App) 专有 API，H5 下不存在。',
      '原始代码几乎肯定包在 `// #ifdef APP-PLUS` 里 —— 但条件编译块在构建产物中被彻底抹除，',
      '和注释一样属于永久丢失的信息，反编译无法还原。',
      '结果是 App 专有代码在 H5 下无条件执行，在 onLaunch 里抛错导致整个应用白屏。',
      '这里补一个 typeof 守卫：app-plus 上该 API 存在，行为完全不变；H5 上安全跳过。',
    ],
    files: ['App.vue'],
    find: 'var t = this, n = uni.createRequestPermissionListener();',
    replace: 'if (typeof uni.createRequestPermissionListener !== "function") return;   // [还原补丁] 原为 #ifdef APP-PLUS\n      var t = this, n = uni.createRequestPermissionListener();',
  },
  {
    id: 'load-h5-plus-shim',
    why: [
      '把 H5 预览桩挂到应用入口。桩内部用 #ifdef H5 包着，app-plus 构建时整段会被编译器删掉。',
    ],
    files: ['main.js'],
    find: '\n"use strict";\n',
    replace: "\nimport '@/common/h5-plus-shim.js';   // [还原补丁] 仅 H5 预览用，app-plus 下为空\n\n\"use strict\";\n",
  },
];

let applied = 0, skipped = 0;
const log = [];

/* 先建文件，再打补丁 —— 补丁可能引用新建的文件 */
for (const c of CREATE) {
  const f = path.join(SRC, c.path);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, c.content, 'utf8');
  log.push(`[新建] ${c.path}`);
  applied++;
}

for (const p of PATCHES) {
  for (const rel of p.files) {
    const f = path.join(SRC, rel);
    if (!fs.existsSync(f)) { log.push(`[跳过] ${p.id}: 文件不存在 ${rel}`); skipped++; continue; }
    let s = fs.readFileSync(f, 'utf8');
    if (!s.includes(p.find)) {
      if (s.includes(p.replace)) { log.push(`[已打] ${p.id} @ ${rel}`); continue; }
      log.push(`[失败] ${p.id}: 在 ${rel} 里找不到目标代码 —— 生成逻辑可能变了，需要复核`);
      skipped++; continue;
    }
    s = s.split(p.find).join(p.replace);
    for (const a of p.also || []) {
      if (a.once) {
        const i = s.indexOf(a.find);
        if (i >= 0) s = s.slice(0, i) + a.replace + s.slice(i + a.find.length);
      } else s = s.split(a.find).join(a.replace);
    }
    fs.writeFileSync(f, s, 'utf8');
    log.push(`[已打] ${p.id} @ ${rel}`);
    applied++;
  }
}

console.log(log.join('\n'));
console.log(`\n补丁: 应用 ${applied} 处, 跳过/失败 ${skipped} 处`);
if (skipped) process.exitCode = 1;
