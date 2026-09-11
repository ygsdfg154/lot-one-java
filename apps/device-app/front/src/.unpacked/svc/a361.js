// webpack 模块 a361  [svc]
// 出现于: pagesFunc/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  (function (t) {
    var n = require("@/.unpacked/svc/47a9.js");
    (Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0);
    var r = n(require("@/.unpacked/svc/127e.js")), i = n(require("@/.unpacked/svc/ee10.js")), s = n(require("@/.unpacked/svc/7ca3.js")), o = require("vuex"), c = n(require("../../common/config.js")), u = (require("@/.unpacked/svc/aa02.js"), require("../../common/utils.js"), n(require("moment"))), l = n(require("../../components/calendarFrame/calendarFrame.vue"));
    function d(t, e) {
      var a = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        (e && (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })), a.push.apply(a, n));
      }
      return a;
    }
    function f(t) {
      for (var e = 1; e < arguments.length; e++) {
        var a = null != arguments[e] ? arguments[e] : {};
        e % 2 ? d(Object(a), !0).forEach(function (e) {
          (0, s.default)(t, e, a[e]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : d(Object(a)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
        });
      }
      return t;
    }
    var p = getApp().globalData, m = new Date(), v = {
      components: {
        calendarFrame: l.default
      },
      data: function () {
        var t;
        return {
          cdn: c.default.cdn,
          pattern: (t = {
            color: c.default.primaryColor,
            backgroundColor: "#fff",
            selectedColor: c.default.primaryColor,
            buttonColor: c.default.primaryColor
          }, (0, s.default)(t, "backgroundColor", c.default.primaryColor), (0, s.default)(t, "icon", "bars"), t),
          reportType: 0,
          date: [(0, u.default)(m).format("YYYY-MM-DD")],
          currentDate: (0, u.default)(m).format("YYYY-MM-DD"),
          tripList: [{
            name: "\u505c\u7559\u62a5\u8868"
          }, {
            name: "\u884c\u7a0b\u62a5\u8868"
          }]
        };
      },
      computed: f(f(f({}, (0, o.mapState)("report", ["reportList", "status"])), (0, o.mapGetters)(["selectedTerminal"])), {}, {
        param: function () {
          return {
            type: this.reportType,
            refresh: !0
          };
        }
      }),
      onLoad: function () {
        this.fetchData({
          type: this.reportType,
          refresh: !0
        });
      },
      onReady: function () {
        this.currentDate = this.date[0] = (0, u.default)(new Date()).format("YYYY-MM-DD");
      },
      onReachBottom: function () {
        this.fetchData({
          type: this.reportType,
          refresh: !1
        });
      },
      onPullDownRefresh: function () {
        (this.fetchData({
          type: this.reportType,
          refresh: !0
        }), uni.stopPullDownRefresh());
      },
      methods: f(f(f(f({
        l: function (t) {
          return p.$t(t);
        }
      }, (0, o.mapActions)("report", ["GetReportList"])), (0, o.mapActions)("device", ["GetGeocode"])), (0, o.mapMutations)("report", ["setListNeedRefresh", "setReportItem", "setReportInfoAddress"])), {}, {
        fetchData: function (t) {
          var e = this;
          return (async function () {
            e.setListNeedRefresh(t.refresh);
            (await e.GetReportList({
              deviceId: e.selectedTerminal.id,
              type: t.type,
              date: e.currentDate
            }), uni.stopPullDownRefresh());
          })();
        },
        gotoDetail: function (t) {
          (this.setReportItem(f(f({}, t), {}, {
            reportType: this.reportType
          })), uni.navigateTo({
            url: "/pagesFunc/terminal/trip-report/detail"
          }));
        },
        tripTabChanged: function (t) {
          this.reportType = t;
        },
        getAddress: function (e) {
          var a = this;
          return (async function () {
            var i;
            t("log", "reportList", a.reportList, " at pagesFunc/terminal/trip-report/list.vue:254");
            t("log", "data", e, " at pagesFunc/terminal/trip-report/list.vue:255");
            (i = await a.GetGeocode({
              longitude: e.longitude,
              latitude: e.latitude
            }), i.succeeded && (t("log", "result", i, " at pagesFunc/terminal/trip-report/list.vue:258"), a.setReportInfoAddress({
              id: e.id,
              addressName: e.addressName,
              addressValue: i.address
            })));
          })();
        }
      })
    };
    e.default = v;
  }).call(this, require("@/.unpacked/svc/f3b9.js")["default"]);
})(module, exports, __r);
