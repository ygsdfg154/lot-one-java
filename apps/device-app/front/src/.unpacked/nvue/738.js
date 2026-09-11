// webpack 模块 738  [nvue]
// 出现于: pagesCore/login/register.js
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
  var c, m = getApp().globalData, f = {
    components: {
      verificationCode: u.default
    },
    data: function () {
      return {
        userPhone: "",
        userPwd: "",
        code: "",
        codeTime: "",
        disabled: !1,
        imgCaptchaShow: !1
      };
    },
    onHide: function () {
      clearInterval(c);
    },
    methods: _(_({}, (0, s.mapActions)("account", ["SignUp"])), {}, {
      l: function (e) {
        return m.$t(e);
      },
      codeTimeChange: function (e) {
        this.codeTime = e;
      },
      imgCaptchaChange: function (e) {
        this.imgCaptchaShow = e;
      },
      smsCodeChange: function () {
        ((0, d.qzwlToast)(m.$t("common.code.sent"), "none"), this.$refs.ztxCode.start(), this.imgCaptchaShow = !1);
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
                return t.abrupt("return", (0, d.qzwlToast)(m.$t("common.please.tel"), "none"));
              case 2:
                if (uni.$u.test.mobile(e.userPhone)) {
                  t.next = 4;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(m.$t("common.please.valid.mobile.tel"), "none"));
              case 4:
                if (e.$refs.ztxCode.canGetCode) {
                  t.next = 6;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(m.$t("common.operation"), "none"));
              case 6:
                e.imgCaptchaShow = !0;
              case 7:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      signup: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if (e.userPhone.trim() && e.userPwd.trim() && e.code.trim()) {
                  t.next = 2;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(m.$t("common.content"), "none"));
              case 2:
                if (uni.$u.test.mobile(e.userPhone)) {
                  t.next = 4;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(m.$t("common.please.valid.mobile.tel"), "none"));
              case 4:
                if (uni.$u.test.rangeLength(e.code, [4, 6])) {
                  t.next = 6;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(m.$t("common.please.valid.mobile.code"), "none"));
              case 6:
                if (uni.$u.test.rangeLength(e.userPwd, [6, 20])) {
                  t.next = 8;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(m.$t("common.please.pwd.num"), "none"));
              case 8:
                return (t.next = 10, e.SignUp({
                  phoneNumber: e.userPhone.trim(),
                  code: e.code.trim(),
                  password: e.userPwd.trim()
                }));
              case 10:
                t.sent.succeeded && ((0, d.qzwlToast)(m.$t("common.signup.successful"), "none"), c = setTimeout(function () {
                  uni.navigateBack();
                }, 1500));
              case 12:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      back: function () {
        uni.navigateBack();
      },
      gotoPage: function (e) {
        uni.navigateTo({
          url: e
        });
      }
    })
  };
  t.default = f;
})(module, exports, __r);
