// webpack 模块 349  [nvue]
// 出现于: pages/home/home.js, pagesFunc/terminal/list/index.js, pagesPay/value-added/index.js
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
    return e.show && (0 !== Number(e.value) || e.showZero || e.isDot) ? n("u-text", {
      staticClass: ["u-badge"],
      class: [e.isDot ? "u-badge--dot" : "u-badge--not-dot", e.inverted && "u-badge--inverted", "horn" === e.shape && "u-badge--horn", "u-badge--" + e.type + (e.inverted ? "--inverted" : "")],
      style: [e.$u.addStyle(e.customStyle), e.badgeStyle],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.isDot ? "" : e.showValue))]) : e._e();
  }, a = [];
})(module, exports, __r);
