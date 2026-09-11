// webpack 模块 b8ab  [svc]
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
        default: uni.$u.props.popup.show
      },
      overlay: {
        type: Boolean,
        default: uni.$u.props.popup.overlay
      },
      mode: {
        type: String,
        default: uni.$u.props.popup.mode
      },
      duration: {
        type: [String, Number],
        default: uni.$u.props.popup.duration
      },
      closeable: {
        type: Boolean,
        default: uni.$u.props.popup.closeable
      },
      overlayStyle: {
        type: [Object, String],
        default: uni.$u.props.popup.overlayStyle
      },
      closeOnClickOverlay: {
        type: Boolean,
        default: uni.$u.props.popup.closeOnClickOverlay
      },
      zIndex: {
        type: [String, Number],
        default: uni.$u.props.popup.zIndex
      },
      safeAreaInsetBottom: {
        type: Boolean,
        default: uni.$u.props.popup.safeAreaInsetBottom
      },
      safeAreaInsetTop: {
        type: Boolean,
        default: uni.$u.props.popup.safeAreaInsetTop
      },
      closeIconPos: {
        type: String,
        default: uni.$u.props.popup.closeIconPos
      },
      round: {
        type: [Boolean, String, Number],
        default: uni.$u.props.popup.round
      },
      zoom: {
        type: Boolean,
        default: uni.$u.props.popup.zoom
      },
      bgColor: {
        type: String,
        default: uni.$u.props.popup.bgColor
      },
      overlayOpacity: {
        type: [Number, String],
        default: uni.$u.props.popup.overlayOpacity
      }
    }
  };
  t.default = a;
})(module, exports, __r);
