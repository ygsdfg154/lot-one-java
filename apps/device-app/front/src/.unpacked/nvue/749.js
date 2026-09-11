// webpack 模块 749  [nvue]
// 出现于: pagesMore/my/setups/service_terms.js
const __r = require('./__runtime.js').wrap();
(function (r, t, e) {
  "use strict";
  (e.d(t, "b", function () {
    return o;
  }), e.d(t, "c", function () {
    return i;
  }), e.d(t, "a", function () {}));
  var o = function () {
    var r = this.$createElement, t = this._self._c || r;
    return t("scroll-view", {
      staticStyle: {
        flexDirection: "column"
      },
      attrs: {
        scrollY: !0,
        showScrollbar: !0,
        enableBackToTop: !0,
        bubble: "true"
      }
    }, [t("u-web-view", {
      staticStyle: {
        flex: "1",
        height: "100vh"
      },
      attrs: {
        webviewStyles: {
          progress: {
            color: this.progressColor
          }
        },
        src: this.dataUrl
      }
    })], 1);
  }, i = [];
})(module, exports, __r);
