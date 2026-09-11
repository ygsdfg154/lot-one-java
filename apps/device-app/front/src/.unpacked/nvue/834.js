// webpack 模块 834  [nvue]
// 出现于: pagesFunc/terminal/list/index.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      duration: {
        type: Number,
        default: uni.$u.props.tabs.duration
      },
      list: {
        type: Array,
        default: uni.$u.props.tabs.list
      },
      lineColor: {
        type: String,
        default: uni.$u.props.tabs.lineColor
      },
      activeStyle: {
        type: [String, Object],
        default: uni.$u.props.tabs.activeStyle
      },
      inactiveStyle: {
        type: [String, Object],
        default: uni.$u.props.tabs.inactiveStyle
      },
      lineWidth: {
        type: [String, Number],
        default: uni.$u.props.tabs.lineWidth
      },
      lineHeight: {
        type: [String, Number],
        default: uni.$u.props.tabs.lineHeight
      },
      lineBgSize: {
        type: String,
        default: uni.$u.props.tabs.lineBgSize
      },
      itemStyle: {
        type: [String, Object],
        default: uni.$u.props.tabs.itemStyle
      },
      scrollable: {
        type: Boolean,
        default: uni.$u.props.tabs.scrollable
      },
      current: {
        type: [Number, String],
        default: uni.$u.props.tabs.current
      },
      keyName: {
        type: String,
        default: uni.$u.props.tabs.keyName
      }
    }
  };
  t.default = a;
})(module, exports, __r);
