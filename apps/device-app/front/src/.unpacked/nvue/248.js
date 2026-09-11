// webpack 模块 248  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js ...
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
        default: uni.$u.props.overlay.show
      },
      zIndex: {
        type: [String, Number],
        default: uni.$u.props.overlay.zIndex
      },
      duration: {
        type: [String, Number],
        default: uni.$u.props.overlay.duration
      },
      opacity: {
        type: [String, Number],
        default: uni.$u.props.overlay.opacity
      }
    }
  };
  t.default = a;
})(module, exports, __r);
