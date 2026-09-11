// webpack 模块 175  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/248.js")), i = {
    name: "u-overlay",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    computed: {
      overlayStyle: function () {
        var e = {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: this.zIndex,
          bottom: 0,
          "background-color": ("rgba(0, 0, 0, ").concat(this.opacity, ")")
        };
        return uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle));
      }
    },
    methods: {
      clickHandler: function () {
        this.$emit("click");
      }
    }
  };
  t.default = i;
})(module, exports, __r);
