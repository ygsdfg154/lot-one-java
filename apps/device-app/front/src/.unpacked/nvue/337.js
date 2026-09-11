// webpack 模块 337  [nvue]
// 出现于: pagesFunc/deviceInfo/index.js, pagesFunc/terminal/alerts-set/messages.js, pagesFunc/terminal/alerts-set/phone.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("uview-ui/components/u-form/u-form.vue")), i = r(require("@/.unpacked/nvue/440.js")), o = {
    name: "u--form",
    mixins: [uni.$u.mpMixin, i.default, uni.$u.mixin],
    components: {
      uvForm: a.default
    },
    created: function () {
      this.children = [];
    },
    methods: {
      setRules: function (e) {
        this.$refs.uForm.setRules(e);
      },
      validate: function () {
        return this.$refs.uForm.validate();
      },
      validateField: function (e, t) {
        return this.$refs.uForm.validateField(e, t);
      },
      resetFields: function () {
        return this.$refs.uForm.resetFields();
      },
      clearValidate: function (e) {
        return this.$refs.uForm.clearValidate(e);
      },
      setMpData: function () {
        this.$refs.uForm.children = this.children;
      }
    }
  };
  t.default = o;
})(module, exports, __r);
