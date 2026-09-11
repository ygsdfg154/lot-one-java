// webpack 模块 747  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return i;
  }), n.d(t, "a", function () {
    return r;
  }));
  var r = {
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, a = function () {
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
      staticClass: ["flex-1"]
    }, [n("map", {
      ref: "map",
      style: {
        width: "750rpx",
        height: "100vh",
        flex: 1,
        justifyContent: "space-between"
      },
      attrs: {
        id: "map",
        scale: e.scale,
        enableBuilding: !0,
        showLocation: e.showLocation,
        enableSatellite: e.enableSatellite,
        enableTraffic: e.enableTraffic,
        enableRotate: !0,
        enableOverlooking: !0,
        longitude: e.longitude,
        latitude: e.latitude,
        markers: e.markers,
        polyline: e.polyline
      },
      on: {
        updated: e.updatedMap,
        markertap: e.markertap
      }
    }), e.noticeData ? n("noticeNavBar", {
      staticClass: ["noticeBarClass"],
      staticStyle: {
        width: "450rpx"
      },
      style: {
        top: e.noticeControl
      }
    }) : e._e(), e.isAuditModeAndroid ? n("view", {
      staticClass: ["androidMapCheck"]
    }, [n("u-text", {
      staticClass: ["text-sm"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5ba1\u56fe\u53f7\uff1a" + e._s(e.enableSatellite ? "GS (2023)4047\u53f7" : "GS (2023)551\u53f7 | GS (2023)2175\u53f7"))]), n("u-text", {
      staticClass: ["text-sm", "m-t"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u6d4b\u7ed8\u8d44\u8d28\uff1a\u7532\u6d4b\u8d44\u5b5711111093")]), n("u-text", {
      staticClass: ["text-sm", "m-t"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5730\u56fe\u670d\u52a1\u7531\u9ad8\u5fb7\u8f6f\u4ef6\u6709\u9650\u516c\u53f8\u63d0\u4f9b")])]) : e._e(), n("view", {
      staticClass: ["map-left"],
      style: {
        marginTop: e.mapControl
      }
    }, [n("view", {
      staticClass: ["map-left-main"]
    }, [n("u-image", {
      staticClass: ["map-left-main-item"],
      attrs: {
        src: e.cdn + "/ikon/qzwl-refreshnew@2x.png"
      },
      on: {
        click: e.debounceOnRefresh
      }
    }), 3 != e.userType ? n("u-image", {
      staticClass: ["map-left-main-item"],
      attrs: {
        src: e.cdn + "/ikon/qzwl-cut@2x.png"
      },
      on: {
        click: function (t) {
          e.gotoPages("/pagesFunc/terminal/list/index");
        }
      }
    }) : e._e(), n("u-image", {
      staticClass: ["map-left-main-item"],
      staticStyle: {
        marginTop: "180rpx"
      },
      attrs: {
        src: e.cdn + "/ikon/qzwl-l-terminal@2x.png"
      },
      on: {
        click: e.moveToTerminalLocate
      }
    }), n("u-image", {
      staticClass: ["map-left-main-item"],
      attrs: {
        src: e.cdn + "/ikon/qzwl-l-user@2x.png"
      },
      on: {
        click: e.moveToMyLocate
      }
    })], 1)]), n("view", {
      staticClass: ["map-right"],
      style: {
        marginTop: e.mapControl
      }
    }, [e.enableSatellite ? e._e() : n("u-image", {
      staticClass: ["map-right-item"],
      attrs: {
        src: e.cdn + "/ikon/qzwl-tier-on.png"
      },
      on: {
        click: e.toggleLayer
      }
    }), e.enableSatellite ? n("u-image", {
      staticClass: ["map-right-item"],
      attrs: {
        src: e.cdn + "/ikon/qzwl-tier-normal.png"
      },
      on: {
        click: e.toggleLayer
      }
    }) : e._e(), e.enableTraffic ? e._e() : n("u-image", {
      staticClass: ["map-right-item"],
      attrs: {
        src: e.cdn + "/ikon/qzwl-road-normal.png"
      },
      on: {
        click: e.toggleTraffic
      }
    }), e.enableTraffic ? n("u-image", {
      staticClass: ["map-right-item"],
      attrs: {
        src: e.cdn + "/ikon/qzwl-road-on.png"
      },
      on: {
        click: e.toggleTraffic
      }
    }) : e._e(), n("u-image", {
      staticClass: ["map-right-item"],
      attrs: {
        src: e.cdn + "/ikon/navIndex@2x.png"
      },
      on: {
        click: e.openNavigate
      }
    }), n("u-image", {
      staticClass: ["map-right-item"],
      attrs: {
        src: e.cdn + "/ikon/qzwl-ranging@2x.png"
      },
      on: {
        click: e.ranging
      }
    }), n("view", {
      staticClass: ["up-map"]
    }, [n("view", {
      staticClass: ["up-map-item"],
      on: {
        click: function (t) {
          e.changeMapScale(!0);
        }
      }
    }, [n("u-icon", {
      attrs: {
        name: "plus",
        bold: !0,
        color: "#6081C7",
        size: "40rpx"
      },
      on: {
        click: function (t) {
          e.changeMapScale(!0);
        }
      }
    })], 1), n("view", {
      staticClass: ["up-map-item"],
      on: {
        click: function (t) {
          e.changeMapScale(!1);
        }
      }
    }, [n("u-icon", {
      attrs: {
        name: "minus",
        bold: !0,
        color: "#6081C7",
        size: "40rpx"
      },
      on: {
        click: function (t) {
          e.changeMapScale(!1);
        }
      }
    })], 1)])], 1), e.isAuthenticated ? e._e() : n("loginHint", {
      staticClass: ["loginHint"],
      style: e.loginHintBottom
    }), n("terminalInfo", {
      ref: "terminalInfo",
      attrs: {
        wxBrowser: e.wxBrowser
      },
      on: {
        openShare: e.openShare
      }
    }), n("qzwlShare", {
      ref: "qzwlShare",
      on: {
        setShareMp: e.setShareMp
      }
    }), e.activationState > 1 ? n("activationPopup") : e._e(), e.vipPopupShowHome ? n("payPopup", {
      attrs: {
        message: e.vipPopupDataHome,
        url: e.vipPopupUrlHome,
        type: "iccid"
      },
      on: {
        closeVipPopup: e.closeVipPopup
      }
    }) : e._e(), e.adShow ? n("Advertising") : e._e(), n("permissionPopup")], 1)]);
  }, i = [];
})(module, exports, __r);
