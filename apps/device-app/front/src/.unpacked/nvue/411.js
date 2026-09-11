// webpack 模块 411  [nvue]
// 出现于: pagesFunc/terminal/locus/index.js, pagesFunc/terminal/trip-report/detail.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/840.js")), o = e("dom"), d = {
      name: "u-row",
      mixins: [uni.$u.mpMixin, uni.$u.mixin, s.default],
      data: function () {
        return {};
      },
      computed: {
        uJustify: function () {
          return "end" == this.justify || "start" == this.justify ? "flex-" + this.justify : "around" == this.justify || "between" == this.justify ? "space-" + this.justify : this.justify;
        },
        uAlignItem: function () {
          return "top" == this.align ? "flex-start" : "bottom" == this.align ? "flex-end" : this.align;
        },
        rowStyle: function () {
          var e = {
            alignItems: this.uAlignItem,
            justifyContent: this.uJustify
          };
          return (this.gutter && (e.marginLeft = uni.$u.addUnit(-Number(this.gutter) / 2), e.marginRight = uni.$u.addUnit(-Number(this.gutter) / 2)), uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
        }
      },
      methods: {
        clickHandler: function (e) {
          this.$emit("click");
        },
        getComponentWidth: function () {
          var e = this;
          return (async function () {
            await uni.$u.sleep();
            return new Promise(function (t) {
              o.getComponentRect(e.$refs["u-row"], function (e) {
                t(e.size.width);
              });
            });
          })();
        }
      }
    };
    t.default = d;
  }).call(this, require("@/.unpacked/nvue/222.js").default);
})(module, exports, __r);
