// webpack 模块 192  [nvue]
// 出现于: pages/ability/index.js, pagesCore/account/revise-pwd.js, pagesCore/account/revise-userInfo.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return r;
  }), n.d(t, "a", function () {}));
  var a = function () {
    var e = this, t = e.$createElement;
    return (e._self._c || t)("uvInput", {
      attrs: {
        value: e.value,
        type: e.type,
        fixed: e.fixed,
        disabled: e.disabled,
        disabledColor: e.disabledColor,
        clearable: e.clearable,
        password: e.password,
        maxlength: e.maxlength,
        placeholder: e.placeholder,
        placeholderClass: e.placeholderClass,
        placeholderStyle: e.placeholderStyle,
        showWordLimit: e.showWordLimit,
        confirmType: e.confirmType,
        confirmHold: e.confirmHold,
        holdKeyboard: e.holdKeyboard,
        focus: e.focus,
        autoBlur: e.autoBlur,
        disableDefaultPadding: e.disableDefaultPadding,
        cursor: e.cursor,
        cursorSpacing: e.cursorSpacing,
        selectionStart: e.selectionStart,
        selectionEnd: e.selectionEnd,
        adjustPosition: e.adjustPosition,
        inputAlign: e.inputAlign,
        fontSize: e.fontSize,
        color: e.color,
        prefixIcon: e.prefixIcon,
        suffixIcon: e.suffixIcon,
        suffixIconStyle: e.suffixIconStyle,
        prefixIconStyle: e.prefixIconStyle,
        border: e.border,
        readonly: e.readonly,
        shape: e.shape,
        customStyle: e.customStyle,
        formatter: e.formatter,
        ignoreCompositionEvent: e.ignoreCompositionEvent
      },
      on: {
        focus: function (t) {
          e.$emit("focus");
        },
        blur: function (t) {
          return e.$emit("blur", t);
        },
        keyboardheightchange: function (t) {
          e.$emit("keyboardheightchange");
        },
        change: function (t) {
          return e.$emit("change", t);
        },
        input: function (t) {
          return e.$emit("input", t);
        },
        confirm: function (t) {
          return e.$emit("confirm", t);
        },
        clear: function (t) {
          e.$emit("clear");
        },
        click: function (t) {
          e.$emit("click");
        }
      }
    }, [e._t("prefix", null, {
      slot: "prefix"
    }), e._t("suffix", null, {
      slot: "suffix"
    })], 2);
  }, r = [];
})(module, exports, __r);
