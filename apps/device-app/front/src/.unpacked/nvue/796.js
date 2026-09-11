// webpack 模块 796  [nvue]
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
    uPopup: require("uview-ui/components/u-popup/u-popup.vue").default,
    uSwiper: require("uview-ui/components/u-swiper/u-swiper.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, a = function () {
    var e = this.$createElement, t = this._self._c || e;
    return t("view", [t("u-popup", {
      attrs: {
        mode: "center",
        bgColor: "transparent",
        closeable: !1,
        show: this.advertisingState
      }
    }, [t("view", {
      staticClass: ["flex-col", "justify-center", "items-center"]
    }, [t("view", {
      staticStyle: {
        width: "710rpx",
        height: "800rpx"
      }
    }, [t("u-swiper", {
      staticStyle: {
        width: "710rpx"
      },
      attrs: {
        list: this.advertisingList,
        indicator: !0,
        indicatorMode: "line",
        circular: !0,
        height: "800rpx",
        radius: "10"
      },
      on: {
        click: this.clickAdvertising
      }
    })], 1), t("view", {
      staticClass: ["m-t-lg"],
      on: {
        click: this.closeAdvertising
      }
    }, [t("u-icon", {
      attrs: {
        name: "close-circle",
        size: "56rpx",
        color: "#fff"
      }
    })], 1)])])], 1);
  }, i = [];
})(module, exports, __r);
