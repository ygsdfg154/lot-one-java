// webpack 模块 779  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/wx.js
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
      staticClass: ["page", "flex-1", "h100", "b-top"]
    }, [e.bindedShow ? n("view", {
      staticClass: ["wechatTop", "flex-col", "justify-center", "items-center"]
    }, [n("u-image", {
      staticClass: ["wechatTop-logoImg", "br-md"],
      attrs: {
        src: e.wechatImgurl
      }
    }), n("u-text", {
      staticClass: ["text-bold", "m-t-md"],
      staticStyle: {
        fontSize: "40rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.wechatName))]), n("u-text", {
      staticClass: ["text-gray", "m-t-lg", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.wx-bind")))]), n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("view", {
      staticClass: ["m-t-lg", "m-r"],
      staticStyle: {
        width: "152rpx"
      }
    }, [n("u-button", {
      staticStyle: {
        height: "56rpx"
      },
      attrs: {
        text: e.l("tel-pay.wx-unbind"),
        type: "primary"
      },
      on: {
        click: e.confirmBind
      }
    })], 1), e.isAuditMode ? e._e() : n("view", {
      staticClass: ["m-t-lg"],
      staticStyle: {
        width: "152rpx"
      }
    }, [n("u-button", {
      staticStyle: {
        height: "56rpx"
      },
      attrs: {
        text: e.l("device.pay"),
        type: "primary"
      },
      on: {
        click: e.payWxAlarm
      }
    })], 1)])], 1) : e._e(), n("view", {
      staticClass: ["content", "flex-col", "justify-center", "items-center"]
    }, [n("u-image", {
      staticClass: ["content-logoImg"],
      attrs: {
        src: e.cdn + "/draw/qzwl-logo.png"
      }
    }), n("u-text", {
      staticClass: ["text-bold", "m-t-md"],
      staticStyle: {
        fontSize: "40rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.wx-name")))]), e.bindedShow ? n("u-text", {
      staticClass: ["text-gray", "m-t-lg", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.wx-tencent")))]) : e._e(), n("u-text", {
      staticClass: ["text-gray", "m-t-lg", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.wx-tencent-push")))])], 1)])]);
  }, i = [];
})(module, exports, __r);
