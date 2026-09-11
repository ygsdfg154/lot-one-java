// webpack 模块 768  [nvue]
// 出现于: pagesFunc/terminal/self-detection.js
const __r = require('./__runtime.js').wrap();
(function (e, t, a) {
  "use strict";
  (a.d(t, "b", function () {
    return n;
  }), a.d(t, "c", function () {
    return r;
  }), a.d(t, "a", function () {}));
  var n = function () {
    var e = this, t = e.$createElement, a = e._self._c || t;
    return a("scroll-view", {
      staticStyle: {
        flexDirection: "column"
      },
      attrs: {
        scrollY: !0,
        showScrollbar: !0,
        enableBackToTop: !0,
        bubble: "true"
      }
    }, [a("view", {
      staticClass: ["flex-col", "flex-1", "p-h-xl"],
      staticStyle: {
        backgroundColor: "#ecf1fa"
      }
    }, [a("view", {
      staticClass: ["grid", "flex-col", "m-t"]
    }, [a("view", {
      staticClass: ["grid-item"]
    }, [a("view", {
      staticClass: ["flex-row", "items-center"]
    }, [a("u-image", {
      staticStyle: {
        width: "64rpx",
        height: "64rpx"
      },
      attrs: {
        src: e.cdn + "/ikon/qzwl-self-online.png"
      }
    }), a("view", {
      staticClass: ["flex-col", "m-l"]
    }, [a("u-text", {
      staticClass: ["text-md", "text-bold"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.starting-state")))]), a("u-text", {
      staticClass: ["text-sm", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.detection-starting")))])])], 1), a("view", {
      staticClass: ["flex-row", "items-center"]
    }, [a("u-image", {
      staticStyle: {
        width: "24rpx",
        height: "24rpx"
      },
      attrs: {
        src: e.cdn + "/ikon/qzwl-self-ok.png"
      }
    }), a("u-text", {
      staticClass: ["text-sm", "m-l-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.online))])], 1)]), a("view", {
      staticClass: ["flex-row", "items-center", "grid-item"]
    }, [a("view", {
      staticClass: ["flex-row", "items-center"]
    }, [a("u-image", {
      staticStyle: {
        width: "70rpx",
        height: "70rpx"
      },
      attrs: {
        src: e.cdn + "/ikon/qzwl-self-mesh.png"
      }
    }), a("view", {
      staticClass: ["flex-col", "m-l"]
    }, [a("u-text", {
      staticClass: ["text-md", "text-bold"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.terminal.network")))]), a("u-text", {
      staticClass: ["text-sm", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.detection-network")))])])], 1), a("view", {
      staticClass: ["flex-row", "items-center"]
    }, [a("u-image", {
      staticStyle: {
        width: "24rpx",
        height: "24rpx"
      },
      attrs: {
        src: e.cdn + "/ikon/qzwl-self-ok.png"
      }
    }), a("u-text", {
      staticClass: ["text-sm", "m-l-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.genGsmSignal))])], 1)]), a("view", {
      staticClass: ["flex-row", "items-center", "grid-item"]
    }, [a("view", {
      staticClass: ["flex-row", "items-center"]
    }, [a("u-image", {
      staticStyle: {
        width: "70rpx",
        height: "70rpx"
      },
      attrs: {
        src: e.cdn + "/ikon/qzwl-self-el.png"
      }
    }), a("view", {
      staticClass: ["flex-col", "m-l"]
    }, [a("u-text", {
      staticClass: ["text-md", "text-bold"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.wirelessDeviceState ? e.l("self-test.power-state") : e.l("self-test.battery-capacity")))]), a("u-text", {
      staticClass: ["text-sm", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.wirelessDeviceState ? e.l("self-test.power-state-capacity") : e.l("self-test.detection-battery-capacity")))])])], 1), a("view", {
      staticClass: ["flex-row", "items-center"]
    }, [a("u-image", {
      staticStyle: {
        width: "24rpx",
        height: "24rpx"
      },
      attrs: {
        src: e.cdn + "/ikon/qzwl-self-ok.png"
      }
    }), a("u-text", {
      staticClass: ["text-sm", "m-l-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.genBettery))])], 1)]), a("view", {
      staticClass: ["flex-row", "items-center", "grid-item"]
    }, [a("view", {
      staticClass: ["flex-row", "items-center"]
    }, [a("u-image", {
      staticStyle: {
        width: "70rpx",
        height: "70rpx"
      },
      attrs: {
        src: e.cdn + "/ikon/qzwl-self-moon.png"
      }
    }), a("view", {
      staticClass: ["flex-col", "m-l"]
    }, [a("u-text", {
      staticClass: ["text-md", "text-bold"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("GPS\u2002" + e._s(e.l("self-test.satellite")))]), a("u-text", {
      staticClass: ["text-sm", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.detection-satellite")))])])], 1), a("view", {
      staticClass: ["flex-row", "items-center"]
    }, [a("u-image", {
      staticStyle: {
        width: "24rpx",
        height: "24rpx"
      },
      attrs: {
        src: e.cdn + "/ikon/qzwl-self-ok.png"
      }
    }), a("view", {
      staticClass: ["flex-row", "items-center"]
    }, [a("u-text", {
      staticClass: ["text-sm", "m-l-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.genWLSignal))]), a("u-text", {
      staticClass: ["text-sm", "m-l-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.genGpsSum))])])], 1)])]), a("view", {
      staticClass: ["flex-col", "m-t", "bg-white", "br-xl"],
      staticStyle: {
        padding: "24rpx 24rpx 40rpx"
      }
    }, [a("view", {
      staticClass: ["flex-row", "justify-center"]
    }, [a("u-text", {
      staticClass: ["text-md", "text-bold"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.config-param")))])]), a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.locate-switch")) + ":")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.locate-switch-state")))])]), e.workModel ? a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.working-mode")) + ":")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.workModel || "-"))])]) : e._e(), e.terminalFuncShow(22) ? a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.remote.onOff")) + ":")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.online || "-"))])]) : e._e(), e.betteryAlarmState ? a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.low-power")) + ":")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.betteryAlarmState || "-"))])]) : e._e(), e.shockAlarmState ? a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.vibration-induction")) + ":")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.shockAlarmState || "-"))])]) : e._e(), e.garrison ? a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u8bbe\u9632\u72b6\u6001:")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.garrison))])]) : e._e()]), a("view", {
      staticClass: ["flex-col", "m-t", "bg-white", "br-xl"],
      staticStyle: {
        padding: "24rpx 24rpx 40rpx"
      }
    }, [a("view", {
      staticClass: ["flex-row", "justify-center"]
    }, [a("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.basic-information")))])]), a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("ICCID:")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.iccid || "-"))])]), a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("device.terminal.model")) + ":")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.terminalTypeDisplayName || "-"))])]), a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.communication-time")) + ":")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.genTime || "-"))])]), a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.satellite-quantity")) + ":")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.selectedTerminal.gnssCount || "-"))])]), a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.terminal.network")) + ":")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.genGsmSignal || "-"))])]), a("view", {
      staticClass: ["m-t", "flex-row", "justify-between"]
    }, [a("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.wirelessDeviceState ? e.l("self-test.power-state") : e.l("self-test.battery-capacity")) + ":")]), a("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.genBettery || "-"))])])])])]);
  }, r = [];
})(module, exports, __r);
