// webpack 模块 276  [nvue]
// 出现于: pagesCore/account/account-safety.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js, pagesCore/login/logout.js, pagesCore/login/register.js
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
        duration: e.fade ? 1e3 : 0
      }
    }, [n("view", {
      staticClass: ["u-image"],
      style: [e.wrapStyle, e.backgroundStyle],
      on: {
        click: e.onClick
      }
    }, [e.isError ? e._e() : n("u-image", {
      staticClass: ["u-image__image"],
      style: {
        borderRadius: "circle" == e.shape ? "10000px" : e.$u.addUnit(e.radius),
        width: e.$u.addUnit(e.width),
        height: e.$u.addUnit(e.height)
      },
      attrs: {
        src: e.src,
        mode: e.mode,
        showMenuByLongpress: e.showMenuByLongpress,
        lazyLoad: e.lazyLoad
      },
      on: {
        error: e.onErrorHandler,
        load: e.onLoadHandler
      }
    }), e.showLoading && e.loading ? n("view", {
      staticClass: ["u-image__loading"],
      style: {
        borderRadius: "circle" == e.shape ? "50%" : e.$u.addUnit(e.radius),
        backgroundColor: this.bgColor,
        width: e.$u.addUnit(e.width),
        height: e.$u.addUnit(e.height)
      }
    }, [e._t("loading", [n("u-icon", {
      attrs: {
        name: e.loadingIcon,
        width: e.width,
        height: e.height
      }
    })])], 2) : e._e(), e.showError && e.isError && !e.loading ? n("view", {
      staticClass: ["u-image__error"],
      style: {
        borderRadius: "circle" == e.shape ? "50%" : e.$u.addUnit(e.radius),
        width: e.$u.addUnit(e.width),
        height: e.$u.addUnit(e.height)
      }
    }, [e._t("error", [n("u-icon", {
      attrs: {
        name: e.errorIcon,
        width: e.width,
        height: e.height
      }
    })])], 2) : e._e()], 1)]);
  }, i = [];
})(module, exports, __r);
