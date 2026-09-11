// webpack 模块 345  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pagesFunc/terminal/locate-mode/index.js
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
    uPopup: require("uview-ui/components/u-popup/u-popup.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {}, [n("u-popup", {
      attrs: {
        show: !0,
        mode: "center",
        safeAreaInsetBottom: !1
      }
    }, [n("view", {
      staticClass: ["main"],
      style: e.mainTop
    }, [n("view", {
      staticClass: ["content-background"]
    }, ["iccid" == e.type ? n("u-image", {
      staticClass: ["titleImage1"],
      attrs: {
        src: e.cdn + "/draw/qzwlVipImageSim.png"
      }
    }) : n("u-image", {
      staticClass: ["titleImage1"],
      attrs: {
        src: e.cdn + "/draw/qzwlVipImage.png"
      }
    })], 1), e.message ? n("view", {
      staticStyle: {
        padding: "0 68rpx 0 70rpx"
      }
    }, [n("view", {
      staticClass: ["flex-col", "justify-center", "items-center"]
    }, [n("u-text", {
      staticClass: ["text-lx"],
      staticStyle: {
        color: "#ee4240"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.message.title))])]), n("view", {
      staticClass: ["flex-col", "m-t"]
    }, [n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.message.content))]), e.message.description ? n("u-text", {
      staticClass: ["text"],
      staticStyle: {
        marginTop: "28rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5c06\u4e3a\u60a8\u63d0\u4f9b\u4ee5\u4e0b\u670d\u52a1")]) : e._e(), e.message.description ? n("u-text", {
      staticClass: ["text", "m-t-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.message.description))]) : e._e()])]) : e._e(), n("view", {
      staticClass: ["flex-row", "justify-between"],
      staticStyle: {
        padding: "0 40rpx",
        marginTop: "60rpx"
      }
    }, [n("view", {
      staticClass: ["but1"],
      on: {
        click: function (t) {
          e.gotoPages(!1);
        }
      }
    }, [n("u-text", {
      staticClass: ["text-md", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u4ee5\u540e\u518d\u8bf4")])]), n("view", {
      staticClass: ["but2"],
      on: {
        click: function (t) {
          e.gotoPages(!0);
        }
      }
    }, [n("u-text", {
      staticClass: ["text-md", "text-white"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u524d\u5f80\u8ba2\u8d2d")])])])])])], 1);
  }, i = [];
})(module, exports, __r);
