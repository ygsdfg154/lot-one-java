/**
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
