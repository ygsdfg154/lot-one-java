// webpack 模块 ee10  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t) {
  function n(e, t, n, a, r, i, o) {
    try {
      var s = e[i](o), u = s.value;
    } catch (d) {
      return void n(d);
    }
    s.done ? t(u) : Promise.resolve(u).then(a, r);
  }
  (e.exports = function (e) {
    return function () {
      var t = this, a = arguments;
      return new Promise(function (r, i) {
        var o = e.apply(t, a);
        function s(e) {
          n(o, r, i, s, u, "next", e);
        }
        function u(e) {
          n(o, r, i, s, u, "throw", e);
        }
        s(void 0);
      });
    };
  }, e.exports.__esModule = !0, e.exports["default"] = e.exports);
})(module, exports, __r);
