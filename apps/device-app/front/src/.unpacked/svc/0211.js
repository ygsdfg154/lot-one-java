// webpack 模块 0211  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a;
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500, n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
    n ? a || (a = !0, "function" === typeof e && e(), setTimeout(function () {
      a = !1;
    }, t)) : a || (a = !0, setTimeout(function () {
      (a = !1, "function" === typeof e && e());
    }, t));
  };
  t.default = r;
})(module, exports, __r);
