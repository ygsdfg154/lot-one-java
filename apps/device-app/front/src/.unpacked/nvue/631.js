// webpack 模块 631  [nvue]
// 出现于: pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var i = a(require("@/.unpacked/nvue/22.js")), r = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = require("../../common/utils.nvue.js"), u = a(require("../../common/config.nvue.js")), l = (a(require("moment")), a(require("../../components/_unnamed/unknown-962.nvue"))), c = a(require("../../components/Pay/Pay.nvue")), _ = a(require("../../components/CustomerService/CustomerService.nvue")), m = a(require("../../components/GetBackApp/GetBackApp.nvue")), f = a(require("../../components/PayMode/PayMode.nvue"));
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
  function h(e) {
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
  var y = getApp().globalData, M = {
    components: {
      SelectedCard: l.default,
      PayMode: f.default,
      CustomerService: _.default,
      Pay: c.default,
      GetBackApp: m.default
    },
    data: function () {
      return {
        cdn: u.default.cdn,
        src: u.default.cdn + "/draw/wxHeDefault.png",
        selectedTypeItem: null,
        titleColor: u.default.titleColor,
        primaryColor: u.default.primaryColor,
        tabsStyle: {
          color: u.default.primaryColor,
          fontSize: "32rpx"
        },
        inactiveStyle: {
          color: "#A3A3A3",
          fontSize: "32rpx"
        },
        vipTime: "",
        totalText: "",
        remain: 0,
        minTotal: 0,
        pgkList: [],
        selectedPgk: null,
        noMoney: !1,
        payType: "wxpay"
      };
    },
    computed: h(h({}, (0, s.mapGetters)(["selectedTerminal", "username", "sysInfo"])), {}, {
      marginTop: function () {
        return this.sysInfo.statusBarHeight + 44 + "px";
      },
      selectedContent: function () {
        return this.selectedPgk ? this.selectedPgk.pkgDesc : "";
      },
      typeList: function () {
        var e = !!this.selectedTerminal && this.selectedTerminal.enableRecord, t = !!this.selectedTerminal && this.selectedTerminal.enablePositionMode, n = !!this.selectedTerminal && this.selectedTerminal.enableTrack, a = !!this.selectedTerminal && this.selectedTerminal.enablePositionShare, i = !!this.selectedTerminal && this.selectedTerminal.enableWechatAlarm;
        i = u.default.wechatAlarm.enable && i;
        var r = !!this.selectedTerminal && this.selectedTerminal.enableTelAlarm;
        r = u.default.telAlarm.enable && r;
        var o = !!this.selectedTerminal && this.selectedTerminal.enableSmsAlarm;
        o = u.default.smsAlarm.enable && o;
        var s = [];
        (i && s.push({
          id: 0,
          name: "\u5fae\u4fe1\u544a\u8b66",
          tabPgkPath: "wx"
        }), r && s.push({
          id: 1,
          name: "\u7535\u8bdd\u544a\u8b66",
          tabPgkPath: "tel"
        }), o && s.push({
          id: 2,
          name: "\u77ed\u4fe1\u544a\u8b66",
          tabPgkPath: "sms"
        }));
        var d = [], l = {
          id: 2,
          name: t ? "\u79d2\u5b9a\u670d\u52a1" : "\u8f68\u8ff9\u670d\u52a1",
          color: "#1FC886",
          type: t ? 3 : 7,
          pgkPath: t ? "position-mode" : "track",
          pgkClass: "package-box-position-mode"
        }, c = {
          id: 3,
          name: "\u544a\u8b66\u670d\u52a1",
          color: "#FFC300",
          pgkPath: s.length ? s[0].tabPgkPath : "",
          pgkClass: "package-box-tel",
          tabList: s.length ? s : [],
          typeListCurrent: s.length ? s[0] : {}
        };
        return ((i || r || o) && d.push(c), a && d.unshift({
          id: 4,
          name: "\u5206\u4eab\u670d\u52a1",
          color: "#f62a0b",
          type: 8,
          pgkPath: "position-share",
          pgkClass: "package-box-share"
        }), (t || n) && d.unshift(l), e && d.unshift({
          id: 1,
          name: "\u5b89\u9632\u670d\u52a1",
          color: "#6081C7",
          type: 5,
          pgkPath: "record",
          pgkClass: "package-box-record"
        }), d);
      }
    }),
    onLoad: function (e) {
      e.type ? (this.selectedTypeItem = this.typeList.find(function (t) {
        return t.id == e.type;
      }), e.alarm && (this.selectedTypeItem.typeListCurrent = this.selectedTypeItem.tabList.find(function (t) {
        return t.id == e.alarm;
      }), this.selectedTypeItem.pgkPath = this.selectedTypeItem.typeListCurrent.tabPgkPath)) : this.selectedTypeItem = this.typeList[0];
    },
    onShow: function () {
      this.getInfo();
    },
    methods: h(h(h(h(h({}, (0, s.mapActions)("device", ["GetDeviceInfo"])), (0, s.mapActions)("alarm", ["GetAlarmSettings"])), (0, s.mapActions)("packageInfo", ["GetDeviceVipTypeList", "GetPackage"])), (0, s.mapActions)("wechat", ["GetWechatUser", "GetWxSign"])), {}, {
      l: function (e) {
        return y.$t(e);
      },
      getInfo: function () {
        var e = this;
        return (0, r.default)(i.default.mark(function t() {
          var n, a, r, o;
          return i.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if ((e.noMoney = !1, 3 == e.selectedTypeItem.id)) {
                  t.next = 9;
                  break;
                }
                return (t.next = 4, e.GetDeviceVipTypeList({
                  terminalId: e.selectedTerminal.id,
                  type: e.selectedTypeItem.type
                }));
              case 4:
                (n = t.sent, e.vipTime = "", n.succeeded && (n.data && (new Date(n.data.expirationTime) > new Date() ? (e.vipTime = "9999" == n.data.expirationTime.substring(0, 4) ? "\u7ec8\u8eab\u4f1a\u5458" : n.data.expirationTime, e.noMoney = !0) : e.vipTime = 1 != e.selectedTypeItem.id ? "\u5f53\u524d\u65e0\u670d\u52a1\u4fe1\u606f" : ""), n.data || (e.vipTime = 1 != e.selectedTypeItem.id ? "\u5f53\u524d\u65e0\u670d\u52a1\u4fe1\u606f" : "")), t.next = 11);
                break;
              case 9:
                (e.vipTime = "", e.noMoney = !1);
              case 11:
                if (1 != e.selectedTypeItem.id && 3 != e.selectedTypeItem.id) {
                  t.next = 30;
                  break;
                }
                if (1 != e.selectedTypeItem.id) {
                  t.next = 20;
                  break;
                }
                return (t.next = 15, e.GetDeviceInfo({
                  deviceID: e.selectedTerminal.id,
                  loading: !0
                }));
              case 15:
                (a = t.sent, e.remain = 0, e.minTotal = 0, e.totalText = "", a.succeeded && (e.totalText = a.data.extendInfo.recordMinTotal >= 99999999 ? "\u4e0d\u9650\u91cf\u5957\u9910" : "", e.remain = a.data.extendInfo.recordMinRemain, e.minTotal = a.data.extendInfo.recordMinTotal));
              case 20:
                if (3 != e.selectedTypeItem.id) {
                  t.next = 28;
                  break;
                }
                return (t.next = 23, e.GetAlarmSettings());
              case 23:
                (r = t.sent, e.remain = 0, e.minTotal = 0, e.totalText = "", r.succeeded && e.selectedTypeItem.typeListCurrent && e.alarmChange(r.data));
              case 28:
                t.next = 33;
                break;
              case 30:
                (e.remain = 0, e.minTotal = 0, e.totalText = "");
              case 33:
                return (t.next = 35, e.GetPackage({
                  path: e.selectedTypeItem.pgkPath,
                  deviceId: e.selectedTerminal.id
                }));
              case 35:
                (o = t.sent, e.pgkList = [], e.selectedPgk = null, o.succeeded && (e.pgkList = o.data, e.selectedPgk = e.pgkList[0]));
              case 39:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      clearData: function () {},
      changeType: function (e) {
        (this.selectedTypeItem = e, this.getInfo());
      },
      changePgk: function (e) {
        this.selectedPgk = e;
      },
      typeStateChange: function (e) {
        (this.selectedTypeItem.typeListCurrent = e, this.selectedTypeItem.pgkPath = e.tabPgkPath, this.getInfo());
      },
      alarmChange: function (e) {
        (0 == this.selectedTypeItem.typeListCurrent.id && (this.totalText = e.wechatTotal >= 99999999 ? "\u4e0d\u9650\u91cf\u5957\u9910" : "", this.remain = e.wechatRemain, this.minTotal = e.wechatTotal), 1 == this.selectedTypeItem.typeListCurrent.id && (this.totalText = e.telTotal >= 99999999 ? "\u4e0d\u9650\u91cf\u5957\u9910" : "", this.remain = e.telRemain, this.minTotal = e.telTotal), 2 == this.selectedTypeItem.typeListCurrent.id && (this.totalText = e.smsTotal >= 99999999 ? "\u4e0d\u9650\u91cf\u5957\u9910" : "", this.remain = e.smsRemain, this.minTotal = e.smsTotal));
      },
      changePayType: function (e) {
        this.payType = e;
      },
      confirmBuy: function () {
        var e = this;
        return (0, r.default)(i.default.mark(function t() {
          return i.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if (e.selectedPgk) {
                  t.next = 2;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)("\u5f53\u524d\u6ca1\u6709\u5957\u9910\u53ef\u4ee5\u8d2d\u4e70"));
              case 2:
                if ("\u4e0d\u9650\u91cf\u5957\u9910" != e.totalText && "\u7ec8\u8eab\u4f1a\u5458" != e.vipTime) {
                  t.next = 4;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)("\u60a8\u5df2\u7ecf\u8d2d\u4e70\u4e86\u4e0d\u9650\u91cf\u5957\u9910\u6216\u7ec8\u8eab\u4f1a\u5458\uff0c\u5f53\u524d\u4e0d\u9700\u8981\u518d\u6b21\u8d2d\u4e70"));
              case 4:
                e.$refs.Pay.createOrderPay({
                  provider: e.payType,
                  productId: e.selectedPgk.id,
                  terminalId: e.selectedTerminal.id
                });
              case 5:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      paySucces: function (e) {},
      gotoPages: function () {
        uni.navigateBack();
      },
      contactService: function () {
        uni.navigateTo({
          url: "/pagesMore/my/support"
        });
      }
    })
  };
  t.default = M;
})(module, exports, __r);
