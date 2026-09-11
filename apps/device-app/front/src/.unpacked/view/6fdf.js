// webpack 模块 6fdf  [view]
// 出现于: app-view.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  (a.d(e, "b", function () {
    return n;
  }), a.d(e, "c", function () {
    return i;
  }), a.d(e, "a", function () {}));
  var n = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("uni-view", {
      attrs: {
        _i: 0
      }
    }, [a("v-uni-web-view", {
      ref: "webview",
      attrs: {
        "webview-styles": t._$g(1, "a-webview-styles"),
        src: t._$g(1, "a-src"),
        _i: 1
      },
      on: {
        message: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    })], 1);
  }, i = [];
})(module, exports, __r);
