// webpack 模块 31c0  [svc]
// 出现于: pagesPay/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  var r = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  (r(require("../../common/config.js")), getApp().globalData);
  var s = {
    props: {},
    data: function () {
      return {};
    },
    methods: {
      contactService: function () {
        uni.navigateTo({
          url: "/pagesMore/my/support"
        });
      }
    }
  };
  e.default = s;
})(module, exports, __r);
