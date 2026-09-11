// webpack 模块 45ed  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t) {
  function n(e) {
    return !!e.constructor && "function" === typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
  }
  e.exports = function (e) {
    return null != e && (n(e) || (function (e) {
      return "function" === typeof e.readFloatLE && "function" === typeof e.slice && n(e.slice(0, 0));
    })(e) || !!e._isBuffer);
  };
})(module, exports, __r);
