// webpack 模块 956  [nvue]
// 出现于: pagesPay/list/specifics.js
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
        default: uni.$u.props.actionSheet.show
      },
      title: {
        type: String,
        default: uni.$u.props.actionSheet.title
      },
      description: {
        type: String,
        default: uni.$u.props.actionSheet.description
      },
      actions: {
        type: Array,
        default: uni.$u.props.actionSheet.actions
      },
      cancelText: {
        type: String,
        default: uni.$u.props.actionSheet.cancelText
      },
      closeOnClickAction: {
        type: Boolean,
        default: uni.$u.props.actionSheet.closeOnClickAction
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: uni.$u.props.actionSheet.safeAreaInsetBottom
      },
      openType: {
        type: String,
        default: uni.$u.props.actionSheet.openType
      },
      closeOnClickOverlay: {
        type: Boolean,
        default: uni.$u.props.actionSheet.closeOnClickOverlay
      },
      round: {
        type: [Boolean, String, Number],
        default: uni.$u.props.actionSheet.round
      }
    }
  };
  t.default = a;
})(module, exports, __r);
