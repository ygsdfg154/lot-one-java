// webpack 模块 a3fc  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  (function (e) {
    function n(e, t) {
      for (var n = 0, a = e.length - 1; a >= 0; a--) {
        var r = e[a];
        "." === r ? e.splice(a, 1) : ".." === r ? (e.splice(a, 1), n++) : n && (e.splice(a, 1), n--);
      }
      if (t) for (; n--; n) e.unshift("..");
      return e;
    }
    function a(e, t) {
      if (e.filter) return e.filter(t);
      for (var n = [], a = 0; a < e.length; a++) t(e[a], a, e) && n.push(e[a]);
      return n;
    }
    (t.resolve = function () {
      for (var t = "", r = !1, i = arguments.length - 1; i >= -1 && !r; i--) {
        var o = i >= 0 ? arguments[i] : e.cwd();
        if ("string" !== typeof o) throw new TypeError("Arguments to path.resolve must be strings");
        o && (t = o + "/" + t, r = "/" === o.charAt(0));
      }
      return (t = n(a(t.split("/"), function (e) {
        return !!e;
      }), !r).join("/"), (r ? "/" : "") + t || ".");
    }, t.normalize = function (e) {
      var i = t.isAbsolute(e), o = "/" === r(e, -1);
      return (e = n(a(e.split("/"), function (e) {
        return !!e;
      }), !i).join("/"), e || i || (e = "."), e && o && (e += "/"), (i ? "/" : "") + e);
    }, t.isAbsolute = function (e) {
      return "/" === e.charAt(0);
    }, t.join = function () {
      var e = Array.prototype.slice.call(arguments, 0);
      return t.normalize(a(e, function (e, t) {
        if ("string" !== typeof e) throw new TypeError("Arguments to path.join must be strings");
        return e;
      }).join("/"));
    }, t.relative = function (e, n) {
      function a(e) {
        for (var t = 0; t < e.length; t++) if ("" !== e[t]) break;
        for (var n = e.length - 1; n >= 0; n--) if ("" !== e[n]) break;
        return t > n ? [] : e.slice(t, n - t + 1);
      }
      (e = t.resolve(e).substr(1), n = t.resolve(n).substr(1));
      for (var r = a(e.split("/")), i = a(n.split("/")), o = Math.min(r.length, i.length), s = o, u = 0; u < o; u++) if (r[u] !== i[u]) {
        s = u;
        break;
      }
      var d = [];
      for (u = s; u < r.length; u++) d.push("..");
      return (d = d.concat(i.slice(s)), d.join("/"));
    }, t.sep = "/", t.delimiter = ":", t.dirname = function (e) {
      if (("string" !== typeof e && (e += ""), 0 === e.length)) return ".";
      for (var t = e.charCodeAt(0), n = 47 === t, a = -1, r = !0, i = e.length - 1; i >= 1; --i) if ((t = e.charCodeAt(i), 47 === t)) {
        if (!r) {
          a = i;
          break;
        }
      } else r = !1;
      return -1 === a ? n ? "/" : "." : n && 1 === a ? "/" : e.slice(0, a);
    }, t.basename = function (e, t) {
      var n = (function (e) {
        "string" !== typeof e && (e += "");
        var t, n = 0, a = -1, r = !0;
        for (t = e.length - 1; t >= 0; --t) if (47 === e.charCodeAt(t)) {
          if (!r) {
            n = t + 1;
            break;
          }
        } else -1 === a && (r = !1, a = t + 1);
        return -1 === a ? "" : e.slice(n, a);
      })(e);
      return (t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)), n);
    }, t.extname = function (e) {
      "string" !== typeof e && (e += "");
      for (var t = -1, n = 0, a = -1, r = !0, i = 0, o = e.length - 1; o >= 0; --o) {
        var s = e.charCodeAt(o);
        if (47 !== s) (-1 === a && (r = !1, a = o + 1), 46 === s ? -1 === t ? t = o : 1 !== i && (i = 1) : -1 !== t && (i = -1)); else if (!r) {
          n = o + 1;
          break;
        }
      }
      return -1 === t || -1 === a || 0 === i || 1 === i && t === a - 1 && t === n + 1 ? "" : e.slice(t, a);
    });
    var r = "b" === ("ab").substr(-1) ? function (e, t, n) {
      return e.substr(t, n);
    } : function (e, t, n) {
      return (t < 0 && (t = e.length + t), e.substr(t, n));
    };
  }).call(this, require("@/.unpacked/svc/28d0.js"));
})(module, exports, __r);
