// webpack 模块 244  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesCore/account/account-safety.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js ...
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
