// webpack 模块 287  [nvue]
// 出现于: pages/my/my.js, pagesFunc/deviceInfo/index.js, pagesFunc/terminal/alerts-set/index.js, pagesFunc/terminal/locus/index.js, pagesMore/my/developers/developers.js
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
    uLoadingIcon: require("uview-ui/components/u-loading-icon/u-loading-icon.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-switch"],
      class: [e.disabled && "u-switch--disabled"],
      style: [e.switchStyle, e.$u.addStyle(e.customStyle)],
      on: {
        click: e.clickHandler
      }
    }, [n("view", {
      staticClass: ["u-switch__bg"],
      style: [e.bgStyle]
    }), n("view", {
      ref: "u-switch__node",
      staticClass: ["u-switch__node"],
      class: [e.value && "u-switch__node--on"],
      style: [e.nodeStyle]
    }, [n("u-loading-icon", {
      attrs: {
        show: e.loading,
        mode: "circle",
        timingFunction: "linear",
        color: e.value ? e.activeColor : "#AAABAD",
        size: .6 * e.size
      }
    })], 1)]);
  }, i = [];
})(module, exports, __r);
