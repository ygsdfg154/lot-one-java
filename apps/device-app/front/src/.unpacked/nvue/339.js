// webpack 模块 339  [nvue]
// 出现于: pagesFunc/deviceInfo/index.js, pagesFunc/terminal/alerts-set/messages.js, pagesFunc/terminal/alerts-set/phone.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/22.js")), i = r(require("@/.unpacked/nvue/472.js")), o = r(require("@/.unpacked/nvue/5.js")), s = r(require("@/.unpacked/nvue/23.js")), d = r(require("@/.unpacked/nvue/440.js")), u = r(require("@/.unpacked/nvue/476.js"));
  u.default.warning = function () {};
  var l = {
    name: "u-form",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, d.default],
    provide: function () {
      return {
        uForm: this
      };
    },
    data: function () {
      return {
        formRules: {},
        validator: {},
        originalModel: null
      };
    },
    watch: {
      rules: {
        immediate: !0,
        handler: function (e) {
          this.setRules(e);
        }
      },
      propsChange: function (e) {
        var t;
        null !== (t = this.children) && void 0 !== t && t.length && this.children.map(function (e) {
          "function" == typeof e.updateParentData && e.updateParentData();
        });
      },
      model: {
        immediate: !0,
        handler: function (e) {
          this.originalModel || (this.originalModel = uni.$u.deepClone(e));
        }
      }
    },
    computed: {
      propsChange: function () {
        return [this.errorType, this.borderBottom, this.labelPosition, this.labelWidth, this.labelAlign, this.labelStyle];
      }
    },
    created: function () {
      this.children = [];
    },
    methods: {
      setRules: function (e) {
        0 !== Object.keys(e).length && (this.formRules = e, this.validator = new u.default(e));
      },
      resetFields: function () {
        this.resetModel();
      },
      resetModel: function (e) {
        var t = this;
        this.children.map(function (e) {
          var n = null == e ? void 0 : e.prop, r = uni.$u.getProperty(t.originalModel, n);
          uni.$u.setProperty(t.model, n, r);
        });
      },
      clearValidate: function (e) {
        (e = [].concat(e), this.children.map(function (t) {
          (void 0 === e[0] || e.includes(t.prop)) && (t.message = null);
        }));
      },
      validateField: function (e, t) {
        var n = arguments, r = this;
        return (async function () {
          var d;
          (d = n.length > 2 && void 0 !== n[2] ? n[2] : null, r.$nextTick(function () {
            var n = [];
            (e = [].concat(e), r.children.map(function (t) {
              var a = [];
              if (e.includes(t.prop)) {
                var s = uni.$u.getProperty(r.model, t.prop), l = t.prop.split("."), _ = l[l.length - 1], c = r.formRules[t.prop];
                if (!c) return;
                for (var m = [].concat(c), f = 0; f < m.length; f++) {
                  var p = m[f], h = [].concat(null == p ? void 0 : p.trigger);
                  if (!d || h.includes(d)) new u.default((0, o.default)({}, _, p)).validate((0, o.default)({}, _, s), function (e, r) {
                    var o, s;
                    (uni.$u.test.array(e) && (n.push.apply(n, (0, i.default)(e)), a.push.apply(a, (0, i.default)(e))), t.message = null !== (o = null === (s = a[0]) || void 0 === s ? void 0 : s.message) && void 0 !== o ? o : null);
                  });
                }
              }
            }), "function" == typeof t && t(n));
          }));
        })();
      },
      validate: function (e) {
        var t = this;
        return new Promise(function (e, n) {
          t.$nextTick(function () {
            var r = t.children.map(function (e) {
              return e.prop;
            });
            t.validateField(r, function (r) {
              r.length ? ("toast" === t.errorType && uni.$u.toast(r[0].message), n(r)) : e(!0);
            });
          });
        });
      }
    }
  };
  t.default = l;
})(module, exports, __r);
