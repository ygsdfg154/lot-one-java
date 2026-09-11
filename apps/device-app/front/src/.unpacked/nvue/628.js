// webpack 模块 628  [nvue]
// 出现于: pagesPay/card/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = require("../../common/utils.nvue.js"), u = (a(require("../../common/config.nvue.js")), a(require("../../components/CustomerService/CustomerService.nvue"))), _ = a(require("../../components/Pay/Pay.nvue")), l = a(require("../../components/PayMode/PayMode.nvue")), c = a(require("../../components/GetBackApp/GetBackApp.nvue"));
  function m(e, t) {
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
      t % 2 ? m(Object(n), !0).forEach(function (t) {
        (0, s.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : m(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var p = getApp().globalData, h = {
    components: {
      PayMode: l.default,
      CustomerService: u.default,
      Pay: _.default,
      GetBackApp: c.default
    },
    data: function () {
      return {
        packagesList: [{
          title: "\u6d41\u91cf\u53e0\u52a0\u5305",
          desc: "\u5f53\u6708\u6709\u6548",
          items: []
        }, {
          title: "\u5e74\u5361\u5957\u9910",
          desc: "\u6709\u9650\u671f\u4e00\u5e74",
          items: []
        }, {
          title: p.$t("pay.pay.SMS"),
          desc: p.$t("pay.effective.upon.arrival"),
          items: []
        }],
        selectSimPackage: null,
        iccid: "",
        paySuccess: !1,
        openid: null,
        payType: "wxpay"
      };
    },
    computed: f(f({}, (0, o.mapState)("wechat", ["wechatUserInfo"])), (0, o.mapGetters)(["selectedTerminal"])),
    onLoad: function (e) {
      var t = this;
      return (async function () {
        (t.iccid = e.iccid, t.iccid && t.getSimCardPackage());
      })();
    },
    onShow: function () {
      this.paySuccess && uni.navigateBack();
    },
    methods: f(f(f({}, (0, o.mapActions)("packageInfo", ["GetSimCardPackage"])), (0, o.mapActions)("wechat", ["GetWechatUser", "GetWxSign"])), {}, {
      l: function (e) {
        return p.$t(e);
      },
      getSimCardPackage: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          var n, a;
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                return (t.next = 2, e.GetSimCardPackage({
                  iccid: e.iccid
                }));
              case 2:
                if ((n = t.sent).succeeded && n.data.length) {
                  t.next = 9;
                  break;
                }
                return ((0, d.qzwlToast)(p.$t("common.no-package"), "none"), t.next = 7, p.$sleep(1500));
              case 7:
                return (uni.navigateBack(), t.abrupt("return"));
              case 9:
                (n = n.data.map(function (e) {
                  return (e.isShow = !1, e);
                }), e.packagesList[0].items = n.filter(function (e) {
                  return 2 === e.pkgCategory;
                }), e.packagesList[0].items.length && e.packagesList[0].items.sort(function (e, t) {
                  return e.pkgOrder - t.pkgOrder;
                }), e.packagesList[1].items = n.filter(function (e) {
                  return 1 === e.pkgCategory;
                }), e.packagesList[2].items = n.filter(function (e) {
                  return 3 === e.pkgCategory;
                }), a = 0, e.packagesList[0].items.length || (a = 1), e.packagesList[0].items.length || e.packagesList[1].items.length || (a = 2), e.code || e.selectPackage(a, 0));
              case 18:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      selectPackage: function (e, t) {
        (this.packagesList = this.packagesList.map(function (e) {
          return (e.items.forEach(function (e) {
            e.isShow = !1;
          }), e);
        }), this.packagesList[e].items[t].isShow = !0, this.selectSimPackage = f(f({}, this.packagesList[e].items[t]), {}, {
          index: e,
          sindex: t
        }));
      },
      changePayType: function (e) {
        this.payType = e;
      },
      confirmPay: function () {
        var e = this;
        return (async function () {
          e.$refs.Pay.createOrderPay({
            productId: e.selectSimPackage.id,
            provider: e.payType,
            iccid: e.iccid,
            terminalId: e.selectedTerminal.id
          });
        })();
      },
      paySucces: function (e) {
        this.paySuccess = !0;
      }
    })
  };
  t.default = h;
})(module, exports, __r);
