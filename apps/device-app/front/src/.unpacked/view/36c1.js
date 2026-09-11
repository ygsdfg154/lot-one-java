// webpack 模块 36c1  [view]
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
    return a("uvImage", {
      attrs: {
        _i: 0
      },
      on: {
        click: function (e) {
          return t.$handleViewEvent(e);
        },
        error: function (e) {
          return t.$handleViewEvent(e);
        },
        load: function (e) {
          return t.$handleViewEvent(e);
        }
      },
      scopedSlots: t._u([{
        key: "loading",
        fn: function (e, a, n) {
          return [t._t("loading", null, {
            _i: "2-" + n
          })];
        }
      }, {
        key: "error",
        fn: function (e, a, n) {
          return [t._t("error", null, {
            _i: "4-" + n
          })];
        }
      }], null, !0)
    });
  }, i = [];
})(module, exports, __r);
