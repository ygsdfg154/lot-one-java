// webpack 模块 12e3  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/svc/10ab.js"), r = require("@/.unpacked/svc/ba37.js"), i = require("@/.unpacked/svc/b0e4.js");
    function o() {
      return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
    }
    function s(e, t) {
      if (o() < t) throw new RangeError("Invalid typed array length");
      return (u.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = u.prototype) : (null === e && (e = new u(t)), e.length = t), e);
    }
    function u(e, t, n) {
      if (!u.TYPED_ARRAY_SUPPORT && !(this instanceof u)) return new u(e, t, n);
      if ("number" === typeof e) {
        if ("string" === typeof t) throw new Error("If encoding is specified then the first argument must be a string");
        return l(this, e);
      }
      return d(this, e, t, n);
    }
    function d(e, t, n, a) {
      if ("number" === typeof t) throw new TypeError('"value" argument must not be a number');
      return "undefined" !== typeof ArrayBuffer && t instanceof ArrayBuffer ? (function (e, t, n, a) {
        if ((t.byteLength, n < 0 || t.byteLength < n)) throw new RangeError("'offset' is out of bounds");
        if (t.byteLength < n + (a || 0)) throw new RangeError("'length' is out of bounds");
        t = void 0 === n && void 0 === a ? new Uint8Array(t) : void 0 === a ? new Uint8Array(t, n) : new Uint8Array(t, n, a);
        u.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = u.prototype) : e = f(e, t);
        return e;
      })(e, t, n, a) : "string" === typeof t ? (function (e, t, n) {
        "string" === typeof n && "" !== n || (n = "utf8");
        if (!u.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
        var a = 0 | p(t, n);
        e = s(e, a);
        var r = e.write(t, n);
        r !== a && (e = e.slice(0, r));
        return e;
      })(e, t, n) : (function (e, t) {
        if (u.isBuffer(t)) {
          var n = 0 | m(t.length);
          return (e = s(e, n), 0 === e.length ? e : (t.copy(e, 0, 0, n), e));
        }
        if (t) {
          if ("undefined" !== typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || ("length" in t)) return "number" !== typeof t.length || (function (e) {
            return e !== e;
          })(t.length) ? s(e, 0) : f(e, t);
          if ("Buffer" === t.type && i(t.data)) return f(e, t.data);
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      })(e, t);
    }
    function c(e) {
      if ("number" !== typeof e) throw new TypeError('"size" argument must be a number');
      if (e < 0) throw new RangeError('"size" argument must not be negative');
    }
    function l(e, t) {
      if ((c(t), e = s(e, t < 0 ? 0 : 0 | m(t)), !u.TYPED_ARRAY_SUPPORT)) for (var n = 0; n < t; ++n) e[n] = 0;
      return e;
    }
    function f(e, t) {
      var n = t.length < 0 ? 0 : 0 | m(t.length);
      e = s(e, n);
      for (var a = 0; a < n; a += 1) e[a] = 255 & t[a];
      return e;
    }
    function m(e) {
      if (e >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
      return 0 | e;
    }
    function p(e, t) {
      if (u.isBuffer(e)) return e.length;
      if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
      "string" !== typeof e && (e = "" + e);
      var n = e.length;
      if (0 === n) return 0;
      for (var a = !1; ; ) switch (t) {
        case "ascii":
        case "latin1":
        case "binary":
          return n;
        case "utf8":
        case "utf-8":
        case void 0:
          return R(e).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return 2 * n;
        case "hex":
          return n >>> 1;
        case "base64":
          return B(e).length;
        default:
          if (a) return R(e).length;
          (t = ("" + t).toLowerCase(), a = !0);
      }
    }
    function _(e, t, n) {
      var a = !1;
      if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return "";
      if (((void 0 === n || n > this.length) && (n = this.length), n <= 0)) return "";
      if ((n >>>= 0, t >>>= 0, n <= t)) return "";
      e || (e = "utf8");
      while (1) switch (e) {
        case "hex":
          return x(this, t, n);
        case "utf8":
        case "utf-8":
          return S(this, t, n);
        case "ascii":
          return T(this, t, n);
        case "latin1":
        case "binary":
          return D(this, t, n);
        case "base64":
          return k(this, t, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return j(this, t, n);
        default:
          if (a) throw new TypeError("Unknown encoding: " + e);
          (e = (e + "").toLowerCase(), a = !0);
      }
    }
    function h(e, t, n) {
      var a = e[t];
      (e[t] = e[n], e[n] = a);
    }
    function y(e, t, n, a, r) {
      if (0 === e.length) return -1;
      if (("string" === typeof n ? (a = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = r ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length)) {
        if (r) return -1;
        n = e.length - 1;
      } else if (n < 0) {
        if (!r) return -1;
        n = 0;
      }
      if (("string" === typeof t && (t = u.from(t, a)), u.isBuffer(t))) return 0 === t.length ? -1 : v(e, t, n, a, r);
      if ("number" === typeof t) return (t &= 255, u.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf ? r ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : v(e, [t], n, a, r));
      throw new TypeError("val must be string, number or Buffer");
    }
    function v(e, t, n, a, r) {
      var i, o = 1, s = e.length, u = t.length;
      if (void 0 !== a && (a = String(a).toLowerCase(), "ucs2" === a || "ucs-2" === a || "utf16le" === a || "utf-16le" === a)) {
        if (e.length < 2 || t.length < 2) return -1;
        (o = 2, s /= 2, u /= 2, n /= 2);
      }
      function d(e, t) {
        return 1 === o ? e[t] : e.readUInt16BE(t * o);
      }
      if (r) {
        var c = -1;
        for (i = n; i < s; i++) if (d(e, i) === d(t, -1 === c ? 0 : i - c)) {
          if ((-1 === c && (c = i), i - c + 1 === u)) return c * o;
        } else (-1 !== c && (i -= i - c), c = -1);
      } else for ((n + u > s && (n = s - u), i = n); i >= 0; i--) {
        for (var l = !0, f = 0; f < u; f++) if (d(e, i + f) !== d(t, f)) {
          l = !1;
          break;
        }
        if (l) return i;
      }
      return -1;
    }
    function b(e, t, n, a) {
      n = Number(n) || 0;
      var r = e.length - n;
      a ? (a = Number(a), a > r && (a = r)) : a = r;
      var i = t.length;
      if (i % 2 !== 0) throw new TypeError("Invalid hex string");
      a > i / 2 && (a = i / 2);
      for (var o = 0; o < a; ++o) {
        var s = parseInt(t.substr(2 * o, 2), 16);
        if (isNaN(s)) return o;
        e[n + o] = s;
      }
      return o;
    }
    function g(e, t, n, a) {
      return W(R(t, e.length - n), e, n, a);
    }
    function M(e, t, n, a) {
      return W((function (e) {
        for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
        return t;
      })(t), e, n, a);
    }
    function w(e, t, n, a) {
      return M(e, t, n, a);
    }
    function L(e, t, n, a) {
      return W(B(t), e, n, a);
    }
    function Y(e, t, n, a) {
      return W((function (e, t) {
        for (var n, a, r, i = [], o = 0; o < e.length; ++o) {
          if ((t -= 2) < 0) break;
          (n = e.charCodeAt(o), a = n >> 8, r = n % 256, i.push(r), i.push(a));
        }
        return i;
      })(t, e.length - n), e, n, a);
    }
    function k(e, t, n) {
      return 0 === t && n === e.length ? a.fromByteArray(e) : a.fromByteArray(e.slice(t, n));
    }
    function S(e, t, n) {
      n = Math.min(e.length, n);
      var a = [], r = t;
      while (r < n) {
        var i, o, s, u, d = e[r], c = null, l = d > 239 ? 4 : d > 223 ? 3 : d > 191 ? 2 : 1;
        if (r + l <= n) switch (l) {
          case 1:
            d < 128 && (c = d);
            break;
          case 2:
            (i = e[r + 1], 128 === (192 & i) && (u = (31 & d) << 6 | 63 & i, u > 127 && (c = u)));
            break;
          case 3:
            (i = e[r + 1], o = e[r + 2], 128 === (192 & i) && 128 === (192 & o) && (u = (15 & d) << 12 | (63 & i) << 6 | 63 & o, u > 2047 && (u < 55296 || u > 57343) && (c = u)));
            break;
          case 4:
            (i = e[r + 1], o = e[r + 2], s = e[r + 3], 128 === (192 & i) && 128 === (192 & o) && 128 === (192 & s) && (u = (15 & d) << 18 | (63 & i) << 12 | (63 & o) << 6 | 63 & s, u > 65535 && u < 1114112 && (c = u)));
        }
        (null === c ? (c = 65533, l = 1) : c > 65535 && (c -= 65536, a.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), a.push(c), r += l);
      }
      return (function (e) {
        var t = e.length;
        if (t <= 4096) return String.fromCharCode.apply(String, e);
        var n = "", a = 0;
        while (a < t) n += String.fromCharCode.apply(String, e.slice(a, a += 4096));
        return n;
      })(a);
    }
    (t.Buffer = u, t.SlowBuffer = function (e) {
      +e != e && (e = 0);
      return u.alloc(+e);
    }, t.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : (function () {
      try {
        var e = new Uint8Array(1);
        return (e.__proto__ = {
          __proto__: Uint8Array.prototype,
          foo: function () {
            return 42;
          }
        }, 42 === e.foo() && "function" === typeof e.subarray && 0 === e.subarray(1, 1).byteLength);
      } catch (t) {
        return !1;
      }
    })(), t.kMaxLength = o(), u.poolSize = 8192, u._augment = function (e) {
      return (e.__proto__ = u.prototype, e);
    }, u.from = function (e, t, n) {
      return d(null, e, t, n);
    }, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, "undefined" !== typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, {
      value: null,
      configurable: !0
    })), u.alloc = function (e, t, n) {
      return (function (e, t, n, a) {
        return (c(t), t <= 0 ? s(e, t) : void 0 !== n ? "string" === typeof a ? s(e, t).fill(n, a) : s(e, t).fill(n) : s(e, t));
      })(null, e, t, n);
    }, u.allocUnsafe = function (e) {
      return l(null, e);
    }, u.allocUnsafeSlow = function (e) {
      return l(null, e);
    }, u.isBuffer = function (e) {
      return !(null == e || !e._isBuffer);
    }, u.compare = function (e, t) {
      if (!u.isBuffer(e) || !u.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
      if (e === t) return 0;
      for (var n = e.length, a = t.length, r = 0, i = Math.min(n, a); r < i; ++r) if (e[r] !== t[r]) {
        (n = e[r], a = t[r]);
        break;
      }
      return n < a ? -1 : a < n ? 1 : 0;
    }, u.isEncoding = function (e) {
      switch (String(e).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, u.concat = function (e, t) {
      if (!i(e)) throw new TypeError('"list" argument must be an Array of Buffers');
      if (0 === e.length) return u.alloc(0);
      var n;
      if (void 0 === t) for ((t = 0, n = 0); n < e.length; ++n) t += e[n].length;
      var a = u.allocUnsafe(t), r = 0;
      for (n = 0; n < e.length; ++n) {
        var o = e[n];
        if (!u.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
        (o.copy(a, r), r += o.length);
      }
      return a;
    }, u.byteLength = p, u.prototype._isBuffer = !0, u.prototype.swap16 = function () {
      var e = this.length;
      if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var t = 0; t < e; t += 2) h(this, t, t + 1);
      return this;
    }, u.prototype.swap32 = function () {
      var e = this.length;
      if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var t = 0; t < e; t += 4) (h(this, t, t + 3), h(this, t + 1, t + 2));
      return this;
    }, u.prototype.swap64 = function () {
      var e = this.length;
      if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var t = 0; t < e; t += 8) (h(this, t, t + 7), h(this, t + 1, t + 6), h(this, t + 2, t + 5), h(this, t + 3, t + 4));
      return this;
    }, u.prototype.toString = function () {
      var e = 0 | this.length;
      return 0 === e ? "" : 0 === arguments.length ? S(this, 0, e) : _.apply(this, arguments);
    }, u.prototype.equals = function (e) {
      if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
      return this === e || 0 === u.compare(this, e);
    }, u.prototype.inspect = function () {
      var e = "", n = t.INSPECT_MAX_BYTES;
      return (this.length > 0 && (e = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (e += " ... ")), "<Buffer " + e + ">");
    }, u.prototype.compare = function (e, t, n, a, r) {
      if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
      if ((void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === a && (a = 0), void 0 === r && (r = this.length), t < 0 || n > e.length || a < 0 || r > this.length)) throw new RangeError("out of range index");
      if (a >= r && t >= n) return 0;
      if (a >= r) return -1;
      if (t >= n) return 1;
      if ((t >>>= 0, n >>>= 0, a >>>= 0, r >>>= 0, this === e)) return 0;
      for (var i = r - a, o = n - t, s = Math.min(i, o), d = this.slice(a, r), c = e.slice(t, n), l = 0; l < s; ++l) if (d[l] !== c[l]) {
        (i = d[l], o = c[l]);
        break;
      }
      return i < o ? -1 : o < i ? 1 : 0;
    }, u.prototype.includes = function (e, t, n) {
      return -1 !== this.indexOf(e, t, n);
    }, u.prototype.indexOf = function (e, t, n) {
      return y(this, e, t, n, !0);
    }, u.prototype.lastIndexOf = function (e, t, n) {
      return y(this, e, t, n, !1);
    }, u.prototype.write = function (e, t, n, a) {
      if (void 0 === t) (a = "utf8", n = this.length, t = 0); else if (void 0 === n && "string" === typeof t) (a = t, n = this.length, t = 0); else {
        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        (t |= 0, isFinite(n) ? (n |= 0, void 0 === a && (a = "utf8")) : (a = n, n = void 0));
      }
      var r = this.length - t;
      if (((void 0 === n || n > r) && (n = r), e.length > 0 && (n < 0 || t < 0) || t > this.length)) throw new RangeError("Attempt to write outside buffer bounds");
      a || (a = "utf8");
      for (var i = !1; ; ) switch (a) {
        case "hex":
          return b(this, e, t, n);
        case "utf8":
        case "utf-8":
          return g(this, e, t, n);
        case "ascii":
          return M(this, e, t, n);
        case "latin1":
        case "binary":
          return w(this, e, t, n);
        case "base64":
          return L(this, e, t, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Y(this, e, t, n);
        default:
          if (i) throw new TypeError("Unknown encoding: " + a);
          (a = ("" + a).toLowerCase(), i = !0);
      }
    }, u.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    });
    function T(e, t, n) {
      var a = "";
      n = Math.min(e.length, n);
      for (var r = t; r < n; ++r) a += String.fromCharCode(127 & e[r]);
      return a;
    }
    function D(e, t, n) {
      var a = "";
      n = Math.min(e.length, n);
      for (var r = t; r < n; ++r) a += String.fromCharCode(e[r]);
      return a;
    }
    function x(e, t, n) {
      var a = e.length;
      ((!t || t < 0) && (t = 0), (!n || n < 0 || n > a) && (n = a));
      for (var r = "", i = t; i < n; ++i) r += N(e[i]);
      return r;
    }
    function j(e, t, n) {
      for (var a = e.slice(t, n), r = "", i = 0; i < a.length; i += 2) r += String.fromCharCode(a[i] + 256 * a[i + 1]);
      return r;
    }
    function O(e, t, n) {
      if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
      if (e + t > n) throw new RangeError("Trying to access beyond buffer length");
    }
    function A(e, t, n, a, r, i) {
      if (!u.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (t > r || t < i) throw new RangeError('"value" argument is out of bounds');
      if (n + a > e.length) throw new RangeError("Index out of range");
    }
    function P(e, t, n, a) {
      t < 0 && (t = 65535 + t + 1);
      for (var r = 0, i = Math.min(e.length - n, 2); r < i; ++r) e[n + r] = (t & 255 << 8 * (a ? r : 1 - r)) >>> 8 * (a ? r : 1 - r);
    }
    function E(e, t, n, a) {
      t < 0 && (t = 4294967295 + t + 1);
      for (var r = 0, i = Math.min(e.length - n, 4); r < i; ++r) e[n + r] = t >>> 8 * (a ? r : 3 - r) & 255;
    }
    function I(e, t, n, a, r, i) {
      if (n + a > e.length) throw new RangeError("Index out of range");
      if (n < 0) throw new RangeError("Index out of range");
    }
    function H(e, t, n, a, i) {
      return (i || I(e, 0, n, 4), r.write(e, t, n, a, 23, 4), n + 4);
    }
    function C(e, t, n, a, i) {
      return (i || I(e, 0, n, 8), r.write(e, t, n, a, 52, 8), n + 8);
    }
    (u.prototype.slice = function (e, t) {
      var n, a = this.length;
      if ((e = ~~e, t = void 0 === t ? a : ~~t, e < 0 ? (e += a, e < 0 && (e = 0)) : e > a && (e = a), t < 0 ? (t += a, t < 0 && (t = 0)) : t > a && (t = a), t < e && (t = e), u.TYPED_ARRAY_SUPPORT)) (n = this.subarray(e, t), n.__proto__ = u.prototype); else {
        var r = t - e;
        n = new u(r, void 0);
        for (var i = 0; i < r; ++i) n[i] = this[i + e];
      }
      return n;
    }, u.prototype.readUIntLE = function (e, t, n) {
      (e |= 0, t |= 0, n || O(e, t, this.length));
      var a = this[e], r = 1, i = 0;
      while (++i < t && (r *= 256)) a += this[e + i] * r;
      return a;
    }, u.prototype.readUIntBE = function (e, t, n) {
      (e |= 0, t |= 0, n || O(e, t, this.length));
      var a = this[e + --t], r = 1;
      while (t > 0 && (r *= 256)) a += this[e + --t] * r;
      return a;
    }, u.prototype.readUInt8 = function (e, t) {
      return (t || O(e, 1, this.length), this[e]);
    }, u.prototype.readUInt16LE = function (e, t) {
      return (t || O(e, 2, this.length), this[e] | this[e + 1] << 8);
    }, u.prototype.readUInt16BE = function (e, t) {
      return (t || O(e, 2, this.length), this[e] << 8 | this[e + 1]);
    }, u.prototype.readUInt32LE = function (e, t) {
      return (t || O(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]);
    }, u.prototype.readUInt32BE = function (e, t) {
      return (t || O(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]));
    }, u.prototype.readIntLE = function (e, t, n) {
      (e |= 0, t |= 0, n || O(e, t, this.length));
      var a = this[e], r = 1, i = 0;
      while (++i < t && (r *= 256)) a += this[e + i] * r;
      return (r *= 128, a >= r && (a -= Math.pow(2, 8 * t)), a);
    }, u.prototype.readIntBE = function (e, t, n) {
      (e |= 0, t |= 0, n || O(e, t, this.length));
      var a = t, r = 1, i = this[e + --a];
      while (a > 0 && (r *= 256)) i += this[e + --a] * r;
      return (r *= 128, i >= r && (i -= Math.pow(2, 8 * t)), i);
    }, u.prototype.readInt8 = function (e, t) {
      return (t || O(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]);
    }, u.prototype.readInt16LE = function (e, t) {
      t || O(e, 2, this.length);
      var n = this[e] | this[e + 1] << 8;
      return 32768 & n ? 4294901760 | n : n;
    }, u.prototype.readInt16BE = function (e, t) {
      t || O(e, 2, this.length);
      var n = this[e + 1] | this[e] << 8;
      return 32768 & n ? 4294901760 | n : n;
    }, u.prototype.readInt32LE = function (e, t) {
      return (t || O(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24);
    }, u.prototype.readInt32BE = function (e, t) {
      return (t || O(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
    }, u.prototype.readFloatLE = function (e, t) {
      return (t || O(e, 4, this.length), r.read(this, e, !0, 23, 4));
    }, u.prototype.readFloatBE = function (e, t) {
      return (t || O(e, 4, this.length), r.read(this, e, !1, 23, 4));
    }, u.prototype.readDoubleLE = function (e, t) {
      return (t || O(e, 8, this.length), r.read(this, e, !0, 52, 8));
    }, u.prototype.readDoubleBE = function (e, t) {
      return (t || O(e, 8, this.length), r.read(this, e, !1, 52, 8));
    }, u.prototype.writeUIntLE = function (e, t, n, a) {
      if ((e = +e, t |= 0, n |= 0, !a)) {
        var r = Math.pow(2, 8 * n) - 1;
        A(this, e, t, n, r, 0);
      }
      var i = 1, o = 0;
      this[t] = 255 & e;
      while (++o < n && (i *= 256)) this[t + o] = e / i & 255;
      return t + n;
    }, u.prototype.writeUIntBE = function (e, t, n, a) {
      if ((e = +e, t |= 0, n |= 0, !a)) {
        var r = Math.pow(2, 8 * n) - 1;
        A(this, e, t, n, r, 0);
      }
      var i = n - 1, o = 1;
      this[t + i] = 255 & e;
      while (--i >= 0 && (o *= 256)) this[t + i] = e / o & 255;
      return t + n;
    }, u.prototype.writeUInt8 = function (e, t, n) {
      return (e = +e, t |= 0, n || A(this, e, t, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1);
    }, u.prototype.writeUInt16LE = function (e, t, n) {
      return (e = +e, t |= 0, n || A(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : P(this, e, t, !0), t + 2);
    }, u.prototype.writeUInt16BE = function (e, t, n) {
      return (e = +e, t |= 0, n || A(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : P(this, e, t, !1), t + 2);
    }, u.prototype.writeUInt32LE = function (e, t, n) {
      return (e = +e, t |= 0, n || A(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : E(this, e, t, !0), t + 4);
    }, u.prototype.writeUInt32BE = function (e, t, n) {
      return (e = +e, t |= 0, n || A(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : E(this, e, t, !1), t + 4);
    }, u.prototype.writeIntLE = function (e, t, n, a) {
      if ((e = +e, t |= 0, !a)) {
        var r = Math.pow(2, 8 * n - 1);
        A(this, e, t, n, r - 1, -r);
      }
      var i = 0, o = 1, s = 0;
      this[t] = 255 & e;
      while (++i < n && (o *= 256)) (e < 0 && 0 === s && 0 !== this[t + i - 1] && (s = 1), this[t + i] = (e / o >> 0) - s & 255);
      return t + n;
    }, u.prototype.writeIntBE = function (e, t, n, a) {
      if ((e = +e, t |= 0, !a)) {
        var r = Math.pow(2, 8 * n - 1);
        A(this, e, t, n, r - 1, -r);
      }
      var i = n - 1, o = 1, s = 0;
      this[t + i] = 255 & e;
      while (--i >= 0 && (o *= 256)) (e < 0 && 0 === s && 0 !== this[t + i + 1] && (s = 1), this[t + i] = (e / o >> 0) - s & 255);
      return t + n;
    }, u.prototype.writeInt8 = function (e, t, n) {
      return (e = +e, t |= 0, n || A(this, e, t, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1);
    }, u.prototype.writeInt16LE = function (e, t, n) {
      return (e = +e, t |= 0, n || A(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : P(this, e, t, !0), t + 2);
    }, u.prototype.writeInt16BE = function (e, t, n) {
      return (e = +e, t |= 0, n || A(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : P(this, e, t, !1), t + 2);
    }, u.prototype.writeInt32LE = function (e, t, n) {
      return (e = +e, t |= 0, n || A(this, e, t, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : E(this, e, t, !0), t + 4);
    }, u.prototype.writeInt32BE = function (e, t, n) {
      return (e = +e, t |= 0, n || A(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : E(this, e, t, !1), t + 4);
    }, u.prototype.writeFloatLE = function (e, t, n) {
      return H(this, e, t, !0, n);
    }, u.prototype.writeFloatBE = function (e, t, n) {
      return H(this, e, t, !1, n);
    }, u.prototype.writeDoubleLE = function (e, t, n) {
      return C(this, e, t, !0, n);
    }, u.prototype.writeDoubleBE = function (e, t, n) {
      return C(this, e, t, !1, n);
    }, u.prototype.copy = function (e, t, n, a) {
      if ((n || (n = 0), a || 0 === a || (a = this.length), t >= e.length && (t = e.length), t || (t = 0), a > 0 && a < n && (a = n), a === n)) return 0;
      if (0 === e.length || 0 === this.length) return 0;
      if (t < 0) throw new RangeError("targetStart out of bounds");
      if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
      if (a < 0) throw new RangeError("sourceEnd out of bounds");
      (a > this.length && (a = this.length), e.length - t < a - n && (a = e.length - t + n));
      var r, i = a - n;
      if (this === e && n < t && t < a) for (r = i - 1; r >= 0; --r) e[r + t] = this[r + n]; else if (i < 1e3 || !u.TYPED_ARRAY_SUPPORT) for (r = 0; r < i; ++r) e[r + t] = this[r + n]; else Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);
      return i;
    }, u.prototype.fill = function (e, t, n, a) {
      if ("string" === typeof e) {
        if (("string" === typeof t ? (a = t, t = 0, n = this.length) : "string" === typeof n && (a = n, n = this.length), 1 === e.length)) {
          var r = e.charCodeAt(0);
          r < 256 && (e = r);
        }
        if (void 0 !== a && "string" !== typeof a) throw new TypeError("encoding must be a string");
        if ("string" === typeof a && !u.isEncoding(a)) throw new TypeError("Unknown encoding: " + a);
      } else "number" === typeof e && (e &= 255);
      if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
      if (n <= t) return this;
      var i;
      if ((t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" === typeof e)) for (i = t; i < n; ++i) this[i] = e; else {
        var o = u.isBuffer(e) ? e : R(new u(e, a).toString()), s = o.length;
        for (i = 0; i < n - t; ++i) this[i + t] = o[i % s];
      }
      return this;
    });
    var F = /[^+\/0-9A-Za-z-_]/g;
    function N(e) {
      return e < 16 ? "0" + e.toString(16) : e.toString(16);
    }
    function R(e, t) {
      var n;
      t = t || 1 / 0;
      for (var a = e.length, r = null, i = [], o = 0; o < a; ++o) {
        if ((n = e.charCodeAt(o), n > 55295 && n < 57344)) {
          if (!r) {
            if (n > 56319) {
              (t -= 3) > -1 && i.push(239, 191, 189);
              continue;
            }
            if (o + 1 === a) {
              (t -= 3) > -1 && i.push(239, 191, 189);
              continue;
            }
            r = n;
            continue;
          }
          if (n < 56320) {
            ((t -= 3) > -1 && i.push(239, 191, 189), r = n);
            continue;
          }
          n = 65536 + (r - 55296 << 10 | n - 56320);
        } else r && (t -= 3) > -1 && i.push(239, 191, 189);
        if ((r = null, n < 128)) {
          if ((t -= 1) < 0) break;
          i.push(n);
        } else if (n < 2048) {
          if ((t -= 2) < 0) break;
          i.push(n >> 6 | 192, 63 & n | 128);
        } else if (n < 65536) {
          if ((t -= 3) < 0) break;
          i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
        } else {
          if (!(n < 1114112)) throw new Error("Invalid code point");
          if ((t -= 4) < 0) break;
          i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
        }
      }
      return i;
    }
    function B(e) {
      return a.toByteArray((function (e) {
        if ((e = (function (e) {
          return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
        })(e).replace(F, ""), e.length < 2)) return "";
        while (e.length % 4 !== 0) e += "=";
        return e;
      })(e));
    }
    function W(e, t, n, a) {
      for (var r = 0; r < a; ++r) {
        if (r + n >= t.length || r >= e.length) break;
        t[r + n] = e[r];
      }
      return r;
    }
  }).call(this, require("@/.unpacked/svc/0ee4.js"));
})(module, exports, __r);
