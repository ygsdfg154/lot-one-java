// webpack 模块 ecd8  [svc]
// 出现于: app-service.js
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
    var e = this.$createElement, t = this._self._c || e;
    return t("u-transition", {
      attrs: {
        show: this.show,
        "custom-class": "u-overlay",
        duration: this.duration,
        "custom-style": this.overlayStyle,
        _i: 0
      },
      on: {
        click: this.clickHandler
      }
    }, [this._t("default", null, {
      _i: 1
    })], 2);
  }, i = [];
})(module, exports, __r);
