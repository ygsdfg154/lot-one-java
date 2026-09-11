// webpack 模块 420  [nvue]
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
    var e = this, t = e.$createElement;
    return (e._self._c || t)("uvTextarea", {
      attrs: {
        value: e.value,
        placeholder: e.placeholder,
        height: e.height,
        confirmType: e.confirmType,
        disabled: e.disabled,
        count: e.count,
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
        border: e.border,
        customStyle: e.customStyle,
        formatter: e.formatter,
        ignoreCompositionEvent: e.ignoreCompositionEvent
      },
      on: {
        focus: function (t) {
          return e.$emit("focus");
        },
        blur: function (t) {
          return e.$emit("blur");
        },
        linechange: function (t) {
          return e.$emit("linechange", t);
        },
        confirm: function (t) {
          return e.$emit("confirm");
        },
        input: function (t) {
          return e.$emit("input", t);
        },
        keyboardheightchange: function (t) {
          return e.$emit("keyboardheightchange");
        }
      }
    });
  }, r = [];
})(module, exports, __r);
