// webpack 模块 367  [nvue]
// 出现于: pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js, pagesCore/login/logout.js, pagesCore/login/register.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      seconds: {
        type: [String, Number],
        default: uni.$u.props.code.seconds
      },
      startText: {
        type: String,
        default: uni.$u.props.code.startText
      },
      changeText: {
        type: String,
        default: uni.$u.props.code.changeText
      },
      endText: {
        type: String,
        default: uni.$u.props.code.endText
      },
      keepRunning: {
        type: Boolean,
        default: uni.$u.props.code.keepRunning
      },
      uniqueKey: {
        type: String,
        default: uni.$u.props.code.uniqueKey
      }
    }
  };
  t.default = a;
})(module, exports, __r);
