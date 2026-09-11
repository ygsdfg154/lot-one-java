// webpack 模块 00a1  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return r;
  }), n.d(t, "c", function () {
    return i;
  }), n.d(t, "a", function () {
    return a;
  }));
  var a = {
    uLoadingIcon: require("uview-ui/components/u-loading-icon/u-loading-icon.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("button", {
      staticClass: e._$s(0, "sc", "u-button u-reset-button"),
      class: e._$s(0, "c", e.bemClass),
      style: e._$s(0, "s", [e.baseColor, e.$u.addStyle(e.customStyle)]),
      attrs: {
        "hover-start-time": e._$s(0, "a-hover-start-time", Number(e.hoverStartTime)),
        "hover-stay-time": e._$s(0, "a-hover-stay-time", Number(e.hoverStayTime)),
        "form-type": e._$s(0, "a-form-type", e.formType),
        "open-type": e._$s(0, "a-open-type", e.openType),
        "app-parameter": e._$s(0, "a-app-parameter", e.appParameter),
        "hover-stop-propagation": e._$s(0, "a-hover-stop-propagation", e.hoverStopPropagation),
        "send-message-title": e._$s(0, "a-send-message-title", e.sendMessageTitle),
        "send-message-path": e._$s(0, "a-send-message-path", e.sendMessagePath),
        lang: e._$s(0, "a-lang", e.lang),
        "data-name": e._$s(0, "a-data-name", e.dataName),
        "session-from": e._$s(0, "a-session-from", e.sessionFrom),
        "send-message-img": e._$s(0, "a-send-message-img", e.sendMessageImg),
        "show-message-card": e._$s(0, "a-show-message-card", e.showMessageCard),
        "hover-class": e._$s(0, "a-hover-class", e.disabled || e.loading ? "" : "u-button--active"),
        _i: 0
      },
      on: {
        getphonenumber: e.getphonenumber,
        getuserinfo: e.getuserinfo,
        error: e.error,
        opensetting: e.opensetting,
        launchapp: e.launchapp,
        click: e.clickHandler
      }
    }, [e._$s(1, "i", e.loading) ? [n("u-loading-icon", {
      attrs: {
        mode: e.loadingMode,
        size: 1.15 * e.loadingSize,
        color: e.loadingColor,
        _i: 2
      }
    }), n("text", {
      staticClass: e._$s(3, "sc", "u-button__loading-text"),
      style: e._$s(3, "s", [{
        fontSize: e.textSize + "px"
      }]),
      attrs: {
        _i: 3
      }
    }, [e._v(e._$s(3, "t0-0", e._s(e.loadingText || e.text)))])] : [e._$s(5, "i", e.icon) ? n("u-icon", {
      attrs: {
        name: e.icon,
        color: e.iconColorCom,
        size: 1.35 * e.textSize,
        customStyle: {
          marginRight: "2px"
        },
        _i: 5
      }
    }) : e._e(), e._t("default", [n("text", {
      staticClass: e._$s(7, "sc", "u-button__text"),
      style: e._$s(7, "s", [{
        fontSize: e.textSize + "px"
      }]),
      attrs: {
        _i: 7
      }
    }, [e._v(e._$s(7, "t0-0", e._s(e.text)))])], {
      _i: 6
    })]], 2);
  }, i = [];
})(module, exports, __r);
