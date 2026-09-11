// webpack 模块 419  [nvue]
// 出现于: pages/home/home.js, pagesPay/value-added/index.js
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
      ref: "u-scroll-list",
      staticClass: ["u-scroll-list"]
    }, [n("scroller", {
      ref: "u-scroll-list__scroll-view",
      staticClass: ["u-scroll-list__scroll-view"],
      attrs: {
        scrollDirection: "horizontal",
        showScrollbar: !1,
        offsetAccuracy: 1
      },
      on: {
        scroll: e.nvueScrollHandler
      }
    }, [n("view", {
      staticClass: ["u-scroll-list__scroll-view__content"]
    }, [e._t("default")], 2)]), e.indicator ? n("view", {
      staticClass: ["u-scroll-list__indicator"],
      style: [e.$u.addStyle(e.indicatorStyle)]
    }, [n("view", {
      staticClass: ["u-scroll-list__indicator__line"],
      style: [e.lineStyle]
    }, [n("view", {
      ref: "u-scroll-list__indicator__line__bar",
      staticClass: ["u-scroll-list__indicator__line__bar"],
      style: [e.barStyle]
    })])]) : e._e()]);
  }, a = [];
})(module, exports, __r);
