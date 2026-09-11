// webpack 模块 51c6  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/3b2d.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = function (e, t) {
    if (!t) return e;
    var n;
    if (r.isURLSearchParams(t)) n = t.toString(); else {
      var a = [];
      (r.forEach(t, function (e, t) {
        null !== e && "undefined" !== typeof e && (r.isArray(e) ? t = ("").concat(t, "[]") : e = [e], r.forEach(e, function (e) {
          (r.isDate(e) ? e = e.toISOString() : r.isObject(e) && (e = JSON.stringify(e)), a.push(("").concat(o(t), "=").concat(o(e))));
        }));
      }), n = a.join("&"));
    }
    if (n) {
      var i = e.indexOf("#");
      (-1 !== i && (e = e.slice(0, i)), e += (-1 === e.indexOf("?") ? "?" : "&") + n);
    }
    return e;
  });
  var r = (function (e, t) {
    if (!t && e && e.__esModule) return e;
    if (null === e || "object" !== a(e) && "function" !== typeof e) return {
      default: e
    };
    var n = i(t);
    if (n && n.has(e)) return n.get(e);
    var r = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var s in e) if ("default" !== s && Object.prototype.hasOwnProperty.call(e, s)) {
      var u = o ? Object.getOwnPropertyDescriptor(e, s) : null;
      u && (u.get || u.set) ? Object.defineProperty(r, s, u) : r[s] = e[s];
    }
    (r.default = e, n && n.set(e, r));
    return r;
  })(require("@/.unpacked/svc/8a57.js"));
  function i(e) {
    if ("function" !== typeof WeakMap) return null;
    var t = new WeakMap(), n = new WeakMap();
    return (i = function (e) {
      return e ? n : t;
    })(e);
  }
  function o(e) {
    return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
})(module, exports, __r);
