// webpack 模块 9062  [svc]
// 出现于: app-service.js
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
      staticClass: e._$s(0, "sc", "u-icon"),
      class: e._$s(0, "c", ["u-icon--" + e.labelPos]),
      attrs: {
        _i: 0
      },
      on: {
        click: e.clickHandler
      }
    }, [e._$s(1, "i", e.isImg) ? n("image", {
      staticClass: e._$s(1, "sc", "u-icon__img"),
      style: e._$s(1, "s", [e.imgStyle, e.$u.addStyle(e.customStyle)]),
      attrs: {
        src: e._$s(1, "a-src", e.name),
        mode: e._$s(1, "a-mode", e.imgMode),
        _i: 1
      }
    }) : n("text", {
      staticClass: e._$s(2, "sc", "u-icon__icon"),
      class: e._$s(2, "c", e.uClasses),
      style: e._$s(2, "s", [e.iconStyle, e.$u.addStyle(e.customStyle)]),
      attrs: {
        "hover-class": e._$s(2, "a-hover-class", e.hoverClass),
        _i: 2
      }
    }, [e._v(e._$s(2, "t0-0", e._s(e.icon)))]), e._$s(3, "i", "" !== e.label) ? n("text", {
      staticClass: e._$s(3, "sc", "u-icon__label"),
      style: e._$s(3, "s", {
        color: e.labelColor,
        fontSize: e.$u.addUnit(e.labelSize),
        marginLeft: "right" == e.labelPos ? e.$u.addUnit(e.space) : 0,
        marginTop: "bottom" == e.labelPos ? e.$u.addUnit(e.space) : 0,
        marginRight: "left" == e.labelPos ? e.$u.addUnit(e.space) : 0,
        marginBottom: "top" == e.labelPos ? e.$u.addUnit(e.space) : 0
      }),
      attrs: {
        _i: 3
      }
    }, [e._v(e._$s(3, "t0-0", e._s(e.label)))]) : e._e()]);
  }, r = [];
})(module, exports, __r);
