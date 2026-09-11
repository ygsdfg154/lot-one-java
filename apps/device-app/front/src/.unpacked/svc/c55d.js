// webpack 模块 c55d  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/c9cb.js")), i = {
    name: "u-line",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    computed: {
      lineStyle: function () {
        var e = {};
        return (e.margin = this.margin, "row" === this.direction ? (e.borderBottomWidth = "1px", e.borderBottomStyle = this.dashed ? "dashed" : "solid", e.width = uni.$u.addUnit(this.length), this.hairline && (e.transform = "scaleY(0.5)")) : (e.borderLeftWidth = "1px", e.borderLeftStyle = this.dashed ? "dashed" : "solid", e.height = uni.$u.addUnit(this.length), this.hairline && (e.transform = "scaleX(0.5)")), e.borderColor = this.color, uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
