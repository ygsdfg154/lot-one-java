// webpack 模块 746  [nvue]
// 出现于: pages/my/my.js
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
    uAvatar: require("uview-ui/components/u-avatar/u-avatar.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uSwitch: require("uview-ui/components/u-switch/u-switch.vue").default
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
      staticClass: ["page"]
    }, [n("view", {
      staticClass: ["header-page"],
      style: {
        paddingTop: e.paddingTop
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center", "justify-between", "p-xl"],
      on: {
        click: e.gotoAppRevise
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-avatar", {
      attrs: {
        src: e.src,
        size: "96rpx"
      }
    }), e.isAuthenticated ? n("view", {
      staticClass: ["m-l-sm", "flex-col"]
    }, [n("u-text", {
      staticClass: ["text-md", "text-title", "text-bold"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.nickAccount))]), n("u-text", {
      staticClass: ["text", "text-title"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.accountNum))])]) : n("view", {
      staticClass: ["m-l-sm", "flex-col"]
    }, [n("u-text", {
      staticClass: ["text-md", "text-title", "text-bold"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u672a\u767b\u5f55")])])], 1), 3 != e.userType ? n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#ccc",
        size: "32rpx"
      }
    }) : e._e()], 1)]), n("view", {
      staticClass: ["p-h-xl"]
    }, [n("view", {
      staticClass: ["br-xl", "m-t-lg", "bg-white", "p", "p-r-lg"]
    }, [e.isDevMode ? n("view", {
      staticClass: ["main-item", "flex-row", "justify-between", "p-v-md"],
      on: {
        click: function (t) {
          e.gotoPage("/pagesMore/my/developers/developers", !0);
        }
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-add-device@2x.png",
        color: "#ccc",
        size: "48rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "m-l"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5f00\u53d1\u8005\u6a21\u5f0f")])], 1), n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#ccc",
        size: "32rpx"
      }
    })], 1) : e._e(), 2 == e.userType ? n("view", {
      staticClass: ["main-item", "flex-row", "justify-between", "p-v-md"],
      on: {
        click: function (t) {
          e.gotoPage("/pagesFunc/terminal/list/index?bind=" + !0);
        }
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-add-device@2x.png",
        color: "#ccc",
        size: "60rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "m-l"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u6dfb\u52a0\u8bbe\u5907")])], 1), n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#ccc",
        size: "32rpx"
      }
    })], 1) : e._e(), n("view", {
      staticClass: ["main-item", "flex-row", "justify-between", "p-v-md"],
      on: {
        click: function (t) {
          e.gotoPage("/pagesCore/account/account-safety");
        }
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-use-account@2x.png",
        color: "#ccc",
        size: "60rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "m-l"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("mine.setup.account.safety")))])], 1), n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#ccc",
        size: "32rpx"
      }
    })], 1), e._e(), e._e(), n("view", {
      staticClass: ["main-item", "flex-row", "justify-between", "items-center", "p-v-md"]
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-use-updata@2x.png",
        color: "#ccc",
        size: "60rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "m-l"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("mine.setup.update")))])], 1), n("u-switch", {
      attrs: {
        slot: "value",
        value: e.autoCheckUpdate
      },
      on: {
        change: e.changeAutoCheckUpdate
      },
      slot: "value"
    })], 1), e.isAuditMode || 1 == e.userType ? e._e() : n("view", {
      staticClass: ["main-item", "flex-row", "justify-between", "p-v-md"],
      on: {
        click: function (t) {
          e.gotoPage("/pagesPay/list/indent");
        }
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-use-ord@2x.png",
        color: "#ccc",
        size: "60rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "m-l"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("mine.pay.orders")))])], 1), n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#ccc",
        size: "32rpx"
      }
    })], 1), n("view", {
      staticClass: ["main-item", "flex-row", "justify-between", "p-v-md"],
      on: {
        click: function (t) {
          e.gotoPage("/pagesFunc/terminal/remote-setup/list");
        }
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-use-setList@2x.png",
        color: "#ccc",
        size: "60rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "m-l"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u64cd\u4f5c\u8bb0\u5f55")])], 1), n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#ccc",
        size: "32rpx"
      }
    })], 1), e.showService ? n("view", {
      staticClass: ["main-item", "flex-row", "justify-between", "p-v-md"],
      on: {
        click: e.contactService
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-use-kf@2x.png",
        color: "#ccc",
        size: "60rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "m-l"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("mine.custome.us")))])], 1), n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#ccc",
        size: "32rpx"
      }
    })], 1) : e._e(), n("view", {
      staticClass: ["main-item", "flex-row", "justify-between", "p-v-md"],
      on: {
        click: function (t) {
          e.gotoPage("/pagesMore/my/setups/as", !0);
        }
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-use-as@2x.png",
        color: "#ccc",
        size: "60rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "m-l"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("mine.setup.about")))])], 1), n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#ccc",
        size: "32rpx"
      }
    })], 1)]), n("view", {
      staticClass: ["br-xl", "m-t", "bg-white", "p-h-xl"]
    }), e.isAuthenticated ? n("view", {
      staticClass: ["br-xl", "bg-white", "m-t-xl", "flex-row", "justify-center", "items-center"],
      staticStyle: {
        height: "88rpx"
      },
      on: {
        click: e.signOut
      }
    }, [n("u-text", {
      staticClass: ["text-md"],
      staticStyle: {
        color: "#5f80c7"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.not.signin")))])]) : n("view", {
      staticClass: ["br-xl", "bg-white", "m-t-xl", "flex-row", "justify-center", "items-center"],
      staticStyle: {
        height: "88rpx"
      },
      on: {
        click: e.gotoPageLogin
      }
    }, [n("u-text", {
      staticClass: ["text-md"],
      staticStyle: {
        color: "#ff0009"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u53bb\u767b\u5f55")])])])])]);
  }, i = [];
})(module, exports, __r);
