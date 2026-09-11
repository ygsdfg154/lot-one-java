// webpack 模块 f59a  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = function (e, t, n) {
    var a = n.config.validateStatus, r = n.statusCode;
    !r || a && !a(r) ? t(n) : e(n);
  });
})(module, exports, __r);
