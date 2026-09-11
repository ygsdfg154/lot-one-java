// webpack 模块 931  [nvue]
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
        type: String,
        default: uni.$u.props.rowNotice.text
      },
      icon: {
        type: String,
        default: uni.$u.props.rowNotice.icon
      },
      mode: {
        type: String,
        default: uni.$u.props.rowNotice.mode
      },
      color: {
        type: String,
        default: uni.$u.props.rowNotice.color
      },
      bgColor: {
        type: String,
        default: uni.$u.props.rowNotice.bgColor
      },
      fontSize: {
        type: [String, Number],
        default: uni.$u.props.rowNotice.fontSize
      },
      speed: {
        type: [String, Number],
        default: uni.$u.props.rowNotice.speed
      }
    }
  };
  t.default = r;
})(module, exports, __r);
