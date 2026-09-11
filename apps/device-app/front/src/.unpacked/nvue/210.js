// webpack 模块 210  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r, i, o, s, d, u = a(require("@/.unpacked/nvue/1.js")), l = a(require("@/.unpacked/nvue/5.js")), c = a(require("@/.unpacked/nvue/202.js")), _ = Math.sin, m = Math.cos, p = Math.sqrt, f = Math.abs, h = Math.PI, y = 6378245, M = .006693421622965823;
  function g(e, t) {
    return e >= 72.004 && e <= 137.8347 && t >= .8293 && t <= 55.8271;
  }
  function L(e, t) {
    var n, a, r, i = (r = 300 + (n = e - 105) + 2 * (a = t - 35) + .1 * n * n + .1 * n * a + .1 * p(f(n)), r += 2 * (20 * _(6 * n * h) + 20 * _(2 * n * h)) / 3, r += 2 * (20 * _(n * h) + 40 * _(n / 3 * h)) / 3, r += 2 * (150 * _(n / 12 * h) + 300 * _(n / 30 * h)) / 3), o = (function (e, t) {
      var n = 2 * e - 100 + 3 * t + .2 * t * t + .1 * e * t + .2 * p(f(e));
      return (n += 2 * (20 * _(6 * e * h) + 20 * _(2 * e * h)) / 3, n += 2 * (20 * _(t * h) + 40 * _(t / 3 * h)) / 3, n += 2 * (160 * _(t / 12 * h) + 320 * _(t * h / 30)) / 3);
    })(e - 105, t - 35), s = t / 180 * h, d = _(s), u = p(d = 1 - M * d * d);
    return [i = 180 * i / (y / u * m(s) * h), o = 180 * o / (y * (1 - M) / (d * u) * h)];
  }
  function v(e) {
    var t = (0, c.default)(e, 2), n = t[0], a = t[1];
    if (!g(n, a)) return [n, a];
    var r = L(n, a);
    return [n + r[0], a + r[1]];
  }
  function Y(e) {
    var t = (0, c.default)(e, 2), n = t[0], a = t[1];
    if (!g(n, a)) return [n, a];
    for (var r = n, i = a, o = v([r, i]), s = o[0] - n, d = o[1] - a; f(s) > 1e-6 || f(d) > 1e-6; ) (s = (o = v([r -= s, i -= d]))[0] - n, d = o[1] - a);
    return [r, i];
  }
  var b = Math.sin, k = Math.cos, w = Math.atan2, T = Math.sqrt, D = 3e3 * Math.PI / 180;
  function x(e) {
    var t = (0, c.default)(e, 2), n = t[0] - .0065, a = t[1] - .006, r = T(n * n + a * a) - 2e-5 * b(a * D), i = w(a, n) - 3e-6 * k(n * D);
    return [r * k(i), r * b(i)];
  }
  function S(e) {
    var t = (0, c.default)(e, 2), n = t[0], a = t[1], r = T(n * n + a * a) + 2e-5 * b(a * D), i = w(a, n) + 3e-6 * k(n * D);
    return [r * k(i) + .0065, r * b(i) + .006];
  }
  var j = 180 / Math.PI, H = Math.PI / 180, O = 6378137, P = 20037508.342789244;
  function C(e) {
    return [e[0] * j / O, (.5 * Math.PI - 2 * Math.atan(Math.exp(-e[1] / O))) * j];
  }
  function A(e) {
    var t = Math.abs(e[0]) <= 180 ? e[0] : e[0] - 360 * (e[0] < 0 ? -1 : 1), n = [O * t * H, O * Math.log(Math.tan(.25 * Math.PI + .5 * e[1] * H))];
    return (n[0] > P && (n[0] = P), n[0] < -P && (n[0] = -P), n[1] > P && (n[1] = P), n[1] < -P && (n[1] = -P), n);
  }
  var W, E = Math.abs, $ = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0], z = [75, 60, 45, 30, 15, 0], F = [[1.410526172116255e-8, 898305509648872e-20, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -.03801003308653, 17337981.2], [-7.435856389565537e-9, 8983055097726239e-21, -.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86], [-3.030883460898826e-8, 898305509983578e-20, .30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, .32710905363475, 6856817.37], [-1.981981304930552e-8, 8983055099779535e-21, .03278182852591, 40.31678527705744, .65659298677277, -4.44255534477492, .85341911805263, .12923347998204, -.04625736007561, 4482777.06], [3.09191371068437e-9, 8983055096812155e-21, 6995724062e-14, 23.10934304144901, -.00023663490511, -.6321817810242, -.00663494467273, .03430082397953, -.00466043876332, 2555164.4], [2.890871144776878e-9, 8983055095805407e-21, -3.068298e-8, 7.47137025468032, -353937994e-14, -.02145144861037, -1234426596e-14, .00010322952773, -323890364e-14, 826088.5]], R = [[-.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8, -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5], [.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142, -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5], [.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455, -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5], [.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013, -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5], [-.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378, 54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5], [-.0003218135878613132, 111320.7020701615, .00369383431289, 823725.6402795718, .46104986909093, 2351.343141331292, 1.58060784298199, 8.77738589078284, .37238884252424, 7.45]];
  function I(e, t, n) {
    var a = E(t) / n[9], r = n[0] + n[1] * E(e), i = n[2] + n[3] * a + n[4] * Math.pow(a, 2) + n[5] * Math.pow(a, 3) + n[6] * Math.pow(a, 4) + n[7] * Math.pow(a, 5) + n[8] * Math.pow(a, 6);
    return [r *= e < 0 ? -1 : 1, i *= t < 0 ? -1 : 1];
  }
  function N(e) {
    for (var t = (0, c.default)(e, 2), n = t[0], a = t[1], r = [], i = 0; i < z.length; i++) if (E(a) > z[i]) {
      r = R[i];
      break;
    }
    return I(n, a, r);
  }
  function V(e) {
    for (var t = (0, c.default)(e, 2), n = t[0], a = t[1], r = [], i = 0; i < $.length; i++) if (a >= $[i]) {
      r = F[i];
      break;
    }
    return I(n, a, r);
  }
  function B(e, t) {
    if (!e) throw new Error(t);
  }
  function J(e) {
    return !!e && "[object Array]" === Object.prototype.toString.call(e);
  }
  function G(e) {
    return !isNaN(Number(e)) && null !== e && !J(e);
  }
  function U() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    var a = t.length - 1;
    return function () {
      for (var e = a, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
      for (var o = t[a].apply(null, r); e--; ) o = t[e].call(null, o);
      return o;
    };
  }
  !(function (e) {
    (e.WGS84 = "WGS84", e.WGS1984 = "WGS84", e.EPSG4326 = "WGS84", e.GCJ02 = "GCJ02", e.AMap = "GCJ02", e.BD09 = "BD09", e.BD09LL = "BD09", e.Baidu = "BD09", e.BMap = "BD09", e.BD09MC = "BD09MC", e.BD09Meter = "BD09MC", e.EPSG3857 = "EPSG3857", e.EPSG900913 = "EPSG3857", e.EPSG102100 = "EPSG3857", e.WebMercator = "EPSG3857", e.WM = "EPSG3857");
  })(W || (W = {}));
  var q = {
    WGS84: {
      to: (r = {}, (0, l.default)(r, W.GCJ02, v), (0, l.default)(r, W.BD09, U(S, v)), (0, l.default)(r, W.BD09MC, U(N, S, v)), (0, l.default)(r, W.EPSG3857, A), r)
    },
    GCJ02: {
      to: (i = {}, (0, l.default)(i, W.WGS84, Y), (0, l.default)(i, W.BD09, S), (0, l.default)(i, W.BD09MC, U(N, S)), (0, l.default)(i, W.EPSG3857, U(A, Y)), i)
    },
    BD09: {
      to: (o = {}, (0, l.default)(o, W.WGS84, U(Y, x)), (0, l.default)(o, W.GCJ02, x), (0, l.default)(o, W.EPSG3857, U(A, Y, x)), (0, l.default)(o, W.BD09MC, N), o)
    },
    EPSG3857: {
      to: (s = {}, (0, l.default)(s, W.WGS84, C), (0, l.default)(s, W.GCJ02, U(v, C)), (0, l.default)(s, W.BD09, U(S, v, C)), (0, l.default)(s, W.BD09MC, U(N, S, v, C)), s)
    },
    BD09MC: {
      to: (d = {}, (0, l.default)(d, W.WGS84, U(Y, x, V)), (0, l.default)(d, W.GCJ02, U(x, V)), (0, l.default)(d, W.EPSG3857, U(A, Y, x, V)), (0, l.default)(d, W.BD09, V), d)
    }
  };
  var Z = Object.assign(Object.assign({}, W), {
    CRSTypes: W,
    transform: function (e, t, n) {
      if ((B(!!e, "The args[0] input coordinate is required"), B(!!t, "The args[1] original coordinate system is required"), B(!!n, "The args[2] target coordinate system is required"), t === n)) return e;
      var a = q[t];
      B(!!a, ("Invalid original coordinate system: ").concat(t));
      var r = a.to[n];
      B(!!r, ("Invalid target coordinate system: ").concat(n));
      var i = (0, u.default)(e);
      if ((B("string" === i || "object" === i, ("Invalid input coordinate type: ").concat(i)), "string" === i)) try {
        e = JSON.parse(e);
      } catch (t) {
        throw new Error(("Invalid input coordinate: ").concat(e));
      }
      var o = !1;
      J(e) && (B(e.length >= 2, ("Invalid input coordinate: ").concat(e)), B(G(e[0]) && G(e[1]), ("Invalid input coordinate: ").concat(e)), e = e.map(Number), o = !0);
      var s = r;
      return o ? s(e) : ((function e(t, n) {
        var a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (null !== t) for (var r, i, o, s, d, u, l, c, _ = 0, m = 0, p = t.type, f = "FeatureCollection" === p, h = "Feature" === p, y = f ? t.features.length : 1, M = 0; M < y; M++) {
          u = (c = !!(l = f ? t.features[M].geometry : h ? t.geometry : t) && "GeometryCollection" === l.type) ? l.geometries.length : 1;
          for (var g = 0; g < u; g++) {
            var L = 0, v = 0;
            if (null !== (s = c ? l.geometries[g] : l)) {
              var Y = s.type;
              switch ((_ = !a || "Polygon" !== Y && "MultiPolygon" !== Y ? 0 : 1, Y)) {
                case null:
                  break;
                case "Point":
                  if (!1 === n(d = s.coordinates, m, M, L, v)) return !1;
                  (m++, L++);
                  break;
                case "LineString":
                case "MultiPoint":
                  for ((d = s.coordinates, r = 0); r < d.length; r++) {
                    if (!1 === n(d[r], m, M, L, v)) return !1;
                    (m++, "MultiPoint" === Y && L++);
                  }
                  "LineString" === Y && L++;
                  break;
                case "Polygon":
                case "MultiLineString":
                  for ((d = s.coordinates, r = 0); r < d.length; r++) {
                    for (i = 0; i < d[r].length - _; i++) {
                      if (!1 === n(d[r][i], m, M, L, v)) return !1;
                      m++;
                    }
                    ("MultiLineString" === Y && L++, "Polygon" === Y && v++);
                  }
                  "Polygon" === Y && L++;
                  break;
                case "MultiPolygon":
                  for ((d = s.coordinates, r = 0); r < d.length; r++) {
                    for ((v = 0, i = 0); i < d[r].length; i++) {
                      for (o = 0; o < d[r][i].length - _; o++) {
                        if (!1 === n(d[r][i][o], m, M, L, v)) return !1;
                        m++;
                      }
                      v++;
                    }
                    L++;
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
        var t = s(e), n = (0, c.default)(t, 2);
        (e[0] = n[0], e[1] = n[1]);
      }), e);
    }
  });
  t.default = Z;
})(module, exports, __r);
