// webpack 模块 5129  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/127e.js")), i = a(require("@/.unpacked/svc/ee10.js")), o = require("../../common/request.js"), s = {
    checkAppVersion: (function () {
      var e = async function (t) {
        var n;
        n = await (0, o.request)({
          url: "/upgrade-app-version/check-version",
          method: "POST",
          data: t,
          toastState: !0
        });
        return n;
      };
      return function (t) {
        return e.apply(this, arguments);
      };
    })()
  }, u = s;
  t.default = u;
})(module, exports, __r);
