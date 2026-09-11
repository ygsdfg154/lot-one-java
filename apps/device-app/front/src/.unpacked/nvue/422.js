// webpack 模块 422  [nvue]
// 出现于: pagesFunc/terminal/corral/info.js, pagesPay/list/specifics.js
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
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-radio"],
      class: ["u-radio-label--" + e.parentData.iconPlacement, e.parentData.borderBottom && "column" === e.parentData.placement && "u-border-bottom"],
      style: [e.radioStyle],
      on: {
        click: e.wrapperClickHandler
      }
    }, [n("view", {
      staticClass: ["u-radio__icon-wrap"],
      class: e.iconClasses,
      style: [e.iconWrapStyle],
      on: {
        click: e.iconClickHandler
      }
    }, [e._t("icon", [n("u-icon", {
      staticClass: ["u-radio__icon-wrap__icon"],
      attrs: {
        name: "checkbox-mark",
        size: e.elIconSize,
        color: e.elIconColor
      }
    })])], 2), e._t("default", [n("u-text", {
      staticClass: ["u-radio__text"],
      style: {
        color: e.elDisabled ? e.elInactiveColor : e.elLabelColor,
        fontSize: e.elLabelSize,
        lineHeight: e.elLabelSize
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: e.labelClickHandler
      }
    }, [e._v(e._s(e.label))])])], 2);
  }, i = [];
})(module, exports, __r);
