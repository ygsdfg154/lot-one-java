// webpack 模块 440  [nvue]
// 出现于: pagesFunc/deviceInfo/index.js, pagesFunc/terminal/alerts-set/messages.js, pagesFunc/terminal/alerts-set/phone.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = {
    props: {
      model: {
        type: Object,
        default: uni.$u.props.form.model
      },
      rules: {
        type: [Object, Function, Array],
        default: uni.$u.props.form.rules
      },
      errorType: {
        type: String,
        default: uni.$u.props.form.errorType
      },
      borderBottom: {
        type: Boolean,
        default: uni.$u.props.form.borderBottom
      },
      labelPosition: {
        type: String,
        default: uni.$u.props.form.labelPosition
      },
      labelWidth: {
        type: [String, Number],
        default: uni.$u.props.form.labelWidth
      },
      labelAlign: {
        type: String,
        default: uni.$u.props.form.labelAlign
      },
      labelStyle: {
        type: Object,
        default: uni.$u.props.form.labelStyle
      }
    }
  };
  t.default = r;
})(module, exports, __r);
