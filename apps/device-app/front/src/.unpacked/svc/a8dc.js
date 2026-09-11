// webpack 模块 a8dc  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = null;
  var r = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 500, n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    if ((null !== a && clearTimeout(a), n)) {
      var r = !a;
      (a = setTimeout(function () {
        a = null;
      }, t), r && "function" === typeof e && e());
    } else a = setTimeout(function () {
      "function" === typeof e && e();
    }, t);
  };
  t.default = r;
})(module, exports, __r);
