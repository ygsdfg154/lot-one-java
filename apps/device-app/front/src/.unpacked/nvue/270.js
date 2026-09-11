// webpack 模块 270  [nvue]
// 出现于: pagesCore/account/account-safety.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js, pagesCore/login/logout.js, pagesCore/login/register.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/305.js")), i = {
    name: "u-image",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    data: function () {
      return {
        isError: !1,
        loading: !0,
        opacity: 1,
        durationTime: this.duration,
        backgroundStyle: {},
        show: !1
      };
    },
    watch: {
      src: {
        immediate: !0,
        handler: function (e) {
          e ? (this.isError = !1, this.loading = !0) : this.isError = !0;
        }
      }
    },
    computed: {
      wrapStyle: function () {
        var e = {};
        return (e.width = this.$u.addUnit(this.width), e.height = this.$u.addUnit(this.height), e.borderRadius = "circle" == this.shape ? "10000px" : uni.$u.addUnit(this.radius), e.overflow = this.borderRadius > 0 ? "hidden" : "visible", uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
      }
    },
    mounted: function () {
      this.show = !0;
    },
    methods: {
      onClick: function () {
        this.$emit("click");
      },
      onErrorHandler: function (e) {
        (this.loading = !1, this.isError = !0, this.$emit("error", e));
      },
      onLoadHandler: function (e) {
        (this.loading = !1, this.isError = !1, this.$emit("load", e), this.removeBgColor());
      },
      removeBgColor: function () {
        this.backgroundStyle = {
          backgroundColor: "transparent"
        };
      }
    }
  };
  t.default = i;
})(module, exports, __r);
