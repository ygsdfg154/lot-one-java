// webpack 模块 395  [nvue]
// 出现于: pagesPay/card/index.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = require("../../common/utils.nvue.js");
    function u(e, t) {
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
        t % 2 ? u(Object(n), !0).forEach(function (t) {
          (0, s.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var l = {
      methods: _(_(_({}, (0, o.mapActions)("order", ["CreateCardPackageOrderAuth", "GetCardPackageOrderState"])), (0, o.mapActions)("wechat", ["GetWechatUser"])), {}, {
        createOrderPay: function (t) {
          var n = this;
          return (0, i.default)(r.default.mark(function a() {
            var i, s;
            return r.default.wrap(function (a) {
              for (; ; ) switch (a.prev = a.next) {
                case 0:
                  return (a.next = 2, n.CreateCardPackageOrderAuth(_({}, t)));
                case 2:
                  if ((i = a.sent).succeeded) {
                    a.next = 6;
                    break;
                  }
                  return ((0, d.qzwlToast)(i.msg, "none"), a.abrupt("return"));
                case 6:
                  (s = i.data, e("log", s, "order", " at pagesPay/components/index.vue:26"), n.payment(s, t));
                case 9:
                case "end":
                  return a.stop();
              }
            }, a);
          }))();
        },
        payment: function (t, n) {
          var a, r = this;
          "wxpay" != n.provider || plus.runtime.isApplicationExist({
            pname: "com.tencent.mm",
            action: "weixin://"
          }) ? (a = {
            provider: n.provider,
            orderInfo: {
              appid: t.mchOrderInfo.appId,
              noncestr: t.mchOrderInfo.nonceStr,
              package: t.mchOrderInfo.packageValue,
              partnerid: t.mchOrderInfo.partnerId,
              prepayid: t.mchOrderInfo.prepayId,
              timestamp: t.mchOrderInfo.timeStamp,
              sign: t.mchOrderInfo.sign
            }
          }, uni.requestPayment(_(_({}, a), {}, {
            success: function (e) {
              r.getOrderState(t.id);
            },
            fail: function (t) {
              (-8 == t.code && (0, d.qzwlToast)("\u652f\u4ed8\u5931\u8d25\uff0c\u5fae\u4fe1\u5ba2\u6237\u7aef\u672a\u5b89\u88c5", "none"), -1 == t.errMsg.indexOf("fail cancel") && e("error", "uni.requestPayment:fail", t, " at pagesPay/components/index.vue:117"));
            }
          }))) : (0, d.qzwlToast)("\u8bf7\u5148\u5b89\u88c5\u5fae\u4fe1");
        },
        getOrderState: function (t) {
          var n = this;
          return (0, i.default)(r.default.mark(function a() {
            var s, o;
            return r.default.wrap(function (a) {
              for (; ; ) switch (a.prev = a.next) {
                case 0:
                  return (o = (function () {
                    var e = async function () {
                      n.$emit("paySucces");
                      uni.navigateTo({
                        url: ("/pagesPay/paySuccess/index?outTradeNo=").concat(s.data.outTradeNo, "&payTime=").concat(s.data.payTime, "&totalFee=").concat(s.data.totalFee)
                      });
                      await n.sleepFunc(500);
                      (0, d.qzwlToast)("\u652f\u4ed8\u6210\u529f");
                    };
                    return function () {
                      return e.apply(this, arguments);
                    };
                  })(), a.next = 3, n.sleepFunc(1e3));
                case 3:
                  return (a.next = 5, n.GetCardPackageOrderState(t));
                case 5:
                  if (!(s = a.sent).succeeded || 1 != s.data.status) {
                    a.next = 9;
                    break;
                  }
                  return (o(), a.abrupt("return"));
                case 9:
                  return (a.next = 11, n.sleepFunc(1e3));
                case 11:
                  return (a.next = 13, n.GetCardPackageOrderState(t));
                case 13:
                  if ((s = a.sent, e("log", s, "orderResult", " at pagesPay/components/index.vue:152"), !s.succeeded || 1 != s.data.status)) {
                    a.next = 18;
                    break;
                  }
                  return (o(), a.abrupt("return"));
                case 18:
                  return (a.next = 20, n.sleepFunc(1e3));
                case 20:
                  return (a.next = 22, n.GetCardPackageOrderState(t));
                case 22:
                  if (!(s = a.sent).succeeded || 1 != s.data.status) {
                    a.next = 26;
                    break;
                  }
                  return (o(), a.abrupt("return"));
                case 26:
                case "end":
                  return a.stop();
              }
            }, a);
          }))();
        },
        sleepFunc: function (e) {
          return (async function () {
            return new Promise(function (t) {
              setTimeout(t, e);
            });
          })();
        }
      })
    };
    t.default = l;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
