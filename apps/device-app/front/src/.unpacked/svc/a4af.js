// webpack 模块 a4af  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  function a(e) {
    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], n = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if ((e = String(e).toLowerCase(), e && n.test(e))) {
      if (4 === e.length) {
        for (var a = "#", r = 1; r < 4; r += 1) a += e.slice(r, r + 1).concat(e.slice(r, r + 1));
        e = a;
      }
      for (var i = [], o = 1; o < 7; o += 2) i.push(parseInt(("0x").concat(e.slice(o, o + 2))));
      return t ? ("rgb(").concat(i[0], ",").concat(i[1], ",").concat(i[2], ")") : i;
    }
    if ((/^(rgb|RGB)/).test(e)) {
      var s = e.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return s.map(function (e) {
        return Number(e);
      });
    }
    return e;
  }
  function r(e) {
    var t = e;
    if ((/^(rgb|RGB)/).test(t)) {
      for (var n = t.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(","), a = "#", r = 0; r < n.length; r++) {
        var i = Number(n[r]).toString(16);
        (i = 1 == String(i).length ? ("").concat(0, i) : i, "0" === i && (i += i), a += i);
      }
      return (7 !== a.length && (a = t), a);
    }
    if (!(/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/).test(t)) return t;
    var o = t.replace(/#/, "").split("");
    if (6 === o.length) return t;
    if (3 === o.length) {
      for (var s = "#", u = 0; u < o.length; u += 1) s += o[u] + o[u];
      return s;
    }
  }
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var i = {
    colorGradient: function () {
      for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "rgb(0, 0, 0)", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "rgb(255, 255, 255)", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 10, i = a(e, !1), o = i[0], s = i[1], u = i[2], d = a(t, !1), c = d[0], l = d[1], f = d[2], m = (c - o) / n, p = (l - s) / n, _ = (f - u) / n, h = [], y = 0; y < n; y++) {
        var v = r(("rgb(").concat(Math.round(m * y + o), ",").concat(Math.round(p * y + s), ",").concat(Math.round(_ * y + u), ")"));
        (0 === y && (v = r(e)), y === n - 1 && (v = r(t)), h.push(v));
      }
      return h;
    },
    hexToRgb: a,
    rgbToHex: r,
    colorToRgba: function (e, t) {
      e = r(e);
      var n = String(e).toLowerCase();
      if (n && (/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/).test(n)) {
        if (4 === n.length) {
          for (var a = "#", i = 1; i < 4; i += 1) a += n.slice(i, i + 1).concat(n.slice(i, i + 1));
          n = a;
        }
        for (var o = [], s = 1; s < 7; s += 2) o.push(parseInt(("0x").concat(n.slice(s, s + 2))));
        return ("rgba(").concat(o.join(","), ",").concat(t, ")");
      }
      return n;
    }
  };
  t.default = i;
})(module, exports, __r);
