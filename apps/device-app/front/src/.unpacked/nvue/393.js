// webpack 模块 393  [nvue]
// 出现于: pagesPay/card/index.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  (a(require("../../common/config.nvue.js")), getApp().globalData);
  var r = {
    props: {},
    data: function () {
      return {};
    },
    methods: {
      contactService: function () {
        uni.navigateTo({
          url: "/pagesMore/my/support"
        });
      }
    }
  };
  t.default = r;
})(module, exports, __r);
