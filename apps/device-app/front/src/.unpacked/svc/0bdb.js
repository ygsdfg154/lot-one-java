// webpack 模块 0bdb  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a = require("@/.unpacked/svc/d551.js");
  function r(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      (r.enumerable = r.enumerable || !1, r.configurable = !0, ("value" in r) && (r.writable = !0), Object.defineProperty(e, a(r.key), r));
    }
  }
  (e.exports = function (e, t, n) {
    return (t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e);
  }, e.exports.__esModule = !0, e.exports["default"] = e.exports);
})(module, exports, __r);
