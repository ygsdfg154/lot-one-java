// webpack 模块 2622  [view]
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
    uPopup: require("@/.unpacked/view/49dc.js").default,
    uButton: require("@/.unpacked/view/59c8.js").default
  }, i = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("u-popup", {
      attrs: {
        _i: 0
      },
      on: {
        close: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    }, [a("uni-view", {
      staticClass: t._$g(1, "sc"),
      attrs: {
        _i: 1
      }
    }, [a("uHeader", {
      attrs: {
        _i: 2
      }
    }), a("v-uni-scroll-view", {
      style: t._$g(3, "s"),
      attrs: {
        "scroll-y": !0,
        "scroll-top": t._$g(3, "a-scroll-top"),
        scrollIntoView: t._$g(3, "a-scrollIntoView"),
        _i: 3
      },
      on: {
        scroll: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    }, [a("uMonth", {
      ref: "month",
      attrs: {
        _i: 4
      },
      on: {
        monthSelected: function (e) {
          return t.$handleViewEvent(e);
        },
        updateMonthTop: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    })], 1), t._$g(5, "i") ? t._t("footer", [a("uni-view", {
      staticClass: t._$g(6, "sc"),
      attrs: {
        _i: 6
      }
    }, [a("u-button", {
      attrs: {
        _i: 7
      },
      on: {
        click: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    })], 1)], {
      _i: 5
    }) : t._e()], 2)], 1);
  }, r = [];
})(module, exports, __r);
