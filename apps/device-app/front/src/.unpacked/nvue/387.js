// webpack 模块 387  [nvue]
// 出现于: pagesFunc/terminal/corral/info.js, pagesPay/list/specifics.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/826.js")), i = {
    name: "u-radio-group",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    computed: {
      parentData: function () {
        return [this.value, this.disabled, this.inactiveColor, this.activeColor, this.size, this.labelDisabled, this.shape, this.iconSize, this.borderBottom, this.placement];
      },
      bemClass: function () {
        return this.bem("radio-group", ["placement"]);
      }
    },
    watch: {
      parentData: function () {
        this.children.length && this.children.map(function (e) {
          "function" == typeof e.init && e.init();
        });
      }
    },
    data: function () {
      return {};
    },
    created: function () {
      this.children = [];
    },
    methods: {
      unCheckedOther: function (e) {
        this.children.map(function (t) {
          e !== t && (t.checked = !1);
        });
        var t = e.name;
        (this.$emit("input", t), this.$emit("change", t));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
