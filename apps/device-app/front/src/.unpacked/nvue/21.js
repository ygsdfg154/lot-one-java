// webpack 模块 21  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesCore/account/revise-pwd.js, pagesCore/account/revise-userInfo.js, pagesCore/login/bind-tel-more.js ...
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
    uLoadingIcon: require("uview-ui/components/u-loading-icon/u-loading-icon.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-button"],
      class: e.bemClass,
      style: [e.baseColor, e.$u.addStyle(e.customStyle)],
      attrs: {
        hoverStartTime: Number(e.hoverStartTime),
        hoverStayTime: Number(e.hoverStayTime),
        hoverClass: e.disabled || e.loading || e.color || !e.plain && "info" !== e.type ? e.disabled || e.loading || e.plain ? "" : "u-button--active" : "u-button--active--plain"
      },
      on: {
        click: e.clickHandler
      }
    }, [e.loading ? [n("u-loading-icon", {
      attrs: {
        mode: e.loadingMode,
        size: 1.15 * e.loadingSize,
        color: e.loadingColor
      }
    }), n("u-text", {
      staticClass: ["u-button__loading-text"],
      class: [e.plain && "u-button__text--plain--" + e.type],
      style: [e.nvueTextStyle],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.loadingText || e.text))])] : [e.icon ? n("u-icon", {
      attrs: {
        name: e.icon,
        color: e.iconColorCom,
        size: 1.35 * e.textSize
      }
    }) : e._e(), n("u-text", {
      staticClass: ["u-button__text"],
      class: [e.plain && "u-button__text--plain--" + e.type],
      style: [{
        marginLeft: e.icon ? "2px" : 0
      }, e.nvueTextStyle],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.text))])]], 2);
  }, i = [];
})(module, exports, __r);
