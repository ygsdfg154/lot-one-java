// webpack 模块 341  [nvue]
// 出现于: pagesFunc/deviceInfo/index.js, pagesFunc/terminal/alerts-set/messages.js, pagesFunc/terminal/alerts-set/phone.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/478.js")), i = {
    name: "u-form-item",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, a.default],
    data: function () {
      return {
        message: "",
        parentData: {
          labelPosition: "left",
          labelAlign: "left",
          labelStyle: {},
          labelWidth: 45,
          errorType: "message"
        }
      };
    },
    computed: {
      propsLine: function () {
        return uni.$u.props.line;
      }
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
        (this.updateParentData(), this.parent || uni.$u.error("u-form-item\u9700\u8981\u7ed3\u5408u-form\u7ec4\u4ef6\u4f7f\u7528"));
      },
      updateParentData: function () {
        this.getParentData("u-form");
      },
      clearValidate: function () {
        this.message = null;
      },
      resetField: function () {
        var e = uni.$u.getProperty(this.parent.originalModel, this.prop);
        (uni.$u.setProperty(this.parent.model, this.prop, e), this.message = null);
      },
      clickHandler: function () {
        this.$emit("click");
      }
    }
  };
  t.default = i;
})(module, exports, __r);
