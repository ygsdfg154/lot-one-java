// webpack 模块 c9cb  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      color: {
        type: String,
        default: uni.$u.props.line.color
      },
      length: {
        type: [String, Number],
        default: uni.$u.props.line.length
      },
      direction: {
        type: String,
        default: uni.$u.props.line.direction
      },
      hairline: {
        type: Boolean,
        default: uni.$u.props.line.hairline
      },
      margin: {
        type: [String, Number],
        default: uni.$u.props.line.margin
      },
      dashed: {
        type: Boolean,
        default: uni.$u.props.line.dashed
      }
    }
  };
  t.default = a;
})(module, exports, __r);
