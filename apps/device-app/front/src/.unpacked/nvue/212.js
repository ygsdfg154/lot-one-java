// webpack 模块 212  [nvue]
// 出现于: pages/msg/index.js, pagesFunc/deviceInfo/index.js, pagesFunc/terminal/alerts-set/index.js, pagesFunc/terminal/alerts-set/messages.js, pagesFunc/terminal/alerts-set/phone.js, pagesFunc/terminal/list/index.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/278.js")), i = {
    name: "u-line",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, a.default],
    computed: {
      lineStyle: function () {
        var e = {};
        return (e.margin = this.margin, "row" === this.direction ? (e.borderBottomWidth = "1px", e.borderBottomStyle = this.dashed ? "dashed" : "solid", e.width = uni.$u.addUnit(this.length), this.hairline && (e.transform = "scaleY(0.5)")) : (e.borderLeftWidth = "1px", e.borderLeftStyle = this.dashed ? "dashed" : "solid", e.height = uni.$u.addUnit(this.length), this.hairline && (e.transform = "scaleX(0.5)")), e.borderColor = this.color, uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
