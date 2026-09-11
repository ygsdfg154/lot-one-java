// webpack 模块 331  [nvue]
// 出现于: pagesFunc/terminal/list/index.js, pagesMore/message/statement.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var i = a(require("../../components/statusBar/statusBar.nvue")), r = function (e) {
    return "number" == typeof e ? e + "px" : e;
  }, o = {
    name: "UniNavBar",
    components: {
      statusBar: i.default
    },
    emits: ["clickLeft", "clickRight", "clickTitle"],
    props: {
      dark: {
        type: Boolean,
        default: !1
      },
      title: {
        type: String,
        default: ""
      },
      leftText: {
        type: String,
        default: ""
      },
      rightText: {
        type: String,
        default: ""
      },
      leftIcon: {
        type: String,
        default: ""
      },
      rightIcon: {
        type: String,
        default: ""
      },
      fixed: {
        type: [Boolean, String],
        default: !1
      },
      color: {
        type: String,
        default: ""
      },
      backgroundColor: {
        type: String,
        default: ""
      },
      statusBar: {
        type: [Boolean, String],
        default: !1
      },
      shadow: {
        type: [Boolean, String],
        default: !1
      },
      border: {
        type: [Boolean, String],
        default: !0
      },
      height: {
        type: [Number, String],
        default: 44
      },
      leftWidth: {
        type: [Number, String],
        default: 60
      },
      rightWidth: {
        type: [Number, String],
        default: 60
      },
      stat: {
        type: [Boolean, String],
        default: ""
      }
    },
    computed: {
      themeBgColor: function () {
        return this.dark ? this.backgroundColor ? this.backgroundColor : this.dark ? "#333" : "#FFF" : this.backgroundColor || "#FFF";
      },
      themeColor: function () {
        return this.dark ? this.color ? this.color : this.dark ? "#fff" : "#333" : this.color || "#333";
      },
      navbarHeight: function () {
        return r(this.height);
      },
      leftIconWidth: function () {
        return r(this.leftWidth);
      },
      rightIconWidth: function () {
        return r(this.rightWidth);
      }
    },
    mounted: function () {
      uni.report && this.stat && "" !== this.title && uni.report("title", this.title);
    },
    methods: {
      onClickLeft: function () {
        this.$emit("clickLeft");
      },
      onClickRight: function () {
        this.$emit("clickRight");
      },
      onClickTitle: function () {
        this.$emit("clickTitle");
      }
    }
  };
  t.default = o;
})(module, exports, __r);
