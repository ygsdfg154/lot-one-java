// webpack 模块 049b  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      offsetTop: {
        type: [String, Number],
        default: uni.$u.props.sticky.offsetTop
      },
      customNavHeight: {
        type: [String, Number],
        default: uni.$u.props.sticky.customNavHeight
      },
      disabled: {
        type: Boolean,
        default: uni.$u.props.sticky.disabled
      },
      bgColor: {
        type: String,
        default: uni.$u.props.sticky.bgColor
      },
      zIndex: {
        type: [String, Number],
        default: uni.$u.props.sticky.zIndex
      },
      index: {
        type: [String, Number],
        default: uni.$u.props.sticky.index
      }
    }
  };
  t.default = a;
})(module, exports, __r);
