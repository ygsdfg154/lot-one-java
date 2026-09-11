// webpack 模块 539  [nvue]
// 出现于: pages/msg/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var r = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var a = r(require("@/.unpacked/nvue/5.js")), i = require("vuex"), o = r(require("moment")), s = require("../../common/utils.nvue.js");
    function d(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, r));
      }
      return n;
    }
    function u(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? d(Object(n), !0).forEach(function (t) {
          (0, a.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : d(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var l = getApp().globalData, c = new Date(), _ = c.getFullYear(), m = c.getMonth() + 1;
    m = m < 10 ? ("0").concat(m) : m;
    var f = c.getDate();
    f = f < 10 ? ("0").concat(f) : f;
    var p = {
      computed: u(u({}, (0, i.mapGetters)(["userType", "selectedTerminal", "sysInfo", "appConfig"])), {}, {
        currentStartModel: function () {
          return this.currentStartDate ? [this.currentStartDate, this.currentStartDate] : ["-", ("").concat(this.currentDate, " 00:00:00")];
        },
        currentEndModel: function () {
          return this.currentEndDate ? [this.currentEndDate, this.currentEndDate] : ["-", ("").concat(this.currentDate, " 23:59:59")];
        }
      }),
      props: ["filterData"],
      data: function () {
        return {
          alarmListType: null,
          startDataShow: !1,
          endDataShow: !1,
          currentStartDate: "",
          currentEndDate: "",
          maxDate: ("").concat(_, "-").concat(m, "-").concat(f, " 23:59:59"),
          currentDate: (0, o.default)(c).format("YYYY-MM-DD")
        };
      },
      mounted: function () {
        this.init();
      },
      methods: {
        l: function (e) {
          return l.$t(e);
        },
        init: function () {
          var t = this;
          (this.alarmListType = JSON.parse(JSON.stringify(this.appConfig.alarmTypes)), this.alarmListType = this.alarmListType.map(function (e) {
            return (e.state = !1, e);
          }), this.filterData && (e("log", this.filterData, "this.filterData", " at pages/msg/components/terminalFilter.nvue:150"), this.alarmListType.map(function (e) {
            return (t.filterData.alarmTypes.find(function (t) {
              t == e.value && (e.state = !0);
            }), e);
          }), this.currentStartDate = this.filterData.beginTime, this.currentEndDate = this.filterData.endTime));
        },
        alarmItemHandler: function (e) {
          this.alarmListType = this.alarmListType.map(function (t) {
            return (t.value == e && (t.state = !t.state), t);
          });
        },
        confirmPicker: function (e, t) {
          var n = (0, o.default)(e.value).format("YYYY-MM-DD HH:mm:ss");
          "start" == t ? (this.currentStartDate = n, this.startDataShow = !1) : (this.currentEndDate = n, this.endDataShow = !1);
        },
        timeChangeMs: function (e) {
          return (0, o.default)(e).valueOf();
        },
        resetHandler: function () {
          (this.currentStartDate = "", this.currentEndDate = "", this.alarmListType = this.alarmListType.map(function (e) {
            return (e.state = !1, e);
          }));
        },
        confirmAlarm: function () {
          if ((e("log", "this.currentStartDate", this.currentStartDate, this.currentEndDate, " at pages/msg/components/terminalFilter.nvue:197"), !this.currentStartDate && this.currentEndDate)) return (0, s.qzwlToast)("\u8bf7\u9009\u62e9\u5f00\u59cb\u65f6\u95f4", "none");
          if (this.currentStartDate && !this.currentEndDate) return (0, s.qzwlToast)("\u8bf7\u9009\u62e9\u7ed3\u675f\u65f6\u95f4", "none");
          var t = {};
          (t.alarmTypes = this.alarmListType.map(function (e) {
            if (e.state) return e.value;
          }).filter(function (e) {
            return !!e;
          }), t.beginTime = this.currentStartDate, t.endTime = this.currentEndDate, this.$emit("fetchData", {
            param: t,
            value: !0
          }), this.$emit("filterClose"));
        }
      }
    };
    t.default = p;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
