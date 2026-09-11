// webpack 模块 763  [nvue]
// 出现于: pagesFunc/deviceInfo/set-icon.js
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
      staticClass: ["container"]
    }, [e.appIcons.length ? n("view", {
      staticClass: ["bg-white"],
      staticStyle: {
        padding: "0 32rpx 0 44rpx"
      }
    }, e._l(e.appIcons, function (t) {
      return n("view", {
        key: t.id,
        staticClass: ["flex-row", "items-center", "p-t-lg", "p-b-mini", "justify-between"],
        style: {
          borderBottom: "1rpx solid #ECECEC"
        },
        on: {
          click: function (n) {
            e.setTerminalIcon(t);
          }
        }
      }, [n("view", {
        staticClass: ["flex-row", "items-center"]
      }, [n("u-icon", {
        attrs: {
          name: e.cdn + "/ikon/device/" + t.code + "-1.png",
          size: "65rpx"
        }
      }), n("u-text", {
        staticClass: ["m-l-lg", "text-gray", "text"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t.name))])], 1), n("u-icon", {
        attrs: {
          size: "16",
          color: e.currentIconType == t.iconType ? "#6081C7" : "",
          name: e.currentIconType == t.iconType ? "checkmark-circle-fill" : e.cdn + "/ikon/qzwl-msg-no-delete.png"
        }
      })], 1);
    }), 0) : e._e(), n("view", {
      staticClass: ["bottom-bar"]
    }, [n("u-button", {
      attrs: {
        type: "primary",
        text: e.l("mine.setup.save")
      },
      on: {
        click: e.putDeviceIcon
      }
    })], 1)])]);
  }, i = [];
})(module, exports, __r);
