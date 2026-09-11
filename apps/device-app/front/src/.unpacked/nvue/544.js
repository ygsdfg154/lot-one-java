// webpack 模块 544  [nvue]
// 出现于: pages/ability/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = a(require("../../common/config.nvue.js")), d = a(require("moment")), u = a(require("../../components/directivePopup/directivePopup.nvue")), l = a(require("../../components/qzwlShare/qzwlShare.nvue")), c = a(require("../../components/payPopup/payPopup.nvue")), _ = require("vuex"), m = require("../../common/utils.nvue.js");
    function p(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        (t && (a = a.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, a));
      }
      return n;
    }
    function f(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? p(Object(n), !0).forEach(function (t) {
          (0, o.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : p(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var h = getApp().globalData, y = {
      components: {
        directivePopup: u.default,
        qzwlShare: l.default,
        payPopup: c.default
      },
      data: function () {
        return {
          cdn: s.default.cdn,
          titleColor: s.default.titleColor,
          primaryColor: s.default.primaryColor,
          gridList: [{
            key: "location",
            title: "remote-setup.immediately.locate",
            icon: s.default.cdn + "/ikon/qzwl-location-li@2x.png",
            func: 28,
            iconSize: "96rpx"
          }, {
            key: "sim",
            title: "device.traffic.card",
            icon: s.default.cdn + "/ikon/qzwl-sim@2x.png",
            func: 52,
            iconSize: "96rpx"
          }, {
            key: "track",
            title: "device.locus",
            icon: s.default.cdn + "/ikon/qzwl-func-track@2x.png",
            func: 3,
            iconSize: "96rpx"
          }, {
            key: "fence",
            title: "device.enclosure",
            icon: s.default.cdn + "/ikon/qzwl-fence@2x.png",
            func: 16,
            iconSize: "96rpx"
          }, {
            key: "record",
            title: "device.audio",
            icon: s.default.cdn + "/ikon/qzwl-voice.png",
            func: 14,
            iconSize: "96rpx"
          }, {
            key: "positioning-mode",
            title: "device.locate.mode",
            icon: s.default.cdn + "/ikon/qzwl-posMode@2x.png",
            func: 19,
            iconSize: "96rpx"
          }, {
            key: "share",
            title: "device.share.locate",
            icon: s.default.cdn + "/ikon/qzwl-share-post.png",
            func: 57,
            iconSize: "96rpx"
          }, {
            key: "nav",
            title: "common.nav",
            icon: s.default.cdn + "/ikon/qzwl-fun-nav@2x.png",
            iconSize: "96rpx"
          }, {
            key: "onOff",
            title: "common.remote.onOff",
            icon: s.default.cdn + "/ikon/qzwl-onOff@2x.png",
            func: 22,
            iconSize: "96rpx"
          }, {
            key: "updata",
            title: "device.terminal.info",
            icon: s.default.cdn + "/ikon/qzwl-info@2x.png",
            iconSize: "96rpx"
          }, {
            key: "alarm-setting",
            title: "device.alarm.setup",
            icon: s.default.cdn + "/ikon/qzwl-alarm-setup.png",
            iconSize: "96rpx"
          }, {
            key: "remote-setting",
            title: "device.remote.setup",
            icon: s.default.cdn + "/ikon/qzwl-remote-setup@2x.png",
            iconSize: "96rpx"
          }, {
            key: "report",
            title: "device.statement",
            icon: s.default.cdn + "/ikon/qzwl-report@2x.png",
            func: 58,
            iconSize: "96rpx"
          }, {
            key: "self-check",
            title: "device.self-test",
            icon: s.default.cdn + "/ikon/qzwl-self-test@2x.png",
            iconSize: "96rpx"
          }, {
            key: "activation",
            title: "device.activation",
            icon: s.default.cdn + "/ikon/qzwl-activation-service.png",
            func: 2002,
            iconSize: "96rpx"
          }, {
            key: "order",
            title: "device.orders",
            icon: s.default.cdn + "/ikon/qzwl-device-orders@2x.png",
            func: 2222,
            iconSize: "96rpx"
          }],
          funcPopupShow: !1,
          popupType: 0,
          directive: "",
          describe: "",
          param: "",
          shareTitle: "",
          sharePath: "",
          vipTime: !1,
          payState: ["\u672a\u5f00\u901a", "\u5f00\u901a"],
          vipPopupShow: !1,
          vipPopupData: null,
          vipPopupUrl: "",
          emptyShow: !1
        };
      },
      computed: f(f({}, (0, _.mapGetters)(["selectedTerminal", "terminalFuncs", "sysInfo", "appConfig", "userType", "isAuditMode", "access_token"])), {}, {
        genTime: function () {
          if (this.selectedTerminal && this.selectedTerminal.lastAlive) return (0, d.default)(this.selectedTerminal.lastAlive, "YYYY/MM/DD HH:mm").format("YYYY-MM-DD HH:mm");
        },
        genBettery: function () {
          if (this.selectedTerminal) return !(s.default.wirelessDevice.includes(this.selectedTerminal.terminalTypeDisplayName) || !(0, m.funcShowHandler)(this.terminalFuncs, 18)) && this.selectedTerminal.battery + "%";
        },
        GNSSCount: function () {
          if (this.selectedTerminal) {
            var e = this.selectedTerminal.gnssCount;
            if (e <= 12) return h.$t("common.general");
            if (e >= 13 && e <= 18) return h.$t("common.general");
            if (e >= 19) return h.$t("common.excellent");
          }
        },
        WLSignal: function () {
          if (this.selectedTerminal) {
            var e = this.selectedTerminal.wlSignal;
            if (e <= 20) return h.$t("common.general");
            if (e > 20 && e <= 50) return h.$t("common.general");
            if (e > 50 && e <= 80) return h.$t("common.good");
            if (e > 80 && e <= 100) return h.$t("common.excellent");
          }
        },
        currentFuncList: function () {
          var e = this;
          return this.selectedTerminal ? this.gridList.filter(function (t) {
            return e.terminalFuncShow(t.func);
          }) : (this.emptyShow = !0, []);
        },
        columns: function () {
          return [[{
            label: this.l("common.0.5-day"),
            time: 720
          }, {
            label: this.l("common.1-day"),
            time: 1440
          }, {
            label: this.l("common.3-day"),
            time: 4320
          }, {
            label: this.l("common.7-day"),
            time: 10080
          }]];
        }
      }),
      onShow: function () {
        (this.sharePath = "/pages/home/home", this.shareTitle = h.$t("app.name"), this.selectedTerminal || (this.emptyShow = !0));
      },
      onShareAppMessage: function () {
        return {
          title: this.shareTitle,
          imageUrl: s.default.cdn + "/draw/qzwl-logo.png",
          path: this.sharePath
        };
      },
      onHide: function () {
        (this.$refs.qzwlShare && (this.$refs.qzwlShare.shareLocationShow = !1, this.$refs.qzwlShare.isToShare = !1, this.$refs.qzwlShare.selectTime = !1, this.$refs.qzwlShare.defaultIndex = [0], this.$refs.qzwlShare.shareTime = this.l("common.0.5-day"), this.$refs.qzwlShare.selectedTime = 720), this.vipPopupShow = !1);
      },
      methods: f(f(f({}, (0, _.mapActions)("remoteSet", ["Locateing"])), (0, _.mapActions)("packageInfo", ["GetDeviceVipTypeList"])), {}, {
        l: function (e) {
          return h.$t(e);
        },
        setShareMp: function (e) {
          (this.sharePath = e.path, this.shareTitle = e.title);
        },
        terminalFuncShow: function (e) {
          return 52 == e || 16 == e ? (0, m.funcShowHandler)(this.terminalFuncs, e) : 1825 == e ? (t = !!this.selectedTerminal && this.selectedTerminal.enableValueAdded, t = !this.isAuditMode && t) : 2002 == e ? (n = !!this.selectedTerminal && this.selectedTerminal.enableActivation, n = !this.isAuditMode && n) : 2222 == e ? 1 == this.userType : !e || (0, m.funcShowHandler)(this.terminalFuncs, e);
          var t, n;
        },
        gridItemTaped: function (e, t) {
          var n = this;
          return (0, i.default)(r.default.mark(function t() {
            return r.default.wrap(function (t) {
              for (; ; ) switch (t.prev = t.next) {
                case 0:
                  if (n.selectedTerminal) {
                    t.next = 3;
                    break;
                  }
                  return (uni.showToast({
                    title: h.$t("device.no.terminal"),
                    icon: "none"
                  }), t.abrupt("return"));
                case 3:
                  (t.t0 = e.key, t.next = "sim" === t.t0 ? 6 : "value-added" === t.t0 ? 8 : "location" === t.t0 ? 10 : "record" === t.t0 ? 15 : "share" === t.t0 ? 17 : "onOff" === t.t0 ? 28 : "activation" === t.t0 ? 30 : "updata" === t.t0 ? 32 : "track" === t.t0 ? 34 : "remote-setting" === t.t0 ? 36 : "fence" === t.t0 ? 38 : "self-check" === t.t0 ? 40 : "alarm-setting" === t.t0 ? 42 : "positioning-mode" === t.t0 ? 44 : "report" === t.t0 ? 46 : "log" === t.t0 ? 48 : "nav" === t.t0 ? 50 : "order" === t.t0 ? 52 : 54);
                  break;
                case 6:
                  return (uni.navigateTo({
                    url: "/pagesFunc/terminal/device-card"
                  }), t.abrupt("break", 55));
                case 8:
                  return ((0, m.qzGotoWx)({
                    id: n.selectedTerminal.id,
                    url: "/pagesPay/value-added/index",
                    access_token: n.access_token
                  }), t.abrupt("break", 55));
                case 10:
                  return (t.next = 12, n.Locateing(n.selectedTerminal.id));
                case 12:
                  return (t.sent.succeeded && (0, m.qzwlToast)(n.l("common.refurbish.locate"), "none"), t.abrupt("break", 55));
                case 15:
                  return (uni.navigateTo({
                    url: "/pagesFunc/terminal/audio/index"
                  }), t.abrupt("break", 55));
                case 17:
                  if (n.selectedTerminal.enablePositionShare) {
                    t.next = 19;
                    break;
                  }
                  return t.abrupt("return", n.$refs.qzwlShare.shareLocationShow = !0);
                case 19:
                  return (t.next = 21, n.getDeviceVipTypeList(8));
                case 21:
                  if (!n.vipTime) {
                    t.next = 23;
                    break;
                  }
                  return t.abrupt("return", n.$refs.qzwlShare.shareLocationShow = !0);
                case 23:
                  return (n.vipPopupData = {
                    title: ("\u5b9a\u4f4d\u5206\u4eab").concat(n.payState[1]),
                    content: ("\u5f53\u524d\u8bbe\u5907\u5b9a\u4f4d\u5206\u4eab\u670d\u52a1").concat(n.payState[0], "\uff0c\u662f\u5426\u524d\u5f80").concat(n.payState[1]),
                    description: "1. \u9650\u65f6\u5b9a\u4f4d\u5206\u4eab\u529f\u80fd\u4f7f\u7528\u6743\u9650\n2. 7*16\u5c0f\u65f6\u8fdc\u7a0b\u6280\u672f\u670d\u52a1\u652f\u6301\u4fdd\u969c\n3. \u7ec8\u8eab\u552e\u540e\u670d\u52a1\uff0c1\u5bf91\u5168\u7a0b\u670d\u52a1\n4. \u66f4\u591aAPP\u521b\u65b0\u529f\u80fd\u62a2\u5148\u514d\u8d39\u4f53\u9a8c"
                  }, n.vipPopupUrl = "/pagesPay/value-added/index?type=4", n.vipPopupShow = !0, t.abrupt("return"));
                case 28:
                  return (n.setDirective(0, "common.remote.onOff", "common.remote.onOff.introduce", "OffOn"), t.abrupt("break", 55));
                case 30:
                  return ((0, m.qzGotoWx)({
                    id: n.selectedTerminal.id,
                    url: "/pagesPay/appreciation/index",
                    access_token: n.access_token
                  }), t.abrupt("break", 55));
                case 32:
                  return (uni.navigateTo({
                    url: "/pagesFunc/deviceInfo/index"
                  }), t.abrupt("break", 55));
                case 34:
                  return (uni.navigateTo({
                    url: "/pagesFunc/terminal/locus/index"
                  }), t.abrupt("break", 55));
                case 36:
                  return (uni.navigateTo({
                    url: "/pagesFunc/terminal/remote-setup/index"
                  }), t.abrupt("break", 55));
                case 38:
                  return (uni.navigateTo({
                    url: "/pagesFunc/terminal/corral/list"
                  }), t.abrupt("break", 55));
                case 40:
                  return (uni.navigateTo({
                    url: "/pagesFunc/terminal/self-detection"
                  }), t.abrupt("break", 55));
                case 42:
                  return (uni.navigateTo({
                    url: "/pagesFunc/terminal/alerts-set/index"
                  }), t.abrupt("break", 55));
                case 44:
                  return (uni.navigateTo({
                    url: "/pagesFunc/terminal/locate-mode/index"
                  }), t.abrupt("break", 55));
                case 46:
                  return (uni.navigateTo({
                    url: "/pagesFunc/terminal/trip-report/list"
                  }), t.abrupt("break", 55));
                case 48:
                  return (uni.navigateTo({
                    url: "/pagesFunc/terminal/remote-setup/list"
                  }), t.abrupt("break", 55));
                case 50:
                  return (n.openNavigate(), t.abrupt("break", 55));
                case 52:
                  return (uni.navigateTo({
                    url: "/pagesPay/list/indent-device"
                  }), t.abrupt("break", 55));
                case 54:
                  return t.abrupt("break", 55);
                case 55:
                case "end":
                  return t.stop();
              }
            }, t);
          }))();
        },
        closeVipPopup: function () {
          this.vipPopupShow = !1;
        },
        gotoPages: function (e) {
          uni.navigateTo({
            url: e
          });
        },
        openNavigate: function () {
          this.selectedTerminal.lon && this.selectedTerminal.lat ? uni.openLocation({
            longitude: this.selectedTerminal.lon,
            latitude: this.selectedTerminal.lat,
            name: this.selectedTerminal.terminalNo,
            address: this.selectedTerminal.TextLocation,
            fail: function () {
              uni.showToast({
                title: h.$t("device.open.locate.fail"),
                icon: "none"
              });
            }
          }) : uni.showToast({
            title: h.$t("device.no-locate"),
            icon: "none"
          });
        },
        setDirective: function (e, t, n, a) {
          (this.popupType = e, this.directive = h.$t(t), this.describe = h.$t(n), this.param = a, this.funcPopupShow = !0);
        },
        getDeviceVipTypeList: function (t) {
          var n = this;
          return (async function () {
            var i;
            (i = await n.GetDeviceVipTypeList({
              terminalId: n.selectedTerminal.id,
              type: t
            }), e("log", "res", i, " at pages/ability/index.nvue:565"), i.succeeded && (i.data && (new Date(i.data.expirationTime) > new Date() && (n.vipTime = !0), n.payState = i.data.expirationTime ? ["\u5df2\u5230\u671f", "\u7eed\u8d39"] : ["\u672a\u5f00\u901a", "\u5f00\u901a"]), i.data || (n.payState = ["\u672a\u5f00\u901a", "\u5f00\u901a"])));
          })();
        }
      })
    };
    t.default = y;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
