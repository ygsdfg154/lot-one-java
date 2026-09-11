// webpack 模块 5061  [svc]
// 出现于: pagesFunc/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  (a.d(e, "b", function () {
    return r;
  }), a.d(e, "c", function () {
    return i;
  }), a.d(e, "a", function () {
    return n;
  }));
  var n = {
    uPopup: require("uview-ui/components/u-popup/u-popup.vue").default,
    uButton: require("uview-ui/components/u-button/u-button.vue").default
  }, r = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("view", [a("u-popup", {
      attrs: {
        show: t.agreeAudio,
        mode: "center",
        round: "15",
        customStyle: "width: 650rpx",
        closeable: !0,
        safeAreaInsetBottom: !1,
        _i: 1
      },
      on: {
        close: t.agreeClose
      }
    }, [a("view", {
      staticClass: t._$s(2, "sc", "p-xl m-b"),
      attrs: {
        _i: 2
      }
    }, [a("view", {
      staticClass: t._$s(3, "sc", "flex-row justify-center"),
      attrs: {
        _i: 3
      }
    }, [a("text", {
      staticClass: t._$s(4, "sc", "text-lx"),
      attrs: {
        _i: 4
      }
    }, [t._v(t._$s(4, "t0-0", t._s(t.l("audio.terms-for-usage"))))])]), a("view", {
      staticClass: t._$s(5, "sc", "flex-col"),
      attrs: {
        _i: 5
      }
    }, [a("text", {
      staticClass: t._$s(6, "sc", "m-b-xl text"),
      attrs: {
        _i: 6
      }
    }, [t._v(t._$s(6, "t0-0", t._s(t.l("audio.scene"))))]), a("text", {
      staticClass: t._$s(7, "sc", "text"),
      attrs: {
        _i: 7
      }
    }, [t._v(t._$s(7, "t0-0", t._s(t.l("audio.scene1"))))]), a("text", {
      staticClass: t._$s(8, "sc", "text"),
      attrs: {
        _i: 8
      }
    }, [t._v(t._$s(8, "t0-0", t._s(t.l("audio.scene2"))))]), a("text", {
      staticClass: t._$s(9, "sc", "text"),
      attrs: {
        _i: 9
      }
    }, [t._v(t._$s(9, "t0-0", t._s(t.l("audio.scene3"))))]), a("text", {
      staticClass: t._$s(10, "sc", "text"),
      attrs: {
        _i: 10
      }
    }, [t._v(t._$s(10, "t0-0", t._s(t.l("audio.scene4"))))]), a("text", {
      staticClass: t._$s(11, "sc", "text m-v-xl"),
      attrs: {
        _i: 11
      }
    }, [t._v(t._$s(11, "t0-0", t._s(t.l("audio.warning"))))])]), a("u-button", {
      attrs: {
        type: "primary",
        text: t.l("common.agree"),
        _i: 12
      },
      on: {
        click: t.agreeConfirm
      }
    })], 1)])], 1);
  }, i = [];
})(module, exports, __r);
