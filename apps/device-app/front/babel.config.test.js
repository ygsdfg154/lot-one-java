// jest 专用 babel 配置：只做 ESM → CJS 转换。
// 主 babel.config.js 走的是 @vue/cli-plugin-babel/preset（带 uni-app 的一堆插件与
// corejs 注入），在 node 环境下跑测试既慢又会引入不必要的 polyfill。
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
