// webpack 模块 481b  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/svc/47a9.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/svc/3b2d.js")), i = (function () {
      function t(e, t) {
        return null != t && e instanceof t;
      }
      var n, a, i;
      try {
        n = Map;
      } catch (d) {
        n = function () {};
      }
      try {
        a = Set;
      } catch (d) {
        a = function () {};
      }
      try {
        i = Promise;
      } catch (d) {
        i = function () {};
      }
      function o(s, d, c, l, f) {
        "object" === (0, r.default)(d) && (c = d.depth, l = d.prototype, f = d.includeNonEnumerable, d = d.circular);
        var m = [], p = [], _ = "undefined" != typeof e;
        return ("undefined" == typeof d && (d = !0), "undefined" == typeof c && (c = 1 / 0), (function s(c, h) {
          if (null === c) return null;
          if (0 === h) return c;
          var y, v;
          if ("object" != (0, r.default)(c)) return c;
          if (t(c, n)) y = new n(); else if (t(c, a)) y = new a(); else if (t(c, i)) y = new i(function (e, t) {
            c.then(function (t) {
              e(s(t, h - 1));
            }, function (e) {
              t(s(e, h - 1));
            });
          }); else if (o.__isArray(c)) y = []; else if (o.__isRegExp(c)) (y = new RegExp(c.source, u(c)), c.lastIndex && (y.lastIndex = c.lastIndex)); else if (o.__isDate(c)) y = new Date(c.getTime()); else {
            if (_ && e.isBuffer(c)) return (e.from ? y = e.from(c) : (y = new e(c.length), c.copy(y)), y);
            t(c, Error) ? y = Object.create(c) : "undefined" == typeof l ? (v = Object.getPrototypeOf(c), y = Object.create(v)) : (y = Object.create(l), v = l);
          }
          if (d) {
            var b = m.indexOf(c);
            if (-1 != b) return p[b];
            (m.push(c), p.push(y));
          }
          for (var g in (t(c, n) && c.forEach(function (e, t) {
            var n = s(t, h - 1), a = s(e, h - 1);
            y.set(n, a);
          }), t(c, a) && c.forEach(function (e) {
            var t = s(e, h - 1);
            y.add(t);
          }), c)) {
            var M = Object.getOwnPropertyDescriptor(c, g);
            M && (y[g] = s(c[g], h - 1));
            try {
              var w = Object.getOwnPropertyDescriptor(c, g);
              if ("undefined" === w.set) continue;
              y[g] = s(c[g], h - 1);
            } catch (D) {
              if (D instanceof TypeError) continue;
              if (D instanceof ReferenceError) continue;
            }
          }
          if (Object.getOwnPropertySymbols) {
            var L = Object.getOwnPropertySymbols(c);
            for (g = 0; g < L.length; g++) {
              var Y = L[g], k = Object.getOwnPropertyDescriptor(c, Y);
              (!k || k.enumerable || f) && (y[Y] = s(c[Y], h - 1), Object.defineProperty(y, Y, k));
            }
          }
          if (f) {
            var S = Object.getOwnPropertyNames(c);
            for (g = 0; g < S.length; g++) {
              var T = S[g];
              k = Object.getOwnPropertyDescriptor(c, T);
              k && k.enumerable || (y[T] = s(c[T], h - 1), Object.defineProperty(y, T, k));
            }
          }
          return y;
        })(s, c));
      }
      function s(e) {
        return Object.prototype.toString.call(e);
      }
      function u(e) {
        var t = "";
        return (e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), t);
      }
      return (o.clonePrototype = function (e) {
        if (null === e) return null;
        var t = function () {};
        return (t.prototype = e, new t());
      }, o.__objToStr = s, o.__isDate = function (e) {
        return "object" === (0, r.default)(e) && "[object Date]" === s(e);
      }, o.__isArray = function (e) {
        return "object" === (0, r.default)(e) && "[object Array]" === s(e);
      }, o.__isRegExp = function (e) {
        return "object" === (0, r.default)(e) && "[object RegExp]" === s(e);
      }, o.__getRegExpFlags = u, o);
    })(), o = i;
    t.default = o;
  }).call(this, require("@/.unpacked/svc/12e3.js").Buffer);
})(module, exports, __r);
