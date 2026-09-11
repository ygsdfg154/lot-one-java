// webpack 模块 805  [nvue]
// 出现于: pagesFunc/terminal/locus/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return r;
  }), n.d(t, "c", function () {
    return i;
  }), n.d(t, "a", function () {
    return a;
  }));
  var a = {
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uSlider: require("uview-ui/components/u-slider/u-slider.vue").default,
    uRow: require("uview-ui/components/u-row/u-row.vue").default,
    uCol: require("uview-ui/components/u-col/u-col.vue").default,
    uSwitch: require("uview-ui/components/u-switch/u-switch.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return e.currentPoint || e.basePoint.length ? n("view", {
      staticClass: ["map-panel"]
    }, [e.currentPoint || e.basePoint.length ? n("view", {
      staticClass: ["player", "flex-row", "items-center", "justify-between"]
    }, [e.isPlaying ? e._e() : n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/locus-play@2x.png",
        size: "58rpx"
      },
      on: {
        click: function (t) {
          e.$emit("play");
        }
      }
    }), e.isPlaying ? n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/locus-pause@2x.png",
        size: "58rpx"
      },
      on: {
        click: function (t) {
          e.$emit("pause");
        }
      }
    }) : e._e(), n("view", {
      staticStyle: {
        width: "505rpx"
      }
    }, [n("u-slider", {
      attrs: {
        min: 0,
        blockColor: "#6081C7",
        inactiveColor: "#c0c4cc",
        activeColor: "#6081C7"
      },
      on: {
        changing: function (t) {
          e.$emit("progressChanging", t);
        },
        change: function (t) {
          e.$emit("progressChanged", t);
        }
      },
      model: {
        value: e.panelProgress,
        callback: function (t) {
          e.panelProgress = t;
        },
        expression: "panelProgress"
      }
    })], 1), 400 == e.speed ? n("view", {
      staticClass: ["flex", "flex-row", "items-center"],
      on: {
        click: function (t) {
          e.$emit("changeSpeed", 200);
        }
      }
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/locus-speed@2x.png",
        size: "48rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "text-title"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u4e2d")])], 1) : e._e(), 200 == e.speed ? n("view", {
      staticClass: ["flex", "flex-row", "items-center"],
      on: {
        click: function (t) {
          e.$emit("changeSpeed", 600);
        }
      }
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/locus-speed@2x.png",
        size: "48rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "text-title"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5feb")])], 1) : e._e(), 600 == e.speed ? n("view", {
      staticClass: ["flex", "flex-row", "items-center"],
      on: {
        click: function (t) {
          e.$emit("changeSpeed", 400);
        }
      }
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/locus-speed@2x.png",
        size: "48rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "text-title"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u6162")])], 1) : e._e()], 1) : e._e(), n("view", {
      staticClass: ["map-main"]
    }, [e.currentPoint ? n("u-row", [n("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "8.5"
      }
    }, [n("u-text", {
      staticClass: ["text", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("device.location-time")) + "\uff1a")]), n("u-text", {
      staticClass: ["text", "text-title"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.currentPoint.locateTime))])]), n("u-col", {
      attrs: {
        span: "3.5"
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-text", {
      staticClass: ["text", "text-title", "m-r-sm"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("locus.base.locate")))]), n("u-switch", {
      attrs: {
        activeColor: e.primaryColor,
        size: "20"
      },
      on: {
        change: function (e) {}
      },
      model: {
        value: e.baseValue,
        callback: function (t) {
          e.baseValue = t;
        },
        expression: "baseValue"
      }
    })], 1)])], 1) : e._e(), e.currentPoint ? e._e() : n("u-row", {
      staticClass: ["justify-end"]
    }, [e.currentPoint ? n("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "8"
      }
    }, [n("u-text", {
      staticClass: ["text", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("device.location-time")) + "\uff1a")]), n("u-text", {
      staticClass: ["text", "text-title"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.currentPoint.locateTime))])]) : e._e(), n("u-col", {
      attrs: {
        span: "3.5"
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-text", {
      staticClass: ["text", "text-title", "m-r-sm"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("locus.base.locate")))]), n("u-switch", {
      attrs: {
        activeColor: e.primaryColor,
        size: "20"
      },
      on: {
        change: function (e) {}
      },
      model: {
        value: e.baseValue,
        callback: function (t) {
          e.baseValue = t;
        },
        expression: "baseValue"
      }
    })], 1)])], 1), n("u-row", [e.currentPoint ? n("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [n("u-text", {
      staticClass: ["text", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("device.locate.mode")) + "\uff1a")]), n("u-text", {
      staticClass: ["text", "text-title"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.currentPoint.mode))])]) : e._e()], 1), n("u-row", {
      staticClass: ["m-t-minix"]
    }, [e.currentPoint ? n("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "7"
      }
    }, [n("u-text", {
      staticClass: ["text", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u901f\u5ea6\uff1a")]), n("u-text", {
      staticClass: ["text", "text-title"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.currentPoint.speed) + "km/h")]), n("u-text", {
      staticClass: ["text", "text-primary"],
      staticStyle: {
        marginLeft: "42rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u91cc\u7a0b\uff1a")]), n("u-text", {
      staticClass: ["text", "text-title"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.totalMileage) + "km")])]) : e._e(), e.currentPoint ? n("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "5"
      }
    }) : e._e()], 1), n("u-row", {
      staticClass: ["m-t-minix"]
    }, [e.currentPoint ? n("u-col", {
      attrs: {
        span: "12"
      }
    }, [n("view", {
      staticClass: ["flex"]
    }, [n("u-text", {
      staticClass: ["text", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5730\u5740\uff1a")]), n("view", {
      staticStyle: {
        width: "520rpx"
      }
    }, [n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.currentAddress))])])])]) : e._e()], 1)], 1)]) : e._e();
  }, i = [];
})(module, exports, __r);
