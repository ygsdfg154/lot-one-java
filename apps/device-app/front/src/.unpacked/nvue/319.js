// webpack 模块 319  [nvue]
// 出现于: pages/msg/index.js, pagesFunc/terminal/locate-mode/index.js, pagesFunc/terminal/locus/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/5.js")), i = r(require("@/.unpacked/nvue/202.js")), o = r(require("@/.unpacked/nvue/451.js")), s = r(require("@/.unpacked/nvue/452.js"));
  var d = {
    name: "datetime-picker",
    mixins: [uni.$u.mpMixin, uni.$u.mixin, o.default],
    data: function () {
      return {
        columns: [],
        innerDefaultIndex: [],
        innerFormatter: function (e, t) {
          return t;
        }
      };
    },
    watch: {
      show: function (e, t) {
        e && this.updateColumnValue(this.innerValue);
      },
      propsChange: function () {
        this.init();
      }
    },
    computed: {
      propsChange: function () {
        return [this.mode, this.maxDate, this.minDate, this.minHour, this.maxHour, this.minMinute, this.maxMinute, this.filter];
      }
    },
    mounted: function () {
      this.init();
    },
    methods: {
      init: function () {
        (this.innerValue = this.correctValue(this.value), this.updateColumnValue(this.innerValue));
      },
      setFormatter: function (e) {
        this.innerFormatter = e;
      },
      close: function () {
        this.closeOnClickOverlay && this.$emit("close");
      },
      cancel: function () {
        this.$emit("cancel");
      },
      confirm: function () {
        (this.$emit("confirm", {
          value: this.innerValue,
          mode: this.mode
        }), this.$emit("input", this.innerValue));
      },
      intercept: function (e, t) {
        var n = e.match(/\d+/g);
        return n.length > 1 ? (uni.$u.error("\u8bf7\u52ff\u5728\u8fc7\u6ee4\u6216\u683c\u5f0f\u5316\u51fd\u6570\u65f6\u6dfb\u52a0\u6570\u5b57"), 0) : t && 4 == n[0].length ? n[0] : n[0].length > 2 ? (uni.$u.error("\u8bf7\u52ff\u5728\u8fc7\u6ee4\u6216\u683c\u5f0f\u5316\u51fd\u6570\u65f6\u6dfb\u52a0\u6570\u5b57"), 0) : n[0];
      },
      change: function (e) {
        var t = e.indexs, n = e.values, r = "";
        if ("time" === this.mode) r = ("").concat(this.intercept(n[0][t[0]]), ":").concat(this.intercept(n[1][t[1]])); else {
          var a = parseInt(this.intercept(n[0][t[0]], "year")), i = parseInt(this.intercept(n[1][t[1]])), o = parseInt(n[2] ? this.intercept(n[2][t[2]]) : 1), d = 0, u = 0, l = (0, s.default)(("").concat(a, "-").concat(i)).daysInMonth();
          ("year-month" === this.mode && (o = 1), o = Math.min(l, o), "datetime" === this.mode && (d = parseInt(this.intercept(n[3][t[3]])), u = parseInt(this.intercept(n[4][t[4]]))), r = Number(new Date(a, i - 1, o, d, u)));
        }
        (r = this.correctValue(r), this.innerValue = r, this.updateColumnValue(r), this.$emit("change", {
          value: r,
          picker: this.$refs.picker,
          mode: this.mode
        }));
      },
      updateColumnValue: function (e) {
        (this.innerValue = e, this.updateColumns(), this.updateIndexs(e));
      },
      updateIndexs: function (e) {
        var t = [], n = this.formatter || this.innerFormatter, r = uni.$u.padZero;
        if ("time" === this.mode) {
          var a = e.split(":");
          t = [n("hour", a[0]), n("minute", a[1])];
        } else {
          new Date(e);
          (t = [n("year", ("").concat((0, s.default)(e).year())), n("month", r((0, s.default)(e).month() + 1))], "date" === this.mode && t.push(n("day", r((0, s.default)(e).date()))), "datetime" === this.mode && t.push(n("day", r((0, s.default)(e).date())), n("hour", r((0, s.default)(e).hour())), n("minute", r((0, s.default)(e).minute()))));
        }
        var i = this.columns.map(function (e, n) {
          return Math.max(0, e.findIndex(function (e) {
            return e === t[n];
          }));
        });
        this.innerDefaultIndex = i;
      },
      updateColumns: function () {
        var e = this.formatter || this.innerFormatter, t = this.getOriginColumns().map(function (t) {
          return t.values.map(function (n) {
            return e(t.type, n);
          });
        });
        this.columns = t;
      },
      getOriginColumns: function () {
        var e = this;
        return this.getRanges().map(function (t) {
          var n = t.type, r = t.range, a = (function (e, t) {
            for (var n = -1, r = Array(e < 0 ? 0 : e); ++n < e; ) r[n] = t(n);
            return r;
          })(r[1] - r[0] + 1, function (e) {
            var t = r[0] + e;
            return t = "year" === n ? ("").concat(t) : uni.$u.padZero(t);
          });
          return (e.filter && (a = e.filter(n, a)), {
            type: n,
            values: a
          });
        });
      },
      generateArray: function (e, t) {
        return Array.from(new Array(t + 1).keys()).slice(e);
      },
      correctValue: function (e) {
        var t = "time" !== this.mode;
        if ((t && !uni.$u.test.date(e) ? e = this.minDate : t || e || (e = ("").concat(uni.$u.padZero(this.minHour), ":").concat(uni.$u.padZero(this.minMinute))), t)) return (e = (0, s.default)(e).isBefore((0, s.default)(this.minDate)) ? this.minDate : e, e = (0, s.default)(e).isAfter((0, s.default)(this.maxDate)) ? this.maxDate : e);
        if (-1 === String(e).indexOf(":")) return uni.$u.error("\u65f6\u95f4\u9519\u8bef\uff0c\u8bf7\u4f20\u9012\u598212:24\u7684\u683c\u5f0f");
        var n = e.split(":"), r = (0, i.default)(n, 2), a = r[0], o = r[1];
        return (a = uni.$u.padZero(uni.$u.range(this.minHour, this.maxHour, Number(a))), o = uni.$u.padZero(uni.$u.range(this.minMinute, this.maxMinute, Number(o))), ("").concat(a, ":").concat(o));
      },
      getRanges: function () {
        if ("time" === this.mode) return [{
          type: "hour",
          range: [this.minHour, this.maxHour]
        }, {
          type: "minute",
          range: [this.minMinute, this.maxMinute]
        }];
        var e = this.getBoundary("max", this.innerValue), t = e.maxYear, n = e.maxDate, r = e.maxMonth, a = e.maxHour, i = e.maxMinute, o = this.getBoundary("min", this.innerValue), s = o.minYear, d = o.minDate, u = [{
          type: "year",
          range: [s, t]
        }, {
          type: "month",
          range: [o.minMonth, r]
        }, {
          type: "day",
          range: [d, n]
        }, {
          type: "hour",
          range: [o.minHour, a]
        }, {
          type: "minute",
          range: [o.minMinute, i]
        }];
        return ("date" === this.mode && u.splice(3, 2), "year-month" === this.mode && u.splice(2, 3), u);
      },
      getBoundary: function (e, t) {
        var n, r = new Date(t), i = new Date(this[("").concat(e, "Date")]), o = (0, s.default)(i).year(), d = 1, u = 1, l = 0, c = 0;
        return ("max" === e && (d = 12, u = (0, s.default)(r).daysInMonth(), l = 23, c = 59), (0, s.default)(r).year() === o && (d = (0, s.default)(i).month() + 1, (0, s.default)(r).month() + 1 === d && (u = (0, s.default)(i).date(), (0, s.default)(r).date() === u && (l = (0, s.default)(i).hour(), (0, s.default)(r).hour() === l && (c = (0, s.default)(i).minute())))), n = {}, (0, a.default)(n, ("").concat(e, "Year"), o), (0, a.default)(n, ("").concat(e, "Month"), d), (0, a.default)(n, ("").concat(e, "Date"), u), (0, a.default)(n, ("").concat(e, "Hour"), l), (0, a.default)(n, ("").concat(e, "Minute"), c), n);
      }
    }
  };
  t.default = d;
})(module, exports, __r);
