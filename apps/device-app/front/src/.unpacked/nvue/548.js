// webpack 模块 548  [nvue]
// 出现于: pages/my/my.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = require("../../common/utils.nvue.js"), d = require("vuex"), u = a(require("../../common/config.nvue.js"));
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
  var c = getApp().globalData, m = {
    data: function () {
      return {
        cdn: u.default.cdn,
        src: u.default.cdn + "/draw/wxHeDefault.png",
        showService: u.default.kf.show,
        individuation: !1
      };
    },
    onLoad: function () {},
    computed: l(l({}, (0, d.mapGetters)(["isDevMode", "autoCheckUpdate", "userType", "sysInfo", "nickname", "username", "isAuditMode", "selectedTerminal", "isAuthenticated"])), {}, {
      paddingTop: function () {
        return this.sysInfo.statusBarHeight + 44 + "px";
      },
      locales: function () {
        return [{
          text: c.$t("common.en"),
          code: "en"
        }, {
          text: c.$t("common.zh-hans"),
          code: "zh-Hans"
        }];
      },
      accountNum: function () {
        return 3 == this.userType ? this.selectedTerminal ? this.selectedTerminal.terminalNo : "-" : this.username;
      },
      nickAccount: function () {
        var e;
        return (3 == this.userType ? (e = this.selectedTerminal ? this.selectedTerminal.terminalNo : "-", this.nickname && (e = this.nickname)) : e = this.nickname || this.username, e);
      }
    }),
    onShareAppMessage: function () {
      return {
        title: c.$t("app.name"),
        imageUrl: u.default.cdn + "/draw/qzwl-logo.png",
        path: "/pages/home/home"
      };
    },
    methods: l(l(l({}, (0, d.mapMutations)("app", ["setAutoCheckUpdate", "setSetLocaleState"])), (0, d.mapActions)("account", ["SignOut"])), {}, {
      l: function (e) {
        return c.$t(e);
      },
      gotoPage: function (e, t) {
        this.isAuthenticated || t ? uni.navigateTo({
          url: e
        }) : (0, o.gotoPagesLogin)(!0);
      },
      signOut: function () {
        var e = this;
        return (async function () {
          uni.showActionSheet({
            title: c.$t("common.not.signin.confirm"),
            itemList: [c.$t("common.ok")],
            itemColor: u.default.erorColor,
            success: (function () {
              var t = async function () {
                await e.SignOut();
              };
              return function () {
                return t.apply(this, arguments);
              };
            })()
          });
        })();
      },
      changeAutoCheckUpdate: function (e) {
        this.setAutoCheckUpdate(e);
      },
      switchLanguage: function () {
        var e = this;
        uni.showActionSheet({
          itemList: this.locales.map(function (e) {
            return e.text;
          }),
          success: function (t) {
            e.setSetLocaleState(!1);
            var n = e.locales[t.tapIndex].code;
            e.isAndroid ? uni.showModal({
              content: c.$t("mine.setup.language.Restart.App"),
              success: function (e) {
                e.confirm && uni.setLocale(n);
              }
            }) : (uni.setLocale(n), c.$i18n.locale = n);
          },
          fail: function () {},
          complete: function () {}
        });
      },
      contactService: function () {
        uni.navigateTo({
          url: "/pagesMore/my/support"
        });
      },
      gotoAppRevise: function (e) {
        if (!this.isAuthenticated) return (0, o.gotoPagesLogin)();
        3 != this.userType && uni.navigateTo({
          url: "/pagesCore/account/revise-userInfo"
        });
      },
      gotoPageLogin: function () {
        (0, o.gotoPagesLogin)();
      }
    })
  };
  t.default = m;
})(module, exports, __r);
