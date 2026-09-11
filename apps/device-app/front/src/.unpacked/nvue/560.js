// webpack 模块 560  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/932.js")), i = {
    name: "u-notice-bar",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, a.default],
    data: function () {
      return {
        show: !0
      };
    },
    methods: {
      click: function (e) {
        (this.$emit("click", e), this.url && this.linkType && this.openPage());
      },
      close: function () {
        (this.show = !1, this.$emit("close"));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
