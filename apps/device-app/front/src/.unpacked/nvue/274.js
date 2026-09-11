// webpack 模块 274  [nvue]
// 出现于: pagesCore/account/account-safety.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js, pagesCore/login/logout.js, pagesCore/login/register.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return r;
  }), n.d(t, "a", function () {}));
  var a = function () {
    var e = this, t = e.$createElement;
    return (e._self._c || t)("uvImage", {
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
        customStyle: e.customStyle
      },
      on: {
        click: function (t) {
          e.$emit("click");
        },
        error: function (t) {
          e.$emit("error");
        },
        load: function (t) {
          e.$emit("load");
        }
      },
      scopedSlots: e._u([{
        key: "loading",
        fn: function () {
          return [e._t("loading")];
        },
        proxy: !0
      }, {
        key: "error",
        fn: function () {
          return [e._t("error")];
        },
        proxy: !0
      }], null, !0)
    });
  }, r = [];
})(module, exports, __r);
