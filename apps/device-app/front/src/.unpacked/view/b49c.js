// webpack 模块 b49c  [view]
// 出现于: app-view.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  function n(t, e) {
    for (var a = [], n = {}, i = 0; i < e.length; i++) {
      var r = e[i], o = r[0], s = r[1], c = r[2], u = r[3], d = {
        id: t + ":" + i,
        css: s,
        media: c,
        sourceMap: u
      };
      n[o] ? n[o].parts.push(d) : a.push(n[o] = {
        id: o,
        parts: [d]
      });
    }
    return a;
  }
  (a.r(e), a.d(e, "default", function () {
    return p;
  }));
  var i = "undefined" !== typeof document;
  if ("undefined" !== typeof DEBUG && DEBUG && !i) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
  var r = {}, o = i && (document.head || document.getElementsByTagName("head")[0]), s = null, c = 0, u = !1, d = function () {}, l = null, f = "undefined" !== typeof navigator && (/msie [6-9]\b/).test(navigator.userAgent.toLowerCase());
  function p(t, e, a, i) {
    (u = a, l = i || ({}));
    var o = n(t, e);
    return (v(o), function (e) {
      for (var a = [], i = 0; i < o.length; i++) {
        var s = o[i], c = r[s.id];
        (c.refs--, a.push(c));
      }
      e ? (o = n(t, e), v(o)) : o = [];
      for (i = 0; i < a.length; i++) {
        c = a[i];
        if (0 === c.refs) {
          for (var u = 0; u < c.parts.length; u++) c.parts[u]();
          delete r[c.id];
        }
      }
    });
  }
  function v(t) {
    for (var e = 0; e < t.length; e++) {
      var a = t[e], n = r[a.id];
      if (n) {
        n.refs++;
        for (var i = 0; i < n.parts.length; i++) n.parts[i](a.parts[i]);
        for (; i < a.parts.length; i++) n.parts.push(b(a.parts[i]));
        n.parts.length > a.parts.length && (n.parts.length = a.parts.length);
      } else {
        var o = [];
        for (i = 0; i < a.parts.length; i++) o.push(b(a.parts[i]));
        r[a.id] = {
          id: a.id,
          refs: 1,
          parts: o
        };
      }
    }
  }
  function _() {
    var t = document.createElement("style");
    return (t.type = "text/css", o.appendChild(t), t);
  }
  function b(t) {
    var e, a, n = document.querySelector('style[data-vue-ssr-id~="' + t.id + '"]');
    if (n) {
      if (u) return d;
      n.parentNode.removeChild(n);
    }
    if (f) {
      var i = c++;
      (n = s || (s = _()), e = x.bind(null, n, i, !1), a = x.bind(null, n, i, !0));
    } else (n = _(), e = m.bind(null, n), a = function () {
      n.parentNode.removeChild(n);
    });
    return (e(t), function (n) {
      if (n) {
        if (n.css === t.css && n.media === t.media && n.sourceMap === t.sourceMap) return;
        e(t = n);
      } else a();
    });
  }
  var g = (function () {
    var t = [];
    return function (e, a) {
      return (t[e] = a, t.filter(Boolean).join("\n"));
    };
  })();
  function x(t, e, a, n) {
    var i = a ? "" : O(n.css);
    if (t.styleSheet) t.styleSheet.cssText = g(e, i); else {
      var r = document.createTextNode(i), o = t.childNodes;
      (o[e] && t.removeChild(o[e]), o.length ? t.insertBefore(r, o[e]) : t.appendChild(r));
    }
  }
  function m(t, e) {
    var a = O(e.css), n = e.media, i = e.sourceMap;
    if ((n && t.setAttribute("media", n), l.ssrId && t.setAttribute("data-vue-ssr-id", e.id), i && (a += "\n/*# sourceURL=" + i.sources[0] + " */", a += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */"), t.styleSheet)) t.styleSheet.cssText = a; else {
      while (t.firstChild) t.removeChild(t.firstChild);
      t.appendChild(document.createTextNode(a));
    }
  }
  var h = /\b([+-]?\d+(\.\d+)?)[r|u]px\b/g, w = /var\(--status-bar-height\)/gi, $ = /var\(--window-top\)/gi, y = /var\(--window-bottom\)/gi, C = /var\(--window-left\)/gi, k = /var\(--window-right\)/gi, M = !1;
  function O(t) {
    if (!uni.canIUse("css.var")) {
      !1 === M && (M = plus.navigator.getStatusbarHeight());
      var e = {
        statusBarHeight: M,
        top: window.__WINDOW_TOP || 0,
        bottom: window.__WINDOW_BOTTOM || 0
      };
      t = t.replace(w, e.statusBarHeight + "px").replace($, e.top + "px").replace(y, e.bottom + "px").replace(C, "0px").replace(k, "0px");
    }
    return t.replace(/\{[\s\S]+?\}|@media.+?\{/g, function (t) {
      return t.replace(h, function (t, e) {
        return uni.upx2px(e) + "px";
      });
    });
  }
})(module, exports, __r);
