// webpack 模块 03d1  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/svc/47a9.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0, t.divide = p, t.enableBoundaryChecking = h, t.minus = m, t.plus = f, t.round = _, t.times = l);
    var r = a(require("@/.unpacked/svc/c70d.js")), i = !0;
    function o(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 15;
      return +parseFloat(Number(e).toPrecision(t));
    }
    function s(e) {
      var t = e.toString().split(/[eE]/), n = (t[0].split(".")[1] || "").length - +(t[1] || 0);
      return n > 0 ? n : 0;
    }
    function u(e) {
      if (-1 === e.toString().indexOf("e")) return Number(e.toString().replace(".", ""));
      var t = s(e);
      return t > 0 ? o(Number(e) * Math.pow(10, t)) : Number(e);
    }
    function d(t) {
      i && (t > Number.MAX_SAFE_INTEGER || t < Number.MIN_SAFE_INTEGER) && e("warn", ("").concat(t, " \u8d85\u51fa\u4e86\u7cbe\u5ea6\u9650\u5236\uff0c\u7ed3\u679c\u53ef\u80fd\u4e0d\u6b63\u786e"), " at uni_modules/uview-ui/libs/function/digit.js:45");
    }
    function c(e, t) {
      var n = (0, r.default)(e), a = n[0], i = n[1], o = n.slice(2), s = t(a, i);
      return (o.forEach(function (e) {
        s = t(s, e);
      }), s);
    }
    function l() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      if (t.length > 2) return c(t, l);
      var a = t[0], r = t[1], i = u(a), o = u(r), f = s(a) + s(r), m = i * o;
      return (d(m), m / Math.pow(10, f));
    }
    function f() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      if (t.length > 2) return c(t, f);
      var a = t[0], r = t[1], i = Math.pow(10, Math.max(s(a), s(r)));
      return (l(a, i) + l(r, i)) / i;
    }
    function m() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      if (t.length > 2) return c(t, m);
      var a = t[0], r = t[1], i = Math.pow(10, Math.max(s(a), s(r)));
      return (l(a, i) - l(r, i)) / i;
    }
    function p() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      if (t.length > 2) return c(t, p);
      var a = t[0], r = t[1], i = u(a), f = u(r);
      return (d(i), d(f), l(i / f, o(Math.pow(10, s(r) - s(a)))));
    }
    function _(e, t) {
      var n = Math.pow(10, t), a = p(Math.round(Math.abs(l(e, n))), n);
      return (e < 0 && 0 !== a && (a = l(a, -1)), a);
    }
    function h() {
      var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
      i = e;
    }
    var y = {
      times: l,
      plus: f,
      minus: m,
      divide: p,
      round: _,
      enableBoundaryChecking: h
    };
    t.default = y;
  }).call(this, require("@/.unpacked/svc/f3b9.js")["default"]);
})(module, exports, __r);
