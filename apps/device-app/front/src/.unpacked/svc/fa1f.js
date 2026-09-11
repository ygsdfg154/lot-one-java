// webpack 模块 fa1f  [svc]
// 出现于: pagesFunc/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  var n = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var r = n(require("@/.unpacked/svc/127e.js")), i = n(require("@/.unpacked/svc/ee10.js")), s = n(require("@/.unpacked/svc/7ca3.js")), o = require("vuex"), c = n(require("moment")), u = n(require("../../common/config.js"));
  function l(t, e) {
    var a = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(t);
      (e && (n = n.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), a.push.apply(a, n));
    }
    return a;
  }
  function d(t) {
    for (var e = 1; e < arguments.length; e++) {
      var a = null != arguments[e] ? arguments[e] : {};
      e % 2 ? l(Object(a), !0).forEach(function (e) {
        (0, s.default)(t, e, a[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : l(Object(a)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
      });
    }
    return t;
  }
  var f = new Date(), p = f.getFullYear(), m = f.getMonth() + 1;
  m = m < 10 ? ("0").concat(m) : m;
  var v = f.getDate();
  v = v < 10 ? ("0").concat(v) : v;
  var _ = getApp().globalData, h = {
    data: function () {
      return {
        cdn: u.default.cdn,
        maxDate: ("").concat(p, "-").concat(m, "-").concat(v, " 23:59:59"),
        minDate: (0, c.default)(f).subtract(6, "months").format("YYYY-MM-DD"),
        isShow: !1,
        onloadDate: !0,
        dateList: []
      };
    },
    props: ["currentDate", "param", "name", "reportType"],
    computed: d({}, (0, o.mapGetters)(["selectedTerminal"])),
    mounted: function () {},
    beforeDestroy: function () {
      this.onloadDate = !0;
    },
    methods: d(d({}, (0, o.mapActions)("device", ["GetListDates"])), {}, {
      l: function (t) {
        return _.$t(t);
      },
      openDatePicker: function () {
        var t = this;
        return (0, i.default)(r.default.mark(function e() {
          return r.default.wrap(function (e) {
            while (1) switch (e.prev = e.next) {
              case 0:
                if (!t.onloadDate) {
                  e.next = 3;
                  break;
                }
                return (e.next = 3, t.getDates());
              case 3:
                (t.isShow = !0, t.onloadDate = !1);
              case 5:
              case "end":
                return e.stop();
            }
          }, e);
        }))();
      },
      getDates: function () {
        var t = this;
        return (0, i.default)(r.default.mark(function e() {
          var a, n;
          return r.default.wrap(function (e) {
            while (1) switch (e.prev = e.next) {
              case 0:
                if ("trip" != t.name) {
                  e.next = 13;
                  break;
                }
                if (1 != t.reportType) {
                  e.next = 7;
                  break;
                }
                return (e.next = 4, t.GetListDates({
                  terminalId: t.selectedTerminal.id,
                  type: "trip/trip"
                }));
              case 4:
                (a = e.sent, e.next = 10);
                break;
              case 7:
                return (e.next = 9, t.GetListDates({
                  terminalId: t.selectedTerminal.id,
                  type: "trip/stopover"
                }));
              case 9:
                a = e.sent;
              case 10:
                (a.succeeded && (t.dateList = a.data), e.next = 18);
                break;
              case 13:
                if ("audio" != t.name) {
                  e.next = 18;
                  break;
                }
                return (e.next = 16, t.GetListDates({
                  type: "record",
                  terminalId: t.selectedTerminal.id
                }));
              case 16:
                (n = e.sent, n.succeeded && (t.dateList = n.data));
              case 18:
              case "end":
                return e.stop();
            }
          }, e);
        }))();
      },
      changeDateHandler: function (t, e) {
        var a = (0, c.default)(t).add(1, "days").format("YYYY-MM-DD"), n = (0, c.default)(t).subtract(1, "days").format("YYYY-MM-DD");
        ("up" === e && ((0, c.default)(a).isAfter((0, c.default)(this.maxDate)) ? uni.showToast({
          title: _.$t("common.unable-greater.than-today"),
          icon: "none"
        }) : this.$emit("update:currentDate", a)), "down" === e && ((0, c.default)(n).isBefore((0, c.default)(this.minDate)) ? uni.showToast({
          title: _.$t("common.unable-minimum-date"),
          icon: "none"
        }) : this.$emit("update:currentDate", n)));
      },
      dateConfirm: function (t) {
        (this.$emit("update:currentDate", t[0]), this.isShow = !1);
      },
      formatter: function (t) {
        var e = new Date(), a = e.getMonth() + 1, n = e.getDate();
        return (t.month == a && t.day == n && (t.bottomInfo = _.$t("common.today")), this.dateList.length && this.dateList.forEach(function (e) {
          var a = e.substr(5, 2), n = e.substr(8, 2);
          t.month == Number(a) && t.day == Number(n) && (t.dot = !0);
        }), t);
      }
    }),
    watch: {
      currentDate: {
        handler: function () {
          this.$emit("fetchData", this.param);
        }
      },
      reportType: {
        handler: function () {
          (this.onloadDate = !0, this.$emit("fetchData", this.param));
        }
      }
    }
  };
  e.default = h;
})(module, exports, __r);
