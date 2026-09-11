// webpack 模块 818  [nvue]
// 出现于: pages/my/my.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      src: {
        type: String,
        default: uni.$u.props.avatar.src
      },
      shape: {
        type: String,
        default: uni.$u.props.avatar.shape
      },
      size: {
        type: [String, Number],
        default: uni.$u.props.avatar.size
      },
      mode: {
        type: String,
        default: uni.$u.props.avatar.mode
      },
      text: {
        type: String,
        default: uni.$u.props.avatar.text
      },
      bgColor: {
        type: String,
        default: uni.$u.props.avatar.bgColor
      },
      color: {
        type: String,
        default: uni.$u.props.avatar.color
      },
      fontSize: {
        type: [String, Number],
        default: uni.$u.props.avatar.fontSize
      },
      icon: {
        type: String,
        default: uni.$u.props.avatar.icon
      },
      mpAvatar: {
        type: Boolean,
        default: uni.$u.props.avatar.mpAvatar
      },
      randomBgColor: {
        type: Boolean,
        default: uni.$u.props.avatar.randomBgColor
      },
      defaultUrl: {
        type: String,
        default: uni.$u.props.avatar.defaultUrl
      },
      colorIndex: {
        type: [String, Number],
        validator: function (e) {
          return uni.$u.test.range(e, [0, 19]) || "" === e;
        },
        default: uni.$u.props.avatar.colorIndex
      },
      name: {
        type: String,
        default: uni.$u.props.avatar.name
      }
    }
  };
  t.default = a;
})(module, exports, __r);
