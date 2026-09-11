// webpack 模块 ac93  [view]
// 出现于: app-view.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  t.exports = function (t, e) {
    (e || (e = {}), t = t && t.__esModule ? t.default : t);
    var a = !1;
    if ("string" !== typeof t) {
      if (!t.protocol || "file:" !== t.protocol || !t.pathname) return t;
      (a = !0, t = t.pathname);
    }
    return ((/^['"].*['"]$/).test(t) && (t = t.slice(1, -1)), e.hash && (t += e.hash), (/["'() \t\n]/).test(t) || e.needQuotes ? ('"').concat(t.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : a ? t : 0 === t.indexOf("/") ? t.substr(1) : t);
  };
})(module, exports, __r);
