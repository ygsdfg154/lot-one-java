// webpack 模块 997a  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = {
    datetimePicker: {
      show: !1,
      showToolbar: !0,
      value: "",
      title: "",
      mode: "datetime",
      maxDate: new Date(new Date().getFullYear() + 10, 0, 1).getTime(),
      minDate: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
      minHour: 0,
      maxHour: 23,
      minMinute: 0,
      maxMinute: 59,
      filter: null,
      formatter: null,
      loading: !1,
      itemHeight: 44,
      cancelText: "\u53d6\u6d88",
      confirmText: "\u786e\u8ba4",
      cancelColor: "#909193",
      confirmColor: "#6081C7",
      visibleItemCount: 5,
      closeOnClickOverlay: !1,
      defaultIndex: function () {
        return [];
      }
    }
  };
  t.default = a;
})(module, exports, __r);
