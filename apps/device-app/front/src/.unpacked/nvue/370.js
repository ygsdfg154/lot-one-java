// webpack 模块 370  [nvue]
// 出现于: pages/ability/index.js, pagesFunc/terminal/remote-setup/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = require("../../common/utils.nvue.js"), u = a(require("../../common/config.nvue.js"));
  function l(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      (t && (a = a.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, a));
    }
    return n;
  }
  function c(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? l(Object(n), !0).forEach(function (t) {
        (0, o.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var _ = getApp().globalData, m = {
    data: function () {
      return {
        cdn: u.default.cdn,
        radioValue: 1,
        selectedRadioValue: 1,
        speed: "",
        custom: "",
        whiteTelList: [],
        speedMax: ""
      };
    },
    props: ["popupType", "directive", "describe", "param"],
    computed: c(c({}, (0, s.mapGetters)(["selectedTerminal"])), {}, {
      radioList: function () {
        var e = {
          OffOn: {
            open: "\u5f00\u673a",
            close: "\u5173\u673a"
          },
          Buffer: {
            open: "\u65ad\u5f00\u6cb9\u7535",
            close: "\u6062\u590d\u6cb9\u7535"
          },
          Other: {
            open: ("").concat(this.l("common.open")).concat(this.directive),
            close: ("").concat(this.l("common.close")).concat(this.directive)
          }
        }, t = Object.keys(e).includes(this.param) ? this.param : "Other";
        return [{
          name: 0,
          lable: e[t].open,
          disabled: !1
        }, {
          name: 1,
          lable: e[t].close,
          disabled: !1
        }];
      }
    }),
    mounted: function () {
      this.getRadioValue();
    },
    methods: c(c({}, (0, s.mapActions)("remoteSet", ["GetTerminalParams", "GetTerminalGarrison", "GetWhiteTel", "SetTerminalGarrison", "SetTerminalParams", "SetWhiteTel", "GetCutBuffer", "SetCutBuffer", "SendCommand", "GetTerminalPower", "SetTerminalPower"])), {}, {
      l: function (e) {
        return _.$t(e);
      },
      hideKeyboard: function () {
        uni.hideKeyboard();
      },
      debounceGetRadioValue: function () {
        return (uni.$u.debounce(this.getRadioValue, 500), (0, d.qzwlToast)(_.$t("common.refurbish.success"), "none"));
      },
      getRadioValue: function () {
        if (this.selectedTerminal) switch (this.param) {
          case "custom":
            break;
          case "white":
            this.getWhiteTelList();
            break;
          case "Buffer":
            this.getBuffer();
            break;
          case "Garrison":
            this.getGarrisonState();
            break;
          case "OffOn":
            this.getOnOffParam();
            break;
          default:
            this.getDeviceParams();
        }
      },
      getDeviceParams: function () {
        var e = this;
        return (async function () {
          var n, a, i;
          (n = await e.GetTerminalParams({
            terminalId: e.selectedTerminal.id
          }), (a = n.data.find(function (t) {
            return t.FieldName === e.param;
          })) && ("SpeedAlarm" != e.param && (i = !!a.Value, e.selectedRadioValue = e.radioValue = i ? 0 : 1), "SpeedAlarm" == e.param && a.FieldList.length && (i = !!a.FieldList[0].Value, e.speed = a.FieldList[0].Value, e.selectedRadioValue = e.radioValue = i ? 0 : 1, e.speedMax = a.FieldList[0].Max), "SpeedAlarm" != e.param || a.FieldList.length || (e.selectedRadioValue = e.radioValue = 1)));
        })();
      },
      getGarrisonState: function () {
        var e = this;
        return (async function () {
          var n, a;
          (n = await e.GetTerminalGarrison({
            deviceId: e.selectedTerminal.id
          })).succeeded ? (a = !!n.data, e.selectedRadioValue = e.radioValue = a ? 0 : 1) : e.selectedRadioValue = e.radioValue = 1;
        })();
      },
      getOnOffParam: function () {
        var e = this;
        return (async function () {
          var n;
          (n = await e.GetTerminalPower({
            terminalId: e.selectedTerminal.id
          })).succeeded && (e.selectedRadioValue = e.radioValue = n.data ? 0 : 1);
        })();
      },
      getBuffer: function () {
        var e = this;
        return (async function () {
          var n;
          (n = await e.GetCutBuffer({
            terminalId: e.selectedTerminal.id
          })).succeeded && (e.selectedRadioValue = e.radioValue = n.data ? 0 : 1);
        })();
      },
      getWhiteTelList: function () {
        var e = this;
        return (async function () {
          var n;
          (n = await e.GetWhiteTel({
            deviceId: e.selectedTerminal.id
          })).succeeded && (e.whiteTelList = n.data || []);
        })();
      },
      sendDirective: function () {
        switch (this.param) {
          case "Garrison":
            this.setGarrison();
            break;
          case "TamperAlarm":
            this.dismantleChange();
            break;
          case "Vibration":
            this.vibrationChange();
            break;
          case "SpeedAlarm":
            this.speedHangle();
            break;
          case "LowBatteryAlarm":
            this.batteryChange();
            break;
          case "CutPowerAlarm":
            this.cutPowerChange();
            break;
          case "VoiceAlarm":
            this.voiceChange();
            break;
          case "SosAlarm":
            this.sosChange();
            break;
          case "white":
            this.whiteTelHangle();
            break;
          case "Buffer":
            this.setBuffer();
            break;
          case "OffOn":
            this.setTerminalOnOff();
            break;
          case "custom":
            this.directiveHangle();
        }
      },
      setGarrison: function () {
        var e = this;
        return (async function () {
          (await e.SetTerminalGarrison({
            deviceId: e.selectedTerminal.id,
            isSetDefence: !e.radioValue
          })).succeeded && (0, d.qzwlToast)(e.radioValue ? _.$t("common.off.garrison") : _.$t("common.on.garrison"), "none");
        })();
      },
      vibrationChange: function () {
        var e = this;
        return (async function () {
          (await e.SetTerminalParams({
            deviceId: e.selectedTerminal.id,
            param: [{
              name: "Vibration",
              value: e.radioValue ? 0 : 1
            }]
          })).succeeded && (0, d.qzwlToast)(e.radioValue ? _.$t("common.off.vibration") : _.$t("common.on.vibration"), "none");
        })();
      },
      batteryChange: function () {
        var e = this;
        return (async function () {
          (await e.SetTerminalParams({
            deviceId: e.selectedTerminal.id,
            param: [{
              name: "LowBatteryAlarm",
              value: !e.radioValue
            }]
          })).succeeded && (0, d.qzwlToast)(e.radioValue ? _.$t("common.off.battery") : _.$t("common.on.battery"), "none");
        })();
      },
      dismantleChange: function (e) {
        var t = this;
        return (async function () {
          (await t.SetTerminalParams({
            deviceId: t.selectedTerminal.id,
            param: [{
              name: "TamperAlarm",
              value: !t.radioValue
            }]
          })).succeeded && (0, d.qzwlToast)(t.radioValue ? _.$t("common.off.dismantle") : _.$t("common.on.dismantle"), "none");
        })();
      },
      cutPowerChange: function () {
        var e = this;
        return (async function () {
          (await e.SetTerminalParams({
            deviceId: e.selectedTerminal.id,
            param: [{
              name: "CutPowerAlarm",
              value: !e.radioValue
            }]
          })).succeeded && (0, d.qzwlToast)(e.radioValue ? _.$t("common.off.cutPower") : _.$t("common.on.cutPower"), "none");
        })();
      },
      voiceChange: function (e) {
        var t = this;
        return (async function () {
          (await t.SetTerminalParams({
            deviceId: t.selectedTerminal.id,
            param: [{
              name: "VoiceAlarm",
              value: t.radioValue ? 0 : 1
            }]
          })).succeeded && (0, d.qzwlToast)(t.radioValue ? _.$t("common.off.voice") : _.$t("common.on.voice"), "none");
        })();
      },
      sosChange: function () {
        var e = this;
        return (async function () {
          (await e.SetTerminalParams({
            deviceId: e.selectedTerminal.id,
            param: [{
              name: "SosAlarm",
              value: !e.radioValue
            }]
          })).succeeded && (0, d.qzwlToast)(e.radioValue ? _.$t("common.off.sos") : _.$t("common.on.sos"), "none");
        })();
      },
      speedHangle: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if (!(Number(e.speed) > e.speedMax) && e.speed || e.radioValue) {
                  t.next = 2;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(_.$t("common.set.speed"), "none"));
              case 2:
                return (t.next = 4, e.SetTerminalParams({
                  deviceId: e.selectedTerminal.id,
                  param: [{
                    name: "SpeedAlarm",
                    value: {
                      SpeedLimit: e.radioValue ? 0 : e.speed,
                      OverSpeedTime: 5
                    }
                  }]
                }));
              case 4:
                t.sent.succeeded && (0, d.qzwlToast)(e.radioValue ? _.$t("common.off.speed") : _.$t("common.on.speed"), "none");
              case 6:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      whiteTelHangle: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          var n;
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if ((n = e.whiteTelList.filter(function (e) {
                  return !!e;
                }), !!n.every(function (e) {
                  return uni.$u.test.mobile(e);
                }))) {
                  t.next = 4;
                  break;
                }
                return t.abrupt("return", uni.showToast({
                  title: e.l("common.please.valid.mobile.tel"),
                  icon: "none"
                }));
              case 4:
                if (!(Array.from(new Set(n)).length < n.length)) {
                  t.next = 7;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(e.l("common.please.equal.tel"), "none"));
              case 7:
                return (t.next = 9, e.SetWhiteTel({
                  deviceId: e.selectedTerminal.id,
                  phoneList: e.whiteTelList
                }));
              case 9:
                t.sent.succeeded && (0, d.qzwlToast)(e.l("common.post.tel"), "none");
              case 11:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      directiveHangle: function () {
        var e = this;
        return (async function () {
          uni.hideKeyboard();
          (await e.SendCommand({
            deviceId: e.selectedTerminal.id,
            directive: e.custom
          })).succeeded && (0, d.qzwlToast)(e.l("common.custom.directive"), "none");
        })();
      },
      setBuffer: function () {
        var e = this;
        return (async function () {
          (await e.SetCutBuffer({
            TerminalId: e.selectedTerminal.id,
            isCutButter: e.radioValue ? 0 : 1
          })).succeeded && (0, d.qzwlToast)(e.radioValue ? _.$t("common.on-setBuffer") : _.$t("common.off-setBuffer"), "none");
        })();
      },
      setTerminalOnOff: function () {
        var e = this;
        return (async function () {
          (await e.SetTerminalPower({
            deviceId: e.selectedTerminal.id,
            state: !e.radioValue
          })).succeeded && (0, d.qzwlToast)(e.radioValue ? _.$t("common.on") : _.$t("common.off"), "none");
        })();
      }
    })
  };
  t.default = m;
})(module, exports, __r);
