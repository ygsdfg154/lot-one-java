// webpack 模块 1fb9  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t) {
  (function () {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = {
      rotl: function (e, t) {
        return e << t | e >>> 32 - t;
      },
      rotr: function (e, t) {
        return e << 32 - t | e >>> t;
      },
      endian: function (e) {
        if (e.constructor == Number) return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);
        for (var t = 0; t < e.length; t++) e[t] = n.endian(e[t]);
        return e;
      },
      randomBytes: function (e) {
        for (var t = []; e > 0; e--) t.push(Math.floor(256 * Math.random()));
        return t;
      },
      bytesToWords: function (e) {
        for (var t = [], n = 0, a = 0; n < e.length; (n++, a += 8)) t[a >>> 5] |= e[n] << 24 - a % 32;
        return t;
      },
      wordsToBytes: function (e) {
        for (var t = [], n = 0; n < 32 * e.length; n += 8) t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
        return t;
      },
      bytesToHex: function (e) {
        for (var t = [], n = 0; n < e.length; n++) (t.push((e[n] >>> 4).toString(16)), t.push((15 & e[n]).toString(16)));
        return t.join("");
      },
      hexToBytes: function (e) {
        for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
        return t;
      },
      bytesToBase64: function (e) {
        for (var n = [], a = 0; a < e.length; a += 3) for (var r = e[a] << 16 | e[a + 1] << 8 | e[a + 2], i = 0; i < 4; i++) 8 * a + 6 * i <= 8 * e.length ? n.push(t.charAt(r >>> 6 * (3 - i) & 63)) : n.push("=");
        return n.join("");
      },
      base64ToBytes: function (e) {
        e = e.replace(/[^A-Z0-9+\/]/gi, "");
        for (var n = [], a = 0, r = 0; a < e.length; r = ++a % 4) 0 != r && n.push((t.indexOf(e.charAt(a - 1)) & Math.pow(2, -2 * r + 8) - 1) << 2 * r | t.indexOf(e.charAt(a)) >>> 6 - 2 * r);
        return n;
      }
    };
    e.exports = n;
  })();
})(module, exports, __r);
