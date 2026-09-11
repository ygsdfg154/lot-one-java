// webpack 模块 70c1  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  t.default = {
    baseURL: "",
    header: {},
    method: "GET",
    dataType: "json",
    responseType: "text",
    custom: {},
    timeout: 6e4,
    sslVerify: !0,
    firstIpv4: !1,
    validateStatus: function (e) {
      return e >= 200 && e < 300;
    }
  };
})(module, exports, __r);
