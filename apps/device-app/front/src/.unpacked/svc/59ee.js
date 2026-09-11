// webpack 模块 59ee  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/127e.js")), i = a(require("@/.unpacked/svc/ee10.js")), o = (a(require("@/.unpacked/svc/85c8.js")), function (e) {
    return {
      enter: ("u-").concat(e, "-enter u-").concat(e, "-enter-active"),
      "enter-to": ("u-").concat(e, "-enter-to u-").concat(e, "-enter-active"),
      leave: ("u-").concat(e, "-leave u-").concat(e, "-leave-active"),
      "leave-to": ("u-").concat(e, "-leave-to u-").concat(e, "-leave-active")
    };
  }), s = {
    methods: {
      clickHandler: function () {
        this.$emit("click");
      },
      vueEnter: function () {
        var e = this, t = o(this.mode);
        (this.status = "enter", this.$emit("beforeEnter"), this.inited = !0, this.display = !0, this.classes = t.enter, this.$nextTick(async function () {
          (e.$emit("enter"), e.transitionEnded = !1, e.$emit("afterEnter"), e.classes = t["enter-to"]);
        }));
      },
      vueLeave: function () {
        var e = this;
        if (this.display) {
          var t = o(this.mode);
          (this.status = "leave", this.$emit("beforeLeave"), this.classes = t.leave, this.$nextTick(function () {
            (e.transitionEnded = !1, e.$emit("leave"), setTimeout(e.onTransitionEnd, e.duration), e.classes = t["leave-to"]);
          }));
        }
      },
      onTransitionEnd: function () {
        this.transitionEnded || (this.transitionEnded = !0, this.$emit("leave" === this.status ? "afterLeave" : "afterEnter"), !this.show && this.display && (this.display = !1, this.inited = !1));
      }
    }
  };
  t.default = s;
})(module, exports, __r);
