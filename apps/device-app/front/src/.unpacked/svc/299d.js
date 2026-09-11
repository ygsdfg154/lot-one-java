// webpack 模块 299d  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/46f8.js")), i = a(require("@/.unpacked/svc/76ac.js")), o = {
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
