// webpack 模块 769  [nvue]
// 出现于: pagesFunc/terminal/trip-report/detail.js
const __r = require('./__runtime.js').wrap();
(function (t, e, r) {
  "use strict";
  (r.d(e, "b", function () {
    return n;
  }), r.d(e, "c", function () {
    return i;
  }), r.d(e, "a", function () {
    return o;
  }));
  var o = {
    uRow: require("uview-ui/components/u-row/u-row.vue").default,
    uCol: require("uview-ui/components/u-col/u-col.vue").default
  }, n = function () {
    var t = this, e = t.$createElement, r = t._self._c || e;
    return r("scroll-view", {
      staticStyle: {
        flexDirection: "column"
      },
      attrs: {
        scrollY: !0,
        showScrollbar: !0,
        enableBackToTop: !0,
        bubble: "true"
      }
    }, [r("view", {
      style: {
        flex: 1,
        height: "100vh"
      }
    }, [r("map", {
      ref: "map",
      style: {
        width: "750rpx",
        height: "100vh",
        flex: 1,
        justifyContent: "flex-start"
      },
      attrs: {
        id: "map",
        scale: t.scale,
        enableBuilding: !0,
        enableSatellite: t.enableSatellite,
        enableTraffic: t.enableTraffic,
        longitude: t.longitude,
        latitude: t.latitude,
        markers: t.markers,
        polyline: t.polyline
      }
    }), r("view", {
      staticClass: ["map-control"]
    }, [t.enableSatellite ? r("u-image", {
      staticClass: ["map-control-item"],
      attrs: {
        src: t.cdn + "/ikon/layer-satellite@2x.png"
      },
      on: {
        click: t.layerChane
      }
    }) : t._e(), t.enableSatellite ? t._e() : r("u-image", {
      staticClass: ["map-control-item"],
      attrs: {
        src: t.cdn + "/ikon/layer-normal@2x.png"
      },
      on: {
        click: t.layerChane
      }
    }), t.enableTraffic ? r("u-image", {
      staticClass: ["map-control-item"],
      attrs: {
        src: t.cdn + "/ikon/traffic-on@2x.png"
      },
      on: {
        click: t.trafficChane
      }
    }) : t._e(), t.enableTraffic ? t._e() : r("u-image", {
      staticClass: ["map-control-item"],
      attrs: {
        src: t.cdn + "/ikon/traffic-off@2x.png"
      },
      on: {
        click: t.trafficChane
      }
    })], 1), t.reportType ? r("view", {
      staticClass: ["map-info"]
    }, [r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("u-text", {
      staticClass: ["text-desc", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("device.terminal.no")) + "\uff1a")]), r("u-text", {
      staticClass: ["text-title", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.selectedTerminal.terminalNo))])])], 1), r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("u-text", {
      staticClass: ["text-desc", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("common.duration")) + "\uff1a")]), r("u-text", {
      staticClass: ["text-title", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.reportInfo.timeDiff))])])], 1), r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("u-text", {
      staticClass: ["text-desc", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("report.speed")) + "\uff1a")]), r("u-text", {
      staticClass: ["text-title", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.reportInfo.caculateSpeed) + "km/h")])])], 1), r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("u-text", {
      staticClass: ["text-desc", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("report.mileage")) + "\uff1a")]), t.reportInfo.mileage ? r("u-text", {
      staticClass: ["text-title", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.reportInfo.mileage.toFixed(2)) + "km")]) : t._e()])], 1), r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("u-text", {
      staticClass: ["text-desc", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("common.time-on")) + "\uff1a")]), r("u-text", {
      staticClass: ["text-title", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.reportInfo.startTime))])])], 1), r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("u-text", {
      staticClass: ["text-desc", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("common.time-off")) + "\uff1a")]), r("u-text", {
      staticClass: ["text-title", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.reportInfo.endTime))])])], 1), r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("view", {
      staticClass: ["flex"]
    }, [r("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("common.starting")) + "\uff1a")]), r("view", {
      style: {
        width: "550rpx"
      }
    }, [r("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.reportInfo.startAddress))])])])])], 1), r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("view", {
      staticClass: ["flex"]
    }, [r("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("common.destination")) + "\uff1a")]), r("view", {
      style: {
        width: "550rpx"
      }
    }, [r("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.reportInfo.endAddress))])])])])], 1)], 1) : r("view", {
      staticClass: ["map-info"]
    }, [r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("u-text", {
      staticClass: ["text-desc", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("device.terminal.no")) + "\uff1a")]), r("u-text", {
      staticClass: ["text-title", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.selectedTerminal.terminalNo))])])], 1), r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("u-text", {
      staticClass: ["text-desc", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("common.residence.time")) + "\uff1a")]), t.reportInfo.minutes ? r("u-text", {
      staticClass: ["text-title", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.reportInfo.minutes.toFixed(2) + t.l("common.minutes")))]) : t._e()])], 1), r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("u-text", {
      staticClass: ["text-desc", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("common.time-on")) + "\uff1a")]), r("u-text", {
      staticClass: ["text-title", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.reportInfo.startTime))])])], 1), r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("u-text", {
      staticClass: ["text-desc", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("common.time-off")) + "\uff1a")]), r("u-text", {
      staticClass: ["text-title", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.reportInfo.endTime))])])], 1), r("u-row", [r("u-col", {
      staticClass: ["flex"],
      attrs: {
        span: "12"
      }
    }, [r("view", {
      staticClass: ["flex"]
    }, [r("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.l("locus.address")) + "\uff1a")]), r("view", {
      style: {
        width: "550rpx"
      }
    }, [r("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [t._v(t._s(t.reportInfo.address))])])])])], 1)], 1)], 1)]);
  }, i = [];
})(module, exports, __r);
