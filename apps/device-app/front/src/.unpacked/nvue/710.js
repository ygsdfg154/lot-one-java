// webpack 模块 710  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = a(require("../../common/config.nvue.js")), u = require("../../common/utils.nvue.js");
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
    function _(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? l(Object(n), !0).forEach(function (t) {
          (0, s.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var c = getApp().globalData, m = {
      data: function () {
        return {
          primaryColor: d.default.primaryColor,
          cdn: d.default.cdn,
          id: null,
          loadingList: {
            wechat: !1,
            push: !1,
            sms: !1,
            tel: !1,
            sos: !1,
            dismantle: !1,
            battery: !1,
            vibration: !1,
            speed: !1,
            fence: !1,
            cutPower: !1,
            voice: !1,
            rest: !1,
            offline: !1
          },
          stateOnList: {
            push: !1,
            wechat: !1,
            sms: !1,
            tel: !1,
            sos: !1,
            dismantle: !1,
            battery: !1,
            vibration: !1,
            speed: !1,
            fence: !1,
            cutPower: !1,
            voice: !1,
            rest: !1,
            offline: !1
          },
          wechatNickname: "",
          wechatHeadimgurl: "",
          wechatTextOn: !1,
          telSum: 0,
          smsSum: 0,
          code: ""
        };
      },
      computed: _(_(_({}, (0, o.mapGetters)(["selectedTerminal", "terminalFuncs", "appConfig", "sysInfo", "pushClientId"])), (0, o.mapState)("wechat", ["wechatUserInfo"])), {}, {
        pushState: function () {
          return this.showWechatAlarm || this.showTelAlarm || this.showSmsAlarm || this.showPushAlarm;
        },
        showPushAlarm: function () {
          if ("ios" == this.sysInfo.platform) {
            var e = !!this.selectedTerminal && this.selectedTerminal.enablePushAlarm;
            return d.default.pushAlarm.enable && e;
          }
          return !1;
        },
        showWechatAlarm: function () {
          var e = !!this.selectedTerminal && this.selectedTerminal.enableWechatAlarm;
          return d.default.wechatAlarm.enable && e;
        },
        showTelAlarm: function () {
          var e = !!this.selectedTerminal && this.selectedTerminal.enableTelAlarm;
          return d.default.telAlarm.enable && e;
        },
        showSmsAlarm: function () {
          var e = !!this.selectedTerminal && this.selectedTerminal.enableSmsAlarm;
          return d.default.smsAlarm.enable && e;
        }
      }),
      onShow: function () {
        this.fetchData();
      },
      onLoad: function () {},
      onHide: function () {
        this.setWechatUserInfo(null);
      },
      methods: _(_(_(_({}, (0, o.mapMutations)("wechat", ["setWechatUserInfo"])), (0, o.mapActions)("wechat", ["GetWechatUser", "GetWxSign"])), (0, o.mapActions)("alarm", ["GetAlarmSettings", "SetWechatOn", "SetWechatAlarm", "SetTelAlarmNotice", "SetSmsAlarmNotice", "SetPushOn", "SetFenceAlarm", "SetVibrationAlarm", "SetSosAlarm", "SetTearAlarm", "SetLowPowerAlarm", "SetSpeedAlarm", "SetPowerOffAlarm", "SetVoiceAlarm", "SetRestAlarm", "SetOfflineAlarm"])), {}, {
        l: function (e) {
          return c.$t(e);
        },
        fetchData: function () {
          var e = this;
          return (async function () {
            var n, a, i, s, o, d;
            (n = await e.GetAlarmSettings()).succeeded && (a = {
              wechat: n.data.wechatOn,
              push: n.data.pushOn,
              tel: n.data.telOn,
              sms: n.data.smsOn,
              fence: n.data.fenceOn,
              sos: n.data.sosOn,
              dismantle: n.data.tearOn,
              battery: n.data.lowPowerOn,
              vibration: n.data.vibrationOn,
              speed: n.data.speedOn,
              cutPower: n.data.powerOffOn,
              voice: n.data.voiceOn,
              rest: n.data.restOn,
              offline: n.data.offlineOn
            }, e.stateOnList = a, e.wechatTextOn = e.stateOnList.wechat, e.id = n.data.id, e.loadingList.wechat = !1, e.wechatNickname = n.data.wechatNickname || c.$t("tel-pay.wx-anonymous"), e.wechatHeadimgurl = n.data.wechatHeadimgurl || e.cdn + "/draw/wcDefault.png", i = [n.data.telPhoneNo1, n.data.telPhoneNo2, n.data.telPhoneNo3, n.data.telPhoneNo4, n.data.telPhoneNo5, n.data.telPhoneNo6], s = [n.data.smsPhoneNo1, n.data.smsPhoneNo2, n.data.smsPhoneNo3, n.data.smsPhoneNo4, n.data.smsPhoneNo5, n.data.smsPhoneNo6], o = 0, e.telSum = i.reduce(function (e, t) {
              return o = t ? ++o : o;
            }, 0), d = 0, e.smsSum = s.reduce(function (e, t) {
              return d = t ? ++d : d;
            }, 0));
          })();
        },
        sosHandler: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.sos = !0;
            ((a = await t.SetSosAlarm({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.sos = !1, (0, u.qzwlToast)(e ? c.$t("common.open.sos.alarm") : c.$t("common.close.sos.alarm"), "none")), a.succeeded || (t.loadingList.sos = !1, t.stateOnList.sos = !e));
          })();
        },
        dismantleHandler: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.dismantle = !0;
            ((a = await t.SetTearAlarm({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.dismantle = !1, (0, u.qzwlToast)(e ? c.$t("common.open.dismantle.alarm") : c.$t("common.close.dismantle.alarm"), "none")), a.succeeded || (t.loadingList.dismantle = !1, t.stateOnList.dismantle = !e));
          })();
        },
        batteryHandler: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.battery = !0;
            ((a = await t.SetLowPowerAlarm({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.battery = !1, (0, u.qzwlToast)(e ? c.$t("common.open.battery.alarm") : c.$t("common.close.battery.alarm"), "none")), a.succeeded || (t.loadingList.battery = !1, t.stateOnList.battery = !e));
          })();
        },
        vibrationHandler: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.vibration = !0;
            ((a = await t.SetVibrationAlarm({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.vibration = !1, (0, u.qzwlToast)(e ? c.$t("common.open.vibration.alarm") : c.$t("common.close.vibration.alarm"), "none")), a.succeeded || (t.loadingList.vibration = !1, t.stateOnList.vibration = !e));
          })();
        },
        speedHandler: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.speed = !0;
            ((a = await t.SetSpeedAlarm({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.speed = !1, (0, u.qzwlToast)(e ? c.$t("common.open.speed.alarm") : c.$t("common.close.speed.alarm"), "none")), a.succeeded || (t.loadingList.speed = !1, t.stateOnList.speed = !e));
          })();
        },
        fenceHandler: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.fence = !0;
            ((a = await t.SetFenceAlarm({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.fence = !1, (0, u.qzwlToast)(e ? c.$t("common.open.enclosure.alarm") : c.$t("common.close.enclosure.alarm"), "none")), a.succeeded || (t.loadingList.fence = !1, t.stateOnList.fence = !e));
          })();
        },
        cutPowerHandler: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.cutPower = !0;
            ((a = await t.SetPowerOffAlarm({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.cutPower = !1, (0, u.qzwlToast)(e ? c.$t("common.open.cutPower.alarm") : c.$t("common.close.cutPower.alarm"), "none")), a.succeeded || (t.loadingList.cutPower = !1, t.stateOnList.cutPower = !e));
          })();
        },
        voiceHandler: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.voice = !0;
            ((a = await t.SetVoiceAlarm({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.voice = !1, (0, u.qzwlToast)(e ? c.$t("common.open.voice.alarm") : c.$t("common.close.voice.alarm"), "none")), a.succeeded || (t.loadingList.voice = !1, t.stateOnList.voice = !e));
          })();
        },
        restHandler: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.rest = !0;
            ((a = await t.SetRestAlarm({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.rest = !1, (0, u.qzwlToast)(e ? "\u5f00\u542f\u9759\u6b62\u544a\u8b66\u6210\u529f" : "\u5173\u95ed\u9759\u6b62\u544a\u8b66\u6210\u529f", "none")), a.succeeded || (t.loadingList.rest = !1, t.stateOnList.rest = !e));
          })();
        },
        offlineHandler: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.offline = !0;
            ((a = await t.SetOfflineAlarm({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.offline = !1, (0, u.qzwlToast)(e ? "\u5f00\u542f\u79bb\u7ebf\u544a\u8b66\u6210\u529f" : "\u5173\u95ed\u79bb\u7ebf\u544a\u8b66\u6210\u529f", "none")), a.succeeded || (t.loadingList.offline = !1, t.stateOnList.offline = !e));
          })();
        },
        changeWechatOn: function (t) {
          var n = this;
          return (0, i.default)(r.default.mark(function a() {
            var s;
            return r.default.wrap(function (a) {
              for (; ; ) switch (a.prev = a.next) {
                case 0:
                  if ((n.loadingList.wechat = !0, !t)) {
                    a.next = 5;
                    break;
                  }
                  (uni.login({
                    provider: "weixin",
                    onlyAuthorize: !0,
                    success: (function () {
                      var t = (0, i.default)(r.default.mark(function t(a) {
                        var i, s, o;
                        return r.default.wrap(function (t) {
                          for (; ; ) switch (t.prev = t.next) {
                            case 0:
                              return (e("log", a.code, "loginRes.code", " at pagesFunc/terminal/alerts-set/index.nvue:666"), t.next = 3, n.GetWechatUser({
                                code: a.code,
                                type: 1
                              }));
                            case 3:
                              if ((i = t.sent, e("log", i, "res1", " at pagesFunc/terminal/alerts-set/index.nvue:675"), !i.succeeded)) {
                                t.next = 24;
                                break;
                              }
                              return (t.next = 8, n.SetWechatOn(_(_({}, i.data), {}, {
                                id: n.id
                              })));
                            case 8:
                              if (!(s = t.sent).succeeded) {
                                t.next = 20;
                                break;
                              }
                              return (e("log", s, "res2", " at pagesFunc/terminal/alerts-set/index.nvue:680"), (0, u.qzwlToast)(s.msg, "none"), o = s.data.wechatOn, n.stateOnList.wechat = o, n.wechatNickname = s.data.wechatNickname || c.$t("tel-pay.wx-anonymous"), n.wechatHeadimgurl = s.data.wechatHeadimgurl || n.cdn + "/draw/wcDefault.png", n.wechatTextOn = n.stateOnList.wechat, t.abrupt("return"));
                            case 20:
                              (0, u.qzwlToast)(s.msg, "none");
                            case 21:
                              (8001 === s.code && n.gotoPage(("/pagesFunc/terminal/alerts-set/wx-mp?wechatId=").concat(n.id)), t.next = 25);
                              break;
                            case 24:
                              (0, u.qzwlToast)(i.msg, "none");
                            case 25:
                              (n.stateOnList.wechat = !1, n.wechatTextOn = n.stateOnList.wechat);
                            case 27:
                            case "end":
                              return t.stop();
                          }
                        }, t);
                      }));
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })(),
                    fail: function (e) {
                      (n.stateOnList.wechat = !1, n.wechatTextOn = n.stateOnList.wechat, (0, u.qzwlToast)(c.$t("alarm-setup.bindwx-faild"), "none"));
                    },
                    complete: function (e) {
                      n.loadingList.wechat = !1;
                    }
                  }), a.next = 11);
                  break;
                case 5:
                  return (a.next = 7, n.SetWechatAlarm({
                    id: n.id
                  }));
                case 7:
                  (s = a.sent, n.loadingList.wechat = !1, s.succeeded ? (n.stateOnList.wechat = !1, n.wechatTextOn = n.stateOnList.wechat) : (n.stateOnList.wechat = !0, n.wechatTextOn = n.stateOnList.wechat), (0, u.qzwlToast)(s.msg, "none"));
                case 11:
                case "end":
                  return a.stop();
              }
            }, a);
          }))();
        },
        setTelAlarmNotice: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.tel = !0;
            ((a = await t.SetTelAlarmNotice({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.tel = !1, (0, u.qzwlToast)(e ? c.$t("common.open.tel") : c.$t("common.close.tel"), "none")), a.succeeded || (t.loadingList.tel = !1, t.stateOnList.tel = !e));
          })();
        },
        setSmsAlarmNotice: function (e) {
          var t = this;
          return (async function () {
            var a;
            t.loadingList.sms = !0;
            ((a = await t.SetSmsAlarmNotice({
              id: t.id,
              status: e
            })).succeeded && (t.loadingList.sms = !1, (0, u.qzwlToast)(e ? c.$t("common.open.sms") : c.$t("common.close.sms"), "none")), a.succeeded || (t.loadingList.sms = !1, t.stateOnList.sms = !e));
          })();
        },
        setPushOn: function (e) {
          var t = this;
          return (0, i.default)(r.default.mark(function n() {
            var a;
            return r.default.wrap(function (n) {
              for (; ; ) switch (n.prev = n.next) {
                case 0:
                  if (t.pushClientId) {
                    n.next = 4;
                    break;
                  }
                  return ((0, u.qzwlToast)(c.$t("set.fail"), "none"), t.stateOnList.push = !e, n.abrupt("return"));
                case 4:
                  return (t.loadingList.push = !0, n.next = 7, t.SetPushOn({
                    id: t.id,
                    status: e
                  }));
                case 7:
                  ((a = n.sent).succeeded && (t.loadingList.push = !1, (0, u.qzwlToast)(e ? c.$t("common.open.app") : c.$t("common.close.app"), "none")), a.succeeded || (t.loadingList.push = !1, t.stateOnList.push = !e));
                case 10:
                case "end":
                  return n.stop();
              }
            }, n);
          }))();
        },
        gotoPage: function (e) {
          uni.navigateTo({
            url: e
          });
        },
        terminalFuncShow: function (e) {
          return (0, u.funcShowHandler)(this.terminalFuncs, e);
        }
      })
    };
    t.default = m;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
