// webpack 模块 715  [nvue]
// 出现于: pagesCore/account/revise-pwd.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
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
  var l = getApp().globalData, m = {
    data: function () {
      return {
        oldUserPwd: "",
        repeatUserPwd: "",
        userPwd: "",
        userState: null
      };
    },
    computed: _({}, (0, o.mapGetters)(["userId", "selectedTerminal", "userType"])),
    onLoad: function (e) {
      this.userState = e.userType;
    },
    methods: _(_(_({}, (0, o.mapActions)("account", ["ChangeAuthPassword", "SignOut"])), (0, o.mapActions)("terminal", ["ChangeTerminalPassword"])), {}, {
      l: function (e) {
        return l.$t(e);
      },
      savePwd: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if (e.oldUserPwd.trim() && e.repeatUserPwd.trim() && e.userPwd.trim()) {
                  t.next = 2;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(l.$t("common.content"), "none"));
              case 2:
                if (e.userPwd == e.repeatUserPwd) {
                  t.next = 4;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(l.$t("common.please.new.password"), "none"));
              case 4:
                if (uni.$u.test.rangeLength(e.userPwd, [6, 20])) {
                  t.next = 6;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(l.$t("common.please.pwd.num"), "none"));
              case 6:
                if (3 == e.userState) {
                  t.next = 17;
                  break;
                }
                return (t.next = 9, e.ChangeAuthPassword({
                  oldPassword: e.oldUserPwd.trim(),
                  password: e.userPwd.trim()
                }));
              case 9:
                if (!t.sent.succeeded) {
                  t.next = 17;
                  break;
                }
                return ((0, d.qzwlToast)(l.$t("common.change.pwd.yes"), "none"), t.next = 14, e.SignOut());
              case 14:
                return (t.next = 16, l.$sleep(1500));
              case 16:
                uni.reLaunch({
                  url: "/pagesCore/login/index"
                });
              case 17:
                if (3 != e.userState) {
                  t.next = 34;
                  break;
                }
                return (t.next = 20, e.ChangeTerminalPassword({
                  oldPassword: e.oldUserPwd.trim(),
                  password: e.userPwd.trim(),
                  terminalNo: e.selectedTerminal.terminalNo
                }));
              case 20:
                if (!t.sent.succeeded) {
                  t.next = 34;
                  break;
                }
                if (((0, d.qzwlToast)(l.$t("common.change.pwd.yes"), "none"), 3 != e.userType)) {
                  t.next = 31;
                  break;
                }
                return (t.next = 26, e.SignOut());
              case 26:
                return (t.next = 28, l.$sleep(1500));
              case 28:
                (uni.reLaunch({
                  url: "/pagesCore/login/index"
                }), t.next = 34);
                break;
              case 31:
                return (t.next = 33, l.$sleep(1e3));
              case 33:
                uni.navigateBack();
              case 34:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      }
    })
  };
  t.default = m;
})(module, exports, __r);
