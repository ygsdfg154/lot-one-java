// webpack 模块 ef3d  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    props: {
      title: {
        type: String,
        default: uni.$u.props.calendar.title
      },
      showTitle: {
        type: Boolean,
        default: uni.$u.props.calendar.showTitle
      },
      showSubtitle: {
        type: Boolean,
        default: uni.$u.props.calendar.showSubtitle
      },
      mode: {
        type: String,
        default: uni.$u.props.calendar.mode
      },
      startText: {
        type: String,
        default: uni.$u.props.calendar.startText
      },
      endText: {
        type: String,
        default: uni.$u.props.calendar.endText
      },
      customList: {
        type: Array,
        default: uni.$u.props.calendar.customList
      },
      color: {
        type: String,
        default: uni.$u.props.calendar.color
      },
      minDate: {
        type: [String, Number],
        default: uni.$u.props.calendar.minDate
      },
      maxDate: {
        type: [String, Number],
        default: uni.$u.props.calendar.maxDate
      },
      defaultDate: {
        type: [Array, String, Date, null],
        default: uni.$u.props.calendar.defaultDate
      },
      maxCount: {
        type: [String, Number],
        default: uni.$u.props.calendar.maxCount
      },
      rowHeight: {
        type: [String, Number],
        default: uni.$u.props.calendar.rowHeight
      },
      formatter: {
        type: [Function, null],
        default: uni.$u.props.calendar.formatter
      },
      showLunar: {
        type: Boolean,
        default: uni.$u.props.calendar.showLunar
      },
      showMark: {
        type: Boolean,
        default: uni.$u.props.calendar.showMark
      },
      confirmText: {
        type: String,
        default: uni.$u.props.calendar.confirmText
      },
      confirmDisabledText: {
        type: String,
        default: uni.$u.props.calendar.confirmDisabledText
      },
      show: {
        type: Boolean,
        default: uni.$u.props.calendar.show
      },
      closeOnClickOverlay: {
        type: Boolean,
        default: uni.$u.props.calendar.closeOnClickOverlay
      },
      readonly: {
        type: Boolean,
        default: uni.$u.props.calendar.readonly
      },
      showConfirm: {
        type: Boolean,
        default: uni.$u.props.calendar.showConfirm
      },
      maxRange: {
        type: [Number, String],
        default: uni.$u.props.calendar.maxRange
      },
      rangePrompt: {
        type: String,
        default: uni.$u.props.calendar.rangePrompt
      },
      showRangePrompt: {
        type: Boolean,
        default: uni.$u.props.calendar.showRangePrompt
      },
      allowSameDay: {
        type: Boolean,
        default: uni.$u.props.calendar.allowSameDay
      },
      round: {
        type: [Boolean, String, Number],
        default: uni.$u.props.calendar.round
      },
      monthNum: {
        type: [Number, String],
        default: 3
      }
    }
  };
  t.default = a;
})(module, exports, __r);
