// webpack 模块 5026  [view]
// 出现于: app-view.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  (a.d(e, "b", function () {
    return i;
  }), a.d(e, "c", function () {
    return r;
  }), a.d(e, "a", function () {
    return n;
  }));
  var n = {
    uOverlay: require("@/.unpacked/view/4405.js").default,
    uTransition: require("@/.unpacked/view/02b1.js").default,
    uStatusBar: require("@/.unpacked/view/6313.js").default,
    uIcon: require("@/.unpacked/view/a9fb.js").default,
    uSafeBottom: require("@/.unpacked/view/d1c1.js").default
  }, i = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("uni-view", {
      staticClass: t._$g(0, "sc"),
      attrs: {
        _i: 0
      }
    }, [t._$g(1, "i") ? a("u-overlay", {
      attrs: {
        _i: 1
      },
      on: {
        click: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    }) : t._e(), a("u-transition", {
      attrs: {
        _i: 2
      },
      on: {
        afterEnter: function (e) {
          return t.$handleViewEvent(e);
        },
        click: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    }, [a("uni-view", {
      staticClass: t._$g(3, "sc"),
      style: t._$g(3, "s"),
      attrs: {
        _i: 3
      },
      on: {
        click: function (e) {
          return t.$handleViewEvent(e, {
            stop: !0
          });
        }
      }
    }, [t._$g(4, "i") ? a("u-status-bar", {
      attrs: {
        _i: 4
      }
    }) : t._e(), t._t("default", null, {
      _i: 5
    }), t._$g(6, "i") ? a("uni-view", {
      staticClass: t._$g(6, "sc"),
      class: t._$g(6, "c"),
      attrs: {
        "hover-class": "u-popup__content__close--hover",
        "hover-stay-time": "150",
        _i: 6
      },
      on: {
        click: function (e) {
          return t.$handleViewEvent(e, {
            stop: !0
          });
        }
      }
    }, [a("u-icon", {
      attrs: {
        _i: 7
      }
    })], 1) : t._e(), t._$g(8, "i") ? a("u-safe-bottom", {
      attrs: {
        _i: 8
      }
    }) : t._e()], 2)], 1)], 1);
  }, r = [];
})(module, exports, __r);
