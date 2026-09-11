// webpack 模块 14  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/revise-pwd.js, pagesCore/account/revise-userInfo.js ...
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
    return e.show ? n("view", {
      staticClass: ["u-loading-icon"],
      class: [e.vertical && "u-loading-icon--vertical"],
      style: [e.$u.addStyle(e.customStyle)]
    }, [e.webviewHide ? e._e() : n("view", {
      ref: "ani",
      staticClass: ["u-loading-icon__spinner"],
      class: ["u-loading-icon__spinner--" + e.mode],
      style: {
        color: e.color,
        width: e.$u.addUnit(e.size),
        height: e.$u.addUnit(e.size),
        borderTopColor: e.color,
        borderBottomColor: e.otherBorderColor,
        borderLeftColor: e.otherBorderColor,
        borderRightColor: e.otherBorderColor,
        "animation-duration": e.duration + "ms",
        "animation-timing-function": "semicircle" === e.mode || "circle" === e.mode ? e.timingFunction : ""
      }
    }, ["spinner" === e.mode ? n("block", [e.webviewHide ? e._e() : n("loading-indicator", {
      staticClass: ["u-loading-indicator"],
      style: {
        color: e.color,
        width: e.$u.addUnit(e.size),
        height: e.$u.addUnit(e.size)
      },
      attrs: {
        animating: !0
      }
    })]) : e._e()], 1), e.text ? n("u-text", {
      staticClass: ["u-loading-icon__text"],
      style: {
        fontSize: e.$u.addUnit(e.textSize),
        color: e.textColor
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.text))]) : e._e()]) : e._e();
  }, r = [];
})(module, exports, __r);
