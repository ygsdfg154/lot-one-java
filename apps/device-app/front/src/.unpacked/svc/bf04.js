// webpack 模块 bf04  [svc]
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
      ref: "u-calendar-month-wrapper",
      staticClass: e._$s(0, "sc", "u-calendar-month-wrapper"),
      attrs: {
        _i: 0
      }
    }, e._l(e._$s(1, "f", {
      forItems: e.months
    }), function (t, a, r, i) {
      return n("view", {
        key: e._$s(1, "f", {
          forIndex: r,
          key: a
        }),
        ref: e._$s("1-" + i, "ref", "u-calendar-month-" + a),
        refInFor: !0,
        class: e._$s("1-" + i, "c", ["u-calendar-month-" + a]),
        attrs: {
          id: e._$s("1-" + i, "a-id", "month-" + a),
          _i: "1-" + i
        }
      }, [e._$s("2-" + i, "i", 0 !== a) ? n("text", {
        staticClass: e._$s("2-" + i, "sc", "u-calendar-month__title"),
        attrs: {
          _i: "2-" + i
        }
      }, [e._v(e._$s("2-" + i, "t0-0", e._s(t.year)) + e._$s("2-" + i, "t0-1", e._s(e.l("common.u-calendar-content-year"))) + e._$s("2-" + i, "t0-2", e._s(t.month)) + e._$s("2-" + i, "t0-3", e._s(e.l("common.u-calendar-content-month"))))]) : e._e(), n("view", {
        staticClass: e._$s("3-" + i, "sc", "u-calendar-month__days"),
        attrs: {
          _i: "3-" + i
        }
      }, [e._$s("4-" + i, "i", e.showMark) ? n("view", {
        staticClass: e._$s("4-" + i, "sc", "u-calendar-month__days__month-mark-wrapper"),
        attrs: {
          _i: "4-" + i
        }
      }, [n("text", {
        staticClass: e._$s("5-" + i, "sc", "u-calendar-month__days__month-mark-wrapper__text"),
        attrs: {
          _i: "5-" + i
        }
      }, [e._v(e._$s("5-" + i, "t0-0", e._s(t.month)))])]) : e._e(), e._l(e._$s("6-" + i, "f", {
        forItems: t.date
      }), function (t, r, o, s) {
        return n("view", {
          key: e._$s("6-" + i, "f", {
            forIndex: o,
            key: r
          }),
          staticClass: e._$s("6-" + i + "-" + s, "sc", "u-calendar-month__days__day"),
          class: e._$s("6-" + i + "-" + s, "c", [t.selected && "u-calendar-month__days__day__select--selected"]),
          style: e._$s("6-" + i + "-" + s, "s", [e.dayStyle(a, r, t)]),
          attrs: {
            _i: "6-" + i + "-" + s
          },
          on: {
            click: function (n) {
              return e.clickHandler(a, r, t);
            }
          }
        }, [n("view", {
          staticClass: e._$s("7-" + i + "-" + s, "sc", "u-calendar-month__days__day__select"),
          style: e._$s("7-" + i + "-" + s, "s", [e.daySelectStyle(a, r, t)]),
          attrs: {
            _i: "7-" + i + "-" + s
          }
        }, [n("text", {
          staticClass: e._$s("8-" + i + "-" + s, "sc", "u-calendar-month__days__day__select__info"),
          class: e._$s("8-" + i + "-" + s, "c", [t.disabled && "u-calendar-month__days__day__select__info--disabled"]),
          style: e._$s("8-" + i + "-" + s, "s", [e.textStyle(t)]),
          attrs: {
            _i: "8-" + i + "-" + s
          }
        }, [e._v(e._$s("8-" + i + "-" + s, "t0-0", e._s(t.day)))]), e._$s("9-" + i + "-" + s, "i", e.getBottomInfo(a, r, t)) ? n("text", {
          staticClass: e._$s("9-" + i + "-" + s, "sc", "u-calendar-month__days__day__select__buttom-info"),
          class: e._$s("9-" + i + "-" + s, "c", [t.disabled && "u-calendar-month__days__day__select__buttom-info--disabled"]),
          style: e._$s("9-" + i + "-" + s, "s", [e.textStyle(t)]),
          attrs: {
            _i: "9-" + i + "-" + s
          }
        }, [e._v(e._$s("9-" + i + "-" + s, "t0-0", e._s(e.getBottomInfo(a, r, t))))]) : e._e(), e._$s("10-" + i + "-" + s, "i", t.dot) ? n("text", {
          staticClass: e._$s("10-" + i + "-" + s, "sc", "u-calendar-month__days__day__select__dot"),
          attrs: {
            _i: "10-" + i + "-" + s
          }
        }) : e._e()])]);
      })], 2)]);
    }), 0);
  }, r = [];
})(module, exports, __r);
