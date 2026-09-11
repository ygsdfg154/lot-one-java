// webpack 模块 7f8c  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/9117.js")), i = {
    name: "u-loadmore",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    data: function () {
      return {
        dotText: "\u25cf"
      };
    },
    computed: {
      loadTextStyle: function () {
        return {
          color: "nomore" == this.status && 1 == this.serviceShow ? "#6081C7" : this.color,
          fontSize: uni.$u.addUnit(this.fontSize),
          lineHeight: uni.$u.addUnit(this.fontSize),
          backgroundColor: this.bgColor
        };
      },
      showText: function () {
        var e = "";
        return (e = "loadmore" == this.status ? this.loadmoreText : "loading" == this.status ? this.loadingText : "nomore" == this.status && this.isDot ? this.dotText : this.nomoreText, e);
      }
    },
    methods: {
      loadMore: function () {
        "loadmore" == this.status && this.$emit("loadmore");
      }
    }
  };
  t.default = i;
})(module, exports, __r);
