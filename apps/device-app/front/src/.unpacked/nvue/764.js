// webpack 模块 764  [nvue]
// 出现于: pagesFunc/deviceInfo/index.js
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
    "u-Form": require("uview-ui/components/u--form/u--form.vue").default,
    uFormItem: require("uview-ui/components/u-form-item/u-form-item.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uSwitch: require("uview-ui/components/u-switch/u-switch.vue").default,
    uPopup: require("uview-ui/components/u-popup/u-popup.vue").default,
    "u-Input": require("uview-ui/components/u--input/u--input.vue").default,
    uButton: require("uview-ui/components/u-button/u-button.vue").default
  }, a = function () {
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
      staticClass: ["p-h-xl"]
    }, [n("u--form", {
      attrs: {
        labelPosition: "left",
        labelWidth: "80",
        labelStyle: {
          fontWeight: 500,
          fontSize: "28rpx"
        }
      }
    }, [n("u-form-item", {
      attrs: {
        label: e.l("info.terminal.icon")
      },
      on: {
        click: function (t) {
          e.gotoPages("/pagesFunc/deviceInfo/set-icon?iconType=" + e.terminalIconInfo.iconType);
        }
      }
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      staticStyle: {
        width: "520rpx"
      }
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.terminalIconInfo.iconName))]), n("u-icon", {
      attrs: {
        name: e.terminalIcon,
        size: "80rpx"
      }
    })], 1), n("u-icon", {
      attrs: {
        name: "arrow-right",
        color: "#ccc",
        size: "36rpx"
      }
    })], 1)]), n("u-form-item", {
      attrs: {
        label: e.l("info.terminal.name")
      }
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      staticStyle: {
        width: "520rpx"
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.deviceName || "-"))]), n("view", {
      staticClass: ["but"],
      on: {
        click: function (t) {
          e.terminalNameShow = !0;
        }
      }
    }, [n("u-text", {
      staticClass: ["text-sm", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.edit")))])])])]), n("u-form-item", {
      attrs: {
        label: e.l("device.terminal.no")
      }
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      staticStyle: {
        width: "520rpx"
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.selectedTerminal.terminalNo))]), e.selectedTerminal.terminalNo ? n("view", {
      staticClass: ["but"],
      on: {
        click: function (t) {
          e.copy(e.selectedTerminal.terminalNo);
        }
      }
    }, [n("u-text", {
      staticClass: ["text-sm", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.copy")))])]) : e._e()])]), n("u-form-item", {
      attrs: {
        label: e.l("device.terminal.model")
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.selectedTerminal.terminalTypeDisplayName))])]), n("u-form-item", {
      attrs: {
        label: e.l("info.terminal.state")
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l(e.selectedTerminal.status)))])]), "JS-Q1" != e.selectedTerminal.terminalTypeDisplayName ? n("u-form-item", {
      attrs: {
        label: e.l("self-test.power-state")
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l(e.bStateHangle(e.selectedTerminal.batteryState, e.selectedTerminal.terminalTypeDisplayName))))])]) : e._e(), e.wireless ? n("u-form-item", {
      attrs: {
        label: "ACC"
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l(e.selectedTerminal.acc)))])]) : e._e(), e.selectedTerminal.lon && e.selectedTerminal.lat ? n("u-form-item", {
      attrs: {
        label: e.l("device.location-time")
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.selectedTerminal.locateTime))])]) : n("u-form-item", {
      attrs: {
        label: e.l("device.location-time")
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.no.locate")))])]), n("u-form-item", {
      attrs: {
        label: e.l("common.sim.card")
      }
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      staticStyle: {
        width: "520rpx"
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.selectedTerminal.msisdn || "-"))]), e.selectedTerminal.msisdn ? n("view", {
      staticClass: ["but"],
      on: {
        click: function (t) {
          e.copy(e.selectedTerminal.msisdn);
        }
      }
    }, [n("u-text", {
      staticClass: ["text-sm", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.copy")))])]) : e._e()])]), n("u-form-item", {
      attrs: {
        label: e.l("common.ICCID")
      }
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      staticStyle: {
        width: "520rpx"
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.selectedTerminal.iccid || "-"))]), e.selectedTerminal.iccid ? n("view", {
      staticClass: ["but"],
      on: {
        click: function (t) {
          e.copy(e.selectedTerminal.iccid);
        }
      }
    }, [n("u-text", {
      staticClass: ["text-sm", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.copy")))])]) : e._e()])]), e.selectedTerminal.lon && e.selectedTerminal.lat ? n("u-form-item", {
      attrs: {
        label: e.l("device.locate")
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      staticStyle: {
        width: "520rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.genAddress))])]) : n("u-form-item", {
      attrs: {
        label: e.l("device.locate")
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.no.locate")))])]), e.selectedTerminal.lon && e.selectedTerminal.lat ? n("u-form-item", {
      attrs: {
        label: e.l("info.terminalit.nautica")
      }
    }, [n("view", {
      staticClass: ["flex-row", "justify-between"],
      staticStyle: {
        width: "520rpx"
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.selectedTerminal.lonWGS84 + "," + e.selectedTerminal.latWGS84))]), n("view", {
      staticClass: ["but"],
      on: {
        click: function (t) {
          e.copy(e.selectedTerminal.lonWGS84 + "," + e.selectedTerminal.latWGS84);
        }
      }
    }, [n("u-text", {
      staticClass: ["text-sm", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.copy")))])])])]) : n("u-form-item", {
      attrs: {
        label: e.l("info.terminalit.nautica")
      }
    }, [n("u-text", {
      staticClass: ["text", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.no.locate")))])]), n("u-form-item", {
      attrs: {
        label: "LBS"
      }
    }, [n("u-switch", {
      attrs: {
        activeColor: e.primaryColor
      },
      on: {
        change: e.lbsStateChange
      },
      model: {
        value: e.lbsStatus,
        callback: function (t) {
          e.lbsStatus = t;
        },
        expression: "lbsStatus"
      }
    })], 1)], 1)], 1), n("u-popup", {
      attrs: {
        round: "15",
        show: e.terminalNameShow,
        mode: "bottom",
        closeOnClickOverlay: !0
      },
      on: {
        close: e.terminalNameClose
      }
    }, [n("view", {
      staticClass: ["deviceName"]
    }, [n("view", {}, [n("u-text", {
      staticClass: ["deviceName-title", "text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("info.terminal.name")))])]), n("view", {
      staticClass: ["deviceName-input", "m-v-xl"]
    }, [n("u--input", {
      attrs: {
        placeholder: e.l("info.input.terminal.name"),
        border: "surround"
      },
      model: {
        value: e.currentDeviceName,
        callback: function (t) {
          e.currentDeviceName = t;
        },
        expression: "currentDeviceName"
      }
    })], 1), n("u-button", {
      attrs: {
        type: "primary",
        text: e.l("common.confirm")
      },
      on: {
        click: e.setTerminalName
      }
    })], 1)])], 1)]);
  }, i = [];
})(module, exports, __r);
