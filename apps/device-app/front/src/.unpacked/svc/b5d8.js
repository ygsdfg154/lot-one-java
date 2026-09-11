// webpack 模块 b5d8  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/svc/47a9.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/svc/7ca3.js")), i = a(require("@/.unpacked/svc/67ad.js")), o = a(require("@/.unpacked/svc/0bdb.js")), s = a(require("@/.unpacked/svc/a80e.js")), u = a(require("@/.unpacked/svc/6b53.js")), d = a(require("@/.unpacked/svc/32c5.js")), c = a(require("@/.unpacked/svc/70c1.js")), l = require("@/.unpacked/svc/8a57.js"), f = a(require("@/.unpacked/svc/481b.js"));
    function m(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        (t && (a = a.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, a));
      }
      return n;
    }
    function p(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? m(Object(n), !0).forEach(function (t) {
          (0, r.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : m(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var _ = (function () {
      function t() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        ((0, i.default)(this, t), (0, l.isPlainObject)(n) || (n = {}, e("warn", "\u8bbe\u7f6e\u5168\u5c40\u53c2\u6570\u5fc5\u987b\u63a5\u6536\u4e00\u4e2aObject", " at uni_modules/uview-ui/libs/luch-request/core/Request.js:39")), this.config = (0, f.default)(p(p({}, c.default), n)), this.interceptors = {
          request: new u.default(),
          response: new u.default()
        });
      }
      return ((0, o.default)(t, [{
        key: "setConfig",
        value: function (e) {
          this.config = e(this.config);
        }
      }, {
        key: "middleware",
        value: function (e) {
          e = (0, d.default)(this.config, e);
          var t = [s.default, void 0], n = Promise.resolve(e);
          (this.interceptors.request.forEach(function (e) {
            t.unshift(e.fulfilled, e.rejected);
          }), this.interceptors.response.forEach(function (e) {
            t.push(e.fulfilled, e.rejected);
          }));
          while (t.length) n = n.then(t.shift(), t.shift());
          return n;
        }
      }, {
        key: "request",
        value: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return this.middleware(e);
        }
      }, {
        key: "get",
        value: function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return this.middleware(p({
            url: e,
            method: "GET"
          }, t));
        }
      }, {
        key: "post",
        value: function (e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return this.middleware(p({
            url: e,
            data: t,
            method: "POST"
          }, n));
        }
      }, {
        key: "put",
        value: function (e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return this.middleware(p({
            url: e,
            data: t,
            method: "PUT"
          }, n));
        }
      }, {
        key: "delete",
        value: function (e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return this.middleware(p({
            url: e,
            data: t,
            method: "DELETE"
          }, n));
        }
      }, {
        key: "options",
        value: function (e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return this.middleware(p({
            url: e,
            data: t,
            method: "OPTIONS"
          }, n));
        }
      }, {
        key: "upload",
        value: function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return (t.url = e, t.method = "UPLOAD", this.middleware(t));
        }
      }, {
        key: "download",
        value: function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return (t.url = e, t.method = "DOWNLOAD", this.middleware(t));
        }
      }]), t);
    })();
    t.default = _;
  }).call(this, require("@/.unpacked/svc/f3b9.js")["default"]);
})(module, exports, __r);
