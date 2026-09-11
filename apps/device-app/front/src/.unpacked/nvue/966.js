// webpack 模块 966  [nvue]
// 出现于: pagesFunc/terminal/corral/info.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.scaleRatio = t.sacleRegion = t.sacleCode = void 0);
  t.scaleRatio = function (e) {
    return e <= 750 ? 16 : e <= 1500 ? 15 : e <= 2e3 ? 14.5 : e <= 2500 ? 14 : e <= 4e3 ? 13.5 : e <= 5500 ? 13 : e <= 8500 ? 12.5 : e <= 12e3 ? 12 : e <= 18e3 ? 11.5 : e <= 25e3 ? 11 : e <= 3e4 ? 10.5 : e <= 4e4 ? 10 : e <= 68e3 ? 9 : e <= 75e3 ? 8.8 : e <= 1e5 ? 8.4 : void 0;
  };
  t.sacleRegion = function (e) {
    return e[2] ? 12 : e[1] ? 8.5 : 0 === e[0] || 0 === e[0] || 8 === e[0] || 31 === e[0] || 32 === e[0] || 33 === e[0] ? 8.7 : 4 === e[0] || 25 === e[0] || 30 === e[0] ? 6.2 : e[0] ? 6.8 : void 0;
  };
  t.sacleCode = function (e, t) {
    if (11e4 === t || 12e4 === t || 31e4 === t || 71e4 === t || 81e4 === t || 82e4 === t) return 8.7;
    if (15e4 === t || 54e4 === t || 65e4 === t) return 6.2;
    if (110100 === t || 120100 === t || 310100 === t) return 8.7;
    var n = e.some(function (e) {
      return e.adcode === t;
    }), a = e.map(function (e) {
      return e.districts.map(function (e) {
        return e.adcode === t;
      });
    });
    return (a = (a = a.flat(1)).some(function (e) {
      return e;
    }), n ? 6.8 : a ? 8.4 : 12);
  };
})(module, exports, __r);
