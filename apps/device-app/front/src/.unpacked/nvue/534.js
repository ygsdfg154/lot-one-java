// webpack 模块 534  [nvue]
// 出现于: pages/msg/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/22.js")), i = r(require("@/.unpacked/nvue/23.js")), o = r(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = r(require("../../common/config.nvue.js"));
  function u(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r));
    }
    return n;
  }
  function l(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? u(Object(n), !0).forEach(function (t) {
        (0, o.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var c = getApp().globalData, _ = {
    computed: l(l(l({}, (0, s.mapState)("alarmLog", ["statistics"])), (0, s.mapGetters)(["userType"])), {}, {
      statisticsNotEmpty: function () {
        return this.statistics.some(function (e) {
          return e.count;
        });
      }
    }),
    data: function () {
      return {
        cdn: d.default.cdn,
        timeList: [c.$t("message.today"), c.$t("message.this.week"), c.$t("message.this.month")],
        currentTime: 0,
        primaryColor: d.default.primaryColor
      };
    },
    mounted: function () {
      this.fetchData();
    },
    methods: l(l({}, (0, s.mapActions)("alarmLog", ["GetAlarmStatistics"])), {}, {
      l: function (e) {
        return c.$t(e);
      },
      fetchData: function () {
        var e = this;
        return (async function () {
          await e.GetAlarmStatistics({
            type: e.currentTime + 1
          });
          uni.stopPullDownRefresh();
        })();
      },
      changeTime: function (e) {
        (this.currentTime = e, this.fetchData());
      },
      gotoAlarmList: function (e) {
        uni.navigateTo({
          url: ("/pagesMore/message/table?alarmType=").concat(e, "&current=").concat(this.currentTime + 1)
        });
      }
    })
  };
  t.default = _;
})(module, exports, __r);
