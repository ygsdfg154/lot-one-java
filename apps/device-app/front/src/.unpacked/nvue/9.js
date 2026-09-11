// webpack 模块 9  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
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
      staticClass: ["u-icon"],
      class: ["u-icon--" + e.labelPos],
      on: {
        click: e.clickHandler
      }
    }, [e.isImg ? n("u-image", {
      staticClass: ["u-icon__img"],
      style: [e.imgStyle, e.$u.addStyle(e.customStyle)],
      attrs: {
        src: e.name,
        mode: e.imgMode
      }
    }) : n("u-text", {
      staticClass: ["u-icon__icon"],
      class: e.uClasses,
      style: [e.iconStyle, e.$u.addStyle(e.customStyle)],
      appendAsTree: !0,
      attrs: {
        hoverClass: e.hoverClass,
        append: "tree"
      }
    }, [e._v(e._s(e.icon))]), "" !== e.label ? n("u-text", {
      staticClass: ["u-icon__label"],
      style: {
        color: e.labelColor,
        fontSize: e.$u.addUnit(e.labelSize),
        marginLeft: "right" == e.labelPos ? e.$u.addUnit(e.space) : 0,
        marginTop: "bottom" == e.labelPos ? e.$u.addUnit(e.space) : 0,
        marginRight: "left" == e.labelPos ? e.$u.addUnit(e.space) : 0,
        marginBottom: "top" == e.labelPos ? e.$u.addUnit(e.space) : 0
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.label))]) : e._e()], 1);
  }, r = [];
})(module, exports, __r);
