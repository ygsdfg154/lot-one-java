// webpack 模块 236  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesFunc/terminal/corral/info.js, pagesFunc/terminal/locate-mode/index.js, pagesFunc/terminal/locus/index.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/311.js")), i = {
    name: "u-toolbar",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    methods: {
      cancel: function () {
        this.$emit("cancel");
      },
      confirm: function () {
        this.$emit("confirm");
      }
    }
  };
  t.default = i;
})(module, exports, __r);
