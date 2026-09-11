// webpack 模块 311  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesFunc/terminal/corral/info.js, pagesFunc/terminal/locate-mode/index.js, pagesFunc/terminal/locus/index.js ...
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
        default: uni.$u.props.toolbar.show
      },
      cancelText: {
        type: String,
        default: uni.$u.props.toolbar.cancelText
      },
      confirmText: {
        type: String,
        default: uni.$u.props.toolbar.confirmText
      },
      cancelColor: {
        type: String,
        default: uni.$u.props.toolbar.cancelColor
      },
      confirmColor: {
        type: String,
        default: uni.$u.props.toolbar.confirmColor
      },
      title: {
        type: String,
        default: uni.$u.props.toolbar.title
      }
    }
  };
  t.default = a;
})(module, exports, __r);
