// webpack 模块 414  [nvue]
// 出现于: pagesFunc/terminal/locus/index.js, pagesFunc/terminal/trip-report/detail.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/842.js")), o = {
    name: "u-col",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, s.default],
    data: function () {
      return {
        width: 0,
        parentData: {
          gutter: 0
        },
        gridNum: 12
      };
    },
    computed: {
      uJustify: function () {
        return "end" == this.justify || "start" == this.justify ? "flex-" + this.justify : "around" == this.justify || "between" == this.justify ? "space-" + this.justify : this.justify;
      },
      uAlignItem: function () {
        return "top" == this.align ? "flex-start" : "bottom" == this.align ? "flex-end" : this.align;
      },
      colStyle: function () {
        var e = {
          paddingLeft: uni.$u.addUnit(uni.$u.getPx(this.parentData.gutter) / 2),
          paddingRight: uni.$u.addUnit(uni.$u.getPx(this.parentData.gutter) / 2),
          alignItems: this.uAlignItem,
          justifyContent: this.uJustify,
          textAlign: this.textAlign,
          width: uni.$u.addUnit(Math.floor(this.width / this.gridNum * Number(this.span))),
          marginLeft: uni.$u.addUnit(Math.floor(this.width / this.gridNum * Number(this.offset)))
        };
        return uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle));
      }
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
        var e = this;
        return (async function () {
          e.updateParentData();
          e.width = await e.parent.getComponentWidth();
        })();
      },
      updateParentData: function () {
        this.getParentData("u-row");
      },
      clickHandler: function (e) {
        this.$emit("click");
      }
    }
  };
  t.default = o;
})(module, exports, __r);
