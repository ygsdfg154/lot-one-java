// webpack 模块 7172  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t) {
  (e.exports = function (e, t) {
    var n = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (null != n) {
      var a, r, i, o, s = [], u = !0, d = !1;
      try {
        if ((i = (n = n.call(e)).next, 0 === t)) {
          if (Object(n) !== n) return;
          u = !1;
        } else for (; !(u = (a = i.call(n)).done) && (s.push(a.value), s.length !== t); u = !0) ;
      } catch (e) {
        (d = !0, r = e);
      } finally {
        try {
          if (!u && null != n["return"] && (o = n["return"](), Object(o) !== o)) return;
        } finally {
          if (d) throw r;
        }
      }
      return s;
    }
  }, e.exports.__esModule = !0, e.exports["default"] = e.exports);
})(module, exports, __r);
