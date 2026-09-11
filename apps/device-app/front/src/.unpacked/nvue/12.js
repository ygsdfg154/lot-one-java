// webpack 模块 12  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/revise-pwd.js, pagesCore/account/revise-userInfo.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/215.js")), i = weex.requireModule("animation"), o = {
    name: "u-loading-icon",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    data: function () {
      return {
        array12: Array.from({
          length: 12
        }),
        aniAngel: 360,
        webviewHide: !1,
        loading: !1
      };
    },
    computed: {
      otherBorderColor: function () {
        var e = uni.$u.colorGradient(this.color, "#ffffff", 100)[80];
        return "circle" === this.mode ? this.inactiveColor ? this.inactiveColor : e : "transparent";
      }
    },
    watch: {
      show: function (e) {
        var t = this;
        e && !this.loading && setTimeout(function () {
          t.startAnimate();
        }, 30);
      }
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
        var e = this;
        setTimeout(function () {
          (e.show && e.nvueAnimate(), e.show && e.addEventListenerToWebview());
        }, 20);
      },
      addEventListenerToWebview: function () {
        var e = this, t = getCurrentPages(), n = t[t.length - 1].$getAppWebview();
        (n.addEventListener("hide", function () {
          e.webviewHide = !0;
        }), n.addEventListener("show", function () {
          e.webviewHide = !1;
        }));
      },
      nvueAnimate: function () {
        "spinner" !== this.mode && this.startAnimate();
      },
      startAnimate: function () {
        var e = this;
        this.loading = !0;
        var t = this.$refs.ani;
        t && i.transition(t, {
          styles: {
            transform: ("rotate(").concat(this.aniAngel, "deg)"),
            transformOrigin: "center center"
          },
          duration: this.duration,
          timingFunction: this.timingFunction
        }, function () {
          (e.aniAngel += 360, e.show && !e.webviewHide ? e.startAnimate() : e.loading = !1);
        });
      }
    }
  };
  t.default = o;
})(module, exports, __r);
