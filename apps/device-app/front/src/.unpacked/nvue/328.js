// webpack 模块 328  [nvue]
// 出现于: pagesFunc/terminal/list/index.js, pagesMore/message/statement.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var i = a(require("@/.unpacked/nvue/462.js")), r = a(require("@/.unpacked/nvue/463.js"));
  weex.requireModule("dom").addRule("fontFace", {
    fontFamily: "uniicons",
    src: "url('" + r.default + "')"
  });
  var o = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data: function () {
      return {
        icons: i.default.glyphs
      };
    },
    computed: {
      unicode: function () {
        var e = this, t = this.icons.find(function (t) {
          return t.font_class === e.type;
        });
        return t ? unescape(("%u").concat(t.unicode)) : "";
      },
      iconSize: function () {
        return "number" == typeof (e = this.size) || (/^[0-9]*$/g).test(e) ? e + "px" : e;
        var e;
      }
    },
    methods: {
      _onClick: function () {
        this.$emit("click");
      }
    }
  };
  t.default = o;
})(module, exports, __r);
