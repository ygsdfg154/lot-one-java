// webpack 模块 814  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return r;
  }), n.d(t, "c", function () {
    return a;
  }), n.d(t, "a", function () {}));
  var r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-swiper-indicator"]
    }, ["line" === e.indicatorMode ? n("view", {
      staticClass: ["u-swiper-indicator__wrapper"],
      class: ["u-swiper-indicator__wrapper--" + e.indicatorMode],
      style: {
        width: e.$u.addUnit(e.lineWidth * e.length),
        backgroundColor: e.indicatorInactiveColor
      }
    }, [n("view", {
      staticClass: ["u-swiper-indicator__wrapper--line__bar"],
      style: [e.lineStyle]
    })]) : e._e(), "dot" === e.indicatorMode ? n("view", {
      staticClass: ["u-swiper-indicator__wrapper"]
    }, e._l(e.length, function (t, r) {
      return n("view", {
        key: r,
        staticClass: ["u-swiper-indicator__wrapper__dot"],
        class: [r === e.current && "u-swiper-indicator__wrapper__dot--active"],
        style: [e.dotStyle(r)]
      });
    }), 0) : e._e()]);
  }, a = [];
})(module, exports, __r);
