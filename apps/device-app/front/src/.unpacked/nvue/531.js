// webpack 模块 531  [nvue]
// 出现于: pages/msg/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var r = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var a = r(require("@/.unpacked/nvue/1.js")), i = r(require("@/.unpacked/nvue/920.js")), o = e("dom"), s = e("animation"), d = {
      name: "u-subsection",
      mixins: [uni.$u.mpMixin, uni.$u.mixin, i.default],
      data: function () {
        return {
          itemRect: {
            width: 0,
            height: 0
          }
        };
      },
      watch: {
        list: function (e, t) {
          this.init();
        },
        current: {
          immediate: !0,
          handler: function (e) {
            var t, n, r = this, a = null === (t = this.$refs) || void 0 === t || null === (n = t["u-subsection__bar"]) || void 0 === n ? void 0 : n.ref;
            uni.$u.sleep(a ? 0 : 100).then(function () {
              s.transition(r.$refs["u-subsection__bar"].ref, {
                styles: {
                  transform: ("translateX(").concat(e * r.itemRect.width, "px)"),
                  transformOrigin: "center center"
                },
                duration: 300
              });
            });
          }
        }
      },
      computed: {
        wrapperStyle: function () {
          var e = {};
          return ("button" === this.mode && (e.backgroundColor = this.bgColor), e);
        },
        barStyle: function () {
          var e = {};
          return (e.width = ("").concat(this.itemRect.width, "px"), e.height = ("").concat(this.itemRect.height, "px"), "subsection" === this.mode && (e.backgroundColor = this.activeColor), e);
        },
        itemStyle: function (e) {
          var t = this;
          return function (e) {
            var n = {};
            return ("subsection" === t.mode && (n.borderColor = t.activeColor, n.borderWidth = "1px", n.borderStyle = "solid"), n);
          };
        },
        textStyle: function (e) {
          var t = this;
          return function (e) {
            var n = {};
            return (n.fontWeight = t.bold && t.current === e ? "bold" : "normal", n.fontSize = uni.$u.addUnit(t.fontSize), "subsection" === t.mode ? n.color = t.current === e ? "#fff" : t.inactiveColor : n.color = t.current === e ? t.activeColor : t.inactiveColor, n);
          };
        }
      },
      mounted: function () {
        this.init();
      },
      methods: {
        init: function () {
          var e = this;
          uni.$u.sleep().then(function () {
            return e.getRect();
          });
        },
        getText: function (e) {
          return "object" === (0, a.default)(e) ? e[this.keyName] : e;
        },
        getRect: function () {
          var e = this, t = this.$refs["u-subsection__item--0"][0];
          t && o.getComponentRect(t, function (t) {
            e.itemRect = t.size;
          });
        },
        clickHandler: function (e) {
          this.$emit("change", e);
        }
      }
    };
    t.default = d;
  }).call(this, require("@/.unpacked/nvue/222.js").default);
})(module, exports, __r);
