// webpack 模块 774  [nvue]
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
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("scroll-view", {
      staticStyle: {
        flexDirection: "column"
      },
      attrs: {
        scrollY: !0,
        showScrollbar: !0,
        enableBackToTop: !0,
        bubble: "true"
      }
    }, [n("view", {
      staticStyle: {
        flex: "1",
        height: "100vh"
      }
    }, [n("map", {
      ref: "map",
      style: {
        width: "750rpx",
        height: "100vh",
        flex: 1,
        justifyContent: "flex-start"
      },
      attrs: {
        id: "map",
        scale: e.scale,
        enableBuilding: !0,
        longitude: e.longitude,
        latitude: e.latitude,
        markers: e.markers,
        polyline: e.polyline
      },
      on: {
        markertap: e.markertap,
        tap: e.mapTap
      }
    }), n("view", {
      staticClass: ["tool-bar", "flex-row", "items-center", "justify-between", "br-xl"]
    }, [n("view", {
      staticClass: ["flex-row", "items-center"],
      on: {
        click: e.prevDate
      }
    }, [n("u-icon", {
      attrs: {
        name: "play-left-fill",
        size: "18rpx",
        color: "#C9CDD4"
      }
    }), n("u-text", {
      staticClass: ["text_4"],
      staticStyle: {
        marginLeft: "4rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.before.day")))])], 1), n("view", {
      staticClass: ["flex-row", "items-center"],
      on: {
        click: e.openCalendar
      }
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-calendar@2x.png",
        size: "48rpx"
      }
    }), n("u-text", {
      staticClass: ["text_2", "p-l-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.currentDate))])], 1), n("view", {
      staticClass: ["flex-row", "items-center"],
      on: {
        click: e.nextDate
      }
    }, [n("u-text", {
      staticClass: ["text_4"],
      staticStyle: {
        marginRight: "4rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.last.day")))]), n("u-icon", {
      attrs: {
        name: "play-right-fill",
        size: "18rpx",
        color: "#C9CDD4"
      }
    })], 1)]), n("locusPanel", {
      ref: "locusPanel",
      attrs: {
        currentPoint: e.currentPoint,
        currentAddress: e.currentAddress,
        basePoint: e.basePoint,
        totalMileage: e.totalMileage,
        isPlaying: e.isPlaying,
        speed: e.speed,
        progress: e.progress
      },
      on: {
        play: e.play,
        pause: e.pause,
        progressChanging: e.progressChanging,
        progressChanged: e.progressChanged,
        changeSpeed: e.changeSpeed,
        drawBaseMarker: e.drawBaseMarker
      }
    }), n("selectTime", {
      ref: "selectTime",
      attrs: {
        currentDate: e.currentDate,
        closeDate: e.closeDate
      },
      on: {
        confirmCalendar: e.confirmCalendar
      }
    })], 1)]);
  }, i = [];
})(module, exports, __r);
