// webpack 模块 800  [nvue]
// 出现于: pagesPay/value-added/index.js
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
    uLineProgress: require("uview-ui/components/u-line-progress/u-line-progress.vue").default
  }, i = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["box"],
      staticStyle: {
        height: "180rpx"
      }
    }, [n("view", {
      staticClass: ["flex-row", "justify-between", "items-center"]
    }, [n("u-text", {
      staticClass: ["text-bold", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5f53\u524d\u5957\u9910")]), e.vipTime ? e._e() : n("view", {
      staticClass: ["flex-row"]
    }, [e.totalText ? n("u-text", {
      staticClass: ["text", "text-grey"],
      style: {
        color: e.selectedTypeItem.color
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u4e0d\u9650\u91cf\u5957\u9910")]) : n("view", {
      staticClass: ["flex-row"]
    }, [n("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5269\u4f59")]), n("u-text", {
      staticClass: ["text"],
      style: {
        color: e.selectedTypeItem.color
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.remain) + e._s(1 == e.selectedTypeItem.id ? "\u5206\u949f" : "\u6761"))]), n("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("/\u5171" + e._s(e.minTotal) + e._s(1 == e.selectedTypeItem.id ? "\u5206\u949f" : "\u6761"))])])])]), e.vipTime ? n("view", {
      staticClass: ["flex-col", "m-t"]
    }, [1 == e.selectedTypeItem.id ? n("view", {
      staticClass: ["flex-row"]
    }, [n("u-text", {
      staticClass: ["text"],
      staticStyle: {
        color: "#999"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u65e0\u9650\u58f0\u97f3\u5b89\u9632\u5957\u9910\u6709\u6548\u671f\u5185\u58f0\u97f3\u5b89\u9632\u4e0d\u9650\u5206\u949f")])]) : e._e(), 2 == e.selectedTypeItem.id ? n("view", {
      staticClass: ["flex-row"]
    }, [n("u-text", {
      staticClass: ["text", "text-grey"],
      style: {
        color: e.selectedTypeItem.color
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.noMoney ? "180\u5929" : "90\u5929"))]), n("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5185\u8f68\u8ff9\u6570\u636e/")]), n("u-text", {
      staticClass: ["text", "text-grey"],
      style: {
        color: e.selectedTypeItem.color
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.noMoney ? "10s" : "30s"))]), n("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u4e0a\u4f20\u95f4\u9694")])]) : e._e(), 4 == e.selectedTypeItem.id ? n("view", {
      staticClass: ["flex-row"]
    }, [n("u-text", {
      staticClass: ["text"],
      staticStyle: {
        color: "#999"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5b9a\u4f4d\u5206\u4eab\u5957\u9910\u6709\u6548\u671f\u5185\u4e0d\u9650\u5236\u5206\u4eab\u6b21\u6570")])]) : e._e(), n("u-text", {
      staticClass: ["text", "text-grey"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u8fc7\u671f\u65f6\u95f4\uff1a" + e._s(e.vipTime))])]) : n("view", {
      staticClass: ["m-t-xl"]
    }, [n("u-line-progress", {
      attrs: {
        percentage: e.setProgress(e.remain, e.minTotal),
        activeColor: e.selectedTypeItem.color,
        inactiveColor: "#f5f5f5"
      }
    })], 1)]);
  }, r = [];
})(module, exports, __r);
