// webpack 模块 36c1  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return r;
  }), n.d(t, "a", function () {}));
  var a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("uvImage", {
      attrs: {
        src: e.src,
        mode: e.mode,
        width: e.width,
        height: e.height,
        shape: e.shape,
        radius: e.radius,
        lazyLoad: e.lazyLoad,
        showMenuByLongpress: e.showMenuByLongpress,
        loadingIcon: e.loadingIcon,
        errorIcon: e.errorIcon,
        showLoading: e.showLoading,
        showError: e.showError,
        fade: e.fade,
        webp: e.webp,
        duration: e.duration,
        bgColor: e.bgColor,
        customStyle: e.customStyle,
        _i: 0
      },
      on: {
        click: function (t) {
          return e.$emit("click");
        },
        error: function (t) {
          return e.$emit("error");
        },
        load: function (t) {
          return e.$emit("load");
        }
      },
      scopedSlots: e._u([{
        key: "loading",
        fn: function (t, n, a) {
          return [e._t("loading", null, {
            _i: "2-" + a
          })];
        }
      }, {
        key: "error",
        fn: function (t, n, a) {
          return [e._t("error", null, {
            _i: "4-" + a
          })];
        }
      }], null, !0)
    });
  }, r = [];
})(module, exports, __r);
