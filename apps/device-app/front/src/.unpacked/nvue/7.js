// webpack 模块 7  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/199.js")), i = a(require("@/.unpacked/nvue/200.js"));
  weex.requireModule("dom").addRule("fontFace", {
    fontFamily: "uicon-iconfont",
    src: ("url('").concat("/static/app-plus/qzwl-font.ttf", "')")
  });
  var o = {
    name: "u-icon",
    data: function () {
      return {};
    },
    mixins: [uni.$u.mpMixin, uni.$u.mixin, i.default],
    computed: {
      uClasses: function () {
        var e = [];
        return (e.push(this.customPrefix + "-" + this.name), this.color && uni.$u.config.type.includes(this.color) && e.push("u-icon__icon--" + this.color), e);
      },
      iconStyle: function () {
        var e = {};
        return (e = {
          fontSize: uni.$u.addUnit(this.size),
          lineHeight: uni.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          top: uni.$u.addUnit(this.top)
        }, this.color && !uni.$u.config.type.includes(this.color) && (e.color = this.color), e);
      },
      isImg: function () {
        return -1 !== this.name.indexOf("/");
      },
      imgStyle: function () {
        var e = {};
        return (e.width = this.width ? uni.$u.addUnit(this.width) : uni.$u.addUnit(this.size), e.height = this.height ? uni.$u.addUnit(this.height) : uni.$u.addUnit(this.size), e);
      },
      icon: function () {
        return r.default["uicon-" + this.name] || this.name;
      }
    },
    methods: {
      clickHandler: function (e) {
        (this.$emit("click", this.index), this.stop && this.preventEvent(e));
      }
    }
  };
  t.default = o;
})(module, exports, __r);
