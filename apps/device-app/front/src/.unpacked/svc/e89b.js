// webpack 模块 e89b  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/0748.js")), i = {
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
        icons: r.default.glyphs
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
        return (function (e) {
          return "number" === typeof e || (/^[0-9]*$/g).test(e) ? e + "px" : e;
        })(this.size);
      }
    },
    methods: {
      _onClick: function () {
        this.$emit("click");
      }
    }
  };
  t.default = i;
})(module, exports, __r);
