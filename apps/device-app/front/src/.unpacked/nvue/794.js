// webpack 模块 794  [nvue]
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
    uBadge: require("uview-ui/components/u-badge/u-badge.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uScrollList: require("uview-ui/components/u-scroll-list/u-scroll-list.vue").default
  }, a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {}, [e.selectedTerminal && e.infoBoxShow ? n("view", {
      staticClass: ["info"]
    }, [n("view", {
      staticClass: ["infoMain"]
    }, [n("view", {
      staticClass: ["infotitle"],
      style: {
        paddingTop: e.locationGoodPower ? "26rpx" : 0
      }
    }, [e.locationGoodPower ? n("u-image", {
      staticStyle: {
        width: "160rpx",
        height: "32rpx"
      },
      attrs: {
        src: e.cdn + "/draw/qzwl-index-text1.png"
      },
      on: {
        click: function (t) {
          e.gotoPages("locationGood");
        }
      }
    }) : e._e(), e.locationGoodPower ? n("u-image", {
      staticClass: ["m-l-xl"],
      staticStyle: {
        width: "160rpx",
        height: "32rpx"
      },
      attrs: {
        src: e.cdn + "/draw/qzwl-index-text2.png"
      },
      on: {
        click: function (t) {
          e.gotoPages("locationGood");
        }
      }
    }) : e._e()], 1), n("view", {
      staticClass: ["infobox"]
    }, [n("view", {
      staticClass: ["flex-row", "items-center", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-badge", {
      staticClass: ["p-h-md"],
      staticStyle: {
        height: "40rpx",
        fontSize: "26rpx",
        lineHeight: "32rpx"
      },
      attrs: {
        bgColor: e.setBadgeColor(e.selectedTerminal.status),
        color: "#fff",
        value: e.l(e.selectedTerminal.status)
      }
    }), n("u-text", {
      staticClass: ["m-l", "text-title", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.selectedTerminal.speed) + "km/h")])], 1), n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [e.WLSignalIcon ? n("view", {
      staticClass: ["flex-row", "items-center", "m-r"]
    }, [n("u-icon", {
      attrs: {
        name: e.WLSignalIcon,
        size: "36rpx",
        stop: !0
      }
    }), n("u-text", {
      staticClass: ["text-ssm"],
      staticStyle: {
        margin: "3rpx 0 0 3rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u901a\u4fe1")])], 1) : e._e(), e.GNSSCountIcon ? n("view", {
      staticClass: ["flex-row", "items-center", "m-r"]
    }, [n("u-icon", {
      attrs: {
        name: e.GNSSCountIcon,
        size: "36rpx",
        stop: !0
      }
    }), n("u-text", {
      staticClass: ["text-ssm"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u536b\u661f")])], 1) : e._e(), e.genBetteryIcon && e.genBettery ? n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.genBetteryIcon,
        size: "36rpx",
        stop: !0
      }
    }), n("u-text", {
      staticClass: ["text-title", "text-sm", "m-l-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.genBettery))])], 1) : e._e()])]), e.selectedTerminal ? n("view", {
      staticClass: ["m-v"]
    }, [n("view", {
      staticClass: ["flex-row", "items-center", "justify-between"]
    }, [n("view", {}, [n("u-text", {
      staticClass: ["text", "m-t-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("device.locate.way")) + "\uff1a" + e._s(e.l(e.locationState[e.selectedTerminal.lbsMode]) || "-"))]), n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("self-test.communication-time")) + "\uff1a" + e._s(e.genTime || "-"))]), n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("device.location-time")) + "\uff1a" + e._s(e.locateTime || "-"))])]), e.sharePower ? n("view", {
      staticClass: ["flex-col", "justify-center", "items-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-shareLocation@2x.png",
        size: "64rpx",
        label: "\u5206\u4eab\u5b9a\u4f4d",
        labelPos: "bottom",
        labelSize: "28rpx"
      },
      on: {
        click: function (t) {
          e.gotoPages("share");
        }
      }
    })], 1) : e._e()]), e.selectedTerminal.lon && e.selectedTerminal.lat ? n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("index.address")) + "\uff1a" + e._s(e.genAddress))]) : n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("index.address")) + "\uff1a" + e._s(e.l("common.no.locate")))])]) : e._e(), n("u-scroll-list", {
      attrs: {
        indicatorActiveColor: "#6081C7",
        indicator: !1
      }
    }, [e.locationGoodPower ? n("view", {
      staticClass: ["grid-item"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/draw/qzwl-locationMap.png",
        size: "56rpx",
        label: "\u7cbe\u51c6\u5b9a\u4f4d",
        labelPos: "bottom",
        labelSize: "24rpx",
        labelColor: "#999"
      },
      on: {
        click: function (t) {
          e.gotoPages("locationGood");
        }
      }
    })], 1) : e._e(), e.addValuePower ? n("view", {
      staticClass: ["grid-item"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-index-pay@2x.png",
        size: "56rpx",
        label: "\u589e\u503c\u670d\u52a1",
        labelPos: "bottom",
        labelSize: "24rpx",
        labelColor: "#999"
      },
      on: {
        click: e.gotoMp
      }
    })], 1) : e._e(), n("view", {
      staticClass: ["grid-item"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-index-track@2x.png",
        size: "56rpx",
        label: "\u5386\u53f2\u8f68\u8ff9",
        labelPos: "bottom",
        labelSize: "24rpx",
        labelColor: "#999"
      },
      on: {
        click: function (t) {
          e.gotoPages("/pagesFunc/terminal/locus/index");
        }
      }
    })], 1), n("view", {
      staticClass: ["grid-item"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-index-info@2x.png",
        size: "56rpx",
        label: "\u8bbe\u5907\u4fe1\u606f",
        labelPos: "bottom",
        labelSize: "24rpx",
        labelColor: "#999"
      },
      on: {
        click: function (t) {
          e.gotoPages("/pagesFunc/deviceInfo/index");
        }
      }
    })], 1), e.locationModePower ? n("view", {
      staticClass: ["grid-item"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-locationMode@2x.png",
        size: "56rpx",
        label: "\u5b9a\u4f4d\u6a21\u5f0f",
        labelPos: "bottom",
        labelSize: "24rpx",
        labelColor: "#999"
      },
      on: {
        click: function (t) {
          e.gotoPages("/pagesFunc/terminal/locate-mode/index");
        }
      }
    })], 1) : e._e(), e.isAuditMode ? n("view", {
      staticClass: ["grid-item"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-fence@2x.png",
        size: "60rpx",
        label: "\u7535\u5b50\u56f4\u680f",
        labelPos: "bottom",
        labelSize: "24rpx",
        labelColor: "#999"
      },
      on: {
        click: function (t) {
          e.gotoPages("/pagesFunc/terminal/corral/list");
        }
      }
    })], 1) : e._e()])], 1)]), e.locationGoodPower ? n("u-image", {
      staticClass: ["infoIcon"],
      attrs: {
        src: e.cdn + "/draw/qzwl-index-location.png"
      }
    }) : e._e()], 1) : e._e(), e.vipPopupShow ? n("payPopup", {
      attrs: {
        message: e.vipPopupData,
        url: e.vipPopupUrl
      },
      on: {
        closeVipPopup: e.closeVipPopup
      }
    }) : e._e()], 1);
  }, i = [];
})(module, exports, __r);
