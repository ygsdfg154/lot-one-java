// webpack 模块 6382  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  var a = require("@/.unpacked/svc/6454.js");
  (e.exports = function (e, t) {
    if (e) {
      if ("string" === typeof e) return a(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      return ("Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/).test(n) ? a(e, t) : void 0);
    }
  }, e.exports.__esModule = !0, e.exports["default"] = e.exports);
})(module, exports, __r);
