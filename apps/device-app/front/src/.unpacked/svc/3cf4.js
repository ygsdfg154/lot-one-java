// webpack 模块 3cf4  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r, i, o, s, u, d = a(require("@/.unpacked/svc/3b2d.js")), c = a(require("@/.unpacked/svc/7ca3.js")), l = a(require("@/.unpacked/svc/34cf.js")), f = Math.sin, m = Math.cos, p = Math.sqrt, _ = Math.abs, h = Math.PI, y = 6378245, v = .006693421622965823;
  function b(e, t) {
    return e >= 72.004 && e <= 137.8347 && t >= .8293 && t <= 55.8271;
  }
  function g(e, t) {
    var n = (function (e, t) {
      var n = 300 + e + 2 * t + .1 * e * e + .1 * e * t + .1 * p(_(e));
      return (n += 2 * (20 * f(6 * e * h) + 20 * f(2 * e * h)) / 3, n += 2 * (20 * f(e * h) + 40 * f(e / 3 * h)) / 3, n += 2 * (150 * f(e / 12 * h) + 300 * f(e / 30 * h)) / 3, n);
    })(e - 105, t - 35), a = (function (e, t) {
      var n = 2 * e - 100 + 3 * t + .2 * t * t + .1 * e * t + .2 * p(_(e));
      return (n += 2 * (20 * f(6 * e * h) + 20 * f(2 * e * h)) / 3, n += 2 * (20 * f(t * h) + 40 * f(t / 3 * h)) / 3, n += 2 * (160 * f(t / 12 * h) + 320 * f(t * h / 30)) / 3, n);
    })(e - 105, t - 35), r = t / 180 * h, i = f(r);
    i = 1 - v * i * i;
    var o = p(i);
    return (n = 180 * n / (y / o * m(r) * h), a = 180 * a / (y * (1 - v) / (i * o) * h), [n, a]);
  }
  function M(e) {
    var t = (0, l.default)(e, 2), n = t[0], a = t[1];
    if (!b(n, a)) return [n, a];
    var r = g(n, a);
    return [n + r[0], a + r[1]];
  }
  function w(e) {
    var t = (0, l.default)(e, 2), n = t[0], a = t[1];
    if (!b(n, a)) return [n, a];
    var r = n, i = a, o = M([r, i]), s = o[0] - n, u = o[1] - a;
    while (_(s) > 1e-6 || _(u) > 1e-6) (r -= s, i -= u, o = M([r, i]), s = o[0] - n, u = o[1] - a);
    return [r, i];
  }
  var L = Math.sin, Y = Math.cos, k = Math.atan2, S = Math.sqrt, T = Math.PI, D = 3e3 * T / 180;
  function x(e) {
    var t = (0, l.default)(e, 2), n = t[0], a = t[1], r = n - .0065, i = a - .006, o = S(r * r + i * i) - 2e-5 * L(i * D), s = k(i, r) - 3e-6 * Y(r * D), u = o * Y(s), d = o * L(s);
    return [u, d];
  }
  function j(e) {
    var t = (0, l.default)(e, 2), n = t[0], a = t[1], r = n, i = a, o = S(r * r + i * i) + 2e-5 * L(i * D), s = k(i, r) + 3e-6 * Y(r * D), u = o * Y(s) + .0065, d = o * L(s) + .006;
    return [u, d];
  }
  var O = 180 / Math.PI, A = Math.PI / 180, P = 6378137, E = 20037508.342789244;
  function I(e) {
    return [e[0] * O / P, (.5 * Math.PI - 2 * Math.atan(Math.exp(-e[1] / P))) * O];
  }
  function H(e) {
    var t = Math.abs(e[0]) <= 180 ? e[0] : e[0] - 360 * (e[0] < 0 ? -1 : 1), n = [P * t * A, P * Math.log(Math.tan(.25 * Math.PI + .5 * e[1] * A))];
    return (n[0] > E && (n[0] = E), n[0] < -E && (n[0] = -E), n[1] > E && (n[1] = E), n[1] < -E && (n[1] = -E), n);
  }
  var C, F = Math.abs, N = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0], R = [75, 60, 45, 30, 15, 0], B = [[1.410526172116255e-8, 898305509648872e-20, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -.03801003308653, 17337981.2], [-7.435856389565537e-9, 8983055097726239e-21, -.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86], [-3.030883460898826e-8, 898305509983578e-20, .30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, .32710905363475, 6856817.37], [-1.981981304930552e-8, 8983055099779535e-21, .03278182852591, 40.31678527705744, .65659298677277, -4.44255534477492, .85341911805263, .12923347998204, -.04625736007561, 4482777.06], [3.09191371068437e-9, 8983055096812155e-21, 6995724062e-14, 23.10934304144901, -.00023663490511, -.6321817810242, -.00663494467273, .03430082397953, -.00466043876332, 2555164.4], [2.890871144776878e-9, 8983055095805407e-21, -3.068298e-8, 7.47137025468032, -353937994e-14, -.02145144861037, -1234426596e-14, .00010322952773, -323890364e-14, 826088.5]], W = [[-.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5], [.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5], [.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5], [.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5], [-.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [-.0003218135878613132, 111320.7020701615, .00369383431289, 823725.6402795718, .46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, .37238884252424, 7.45]];
  function $(e, t, n) {
    var a = F(t) / n[9], r = n[0] + n[1] * F(e), i = n[2] + n[3] * a + n[4] * Math.pow(a, 2) + n[5] * Math.pow(a, 3) + n[6] * Math.pow(a, 4) + n[7] * Math.pow(a, 5) + n[8] * Math.pow(a, 6);
    return (r *= e < 0 ? -1 : 1, i *= t < 0 ? -1 : 1, [r, i]);
  }
  function z(e) {
    for (var t = (0, l.default)(e, 2), n = t[0], a = t[1], r = [], i = 0; i < R.length; i++) if (F(a) > R[i]) {
      r = W[i];
      break;
    }
    return $(n, a, r);
  }
  function U(e) {
    for (var t = (0, l.default)(e, 2), n = t[0], a = t[1], r = [], i = 0; i < N.length; i++) if (a >= N[i]) {
      r = B[i];
      break;
    }
    return $(n, a, r);
  }
  function G(e, t) {
    if (!e) throw new Error(t);
  }
  function q(e) {
    return !!e && "[object Array]" === Object.prototype.toString.call(e);
  }
  function Q(e) {
    return !isNaN(Number(e)) && null !== e && !q(e);
  }
  function J() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    var a = t.length - 1;
    return function () {
      for (var e = a, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
      var o = t[a].apply(null, r);
      while (e--) o = t[e].call(null, o);
      return o;
    };
  }
  (function (e) {
    (e["WGS84"] = "WGS84", e["WGS1984"] = "WGS84", e["EPSG4326"] = "WGS84", e["GCJ02"] = "GCJ02", e["AMap"] = "GCJ02", e["BD09"] = "BD09", e["BD09LL"] = "BD09", e["Baidu"] = "BD09", e["BMap"] = "BD09", e["BD09MC"] = "BD09MC", e["BD09Meter"] = "BD09MC", e["EPSG3857"] = "EPSG3857", e["EPSG900913"] = "EPSG3857", e["EPSG102100"] = "EPSG3857", e["WebMercator"] = "EPSG3857", e["WM"] = "EPSG3857");
  })(C || (C = {}));
  var V = {
    to: (r = {}, (0, c.default)(r, C.GCJ02, M), (0, c.default)(r, C.BD09, J(j, M)), (0, c.default)(r, C.BD09MC, J(z, j, M)), (0, c.default)(r, C.EPSG3857, H), r)
  }, X = {
    to: (i = {}, (0, c.default)(i, C.WGS84, w), (0, c.default)(i, C.BD09, j), (0, c.default)(i, C.BD09MC, J(z, j)), (0, c.default)(i, C.EPSG3857, J(H, w)), i)
  }, Z = {
    to: (o = {}, (0, c.default)(o, C.WGS84, J(w, x)), (0, c.default)(o, C.GCJ02, x), (0, c.default)(o, C.EPSG3857, J(H, w, x)), (0, c.default)(o, C.BD09MC, z), o)
  }, K = {
    to: (s = {}, (0, c.default)(s, C.WGS84, I), (0, c.default)(s, C.GCJ02, J(M, I)), (0, c.default)(s, C.BD09, J(j, M, I)), (0, c.default)(s, C.BD09MC, J(z, j, M, I)), s)
  }, ee = {
    to: (u = {}, (0, c.default)(u, C.WGS84, J(w, x, U)), (0, c.default)(u, C.GCJ02, J(x, U)), (0, c.default)(u, C.EPSG3857, J(H, w, x, U)), (0, c.default)(u, C.BD09, U), u)
  }, te = {
    WGS84: V,
    GCJ02: X,
    BD09: Z,
    EPSG3857: K,
    BD09MC: ee
  }, ne = te;
  var ae = Object.assign(Object.assign({}, C), {
    CRSTypes: C,
    transform: function (e, t, n) {
      if ((G(!!e, "The args[0] input coordinate is required"), G(!!t, "The args[1] original coordinate system is required"), G(!!n, "The args[2] target coordinate system is required"), t === n)) return e;
      var a = ne[t];
      G(!!a, ("Invalid original coordinate system: ").concat(t));
      var r = a.to[n];
      G(!!r, ("Invalid target coordinate system: ").concat(n));
      var i = (0, d.default)(e);
      if ((G("string" === i || "object" === i, ("Invalid input coordinate type: ").concat(i)), "string" === i)) try {
        e = JSON.parse(e);
      } catch (u) {
        throw new Error(("Invalid input coordinate: ").concat(e));
      }
      var o = !1;
      q(e) && (G(e.length >= 2, ("Invalid input coordinate: ").concat(e)), G(Q(e[0]) && Q(e[1]), ("Invalid input coordinate: ").concat(e)), e = e.map(Number), o = !0);
      var s = r;
      return o ? s(e) : ((function e(t, n) {
        var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (null !== t) for (var r, i, o, s, u, d, c, l, f = 0, m = 0, p = t.type, _ = "FeatureCollection" === p, h = "Feature" === p, y = _ ? t.features.length : 1, v = 0; v < y; v++) {
          (c = _ ? t.features[v].geometry : h ? t.geometry : t, l = !!c && "GeometryCollection" === c.type, d = l ? c.geometries.length : 1);
          for (var b = 0; b < d; b++) {
            var g = 0, M = 0;
            if ((s = l ? c.geometries[b] : c, null !== s)) {
              var w = s.type;
              switch ((f = !a || "Polygon" !== w && "MultiPolygon" !== w ? 0 : 1, w)) {
                case null:
                  break;
                case "Point":
                  if ((u = s.coordinates, !1 === n(u, m, v, g, M))) return !1;
                  (m++, g++);
                  break;
                case "LineString":
                case "MultiPoint":
                  for ((u = s.coordinates, r = 0); r < u.length; r++) {
                    if (!1 === n(u[r], m, v, g, M)) return !1;
                    (m++, "MultiPoint" === w && g++);
                  }
                  "LineString" === w && g++;
                  break;
                case "Polygon":
                case "MultiLineString":
                  for ((u = s.coordinates, r = 0); r < u.length; r++) {
                    for (i = 0; i < u[r].length - f; i++) {
                      if (!1 === n(u[r][i], m, v, g, M)) return !1;
                      m++;
                    }
                    ("MultiLineString" === w && g++, "Polygon" === w && M++);
                  }
                  "Polygon" === w && g++;
                  break;
                case "MultiPolygon":
                  for ((u = s.coordinates, r = 0); r < u.length; r++) {
                    for ((M = 0, i = 0); i < u[r].length; i++) {
                      for (o = 0; o < u[r][i].length - f; o++) {
                        if (!1 === n(u[r][i][o], m, v, g, M)) return !1;
                        m++;
                      }
                      M++;
                    }
                    g++;
                  }
                  break;
                case "GeometryCollection":
                  for (r = 0; r < s.geometries.length; r++) if (!1 === e(s.geometries[r], n, a)) return !1;
                  break;
                default:
                  throw new Error("Unknown Geometry Type");
              }
            }
          }
        }
      })(e, function (e) {
        var t = s(e), n = (0, l.default)(t, 2);
        (e[0] = n[0], e[1] = n[1]);
      }), e);
    }
  });
  t.default = ae;
})(module, exports, __r);
