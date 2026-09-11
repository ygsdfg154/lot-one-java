// webpack 模块 333  [nvue]
// 出现于: pagesFunc/terminal/list/index.js, pagesMore/message/statement.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    name: "UniStatusBar",
    data: function () {
      return {
        statusBarHeight: 20
      };
    },
    mounted: function () {
      this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + "px";
    }
  };
  t.default = a;
})(module, exports, __r);
