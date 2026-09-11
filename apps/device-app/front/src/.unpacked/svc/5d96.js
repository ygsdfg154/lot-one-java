// webpack 模块 5d96  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("uview-ui/components/u-header/u-header.vue")), i = a(require("uview-ui/components/u-month/u-month.vue")), o = a(require("@/.unpacked/svc/ef3d.js")), s = (a(require("dayjs")), a(require("@/.unpacked/svc/1e2c.js"))), u = a(require("@/.unpacked/svc/8a0a.js")), d = getApp().globalData, c = {
    name: "u-calendar",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, o.default],
    components: {
      uHeader: r.default,
      uMonth: i.default
    },
    data: function () {
      return {
        months: [],
        monthIndex: 0,
        listHeight: 0,
        selected: [],
        scrollIntoView: "",
        scrollTop: 0,
        innerFormatter: function (e) {
          return e;
        }
      };
    },
    watch: {
      selectedChange: {
        immediate: !0,
        handler: function (e) {
          this.setMonth();
        }
      },
      show: {
        immediate: !0,
        handler: function (e) {
          this.setMonth();
        }
      }
    },
    computed: {
      innerMaxDate: function () {
        return uni.$u.test.number(this.maxDate) ? Number(this.maxDate) : this.maxDate;
      },
      innerMinDate: function () {
        return uni.$u.test.number(this.minDate) ? Number(this.minDate) : this.minDate;
      },
      selectedChange: function () {
        return [this.innerMinDate, this.innerMaxDate, this.defaultDate];
      },
      subtitle: function () {
        return this.months.length ? ("").concat(this.months[this.monthIndex].year).concat(this.l("common.u-calendar-content-year"), "\xa0").concat(this.months[this.monthIndex].month).concat(this.l("common.u-calendar-content-month")) : "";
      },
      buttonDisabled: function () {
        return "range" === this.mode && this.selected.length <= 1;
      }
    },
    mounted: function () {
      (this.start = Date.now(), this.init());
    },
    methods: {
      l: function (e) {
        return d.$t(e);
      },
      setFormatter: function (e) {
        this.innerFormatter = e;
      },
      monthSelected: function (e) {
        (this.selected = e, this.showConfirm || ("multiple" === this.mode || "single" === this.mode || "range" === this.mode && this.selected.length >= 2) && this.$emit("confirm", this.selected));
      },
      init: function () {
        if (this.innerMaxDate && this.innerMinDate && new Date(this.innerMaxDate).getTime() < new Date(this.innerMinDate).getTime()) return uni.$u.error("maxDate\u4e0d\u80fd\u5c0f\u4e8eminDate");
        (this.listHeight = 5 * this.rowHeight + 30, this.setMonth());
      },
      close: function () {
        this.$emit("close");
      },
      confirm: function () {
        this.buttonDisabled || this.$emit("confirm", this.selected);
      },
      getMonths: function (e, t) {
        var n = (0, s.default)(e).year(), a = (0, s.default)(e).month() + 1, r = (0, s.default)(t).year(), i = (0, s.default)(t).month() + 1;
        return 12 * (r - n) + (i - a) + 1;
      },
      setMonth: function () {
        var e = this, t = this.innerMinDate || (0, s.default)().valueOf(), n = this.innerMaxDate || (0, s.default)(t).add(this.monthNum - 1, "month").valueOf(), a = uni.$u.range(1, this.monthNum, this.getMonths(t, n));
        this.months = [];
        for (var r = function (a) {
          e.months.push({
            date: new Array((0, s.default)(t).add(a, "month").daysInMonth()).fill(1).map(function (r, i) {
              var o = i + 1, d = (0, s.default)(t).add(a, "month").date(o).day(), c = (0, s.default)(t).add(a, "month").date(o).format("YYYY-MM-DD"), l = "";
              if (e.showLunar) {
                var f = u.default.solar2lunar((0, s.default)(c).year(), (0, s.default)(c).month() + 1, (0, s.default)(c).date());
                l = f.IDayCn;
              }
              var m = {
                day: o,
                week: d,
                disabled: (0, s.default)(c).isBefore((0, s.default)(t).format("YYYY-MM-DD")) || (0, s.default)(c).isAfter((0, s.default)(n).format("YYYY-MM-DD")),
                date: new Date(c),
                bottomInfo: l,
                dot: !1,
                month: (0, s.default)(t).add(a, "month").month() + 1
              }, p = e.formatter || e.innerFormatter;
              return p(m);
            }),
            month: (0, s.default)(t).add(a, "month").month() + 1,
            year: (0, s.default)(t).add(a, "month").year()
          });
        }, i = 0; i < a; i++) r(i);
      },
      scrollIntoDefaultMonth: function (e) {
        var t = this, n = this.months.findIndex(function (t) {
          var n = t.year, a = t.month;
          return (a = uni.$u.padZero(a), ("").concat(n, "-").concat(a) === e);
        });
        -1 !== n && this.$nextTick(function () {
          t.scrollIntoView = ("month-").concat(n);
        });
      },
      onScroll: function (e) {
        for (var t = Math.max(0, e.detail.scrollTop), n = 0; n < this.months.length; n++) t >= (this.months[n].top || this.listHeight) && (this.monthIndex = n);
      },
      updateMonthTop: function () {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        if ((t.map(function (t, n) {
          e.months[n].top = t;
        }), this.defaultDate)) {
          var n = (0, s.default)().format("YYYY-MM");
          (n = uni.$u.test.array(this.defaultDate) ? (0, s.default)(this.defaultDate[0]).format("YYYY-MM") : (0, s.default)(this.defaultDate).format("YYYY-MM"), this.scrollIntoDefaultMonth(n));
        } else {
          var a = (0, s.default)().format("YYYY-MM");
          this.scrollIntoDefaultMonth(a);
        }
      }
    }
  };
  t.default = c;
})(module, exports, __r);
