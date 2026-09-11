// webpack 模块 262  [nvue]
// 出现于: pages/my/my.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js, pagesCore/login/register.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/358.js")), i = {
    name: "u-link",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    computed: {
      linkStyle: function () {
        return {
          color: this.color,
          fontSize: uni.$u.addUnit(this.fontSize),
          lineHeight: uni.$u.addUnit(uni.$u.getPx(this.fontSize) + 2),
          textDecoration: this.underLine ? "underline" : "none"
        };
      }
    },
    methods: {
      openLink: function () {
        (plus.runtime.openURL(this.href), this.$emit("click"));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
