// webpack 模块 181  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/252.js")), i = {
    name: "u-safe-bottom",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    data: function () {
      return {
        safeAreaBottomHeight: 0,
        isNvue: !1
      };
    },
    computed: {
      style: function () {
        var e = {};
        return (e.height = uni.$u.addUnit(uni.$u.sys().safeAreaInsets.bottom, "px"), uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
      }
    },
    mounted: function () {
      this.isNvue = !0;
    }
  };
  t.default = i;
})(module, exports, __r);
