// webpack 模块 0eef  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      list: {
        type: Array,
        default: uni.$u.props.subsection.list
      },
      current: {
        type: [String, Number],
        default: uni.$u.props.subsection.current
      },
      activeColor: {
        type: String,
        default: uni.$u.props.subsection.activeColor
      },
      inactiveColor: {
        type: String,
        default: uni.$u.props.subsection.inactiveColor
      },
      mode: {
        type: String,
        default: uni.$u.props.subsection.mode
      },
      fontSize: {
        type: [String, Number],
        default: uni.$u.props.subsection.fontSize
      },
      bold: {
        type: Boolean,
        default: uni.$u.props.subsection.bold
      },
      bgColor: {
        type: String,
        default: uni.$u.props.subsection.bgColor
      },
      keyName: {
        type: String,
        default: uni.$u.props.subsection.keyName
      }
    }
  };
  t.default = a;
})(module, exports, __r);
