// webpack 模块 b51a  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/e402.js")), i = {
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
      show: function (e) {}
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
        var e = this;
        setTimeout(function () {
          e.show && e.addEventListenerToWebview();
        }, 20);
      },
      addEventListenerToWebview: function () {
        var e = this, t = getCurrentPages(), n = t[t.length - 1], a = n.$getAppWebview();
        (a.addEventListener("hide", function () {
          e.webviewHide = !0;
        }), a.addEventListener("show", function () {
          e.webviewHide = !1;
        }));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
