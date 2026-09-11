// webpack 模块 748  [nvue]
// 出现于: pagesMore/notice/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, a) {
  "use strict";
  (a.d(t, "b", function () {
    return n;
  }), a.d(t, "c", function () {
    return r;
  }), a.d(t, "a", function () {}));
  var n = function () {
    var e = this, t = e.$createElement, a = e._self._c || t;
    return a("scroll-view", {
      staticStyle: {
        flexDirection: "column"
      },
      attrs: {
        scrollY: !0,
        showScrollbar: !0,
        enableBackToTop: !0,
        bubble: "true"
      }
    }, [a("view", {
      staticClass: ["flex-1", "bg-white"]
    }, [e.noticeInfo ? a("view", {
      staticClass: ["b-top1"]
    }, [a("view", {
      staticClass: ["flex-col", "justify-center"],
      staticStyle: {
        padding: "24rpx 36rpx 20rpx 36rpx"
      }
    }, [a("u-text", {
      staticClass: ["text-lg", "text-bold"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.noticeInfo.title))]), a("u-text", {
      staticClass: ["text-sm", "text-grey", "m-t-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.noticeInfo.createTime))]), a("u-text", {
      staticClass: ["text-sm", "text-grey", "m-t-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u53d1\u5e03\u5355\u4f4d\uff1a" + e._s(e.noticeInfo.tenantName))])]), a("view", {
      staticClass: ["flex-col", "p-t-lg", "p-b-xl", "m-h-lg", "b-top1"]
    }, [a("view", {
      staticClass: ["p-h-sm"]
    }, [a("u-text", {
      staticClass: ["text", "m-t-base"],
      staticStyle: {
        width: "670rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.noticeInfo.description))])])])]) : e._e()])]);
  }, r = [];
})(module, exports, __r);
