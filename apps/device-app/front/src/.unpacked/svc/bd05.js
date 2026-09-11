// webpack 模块 bd05  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/svc/47a9.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = function () {
      return new Promise(function (t, n) {
        plus.runtime.getProperty(plus.runtime.appid, function (a) {
          var i = {
            action: "checkVersion",
            appId: plus.runtime.appid,
            appName: plus.runtime.name,
            appVersion: plus.runtime.version,
            wgtVersion: a.version
          };
          r.default.checkAppVersion(i).then(function (n) {
            (e("log", "res===================", n, " at pages/app-updateVersions/utils/update-version.js:15"), t(n));
          }).catch(function (e) {
            n(e);
          });
        });
      });
    });
    var r = a(require("@/.unpacked/svc/5129.js"));
  }).call(this, require("@/.unpacked/svc/f3b9.js")["default"]);
})(module, exports, __r);
