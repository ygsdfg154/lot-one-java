// webpack 模块 713  [nvue]
// 出现于: pagesCore/account/revise-userInfo.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = require("../../common/utils.nvue.js"), u = a(require("../../common/config.nvue.js"));
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
        titleColor: u.default.titleColor,
        primaryColor: u.default.primaryColor,
        newNickName: ""
      };
    },
    computed: l({}, (0, o.mapGetters)(["nickname"])),
    onLoad: function () {
      this.newNickName = this.nickname;
    },
    methods: l(l({}, (0, o.mapActions)("user", ["SetSystemUserInfo", "GetSystemUserInfo"])), {}, {
      l: function (e) {
        return m.$t(e);
      },
      gotoDeviceList: function () {
        uni.navigateBack();
      },
      save: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          var n;
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                return (n = e.newNickName.trim(), t.next = 3, e.SetSystemUserInfo({
                  nickName: n
                }));
              case 3:
                if (!t.sent.succeeded) {
                  t.next = 11;
                  break;
                }
                return (t.next = 7, e.GetSystemUserInfo());
              case 7:
                return ((0, d.qzwlToast)(m.$t("common.change.userInfo.yes"), "none"), t.next = 10, m.$sleep(1500));
              case 10:
                uni.navigateBack();
              case 11:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      }
    })
  };
  t.default = c;
})(module, exports, __r);
