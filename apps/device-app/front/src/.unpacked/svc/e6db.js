// webpack 模块 e6db  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a = require("@/.unpacked/svc/3b2d.js")["default"];
  (e.exports = function (e, t) {
    if ("object" != a(e) || !e) return e;
    var n = e[Symbol.toPrimitive];
    if (void 0 !== n) {
      var r = n.call(e, t || "default");
      if ("object" != a(r)) return r;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t ? String : Number)(e);
  }, e.exports.__esModule = !0, e.exports["default"] = e.exports);
})(module, exports, __r);
