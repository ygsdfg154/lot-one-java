// webpack 模块 a271  [svc]
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
    return e._$s(0, "i", e.show) ? n("view", {
      staticClass: e._$s(0, "sc", "u-loading-icon"),
      class: e._$s(0, "c", [e.vertical && "u-loading-icon--vertical"]),
      style: e._$s(0, "s", [e.$u.addStyle(e.customStyle)]),
      attrs: {
        _i: 0
      }
    }, [e._$s(1, "i", !e.webviewHide) ? n("view", {
      ref: "ani",
      staticClass: e._$s(1, "sc", "u-loading-icon__spinner"),
      class: e._$s(1, "c", ["u-loading-icon__spinner--" + e.mode]),
      style: e._$s(1, "s", {
        color: e.color,
        width: e.$u.addUnit(e.size),
        height: e.$u.addUnit(e.size),
        borderTopColor: e.color,
        borderBottomColor: e.otherBorderColor,
        borderLeftColor: e.otherBorderColor,
        borderRightColor: e.otherBorderColor,
        "animation-duration": e.duration + "ms",
        "animation-timing-function": "semicircle" === e.mode || "circle" === e.mode ? e.timingFunction : ""
      }),
      attrs: {
        _i: 1
      }
    }, [e._$s(2, "i", "spinner" === e.mode) ? e._l(e._$s(3, "f", {
      forItems: e.array12
    }), function (t, a, r, i) {
      return n("view", {
        key: e._$s(3, "f", {
          forIndex: r,
          key: a
        }),
        staticClass: e._$s("3-" + i, "sc", "u-loading-icon__dot"),
        attrs: {
          _i: "3-" + i
        }
      });
    }) : e._e()], 2) : e._e(), e._$s(4, "i", e.text) ? n("text", {
      staticClass: e._$s(4, "sc", "u-loading-icon__text"),
      style: e._$s(4, "s", {
        fontSize: e.$u.addUnit(e.textSize),
        color: e.textColor
      }),
      attrs: {
        _i: 4
      }
    }, [e._v(e._$s(4, "t0-0", e._s(e.text)))]) : e._e()]) : e._e();
  }, r = [];
})(module, exports, __r);
