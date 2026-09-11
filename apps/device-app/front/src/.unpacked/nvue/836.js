// webpack 模块 836  [nvue]
// 出现于: pagesFunc/terminal/device-card.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      activeColor: {
        type: String,
        default: uni.$u.props.lineProgress.activeColor
      },
      inactiveColor: {
        type: String,
        default: uni.$u.props.lineProgress.color
      },
      percentage: {
        type: [String, Number],
        default: uni.$u.props.lineProgress.inactiveColor
      },
      showText: {
        type: Boolean,
        default: uni.$u.props.lineProgress.showText
      },
      height: {
        type: [String, Number],
        default: uni.$u.props.lineProgress.height
      }
    }
  };
  t.default = a;
})(module, exports, __r);
