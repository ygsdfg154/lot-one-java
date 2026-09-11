// webpack 模块 405  [nvue]
// 出现于: pagesFunc/terminal/device-card.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/836.js")), i = e("dom"), s = {
      name: "u-line-progress",
      mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
      data: function () {
        return {
          lineWidth: 0
        };
      },
      watch: {
        percentage: function (e) {
          this.resizeProgressWidth();
        }
      },
      computed: {
        progressStyle: function () {
          var e = {};
          return (e.width = this.lineWidth, e.backgroundColor = this.activeColor, e.height = uni.$u.addUnit(this.height), e);
        },
        innserPercentage: function () {
          return uni.$u.range(0, 100, this.percentage);
        }
      },
      mounted: function () {
        this.init();
      },
      methods: {
        init: function () {
          var e = this;
          uni.$u.sleep(20).then(function () {
            e.resizeProgressWidth();
          });
        },
        getProgressWidth: function () {
          var e = this;
          return new Promise(function (t) {
            i.getComponentRect(e.$refs["u-line-progress__background"], function (e) {
              t(e.size);
            });
          });
        },
        resizeProgressWidth: function () {
          var e = this;
          this.getProgressWidth().then(function (t) {
            var n = t.width;
            e.lineWidth = n * e.innserPercentage / 100 + "px";
          });
        }
      }
    };
    t.default = s;
  }).call(this, require("@/.unpacked/nvue/222.js").default);
})(module, exports, __r);
