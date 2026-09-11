// webpack 模块 fba3  [view]
// 出现于: app-view.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  (a.d(e, "b", function () {
    return i;
  }), a.d(e, "c", function () {
    return r;
  }), a.d(e, "a", function () {
    return n;
  }));
  var n = {
    uTransition: require("@/.unpacked/view/02b1.js").default,
    uIcon: require("@/.unpacked/view/a9fb.js").default
  }, i = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("u-transition", {
      attrs: {
        _i: 0
      }
    }, [a("uni-view", {
      staticClass: t._$g(1, "sc"),
      style: t._$g(1, "s"),
      attrs: {
        _i: 1
      },
      on: {
        click: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    }, [t._$g(2, "i") ? a("v-uni-image", {
      staticClass: t._$g(2, "sc"),
      style: t._$g(2, "s"),
      attrs: {
        src: t._$g(2, "a-src"),
        mode: t._$g(2, "a-mode"),
        "show-menu-by-longpress": t._$g(2, "a-show-menu-by-longpress"),
        "lazy-load": t._$g(2, "a-lazy-load"),
        _i: 2
      },
      on: {
        error: function (e) {
          return t.$handleViewEvent(e);
        },
        load: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    }) : t._e(), t._$g(3, "i") ? a("uni-view", {
      staticClass: t._$g(3, "sc"),
      style: t._$g(3, "s"),
      attrs: {
        _i: 3
      }
    }, [t._t("loading", [a("u-icon", {
      attrs: {
        _i: 5
      }
    })], {
      _i: 4
    })], 2) : t._e(), t._$g(6, "i") ? a("uni-view", {
      staticClass: t._$g(6, "sc"),
      style: t._$g(6, "s"),
      attrs: {
        _i: 6
      }
    }, [t._t("error", [a("u-icon", {
      attrs: {
        _i: 8
      }
    })], {
      _i: 7
    })], 2) : t._e()], 1)], 1);
  }, r = [];
})(module, exports, __r);
