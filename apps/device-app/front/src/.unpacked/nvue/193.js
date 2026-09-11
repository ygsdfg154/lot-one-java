// webpack 模块 193  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return r;
  }), n.d(t, "c", function () {
    return i;
  }), n.d(t, "a", function () {
    return a;
  }));
  var a = {
    uTransition: require("uview-ui/components/u-transition/u-transition.vue").default
  }, r = function () {
    var e = this.$createElement;
    return (this._self._c || e)("u-transition", {
      attrs: {
        show: this.show,
        customClass: "u-overlay",
        duration: this.duration,
        customStyle: this.overlayStyle
      },
      on: {
        click: this.clickHandler
      }
    }, [this._t("default")], 2);
  }, i = [];
})(module, exports, __r);
