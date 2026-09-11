// 按模块内容判定它是哪个 npm 包。
// 只映射「真库」（moment/vuex/... ）；babel helper 保持本地副本 —— 它们是随包发出去的
// 精确实现，换成 npm 版反而引入版本差异风险，而且没有可读性收益。
const RULES = [
  // app-plus / nvue 运行时会把 Vue 作为全局注入，打包产物里就是 `module.exports = Vue`。
  // H5 没有这个全局，必须换成 npm 的 vue 包，否则运行时 ReferenceError: Vue is not defined。
  ['vue', (s) => /\.exports\s*=\s*Vue\b/.test(s) && s.length < 400],
  ['vuex', (s) => /createNamespacedHelpers/.test(s) || /__VUE_DEVTOOLS_GLOBAL_HOOK__/.test(s)],
  ['vue-i18n', (s) => /VueI18n/.test(s) || /_localeChainCache/.test(s)],
  ['vuex-persistedstate', (s) => /persistedstate/i.test(s) ||
    (/subscribe/.test(s) && /getState/.test(s) && /setState/.test(s) && /\bpaths\b/.test(s) && s.length < 9000)],
  ['moment', (s) => /_isAMomentObject/.test(s)],
  ['dayjs', (s) => /dayjs/.test(s)],
  ['semver', (s) => /compareIdentifiers/.test(s) && /maxSatisfying/.test(s)],
  ['regenerator-runtime', (s) => /regeneratorRuntime\s*=/.test(s) && /GeneratorFunction/.test(s)],
  ['crypto-js', (s) => /CryptoJS/.test(s)],
];

// 同一份业务源码在 svc / nvue 两个编译空间各有一份，归并到同一个文件
const BUSINESS = [
  ['common/utils.js', (s) => /badgeBgColor/.test(s) && /deviceStatus/.test(s) && /datetimeDiff/.test(s)],
];

function detect(src) {
  for (const [pkg, test] of RULES) {
    try { if (test(src)) return { kind: 'npm', name: pkg }; } catch { /* ignore */ }
  }
  for (const [file, test] of BUSINESS) {
    try { if (test(src)) return { kind: 'business', file }; } catch { /* ignore */ }
  }
  return null;
}

// 扫一个编译空间，返回 { modId: {kind, name|file} }
function scan(mods) {
  const out = {};
  for (const [id, src] of Object.entries(mods)) {
    const d = detect(src);
    if (d) out[id] = d;
  }
  return out;
}

module.exports = { scan, detect, RULES, BUSINESS };
