// webpack 模块 299  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/index.js, pagesFunc/terminal/remote-setup/index.js, pagesMore/my/developers/developers.js, pagesMore/my/developers/push-msgs.js
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
    uLine: require("uview-ui/components/u-line/u-line.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-cell-group"],
      class: [e.customClass],
      style: [e.$u.addStyle(e.customStyle)]
    }, [e.title ? n("view", {
      staticClass: ["u-cell-group__title"]
    }, [e._t("title", [n("u-text", {
      staticClass: ["u-cell-group__title__text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.title))])])], 2) : e._e(), n("view", {
      staticClass: ["u-cell-group__wrapper"]
    }, [e.border ? n("u-line") : e._e(), e._t("default")], 2)]);
  }, i = [];
})(module, exports, __r);
