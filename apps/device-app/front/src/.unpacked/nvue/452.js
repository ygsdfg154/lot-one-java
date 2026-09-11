// webpack 模块 452  [nvue]
// 出现于: pages/msg/index.js, pagesFunc/terminal/locate-mode/index.js, pagesFunc/terminal/locus/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var r, a, i = require("@/.unpacked/nvue/1.js");
  !(function (o, s) {
    "object" === i(t) && void 0 !== e ? e.exports = s() : void 0 === (a = "function" == typeof (r = s) ? r.call(t, n, t, e) : r) || (e.exports = a);
  })(0, function () {
    "use strict";
    var e = "millisecond", t = "second", n = "minute", r = "hour", a = "day", o = "week", s = "month", d = "quarter", u = "year", l = "date", c = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/, _ = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, m = {
      name: "en",
      weekdays: ("Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday").split("_"),
      months: ("January_February_March_April_May_June_July_August_September_October_November_December").split("_")
    }, f = function (e, t, n) {
      var r = String(e);
      return !r || r.length >= t ? e : ("").concat(Array(t + 1 - r.length).join(n)).concat(e);
    }, p = {
      s: f,
      z: function (e) {
        var t = -e.utcOffset(), n = Math.abs(t), r = Math.floor(n / 60), a = n % 60;
        return ("").concat((t <= 0 ? "+" : "-") + f(r, 2, "0"), ":").concat(f(a, 2, "0"));
      },
      m: function e(t, n) {
        if (t.date() < n.date()) return -e(n, t);
        var r = 12 * (n.year() - t.year()) + (n.month() - t.month()), a = t.clone().add(r, s), i = n - a < 0, o = t.clone().add(r + (i ? -1 : 1), s);
        return +(-(r + (n - a) / (i ? a - o : o - a)) || 0);
      },
      a: function (e) {
        return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
      },
      p: function (i) {
        return ({
          M: s,
          y: u,
          w: o,
          d: a,
          D: l,
          h: r,
          m: n,
          s: t,
          ms: e,
          Q: d
        })[i] || String(i || "").toLowerCase().replace(/s$/, "");
      },
      u: function (e) {
        return void 0 === e;
      }
    }, h = "en", y = {};
    y[h] = m;
    var M = function (e) {
      return e instanceof Y;
    }, g = function (e, t, n) {
      var r;
      if (!e) return h;
      if ("string" == typeof e) (y[e] && (r = e), t && (y[e] = t, r = e)); else {
        var a = e.name;
        (y[a] = e, r = a);
      }
      return (!n && r && (h = r), r || !n && h);
    }, L = function (e, t) {
      if (M(e)) return e.clone();
      var n = "object" === i(t) ? t : {};
      return (n.date = e, n.args = arguments, new Y(n));
    }, v = p;
    (v.l = g, v.i = M, v.w = function (e, t) {
      return L(e, {
        locale: t.$L,
        utc: t.$u,
        x: t.$x,
        $offset: t.$offset
      });
    });
    var Y = (function () {
      function i(e) {
        (this.$L = g(e.locale, null, !0), this.parse(e));
      }
      var m = i.prototype;
      return (m.parse = function (e) {
        (this.$d = (function (e) {
          var t = e.date, n = e.utc;
          if (null === t) return new Date(NaN);
          if (v.u(t)) return new Date();
          if (t instanceof Date) return new Date(t);
          if ("string" == typeof t && !(/Z$/i).test(t)) {
            var r = t.match(c);
            if (r) {
              var a = r[2] - 1 || 0, i = (r[7] || "0").substring(0, 3);
              return n ? new Date(Date.UTC(r[1], a, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, i)) : new Date(r[1], a, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, i);
            }
          }
          return new Date(t);
        })(e), this.$x = e.x || ({}), this.init());
      }, m.init = function () {
        var e = this.$d;
        (this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds());
      }, m.$utils = function () {
        return v;
      }, m.isValid = function () {
        return !("Invalid Date" === this.$d.toString());
      }, m.isSame = function (e, t) {
        var n = L(e);
        return this.startOf(t) <= n && n <= this.endOf(t);
      }, m.isAfter = function (e, t) {
        return L(e) < this.startOf(t);
      }, m.isBefore = function (e, t) {
        return this.endOf(t) < L(e);
      }, m.$g = function (e, t, n) {
        return v.u(e) ? this[t] : this.set(n, e);
      }, m.unix = function () {
        return Math.floor(this.valueOf() / 1e3);
      }, m.valueOf = function () {
        return this.$d.getTime();
      }, m.startOf = function (e, i) {
        var d = this, c = !!v.u(i) || i, _ = v.p(e), m = function (e, t) {
          var n = v.w(d.$u ? Date.UTC(d.$y, t, e) : new Date(d.$y, t, e), d);
          return c ? n : n.endOf(a);
        }, f = function (e, t) {
          return v.w(d.toDate()[e].apply(d.toDate("s"), (c ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(t)), d);
        }, p = this.$W, h = this.$M, y = this.$D, M = ("set").concat(this.$u ? "UTC" : "");
        switch (_) {
          case u:
            return c ? m(1, 0) : m(31, 11);
          case s:
            return c ? m(1, h) : m(0, h + 1);
          case o:
            var g = this.$locale().weekStart || 0, L = (p < g ? p + 7 : p) - g;
            return m(c ? y - L : y + (6 - L), h);
          case a:
          case l:
            return f(("").concat(M, "Hours"), 0);
          case r:
            return f(("").concat(M, "Minutes"), 1);
          case n:
            return f(("").concat(M, "Seconds"), 2);
          case t:
            return f(("").concat(M, "Milliseconds"), 3);
          default:
            return this.clone();
        }
      }, m.endOf = function (e) {
        return this.startOf(e, !1);
      }, m.$set = function (i, o) {
        var d, c = v.p(i), _ = ("set").concat(this.$u ? "UTC" : ""), m = (d = {}, d[a] = ("").concat(_, "Date"), d[l] = ("").concat(_, "Date"), d[s] = ("").concat(_, "Month"), d[u] = ("").concat(_, "FullYear"), d[r] = ("").concat(_, "Hours"), d[n] = ("").concat(_, "Minutes"), d[t] = ("").concat(_, "Seconds"), d[e] = ("").concat(_, "Milliseconds"), d)[c], f = c === a ? this.$D + (o - this.$W) : o;
        if (c === s || c === u) {
          var p = this.clone().set(l, 1);
          (p.$d[m](f), p.init(), this.$d = p.set(l, Math.min(this.$D, p.daysInMonth())).$d);
        } else m && this.$d[m](f);
        return (this.init(), this);
      }, m.set = function (e, t) {
        return this.clone().$set(e, t);
      }, m.get = function (e) {
        return this[v.p(e)]();
      }, m.add = function (e, i) {
        var d, l = this;
        e = Number(e);
        var c = v.p(i), _ = function (t) {
          var n = L(l);
          return v.w(n.date(n.date() + Math.round(t * e)), l);
        };
        if (c === s) return this.set(s, this.$M + e);
        if (c === u) return this.set(u, this.$y + e);
        if (c === a) return _(1);
        if (c === o) return _(7);
        var m = (d = {}, d[n] = 6e4, d[r] = 36e5, d[t] = 1e3, d)[c] || 1, f = this.$d.getTime() + e * m;
        return v.w(f, this);
      }, m.subtract = function (e, t) {
        return this.add(-1 * e, t);
      }, m.format = function (e) {
        var t = this;
        if (!this.isValid()) return "Invalid Date";
        var n = e || "YYYY-MM-DDTHH:mm:ssZ", r = v.z(this), a = this.$locale(), i = this.$H, o = this.$m, s = this.$M, d = a.weekdays, u = a.months, l = function (e, r, a, i) {
          return e && (e[r] || e(t, n)) || a[r].substr(0, i);
        }, c = function (e) {
          return v.s(i % 12 || 12, e, "0");
        }, m = a.meridiem || (function (e, t, n) {
          var r = e < 12 ? "AM" : "PM";
          return n ? r.toLowerCase() : r;
        }), f = {
          YY: String(this.$y).slice(-2),
          YYYY: this.$y,
          M: s + 1,
          MM: v.s(s + 1, 2, "0"),
          MMM: l(a.monthsShort, s, u, 3),
          MMMM: l(u, s),
          D: this.$D,
          DD: v.s(this.$D, 2, "0"),
          d: String(this.$W),
          dd: l(a.weekdaysMin, this.$W, d, 2),
          ddd: l(a.weekdaysShort, this.$W, d, 3),
          dddd: d[this.$W],
          H: String(i),
          HH: v.s(i, 2, "0"),
          h: c(1),
          hh: c(2),
          a: m(i, o, !0),
          A: m(i, o, !1),
          m: String(o),
          mm: v.s(o, 2, "0"),
          s: String(this.$s),
          ss: v.s(this.$s, 2, "0"),
          SSS: v.s(this.$ms, 3, "0"),
          Z: r
        };
        return n.replace(_, function (e, t) {
          return t || f[e] || r.replace(":", "");
        });
      }, m.utcOffset = function () {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m.diff = function (e, i, l) {
        var c, _ = v.p(i), m = L(e), f = 6e4 * (m.utcOffset() - this.utcOffset()), p = this - m, h = v.m(this, m);
        return (h = (c = {}, c[u] = h / 12, c[s] = h, c[d] = h / 3, c[o] = (p - f) / 6048e5, c[a] = (p - f) / 864e5, c[r] = p / 36e5, c[n] = p / 6e4, c[t] = p / 1e3, c)[_] || p, l ? h : v.a(h));
      }, m.daysInMonth = function () {
        return this.endOf(s).$D;
      }, m.$locale = function () {
        return y[this.$L];
      }, m.locale = function (e, t) {
        if (!e) return this.$L;
        var n = this.clone(), r = g(e, t, !0);
        return (r && (n.$L = r), n);
      }, m.clone = function () {
        return v.w(this.$d, this);
      }, m.toDate = function () {
        return new Date(this.valueOf());
      }, m.toJSON = function () {
        return this.isValid() ? this.toISOString() : null;
      }, m.toISOString = function () {
        return this.$d.toISOString();
      }, m.toString = function () {
        return this.$d.toUTCString();
      }, i);
    })(), b = Y.prototype;
    return (L.prototype = b, [["$ms", e], ["$s", t], ["$m", n], ["$H", r], ["$W", a], ["$M", s], ["$y", u], ["$D", l]].forEach(function (e) {
      b[e[1]] = function (t) {
        return this.$g(t, e[0], e[1]);
      };
    }), L.extend = function (e, t) {
      return (e.$i || (e(t, Y, L), e.$i = !0), L);
    }, L.locale = g, L.isDayjs = M, L.unix = function (e) {
      return L(1e3 * e);
    }, L.en = y[h], L.Ls = y, L.p = {}, L);
  });
})(module, exports, __r);
