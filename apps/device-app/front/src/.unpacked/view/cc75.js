// webpack 模块 cc75  [view]
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
    uLoadmore: require("@/.unpacked/view/ab04.js").default,
    uEmpty: require("@/.unpacked/view/9571.js").default
  }, i = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("uni-view", {
      attrs: {
        _i: 0
      }
    }, [a("calendarFrame", {
      attrs: {
        _i: 1
      },
      on: {
        "update:currentDate": function (e) {
          return t.$handleViewEvent(e);
        },
        "update:current-date": function (e) {
          return t.$handleViewEvent(e);
        },
        fetchData: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    }), a("audioAgree", {
      attrs: {
        _i: 2
      },
      on: {
        fetchData: function (e) {
          return t.$handleViewEvent(e);
        },
        loadTerminalExtend: function (e) {
          return t.$handleViewEvent(e);
        }
      },
      model: {
        value: t._$g(2, "v-model"),
        callback: function () {},
        expression: "isRecordIng"
      }
    }), t._$g(3, "i") ? a("uni-view", {
      staticClass: t._$g(3, "sc"),
      staticStyle: {
        "padding-bottom": "350rpx"
      },
      attrs: {
        _i: 3
      }
    }, [a("uni-view", {
      staticClass: t._$g(4, "sc"),
      attrs: {
        _i: 4
      }
    }, [t._l(t._$g(5, "f"), function (e, n, i, r) {
      return a("uni-view", {
        key: e,
        staticClass: t._$g("5-" + r, "sc"),
        attrs: {
          _i: "5-" + r
        }
      }, [a("uni-view", {
        staticClass: t._$g("6-" + r, "sc"),
        attrs: {
          _i: "6-" + r
        }
      }, [a("v-uni-text", {
        staticClass: t._$g("7-" + r, "sc"),
        attrs: {
          _i: "7-" + r
        }
      }, [t._v(t._$g("7-" + r, "t0-0"))])], 1), a("uni-view", {
        staticClass: t._$g("8-" + r, "sc"),
        attrs: {
          _i: "8-" + r
        },
        on: {
          longpress: function (e) {
            return t.$handleViewEvent(e);
          }
        }
      }, [a("v-uni-image", {
        staticClass: t._$g("9-" + r, "sc"),
        staticStyle: {
          width: "64rpx",
          height: "64rpx"
        },
        attrs: {
          src: t._$g("9-" + r, "a-src"),
          _i: "9-" + r
        }
      }), a("uni-view", {
        staticClass: t._$g("10-" + r, "sc"),
        style: t._$g("10-" + r, "s"),
        attrs: {
          _i: "10-" + r
        },
        on: {
          click: function (e) {
            return t.$handleViewEvent(e);
          }
        }
      }, [a("v-uni-image", {
        style: t._$g("11-" + r, "s"),
        attrs: {
          src: t._$g("11-" + r, "a-src"),
          _i: "11-" + r
        }
      })], 1), t._$g("12-" + r, "i") ? a("uni-view", {
        staticClass: t._$g("12-" + r, "sc"),
        attrs: {
          _i: "12-" + r
        }
      }) : t._e()], 1)], 1);
    }), t._$g(13, "i") ? a("u-loadmore", {
      attrs: {
        _i: 13
      }
    }) : t._e(), t._$g(14, "i") ? a("u-empty", {
      attrs: {
        _i: 14
      }
    }) : t._e()], 2), a("audioBut", {
      attrs: {
        _i: 15
      },
      on: {
        recover: function (e) {
          return t.$handleViewEvent(e);
        }
      },
      model: {
        value: t._$g(15, "v-model"),
        callback: function () {},
        expression: "isRecordIng"
      }
    })], 1) : t._e()], 1);
  }, r = [];
})(module, exports, __r);
