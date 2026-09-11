// webpack 模块 fe5d  [svc]
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
      ref: "u-subsection",
      staticClass: e._$s(0, "sc", "u-subsection"),
      class: e._$s(0, "c", ["u-subsection--" + e.mode]),
      style: e._$s(0, "s", [e.$u.addStyle(e.customStyle), e.wrapperStyle]),
      attrs: {
        _i: 0
      }
    }, [n("view", {
      ref: "u-subsection__bar",
      staticClass: e._$s(1, "sc", "u-subsection__bar"),
      class: e._$s(1, "c", ["button" === e.mode && "u-subsection--button__bar", 0 === e.current && "subsection" === e.mode && "u-subsection__bar--first", e.current > 0 && e.current < e.list.length - 1 && "subsection" === e.mode && "u-subsection__bar--center", e.current === e.list.length - 1 && "subsection" === e.mode && "u-subsection__bar--last"]),
      style: e._$s(1, "s", [e.barStyle]),
      attrs: {
        _i: 1
      }
    }), e._l(e._$s(2, "f", {
      forItems: e.list
    }), function (t, a, r, i) {
      return n("view", {
        key: e._$s(2, "f", {
          forIndex: r,
          key: a
        }),
        ref: e._$s("2-" + i, "ref", "u-subsection__item--" + a),
        refInFor: !0,
        staticClass: e._$s("2-" + i, "sc", "u-subsection__item"),
        class: e._$s("2-" + i, "c", ["u-subsection__item--" + a, a < e.list.length - 1 && "u-subsection__item--no-border-right", 0 === a && "u-subsection__item--first", a === e.list.length - 1 && "u-subsection__item--last"]),
        style: e._$s("2-" + i, "s", [e.itemStyle(a)]),
        attrs: {
          _i: "2-" + i
        },
        on: {
          click: function (t) {
            return e.clickHandler(a);
          }
        }
      }, [n("text", {
        staticClass: e._$s("3-" + i, "sc", "u-subsection__item__text"),
        style: e._$s("3-" + i, "s", [e.textStyle(a)]),
        attrs: {
          _i: "3-" + i
        }
      }, [e._v(e._$s("3-" + i, "t0-0", e._s(e.getText(t))))])]);
    })], 2);
  }, r = [];
})(module, exports, __r);
