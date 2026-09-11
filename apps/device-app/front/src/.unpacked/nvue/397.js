// webpack 模块 397  [nvue]
// 出现于: pagesPay/card/index.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/5.js")), i = a(require("../../common/config.nvue.js")), s = require("vuex");
  function o(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      (t && (a = a.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, a));
    }
    return n;
  }
  var d = getApp().globalData, u = {
    props: {
      payType: {
        type: String,
        default: "wxpay"
      }
    },
    data: function () {
      return {
        cdn: i.default.cdn,
        mode: [{
          type: "wxpay",
          name: d.$t("common.wx.pay"),
          icon: "qzwl-pay-wx@2x.png"
        }, {
          type: "alipay",
          name: d.$t("common.alipay.pay"),
          icon: "qzwl-pay-alipay@2x.png"
        }],
        payMode: []
      };
    },
    computed: (function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? o(Object(n), !0).forEach(function (t) {
          (0, r.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    })({}, (0, s.mapGetters)(["providerList"])),
    mounted: function () {
      var e = this;
      (this.payMode = this.mode.filter(function (t) {
        return e.providerList.includes(t.type);
      }), this.$emit("changePayType", this.providerList[0]));
    },
    methods: {
      l: function (e) {
        return d.$t(e);
      },
      changePay: function (e) {
        this.$emit("changePayType", e);
      }
    }
  };
  t.default = u;
})(module, exports, __r);
