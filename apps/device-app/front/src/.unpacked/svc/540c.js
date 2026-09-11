// webpack 模块 540c  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      show: {
        type: Boolean,
        default: uni.$u.props.transition.show
      },
      mode: {
        type: String,
        default: uni.$u.props.transition.mode
      },
      duration: {
        type: [String, Number],
        default: uni.$u.props.transition.duration
      },
      timingFunction: {
        type: String,
        default: uni.$u.props.transition.timingFunction
      }
    }
  };
  t.default = a;
})(module, exports, __r);
