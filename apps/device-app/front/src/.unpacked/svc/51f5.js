// webpack 模块 51f5  [svc]
// 出现于: pagesPay/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  var r = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var s = r(require("@/.unpacked/svc/127e.js")), n = r(require("@/.unpacked/svc/ee10.js")), i = r(require("@/.unpacked/svc/7ca3.js")), c = require("vuex"), o = require("../../common/utils.js"), u = r(require("../../common/config.js")), l = r(require("../../components/CustomerService/CustomerService.vue")), f = r(require("../../components/Pay/Pay.vue")), d = r(require("../../components/PayMode/PayMode.vue")), p = r(require("../../components/GetBackApp/GetBackApp.vue"));
  function _(t, e) {
    var a = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      (e && (r = r.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), a.push.apply(a, r));
    }
    return a;
  }
  function v(t) {
    for (var e = 1; e < arguments.length; e++) {
      var a = null != arguments[e] ? arguments[e] : {};
      e % 2 ? _(Object(a), !0).forEach(function (e) {
        (0, i.default)(t, e, a[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : _(Object(a)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
      });
    }
    return t;
  }
  var y = getApp().globalData, m = {
    components: {
      PayMode: d.default,
      CustomerService: l.default,
      Pay: f.default,
      GetBackApp: p.default
    },
    data: function () {
      return {
        cdn: u.default.cdn,
        packages: [],
        selectedPackage: null,
        price: "-",
        openid: null,
        addedInfo: null,
        payType: "wxpay",
        videoContext: null
      };
    },
    computed: v(v({}, (0, c.mapGetters)(["selectedTerminal", "appConfig", "userType", "sysInfo"])), {}, {
      iconCode: function () {
        if (this.selectedTerminal && this.appConfig) return ("").concat(this.cdn, "/ikon/").concat((0, o.getTerminalIconCode)(this.selectedTerminal.iconType, this.appConfig.icons).code, "-1@2x.png");
      },
      payDisabled: function () {
        if (this.addedInfo) return "9999" == this.addedInfo.expirationTime.substr(0, 4);
      },
      addValueExpirationTime: function () {
        var t;
        return (t = this.addedInfo && this.addedInfo.expirationTime ? "9999" == this.addedInfo.expirationTime.substr(0, 4) ? "\u7ec8\u8eab" : new Date(this.addedInfo.expirationTime) < new Date() ? "\u672a\u6fc0\u6d3b" : this.addedInfo.expirationTime : "\u672a\u6fc0\u6d3b", t);
      }
    }),
    onLoad: function () {
      (this.getActivationPackage(), this.getDeviceConfig());
    },
    onShow: function () {},
    watch: {
      payDisabled: {
        handler: function (t) {
          t && this.clearSelectedPackage();
        }
      }
    },
    methods: v(v(v({}, (0, c.mapActions)("packageInfo", ["GetPackage", "GetDeviceVipTypeList"])), (0, c.mapMutations)("device", ["setActivationState", "setInfoBoxShow"])), {}, {
      l: function (t) {
        return y.$t(t);
      },
      getDeviceConfig: function () {
        var t = this;
        return (async function () {
          var a;
          (a = await t.GetDeviceVipTypeList({
            terminalId: t.selectedTerminal.id,
            type: 6
          }), a.succeeded && (t.addedInfo = a.data));
        })();
      },
      getActivationPackage: function () {
        var t = this;
        return (0, n.default)(s.default.mark(function e() {
          var a;
          return s.default.wrap(function (e) {
            while (1) switch (e.prev = e.next) {
              case 0:
                return (e.next = 2, t.GetPackage({
                  deviceId: t.selectedTerminal.id,
                  path: "activation"
                }));
              case 2:
                if ((a = e.sent, a.succeeded && 0 != a.data.length)) {
                  e.next = 9;
                  break;
                }
                return (setTimeout(function () {
                  uni.showToast({
                    title: y.$t("common.no-package"),
                    icon: "none"
                  });
                }, 100), e.next = 7, y.$sleep(1500));
              case 7:
                return (uni.navigateBack(), e.abrupt("return"));
              case 9:
                (t.packages = a.data.map(function (t) {
                  return v(v({}, t), {}, {
                    borderShow: !1
                  });
                }), t.packages[0].borderShow = !0, t.selectedPackage = v(v({}, t.packages[0]), {}, {
                  index: 0
                }), t.price = t.selectedPackage.price / 100);
              case 13:
              case "end":
                return e.stop();
            }
          }, e);
        }))();
      },
      selectHandler: function (t, e) {
        this.payDisabled || (this.packages = this.packages.map(function (t) {
          return v(v({}, t), {}, {
            borderShow: !1
          });
        }), this.packages[e].borderShow = !0, this.selectedPackage = v(v({}, t), {}, {
          index: e
        }), this.price = this.selectedPackage.price / 100);
      },
      clearSelectedPackage: function () {
        (this.packages = this.packages.map(function (t) {
          return v(v({}, t), {}, {
            borderShow: !1
          });
        }), this.selectedPackage = null, this.price = "-");
      },
      changePayType: function (t) {
        this.payType = t;
      },
      confirmBuy: function () {
        var t = this;
        return (async function () {
          t.$refs.Pay.createOrderPay({
            provider: t.payType,
            productId: t.selectedPackage.id,
            terminalId: t.selectedTerminal.id
          });
        })();
      },
      paySucces: function (t) {
        (this.getDeviceConfig(), this.setActivationState(1), this.setInfoBoxShow(!0), uni.showTabBar());
      }
    })
  };
  e.default = m;
})(module, exports, __r);
