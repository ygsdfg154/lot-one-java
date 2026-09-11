// webpack 模块 418  [nvue]
// 出现于: pages/my/my.js, pagesPay/value-added/index.js
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
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    "u-Text": require("uview-ui/components/u--text/u--text.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-avatar"],
      class: ["u-avatar--" + e.shape],
      style: [{
        backgroundColor: e.text || e.icon ? e.randomBgColor ? e.colors["" !== e.colorIndex ? e.colorIndex : e.$u.random(0, 19)] : e.bgColor : "transparent",
        width: e.$u.addUnit(e.size),
        height: e.$u.addUnit(e.size)
      }, e.$u.addStyle(e.customStyle)],
      on: {
        click: e.clickHandler
      }
    }, [e._t("default", [e.mpAvatar && e.allowMp ? void 0 : e.icon ? n("u-icon", {
      attrs: {
        name: e.icon,
        size: e.fontSize,
        color: e.color
      }
    }) : e.text ? n("u--text", {
      attrs: {
        text: e.text,
        size: e.fontSize,
        color: e.color,
        align: "center",
        customStyle: "justify-content: center"
      }
    }) : n("u-image", {
      staticClass: ["u-avatar__image"],
      class: ["u-avatar__image--" + e.shape],
      style: [{
        width: e.$u.addUnit(e.size),
        height: e.$u.addUnit(e.size)
      }],
      attrs: {
        src: e.avatarUrl || e.defaultUrl,
        mode: e.mode
      },
      on: {
        error: e.errorHandler
      }
    })])], 2);
  }, i = [];
})(module, exports, __r);
