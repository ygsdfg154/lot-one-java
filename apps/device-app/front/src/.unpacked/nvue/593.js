// webpack 模块 593  [nvue]
// 出现于: pagesMore/my/developers/push-msgs.js
const __r = require('./__runtime.js').wrap();
(function (t, e, i) {
  "use strict";
  var o = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var r = o(require("@/.unpacked/nvue/5.js"));
  function n(t, e) {
    var i = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(t);
      (e && (o = o.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), i.push.apply(i, o));
    }
    return i;
  }
  var l = {
    data: function () {
      return {};
    },
    computed: (function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var i = null != arguments[e] ? arguments[e] : {};
        e % 2 ? n(Object(i), !0).forEach(function (e) {
          (0, r.default)(t, e, i[e]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i)) : n(Object(i)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
        });
      }
      return t;
    })({}, (0, require("vuex").mapState)("dev", ["pushMessages"])),
    onLoad: function () {},
    methods: {
      navigateToPage: function (t) {
        uni.navigateTo({
          url: t
        });
      },
      showMessage: function (t) {
        uni.navigateTo({
          url: "/pages/dev/push-message",
          success: function (e) {
            e.eventChannel.emit("acceptDataFromOpenerPage", t);
          }
        });
      }
    }
  };
  e.default = l;
})(module, exports, __r);
