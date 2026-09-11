// webpack 模块 257  [nvue]
// 出现于: pages/msg/index.js, pagesFunc/terminal/list/index.js, pagesFunc/terminal/remote-setup/list.js, pagesMore/message/table.js, pagesPay/list/indent-device.js, pagesPay/list/indent.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/354.js")), i = {
    name: "u-loadmore",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, a.default],
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
        return "loadmore" == this.status ? this.loadmoreText : "loading" == this.status ? this.loadingText : "nomore" == this.status && this.isDot ? this.dotText : this.nomoreText;
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
