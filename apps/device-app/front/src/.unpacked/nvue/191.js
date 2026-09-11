// webpack 模块 191  [nvue]
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
    uOverlay: require("uview-ui/components/u-overlay/u-overlay.vue").default,
    uTransition: require("uview-ui/components/u-transition/u-transition.vue").default,
    uStatusBar: require("uview-ui/components/u-status-bar/u-status-bar.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uSafeBottom: require("uview-ui/components/u-safe-bottom/u-safe-bottom.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-popup"]
    }, [e.overlay ? n("u-overlay", {
      attrs: {
        show: e.show,
        duration: e.overlayDuration,
        customStyle: e.overlayStyle,
        opacity: e.overlayOpacity
      },
      on: {
        click: e.overlayClick
      }
    }) : e._e(), n("u-transition", {
      attrs: {
        show: e.show,
        customStyle: e.transitionStyle,
        mode: e.position,
        duration: e.duration
      },
      on: {
        afterEnter: e.afterEnter,
        click: e.clickHandler
      }
    }, [n("view", {
      staticClass: ["u-popup__content"],
      style: [e.contentStyle],
      on: {
        click: e.noop
      }
    }, [e.safeAreaInsetTop ? n("u-status-bar") : e._e(), e._t("default"), e.closeable ? n("view", {
      staticClass: ["u-popup__content__close"],
      class: ["u-popup__content__close--" + e.closeIconPos],
      attrs: {
        hoverClass: "u-popup__content__close--hover",
        hoverStayTime: "150"
      },
      on: {
        click: e.close
      }
    }, [n("u-icon", {
      attrs: {
        name: "close",
        color: "#909399",
        size: "18",
        bold: !0
      }
    })], 1) : e._e(), e.safeAreaInsetBottom ? n("u-safe-bottom") : e._e()], 2)])], 1);
  }, i = [];
})(module, exports, __r);
