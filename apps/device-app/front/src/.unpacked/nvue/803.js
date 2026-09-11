// webpack 模块 803  [nvue]
// 出现于: pagesFunc/terminal/list/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return i;
  }), n.d(t, "c", function () {
    return r;
  }), n.d(t, "a", function () {
    return a;
  }));
  var a = {
    uTabs: require("uview-ui/components/u-tabs/u-tabs.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uBadge: require("uview-ui/components/u-badge/u-badge.vue").default,
    uLoadmore: require("uview-ui/components/u-loadmore/u-loadmore.vue").default,
    uEmpty: require("uview-ui/components/u-empty/u-empty.vue").default
  }, i = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {}, [n("view", [n("view", {
      staticClass: ["p-h-xl", "p-b-sm", "flex-row", "justify-center", "bg-white"]
    }, [n("u-tabs", {
      attrs: {
        list: e.deviceStateTab,
        lineWidth: "40",
        current: e.deviceCurrent,
        lineColor: e.primaryColor,
        inactiveStyle: e.inactiveStyle,
        activeStyle: e.tabsStyle,
        itemStyle: "width: 180rpx; height: 80rpx"
      },
      on: {
        click: e.deviceStateChange
      }
    })], 1)]), n("view", {
      staticClass: ["ter-list"]
    }, e._l(e.terminals, function (t, a) {
      return n("view", {
        key: a,
        staticClass: ["ter-list-item", "bg-white"],
        class: t.terminalNo == e.terminalKey ? "b-list-primary" : "",
        on: {
          click: function (n) {
            e.selectTerminal(t);
          }
        }
      }, [n("view", {
        staticStyle: {
          marginLeft: "16rpx"
        }
      }, [n("u-icon", {
        attrs: {
          name: e.cdn + "/ikon/device/list-" + e.setIconCode(t.iconType, e.appConfig.icons) + "-" + t.deviceState + ".png",
          size: "80rpx"
        }
      })], 1), n("view", {
        staticClass: ["ter-list-item-content"]
      }, [n("view", {
        staticClass: ["flex-row", "justify-between"]
      }, [n("view", {
        staticClass: ["ter-list-item-header"]
      }, [n("u-text", {
        staticClass: ["text-md", "text-title", "text-bold"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t.terminalName || t.terminalNo))]), n("u-badge", {
        staticClass: ["m-l-mini"],
        attrs: {
          type: e.badgeState(t.status),
          value: e.l(t.status)
        }
      })], 1)]), n("view", {
        staticClass: ["flex-row", "justify-between", "items-end"]
      }, [n("view", {
        staticClass: ["flex-col"]
      }, [n("u-text", {
        staticClass: ["list-item-desc", "text", "text-desc"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(e.l("device.terminal.no") + "\uff1a" + t.terminalNo))]), n("u-text", {
        staticClass: ["ter-list-item-desc", "text", "text-desc"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(e.l("device.terminal.model") + "\uff1a" + t.terminalTypeDisplayName))])]), 3 != e.userType ? n("view", {
        staticClass: ["flex-col", "justify-center"],
        on: {
          click: function (n) {
            e.showMore(t);
          }
        }
      }, [n("u-icon", {
        attrs: {
          name: "more-dot-fill",
          size: "40rpx",
          stop: !0
        },
        on: {
          click: function (n) {
            e.showMore(t);
          }
        }
      })], 1) : e._e()])]), t.terminalNo == e.terminalKey ? n("view", {
        staticClass: ["flex-row", "bg-primary", "selectedText"]
      }, [n("u-text", {
        staticClass: ["text", "text-white"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v("\u5f53\u524d\u9009\u4e2d")])]) : e._e()]);
    }), 0), e.terminals.length ? n("u-loadmore", {
      attrs: {
        status: e.terminalLoadStatus,
        line: !0,
        loadmoreText: e.l("common.load.more"),
        loadingText: e.l("common.loading"),
        nomoreText: e.l("common.no.more")
      }
    }) : e._e(), e.terminals.length ? e._e() : n("u-empty", {
      attrs: {
        text: e.l("common.no.more"),
        icon: e.cdn + "/draw/qzwl-empty.png"
      }
    })], 1);
  }, r = [];
})(module, exports, __r);
