// webpack 模块 587  [nvue]
// 出现于: pagesMore/notice/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, a) {
  "use strict";
  var n = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = n(require("@/.unpacked/nvue/22.js")), s = n(require("@/.unpacked/nvue/23.js")), i = n(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = n(require("moment"));
  function _(e, t) {
    var a = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      (t && (n = n.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), a.push.apply(a, n));
    }
    return a;
  }
  function u(e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = null != arguments[t] ? arguments[t] : {};
      t % 2 ? _(Object(a), !0).forEach(function (t) {
        (0, i.default)(e, t, a[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : _(Object(a)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
      });
    }
    return e;
  }
  var m = getApp().globalData, l = {
    data: function () {
      return {
        noticeInfo: null
      };
    },
    computed: u({}, (0, o.mapGetters)(["noticeData", "username"])),
    onLoad: function () {
      this.init();
    },
    methods: u(u({}, (0, o.mapActions)("app", ["GetNoticeDetails"])), {}, {
      l: function (e) {
        return m.$t(e);
      },
      init: function () {
        var e = this;
        return (async function () {
          var a;
          (a = await e.GetNoticeDetails(e.noticeData.id)).succeeded && (a.data.issueTime = (0, d.default)(a.data.createTime, "YYYY/MM/DD HH:mm:ss").format("YYYY\u5e74M\u6708D\u53f7"), e.noticeInfo = a.data);
        })();
      }
    })
  };
  t.default = l;
})(module, exports, __r);
