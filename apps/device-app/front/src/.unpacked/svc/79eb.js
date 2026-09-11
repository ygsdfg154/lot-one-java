// webpack 模块 79eb  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/7ca3.js")), i = a(require("@/.unpacked/svc/51c6.js")), o = a(require("@/.unpacked/svc/c7a4.js")), s = a(require("@/.unpacked/svc/f59a.js")), u = require("@/.unpacked/svc/8a57.js");
  function d(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      (t && (a = a.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, a));
    }
    return n;
  }
  function c(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? d(Object(n), !0).forEach(function (t) {
        (0, r.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : d(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var l = function (e, t) {
    var n = {};
    return (e.forEach(function (e) {
      (0, u.isUndefined)(t[e]) || (n[e] = t[e]);
    }), n);
  };
  t.default = function (e) {
    return new Promise(function (t, n) {
      var a, r = (0, i.default)((0, o.default)(e.baseURL, e.url), e.params), d = {
        url: r,
        header: e.header,
        complete: function (a) {
          (e.fullPath = r, a.config = e);
          try {
            "string" === typeof a.data && (a.data = JSON.parse(a.data));
          } catch (i) {}
          (0, s.default)(t, n, a);
        }
      };
      if ("UPLOAD" === e.method) {
        (delete d.header["content-type"], delete d.header["Content-Type"]);
        var f = {
          filePath: e.filePath,
          name: e.name
        };
        a = uni.uploadFile(c(c(c({}, d), f), l(["files", "timeout", "formData"], e)));
      } else if ("DOWNLOAD" === e.method) ((0, u.isUndefined)(e.timeout) || (d.timeout = e.timeout), a = uni.downloadFile(d)); else {
        a = uni.request(c(c({}, d), l(["data", "method", "timeout", "dataType", "responseType", "sslVerify", "firstIpv4"], e)));
      }
      e.getTask && e.getTask(a, e);
    });
  };
})(module, exports, __r);
