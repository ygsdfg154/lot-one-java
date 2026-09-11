// webpack 模块 196  [nvue]
// 出现于: pages/ability/index.js, pagesCore/account/revise-pwd.js, pagesCore/account/revise-userInfo.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js ...
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
      staticClass: ["u-input"],
      class: e.inputClass,
      style: [e.wrapperStyle]
    }, [n("view", {
      staticClass: ["u-input__content"]
    }, [e.prefixIcon || e.$slots.prefix ? n("view", {
      staticClass: ["u-input__content__prefix-icon"]
    }, [e._t("prefix", [n("u-icon", {
      attrs: {
        name: e.prefixIcon,
        size: "18",
        customStyle: e.prefixIconStyle
      }
    })])], 2) : e._e(), n("view", {
      staticClass: ["u-input__content__field-wrapper"],
      on: {
        click: e.clickHandler
      }
    }, [n("u-input", {
      staticClass: ["u-input__content__field-wrapper__field"],
      style: [e.inputStyle],
      attrs: {
        type: e.type,
        focus: e.focus,
        cursor: e.cursor,
        value: e.innerValue,
        autoBlur: e.autoBlur,
        disabled: e.disabled || e.readonly,
        maxlength: e.maxlength,
        placeholder: e.placeholder,
        placeholderStyle: e.placeholderStyle,
        placeholderClass: e.placeholderClass,
        confirmType: e.confirmType,
        confirmHold: e.confirmHold,
        holdKeyboard: e.holdKeyboard,
        cursorSpacing: e.cursorSpacing,
        adjustPosition: e.adjustPosition,
        selectionEnd: e.selectionEnd,
        selectionStart: e.selectionStart,
        password: e.password || "password" === e.type || void 0,
        ignoreCompositionEvent: e.ignoreCompositionEvent
      },
      on: {
        input: e.onInput,
        blur: e.onBlur,
        focus: e.onFocus,
        confirm: e.onConfirm,
        keyboardheightchange: e.onkeyboardheightchange
      }
    })], 1), e.isShowClear ? n("view", {
      staticClass: ["u-input__content__clear"],
      on: {
        click: e.onClear
      }
    }, [n("u-icon", {
      attrs: {
        name: "close",
        size: "11",
        color: "#ffffff",
        customStyle: "line-height: 12px"
      }
    })], 1) : e._e(), e.suffixIcon || e.$slots.suffix ? n("view", {
      staticClass: ["u-input__content__subfix-icon"]
    }, [e._t("suffix", [n("u-icon", {
      attrs: {
        name: e.suffixIcon,
        size: "18",
        customStyle: e.suffixIconStyle
      }
    })])], 2) : e._e()])]);
  }, i = [];
})(module, exports, __r);
