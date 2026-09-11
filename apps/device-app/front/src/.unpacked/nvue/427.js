// webpack 模块 427  [nvue]
// 出现于: pagesFunc/terminal/list/index.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return i;
  }), n.d(t, "c", function () {
    return r;
  }), n.d(t, "a", function () {
    return a;
  }));
  var a = {
    uBadge: require("uview-ui/components/u-badge/u-badge.vue").default
  }, i = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-tabs"]
    }, [n("view", {
      staticClass: ["u-tabs__wrapper"]
    }, [e._t("left"), n("view", {
      staticClass: ["u-tabs__wrapper__scroll-view-wrapper"]
    }, [n("scroll-view", {
      ref: "u-tabs__wrapper__scroll-view",
      staticClass: ["u-tabs__wrapper__scroll-view"],
      attrs: {
        scrollX: e.scrollable,
        scrollLeft: e.scrollLeft,
        scrollWithAnimation: !0,
        showScrollbar: !1
      }
    }, [n("view", {
      ref: "u-tabs__wrapper__nav",
      staticClass: ["u-tabs__wrapper__nav"]
    }, [e._l(e.list, function (t, a) {
      return n("view", {
        key: a,
        ref: "u-tabs__wrapper__nav__item-" + a,
        refInFor: !0,
        staticClass: ["u-tabs__wrapper__nav__item"],
        class: ["u-tabs__wrapper__nav__item-" + a, t.disabled && "u-tabs__wrapper__nav__item--disabled"],
        style: [e.$u.addStyle(e.itemStyle), {
          flex: e.scrollable ? "" : 1
        }],
        on: {
          click: function (n) {
            e.clickHandler(t, a);
          }
        }
      }, [n("u-text", {
        staticClass: ["u-tabs__wrapper__nav__item__text"],
        class: [t.disabled && "u-tabs__wrapper__nav__item__text--disabled"],
        style: [e.textStyle(a)],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t[e.keyName]))]), n("u-badge", {
        attrs: {
          show: !(!t.badge || !(t.badge.show || t.badge.isDot || t.badge.value)),
          isDot: t.badge && t.badge.isDot || e.propsBadge.isDot,
          value: t.badge && t.badge.value || e.propsBadge.value,
          max: t.badge && t.badge.max || e.propsBadge.max,
          type: t.badge && t.badge.type || e.propsBadge.type,
          showZero: t.badge && t.badge.showZero || e.propsBadge.showZero,
          bgColor: t.badge && t.badge.bgColor || e.propsBadge.bgColor,
          color: t.badge && t.badge.color || e.propsBadge.color,
          shape: t.badge && t.badge.shape || e.propsBadge.shape,
          numberType: t.badge && t.badge.numberType || e.propsBadge.numberType,
          inverted: t.badge && t.badge.inverted || e.propsBadge.inverted,
          customStyle: "margin-left: 4px;"
        }
      })], 1);
    }), n("view", {
      ref: "u-tabs__wrapper__nav__line",
      staticClass: ["u-tabs__wrapper__nav__line"],
      style: [{
        width: e.$u.addUnit(e.lineWidth),
        height: e.$u.addUnit(e.lineHeight),
        background: e.lineColor,
        backgroundSize: e.lineBgSize
      }]
    })], 2)])], 1), e._t("right")], 2)]);
  }, r = [];
})(module, exports, __r);
