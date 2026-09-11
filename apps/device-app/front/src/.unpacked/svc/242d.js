// webpack 模块 242d  [svc]
// 出现于: pagesPay/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  var r = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var s = r(require("../../common/config.js")), n = {
    data: function () {
      return {
        cdn: s.default.cdn,
        titleColor: s.default.titleColor,
        primaryColor: s.default.primaryColor,
        payInfo: null
      };
    },
    onLoad: function (t) {
      this.payInfo = {
        outTradeNo: t.outTradeNo,
        payTime: t.payTime,
        totalFee: t.totalFee / 100
      };
    },
    methods: {
      gotoPages: function () {
        uni.navigateBack();
      }
    }
  };
  e.default = n;
})(module, exports, __r);
