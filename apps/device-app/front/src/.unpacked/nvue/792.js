// webpack 模块 792  [nvue]
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
    uNoticeBar: require("uview-ui/components/u-notice-bar/u-notice-bar.vue").default
  }, a = function () {
    var e = this.$createElement, t = this._self._c || e;
    return t("view", [this.noticeData ? t("u-notice-bar", {
      staticStyle: {
        marginTop: "15rpx",
        borderRadius: "20rpx"
      },
      attrs: {
        text: this.noticeData.title,
        mode: "closable",
        speed: "70",
        bgColor: "rgba(236, 246, 255, 0.7)",
        color: "#6081C7"
      },
      on: {
        close: this.closeNotice,
        click: this.clickNotice
      }
    }) : this._e()], 1);
  }, i = [];
})(module, exports, __r);
