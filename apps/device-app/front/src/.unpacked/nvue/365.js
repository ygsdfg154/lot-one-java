// webpack 模块 365  [nvue]
// 出现于: pages/my/my.js, pagesFunc/deviceInfo/index.js, pagesFunc/terminal/alerts-set/index.js, pagesFunc/terminal/locus/index.js, pagesMore/my/developers/developers.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      loading: {
        type: Boolean,
        default: uni.$u.props.switch.loading
      },
      disabled: {
        type: Boolean,
        default: uni.$u.props.switch.disabled
      },
      size: {
        type: [String, Number],
        default: uni.$u.props.switch.size
      },
      activeColor: {
        type: String,
        default: uni.$u.props.switch.activeColor
      },
      inactiveColor: {
        type: String,
        default: uni.$u.props.switch.inactiveColor
      },
      value: {
        type: [Boolean, String, Number],
        default: uni.$u.props.switch.value
      },
      activeValue: {
        type: [String, Number, Boolean],
        default: uni.$u.props.switch.activeValue
      },
      inactiveValue: {
        type: [String, Number, Boolean],
        default: uni.$u.props.switch.inactiveValue
      },
      asyncChange: {
        type: Boolean,
        default: uni.$u.props.switch.asyncChange
      },
      space: {
        type: [String, Number],
        default: uni.$u.props.switch.space
      }
    }
  };
  t.default = a;
})(module, exports, __r);
