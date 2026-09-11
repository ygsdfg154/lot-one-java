// webpack 模块 694  [nvue]
// 出现于: pagesFunc/terminal/locate-mode/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("../../common/config.nvue.js")), i = getApp().globalData, o = {
    data: function () {
      return {
        cdn: r.default.cdn
      };
    },
    props: ["weekDailyAlarmsMode", "currentRunningModelist", "currentRunningMode", "currentTimePickerInfo", "locationVip"],
    methods: {
      l: function (e) {
        return i.$t(e);
      }
    }
  };
  t.default = o;
})(module, exports, __r);
