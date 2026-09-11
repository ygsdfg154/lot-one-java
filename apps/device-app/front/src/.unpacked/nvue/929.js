// webpack 模块 929  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = {
    props: {
      text: {
        type: [Array],
        default: uni.$u.props.columnNotice.text
      },
      icon: {
        type: String,
        default: uni.$u.props.columnNotice.icon
      },
      mode: {
        type: String,
        default: uni.$u.props.columnNotice.mode
      },
      color: {
        type: String,
        default: uni.$u.props.columnNotice.color
      },
      bgColor: {
        type: String,
        default: uni.$u.props.columnNotice.bgColor
      },
      fontSize: {
        type: [String, Number],
        default: uni.$u.props.columnNotice.fontSize
      },
      speed: {
        type: [String, Number],
        default: uni.$u.props.columnNotice.speed
      },
      step: {
        type: Boolean,
        default: uni.$u.props.columnNotice.step
      },
      duration: {
        type: [String, Number],
        default: uni.$u.props.columnNotice.duration
      },
      disableTouch: {
        type: Boolean,
        default: uni.$u.props.columnNotice.disableTouch
      }
    }
  };
  t.default = r;
})(module, exports, __r);
