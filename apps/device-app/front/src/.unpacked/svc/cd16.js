// webpack 模块 cd16  [svc]
// 出现于: pagesMore/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, s) {
  "use strict";
  (s.d(e, "b", function () {
    return n;
  }), s.d(e, "c", function () {
    return a;
  }), s.d(e, "a", function () {
    return i;
  }));
  var i = {
    "u-Image": require("uview-ui/components/u--image/u--image.vue").default
  }, n = function () {
    var t = this, e = t.$createElement, s = t._self._c || e;
    return s("view", [s("view", {
      staticClass: t._$s(1, "sc", "about"),
      attrs: {
        _i: 1
      }
    }, [s("view", {
      staticClass: t._$s(2, "sc", "box"),
      attrs: {
        _i: 2
      }
    }, [s("image", {
      staticClass: t._$s(3, "sc", "logoImg"),
      attrs: {
        src: t._$s(3, "a-src", t.cdn + "/draw/qzwl-logo.png"),
        _i: 3
      }
    }), s("text", {
      staticClass: t._$s(4, "sc", "tip appName"),
      attrs: {
        _i: 4
      }
    }, [t._v(t._$s(4, "t0-0", t._s(t.l("app.name"))))]), t._$s(5, "i", t.version) ? s("text", {
      staticClass: t._$s(5, "sc", "tip"),
      attrs: {
        _i: 5
      },
      on: {
        click: t.tapVersion
      }
    }, [t._v(t._$s(5, "t0-0", t._s(t.version)))]) : t._e()])]), s("view", {
      staticClass: t._$s(6, "sc", "card1"),
      attrs: {
        _i: 6
      }
    }, [s("view", {
      staticClass: t._$s(7, "sc", "card1-content flex-row items-center justify-between"),
      attrs: {
        _i: 7
      },
      on: {
        click: function (e) {
          return t.gotoPage("/pagesMore/my/setups/privacy_notice");
        }
      }
    }, [s("view", {
      staticClass: t._$s(8, "sc", "flex-row items-center"),
      attrs: {
        _i: 8
      }
    }, [s("text", {
      staticClass: t._$s(9, "sc", "text-title text-md"),
      attrs: {
        _i: 9
      }
    }, [t._v(t._$s(9, "t0-0", t._s(t.l("mine.setup.privacy.notice"))))])]), s("u--image", {
      attrs: {
        showLoading: !0,
        mode: "aspectFit",
        src: t.cdn + "/ikon/qzwl-general-right@2x.png",
        width: "14rpx",
        height: "24rpx",
        _i: 10
      }
    })], 1), s("view", {
      staticClass: t._$s(11, "sc", "card1-content flex-row items-center justify-between"),
      attrs: {
        _i: 11
      },
      on: {
        click: function (e) {
          return t.gotoPage("/pagesMore/my/setups/service_terms");
        }
      }
    }, [s("view", {
      staticClass: t._$s(12, "sc", "flex-row items-center"),
      attrs: {
        _i: 12
      }
    }, [s("text", {
      staticClass: t._$s(13, "sc", "text-title text-md"),
      attrs: {
        _i: 13
      }
    }, [t._v(t._$s(13, "t0-0", t._s(t.l("mine.setup.service.agreement"))))])]), s("u--image", {
      attrs: {
        showLoading: !0,
        mode: "aspectFit",
        src: t.cdn + "/ikon/qzwl-general-right@2x.png",
        width: "14rpx",
        height: "24rpx",
        _i: 14
      }
    })], 1), s("view", {
      staticClass: t._$s(15, "sc", "card1-content flex-row items-center justify-between"),
      attrs: {
        _i: 15
      },
      on: {
        click: t.check
      }
    }, [s("view", {
      staticClass: t._$s(16, "sc", "flex-row items-center"),
      attrs: {
        _i: 16
      }
    }, [s("text", {
      staticClass: t._$s(17, "sc", "text-title text-md"),
      attrs: {
        _i: 17
      }
    }, [t._v(t._$s(17, "t0-0", t._s(t.l("common.update"))))])]), s("u--image", {
      attrs: {
        showLoading: !0,
        mode: "aspectFit",
        src: t.cdn + "/ikon/qzwl-general-right@2x.png",
        width: "14rpx",
        height: "24rpx",
        _i: 18
      }
    })], 1)]), s("view", {
      staticClass: t._$s(19, "sc", "copyright"),
      attrs: {
        _i: 19
      }
    }, [s("text", {
      staticClass: t._$s(20, "sc", "hint"),
      attrs: {
        _i: 20
      }
    }, [t._v(t._$s(20, "t0-0", t._s(t.year)))]), s("text", {
      staticClass: t._$s(21, "sc", "hint"),
      attrs: {
        _i: 21
      }
    }, [t._v(t._$s(21, "t0-0", t._s(t.l("app.copy"))))]), s("text", {
      staticClass: t._$s(22, "sc", "hint"),
      attrs: {
        _i: 22
      }
    }, [t._v(t._$s(22, "t0-0", t._s(t.l("app.ICP"))))])])]);
  }, a = [];
})(module, exports, __r);
