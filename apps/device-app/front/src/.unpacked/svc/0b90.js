// webpack 模块 0b90  [svc]
// 出现于: pagesPay/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  var r = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var s = r(require("@/.unpacked/svc/7ca3.js")), n = require("vuex");
  function i(t, e) {
    var a = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      (e && (r = r.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), a.push.apply(a, r));
    }
    return a;
  }
  getApp().globalData;
  var c = {
    data: function () {
      return {};
    },
    computed: (function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var a = null != arguments[e] ? arguments[e] : {};
        e % 2 ? i(Object(a), !0).forEach(function (e) {
          (0, s.default)(t, e, a[e]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : i(Object(a)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
        });
      }
      return t;
    })({}, (0, n.mapGetters)(["appMpShow"])),
    methods: {}
  };
  e.default = c;
})(module, exports, __r);
