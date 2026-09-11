// webpack 模块 265  [nvue]
// 出现于: pages/my/my.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js, pagesCore/login/register.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/359.js")), i = (a(require("@/.unpacked/nvue/217.js")), a(require("@/.unpacked/nvue/218.js")), a(require("@/.unpacked/nvue/303.js"))), s = {
    name: "u--text",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default, i.default],
    computed: {
      valueStyle: function () {
        var e = {
          textDecoration: this.decoration,
          fontWeight: this.bold ? "bold" : "normal",
          wordWrap: this.wordWrap,
          fontSize: uni.$u.addUnit(this.size)
        };
        return (!this.type && (e.color = this.color), this.isNvue && this.lines && (e.lines = this.lines), this.lineHeight && (e.lineHeight = uni.$u.addUnit(this.lineHeight)), !this.isNvue && this.block && (e.display = "block"), uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
      },
      isNvue: function () {
        return (!0, !0);
      },
      isMp: function () {
        return !1;
      }
    },
    data: function () {
      return {};
    },
    methods: {
      clickHandler: function () {
        (this.call && "phone" === this.mode && uni.makePhoneCall({
          phoneNumber: this.text
        }), this.$emit("click"));
      }
    }
  };
  t.default = s;
})(module, exports, __r);
