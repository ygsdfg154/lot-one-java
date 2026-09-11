// webpack 模块 300  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/index.js, pagesFunc/terminal/remote-setup/index.js, pagesMore/my/developers/developers.js, pagesMore/my/developers/push-msgs.js
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
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uLine: require("uview-ui/components/u-line/u-line.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-cell"],
      class: [e.customClass],
      style: [e.$u.addStyle(e.customStyle)],
      attrs: {
        hoverClass: e.disabled || !e.clickable && !e.isLink ? "" : "u-cell--clickable",
        hoverStayTime: 250
      },
      on: {
        click: e.clickHandler
      }
    }, [n("view", {
      staticClass: ["u-cell__body"],
      class: [e.center && "u-cell--center", "large" === e.size && "u-cell__body--large"]
    }, [n("view", {
      staticClass: ["u-cell__body__content"]
    }, [e.$slots.icon || e.icon ? n("view", {
      staticClass: ["u-cell__left-icon-wrap"]
    }, [e.$slots.icon ? e._t("icon") : n("u-icon", {
      attrs: {
        name: e.icon,
        customStyle: e.iconStyle,
        size: "large" === e.size ? 22 : 18
      }
    })], 2) : e._e(), n("view", {
      staticClass: ["u-cell__title"]
    }, [e._t("title", [e.title ? n("u-text", {
      staticClass: ["u-cell__title-text"],
      class: [e.disabled && "u-cell--disabled", "large" === e.size && "u-cell__title-text--large"],
      style: [e.titleTextStyle],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.title))]) : e._e()]), e._t("label", [e.label ? n("u-text", {
      staticClass: ["u-cell__label"],
      class: [e.disabled && "u-cell--disabled", "large" === e.size && "u-cell__label--large"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.label))]) : e._e()])], 2)]), e._t("value", [e.$u.test.empty(e.value) ? e._e() : n("u-text", {
      staticClass: ["u-cell__value"],
      class: [e.disabled && "u-cell--disabled", "large" === e.size && "u-cell__value--large"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.value))])]), e.$slots["right-icon"] || e.isLink ? n("view", {
      staticClass: ["u-cell__right-icon-wrap"],
      class: ["u-cell__right-icon-wrap--" + e.arrowDirection]
    }, [e.$slots["right-icon"] ? e._t("right-icon") : n("u-icon", {
      attrs: {
        name: e.rightIcon,
        customStyle: e.rightIconStyle,
        color: e.disabled ? "#c8c9cc" : "info",
        size: "large" === e.size ? 18 : 16
      }
    })], 2) : e._e()], 2), e.border ? n("u-line") : e._e()], 1);
  }, i = [];
})(module, exports, __r);
