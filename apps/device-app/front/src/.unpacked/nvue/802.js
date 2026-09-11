// webpack 模块 802  [nvue]
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
    uPopup: require("uview-ui/components/u-popup/u-popup.vue").default,
    "u-Input": require("uview-ui/components/u--input/u--input.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uButton: require("uview-ui/components/u-button/u-button.vue").default
  }, i = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {}, [n("u-popup", {
      attrs: {
        show: e.isBind,
        closeable: !0,
        mode: "bottom",
        round: "15",
        closeOnClickOverlay: !0
      },
      on: {
        close: e.closeSubmit
      }
    }, [n("view", [n("view", {
      staticClass: ["flex-row", "justify-center", "m-v-lg"],
      on: {
        click: e.popupClick
      }
    }, [n("u-text", {
      staticClass: ["text-title", "text-lx"],
      staticStyle: {
        fontWeight: "500"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("mine.bind.terminal.submit")))])]), n("view", {
      staticStyle: {
        margin: "40rpx 32rpx 48rpx 32rpx"
      }
    }, [n("view", {
      staticClass: ["flex-row", "justify-between", "items-center", "b-bottom", "p-b-xl"]
    }, [n("u-text", {
      staticClass: ["text-title", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("add-device.deviceNo")))]), n("view", {
      staticStyle: {
        width: "530rpx"
      }
    }, [n("u--input", {
      attrs: {
        maxlength: "15",
        placeholder: e.l("bind-device.please-SN"),
        border: "none"
      },
      model: {
        value: e.deviceInfo.name,
        callback: function (t) {
          e.$set(e.deviceInfo, "name", t);
        },
        expression: "deviceInfo.name"
      }
    }, [e.isAuditModeAndroid ? e._e() : n("template", {
      slot: "suffix"
    }, [n("u-icon", {
      attrs: {
        name: "scan",
        color: "#6081C7",
        size: "48rpx"
      },
      on: {
        click: e.scanCode
      }
    })], 1)], 2)], 1)]), n("view", {
      staticClass: ["flex-row", "justify-between", "items-center", "b-bottom", "p-v-xl"]
    }, [n("u-text", {
      staticClass: ["text-title", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("bind-device.pwd")))]), n("view", {
      staticStyle: {
        width: "530rpx"
      }
    }, [n("u--input", {
      attrs: {
        maxlength: "15",
        placeholder: e.l("bind-device.please-pwd"),
        border: "none"
      },
      model: {
        value: e.deviceInfo.password,
        callback: function (t) {
          e.$set(e.deviceInfo, "password", t);
        },
        expression: "deviceInfo.password"
      }
    })], 1)]), n("view", {
      staticStyle: {
        backgroundColor: "red",
        marginTop: "49rpx"
      }
    }, [n("u-button", {
      attrs: {
        size: "normal",
        text: e.l("mine.bind.submit"),
        type: "primary"
      },
      on: {
        click: e.submit
      }
    })], 1), n("view", {
      staticClass: ["flex-col", "flex-wrap", "p-t-xl"]
    }, [n("u-text", {
      staticClass: ["text", "text-bold"],
      staticStyle: {
        color: "#f56c6b"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("mine.bind.terminal.submit.prompt")) + ":")]), n("u-text", {
      staticClass: ["text-sm"],
      staticStyle: {
        wordBreak: "break-all"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("bind-device.tip10")))])])])])])], 1);
  }, r = [];
})(module, exports, __r);
