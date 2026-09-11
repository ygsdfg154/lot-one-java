// webpack 模块 245  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesCore/account/account-safety.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/246.js")), i = function () {
      return new Promise(function (e) {
        return setTimeout(e, 20);
      });
    }, o = e("animation"), s = function (e) {
      return r.default[e];
    }, d = {
      methods: {
        clickHandler: function () {
          this.$emit("click");
        },
        nvueEnter: function () {
          var e = this, t = s(this.mode);
          (this.status = "enter", this.$emit("beforeEnter"), this.inited = !0, this.display = !0, this.viewStyle = {
            opacity: 0
          }, this.$nextTick(function () {
            (e.viewStyle = t.enter, Promise.resolve().then(i).then(function () {
              (e.$emit("enter"), o.transition(e.$refs["u-transition"].ref, {
                styles: t["enter-to"],
                duration: e.duration,
                timingFunction: e.timingFunction,
                needLayout: !1,
                delay: 0
              }, function () {
                e.$emit("afterEnter");
              }));
            }).catch(function () {}));
          }));
        },
        nvueLeave: function () {
          var e = this;
          if (this.display) {
            var t = s(this.mode);
            (this.status = "leave", this.$emit("beforeLeave"), this.viewStyle = t.leave, Promise.resolve().then(i).then(function () {
              (e.transitionEnded = !1, e.$emit("leave"), o.transition(e.$refs["u-transition"].ref, {
                styles: t["leave-to"],
                duration: e.duration,
                timingFunction: e.timingFunction,
                needLayout: !1,
                delay: 0
              }, function () {
                e.onTransitionEnd();
              }));
            }).catch(function () {}));
          }
        },
        onTransitionEnd: function () {
          this.transitionEnded || (this.transitionEnded = !0, this.$emit("leave" === this.status ? "afterLeave" : "afterEnter"), !this.show && this.display && (this.display = !1, this.inited = !1));
        }
      }
    };
    t.default = d;
  }).call(this, require("@/.unpacked/nvue/222.js").default);
})(module, exports, __r);
