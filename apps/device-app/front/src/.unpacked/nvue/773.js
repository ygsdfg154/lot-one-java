// webpack 模块 773  [nvue]
// 出现于: pagesFunc/terminal/remote-setup/index.js
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
    uCellGroup: require("uview-ui/components/u-cell-group/u-cell-group.vue").default,
    uCell: require("uview-ui/components/u-cell/u-cell.vue").default,
    uPicker: require("uview-ui/components/u-picker/u-picker.vue").default,
    uPopup: require("uview-ui/components/u-popup/u-popup.vue").default
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
      staticClass: ["flex-1", "bg-white"]
    }, [n("u-cell-group", {
      attrs: {
        customStyle: {
          "font-size": "32rpx"
        }
      }
    }, [e.terminalFuncShow(22) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("common.remote.onOff")
      },
      on: {
        click: function (t) {
          e.setDirective(0, "common.remote.onOff", "common.remote.onOff.introduce", "OffOn");
        }
      }
    }) : e._e(), e.terminalFuncShow(28) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("remote-setup.immediately.locate")
      },
      on: {
        click: e.refreshLocate
      }
    }) : e._e(), e.terminalFuncShow(1) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("alarm.setup.g/r")
      },
      on: {
        click: function (t) {
          e.setDirective(0, "alarm.setup.garrison", "remote-setup.garrison", "Garrison");
        }
      }
    }) : e._e(), e.terminalFuncShow(45) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("alarm.setup.dismantle")
      },
      on: {
        click: function (t) {
          e.setDirective(0, "alarm.setup.dismantle", "remote-setup.dismantle", "TamperAlarm");
        }
      }
    }) : e._e(), e.terminalFuncShow(43) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("alarm.setup.vibration")
      },
      on: {
        click: function (t) {
          e.setDirective(0, "alarm.setup.vibration", "remote-setup.vibration", "Vibration");
        }
      }
    }) : e._e(), e.terminalFuncShow(44) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("alarm.setup.speed")
      },
      on: {
        click: function (t) {
          e.setDirective(3, "alarm.setup.speed", "remote-setup.speed", "SpeedAlarm");
        }
      }
    }) : e._e(), e.terminalFuncShow(55) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("alarm.setup.battery")
      },
      on: {
        click: function (t) {
          e.setDirective(0, "alarm.setup.battery", "remote-setup.lowBattery", "LowBatteryAlarm");
        }
      }
    }) : e._e(), e.terminalFuncShow(60) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("alarm-setup.cut-power")
      },
      on: {
        click: function (t) {
          e.setDirective(0, "alarm-setup.cut-power", "remote-setup.cutPower", "CutPowerAlarm");
        }
      }
    }) : e._e(), e.terminalFuncShow(46) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("alarm-setup.Voice")
      },
      on: {
        click: function (t) {
          e.setDirective(0, "alarm-setup.Voice", "remote-setup.voice", "VoiceAlarm");
        }
      }
    }) : e._e(), e.terminalFuncShow(59) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("alarm.setup.sos-alarm")
      },
      on: {
        click: function (t) {
          e.setDirective(0, "alarm.setup.sos-alarm", "remote-setup.sos", "SosAlarm");
        }
      }
    }) : e._e(), e.terminalFuncShow(35) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("remote-setup.white.tel")
      },
      on: {
        click: function (t) {
          e.setDirective(2, "remote-setup.white.tel", "remote-setup.white.tel.describe", "white");
        }
      }
    }) : e._e(), e.terminalFuncShow(12) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("alarm-setup.buffer")
      },
      on: {
        click: function (t) {
          e.setDirective(0, "alarm-setup.buffer", "alarm-setup.buffer-text", "Buffer");
        }
      }
    }) : e._e(), e.terminalFuncShow(31) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("remote-setup.custom.instruct")
      },
      on: {
        click: function (t) {
          e.setDirective(1, "remote-setup.custom.instruct", "remote-setup.custom.instruct-describe", "custom");
        }
      }
    }) : e._e(), e.terminalFuncShow(29) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("remote-setup.terminal-restart")
      },
      on: {
        click: e.resetTerminal
      }
    }) : e._e(), e.terminalFuncShow(10001) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: "\u4e0a\u4f20\u95f4\u9694\u8bbe\u7f6e",
        value: e.uploadInterval ? e.uploadInterval + "\u79d2" : ""
      },
      on: {
        click: e.setUploadTime
      }
    }) : e._e(), e.terminalFuncShow(42) ? n("u-cell", {
      staticClass: ["flex-col", "justify-center"],
      attrs: {
        size: "large",
        isLink: !0,
        title: e.l("remote-setup.factory-reset")
      },
      on: {
        click: e.factoryReset
      }
    }) : e._e()], 1), n("u-picker", {
      staticStyle: {
        position: "absolute"
      },
      attrs: {
        show: e.showUploadTime,
        keyName: "label",
        columns: e.timeSlice,
        closeOnClickOverlay: !0
      },
      on: {
        confirm: e.timeConfirm,
        cancel: function (t) {
          e.showUploadTime = !1;
        }
      }
    }), n("u-popup", {
      staticStyle: {
        position: "absolute"
      },
      attrs: {
        show: e.funcPopupShow,
        round: "15",
        closeable: !0,
        mode: "bottom",
        closeOnClickOverlay: !0
      },
      on: {
        close: function (t) {
          e.funcPopupShow = !1;
        }
      }
    }, [e.funcPopupShow ? n("directivePopup", {
      attrs: {
        popupType: e.popupType,
        directive: e.directive,
        describe: e.describe,
        param: e.param
      }
    }) : e._e()], 1)], 1)]);
  }, i = [];
})(module, exports, __r);
