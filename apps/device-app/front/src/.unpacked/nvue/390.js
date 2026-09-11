// webpack 模块 390  [nvue]
// 出现于: pagesFunc/terminal/corral/info.js, pagesPay/list/specifics.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/828.js")), i = {
    name: "u-radio",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, r.default],
    data: function () {
      return {
        checked: !1,
        parentData: {
          iconSize: 12,
          labelDisabled: null,
          disabled: null,
          shape: null,
          activeColor: null,
          inactiveColor: null,
          size: 18,
          value: null,
          iconColor: null,
          placement: "row",
          borderBottom: !1,
          iconPlacement: "left"
        }
      };
    },
    computed: {
      elDisabled: function () {
        return "" !== this.disabled ? this.disabled : null !== this.parentData.disabled && this.parentData.disabled;
      },
      elLabelDisabled: function () {
        return "" !== this.labelDisabled ? this.labelDisabled : null !== this.parentData.labelDisabled && this.parentData.labelDisabled;
      },
      elSize: function () {
        return this.size ? this.size : this.parentData.size ? this.parentData.size : 21;
      },
      elIconSize: function () {
        return this.iconSize ? this.iconSize : this.parentData.iconSize ? this.parentData.iconSize : 12;
      },
      elActiveColor: function () {
        return this.activeColor ? this.activeColor : this.parentData.activeColor ? this.parentData.activeColor : "#6081C7";
      },
      elInactiveColor: function () {
        return this.inactiveColor ? this.inactiveColor : this.parentData.inactiveColor ? this.parentData.inactiveColor : "#c8c9cc";
      },
      elLabelColor: function () {
        return this.labelColor ? this.labelColor : this.parentData.labelColor ? this.parentData.labelColor : "#606266";
      },
      elShape: function () {
        return this.shape ? this.shape : this.parentData.shape ? this.parentData.shape : "circle";
      },
      elLabelSize: function () {
        return uni.$u.addUnit(this.labelSize ? this.labelSize : this.parentData.labelSize ? this.parentData.labelSize : "15");
      },
      elIconColor: function () {
        var e = this.iconColor ? this.iconColor : this.parentData.iconColor ? this.parentData.iconColor : "#ffffff";
        return this.elDisabled ? this.checked ? this.elInactiveColor : "transparent" : this.checked ? e : "transparent";
      },
      iconClasses: function () {
        var e = [];
        return (e.push("u-radio__icon-wrap--" + this.elShape), this.elDisabled && e.push("u-radio__icon-wrap--disabled"), this.checked && this.elDisabled && e.push("u-radio__icon-wrap--disabled--checked"), e);
      },
      iconWrapStyle: function () {
        var e = {};
        return (e.backgroundColor = this.checked && !this.elDisabled ? this.elActiveColor : "#ffffff", e.borderColor = this.checked && !this.elDisabled ? this.elActiveColor : this.elInactiveColor, e.width = uni.$u.addUnit(this.elSize), e.height = uni.$u.addUnit(this.elSize), "right" === this.parentData.iconPlacement && (e.marginRight = 0), e);
      },
      radioStyle: function () {
        var e = {};
        return (this.parentData.borderBottom && "row" === this.parentData.placement && uni.$u.error("\u68c0\u6d4b\u5230\u60a8\u5c06borderBottom\u8bbe\u7f6e\u4e3atrue\uff0c\u9700\u8981\u540c\u65f6\u5c06u-radio-group\u7684placement\u8bbe\u7f6e\u4e3acolumn\u624d\u6709\u6548"), this.parentData.borderBottom && "column" === this.parentData.placement && (e.paddingBottom = "ios" === uni.$u.os() ? "12px" : "8px"), uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
      }
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
        (this.updateParentData(), this.parent || uni.$u.error("u-radio\u5fc5\u987b\u642d\u914du-radio-group\u7ec4\u4ef6\u4f7f\u7528"), this.checked = this.name === this.parentData.value);
      },
      updateParentData: function () {
        this.getParentData("u-radio-group");
      },
      iconClickHandler: function (e) {
        (this.preventEvent(e), this.elDisabled || this.setRadioCheckedStatus());
      },
      wrapperClickHandler: function (e) {
        "right" === this.parentData.iconPlacement && this.iconClickHandler(e);
      },
      labelClickHandler: function (e) {
        (this.preventEvent(e), this.elLabelDisabled || this.elDisabled || this.setRadioCheckedStatus());
      },
      emitEvent: function () {
        var e = this;
        this.checked || (this.$emit("change", this.name), this.$nextTick(function () {
          uni.$u.formValidate(e, "change");
        }));
      },
      setRadioCheckedStatus: function () {
        (this.emitEvent(), this.checked = !0, "function" == typeof this.parent.unCheckedOther && this.parent.unCheckedOther(this));
      }
    }
  };
  t.default = i;
})(module, exports, __r);
