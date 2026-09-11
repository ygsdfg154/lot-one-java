// webpack 模块 32c5  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/7ca3.js")), i = require("@/.unpacked/svc/8a57.js");
  function o(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      (t && (a = a.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, a));
    }
    return n;
  }
  function s(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? o(Object(n), !0).forEach(function (t) {
        (0, r.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : o(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var u = function (e, t, n) {
    var a = {};
    return (e.forEach(function (e) {
      (0, i.isUndefined)(n[e]) ? (0, i.isUndefined)(t[e]) || (a[e] = t[e]) : a[e] = n[e];
    }), a);
  };
  t.default = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = t.method || e.method || "GET", a = {
      baseURL: e.baseURL || "",
      method: n,
      url: t.url || "",
      params: t.params || ({}),
      custom: s(s({}, e.custom || ({})), t.custom || ({})),
      header: (0, i.deepMerge)(e.header || ({}), t.header || ({}))
    }, r = ["getTask", "validateStatus"];
    if ((a = s(s({}, a), u(r, e, t)), "DOWNLOAD" === n)) (0, i.isUndefined)(t.timeout) ? (0, i.isUndefined)(e.timeout) || (a.timeout = e.timeout) : a.timeout = t.timeout; else if ("UPLOAD" === n) {
      (delete a.header["content-type"], delete a.header["Content-Type"]);
      var o = ["files", "filePath", "name", "timeout", "formData"];
      (o.forEach(function (e) {
        (0, i.isUndefined)(t[e]) || (a[e] = t[e]);
      }), (0, i.isUndefined)(a.timeout) && !(0, i.isUndefined)(e.timeout) && (a.timeout = e.timeout));
    } else {
      var d = ["data", "timeout", "dataType", "responseType", "sslVerify", "firstIpv4"];
      a = s(s({}, a), u(d, e, t));
    }
    return a;
  };
})(module, exports, __r);
