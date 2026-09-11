// webpack 模块 809  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return a;
  }), n.d(t, "c", function () {
    return i;
  }), n.d(t, "a", function () {
    return r;
  }));
  var r = {
    uColumnNotice: require("uview-ui/components/u-column-notice/u-column-notice.vue").default,
    uRowNotice: require("uview-ui/components/u-row-notice/u-row-notice.vue").default
  }, a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return e.show ? n("view", {
      staticClass: ["u-notice-bar"],
      style: [{
        backgroundColor: e.bgColor
      }, e.$u.addStyle(e.customStyle)]
    }, ["column" === e.direction || "row" === e.direction && e.step ? [n("u-column-notice", {
      attrs: {
        color: e.color,
        bgColor: e.bgColor,
        text: e.text,
        mode: e.mode,
        step: e.step,
        icon: e.icon,
        disableTouch: e.disableTouch,
        fontSize: e.fontSize,
        duration: e.duration
      },
      on: {
        close: e.close,
        click: e.click
      }
    })] : [n("u-row-notice", {
      attrs: {
        color: e.color,
        bgColor: e.bgColor,
        text: e.text,
        mode: e.mode,
        fontSize: e.fontSize,
        speed: e.speed,
        url: e.url,
        linkType: e.linkType,
        icon: e.icon
      },
      on: {
        close: e.close,
        click: e.click
      }
    })]], 2) : e._e();
  }, i = [];
})(module, exports, __r);
