// webpack 模块 400f  [svc]
// 出现于: pagesPay/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  (function (t) {
    var r = require("@/.unpacked/svc/47a9.js");
    (Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0);
    var s = r(require("@/.unpacked/svc/127e.js")), n = r(require("@/.unpacked/svc/ee10.js")), i = r(require("@/.unpacked/svc/7ca3.js")), c = require("vuex"), o = require("../../common/utils.js");
    function u(t, e) {
      var a = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(t);
        (e && (r = r.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })), a.push.apply(a, r));
      }
      return a;
    }
    function l(t) {
      for (var e = 1; e < arguments.length; e++) {
        var a = null != arguments[e] ? arguments[e] : {};
        e % 2 ? u(Object(a), !0).forEach(function (e) {
          (0, i.default)(t, e, a[e]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : u(Object(a)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
        });
      }
      return t;
    }
    var f = {
      methods: l(l(l({}, (0, c.mapActions)("order", ["CreateCardPackageOrderAuth", "GetCardPackageOrderState"])), (0, c.mapActions)("wechat", ["GetWechatUser"])), {}, {
        createOrderPay: function (e) {
          var a = this;
          return (0, n.default)(s.default.mark(function r() {
            var n, i;
            return s.default.wrap(function (r) {
              while (1) switch (r.prev = r.next) {
                case 0:
                  return (r.next = 2, a.CreateCardPackageOrderAuth(l({}, e)));
                case 2:
                  if ((n = r.sent, n.succeeded)) {
                    r.next = 6;
                    break;
                  }
                  return ((0, o.qzwlToast)(n.msg, "none"), r.abrupt("return"));
                case 6:
                  (i = n.data, t("log", i, "order", " at pagesPay/components/index.vue:26"), a.payment(i, e));
                case 9:
                case "end":
                  return r.stop();
              }
            }, r);
          }))();
        },
        payment: function (e, a) {
          var r, s = this;
          "wxpay" != a.provider || plus.runtime.isApplicationExist({
            pname: "com.tencent.mm",
            action: "weixin://"
          }) ? (r = {
            provider: a.provider,
            orderInfo: {
              appid: e.mchOrderInfo.appId,
              noncestr: e.mchOrderInfo.nonceStr,
              package: e.mchOrderInfo.packageValue,
              partnerid: e.mchOrderInfo.partnerId,
              prepayid: e.mchOrderInfo.prepayId,
              timestamp: e.mchOrderInfo.timeStamp,
              sign: e.mchOrderInfo.sign
            }
          }, uni.requestPayment(l(l({}, r), {}, {
            success: function (t) {
              s.getOrderState(e.id);
            },
            fail: function (e) {
              (-8 == e.code && (0, o.qzwlToast)("\u652f\u4ed8\u5931\u8d25\uff0c\u5fae\u4fe1\u5ba2\u6237\u7aef\u672a\u5b89\u88c5", "none"), -1 == e.errMsg.indexOf("fail cancel") && t("error", "uni.requestPayment:fail", e, " at pagesPay/components/index.vue:117"));
            }
          }))) : (0, o.qzwlToast)("\u8bf7\u5148\u5b89\u88c5\u5fae\u4fe1");
        },
        getOrderState: function (e) {
          var a = this;
          return (0, n.default)(s.default.mark(function r() {
            var i, c;
            return s.default.wrap(function (r) {
              while (1) switch (r.prev = r.next) {
                case 0:
                  return (c = (function () {
                    var t = async function () {
                      a.$emit("paySucces");
                      uni.navigateTo({
                        url: ("/pagesPay/paySuccess/index?outTradeNo=").concat(i.data.outTradeNo, "&payTime=").concat(i.data.payTime, "&totalFee=").concat(i.data.totalFee)
                      });
                      await a.sleepFunc(500);
                      (0, o.qzwlToast)("\u652f\u4ed8\u6210\u529f");
                    };
                    return function () {
                      return t.apply(this, arguments);
                    };
                  })(), r.next = 3, a.sleepFunc(1e3));
                case 3:
                  return (r.next = 5, a.GetCardPackageOrderState(e));
                case 5:
                  if ((i = r.sent, !i.succeeded || 1 != i.data.status)) {
                    r.next = 9;
                    break;
                  }
                  return (c(), r.abrupt("return"));
                case 9:
                  return (r.next = 11, a.sleepFunc(1e3));
                case 11:
                  return (r.next = 13, a.GetCardPackageOrderState(e));
                case 13:
                  if ((i = r.sent, t("log", i, "orderResult", " at pagesPay/components/index.vue:152"), !i.succeeded || 1 != i.data.status)) {
                    r.next = 18;
                    break;
                  }
                  return (c(), r.abrupt("return"));
                case 18:
                  return (r.next = 20, a.sleepFunc(1e3));
                case 20:
                  return (r.next = 22, a.GetCardPackageOrderState(e));
                case 22:
                  if ((i = r.sent, !i.succeeded || 1 != i.data.status)) {
                    r.next = 26;
                    break;
                  }
                  return (c(), r.abrupt("return"));
                case 26:
                case "end":
                  return r.stop();
              }
            }, r);
          }))();
        },
        sleepFunc: function (t) {
          return (async function () {
            return new Promise(function (e) {
              setTimeout(e, t);
            });
          })();
        }
      })
    };
    e.default = f;
  }).call(this, require("@/.unpacked/svc/f3b9.js")["default"]);
})(module, exports, __r);
