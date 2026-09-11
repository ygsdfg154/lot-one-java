// webpack 模块 727  [nvue]
// 出现于: pagesCore/login/logout.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = require("../../common/utils.nvue.js"), u = (a(require("../../common/config.nvue.js")), a(require("../../components/verificationCode/verificationCode.nvue")));
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
          cancellationStep: 0,
          codeShow: !1,
          phoneNumber: "",
          code: "",
          codeTime: "",
          disabled: !1,
          imgCaptchaShow: !1
        };
      },
      onLoad: function () {
        if (this.username) {
          var e = String(this.username);
          ((e = e.split("")).splice(3, 6, "*", "*", "*", "*", "*", "*"), e = e.join(""), this.phoneNumber = e);
        }
      },
      onHide: function () {},
      computed: _({}, (0, s.mapGetters)(["username", "userType"])),
      methods: _(_({}, (0, s.mapActions)("account", ["Cancellation", "SignOut"])), {}, {
        l: function (e) {
          return c.$t(e);
        },
        goOnCancellation: function () {
          if (2 != this.userType) return (0, d.qzwlToast)(c.$t("account-cand.succeed-tip4"), "none");
          this.cancellationStep = 1;
        },
        codeTimeChange: function (e) {
          this.codeTime = e;
        },
        imgCaptchaChange: function (e) {
          this.imgCaptchaShow = e;
        },
        smsCodeChange: function () {
          ((0, d.qzwlToast)(c.$t("common.code.sent"), "none"), this.codeShow = !0, this.$refs.uCode.start(), this.imgCaptchaShow = !1);
        },
        getSmsCode: function () {
          var e = this;
          return (0, i.default)(r.default.mark(function t() {
            return r.default.wrap(function (t) {
              for (; ; ) switch (t.prev = t.next) {
                case 0:
                  if (e.$refs.uCode.canGetCode) {
                    t.next = 2;
                    break;
                  }
                  return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.operation"), "none"));
                case 2:
                  if (e.username.trim()) {
                    t.next = 4;
                    break;
                  }
                  return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.please.tel"), "none"));
                case 4:
                  if (uni.$u.test.mobile(e.username)) {
                    t.next = 6;
                    break;
                  }
                  return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.please.valid.mobile.tel"), "none"));
                case 6:
                  e.imgCaptchaShow = !0;
                case 7:
                case "end":
                  return t.stop();
              }
            }, t);
          }))();
        },
        validationCancellation: function () {
          var t = this;
          return (0, i.default)(r.default.mark(function n() {
            var a;
            return r.default.wrap(function (n) {
              for (; ; ) switch (n.prev = n.next) {
                case 0:
                  if (uni.$u.test.rangeLength(t.code, [4, 6])) {
                    n.next = 2;
                    break;
                  }
                  return n.abrupt("return", (0, d.qzwlToast)(c.$t("common.please.valid.mobile.code"), "none"));
                case 2:
                  if (2 === t.userType) {
                    n.next = 4;
                    break;
                  }
                  return n.abrupt("return", (0, d.qzwlToast)(c.$t("account-cand.succeed-tip4"), "none"));
                case 4:
                  return (n.next = 6, t.Cancellation({
                    phoneNumber: t.username,
                    code: t.code
                  }));
                case 6:
                  ((a = n.sent).succeeded && (t.cancellationStep = 2), e("log", a, "result", " at pagesCore/login/logout.nvue:254"));
                case 9:
                case "end":
                  return n.stop();
              }
            }, n);
          }))();
        },
        close: function () {
          var e = this;
          return (async function () {
            await e.SignOut();
            uni.reLaunch({
              url: "/pagesCore/login/index"
            });
          })();
        }
      })
    };
    t.default = m;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
