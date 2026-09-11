// webpack 模块 b3d9  [view]
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
    uSticky: require("@/.unpacked/view/4dbc.js").default,
    uSubsection: require("@/.unpacked/view/9900.js").default,
    uEmpty: require("@/.unpacked/view/9571.js").default,
    uLoadmore: require("@/.unpacked/view/ab04.js").default
  }, i = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("uni-view", {
      staticClass: t._$g(0, "sc"),
      style: t._$g(0, "s"),
      attrs: {
        _i: 0
      }
    }, [a("uni-view", {
      staticClass: t._$g(1, "sc"),
      staticStyle: {
        "background-color": "#fff"
      },
      attrs: {
        _i: 1
      }
    }, [a("u-sticky", {
      attrs: {
        _i: 2
      }
    }, [a("uni-view", {
      staticStyle: {
        width: "448rpx"
      },
      attrs: {
        _i: 3
      }
    }, [a("u-subsection", {
      staticClass: t._$g(4, "sc"),
      staticStyle: {
        width: "448rpx",
        height: "70rpx"
      },
      attrs: {
        _i: 4
      },
      on: {
        change: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    })], 1)], 1)], 1), a("calendarFrame", {
      attrs: {
        _i: 5
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
    }), a("uni-view", {
      staticClass: t._$g(6, "sc"),
      attrs: {
        _i: 6
      }
    }, t._l(t._$g(7, "f"), function (e, n, i, r) {
      return a("uni-view", {
        key: e,
        staticClass: t._$g("7-" + r, "sc"),
        attrs: {
          _i: "7-" + r
        }
      }, [a("uni-view", {
        staticClass: t._$g("8-" + r, "sc"),
        attrs: {
          _i: "8-" + r
        }
      }, [a("uni-view", {
        staticClass: t._$g("9-" + r, "sc"),
        attrs: {
          _i: "9-" + r
        },
        on: {
          click: function (e) {
            return t.$handleViewEvent(e);
          }
        }
      }, [a("uni-view", {
        attrs: {
          _i: "10-" + r
        }
      }, [t._$g("11-" + r, "i") ? a("uni-view", {
        staticClass: t._$g("11-" + r, "sc"),
        attrs: {
          _i: "11-" + r
        }
      }, [a("v-uni-text", {
        staticClass: t._$g("12-" + r, "sc"),
        attrs: {
          _i: "12-" + r
        }
      }, [t._v(t._$g("12-" + r, "t0-0") + "\uff1a")]), t._$g("13-" + r, "i") ? a("v-uni-text", {
        staticClass: t._$g("13-" + r, "sc"),
        attrs: {
          _i: "13-" + r
        }
      }, [t._v(t._$g("13-" + r, "t0-0") + t._$g("13-" + r, "t0-1"))]) : t._e()], 1) : t._e(), a("uni-view", {
        staticClass: t._$g("14-" + r, "sc"),
        attrs: {
          _i: "14-" + r
        }
      }, [a("v-uni-text", {
        staticClass: t._$g("15-" + r, "sc"),
        attrs: {
          _i: "15-" + r
        }
      }, [t._v(t._$g("15-" + r, "t0-0") + "\uff1a")]), a("v-uni-text", {
        staticClass: t._$g("16-" + r, "sc"),
        attrs: {
          _i: "16-" + r
        }
      }, [t._v(t._$g("16-" + r, "t0-0"))])], 1), a("uni-view", {
        staticClass: t._$g("17-" + r, "sc"),
        attrs: {
          _i: "17-" + r
        }
      }, [a("v-uni-text", {
        staticClass: t._$g("18-" + r, "sc"),
        attrs: {
          _i: "18-" + r
        }
      }, [t._v(t._$g("18-" + r, "t0-0") + "\uff1a")]), a("v-uni-text", {
        staticClass: t._$g("19-" + r, "sc"),
        attrs: {
          _i: "19-" + r
        }
      }, [t._v(t._$g("19-" + r, "t0-0"))])], 1)], 1), a("v-uni-image", {
        staticClass: t._$g("20-" + r, "sc"),
        style: t._$g("20-" + r, "s"),
        attrs: {
          src: t._$g("20-" + r, "a-src"),
          _i: "20-" + r
        }
      })], 1), t._$g("21-" + r, "i") ? a("uni-view", {
        staticClass: t._$g("21-" + r, "sc"),
        attrs: {
          _i: "21-" + r
        }
      }, [a("v-uni-text", {
        staticClass: t._$g("22-" + r, "sc"),
        attrs: {
          _i: "22-" + r
        }
      }, [t._v(t._$g("22-" + r, "t0-0") + "\uff1a")]), t._$g("23-" + r, "i") ? a("v-uni-text", {
        staticClass: t._$g("23-" + r, "sc"),
        style: t._$g("23-" + r, "s"),
        attrs: {
          _i: "23-" + r
        }
      }, [t._v(t._$g("23-" + r, "t0-0"))]) : a("v-uni-text", {
        staticClass: t._$g("24-" + r, "sc"),
        style: t._$g("24-" + r, "s"),
        attrs: {
          _i: "24-" + r
        },
        on: {
          click: function (e) {
            return t.$handleViewEvent(e);
          }
        }
      }, [t._v(t._$g("24-" + r, "t0-0"))])], 1) : t._e(), t._$g("25-" + r, "i") ? a("uni-view", {
        staticClass: t._$g("25-" + r, "sc"),
        attrs: {
          _i: "25-" + r
        }
      }, [a("v-uni-text", {
        staticClass: t._$g("26-" + r, "sc"),
        attrs: {
          _i: "26-" + r
        }
      }, [t._v(t._$g("26-" + r, "t0-0") + "\uff1a")]), t._$g("27-" + r, "i") ? a("v-uni-text", {
        staticClass: t._$g("27-" + r, "sc"),
        style: t._$g("27-" + r, "s"),
        attrs: {
          _i: "27-" + r
        }
      }, [t._v(t._$g("27-" + r, "t0-0"))]) : a("v-uni-text", {
        staticClass: t._$g("28-" + r, "sc"),
        style: t._$g("28-" + r, "s"),
        attrs: {
          _i: "28-" + r
        },
        on: {
          click: function (e) {
            return t.$handleViewEvent(e);
          }
        }
      }, [t._v(t._$g("28-" + r, "t0-0"))])], 1) : t._e(), t._$g("29-" + r, "i") ? a("uni-view", {
        staticClass: t._$g("29-" + r, "sc"),
        attrs: {
          _i: "29-" + r
        }
      }, [a("v-uni-text", {
        staticClass: t._$g("30-" + r, "sc"),
        attrs: {
          _i: "30-" + r
        }
      }, [t._v(t._$g("30-" + r, "t0-0") + "\uff1a")]), t._$g("31-" + r, "i") ? a("v-uni-text", {
        staticClass: t._$g("31-" + r, "sc"),
        style: t._$g("31-" + r, "s"),
        attrs: {
          _i: "31-" + r
        }
      }, [t._v(t._$g("31-" + r, "t0-0"))]) : a("v-uni-text", {
        staticClass: t._$g("32-" + r, "sc"),
        style: t._$g("32-" + r, "s"),
        attrs: {
          _i: "32-" + r
        },
        on: {
          click: function (e) {
            return t.$handleViewEvent(e);
          }
        }
      }, [t._v(t._$g("32-" + r, "t0-0"))])], 1) : t._e()], 1)], 1);
    }), 1), a("uni-view", {
      attrs: {
        _i: 33
      }
    }, [t._$g(34, "i") ? a("u-empty", {
      attrs: {
        _i: 34
      }
    }) : t._e(), t._$g(35, "i") ? a("u-loadmore", {
      attrs: {
        _i: 35
      }
    }) : t._e()], 1)], 1);
  }, r = [];
})(module, exports, __r);
