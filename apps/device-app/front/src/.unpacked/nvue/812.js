// webpack 模块 812  [nvue]
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
    })], 1) : e._e()]), n("swiper", {
      staticClass: ["u-notice__swiper"],
      attrs: {
        disableTouch: e.disableTouch,
        vertical: !e.step,
        circular: !0,
        interval: e.duration,
        autoplay: !0
      },
      on: {
        change: e.noticeChange
      }
    }, e._l(e.text, function (t, r) {
      return n("swiper-item", {
        key: r,
        staticClass: ["u-notice__swiper__item"]
      }, [n("u-text", {
        staticClass: ["u-notice__swiper__item__text", "u-line-1"],
        style: [e.textStyle],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t))])]);
    }), 1), ["link", "closable"].includes(e.mode) ? n("view", {
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
