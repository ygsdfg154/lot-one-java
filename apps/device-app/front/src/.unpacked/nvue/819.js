// webpack 模块 819  [nvue]
// 出现于: pages/home/home.js, pagesMore/public/locate.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.getDistance = function (e, t, n, a) {
    if (!(e && t && n && a)) return 0;
    var i = r(e), o = r(n), s = i - o, d = r(t) - r(a), u = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(s / 2), 2) + Math.cos(i) * Math.cos(o) * Math.pow(Math.sin(d / 2), 2)));
    return (u *= 6378136.49, u = Math.round(1e4 * u) / 1e4, parseFloat(u.toFixed(0)));
  });
  function r(e) {
    return e * Math.PI / 180;
  }
})(module, exports, __r);
