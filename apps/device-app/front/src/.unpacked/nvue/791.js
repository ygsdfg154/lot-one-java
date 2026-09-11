// webpack 模块 791  [nvue]
// 出现于: pages/msg/index.js
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
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uButton: require("uview-ui/components/u-button/u-button.vue").default,
    uPopup: require("uview-ui/components/u-popup/u-popup.vue").default,
    uLoadmore: require("uview-ui/components/u-loadmore/u-loadmore.vue").default,
    uEmpty: require("uview-ui/components/u-empty/u-empty.vue").default
  }, a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      style: {
        marginBottom: e.deleteShow ? "110rpx" : ""
      }
    }, [e._l(e.alarmList, function (t, r) {
      return n("view", {
        key: r,
        staticClass: ["list", "m-t"]
      }, [n("view", {
        staticClass: ["flex-row", "items-center"]
      }, [e.deleteShow ? n("view", {
        staticClass: ["m-r-md", "m-t"]
      }, [t.isShowDelete ? n("u-icon", {
        attrs: {
          name: e.cdn + "/ikon/qzwl-yse-strat.png",
          size: "38rpx"
        }
      }) : e._e(), t.isShowDelete ? e._e() : n("u-icon", {
        attrs: {
          name: e.cdn + "/ikon/qzwl-msg-no-delete.png",
          size: "38rpx"
        }
      })], 1) : e._e(), n("view", {
        staticClass: ["p-lg", "br-xl", "bg-white", "flex-col", "flex-1"]
      }, [n("view", {
        staticClass: ["p-b", "b-bottom", "flex-row", "items-center", "justify-between"]
      }, [n("view", {
        staticClass: ["flex-row", "items-center"],
        on: {
          click: function (n) {
            e.gotoAlarmDetail(t);
          }
        }
      }, [n("u-icon", {
        attrs: {
          name: e.cdn + "/ikon/qzwl-msg-notice@2x.png",
          size: "48rpx"
        }
      }), n("u-text", {
        staticClass: ["text-md", "m-l"],
        staticStyle: {
          color: "#fa8d0c"
        },
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t.alarmTypeName))])], 1), n("u-icon", {
        attrs: {
          name: e.cdn + "/ikon/qzwl-msg-trash.png",
          size: "36rpx"
        },
        on: {
          click: function (n) {
            e.itemDeleteChange(t);
          }
        }
      })], 1), n("view", {
        staticClass: ["flex-col"]
      }, [n("view", {
        staticClass: ["flex-col"],
        on: {
          click: function (n) {
            e.gotoAlarmDetail(t);
          }
        }
      }, [n("u-text", {
        staticClass: ["text-m", "m-t"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(e.l("info.terminal.name")) + "\uff1a" + e._s(t.terminalName || "-"))]), n("u-text", {
        staticClass: ["text-m", "m-t-mini"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v("\u8bbe\u5907\u53f7\uff1a" + e._s(t.terminalNo || "-"))]), n("u-text", {
        staticClass: ["text-m", "m-t-mini"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v("\u544a\u8b66\u65f6\u95f4\uff1a" + e._s(t.beginTime))])]), n("view", {
        staticClass: ["flex-row", "items-center", "m-t-mini"]
      }, [n("u-text", {
        staticClass: ["text-m"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v("\u544a\u8b66\u5730\u70b9\uff1a")]), t.address ? n("u-text", {
        staticClass: ["text-m"],
        staticStyle: {
          width: "500rpx"
        },
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t.address))]) : n("u-text", {
        staticClass: ["text-m"],
        staticStyle: {
          color: "#6081c7"
        },
        appendAsTree: !0,
        attrs: {
          append: "tree"
        },
        on: {
          click: function (n) {
            e.getItemAddress(t);
          }
        }
      }, [e._v(e._s(t.beginLngWGS84 + "," + t.beginLatWGS84))])])])])])]);
    }), e.deleteShow ? n("view", {
      staticClass: ["foot-delete"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-between", "items-center"]
    }, [n("view", {
      staticClass: ["flex-row", "items-center"],
      on: {
        click: e.setShowAllDeleteList
      }
    }, [n("u-text", {
      staticClass: ["text", "m-r-sm"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5168\u9009")]), e.isShowAllDelete ? n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-yse-strat.png",
        size: "38rpx"
      }
    }) : e._e(), e.isShowAllDelete ? e._e() : n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-msg-no-delete.png",
        size: "38rpx"
      }
    })], 1), n("view", {
      staticClass: ["flex-row"]
    }, [n("view", {
      staticClass: ["m-l"]
    }, [n("u-button", {
      staticClass: ["foot-delete-but"],
      attrs: {
        type: "primary",
        plain: !0,
        size: "mini",
        text: "\u5168\u90e8\u6e05\u7a7a"
      },
      on: {
        click: e.allDeleteMsg
      }
    })], 1), n("view", {
      staticClass: ["m-l"]
    }, [n("u-button", {
      staticClass: ["foot-delete-but"],
      attrs: {
        type: "error",
        plain: !0,
        size: "mini",
        text: e.l("common.delete.but")
      },
      on: {
        click: e.deleteMsg
      }
    })], 1)])])]) : e._e(), n("u-popup", {
      attrs: {
        show: e.filterShow,
        round: 15,
        mode: "right"
      },
      on: {
        close: e.filterClose
      }
    }, [n("TerminalFilter", {
      attrs: {
        filterData: e.filterData
      },
      on: {
        fetchData: e.fetchData,
        filterClose: e.filterClose
      }
    })], 1), e.alarmList.length ? n("u-loadmore", {
      attrs: {
        status: e.status,
        line: !0,
        loadmoreText: e.l("common.load.more"),
        loadingText: e.l("common.loading"),
        nomoreText: e.l("common.no.more")
      }
    }) : e._e(), e.alarmList.length ? e._e() : n("u-empty", {
      attrs: {
        text: e.l("common.no.more"),
        icon: e.cdn + "/draw/qzwl-empty.png"
      }
    })], 2);
  }, i = [];
})(module, exports, __r);
