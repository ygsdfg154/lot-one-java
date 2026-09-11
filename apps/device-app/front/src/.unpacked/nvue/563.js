// webpack 模块 563  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/5.js")), i = (r(require("../../common/config.nvue.js")), require("vuex"));
  function o(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r));
    }
    return n;
  }
  function s(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? o(Object(n), !0).forEach(function (t) {
        (0, a.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var d = {
    data: function () {
      return {};
    },
    computed: s({}, (0, i.mapGetters)(["noticeData"])),
    watch: {
      noticeData: {
        handler: function (e, t) {},
        immediate: !0
      }
    },
    methods: s(s({}, (0, i.mapMutations)("app", ["setNoticeData"])), {}, {
      closeNotice: function () {
        this.setNoticeData(null);
      },
      clickNotice: function () {
        this.noticeData && uni.navigateTo({
          url: "/pagesMore/notice/index"
        });
      }
    })
  };
  t.default = d;
})(module, exports, __r);
