// webpack 模块 beca  [view]
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
    uLoadingIcon: require("@/.unpacked/view/8a98.js").default,
    uIcon: require("@/.unpacked/view/a9fb.js").default
  }, i = function () {
    var t = this, e = t.$createElement, a = t._self._c || e;
    return a("v-uni-button", {
      staticClass: t._$g(0, "sc"),
      class: t._$g(0, "c"),
      style: t._$g(0, "s"),
      attrs: {
        "hover-start-time": t._$g(0, "a-hover-start-time"),
        "hover-stay-time": t._$g(0, "a-hover-stay-time"),
        "form-type": t._$g(0, "a-form-type"),
        "open-type": t._$g(0, "a-open-type"),
        "app-parameter": t._$g(0, "a-app-parameter"),
        "hover-stop-propagation": t._$g(0, "a-hover-stop-propagation"),
        "send-message-title": t._$g(0, "a-send-message-title"),
        "send-message-path": t._$g(0, "a-send-message-path"),
        lang: t._$g(0, "a-lang"),
        "data-name": t._$g(0, "a-data-name"),
        "session-from": t._$g(0, "a-session-from"),
        "send-message-img": t._$g(0, "a-send-message-img"),
        "show-message-card": t._$g(0, "a-show-message-card"),
        "hover-class": t._$g(0, "a-hover-class"),
        _i: 0
      },
      on: {
        getphonenumber: function (e) {
          return t.$handleViewEvent(e);
        },
        getuserinfo: function (e) {
          return t.$handleViewEvent(e);
        },
        error: function (e) {
          return t.$handleViewEvent(e);
        },
        opensetting: function (e) {
          return t.$handleViewEvent(e);
        },
        launchapp: function (e) {
          return t.$handleViewEvent(e);
        },
        click: function (e) {
          return t.$handleViewEvent(e);
        }
      }
    }, [t._$g(1, "i") ? [a("u-loading-icon", {
      attrs: {
        _i: 2
      }
    }), a("v-uni-text", {
      staticClass: t._$g(3, "sc"),
      style: t._$g(3, "s"),
      attrs: {
        _i: 3
      }
    }, [t._v(t._$g(3, "t0-0"))])] : [t._$g(5, "i") ? a("u-icon", {
      attrs: {
        _i: 5
      }
    }) : t._e(), t._t("default", [a("v-uni-text", {
      staticClass: t._$g(7, "sc"),
      style: t._$g(7, "s"),
      attrs: {
        _i: 7
      }
    }, [t._v(t._$g(7, "t0-0"))])], {
      _i: 6
    })]], 2);
  }, r = [];
})(module, exports, __r);
