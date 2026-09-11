// webpack 模块 557  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var r = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var a = r(require("@/.unpacked/nvue/22.js")), i = r(require("@/.unpacked/nvue/23.js")), o = r(require("@/.unpacked/nvue/931.js")), s = e("animation"), d = e("dom"), u = {
      name: "u-row-notice",
      mixins: [uni.$u.mpMixin, uni.$u.mixin, o.default],
      data: function () {
        return {
          animationDuration: "0",
          animationPlayState: "paused",
          nvueInit: !0,
          show: !0
        };
      },
      watch: {
        text: {
          immediate: !0,
          handler: function (e, t) {
            (this.nvueInit = !0, uni.$u.test.string(e) || uni.$u.error("noticebar\u7ec4\u4ef6direction\u4e3arow\u65f6\uff0c\u8981\u6c42text\u53c2\u6570\u4e3a\u5b57\u7b26\u4e32\u5f62\u5f0f"));
          }
        },
        fontSize: function () {
          this.nvueInit = !0;
        },
        speed: function () {
          this.nvueInit = !0;
        }
      },
      computed: {
        textStyle: function () {
          var e = {};
          return (e.color = this.color, e.fontSize = uni.$u.addUnit(this.fontSize), e);
        },
        animationStyle: function () {
          var e = {};
          return (e.animationDuration = this.animationDuration, e.animationPlayState = this.animationPlayState, e);
        },
        innerText: function () {
          for (var e = [], t = this.text.split(""), n = 0; n < t.length; n += 20) e.push(t.slice(n, n + 20).join(""));
          return e;
        }
      },
      mounted: function () {
        var e = this, t = getCurrentPages(), n = t[t.length - 1].$getAppWebview();
        (n.addEventListener("hide", function () {
          e.webviewHide = !0;
        }), n.addEventListener("show", function () {
          e.webviewHide = !1;
        }), this.init());
      },
      methods: {
        init: function () {
          (this.nvue(), uni.$u.test.string(this.text) || uni.$u.error("noticebar\u7ec4\u4ef6direction\u4e3arow\u65f6\uff0c\u8981\u6c42text\u53c2\u6570\u4e3a\u5b57\u7b26\u4e32\u5f62\u5f0f"));
        },
        vue: function () {
          return (async function () {})();
        },
        nvue: function () {
          var e = this;
          return (async function () {
            var n, r;
            e.nvueInit = !1;
            n = 0;
            r = 0;
            await uni.$u.sleep();
            r = (await e.getNvueRect("u-notice__content__text")).width;
            (n = (await e.getNvueRect("u-notice__content")).width, s.transition(e.$refs["u-notice__content__text"], {
              styles: {
                transform: ("translateX(").concat(n, "px)")
              }
            }, function () {
              !e.stopAnimation && e.loopAnimation(r, n);
            }));
          })();
        },
        loopAnimation: function (e, t) {
          var n = this;
          s.transition(this.$refs["u-notice__content__text"], {
            styles: {
              transform: ("translateX(-").concat(e, "px)")
            },
            duration: (t + e) / uni.$u.getPx(this.speed) * 1e3,
            delay: 10
          }, function () {
            s.transition(n.$refs["u-notice__content__text"], {
              styles: {
                transform: ("translateX(").concat(n.stopAnimation ? 0 : t, "px)")
              }
            }, function () {
              n.stopAnimation || (n.nvueInit ? n.nvue() : n.loopAnimation(e, t));
            });
          });
        },
        getNvueRect: function (e) {
          var t = this;
          return new Promise(function (n) {
            d.getComponentRect(t.$refs[e], function (e) {
              n(e.size);
            });
          });
        },
        clickHandler: function (e) {
          this.$emit("click");
        },
        close: function () {
          this.$emit("close");
        }
      },
      beforeDestroy: function () {
        this.stopAnimation = !0;
      }
    };
    t.default = u;
  }).call(this, require("@/.unpacked/nvue/222.js").default);
})(module, exports, __r);
