// webpack 模块 8a57  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.deepMerge = function e() {
    var t = {};
    function n(n, a) {
      "object" === (0, r.default)(t[a]) && "object" === (0, r.default)(n) ? t[a] = e(t[a], n) : "object" === (0, r.default)(n) ? t[a] = e({}, n) : t[a] = n;
    }
    for (var a = 0, i = arguments.length; a < i; a++) s(arguments[a], n);
    return t;
  }, t.forEach = s, t.isArray = o, t.isBoolean = function (e) {
    return "boolean" === typeof e;
  }, t.isDate = function (e) {
    return "[object Date]" === i.call(e);
  }, t.isObject = function (e) {
    return null !== e && "object" === (0, r.default)(e);
  }, t.isPlainObject = function (e) {
    return "[object Object]" === Object.prototype.toString.call(e);
  }, t.isURLSearchParams = function (e) {
    return "undefined" !== typeof URLSearchParams && e instanceof URLSearchParams;
  }, t.isUndefined = function (e) {
    return "undefined" === typeof e;
  });
  var r = a(require("@/.unpacked/svc/3b2d.js")), i = Object.prototype.toString;
  function o(e) {
    return "[object Array]" === i.call(e);
  }
  function s(e, t) {
    if (null !== e && "undefined" !== typeof e) if (("object" !== (0, r.default)(e) && (e = [e]), o(e))) for (var n = 0, a = e.length; n < a; n++) t.call(null, e[n], n, e); else for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e);
  }
})(module, exports, __r);
