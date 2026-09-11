// webpack 模块 402  [nvue]
// 出现于: pagesFunc/terminal/list/index.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var i = a(require("@/.unpacked/nvue/22.js")), r = a(require("@/.unpacked/nvue/202.js")), o = a(require("@/.unpacked/nvue/5.js")), s = a(require("@/.unpacked/nvue/23.js")), d = a(require("@/.unpacked/nvue/834.js"));
    function u(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        (t && (a = a.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, a));
      }
      return n;
    }
    function l(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? u(Object(n), !0).forEach(function (t) {
          (0, o.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var c = e("animation"), _ = e("dom"), m = {
      name: "u-tabs",
      mixins: [uni.$u.mpMixin, uni.$u.mixin, d.default],
      data: function () {
        return {
          firstTime: !0,
          scrollLeft: 0,
          scrollViewWidth: 0,
          lineOffsetLeft: 0,
          tabsRect: {
            left: 0
          },
          innerCurrent: 0,
          moving: !1
        };
      },
      watch: {
        current: {
          immediate: !0,
          handler: function (e, t) {
            var n = this;
            e !== this.innerCurrent && (this.innerCurrent = e, this.$nextTick(function () {
              n.resize();
            }));
          }
        },
        list: function () {
          var e = this;
          this.$nextTick(function () {
            e.resize();
          });
        }
      },
      computed: {
        textStyle: function () {
          var e = this;
          return function (t) {
            var n = {}, a = t === e.innerCurrent ? uni.$u.addStyle(e.activeStyle) : uni.$u.addStyle(e.inactiveStyle);
            return (e.list[t].disabled && (n.color = "#c8c9cc"), uni.$u.deepMerge(a, n));
          };
        },
        propsBadge: function () {
          return uni.$u.props.badge;
        }
      },
      mounted: function () {
        var e = this;
        return (async function () {
          e.init();
        })();
      },
      methods: {
        setLineLeft: function () {
          var e = this, t = this.list[this.innerCurrent];
          if (t) {
            var n = this.list.slice(0, this.innerCurrent).reduce(function (e, t) {
              return e + t.rect.width;
            }, 0), a = uni.$u.getPx(this.lineWidth);
            (this.lineOffsetLeft = n + (t.rect.width - a) / 2, this.animation(this.lineOffsetLeft, this.firstTime ? 0 : parseInt(this.duration)), this.firstTime && setTimeout(function () {
              e.firstTime = !1;
            }, 10));
          }
        },
        animation: function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n = this.$refs["u-tabs__wrapper__nav__line"];
          c.transition(n, {
            styles: {
              transform: ("translateX(").concat(e, "px)")
            },
            duration: t
          });
        },
        clickHandler: function (e, t) {
          (this.$emit("click", l(l({}, e), {}, {
            index: t
          })), e.disabled || (this.innerCurrent = t, this.resize(), this.$emit("change", l(l({}, e), {}, {
            index: t
          }))));
        },
        init: function () {
          var e = this;
          uni.$u.sleep().then(function () {
            e.resize();
          });
        },
        setScrollLeft: function () {
          var e = this.list[this.innerCurrent], t = this.list.slice(0, this.innerCurrent).reduce(function (e, t) {
            return e + t.rect.width;
          }, 0), n = uni.$u.sys().windowWidth, a = t - (this.tabsRect.width - e.rect.width) / 2 - (n - this.tabsRect.right) / 2 + this.tabsRect.left / 2;
          (a = Math.min(a, this.scrollViewWidth - this.tabsRect.width), this.scrollLeft = Math.max(0, a));
        },
        resize: function () {
          var e = this;
          0 !== this.list.length && Promise.all([this.getTabsRect(), this.getAllItemRect()]).then(function (t) {
            var n = (0, r.default)(t, 2), a = n[0], i = n[1], o = void 0 === i ? [] : i;
            (e.tabsRect = a, e.scrollViewWidth = 0, o.map(function (t, n) {
              (e.scrollViewWidth += t.width, e.list[n].rect = t);
            }), e.setLineLeft(), e.setScrollLeft());
          });
        },
        getTabsRect: function () {
          var e = this;
          return new Promise(function (t) {
            e.queryRect("u-tabs__wrapper__scroll-view").then(function (e) {
              return t(e);
            });
          });
        },
        getAllItemRect: function () {
          var e = this;
          return new Promise(function (t) {
            var n = e.list.map(function (t, n) {
              return e.queryRect(("u-tabs__wrapper__nav__item-").concat(n), !0);
            });
            Promise.all(n).then(function (e) {
              return t(e);
            });
          });
        },
        queryRect: function (e, t) {
          var n = this;
          return new Promise(function (a) {
            _.getComponentRect(t ? n.$refs[e][0] : n.$refs[e], function (e) {
              a(e.size);
            });
          });
        }
      }
    };
    t.default = m;
  }).call(this, require("@/.unpacked/nvue/222.js").default);
})(module, exports, __r);
