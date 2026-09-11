// webpack 模块 807  [nvue]
// 出现于: pages/msg/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return r;
  }), n.d(t, "c", function () {
    return a;
  }), n.d(t, "a", function () {}));
  var r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      ref: "u-subsection",
      staticClass: ["u-subsection"],
      class: ["u-subsection--" + e.mode],
      style: [e.$u.addStyle(e.customStyle), e.wrapperStyle]
    }, [n("view", {
      ref: "u-subsection__bar",
      staticClass: ["u-subsection__bar"],
      class: ["button" === e.mode && "u-subsection--button__bar", 0 === e.current && "subsection" === e.mode && "u-subsection__bar--first", e.current > 0 && e.current < e.list.length - 1 && "subsection" === e.mode && "u-subsection__bar--center", e.current === e.list.length - 1 && "subsection" === e.mode && "u-subsection__bar--last"],
      style: [e.barStyle]
    }), e._l(e.list, function (t, r) {
      return n("view", {
        key: r,
        ref: "u-subsection__item--" + r,
        refInFor: !0,
        staticClass: ["u-subsection__item"],
        class: ["u-subsection__item--" + r, r < e.list.length - 1 && "u-subsection__item--no-border-right", 0 === r && "u-subsection__item--first", r === e.list.length - 1 && "u-subsection__item--last"],
        style: [e.itemStyle(r)],
        on: {
          click: function (t) {
            e.clickHandler(r);
          }
        }
      }, [n("u-text", {
        staticClass: ["u-subsection__item__text"],
        style: [e.textStyle(r)],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(e.getText(t)))])]);
    })], 2);
  }, a = [];
})(module, exports, __r);
