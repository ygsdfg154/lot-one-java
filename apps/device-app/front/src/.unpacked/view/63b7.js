// webpack 模块 63b7  [view]
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
    uButton: require("@/.unpacked/view/59c8.js").default
  }, i = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("uni-view", {
      staticClass: t._$g(0, "sc"),
      staticStyle: {
        "padding-bottom": "210rpx"
      },
      attrs: {
        _i: 0
      }
    }, [a("uni-view", {
      staticClass: t._$g(1, "sc"),
      attrs: {
        _i: 1
      }
    }, [a("u-icon", {
      attrs: {
        _i: 2
      }
    }), a("uni-view", {
      staticClass: t._$g(3, "sc"),
      attrs: {
        _i: 3
      }
    }, [a("uni-view", {
      attrs: {
        _i: 4
      }
    }, [a("v-uni-text", {
      staticClass: t._$g(5, "sc"),
      attrs: {
        _i: 5
      }
    }, [t._v(t._$g(5, "t0-0") + "\uff1a")]), a("v-uni-text", {
      staticClass: t._$g(6, "sc"),
      attrs: {
        _i: 6
      }
    }, [t._v(t._$g(6, "t0-0"))])], 1), a("uni-view", {
      attrs: {
        _i: 7
      }
    }, [a("v-uni-text", {
      staticClass: t._$g(8, "sc"),
      attrs: {
        _i: 8
      }
    }, [t._v("ICCID\uff1a")]), a("v-uni-text", {
      staticClass: t._$g(9, "sc"),
      attrs: {
        _i: 9
      }
    }, [t._v(t._$g(9, "t0-0"))])], 1), a("uni-view", {
      attrs: {
        _i: 10
      }
    }, [t._$g(11, "i") ? a("v-uni-text", {
      staticClass: t._$g(11, "sc"),
      attrs: {
        _i: 11
      }
    }, [t._v(t._$g(11, "t0-0") + "\uff1a")]) : t._e(), a("v-uni-text", {
      staticClass: t._$g(12, "sc"),
      attrs: {
        _i: 12
      }
    }, [t._v(t._$g(12, "t0-0"))])], 1)], 1)], 1), a("uni-view", {
      staticClass: t._$g(13, "sc"),
      attrs: {
        _i: 13
      }
    }, [a("uni-view", {
      staticClass: t._$g(14, "sc"),
      attrs: {
        _i: 14
      }
    }, t._l(t._$g(15, "f"), function (e, n, i, r) {
      return a("uni-view", {
        key: e,
        staticClass: t._$g("15-" + r, "sc"),
        class: t._$g("15-" + r, "c"),
        attrs: {
          _i: "15-" + r
        },
        on: {
          click: function (e) {
            return t.$handleViewEvent(e);
          }
        }
      }, [a("v-uni-text", {
        staticClass: t._$g("16-" + r, "sc"),
        attrs: {
          _i: "16-" + r
        }
      }, [t._v(t._$g("16-" + r, "t0-0"))]), a("uni-view", {
        staticClass: t._$g("17-" + r, "sc"),
        attrs: {
          _i: "17-" + r
        }
      }, [a("v-uni-text", {
        staticClass: t._$g("18-" + r, "sc"),
        attrs: {
          _i: "18-" + r
        }
      }, [t._v("\xa5")]), a("v-uni-text", {
        staticClass: t._$g("19-" + r, "sc"),
        attrs: {
          _i: "19-" + r
        }
      }, [t._v(t._$g("19-" + r, "t0-0"))])], 1)], 1);
    }), 1)], 1), a("uni-view", {
      staticStyle: {
        "background-color": "#fff",
        padding: "24rpx 28rpx 20rpx",
        background: "#ffffff",
        "border-radius": "16rpx",
        "margin-top": "24rpx"
      },
      attrs: {
        _i: 20
      }
    }, [a("PayMode", {
      attrs: {
        _i: 21
      },
      on: {
        changePayType: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    })], 1), a("uni-view", {
      staticClass: t._$g(22, "sc"),
      attrs: {
        _i: 22
      }
    }, [a("v-uni-text", {
      staticClass: t._$g(23, "sc"),
      attrs: {
        _i: 23
      }
    }, [t._v("\u5957\u9910\u5185\u5bb9:")]), t._$g(24, "i") ? a("uni-view", {
      staticClass: t._$g(24, "sc"),
      attrs: {
        _i: 24
      }
    }, [a("v-uni-text", {
      staticClass: t._$g(25, "sc"),
      attrs: {
        _i: 25
      }
    }, [t._v(t._$g(25, "t0-0"))])], 1) : t._e()], 1), a("uni-view", {
      staticClass: t._$g(26, "sc"),
      attrs: {
        _i: 26
      }
    }, [a("v-uni-text", {
      staticClass: t._$g(27, "sc"),
      attrs: {
        _i: 27
      }
    }, [t._v("\u8d2d\u4e70\u8bf4\u660e")]), a("uni-view", {
      staticClass: t._$g(28, "sc"),
      attrs: {
        _i: 28
      }
    }, [a("v-uni-text", {
      staticClass: t._$g(29, "sc"),
      attrs: {
        _i: 29
      }
    }, [t._v("1\uff1a\u6b64\u4e3a\u865a\u62df\u5546\u54c1\uff0c\u4e00\u7ecf\u552e\u51fa\u6982\u4e0d\u9000\u6b3e\u3002")])], 1), a("CustomerService", {
      attrs: {
        _i: 30
      }
    })], 1), a("uni-view", {
      staticStyle: {
        position: "fixed",
        left: "0",
        bottom: "0"
      },
      attrs: {
        _i: 31
      }
    }, [a("uni-view", {
      staticClass: t._$g(32, "sc"),
      attrs: {
        _i: 32
      }
    }, [a("GetBackApp", {
      attrs: {
        _i: 33
      }
    })], 1), a("uni-view", {
      staticClass: t._$g(34, "sc"),
      attrs: {
        _i: 34
      }
    }, [a("uni-view", {
      staticClass: t._$g(35, "sc"),
      attrs: {
        _i: 35
      }
    }, [a("uni-view", {
      staticClass: t._$g(36, "sc"),
      attrs: {
        _i: 36
      }
    }, [a("v-uni-text", {
      staticClass: t._$g(37, "sc"),
      attrs: {
        _i: 37
      }
    }, [t._v(t._$g(37, "t0-0") + "\uff1a")]), a("v-uni-text", {
      staticClass: t._$g(38, "sc"),
      attrs: {
        _i: 38
      }
    }, [t._v("\xa5")])], 1), a("v-uni-text", {
      staticClass: t._$g(39, "sc"),
      attrs: {
        _i: 39
      }
    }, [t._v(t._$g(39, "t0-0"))])], 1), a("uni-view", {
      staticStyle: {
        width: "278rpx"
      },
      attrs: {
        _i: 40
      }
    }, [a("u-button", {
      attrs: {
        _i: 41
      },
      on: {
        click: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    })], 1)], 1)], 1), a("Pay", {
      ref: "Pay",
      attrs: {
        _i: 42
      },
      on: {
        paySucces: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    })], 1);
  }, r = [];
})(module, exports, __r);
