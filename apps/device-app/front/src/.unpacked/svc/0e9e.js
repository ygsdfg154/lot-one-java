// webpack 模块 0e9e  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/b8ab.js")), i = {
    name: "u-popup",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    data: function () {
      return {
        overlayDuration: this.duration + 50
      };
    },
    watch: {
      show: function (e, t) {}
    },
    computed: {
      transitionStyle: function () {
        var e = {
          zIndex: this.zIndex,
          position: "fixed",
          display: "flex"
        };
        return (e[this.mode] = 0, "left" === this.mode || "right" === this.mode ? uni.$u.deepMerge(e, {
          bottom: 0,
          top: 0
        }) : "top" === this.mode || "bottom" === this.mode ? uni.$u.deepMerge(e, {
          left: 0,
          right: 0
        }) : "center" === this.mode ? uni.$u.deepMerge(e, {
          alignItems: "center",
          "justify-content": "center",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }) : void 0);
      },
      contentStyle: function () {
        var e = {}, t = uni.$u.sys();
        t.safeAreaInsets;
        if (("center" !== this.mode && (e.flex = 1), this.bgColor && (e.backgroundColor = this.bgColor), this.round)) {
          var n = uni.$u.addUnit(this.round);
          "top" === this.mode ? (e.borderBottomLeftRadius = n, e.borderBottomRightRadius = n) : "bottom" === this.mode ? (e.borderTopLeftRadius = n, e.borderTopRightRadius = n) : "center" === this.mode && (e.borderRadius = n);
        }
        return uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle));
      },
      position: function () {
        return "center" === this.mode ? this.zoom ? "fade-zoom" : "fade" : "left" === this.mode ? "slide-left" : "right" === this.mode ? "slide-right" : "bottom" === this.mode ? "slide-up" : "top" === this.mode ? "slide-down" : void 0;
      }
    },
    methods: {
      overlayClick: function () {
        this.closeOnClickOverlay && this.$emit("close");
      },
      close: function (e) {
        this.$emit("close");
      },
      afterEnter: function () {
        this.$emit("open");
      },
      clickHandler: function () {
        ("center" === this.mode && this.overlayClick(), this.$emit("click"));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
