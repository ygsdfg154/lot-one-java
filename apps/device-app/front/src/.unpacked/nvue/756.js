// webpack 模块 756  [nvue]
// 出现于: pagesMore/public/qzwl-authorize.js
const __r = require('./__runtime.js').wrap();
(function (t, e, r) {
  "use strict";
  (r.d(e, "b", function () {
    return i;
  }), r.d(e, "c", function () {
    return n;
  }), r.d(e, "a", function () {
    return o;
  }));
  var o = {
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, i = function () {
    var t = this.$createElement, e = this._self._c || t;
    return e("scroll-view", {
      staticStyle: {
        flexDirection: "column"
      },
      attrs: {
        scrollY: !0,
        showScrollbar: !0,
        enableBackToTop: !0,
        bubble: "true"
      }
    }, [e("view", {
      staticClass: ["flex-1", "flex-row", "justify-center", "items-center"]
    }, [e("view", {
      staticClass: ["flex-col", "justify-center", "items-center"],
      staticStyle: {
        marginTop: "200rpx"
      }
    }, [e("u-icon", {
      attrs: {
        size: "128",
        name: this.cdn + "/draw/qzwlAuthorizeLoading.png"
      }
    }), e("u-text", {
      staticClass: ["m-t-lg"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [this._v("\u767b\u5f55\u6388\u6743\u4e2d...")])], 1)])]);
  }, n = [];
})(module, exports, __r);
