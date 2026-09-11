// webpack 模块 445  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/index.js, pagesFunc/terminal/remote-setup/index.js, pagesMore/my/developers/developers.js, pagesMore/my/developers/push-msgs.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      title: {
        type: [String, Number],
        default: uni.$u.props.cell.title
      },
      label: {
        type: [String, Number],
        default: uni.$u.props.cell.label
      },
      value: {
        type: [String, Number],
        default: uni.$u.props.cell.value
      },
      icon: {
        type: String,
        default: uni.$u.props.cell.icon
      },
      disabled: {
        type: Boolean,
        default: uni.$u.props.cell.disabled
      },
      border: {
        type: Boolean,
        default: uni.$u.props.cell.border
      },
      center: {
        type: Boolean,
        default: uni.$u.props.cell.center
      },
      url: {
        type: String,
        default: uni.$u.props.cell.url
      },
      linkType: {
        type: String,
        default: uni.$u.props.cell.linkType
      },
      clickable: {
        type: Boolean,
        default: uni.$u.props.cell.clickable
      },
      isLink: {
        type: Boolean,
        default: uni.$u.props.cell.isLink
      },
      required: {
        type: Boolean,
        default: uni.$u.props.cell.required
      },
      rightIcon: {
        type: String,
        default: uni.$u.props.cell.rightIcon
      },
      arrowDirection: {
        type: String,
        default: uni.$u.props.cell.arrowDirection
      },
      iconStyle: {
        type: [Object, String],
        default: function () {
          return uni.$u.props.cell.iconStyle;
        }
      },
      rightIconStyle: {
        type: [Object, String],
        default: function () {
          return uni.$u.props.cell.rightIconStyle;
        }
      },
      titleStyle: {
        type: [Object, String],
        default: function () {
          return uni.$u.props.cell.titleStyle;
        }
      },
      size: {
        type: String,
        default: uni.$u.props.cell.size
      },
      stop: {
        type: Boolean,
        default: uni.$u.props.cell.stop
      },
      name: {
        type: [Number, String],
        default: uni.$u.props.cell.name
      }
    }
  };
  t.default = a;
})(module, exports, __r);
