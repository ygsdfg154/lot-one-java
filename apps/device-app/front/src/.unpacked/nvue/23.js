// webpack 模块 23  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t) {
  function n(e, t, n, a, r, i, o) {
    try {
      var s = e[i](o), d = s.value;
    } catch (e) {
      return void n(e);
    }
    s.done ? t(d) : Promise.resolve(d).then(a, r);
  }
  (e.exports = function (e) {
    return function () {
      var t = this, a = arguments;
      return new Promise(function (r, i) {
        var o = e.apply(t, a);
        function s(e) {
          n(o, r, i, s, d, "next", e);
        }
        function d(e) {
          n(o, r, i, s, d, "throw", e);
        }
        s(void 0);
      });
    };
  }, e.exports.__esModule = !0, e.exports.default = e.exports);
})(module, exports, __r);
