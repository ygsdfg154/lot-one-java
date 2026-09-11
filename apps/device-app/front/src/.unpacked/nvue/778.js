// webpack 模块 778  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/wx-mp.js
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
    uButton: require("uview-ui/components/u-button/u-button.vue").default
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
      staticClass: ["flex-1", "bg-white", "b-top"]
    }, [n("view", {
      staticClass: ["p-lg"]
    }, [n("view", {
      staticClass: ["flex-col"]
    }, [n("u-text", {
      staticClass: ["m-b", "text-lg", "text-bold"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.wechat-mp")))]), n("u-text", {
      staticClass: ["text-md", "text-gray"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.wechat-mp.attention")))])]), n("view", {
      staticClass: ["page"]
    }, [n("view", {
      staticClass: ["flex-col", "justify-center"]
    }, [n("u-image", {
      staticClass: ["br-md"],
      style: {
        width: "150rpx",
        height: "150rpx"
      },
      attrs: {
        src: e.cdn + "/draw/qzwl-logo.png"
      }
    }), n("u-text", {
      staticClass: ["m-l", "text-bold", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.wx-name")))])], 1), n("view", {
      staticClass: ["page-main", "p-lg", "m-t-lg", "flex-col"]
    }, [n("u-text", {
      staticClass: ["text-bold", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.wx-mp.public")) + "\uff1f")]), n("u-text", {
      staticClass: ["text-gray", "m-t-lg", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.wx-mp.method1")))]), n("u-text", {
      staticClass: ["text-link", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: function (t) {
          e.copy(e.l("tel-pay.wx-name"));
        }
      }
    }, [e._v(e._s(e.l("tel-pay.wx-mp.method1-text")))]), n("u-text", {
      staticClass: ["text-gray", "m-t-lg", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.wx-mp.method2")))]), n("u-text", {
      staticClass: ["text-link", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: e.saveQRCode
      }
    }, [e._v(e._s(e.l("tel-pay.wx-mp.method2-text")))]), n("u-image", {
      staticClass: ["m-t-sm"],
      style: {
        width: "200rpx",
        height: "200rpx"
      },
      attrs: {
        src: e.cdn + "/draw/qzwl-qrCode.png"
      },
      on: {
        click: e.preview
      }
    })], 1), n("view", {
      staticClass: ["bottom-bar"]
    }, [n("u-button", {
      attrs: {
        type: "primary",
        text: e.l("tel-pay.wx-mp.success")
      },
      on: {
        click: e.wechatChange
      }
    })], 1)])])])]);
  }, i = [];
})(module, exports, __r);
