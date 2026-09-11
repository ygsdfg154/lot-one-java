// webpack 模块 325  [nvue]
// 出现于: pages/home/home.js, pagesFunc/terminal/list/index.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/456.js")), i = {
    name: "u-badge",
    mixins: [uni.$u.mpMixin, a.default, uni.$u.mixin],
    computed: {
      boxStyle: function () {
        return {};
      },
      badgeStyle: function () {
        var e = {};
        if ((this.color && (e.color = this.color), this.bgColor && !this.inverted && (e.backgroundColor = this.bgColor), this.absolute && (e.position = "absolute", this.offset.length))) {
          var t = this.offset[0], n = this.offset[1] || t;
          (e.top = uni.$u.addUnit(t), e.right = uni.$u.addUnit(n));
        }
        return e;
      },
      showValue: function () {
        switch (this.numberType) {
          case "overflow":
            return Number(this.value) > Number(this.max) ? this.max + "+" : this.value;
          case "ellipsis":
            return Number(this.value) > Number(this.max) ? "..." : this.value;
          case "limit":
            return Number(this.value) > 999 ? Number(this.value) >= 9999 ? Math.floor(this.value / 1e4 * 100) / 100 + "w" : Math.floor(this.value / 1e3 * 100) / 100 + "k" : this.value;
          default:
            return Number(this.value);
        }
      }
    }
  };
  t.default = i;
})(module, exports, __r);
