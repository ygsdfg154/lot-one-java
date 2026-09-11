// webpack 模块 723  [nvue]
// 出现于: pagesCore/login/bind-tel-more.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
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
          codeTime: "",
          disabled: !1,
          type: "",
          imgCaptchaShow: !1
        };
      },
      onLoad: function (e) {
        this.type = e.type;
      },
      methods: _(_(_(_({}, (0, s.mapActions)("account", ["BindUserWx", "BindUserApple"])), (0, s.mapMutations)("account", ["setLogedIn", "setLastUsername"])), (0, s.mapMutations)("user", ["setUserInfo"])), {}, {
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
                  return t.abrupt("return", (0, d.qzwlToast)("\u8bf7\u8f93\u5165\u624b\u673a\u53f7", "none"));
                case 2:
                  if (uni.$u.test.mobile(e.userPhone)) {
                    t.next = 4;
                    break;
                  }
                  return t.abrupt("return", (0, d.qzwlToast)("\u8bf7\u8f93\u5165\u5408\u6cd5\u624b\u673a\u53f7", "none"));
                case 4:
                  if (e.$refs.ztxCode.canGetCode) {
                    t.next = 6;
                    break;
                  }
                  return t.abrupt("return", (0, d.qzwlToast)("\u64cd\u4f5c\u592a\u5feb\u4e86", "none"));
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
          var t = this;
          return (0, i.default)(r.default.mark(function n() {
            return r.default.wrap(function (n) {
              for (; ; ) switch (n.prev = n.next) {
                case 0:
                  if (t.userPhone.trim() && t.code.trim()) {
                    n.next = 2;
                    break;
                  }
                  return n.abrupt("return", (0, d.qzwlToast)("\u8bf7\u8f93\u5165\u5185\u5bb9", "none"));
                case 2:
                  if (uni.$u.test.mobile(t.userPhone)) {
                    n.next = 4;
                    break;
                  }
                  return n.abrupt("return", (0, d.qzwlToast)("\u8bf7\u8f93\u5165\u5408\u6cd5\u624b\u673a\u53f7", "none"));
                case 4:
                  if (uni.$u.test.rangeLength(t.code, [4, 6])) {
                    n.next = 6;
                    break;
                  }
                  return n.abrupt("return", (0, d.qzwlToast)("\u8bf7\u8f93\u5165\u6b63\u786e\u9a8c\u8bc1\u7801", "none"));
                case 6:
                  uni.login({
                    provider: t.type,
                    onlyAuthorize: "weixin" == t.type,
                    success: (function () {
                      var n = (0, i.default)(r.default.mark(function n(a) {
                        return r.default.wrap(function (n) {
                          for (; ; ) switch (n.prev = n.next) {
                            case 0:
                              if ((e("log", a, "loginRes", " at pagesCore/login/bind-tel-more.nvue:131"), "apple" == t.type && uni.getUserInfo({
                                provider: "apple",
                                success: (function () {
                                  var e = async function (n) {
                                    var a;
                                    (a = await t.BindUserApple({
                                      username: t.userPhone.trim(),
                                      verifyCode: t.code.trim(),
                                      openId: n.userInfo.openId,
                                      authorizationCode: n.userInfo.authorizationCode,
                                      identityToken: n.userInfo.identityToken
                                    })).succeeded && t.loginSuccess(a);
                                  };
                                  return function (t) {
                                    return e.apply(this, arguments);
                                  };
                                })(),
                                fail: function () {}
                              }), "weixin" != t.type)) {
                                n.next = 7;
                                break;
                              }
                              return (n.next = 5, t.BindUserWx({
                                username: t.userPhone.trim(),
                                verifyCode: t.code.trim(),
                                code: a.code,
                                type: 1
                              }));
                            case 5:
                              n.sent.succeeded && uni.reLaunch({
                                url: "/pages/home/home"
                              });
                            case 7:
                            case "end":
                              return n.stop();
                          }
                        }, n);
                      }));
                      return function (e) {
                        return n.apply(this, arguments);
                      };
                    })(),
                    fails: function (e) {}
                  });
                case 7:
                case "end":
                  return n.stop();
              }
            }, n);
          }))();
        },
        loginSuccess: function (e) {
          (this.setLogedIn(e.data), this.setLastUsername({
            username: this.userPhone.trim()
          }), this.setUserInfo({
            userId: e.data.user.userId,
            enterprise: e.data.user.enterpriseId,
            nickname: e.data.user.nickname,
            openId: e.data.user.openId,
            user: e.data.user,
            username: e.data.user.username,
            wxUserName: e.data.user.wxUserName,
            userType: e.data.user.userType,
            terminalNo: e.data.user.terminalNo
          }), uni.reLaunch({
            url: "/pages/home/home"
          }));
        },
        goback: function () {
          uni.reLaunch({
            url: "/pages/signin/index"
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
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
