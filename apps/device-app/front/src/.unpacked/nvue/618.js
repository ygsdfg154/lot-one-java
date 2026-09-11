// webpack 模块 618  [nvue]
// 出现于: pagesPay/list/specifics.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = require("../../common/utils.nvue.js");
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
  function l(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? u(Object(n), !0).forEach(function (t) {
        (0, o.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var _ = {
    name: "refundOrder",
    props: ["orderId", "requestFee"],
    data: function () {
      return {
        refundReason: "",
        contactName: "",
        contactTel: "",
        allowCall: !0,
        hasRequest: !1
      };
    },
    computed: l({}, (0, s.mapGetters)(["lastUsername", "nickname"])),
    mounted: function () {
      this.contactTel = this.lastUsername;
    },
    methods: l(l({}, (0, s.mapActions)("order", ["SendRefund"])), {}, {
      sendOrderRefund: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          var n;
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if ((n = {
                  orderId: e.orderId,
                  requestFee: e.requestFee,
                  refundReason: e.refundReason,
                  contactName: e.contactName,
                  contactTel: e.contactTel,
                  allowCall: e.allowCall
                }).contactName) {
                  t.next = 5;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)("\u8bf7\u586b\u5199\u8054\u7cfb\u4eba\u59d3\u540d"));
              case 5:
                if (n.contactTel) {
                  t.next = 9;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)("\u8bf7\u586b\u5199\u8054\u7cfb\u4eba\u7535\u8bdd"));
              case 9:
                if (n.refundReason) {
                  t.next = 11;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)("\u8bf7\u586b\u5199\u9000\u6b3e\u539f\u56e0"));
              case 11:
                return (t.next = 13, e.SendRefund(n));
              case 13:
                t.sent.succeeded && ((0, d.qzwlToast)("\u9000\u6b3e\u7533\u8bf7\u63d0\u4ea4\u6210\u529f"), e.hasRequest = !0, e.close());
              case 15:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      close: function () {
        (uni.hideKeyboard(), this.refundReason = "", this.contactName = "", this.$emit("refundOrder", {
          dialog: !1,
          hasRequest: this.hasRequest
        }));
      }
    })
  };
  t.default = _;
})(module, exports, __r);
