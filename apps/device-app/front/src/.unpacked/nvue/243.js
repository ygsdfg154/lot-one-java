// webpack 模块 243  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesFunc/terminal/corral/info.js, pagesFunc/terminal/locate-mode/index.js, pagesFunc/terminal/locus/index.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return r;
  }), n.d(t, "a", function () {}));
  var a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return e.show ? n("view", {
      staticClass: ["u-toolbar"],
      on: {
        touchmove: e.noop
      }
    }, [n("view", {
      staticClass: ["u-toolbar__cancel__wrapper"],
      attrs: {
        hoverClass: "u-hover-class"
      }
    }, [n("u-text", {
      staticClass: ["u-toolbar__wrapper__cancel"],
      style: {
        color: e.cancelColor
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: e.cancel
      }
    }, [e._v(e._s(e.cancelText))])]), e.title ? n("u-text", {
      staticClass: ["u-toolbar__title", "u-line-1"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.title))]) : e._e(), n("view", {
      staticClass: ["u-toolbar__confirm__wrapper"],
      attrs: {
        hoverClass: "u-hover-class"
      }
    }, [n("u-text", {
      staticClass: ["u-toolbar__wrapper__confirm"],
      style: {
        color: e.confirmColor
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: e.confirm
      }
    }, [e._v(e._s(e.confirmText))])])]) : e._e();
  }, r = [];
})(module, exports, __r);
