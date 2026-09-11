// webpack 模块 186c  [view]
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
    uIcon: require("@/.unpacked/view/a9fb.js").default,
    uCalendar: require("@/.unpacked/view/699a.js").default
  }, i = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("uni-view", {
      attrs: {
        _i: 0
      }
    }, [a("uni-view", {
      staticClass: t._$g(1, "sc"),
      attrs: {
        _i: 1
      }
    }, [a("uni-view", {
      staticClass: t._$g(2, "sc"),
      attrs: {
        _i: 2
      },
      on: {
        click: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    }, [a("u-icon", {
      attrs: {
        _i: 3
      }
    }), a("v-uni-text", {
      staticClass: t._$g(4, "sc"),
      staticStyle: {
        "margin-left": "4rpx"
      },
      attrs: {
        _i: 4
      }
    }, [t._v(t._$g(4, "t0-0"))])], 1), a("uni-view", {
      staticClass: t._$g(5, "sc"),
      attrs: {
        _i: 5
      },
      on: {
        click: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    }, [a("u-icon", {
      attrs: {
        _i: 6
      }
    }), a("v-uni-text", {
      staticClass: t._$g(7, "sc"),
      attrs: {
        _i: 7
      }
    }, [t._v(t._$g(7, "t0-0"))])], 1), a("uni-view", {
      staticClass: t._$g(8, "sc"),
      attrs: {
        _i: 8
      },
      on: {
        click: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    }, [a("v-uni-text", {
      staticClass: t._$g(9, "sc"),
      staticStyle: {
        "margin-right": "4rpx"
      },
      attrs: {
        _i: 9
      }
    }, [t._v(t._$g(9, "t0-0"))]), a("u-icon", {
      attrs: {
        _i: 10
      }
    })], 1)], 1), a("u-calendar", {
      ref: "calendar",
      attrs: {
        _i: 11
      },
      on: {
        confirm: function (e) {
          return t.$handleViewEvent(e);
        },
        close: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    })], 1);
  }, r = [];
})(module, exports, __r);
