// webpack 模块 208  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pages/my/my.js, pagesCore/account/account-safety.js, pagesCore/account/revise-pwd.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t) {
  (e.exports = function (e, t) {
    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (null != n) {
      var a, r, i, o, s = [], d = !0, u = !1;
      try {
        if ((i = (n = n.call(e)).next, 0 === t)) {
          if (Object(n) !== n) return;
          d = !1;
        } else for (; !(d = (a = i.call(n)).done) && (s.push(a.value), s.length !== t); d = !0) ;
      } catch (e) {
        (u = !0, r = e);
      } finally {
        try {
          if (!d && null != n.return && (o = n.return(), Object(o) !== o)) return;
        } finally {
          if (u) throw r;
        }
      }
      return s;
    }
  }, e.exports.__esModule = !0, e.exports.default = e.exports);
})(module, exports, __r);
