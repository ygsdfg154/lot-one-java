// webpack 模块 719  [nvue]
// 出现于: pagesCore/account/account-safety.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = a(require("../../common/config.nvue.js")), u = require("../../common/utils.nvue.js");
    function _(e, t) {
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
        t % 2 ? _(Object(n), !0).forEach(function (t) {
          (0, s.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var m = getApp().globalData, c = {
      data: function () {
        return {
          cdn: d.default.cdn,
          info: null,
          wxInfo: "",
          appleInfo: ""
        };
      },
      computed: l({}, (0, o.mapGetters)(["userType", "sysInfo", "isAuditMode"])),
      onLoad: function () {
        this.getMoreAccountInfo();
      },
      methods: l(l({}, (0, o.mapActions)("account", ["GetUserAccountOauth", "BindWechatAccount", "BindAppleAccount", "UnbindAccount"])), {}, {
        l: function (e) {
          return m.$t(e);
        },
        getMoreAccountInfo: function () {
          var t = this;
          return (async function () {
            var a;
            (a = await t.GetUserAccountOauth(), e("log", a, "result", " at pagesCore/account/account-safety.nvue:120"), a.succeeded && (t.info = a.data, t.wxInfo = a.data.wechatUnionid ? a.data.wechatNickname : "", t.appleInfo = a.data.appleOpenid ? a.data.appleNickname : ""));
          })();
        },
        wxBind: function () {
          var t, n = this;
          plus.runtime.isApplicationExist({
            pname: "com.tencent.mm",
            action: "weixin://"
          }) ? uni.login({
            provider: "weixin",
            onlyAuthorize: !0,
            success: (t = async function (a) {
              e("log", a.code, "loginRes.code", " at pagesCore/account/account-safety.nvue:150");
              (await n.BindWechatAccount({
                code: a.code,
                type: 1
              })).succeeded && n.getMoreAccountInfo();
            }, function (e) {
              return t.apply(this, arguments);
            }),
            fail: function (e) {
              (0, u.qzwlToast)("\u7ed1\u5b9a\u5931\u8d25", "none");
            },
            complete: function (e) {}
          }) : (0, u.qzwlToast)("\u8bf7\u5148\u5b89\u88c5\u5fae\u4fe1");
        },
        appleBind: function () {
          var e = this;
          uni.login({
            provider: "apple",
            success: function (t) {
              var n;
              uni.getUserInfo({
                provider: "apple",
                success: (n = async function (n) {
                  (await e.BindAppleAccount({
                    openId: n.userInfo.openId,
                    authorizationCode: n.userInfo.authorizationCode,
                    identityToken: n.userInfo.identityToken
                  })).succeeded && e.getMoreAccountInfo();
                }, function (e) {
                  return n.apply(this, arguments);
                })
              });
            },
            fails: function (e) {
              (0, u.qzwlToast)("\u7ed1\u5b9a\u5931\u8d25", "none");
            }
          });
        },
        navigateToPage: function (e) {
          uni.navigateTo({
            url: e
          });
        },
        unbind: function (e) {
          var t = this, n = (function () {
            var n = async function () {
              (await t.UnbindAccount({
                mode: e
              })).succeeded && (t.getMoreAccountInfo(), (0, u.qzwlToast)("\u89e3\u7ed1\u6210\u529f", "none"));
            };
            return function () {
              return n.apply(this, arguments);
            };
          })();
          uni.showModal({
            title: "\u662f\u5426\u786e\u5b9a\u89e3\u7ed1",
            cancelText: "\u53d6\u6d88",
            confirmText: "\u786e\u5b9a",
            success: function (e) {
              e.cancel || n();
            }
          });
        }
      })
    };
    t.default = c;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
