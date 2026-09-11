// webpack 模块 745  [nvue]
// 出现于: pages/ability/index.js
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
    uEmpty: require("uview-ui/components/u-empty/u-empty.vue").default,
    uPopup: require("uview-ui/components/u-popup/u-popup.vue").default
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
      staticClass: ["bg-white", "flex-col", "flex-1"]
    }, [n("view", {
      staticClass: ["p-t", "p-h-xl"]
    }, [e.emptyShow ? e._e() : n("view", {
      staticClass: ["mainTitle"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between", "items-center", "m-h-md", "m-b-md"]
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.selectedTerminal.terminalName || e.selectedTerminal.terminalNo))]), n("u-text", {
      staticClass: ["text-sm", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u66f4\u65b0\u65f6\u95f4\uff1a" + e._s(e.genTime || "-"))])]), n("view", {
      staticClass: ["br-md", "bg-white", "p-v-lg", "p-r-xl", "flex-row", "items-center", "justify-center"]
    }, [e.genBettery ? n("view", {
      staticClass: ["flex-row", "mainTitle-item"]
    }, [n("u-text", {
      staticClass: ["text-sm"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u7535\u91cf\uff1a")]), n("u-text", {
      staticClass: ["text-sm"],
      staticStyle: {
        color: "#faa441"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.genBettery))])]) : e._e(), n("view", {
      staticClass: ["flex-row", "mainTitle-item"]
    }, [n("u-text", {
      staticClass: ["text-sm"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u8bbe\u5907\u4fe1\u53f7\uff1a")]), n("u-text", {
      staticClass: ["text-sm"],
      staticStyle: {
        color: "#4fd4a0"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.WLSignal))])]), n("view", {
      staticClass: ["flex-row", "mainTitle-item"],
      staticStyle: {
        border: "none"
      }
    }, [n("u-text", {
      staticClass: ["text-sm"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u536b\u661f\u4fe1\u53f7\uff1a")]), n("u-text", {
      staticClass: ["text-sm"],
      staticStyle: {
        color: "#4fd4a0"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.GNSSCount))])])])]), e.terminalFuncShow(1825) ? n("u-image", {
      staticClass: ["m-t-xl"],
      staticStyle: {
        width: "686rpx",
        height: "128rpx"
      },
      attrs: {
        src: e.cdn + "/draw/qzwl-addValue.png"
      },
      on: {
        click: function (t) {
          e.gridItemTaped({
            key: "value-added"
          });
        }
      }
    }) : e._e(), n("view", {
      staticClass: ["m-t-xl", "flex-row", "flex-wrap"],
      staticStyle: {
        marginLeft: "4rpx"
      }
    }, e._l(e.currentFuncList, function (t, a) {
      return n("view", {
        key: a
      }, [n("view", {
        staticClass: ["grid"],
        style: {
          marginRight: (a + 1) % 4 == 0 ? "" : "36rpx",
          marginTop: a > 3 ? "36rpx" : ""
        }
      }, [n("view", {
        staticClass: ["grid-item"],
        on: {
          click: function (n) {
            e.gridItemTaped(t, t);
          }
        }
      }, [n("u-icon", {
        attrs: {
          name: t.icon,
          size: t.iconSize
        }
      }), n("u-text", {
        staticClass: ["text-title", "text", "m-t-sm"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(e.l(t.title)))])], 1)])]);
    }), 0), e.emptyShow ? n("u-empty", {
      attrs: {
        text: e.l("device.select"),
        icon: e.cdn + "/draw/qzwl-empty.png"
      }
    }) : e._e()], 1), n("qzwlShare", {
      ref: "qzwlShare",
      on: {
        setShareMp: e.setShareMp
      }
    }), n("u-popup", {
      staticStyle: {
        position: "absolute"
      },
      attrs: {
        show: e.funcPopupShow,
        round: "15",
        closeable: !0,
        mode: "bottom",
        closeOnClickOverlay: !0
      },
      on: {
        close: function (t) {
          e.funcPopupShow = !1;
        }
      }
    }, [e.funcPopupShow ? n("directivePopup", {
      attrs: {
        popupType: e.popupType,
        directive: e.directive,
        describe: e.describe,
        param: e.param
      }
    }) : e._e()], 1), e.vipPopupShow ? n("payPopup", {
      attrs: {
        message: e.vipPopupData,
        url: e.vipPopupUrl
      },
      on: {
        closeVipPopup: e.closeVipPopup
      }
    }) : e._e()], 1)]);
  }, i = [];
})(module, exports, __r);
