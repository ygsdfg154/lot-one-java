// webpack 模块 10ab  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (t.byteLength = function (e) {
    var t = d(e), n = t[0], a = t[1];
    return 3 * (n + a) / 4 - a;
  }, t.toByteArray = function (e) {
    var t, n, a = d(e), o = a[0], s = a[1], u = new i((function (e, t, n) {
      return 3 * (t + n) / 4 - n;
    })(0, o, s)), c = 0, l = s > 0 ? o - 4 : o;
    for (n = 0; n < l; n += 4) (t = r[e.charCodeAt(n)] << 18 | r[e.charCodeAt(n + 1)] << 12 | r[e.charCodeAt(n + 2)] << 6 | r[e.charCodeAt(n + 3)], u[c++] = t >> 16 & 255, u[c++] = t >> 8 & 255, u[c++] = 255 & t);
    2 === s && (t = r[e.charCodeAt(n)] << 2 | r[e.charCodeAt(n + 1)] >> 4, u[c++] = 255 & t);
    1 === s && (t = r[e.charCodeAt(n)] << 10 | r[e.charCodeAt(n + 1)] << 4 | r[e.charCodeAt(n + 2)] >> 2, u[c++] = t >> 8 & 255, u[c++] = 255 & t);
    return u;
  }, t.fromByteArray = function (e) {
    for (var t, n = e.length, r = n % 3, i = [], o = 0, s = n - r; o < s; o += 16383) i.push(l(e, o, o + 16383 > s ? s : o + 16383));
    1 === r ? (t = e[n - 1], i.push(a[t >> 2] + a[t << 4 & 63] + "==")) : 2 === r && (t = (e[n - 2] << 8) + e[n - 1], i.push(a[t >> 10] + a[t >> 4 & 63] + a[t << 2 & 63] + "="));
    return i.join("");
  });
  for (var a = [], r = [], i = "undefined" !== typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, u = o.length; s < u; ++s) (a[s] = o[s], r[o.charCodeAt(s)] = s);
  function d(e) {
    var t = e.length;
    if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    var n = e.indexOf("=");
    -1 === n && (n = t);
    var a = n === t ? 0 : 4 - n % 4;
    return [n, a];
  }
  function c(e) {
    return a[e >> 18 & 63] + a[e >> 12 & 63] + a[e >> 6 & 63] + a[63 & e];
  }
  function l(e, t, n) {
    for (var a, r = [], i = t; i < n; i += 3) (a = (e[i] << 16 & 16711680) + (e[i + 1] << 8 & 65280) + (255 & e[i + 2]), r.push(c(a)));
    return r.join("");
  }
  (r[("-").charCodeAt(0)] = 62, r[("_").charCodeAt(0)] = 63);
})(module, exports, __r);
