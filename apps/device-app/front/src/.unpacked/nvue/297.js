// webpack 模块 297  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/index.js, pagesFunc/terminal/remote-setup/index.js, pagesMore/my/developers/developers.js, pagesMore/my/developers/push-msgs.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/445.js")), i = {
    name: "u-cell",
    data: function () {
      return {};
    },
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    computed: {
      titleTextStyle: function () {
        return uni.$u.addStyle(this.titleStyle);
      }
    },
    methods: {
      clickHandler: function (e) {
        this.disabled || (this.$emit("click", {
          name: this.name
        }), this.openPage(), this.stop && this.preventEvent(e));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
