// webpack 模块 838  [nvue]
// 出现于: pagesFunc/terminal/corral/info.js, pagesFunc/terminal/locus/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      min: {
        type: [Number, String],
        default: uni.$u.props.slider.min
      },
      max: {
        type: [Number, String],
        default: uni.$u.props.slider.max
      },
      step: {
        type: [Number, String],
        default: uni.$u.props.slider.step
      },
      value: {
        type: [Number, String],
        default: uni.$u.props.slider.value
      },
      activeColor: {
        type: String,
        default: uni.$u.props.slider.activeColor
      },
      inactiveColor: {
        type: String,
        default: uni.$u.props.slider.inactiveColor
      },
      blockSize: {
        type: [Number, String],
        default: uni.$u.props.slider.blockSize
      },
      blockColor: {
        type: String,
        default: uni.$u.props.slider.blockColor
      },
      disabled: {
        type: Boolean,
        default: uni.$u.props.slider.disabled
      },
      showValue: {
        type: Boolean,
        default: uni.$u.props.slider.showValue
      }
    }
  };
  t.default = a;
})(module, exports, __r);
