// webpack 模块 821  [nvue]
// 出现于: pages/home/home.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var n = e("bindingx"), r = {
      methods: {
        nvueScrollHandler: function (e) {
          if (this.$refs["u-scroll-list__indicator__line__bar"]) {
            var t = this.$refs["u-scroll-list__scroll-view"].ref, r = this.$refs["u-scroll-list__indicator__line__bar"].ref, a = (e.contentOffset.x, e.contentSize.width), i = this.scrollWidth, o = this.indicatorWidth - this.indicatorBarWidth, s = "ios" === uni.$u.os() ? 2 : 1, d = ("(x / ").concat(s, ") / ").concat(a - i, " * ").concat(o);
            n.bind({
              anchor: t,
              eventType: "scroll",
              props: [{
                element: r,
                property: "transform.translateX",
                expression: d
              }]
            });
          }
        }
      }
    };
    t.default = r;
  }).call(this, require("@/.unpacked/nvue/222.js").default);
})(module, exports, __r);
