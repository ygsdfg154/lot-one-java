// webpack 模块 574  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/939.js")), i = {
    name: "u-swiper-indicator",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, a.default],
    data: function () {
      return {
        lineWidth: 22
      };
    },
    computed: {
      lineStyle: function () {
        var e = {};
        return (e.width = uni.$u.addUnit(this.lineWidth), e.transform = ("translateX(").concat(uni.$u.addUnit(this.current * this.lineWidth), ")"), e.backgroundColor = this.indicatorActiveColor, e);
      },
      dotStyle: function () {
        var e = this;
        return function (t) {
          var n = {};
          return (n.backgroundColor = t === e.current ? e.indicatorActiveColor : e.indicatorInactiveColor, n);
        };
      }
    }
  };
  t.default = i;
})(module, exports, __r);
