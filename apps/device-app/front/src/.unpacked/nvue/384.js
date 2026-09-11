// webpack 模块 384  [nvue]
// 出现于: pagesMore/my/developers/developers.js, pagesPay/list/specifics.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/458.js")), i = {
    name: "u-textarea",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    data: function () {
      return {
        innerValue: "",
        focused: !1,
        firstChange: !0,
        changeFromInner: !1,
        innerFormatter: function (e) {
          return e;
        }
      };
    },
    watch: {
      value: {
        immediate: !0,
        handler: function (e, t) {
          (this.innerValue = e, this.firstChange = !1, this.changeFromInner = !1);
        }
      }
    },
    computed: {
      textareaClass: function () {
        var e = [], t = this.border, n = this.disabled;
        this.shape;
        return ("surround" === t && (e = e.concat(["u-border", "u-textarea--radius"])), "bottom" === t && (e = e.concat(["u-border-bottom", "u-textarea--no-radius"])), n && e.push("u-textarea--disabled"), e.join(" "));
      },
      textareaStyle: function () {
        var e = {};
        return ("android" === uni.$u.os() && (e.paddingTop = "6px", e.paddingLeft = "9px", e.paddingBottom = "3px", e.paddingRight = "6px"), uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
      }
    },
    methods: {
      setFormatter: function (e) {
        this.innerFormatter = e;
      },
      onFocus: function (e) {
        this.$emit("focus", e);
      },
      onBlur: function (e) {
        (this.$emit("blur", e), uni.$u.formValidate(this, "blur"));
      },
      onLinechange: function (e) {
        this.$emit("linechange", e);
      },
      onInput: function (e) {
        var t = this, n = (e.detail || ({})).value, a = void 0 === n ? "" : n, r = (this.formatter || this.innerFormatter)(a);
        (this.innerValue = a, this.$nextTick(function () {
          (t.innerValue = r, t.valueChange());
        }));
      },
      valueChange: function () {
        var e = this, t = this.innerValue;
        this.$nextTick(function () {
          (e.$emit("input", t), e.changeFromInner = !0, e.$emit("change", t), uni.$u.formValidate(e, "change"));
        });
      },
      onConfirm: function (e) {
        this.$emit("confirm", e);
      },
      onKeyboardheightchange: function (e) {
        this.$emit("keyboardheightchange", e);
      }
    }
  };
  t.default = i;
})(module, exports, __r);
