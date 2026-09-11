// webpack 模块 010d  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("../../components/statusBar/statusBar.vue")), i = function (e) {
    return "number" === typeof e ? e + "px" : e;
  }, o = {
    name: "UniNavBar",
    components: {
      statusBar: r.default
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
        return i(this.height);
      },
      leftIconWidth: function () {
        return i(this.leftWidth);
      },
      rightIconWidth: function () {
        return i(this.rightWidth);
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
