// webpack 模块 343  [nvue]
// 出现于: pages/msg/index.js, pagesFunc/terminal/list/enterprise.js, pagesFunc/terminal/list/index.js
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
      staticClass: ["u-search"],
      style: [{
        margin: e.margin
      }, e.$u.addStyle(e.customStyle)],
      on: {
        click: e.clickHandler
      }
    }, [n("view", {
      staticClass: ["u-search__content"],
      style: {
        backgroundColor: e.bgColor,
        borderRadius: "round" == e.shape ? "100px" : "4px",
        borderColor: e.borderColor
      }
    }, [e.$slots.label || null !== e.label ? [e._t("label", [n("u-text", {
      staticClass: ["u-search__content__label"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.label))])])] : e._e(), n("view", {
      staticClass: ["u-search__content__icon"]
    }, [n("u-icon", {
      attrs: {
        size: e.searchIconSize,
        name: e.searchIcon,
        color: e.searchIconColor ? e.searchIconColor : e.color
      },
      on: {
        click: e.clickIcon
      }
    })], 1), n("u-input", {
      staticClass: ["u-search__content__input"],
      style: [{
        textAlign: e.inputAlign,
        color: e.color,
        backgroundColor: e.bgColor,
        height: e.$u.addUnit(e.height)
      }, e.inputStyle],
      attrs: {
        confirmType: "search",
        value: e.value,
        disabled: e.disabled,
        focus: e.focus,
        maxlength: e.maxlength,
        placeholderClass: "u-search__content__input--placeholder",
        placeholder: e.placeholder,
        placeholderStyle: "color: " + e.placeholderColor,
        type: "text"
      },
      on: {
        blur: e.blur,
        confirm: e.search,
        input: e.inputChange,
        focus: e.getFocus
      }
    }), e.keyword && e.clearabled && e.focused ? n("view", {
      staticClass: ["u-search__content__icon", "u-search__content__close"],
      on: {
        click: e.clear
      }
    }, [n("u-icon", {
      attrs: {
        name: "close",
        size: "11",
        color: "#ffffff",
        customStyle: "line-height: 12px"
      }
    })], 1) : e._e()], 2), n("u-text", {
      staticClass: ["u-search__action"],
      class: [(e.showActionBtn || e.show) && "u-search__action--active"],
      style: [e.actionStyle],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: e.custom
      }
    }, [e._v(e._s(e.actionText))])]);
  }, i = [];
})(module, exports, __r);
