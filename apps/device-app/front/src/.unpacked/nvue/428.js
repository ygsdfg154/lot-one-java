// webpack 模块 428  [nvue]
// 出现于: pagesFunc/terminal/device-card.js, pagesPay/value-added/index.js
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
      staticClass: ["u-line-progress"],
      style: [e.$u.addStyle(e.customStyle)]
    }, [n("view", {
      ref: "u-line-progress__background",
      staticClass: ["u-line-progress__background"],
      style: [{
        backgroundColor: e.inactiveColor,
        height: e.$u.addUnit(e.height)
      }]
    }), n("view", {
      staticClass: ["u-line-progress__line"],
      style: [e.progressStyle]
    }, [e._t("default", [e.showText && e.percentage >= 10 ? n("u-text", {
      staticClass: ["u-line-progress__text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.innserPercentage + "%"))]) : e._e()])], 2)]);
  }, r = [];
})(module, exports, __r);
