// webpack 模块 688  [nvue]
// 出现于: pagesFunc/terminal/locus/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  require("../../common/utils.nvue.js");
  var r = a(require("../../common/config.nvue.js")), i = getApp().globalData, s = {
    data: function () {
      return {
        cdn: r.default.cdn,
        primaryColor: r.default.primaryColor,
        baseValue: !1,
        panelProgress: 0
      };
    },
    props: ["currentPoint", "basePoint", "totalMileage", "currentAddress", "speed", "isPlaying", "progress"],
    methods: {
      l: function (e) {
        return i.$t(e);
      }
    },
    watch: {
      baseValue: {
        immediate: !0,
        handler: function () {
          this.basePoint.length && this.$emit("drawBaseMarker", this.baseValue);
        }
      },
      progress: {
        immediate: !0,
        handler: function () {
          this.panelProgress = this.progress;
        }
      }
    }
  };
  t.default = s;
})(module, exports, __r);
