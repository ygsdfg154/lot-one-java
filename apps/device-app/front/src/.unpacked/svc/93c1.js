// webpack 模块 93c1  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/3b2d.js")), i = a(require("@/.unpacked/svc/0eef.js")), o = {
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
        handler: function (e) {}
      }
    },
    computed: {
      wrapperStyle: function () {
        var e = {};
        return ("button" === this.mode && (e.backgroundColor = this.bgColor), e);
      },
      barStyle: function () {
        var e = {};
        return (e.width = ("").concat(this.itemRect.width, "px"), e.height = ("").concat(this.itemRect.height, "px"), e.transform = ("translateX(").concat(this.current * this.itemRect.width, "px)"), "subsection" === this.mode && (e.backgroundColor = this.activeColor), e);
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
        return "object" === (0, r.default)(e) ? e[this.keyName] : e;
      },
      getRect: function () {
        var e = this;
        this.$uGetRect(".u-subsection__item--0").then(function (t) {
          e.itemRect = t;
        });
      },
      clickHandler: function (e) {
        this.$emit("change", e);
      }
    }
  };
  t.default = o;
})(module, exports, __r);
