// webpack 模块 633  [nvue]
// 出现于: pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  t.default = {
    data: function () {
      return {};
    },
    props: ["selectedTypeItem", "vipTime", "totalText", "remain", "minTotal", "noMoney"],
    methods: {
      setProgress: function (e, t) {
        if (this.totalText) return 100;
        var n = (e / t * 100).toFixed(2);
        return n || 0;
      }
    }
  };
})(module, exports, __r);
