// webpack 模块 451  [nvue]
// 出现于: pages/msg/index.js, pagesFunc/terminal/locate-mode/index.js, pagesFunc/terminal/locus/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = {
    props: {
      show: {
        type: Boolean,
        default: uni.$u.props.datetimePicker.show
      },
      showToolbar: {
        type: Boolean,
        default: uni.$u.props.datetimePicker.showToolbar
      },
      value: {
        type: [String, Number],
        default: uni.$u.props.datetimePicker.value
      },
      title: {
        type: String,
        default: uni.$u.props.datetimePicker.title
      },
      mode: {
        type: String,
        default: uni.$u.props.datetimePicker.mode
      },
      maxDate: {
        type: Number,
        default: uni.$u.props.datetimePicker.maxDate
      },
      minDate: {
        type: Number,
        default: uni.$u.props.datetimePicker.minDate
      },
      minHour: {
        type: Number,
        default: uni.$u.props.datetimePicker.minHour
      },
      maxHour: {
        type: Number,
        default: uni.$u.props.datetimePicker.maxHour
      },
      minMinute: {
        type: Number,
        default: uni.$u.props.datetimePicker.minMinute
      },
      maxMinute: {
        type: Number,
        default: uni.$u.props.datetimePicker.maxMinute
      },
      filter: {
        type: [Function, null],
        default: uni.$u.props.datetimePicker.filter
      },
      formatter: {
        type: [Function, null],
        default: uni.$u.props.datetimePicker.formatter
      },
      loading: {
        type: Boolean,
        default: uni.$u.props.datetimePicker.loading
      },
      itemHeight: {
        type: [String, Number],
        default: uni.$u.props.datetimePicker.itemHeight
      },
      cancelText: {
        type: String,
        default: uni.$u.props.datetimePicker.cancelText
      },
      confirmText: {
        type: String,
        default: uni.$u.props.datetimePicker.confirmText
      },
      cancelColor: {
        type: String,
        default: uni.$u.props.datetimePicker.cancelColor
      },
      confirmColor: {
        type: String,
        default: uni.$u.props.datetimePicker.confirmColor
      },
      visibleItemCount: {
        type: [String, Number],
        default: uni.$u.props.datetimePicker.visibleItemCount
      },
      closeOnClickOverlay: {
        type: Boolean,
        default: uni.$u.props.datetimePicker.closeOnClickOverlay
      },
      defaultIndex: {
        type: Array,
        default: uni.$u.props.datetimePicker.defaultIndex
      }
    }
  };
  t.default = r;
})(module, exports, __r);
