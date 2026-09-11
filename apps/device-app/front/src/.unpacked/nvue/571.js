// webpack 模块 571  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("../../common/config.nvue.js")), i = require("../../common/utils.nvue.js"), o = {
    data: function () {
      return {
        cdn: a.default.cdn
      };
    },
    methods: {
      gotoLogin: function () {
        (0, i.gotoPagesLogin)();
      }
    }
  };
  t.default = o;
})(module, exports, __r);
