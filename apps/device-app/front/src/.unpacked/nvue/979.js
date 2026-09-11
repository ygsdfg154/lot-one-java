// webpack 模块 979  [nvue]
// 出现于: pagesFunc/terminal/locus/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.recordTime = t.exactDate = void 0);
  t.exactDate = function (e) {
    return e.slice(e.length - 8, e.length);
  };
  t.recordTime = function (e) {
    return 0 === e ? 30 : 1 === e ? 60 : 2 === e ? 120 : void 0;
  };
})(module, exports, __r);
