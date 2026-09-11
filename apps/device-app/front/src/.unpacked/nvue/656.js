// webpack 模块 656  [nvue]
// 出现于: pagesFunc/terminal/self-detection.js
const __r = require('./__runtime.js').wrap();
(function (e, t, a) {
  "use strict";
  var n = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = n(require("@/.unpacked/nvue/22.js")), s = n(require("@/.unpacked/nvue/23.js")), i = n(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = require("../../common/utils.nvue.js"), _ = n(require("../../common/config.nvue.js"));
  function u(e, t) {
    var a = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      (t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), a.push.apply(a, n));
    }
    return a;
  }
  function l(e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = null != arguments[t] ? arguments[t] : {};
      t % 2 ? u(Object(a), !0).forEach(function (t) {
        (0, i.default)(e, t, a[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : u(Object(a)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
      });
    }
    return e;
  }
  var m = getApp().globalData, c = {
    components: {},
    onLoad: function () {
      this.selectedTerminal && (this.iccid = this.selectedTerminal.iccid, this.terminalTypeDisplayName = this.selectedTerminal.terminalTypeDisplayName, this.online = 3 === this.selectedTerminal.deviceState ? m.$t("common.device.status.shutdown") : m.$t("common.device.status.starting-up"), this.fetchData());
    },
    data: function () {
      return {
        cdn: _.default.cdn,
        iccid: "",
        terminalTypeDisplayName: "",
        betteryAlarmState: "",
        shockAlarmState: "",
        workModel: "",
        online: "",
        garrison: ""
      };
    },
    computed: l(l({}, (0, o.mapGetters)(["selectedTerminal", "userId", "terminalFuncs"])), {}, {
      wirelessDeviceState: function () {
        if (this.selectedTerminal) return _.default.wirelessDevice.includes(this.selectedTerminal.terminalTypeDisplayName);
      },
      genBettery: function () {
        if (!this.selectedTerminal) return "-";
        this.selectedTerminal.battery;
        var e = this.selectedTerminal.batteryState, t = this.selectedTerminal.terminalTypeDisplayName;
        if (this.wirelessDeviceState) return m.$t((0, d.batteryStateHangle)(e, t));
        var a = this.selectedTerminal.battery;
        return a < 0 ? "100%" : ("").concat(a, "%");
      },
      genWLSignal: function () {
        var e = this.selectedTerminal.gnssCount;
        return e <= 12 || e >= 13 && e <= 18 ? m.$t("common.general") : e >= 19 ? m.$t("common.excellent") : void 0;
      },
      genGpsSum: function () {
        var e = this.selectedTerminal.gnssCount;
        return ("").concat(m.$t("self-test.satellite-quantity"), " ").concat(e);
      },
      genTime: function () {
        return this.selectedTerminal ? this.selectedTerminal.lastAlive : null;
      },
      genGsmSignal: function () {
        var e = this.selectedTerminal.wlSignal;
        return e <= 20 || e > 20 && e <= 50 ? ("").concat(m.$t("common.general")) : e > 50 && e <= 80 ? ("").concat(m.$t("common.good")) : e > 80 && e <= 100 ? ("").concat(m.$t("common.excellent")) : void 0;
      }
    }),
    methods: l(l({}, (0, o.mapActions)("remoteSet", ["GetTerminalParams", "GetTerminalGarrison"])), {}, {
      l: function (e) {
        return m.$t(e);
      },
      fetchData: function () {
        var e = this;
        return (async function () {
          await e.getAlarmState();
          (0, d.funcShowHandler)(e.terminalFuncs, 1) && e.getGarrison();
        })();
      },
      getAlarmState: function () {
        var e = this;
        return (0, s.default)(r.default.mark(function t() {
          var a, n, s, i;
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                return (t.next = 2, e.GetTerminalParams({
                  terminalId: e.selectedTerminal.id
                }));
              case 2:
                if ((a = t.sent).succeeded) {
                  t.next = 6;
                  break;
                }
                return ((0, d.qzwlToast)(a.msg, "none"), t.abrupt("return"));
              case 6:
                if (((n = a.data.find(function (e) {
                  return "LowBatteryAlarm" === e.FieldName;
                })) && (e.betteryAlarmState = n.Value ? m.$t("common.open") : m.$t("common.close")), (s = a.data.find(function (e) {
                  return "Vibration" === e.FieldName;
                })) && (e.shockAlarmState = s.Value ? m.$t("common.open") : m.$t("common.close")), i = a.data.find(function (e) {
                  return "\u8bbe\u5907\u6a21\u5f0f\u5207\u6362" === e.DisplayName;
                }))) {
                  t.next = 13;
                  break;
                }
                return t.abrupt("return");
              case 13:
                (i = (i = (i = i.FieldList).find(function (e) {
                  return "\u5b9a\u4f4d\u6a21\u5f0f" === e.DisplayName;
                })).PossibleValue.find(function (e) {
                  return e.value === i.Value;
                }), e.workModel = i.name);
              case 17:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      terminalFuncShow: function (e) {
        return (0, d.funcShowHandler)(this.terminalFuncs, e);
      },
      getGarrison: function () {
        var e = this;
        return (async function () {
          var a;
          (a = await e.GetTerminalGarrison({
            deviceId: e.selectedTerminal.id
          }), e.garrison = a.data ? m.$t("common.garrison-on") : m.$t("common.garrison-off"));
        })();
      }
    })
  };
  t.default = c;
})(module, exports, __r);
