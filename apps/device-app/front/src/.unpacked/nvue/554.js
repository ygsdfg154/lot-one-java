// webpack 模块 554  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/929.js")), i = {
    mixins: [uni.$u.mpMixin, uni.$u.mixin, a.default],
    watch: {
      text: {
        immediate: !0,
        handler: function (e, t) {
          uni.$u.test.array(e) || uni.$u.error("noticebar\u7ec4\u4ef6direction\u4e3acolumn\u65f6\uff0c\u8981\u6c42text\u53c2\u6570\u4e3a\u6570\u7ec4\u5f62\u5f0f");
        }
      }
    },
    computed: {
      textStyle: function () {
        var e = {};
        return (e.color = this.color, e.fontSize = uni.$u.addUnit(this.fontSize), e);
      },
      vertical: function () {
        return "horizontal" != this.mode;
      }
    },
    data: function () {
      return {
        index: 0
      };
    },
    methods: {
      noticeChange: function (e) {
        this.index = e.detail.current;
      },
      clickHandler: function () {
        this.$emit("click", this.index);
      },
      close: function () {
        this.$emit("close");
      }
    }
  };
  t.default = i;
})(module, exports, __r);
