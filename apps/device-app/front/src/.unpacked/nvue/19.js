// webpack 模块 19  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesCore/account/revise-pwd.js, pagesCore/account/revise-userInfo.js, pagesCore/login/bind-tel-more.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  (a(require("@/.unpacked/nvue/217.js")), a(require("@/.unpacked/nvue/218.js")));
  var r = a(require("@/.unpacked/nvue/221.js")), i = {
    name: "u-button",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    data: function () {
      return {};
    },
    computed: {
      bemClass: function () {
        return this.color ? this.bem("button", ["shape", "size"], ["disabled", "plain", "hairline"]) : this.bem("button", ["type", "shape", "size"], ["disabled", "plain", "hairline"]);
      },
      loadingColor: function () {
        return this.plain ? this.color ? this.color : uni.$u.config.color[("u-").concat(this.type)] : "info" === this.type ? "#c9c9c9" : "rgb(200, 200, 200)";
      },
      iconColorCom: function () {
        return this.iconColor ? this.iconColor : this.plain ? this.color ? this.color : this.type : "info" === this.type ? "#000000" : "#ffffff";
      },
      baseColor: function () {
        var e = {};
        return (this.color && (e.color = this.plain ? this.color : "white", this.plain || (e["background-color"] = this.color), -1 !== this.color.indexOf("gradient") ? (e.borderTopWidth = 0, e.borderRightWidth = 0, e.borderBottomWidth = 0, e.borderLeftWidth = 0, this.plain || (e.backgroundImage = this.color)) : (e.borderColor = this.color, e.borderWidth = "1px", e.borderStyle = "solid")), e);
      },
      nvueTextStyle: function () {
        var e = {};
        return ("info" === this.type && (e.color = "#323233"), this.color && (e.color = this.plain ? this.color : "white"), e.fontSize = this.textSize + "px", e);
      },
      textSize: function () {
        var e = 14, t = this.size;
        return ("large" === t && (e = 16), "normal" === t && (e = 14), "small" === t && (e = 12), "mini" === t && (e = 10), e);
      }
    },
    methods: {
      clickHandler: function () {
        var e = this;
        this.disabled || this.loading || uni.$u.throttle(function () {
          e.$emit("click");
        }, this.throttleTime);
      },
      getphonenumber: function (e) {
        this.$emit("getphonenumber", e);
      },
      getuserinfo: function (e) {
        this.$emit("getuserinfo", e);
      },
      error: function (e) {
        this.$emit("error", e);
      },
      opensetting: function (e) {
        this.$emit("opensetting", e);
      },
      launchapp: function (e) {
        this.$emit("launchapp", e);
      }
    }
  };
  t.default = i;
})(module, exports, __r);
