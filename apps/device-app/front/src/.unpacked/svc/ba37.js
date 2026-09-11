// webpack 模块 ba37  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t) {
  (t.read = function (e, t, n, a, r) {
    var i, o, s = 8 * r - a - 1, u = (1 << s) - 1, d = u >> 1, c = -7, l = n ? r - 1 : 0, f = n ? -1 : 1, m = e[t + l];
    for ((l += f, i = m & (1 << -c) - 1, m >>= -c, c += s); c > 0; (i = 256 * i + e[t + l], l += f, c -= 8)) ;
    for ((o = i & (1 << -c) - 1, i >>= -c, c += a); c > 0; (o = 256 * o + e[t + l], l += f, c -= 8)) ;
    if (0 === i) i = 1 - d; else {
      if (i === u) return o ? NaN : 1 / 0 * (m ? -1 : 1);
      (o += Math.pow(2, a), i -= d);
    }
    return (m ? -1 : 1) * o * Math.pow(2, i - a);
  }, t.write = function (e, t, n, a, r, i) {
    var o, s, u, d = 8 * i - r - 1, c = (1 << d) - 1, l = c >> 1, f = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0, m = a ? 0 : i - 1, p = a ? 1 : -1, _ = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
    for ((t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, o = c) : (o = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -o)) < 1 && (o--, u *= 2), t += o + l >= 1 ? f / u : f * Math.pow(2, 1 - l), t * u >= 2 && (o++, u /= 2), o + l >= c ? (s = 0, o = c) : o + l >= 1 ? (s = (t * u - 1) * Math.pow(2, r), o += l) : (s = t * Math.pow(2, l - 1) * Math.pow(2, r), o = 0))); r >= 8; (e[n + m] = 255 & s, m += p, s /= 256, r -= 8)) ;
    for ((o = o << r | s, d += r); d > 0; (e[n + m] = 255 & o, m += p, o /= 256, d -= 8)) ;
    e[n + m - p] |= 128 * _;
  });
})(module, exports, __r);
