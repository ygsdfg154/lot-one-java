// webpack 模块 598  [nvue]
// 出现于: pagesMore/my/support.js
const __r = require('./__runtime.js').wrap();
(function (r, t, e) {
  "use strict";
  var o = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var i = o(require("../../common/config.nvue.js")), n = {
    data: function () {
      return {
        progressColor: i.default.primaryColor,
        dataUrl: i.default.kf.url
      };
    },
    onHide: function () {
      uni.navigateBack();
    },
    methods: {}
  };
  t.default = n;
})(module, exports, __r);
