// webpack 模块 734  [nvue]
// 出现于: pagesCore/login/bind-tel.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = (a(require("../../common/config.nvue.js")), require("../../common/utils.nvue.js")), u = a(require("../../components/verificationCode/verificationCode.nvue"));
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
        (0, o.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var c = getApp().globalData, m = {
    components: {
      verificationCode: u.default
    },
    data: function () {
      return {
        userPhone: "",
        code: "",
        terminalNo: "",
        userPwd: "",
        codeTime: "",
        disabled: !1,
        imgCaptchaShow: !1
      };
    },
    onLoad: function (e) {
      (this.terminalNo = e.terminalNo, this.userPwd = e.password);
    },
    methods: _(_({}, (0, s.mapActions)("account", ["BindUserPhone", "SignIn"])), {}, {
      l: function (e) {
        return c.$t(e);
      },
      codeTimeChange: function (e) {
        this.codeTime = e;
      },
      imgCaptchaChange: function (e) {
        this.imgCaptchaShow = e;
      },
      smsCodeChange: function () {
        ((0, d.qzwlToast)(c.$t("common.code.sent"), "none"), this.$refs.ztxCode.start(), this.imgCaptchaShow = !1);
      },
      getSmsCode: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if (e.userPhone.trim()) {
                  t.next = 2;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.please.tel"), "none"));
              case 2:
                if (uni.$u.test.mobile(e.userPhone)) {
                  t.next = 4;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.please.valid.mobile.tel"), "none"));
              case 4:
                if (e.$refs.ztxCode.canGetCode) {
                  t.next = 6;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.operation"), "none"));
              case 6:
                e.imgCaptchaShow = !0;
              case 7:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      bindUserPhone: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          var n;
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if (e.userPhone.trim() && e.code.trim()) {
                  t.next = 2;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.content"), "none"));
              case 2:
                if (uni.$u.test.mobile(e.userPhone)) {
                  t.next = 4;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.please.valid.mobile.tel"), "none"));
              case 4:
                if (uni.$u.test.rangeLength(e.code, [4, 6])) {
                  t.next = 6;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.please.valid.mobile.code"), "none"));
              case 6:
                return (t.next = 8, e.BindUserPhone({
                  username: e.terminalNo.trim(),
                  password: e.userPwd.trim(),
                  phoneNumber: e.userPhone.trim(),
                  captcha: e.code.trim()
                }));
              case 8:
                if (!t.sent.succeeded) {
                  t.next = 15;
                  break;
                }
                return ((0, d.qzwlToast)(c.$t("common.bind.success"), "none"), t.next = 13, e.SignIn({
                  username: e.terminalNo,
                  password: e.userPwd
                }));
              case 13:
                (n = t.sent).succeeded ? uni.reLaunch({
                  url: "/pages/home/home"
                }) : ((0, d.qzwlToast)(n.msg, "none"), uni.reLaunch({
                  url: "/pagesCore/login/index"
                }));
              case 15:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      goback: function () {
        uni.reLaunch({
          url: "/pagesCore/login/index"
        });
      },
      gotoPage: function (e) {
        uni.navigateTo({
          url: e
        });
      }
    })
  };
  t.default = m;
})(module, exports, __r);
