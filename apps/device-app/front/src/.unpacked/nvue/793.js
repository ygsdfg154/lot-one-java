// webpack 模块 793  [nvue]
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
    uPopup: require("uview-ui/components/u-popup/u-popup.vue").default,
    uButton: require("uview-ui/components/u-button/u-button.vue").default
  }, a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {}, [n("u-popup", {
      attrs: {
        show: e.activationState > 1,
        round: 10,
        safeAreaInsetBottom: !1,
        overlayStyle: e.overlayStyle
      }
    }, [n("view", {
      staticClass: ["main"],
      style: e.mainTop
    }, [n("view", {
      staticClass: ["flex-row", "justify-center", "items-center", "p-v-lg", "m-t"]
    }, [e.valueAddedConfig ? n("u-text", {
      staticClass: ["text-bold", "text-lx"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.valueAddedConfig.title))]) : n("u-text", {
      staticClass: ["text-bold", "text-lx"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u6e29\u99a8\u63d0\u793a")])]), n("view", {
      staticClass: ["p-h-xl"],
      staticStyle: {
        marginBottom: "100rpx"
      }
    }, [n("u-text", {
      staticClass: ["text-bold", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u60a8\u7684\u8bbe\u5907\u5f85\u6fc0\u6d3b\u3002")]), n("u-text", {
      staticClass: ["text-bold", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u6fc0\u6d3b\u540e\u60a8\u5c06\u83b7\u5f97\u6700\u4f73\u670d\u52a1:")]), e.valueAddedConfig ? n("u-text", {
      staticClass: ["m-t-xl", "text", "text-gray"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.valueAddedConfig.description))]) : n("u-text", {
      staticClass: ["m-t-xl", "text", "text-gray"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("1.\u914d\u9001\u7684SIM\u5361\u6fc0\u6d3b\u30010\u6708\u79df\u3001\u514d\u8d39\u4f7f\u7528\u3002\n2.\u83b7\u5f971\u5e74\u81f3\u7ec8\u8eab\u7684\u5b9a\u4f4d\u6d41\u91cf\u3002\n3.\u5957\u9910\u65f6\u9650\u5185\u514d\u8d39\u5b9e\u65f6\u5b9a\u4f4d\u3002\n4.\u5957\u9910\u65f6\u9650\u5185\u4e91\u7aef\u5386\u53f2\u8f68\u8ff9\u50a8\u5b58\u3002\n5.\u514d\u8d39\u4f7f\u7528\u5f02\u54cd\u9632\u76d7\u670d\u52a1\u3002\n6.\u5f02\u54cd\u62a5\u8b66\u5faa\u73af\u50a8\u5b58100\u5929\u3002\n7.\u8d60\u9001\u589e\u503c\u670d\u52a1\u77ed\u4fe1\u9884\u8b6610\u6761\u3002\n8.\u8d60\u9001\u7535\u8bdd\u9884\u8b665\u6b21\u3002\n9.7x10h\u8fdc\u7a0b\u6280\u672f\u652f\u6301\u670d\u52a1\u3002\n10.\u4f53\u9a8c\u66f4\u591aAPP\u521b\u65b0\u670d\u52a1\u3002")])]), 3 == e.activationState ? n("view", {
      staticClass: ["flex-row"]
    }, [n("view", {
      staticClass: ["flex-row", "justify-center", "p-v-lg", "b-right"],
      staticStyle: {
        width: "300rpx"
      },
      on: {
        click: e.tryOut
      }
    }, [n("u-text", {
      staticClass: ["text", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u8bd5\u7528\u4e00\u4e0b")])]), n("view", {
      staticClass: ["flex-row", "justify-center", "p-v-lg"],
      staticStyle: {
        width: "300rpx"
      },
      on: {
        click: e.gotoMp
      }
    }, [n("u-text", {
      staticClass: ["text", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u524d\u5f80\u6fc0\u6d3b")])])]) : e._e(), 2 == e.activationState ? n("view", {
      staticClass: ["flex-row", "justify-between", "p-h-xll", "m-b-xl"]
    }, [n("view", {
      staticStyle: {
        width: "240rpx",
        height: "65rpx"
      }
    }, [n("u-button", {
      staticStyle: {
        height: "65rpx"
      },
      attrs: {
        shape: "circle",
        plain: !0,
        icon: "close-circle",
        color: "#444",
        text: "\u9000\u51fa"
      },
      on: {
        click: e.closeActivatePopup
      }
    })], 1), n("view", {
      staticStyle: {
        width: "240rpx",
        height: "65rpx"
      }
    }, [n("u-button", {
      staticStyle: {
        height: "65rpx"
      },
      attrs: {
        type: "primary",
        icon: "checkmark-circle",
        text: "\u524d\u5f80\u6fc0\u6d3b"
      },
      on: {
        click: e.gotoMp
      }
    })], 1)]) : e._e()])])], 1);
  }, i = [];
})(module, exports, __r);
