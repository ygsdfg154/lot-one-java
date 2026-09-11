// webpack 模块 408  [nvue]
// 出现于: pagesFunc/terminal/corral/info.js, pagesFunc/terminal/locus/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/838.js")), i = {
    name: "u--slider",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    methods: {
      changingHandler: function (e) {
        var t = e.detail.value;
        (this.$emit("input", t), this.$emit("changing", t));
      },
      changeHandler: function (e) {
        var t = e.detail.value;
        (this.$emit("input", t), this.$emit("change", t));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
