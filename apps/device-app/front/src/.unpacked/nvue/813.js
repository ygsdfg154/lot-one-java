// webpack 模块 813  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return i;
  }), n.d(t, "a", function () {
    return r;
  }));
  var r = {
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-notice"],
      on: {
        click: e.clickHandler
      }
    }, [e._t("icon", [e.icon ? n("view", {
      staticClass: ["u-notice__left-icon"]
    }, [n("u-icon", {
      attrs: {
        name: e.icon,
        color: e.color,
        size: "19"
      }
    })], 1) : e._e()]), n("view", {
      ref: "u-notice__content",
      staticClass: ["u-notice__content"]
    }, [n("view", {
      ref: "u-notice__content__text",
      staticClass: ["u-notice__content__text"],
      style: [e.animationStyle]
    }, e._l(e.innerText, function (t, r) {
      return n("u-text", {
        key: r,
        style: [e.textStyle],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t))]);
    }), 0)]), ["link", "closable"].includes(e.mode) ? n("view", {
      staticClass: ["u-notice__right-icon"]
    }, ["link" === e.mode ? n("u-icon", {
      attrs: {
        name: "arrow-right",
        size: 17,
        color: e.color
      }
    }) : e._e(), "closable" === e.mode ? n("u-icon", {
      attrs: {
        name: "close",
        size: 16,
        color: e.color
      },
      on: {
        click: e.close
      }
    }) : e._e()], 1) : e._e()], 2);
  }, i = [];
})(module, exports, __r);
