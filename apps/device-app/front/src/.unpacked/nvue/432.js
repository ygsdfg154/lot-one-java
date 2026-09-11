// webpack 模块 432  [nvue]
// 出现于: pagesMore/my/developers/developers.js, pagesPay/list/specifics.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return r;
  }), n.d(t, "a", function () {}));
  var a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-textarea"],
      class: e.textareaClass,
      style: [e.textareaStyle]
    }, [n("u-textarea", {
      staticClass: ["u-textarea__field"],
      style: {
        height: e.$u.addUnit(e.height)
      },
      attrs: {
        value: e.innerValue,
        placeholder: e.placeholder,
        placeholderStyle: e.$u.addStyle(e.placeholderStyle, "string"),
        placeholderClass: e.placeholderClass,
        disabled: e.disabled,
        focus: e.focus,
        autoHeight: e.autoHeight,
        fixed: e.fixed,
        cursorSpacing: e.cursorSpacing,
        cursor: e.cursor,
        showConfirmBar: e.showConfirmBar,
        selectionStart: e.selectionStart,
        selectionEnd: e.selectionEnd,
        adjustPosition: e.adjustPosition,
        disableDefaultPadding: e.disableDefaultPadding,
        holdKeyboard: e.holdKeyboard,
        maxlength: e.maxlength,
        confirmType: e.confirmType,
        ignoreCompositionEvent: e.ignoreCompositionEvent
      },
      on: {
        focus: e.onFocus,
        blur: e.onBlur,
        linechange: e.onLinechange,
        input: e.onInput,
        confirm: e.onConfirm,
        keyboardheightchange: e.onKeyboardheightchange
      }
    }), e.count ? n("u-text", {
      staticClass: ["u-textarea__count"],
      style: {
        "background-color": e.disabled ? "transparent" : "#fff"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.innerValue.length) + "/" + e._s(e.maxlength))]) : e._e()], 1);
  }, r = [];
})(module, exports, __r);
