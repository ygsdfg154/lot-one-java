// webpack 模块 47a0  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/29e8.js")), i = {
    name: "u-status-bar",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    data: function () {
      return {};
    },
    computed: {
      style: function () {
        var e = {};
        return (e.height = uni.$u.addUnit(uni.$u.sys().statusBarHeight, "px"), e.backgroundColor = this.bgColor, uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
