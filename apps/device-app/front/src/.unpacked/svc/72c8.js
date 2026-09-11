// webpack 模块 72c8  [svc]
// 出现于: app-service.js
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
