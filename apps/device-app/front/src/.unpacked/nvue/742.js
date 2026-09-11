// webpack 模块 742  [nvue]
// 出现于: pagesCore/login/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = require("../../common/utils.nvue.js"), u = a(require("../../common/config.nvue.js"));
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
      data: function () {
        return {
          cdn: u.default.cdn,
          username: "",
          password: "",
          agreePopupShow: !1,
          handleType: "",
          deviceType: 1,
          pwdState: !1,
          backState: !1
        };
      },
      computed: _({}, (0, s.mapGetters)(["lastUsername", "lastPassword", "agreeSigninAgreement", "sysInfo", "remPassword", "isAuditMode"])),
      onLoad: function (e) {
        var t = this;
        return (async function () {
          e && (t.backState = e.back);
          "ios" == t.sysInfo.platform ? plus.runtime.isApplicationExist({
            pname: "com.tencent.mm",
            action: "weixin://"
          }) ? t.deviceType = 3 : t.deviceType = 2 : t.deviceType = 1;
          t.username = t.lastUsername || u.default.defaultAccount;
          t.remPassword && (t.password = t.lastPassword || u.default.defaultPassword);
          await c.$sleep(10);
          t.pwdState = !0;
        })();
      },
      methods: _(_(_(_({}, (0, s.mapActions)("account", ["SignIn", "SignInWx", "SignInApple"])), (0, s.mapMutations)("account", ["setRemPassword"])), (0, s.mapMutations)("app", ["setAgreeSigninAgreement"])), {}, {
        l: function (e) {
          return c.$t(e);
        },
        signin: function () {
          var e = this;
          return (0, i.default)(r.default.mark(function t() {
            var n, a, i;
            return r.default.wrap(function (t) {
              for (; ; ) switch (t.prev = t.next) {
                case 0:
                  if ((uni.hideKeyboard(), e.agreeSigninAgreement)) {
                    t.next = 5;
                    break;
                  }
                  return (e.handleType = "signin", e.agreePopupShow = !0, t.abrupt("return"));
                case 5:
                  if (e.username) {
                    t.next = 7;
                    break;
                  }
                  return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.please.account"), "none"));
                case 7:
                  if (e.password) {
                    t.next = 9;
                    break;
                  }
                  return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.please.pwd"), "none"));
                case 9:
                  if (e.username.trim()) {
                    t.next = 11;
                    break;
                  }
                  return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.please.account"), "none"));
                case 11:
                  if (uni.$u.test.rangeLength(e.username, [1, 20])) {
                    t.next = 13;
                    break;
                  }
                  return t.abrupt("return", uni.$u.toast("\u8bf7\u8f93\u5165\u6b63\u786e\u8d26\u53f7"));
                case 13:
                  if (uni.$u.test.rangeLength(e.password, [6, 20])) {
                    t.next = 15;
                    break;
                  }
                  return t.abrupt("return", (0, d.qzwlToast)(c.$t("common.please.pwd.num"), "none"));
                case 15:
                  return (t.next = 17, e.SignIn({
                    username: e.username.trim(),
                    password: e.password.trim()
                  }));
                case 17:
                  (9005 === (n = t.sent).code && uni.reLaunch({
                    url: ("/pagesCore/login/bind-tel?terminalNo=").concat(e.username, "&password=").concat(e.password)
                  }), n.succeeded && ("" != (a = uni.getStorageSync("currentPage")) && null != a && null != a && "pagesCore/login/index" != a.path || (a.path = "pages/home/home"), i = ("/").concat(a.path), "{}" != JSON.stringify(a.query) && (i += ("?query=").concat(encodeURIComponent(JSON.stringify(a.query)))), uni.reLaunch({
                    url: i
                  })));
                case 20:
                case "end":
                  return t.stop();
              }
            }, t);
          }))();
        },
        loninWx: function () {
          var t, n = this;
          if (plus.runtime.isApplicationExist({
            pname: "com.tencent.mm",
            action: "weixin://"
          })) return this.agreeSigninAgreement ? void uni.login({
            provider: "weixin",
            onlyAuthorize: !0,
            success: (t = async function (a) {
              var i, o, s;
              e("log", a.code, "loginRes.code", " at pagesCore/login/index.nvue:344");
              (9101 === (i = await n.SignInWx({
                code: a.code,
                type: 1
              })).code && uni.navigateTo({
                url: "/pagesCore/login/bind-tel-more?type=weixin"
              }), i.succeeded && ("" != (o = uni.getStorageSync("currentPage")) && null != o && null != o && "pagesCore/login/index" != o.path || (o.path = "pages/home/home"), s = ("/").concat(o.path), "{}" != JSON.stringify(o.query) && (s += ("?query=").concat(encodeURIComponent(JSON.stringify(o.query)))), uni.reLaunch({
                url: s
              })), e("log", i.data, "resLogin", " at pagesCore/login/index.nvue:376"));
            }, function (e) {
              return t.apply(this, arguments);
            }),
            fail: function (e) {
              (0, d.qzwlToast)("\u767b\u5f55\u5931\u8d25", "none");
            },
            complete: function (e) {}
          }) : (this.handleType = "loninWx", void (this.agreePopupShow = !0));
          (0, d.qzwlToast)("\u8bf7\u5148\u5b89\u88c5\u5fae\u4fe1");
        },
        loninApple: function () {
          var t = this;
          if (!this.agreeSigninAgreement) return (this.handleType = "loninApple", void (this.agreePopupShow = !0));
          uni.login({
            provider: "apple",
            success: function (n) {
              var a;
              (e("log", n, "loginRes", " at pagesCore/login/index.nvue:397"), uni.getUserInfo({
                provider: "apple",
                success: (a = async function (a) {
                  var i, o, s;
                  (i = await t.SignInApple({
                    openId: a.userInfo.openId,
                    authorizationCode: a.userInfo.authorizationCode,
                    identityToken: a.userInfo.identityToken
                  }), e("log", i, "resLogin", " at pagesCore/login/index.nvue:409"), 9102 === i.code && uni.navigateTo({
                    url: "/pagesCore/login/bind-tel-more?type=apple"
                  }), i.succeeded && ("" != (o = uni.getStorageSync("currentPage")) && null != o && null != o && "pagesCore/login/index" != o.path || (o.path = "pages/home/home"), s = ("/").concat(o.path), "{}" != JSON.stringify(o.query) && (s += ("?query=").concat(encodeURIComponent(JSON.stringify(o.query)))), uni.reLaunch({
                    url: s
                  })));
                }, function (e) {
                  return a.apply(this, arguments);
                })
              }));
            },
            fails: function (e) {
              (0, d.qzwlToast)("\u767b\u5f55\u5931\u8d25", "none");
            }
          });
        },
        agreeChange: function (t) {
          (e("log", !t[0], " at pagesCore/login/index.nvue:445"), t[0] || this.setAgreeSigninAgreement(!1), t[0] && this.setAgreeSigninAgreement(!0));
        },
        agreeClose: function () {
          (this.agreePopupShow = !1, this.setAgreeSigninAgreement(!1));
        },
        agreeConfirm: function () {
          return (this.agreePopupShow = !1, this.setAgreeSigninAgreement(!0), "signin" === this.handleType ? this.signin() : "signup" === this.handleType ? this.gotoSignup() : "findPass" === this.handleType ? this.gotoForgotPass() : "loninWx" === this.handleType ? this.loninWx() : "loninApple" === this.handleType ? this.loninApple() : void 0);
        },
        gotoSignup: function () {
          if (!this.agreeSigninAgreement) return (this.handleType = "signup", void (this.agreePopupShow = !0));
          uni.navigateTo({
            url: "/pagesCore/login/register"
          });
        },
        gotoForgotPass: function () {
          if (!this.agreeSigninAgreement) return (this.handleType = "findPass", void (this.agreePopupShow = !0));
          uni.navigateTo({
            url: ("/pagesCore/login/find-pas?phone=").concat(this.username)
          });
        },
        gotoPage: function (e) {
          uni.navigateTo({
            url: e
          });
        },
        gotoPageLeft: function () {
          uni.navigateBack();
        }
      })
    };
    t.default = m;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
