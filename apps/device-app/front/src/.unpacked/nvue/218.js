// webpack 模块 218  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/revise-pwd.js, pagesCore/account/revise-userInfo.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      openType: String
    },
    methods: {
      onGetUserInfo: function (e) {
        this.$emit("getuserinfo", e.detail);
      },
      onContact: function (e) {
        this.$emit("contact", e.detail);
      },
      onGetPhoneNumber: function (e) {
        this.$emit("getphonenumber", e.detail);
      },
      onError: function (e) {
        this.$emit("error", e.detail);
      },
      onLaunchApp: function (e) {
        this.$emit("launchapp", e.detail);
      },
      onOpenSetting: function (e) {
        this.$emit("opensetting", e.detail);
      }
    }
  };
  t.default = a;
})(module, exports, __r);
