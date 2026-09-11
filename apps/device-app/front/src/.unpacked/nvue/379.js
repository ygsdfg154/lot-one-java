// webpack 模块 379  [nvue]
// 出现于: pages/home/home.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var r = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var a, i = r(require("@/.unpacked/nvue/22.js")), o = r(require("@/.unpacked/nvue/5.js")), s = r(require("@/.unpacked/nvue/23.js")), d = r(require("@/.unpacked/nvue/821.js")), u = r(require("@/.unpacked/nvue/822.js")), l = e("dom"), c = (a = {
      name: "u-scroll-list",
      mixins: [uni.$u.mpMixin, uni.$u.mixin, u.default]
    }, (0, o.default)(a, "mixins", [uni.$u.mpMixin, uni.$u.mixin, d.default, u.default]), (0, o.default)(a, "data", function () {
      return {
        scrollInfo: {
          scrollLeft: 0,
          scrollWidth: 0
        },
        scrollWidth: 0
      };
    }), (0, o.default)(a, "computed", {
      barStyle: function () {
        var e = {};
        return (e.width = uni.$u.addUnit(this.indicatorBarWidth), e.backgroundColor = this.indicatorActiveColor, e);
      },
      lineStyle: function () {
        var e = {};
        return (e.width = uni.$u.addUnit(this.indicatorWidth), e.backgroundColor = this.indicatorColor, e);
      }
    }), (0, o.default)(a, "mounted", function () {
      this.init();
    }), (0, o.default)(a, "methods", {
      init: function () {
        this.getComponentWidth();
      },
      scrollEvent: function (e) {
        this.$emit(e);
      },
      getComponentWidth: function () {
        var e = this;
        return (async function () {
          var n;
          await uni.$u.sleep(30);
          (n = e.$refs["u-scroll-list"]) && l.getComponentRect(n, function (t) {
            e.scrollWidth = t.size.width;
          });
        })();
      }
    }), a);
    t.default = c;
  }).call(this, require("@/.unpacked/nvue/222.js").default);
})(module, exports, __r);
