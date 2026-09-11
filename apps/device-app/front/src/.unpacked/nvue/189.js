// webpack 模块 189  [nvue]
// 出现于: pages/ability/index.js, pagesCore/account/revise-pwd.js, pagesCore/account/revise-userInfo.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/227.js")), i = {
    name: "u-input",
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
      isShowClear: function () {
        var e = this.clearable, t = this.readonly, n = this.focused, a = this.innerValue;
        return !!e && !t && !!n && "" !== a;
      },
      inputClass: function () {
        var e = [], t = this.border, n = (this.disabled, this.shape);
        return ("surround" === t && (e = e.concat(["u-border", "u-input--radius"])), e.push(("u-input--").concat(n)), "bottom" === t && (e = e.concat(["u-border-bottom", "u-input--no-radius"])), e.join(" "));
      },
      wrapperStyle: function () {
        var e = {};
        return (this.disabled && (e.backgroundColor = this.disabledColor), "none" === this.border ? e.padding = "0" : (e.paddingTop = "6px", e.paddingBottom = "6px", e.paddingLeft = "9px", e.paddingRight = "9px"), uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
      },
      inputStyle: function () {
        return {
          color: this.color,
          fontSize: uni.$u.addUnit(this.fontSize),
          textAlign: this.inputAlign
        };
      }
    },
    methods: {
      setFormatter: function (e) {
        this.innerFormatter = e;
      },
      onInput: function (e) {
        var t = this, n = (e.detail || ({})).value, a = void 0 === n ? "" : n, r = (this.formatter || this.innerFormatter)(a);
        (this.innerValue = a, this.$nextTick(function () {
          (t.innerValue = r, t.valueChange());
        }));
      },
      onBlur: function (e) {
        var t = this;
        (this.$emit("blur", e.detail.value), uni.$u.sleep(50).then(function () {
          t.focused = !1;
        }), uni.$u.formValidate(this, "blur"));
      },
      onFocus: function (e) {
        (this.focused = !0, this.$emit("focus"));
      },
      onConfirm: function (e) {
        this.$emit("confirm", this.innerValue);
      },
      onkeyboardheightchange: function () {
        this.$emit("keyboardheightchange");
      },
      valueChange: function () {
        var e = this, t = this.innerValue;
        this.$nextTick(function () {
          (e.$emit("input", t), e.changeFromInner = !0, e.$emit("change", t), uni.$u.formValidate(e, "change"));
        });
      },
      onClear: function () {
        var e = this;
        (this.innerValue = "", this.$nextTick(function () {
          (e.valueChange(), e.$emit("clear"));
        }));
      },
      clickHandler: function () {
        if ("android" === uni.$u.os()) {
          var e = uni.$u.$parent.call(this, "u-form-item");
          e && e.clickHandler();
        }
      }
    }
  };
  t.default = i;
})(module, exports, __r);
