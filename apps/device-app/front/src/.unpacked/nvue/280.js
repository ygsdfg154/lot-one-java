// webpack 模块 280  [nvue]
// 出现于: pages/my/my.js, pagesFunc/deviceInfo/index.js, pagesFunc/terminal/alerts-set/index.js, pagesFunc/terminal/locus/index.js, pagesMore/my/developers/developers.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/365.js")), i = {
    name: "u-switch",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    watch: {
      value: {
        immediate: !0,
        handler: function (e) {
          e !== this.inactiveValue && e !== this.activeValue && uni.$u.error("v-model\u7ed1\u5b9a\u7684\u503c\u5fc5\u987b\u4e3ainactiveValue\u3001activeValue\u4e8c\u8005\u4e4b\u4e00");
        }
      }
    },
    data: function () {
      return {
        bgColor: "#ffffff"
      };
    },
    computed: {
      isActive: function () {
        return this.value === this.activeValue;
      },
      switchStyle: function () {
        var e = {};
        return (e.width = uni.$u.addUnit(2 * this.size + 2), e.height = uni.$u.addUnit(Number(this.size) + 2), this.customInactiveColor && (e.borderColor = "rgba(0, 0, 0, 0)"), e.backgroundColor = this.isActive ? this.activeColor : this.inactiveColor, e);
      },
      nodeStyle: function () {
        var e = {};
        (e.width = uni.$u.addUnit(this.size - this.space), e.height = uni.$u.addUnit(this.size - this.space));
        var t = this.isActive ? uni.$u.addUnit(this.space) : uni.$u.addUnit(this.size);
        return (e.transform = ("translateX(-").concat(t, ")"), e);
      },
      bgStyle: function () {
        var e = {};
        return (e.width = uni.$u.addUnit(2 * Number(this.size) - this.size / 2), e.height = uni.$u.addUnit(this.size), e.backgroundColor = this.inactiveColor, e.transform = ("scale(").concat(this.isActive ? 0 : 1, ")"), e);
      },
      customInactiveColor: function () {
        return "#fff" !== this.inactiveColor && "#ffffff" !== this.inactiveColor;
      }
    },
    methods: {
      clickHandler: function () {
        var e = this;
        if (!this.disabled && !this.loading) {
          var t = this.isActive ? this.inactiveValue : this.activeValue;
          (this.asyncChange || this.$emit("input", t), this.$nextTick(function () {
            e.$emit("change", t);
          }));
        }
      }
    }
  };
  t.default = i;
})(module, exports, __r);
