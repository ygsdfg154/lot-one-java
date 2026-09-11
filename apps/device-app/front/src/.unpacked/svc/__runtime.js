// webpack require 兼容垫片（供 .unpacked/ 下的模块互相引用）
// 注意：这里**不能**再提供动态的 r(id) —— 打包器无法静态分析 require('./' + id + '.js')，
// 编译期只报一条 Critical dependency 警告，运行期才抛 Cannot find module。
// 所有 n(<id>) 调用已在生成阶段静态重写成字面量 require('...')，这里只保留 webpack 的辅助方法。
function wrap() {
  const r = function (id) {
    throw new Error('[.unpacked] 动态 require 未被静态重写: ' + id + '（这是反编译工具的 bug，请反馈）');
  };
  r.d = function (exports, name, getter) { Object.defineProperty(exports, name, { enumerable: true, get: getter }); };
  r.r = function (exports) { Object.defineProperty(exports, '__esModule', { value: true }); };
  r.n = function (m) { const g = m && m.__esModule ? function () { return m.default; } : function () { return m; }; r.d(g, 'a', g); return g; };
  r.o = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  r.t = function (v) { return v; };
  r.p = '/';
  r.m = {}; r.c = {}; r.s = undefined;
  return r;
}
module.exports = { wrap };
