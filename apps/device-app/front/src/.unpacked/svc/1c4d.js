// webpack 模块 1c4d  [svc]
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
    uTransition: require("uview-ui/components/u-transition/u-transition.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("u-transition", {
      attrs: {
        mode: "fade",
        show: e.show,
        duration: e.fade ? 1e3 : 0,
        _i: 0
      }
    }, [n("view", {
      staticClass: e._$s(1, "sc", "u-image"),
      style: e._$s(1, "s", [e.wrapStyle, e.backgroundStyle]),
      attrs: {
        _i: 1
      },
      on: {
        click: e.onClick
      }
    }, [e._$s(2, "i", !e.isError) ? n("image", {
      staticClass: e._$s(2, "sc", "u-image__image"),
      style: e._$s(2, "s", {
        borderRadius: "circle" == e.shape ? "10000px" : e.$u.addUnit(e.radius),
        width: e.$u.addUnit(e.width),
        height: e.$u.addUnit(e.height)
      }),
      attrs: {
        src: e._$s(2, "a-src", e.src),
        mode: e._$s(2, "a-mode", e.mode),
        "show-menu-by-longpress": e._$s(2, "a-show-menu-by-longpress", e.showMenuByLongpress),
        "lazy-load": e._$s(2, "a-lazy-load", e.lazyLoad),
        _i: 2
      },
      on: {
        error: e.onErrorHandler,
        load: e.onLoadHandler
      }
    }) : e._e(), e._$s(3, "i", e.showLoading && e.loading) ? n("view", {
      staticClass: e._$s(3, "sc", "u-image__loading"),
      style: e._$s(3, "s", {
        borderRadius: "circle" == e.shape ? "50%" : e.$u.addUnit(e.radius),
        backgroundColor: this.bgColor,
        width: e.$u.addUnit(e.width),
        height: e.$u.addUnit(e.height)
      }),
      attrs: {
        _i: 3
      }
    }, [e._t("loading", [n("u-icon", {
      attrs: {
        name: e.loadingIcon,
        width: e.width,
        height: e.height,
        _i: 5
      }
    })], {
      _i: 4
    })], 2) : e._e(), e._$s(6, "i", e.showError && e.isError && !e.loading) ? n("view", {
      staticClass: e._$s(6, "sc", "u-image__error"),
      style: e._$s(6, "s", {
        borderRadius: "circle" == e.shape ? "50%" : e.$u.addUnit(e.radius),
        width: e.$u.addUnit(e.width),
        height: e.$u.addUnit(e.height)
      }),
      attrs: {
        _i: 6
      }
    }, [e._t("error", [n("u-icon", {
      attrs: {
        name: e.errorIcon,
        width: e.width,
        height: e.height,
        _i: 8
      }
    })], {
      _i: 7
    })], 2) : e._e()])]);
  }, i = [];
})(module, exports, __r);
