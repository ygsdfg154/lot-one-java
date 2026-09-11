// webpack 模块 610  [nvue]
// 出现于: pagesPay/list/specifics.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/955.js")), i = {
    name: "u-gap",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    computed: {
      gapStyle: function () {
        var e = {
          backgroundColor: this.bgColor,
          height: uni.$u.addUnit(this.height),
          marginTop: uni.$u.addUnit(this.marginTop),
          marginBottom: uni.$u.addUnit(this.marginBottom)
        };
        return uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
