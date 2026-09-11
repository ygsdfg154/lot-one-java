// webpack 模块 312  [nvue]
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
        default: uni.$u.props.picker.show
      },
      showToolbar: {
        type: Boolean,
        default: uni.$u.props.picker.showToolbar
      },
      title: {
        type: String,
        default: uni.$u.props.picker.title
      },
      columns: {
        type: Array,
        default: uni.$u.props.picker.columns
      },
      loading: {
        type: Boolean,
        default: uni.$u.props.picker.loading
      },
      itemHeight: {
        type: [String, Number],
        default: uni.$u.props.picker.itemHeight
      },
      cancelText: {
        type: String,
        default: uni.$u.props.picker.cancelText
      },
      confirmText: {
        type: String,
        default: uni.$u.props.picker.confirmText
      },
      cancelColor: {
        type: String,
        default: uni.$u.props.picker.cancelColor
      },
      confirmColor: {
        type: String,
        default: uni.$u.props.picker.confirmColor
      },
      visibleItemCount: {
        type: [String, Number],
        default: uni.$u.props.picker.visibleItemCount
      },
      keyName: {
        type: String,
        default: uni.$u.props.picker.keyName
      },
      closeOnClickOverlay: {
        type: Boolean,
        default: uni.$u.props.picker.closeOnClickOverlay
      },
      defaultIndex: {
        type: Array,
        default: uni.$u.props.picker.defaultIndex
      },
      immediateChange: {
        type: Boolean,
        default: uni.$u.props.picker.immediateChange
      }
    }
  };
  t.default = a;
})(module, exports, __r);
