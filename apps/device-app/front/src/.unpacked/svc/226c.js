// webpack 模块 226c  [svc]
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
    uOverlay: require("uview-ui/components/u-overlay/u-overlay.vue").default,
    uTransition: require("uview-ui/components/u-transition/u-transition.vue").default,
    uStatusBar: require("uview-ui/components/u-status-bar/u-status-bar.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uSafeBottom: require("uview-ui/components/u-safe-bottom/u-safe-bottom.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: e._$s(0, "sc", "u-popup"),
      attrs: {
        _i: 0
      }
    }, [e._$s(1, "i", e.overlay) ? n("u-overlay", {
      attrs: {
        show: e.show,
        duration: e.overlayDuration,
        customStyle: e.overlayStyle,
        opacity: e.overlayOpacity,
        _i: 1
      },
      on: {
        click: e.overlayClick
      }
    }) : e._e(), n("u-transition", {
      attrs: {
        show: e.show,
        customStyle: e.transitionStyle,
        mode: e.position,
        duration: e.duration,
        _i: 2
      },
      on: {
        afterEnter: e.afterEnter,
        click: e.clickHandler
      }
    }, [n("view", {
      staticClass: e._$s(3, "sc", "u-popup__content"),
      style: e._$s(3, "s", [e.contentStyle]),
      attrs: {
        _i: 3
      },
      on: {
        click: function (t) {
          return (t.stopPropagation(), e.noop(t));
        }
      }
    }, [e._$s(4, "i", e.safeAreaInsetTop) ? n("u-status-bar", {
      attrs: {
        _i: 4
      }
    }) : e._e(), e._t("default", null, {
      _i: 5
    }), e._$s(6, "i", e.closeable) ? n("view", {
      staticClass: e._$s(6, "sc", "u-popup__content__close"),
      class: e._$s(6, "c", ["u-popup__content__close--" + e.closeIconPos]),
      attrs: {
        _i: 6
      },
      on: {
        click: function (t) {
          return (t.stopPropagation(), e.close(t));
        }
      }
    }, [n("u-icon", {
      attrs: {
        name: "close",
        color: "#909399",
        size: "18",
        bold: !0,
        _i: 7
      }
    })], 1) : e._e(), e._$s(8, "i", e.safeAreaInsetBottom) ? n("u-safe-bottom", {
      attrs: {
        _i: 8
      }
    }) : e._e()], 2)])], 1);
  }, i = [];
})(module, exports, __r);
