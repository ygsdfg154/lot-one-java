// webpack 模块 6480  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/62b5.js")), i = {
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
        return uni.$u.deepMerge({}, uni.$u.addStyle(this.customStyle));
      }
    },
    mounted: function () {}
  };
  t.default = i;
})(module, exports, __r);
