// webpack 模块 316  [nvue]
// 出现于: pages/msg/index.js, pagesFunc/terminal/list/enterprise.js, pagesFunc/terminal/list/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/449.js")), i = {
    name: "u-search",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, a.default],
    data: function () {
      return {
        keyword: "",
        showClear: !1,
        show: !1,
        focused: this.focus
      };
    },
    watch: {
      keyword: function (e) {
        (this.$emit("input", e), this.$emit("change", e));
      },
      value: {
        immediate: !0,
        handler: function (e) {
          this.keyword = e;
        }
      }
    },
    computed: {
      showActionBtn: function () {
        return !this.animation && this.showAction;
      }
    },
    methods: {
      inputChange: function (e) {
        this.keyword = e.detail.value;
      },
      clear: function () {
        var e = this;
        (this.keyword = "", this.$nextTick(function () {
          e.$emit("clear");
        }));
      },
      search: function (e) {
        this.$emit("search", e.detail.value);
        try {
          uni.hideKeyboard();
        } catch (e) {}
      },
      custom: function () {
        this.$emit("custom", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e) {}
      },
      getFocus: function () {
        (this.focused = !0, this.animation && this.showAction && (this.show = !0), this.$emit("focus", this.keyword));
      },
      blur: function () {
        var e = this;
        (setTimeout(function () {
          e.focused = !1;
        }, 100), this.show = !1, this.$emit("blur", this.keyword));
      },
      clickHandler: function () {
        this.disabled && this.$emit("click");
      },
      clickIcon: function () {
        this.$emit("clickIcon");
      }
    }
  };
  t.default = i;
})(module, exports, __r);
