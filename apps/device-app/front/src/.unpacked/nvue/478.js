// webpack 模块 478  [nvue]
// 出现于: pagesFunc/deviceInfo/index.js, pagesFunc/terminal/alerts-set/messages.js, pagesFunc/terminal/alerts-set/phone.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = {
    props: {
      label: {
        type: String,
        default: uni.$u.props.formItem.label
      },
      prop: {
        type: String,
        default: uni.$u.props.formItem.prop
      },
      borderBottom: {
        type: [String, Boolean],
        default: uni.$u.props.formItem.borderBottom
      },
      labelPosition: {
        type: String,
        default: uni.$u.props.formItem.labelPosition
      },
      labelWidth: {
        type: [String, Number],
        default: uni.$u.props.formItem.labelWidth
      },
      rightIcon: {
        type: String,
        default: uni.$u.props.formItem.rightIcon
      },
      leftIcon: {
        type: String,
        default: uni.$u.props.formItem.leftIcon
      },
      required: {
        type: Boolean,
        default: uni.$u.props.formItem.required
      },
      leftIconStyle: {
        type: [String, Object],
        default: uni.$u.props.formItem.leftIconStyle
      }
    }
  };
  t.default = r;
})(module, exports, __r);
