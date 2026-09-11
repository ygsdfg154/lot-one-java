// webpack 模块 6b53  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  function a() {
    this.handlers = [];
  }
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0, a.prototype.use = function (e, t) {
    return (this.handlers.push({
      fulfilled: e,
      rejected: t
    }), this.handlers.length - 1);
  }, a.prototype.eject = function (e) {
    this.handlers[e] && (this.handlers[e] = null);
  }, a.prototype.forEach = function (e) {
    this.handlers.forEach(function (t) {
      null !== t && e(t);
    });
  });
  var r = a;
  t.default = r;
})(module, exports, __r);
