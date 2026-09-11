// webpack 模块 429  [nvue]
// 出现于: pagesFunc/terminal/corral/info.js, pagesFunc/terminal/locus/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return r;
  }), n.d(t, "a", function () {}));
  var a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-slider"],
      style: [e.$u.addStyle(e.customStyle)]
    }, [n("u-slider", {
      attrs: {
        min: e.min,
        max: e.max,
        step: e.step,
        value: e.value,
        activeColor: e.activeColor,
        inactiveColor: e.inactiveColor,
        blockSize: e.$u.getPx(e.blockSize),
        blockColor: e.blockColor,
        showValue: e.showValue,
        disabled: e.disabled
      },
      on: {
        changing: e.changingHandler,
        change: e.changeHandler
      }
    })], 1);
  }, r = [];
})(module, exports, __r);
