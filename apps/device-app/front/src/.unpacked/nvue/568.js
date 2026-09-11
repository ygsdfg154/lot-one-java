// webpack 模块 568  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/22.js")), i = r(require("@/.unpacked/nvue/23.js")), o = r(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = r(require("../../common/config.nvue.js")), u = r(require("moment")), l = require("../../common/utils.nvue.js"), c = r(require("../../components/payPopup/payPopup.nvue"));
  function _(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r));
    }
    return n;
  }
  function m(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? _(Object(n), !0).forEach(function (t) {
        (0, o.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var p = getApp().globalData, f = {
    components: {
      payPopup: c.default
    },
    props: ["wxBrowser"],
    data: function () {
      return {
        cdn: d.default.cdn,
        locationState: ["device.locate.gps", "device.locate.base", "device.locate.WiFi", "device.locate.WiFi"],
        vipTime: !1,
        payState: ["\u672a\u5f00\u901a", "\u5f00\u901a"],
        vipPopupShow: !1,
        vipPopupData: null,
        vipPopupUrl: ""
      };
    },
    computed: m(m(m({}, (0, s.mapGetters)(["selectedTerminal", "terminalFuncs", "access_token", "isAuditMode"])), (0, s.mapState)("device", ["infoBoxShow"])), {}, {
      infoBottom: function () {
        return ("0rpx", "0rpx");
      },
      genBettery: function () {
        if (this.selectedTerminal) return !(d.default.wirelessDevice.includes(this.selectedTerminal.terminalTypeDisplayName) || !(0, l.funcShowHandler)(this.terminalFuncs, 18)) && this.selectedTerminal.battery + "%";
      },
      genBetteryIcon: function () {
        if (this.selectedTerminal) {
          if (d.default.wirelessDevice.includes(this.selectedTerminal.terminalTypeDisplayName) || !(0, l.funcShowHandler)(this.terminalFuncs, 18)) return !1;
          var e = this.selectedTerminal.battery;
          if (e < 0 || e > 80) return this.cdn + ("/ikon/").concat(this.selectedTerminal.batteryState ? "b-c100" : "b100", ".png");
          if (e <= 80 && e > 60) return this.cdn + ("/ikon/").concat(this.selectedTerminal.batteryState ? "b-c80" : "b80", ".png");
          if (e <= 60 && e > 40) return this.cdn + ("/ikon/").concat(this.selectedTerminal.batteryState ? "b-c60" : "b60", ".png");
          if (e <= 40 && e > 20) return this.cdn + ("/ikon/").concat(this.selectedTerminal.batteryState ? "b-c40" : "b40", ".png");
          if (e <= 20 && e >= 0) return this.cdn + ("/ikon/").concat(this.selectedTerminal.batteryState ? "b-c20" : "b20", ".png");
        }
      },
      WLSignalIcon: function () {
        if (this.selectedTerminal) {
          var e = this.selectedTerminal.wlSignal;
          if (e <= 20) return this.cdn + "/ikon/signal-1.png";
          if (e > 20 && e <= 50) return this.cdn + "/ikon/signal-2.png";
          if (e > 50 && e <= 80) return this.cdn + "/ikon/signal-3.png";
          if (e > 80 && e <= 100) return this.cdn + "/ikon/signal-4.png";
        }
      },
      GNSSCountIcon: function () {
        if (this.selectedTerminal) {
          var e = this.selectedTerminal.gnssCount;
          if (e <= 12) return this.cdn + "/ikon/gps-1.png";
          if (e >= 13 && e <= 18) return this.cdn + "/ikon/gps-2.png";
          if (e >= 19) return this.cdn + "/ikon/gps-3.png";
        }
      },
      genTime: function () {
        if (this.selectedTerminal && this.selectedTerminal.lastAlive) return (0, u.default)(this.selectedTerminal.lastAlive, "YYYY/MM/DD HH:mm").format("YYYY-MM-DD HH:mm");
      },
      locateTime: function () {
        if (this.selectedTerminal && this.selectedTerminal.locateTime) return (0, u.default)(this.selectedTerminal.locateTime, "YYYY/MM/DD HH:mm").format("YYYY-MM-DD HH:mm");
      },
      locationGoodPower: function () {
        return !!this.selectedTerminal && this.selectedTerminal.enablePositionMode;
      },
      addValuePower: function () {
        var e;
        return (e = !!this.selectedTerminal && this.selectedTerminal.enableValueAdded, e = !this.isAuditMode && e);
      },
      locationModePower: function () {
        return (0, l.funcShowHandler)(this.terminalFuncs, 19);
      },
      sharePower: function () {
        return (0, l.funcShowHandler)(this.terminalFuncs, 57);
      },
      genAddress: function () {
        return this.selectedTerminal && this.selectedTerminal.TextLocation ? this.selectedTerminal.TextLocation : this.l("common.get.locate");
      }
    }),
    methods: m(m(m({}, (0, s.mapActions)("remoteSet", ["SetTerminalParams", "GetTerminalParams"])), (0, s.mapActions)("packageInfo", ["GetDeviceVipTypeList"])), {}, {
      l: function (e) {
        return p.$t(e);
      },
      setBadgeColor: function (e) {
        return (0, l.badgeBgColor)(e);
      },
      gotoMp: function () {
        (0, l.qzGotoWx)({
          id: this.selectedTerminal.id,
          url: "/pagesPay/value-added/index",
          access_token: this.access_token
        });
      },
      gotoPages: function (e) {
        var t = this;
        return (0, i.default)(a.default.mark(function n() {
          return a.default.wrap(function (n) {
            for (; ; ) switch (n.prev = n.next) {
              case 0:
                (n.t0 = e, n.next = "locationGood" === n.t0 ? 3 : "share" === n.t0 ? 14 : 24);
                break;
              case 3:
                return (n.next = 5, t.getDeviceVipTypeList(3));
              case 5:
                if (!t.vipTime) {
                  n.next = 10;
                  break;
                }
                return (n.next = 8, t.openLocationGood());
              case 8:
                n.next = 13;
                break;
              case 10:
                (t.vipPopupData = {
                  title: ("\u79d2\u5b9a\u6a21\u5f0f").concat(t.payState[1]),
                  content: ("\u5f53\u524d\u8bbe\u5907\u79d2\u5b9a\u6a21\u5f0f\u670d\u52a1").concat(t.payState[0], "\uff0c\u662f\u5426\u524d\u5f80").concat(t.payState[1]),
                  description: "1. \u9650\u65f6\u79d2\u901f\u5b9a\u4f4d\u529f\u80fd\u4f7f\u7528\u6743\u9650\n2. 7*16\u5c0f\u65f6\u8fdc\u7a0b\u6280\u672f\u670d\u52a1\u652f\u6301\u4fdd\u969c\n3. \u7ec8\u8eab\u552e\u540e\u670d\u52a1\uff0c1\u5bf91\u5168\u7a0b\u670d\u52a1\n4. \u66f4\u591aAPP\u521b\u65b0\u529f\u80fd\u62a2\u5148\u514d\u8d39\u4f53\u9a8c"
                }, t.vipPopupUrl = "/pagesPay/value-added/index?type=2", t.vipPopupShow = !0);
              case 13:
                return n.abrupt("break", 26);
              case 14:
                if (t.selectedTerminal.enablePositionShare) {
                  n.next = 16;
                  break;
                }
                return n.abrupt("return", t.$emit("openShare"));
              case 16:
                return (n.next = 18, t.getDeviceVipTypeList(8));
              case 18:
                if (!t.vipTime) {
                  n.next = 20;
                  break;
                }
                return n.abrupt("return", t.$emit("openShare"));
              case 20:
                return (t.vipPopupData = {
                  title: ("\u5b9a\u4f4d\u5206\u4eab").concat(t.payState[1]),
                  content: ("\u5f53\u524d\u8bbe\u5907\u5b9a\u4f4d\u5206\u4eab\u670d\u52a1").concat(t.payState[0], "\uff0c\u662f\u5426\u524d\u5f80").concat(t.payState[1]),
                  description: "1. \u9650\u65f6\u5b9a\u4f4d\u5206\u4eab\u529f\u80fd\u4f7f\u7528\u6743\u9650\n2. 7*16\u5c0f\u65f6\u8fdc\u7a0b\u6280\u672f\u670d\u52a1\u652f\u6301\u4fdd\u969c\n3. \u7ec8\u8eab\u552e\u540e\u670d\u52a1\uff0c1\u5bf91\u5168\u7a0b\u670d\u52a1\n4. \u66f4\u591aAPP\u521b\u65b0\u529f\u80fd\u62a2\u5148\u514d\u8d39\u4f53\u9a8c"
                }, t.vipPopupUrl = "/pagesPay/value-added/index?type=4", t.vipPopupShow = !0, n.abrupt("break", 26));
              case 24:
                return (uni.navigateTo({
                  url: e
                }), n.abrupt("break", 26));
              case 26:
              case "end":
                return n.stop();
            }
          }, n);
        }))();
      },
      openLocationGood: function () {
        var e = this;
        return (0, i.default)(a.default.mark(function t() {
          var n, r, i;
          return a.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                return (t.next = 2, e.GetTerminalParams({
                  terminalId: e.selectedTerminal.id
                }));
              case 2:
                if ((n = t.sent).succeeded) {
                  t.next = 6;
                  break;
                }
                return ((0, l.qzwlToast)(n.msg, "none"), t.abrupt("return"));
              case 6:
                (r = n.data.find(function (e) {
                  return "ChangeMode" === e.FieldName;
                }), 1 == (i = r.FieldList)[0].Value && 10 == i[1].Value ? (0, l.qzwlToast)("\u6b64\u8bbe\u5907\u5df2\u5f00\u542f\u9ad8\u7cbe\u51c6\u5b9a\u4f4d", "none") : e.setLocationGood());
              case 9:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      setLocationGood: function () {
        var e, t = this;
        uni.showModal({
          showCancel: !0,
          title: "\u662f\u5426\u5f00\u542f\u9ad8\u7cbe\u51c6\u5b9a\u4f4d",
          content: "\u6b64\u6a21\u5f0f\u4e0b\uff0c\u8bbe\u5907\u6bcf10\u79d2\u4e0a\u62a5\u5b9a\u4f4d\u6570\u636e\uff0c\u5e76\u5f00\u542f\u62d0\u70b9\u8865\u507f\uff0c\u6570\u636e\u4e0a\u62a5\u9891\u7387\u975e\u5e38\u9ad8\uff0c\u53ef\u67e5\u8be2\u8f68\u8ff9\u6570\u636e\u5b8c\u6574",
          confirmText: "\u5f00\u542f",
          cancelText: "\u53d6\u6d88",
          success: (e = (0, i.default)(a.default.mark(function e(n) {
            return a.default.wrap(function (e) {
              for (; ; ) switch (e.prev = e.next) {
                case 0:
                  if (!n.confirm) {
                    e.next = 3;
                    break;
                  }
                  return (e.next = 3, t.confirmLocationGood());
                case 3:
                case "end":
                  return e.stop();
              }
            }, e);
          })), function (t) {
            return e.apply(this, arguments);
          })
        });
      },
      confirmLocationGood: function () {
        var e = this;
        return (async function () {
          var n;
          n = {
            deviceId: e.selectedTerminal.id,
            param: [{
              name: "ChangeMode",
              value: {
                runningMode: 1,
                Interval: 10
              }
            }, {
              name: "GPSPriority",
              value: 1
            }]
          };
          (await e.SetTerminalParams(n)).succeeded && (0, l.qzwlToast)(e.l("common.switch.mode"), "none");
        })();
      },
      getDeviceVipTypeList: function (e) {
        var t = this;
        return (async function () {
          var r;
          t.vipTime = !1;
          (r = await t.GetDeviceVipTypeList({
            terminalId: t.selectedTerminal.id,
            type: e
          })).succeeded && (r.data && (new Date(r.data.expirationTime) > new Date() && (t.vipTime = !0), t.payState = r.data.expirationTime ? ["\u5df2\u5230\u671f", "\u7eed\u8d39"] : ["\u672a\u5f00\u901a", "\u5f00\u901a"]), r.data || (t.payState = ["\u672a\u5f00\u901a", "\u5f00\u901a"]));
        })();
      },
      closeVipPopup: function () {
        this.vipPopupShow = !1;
      }
    })
  };
  t.default = f;
})(module, exports, __r);
