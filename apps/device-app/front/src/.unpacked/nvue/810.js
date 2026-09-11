// webpack 模块 810  [nvue]
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
    uLoadingIcon: require("uview-ui/components/u-loading-icon/u-loading-icon.vue").default,
    uSwiperIndicator: require("uview-ui/components/u-swiper-indicator/u-swiper-indicator.vue").default
  }, a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-swiper"],
      style: {
        backgroundColor: e.bgColor,
        height: e.$u.addUnit(e.height),
        borderRadius: e.$u.addUnit(e.radius)
      }
    }, [e.loading ? n("view", {
      staticClass: ["u-swiper__loading"]
    }, [n("u-loading-icon", {
      attrs: {
        mode: "circle"
      }
    })], 1) : n("swiper", {
      staticClass: ["u-swiper__wrapper"],
      style: {
        height: e.$u.addUnit(e.height)
      },
      attrs: {
        circular: e.circular,
        interval: e.interval,
        duration: e.duration,
        autoplay: e.autoplay,
        current: e.current,
        currentItemId: e.currentItemId,
        previousMargin: e.$u.addUnit(e.previousMargin),
        nextMargin: e.$u.addUnit(e.nextMargin),
        acceleration: e.acceleration,
        displayMultipleItems: e.displayMultipleItems,
        easingFunction: e.easingFunction
      },
      on: {
        change: e.change
      }
    }, e._l(e.list, function (t, r) {
      return n("swiper-item", {
        key: r,
        staticClass: ["u-swiper__wrapper__item"]
      }, [n("view", {
        staticClass: ["u-swiper__wrapper__item__wrapper"],
        style: [e.itemStyle(r)]
      }, ["image" === e.getItemType(t) ? n("u-image", {
        staticClass: ["u-swiper__wrapper__item__wrapper__image"],
        style: {
          height: e.$u.addUnit(e.height),
          borderRadius: e.$u.addUnit(e.radius)
        },
        attrs: {
          src: e.getSource(t),
          mode: e.imgMode
        },
        on: {
          click: function (t) {
            e.clickHandler(r);
          }
        }
      }) : e._e(), "video" === e.getItemType(t) ? n("u-video", {
        staticClass: ["u-swiper__wrapper__item__wrapper__video"],
        style: {
          height: e.$u.addUnit(e.height)
        },
        attrs: {
          id: "video-" + r,
          enableProgressGesture: !1,
          src: e.getSource(t),
          poster: e.getPoster(t),
          title: e.showTitle && e.$u.test.object(t) && t.title ? t.title : "",
          controls: !0
        },
        on: {
          click: function (t) {
            e.clickHandler(r);
          }
        }
      }) : e._e(), e.showTitle && e.$u.test.object(t) && t.title && e.$u.test.image(e.getSource(t)) ? n("u-text", {
        staticClass: ["u-swiper__wrapper__item__wrapper__title", "u-line-1"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t.title))]) : e._e()], 1)]);
    }), 1), n("view", {
      staticClass: ["u-swiper__indicator"],
      style: [e.$u.addStyle(e.indicatorStyle)]
    }, [e._t("indicator", [e.loading || !e.indicator || e.showTitle ? e._e() : n("u-swiper-indicator", {
      attrs: {
        indicatorActiveColor: e.indicatorActiveColor,
        indicatorInactiveColor: e.indicatorInactiveColor,
        length: e.list.length,
        current: e.currentIndex,
        indicatorMode: e.indicatorMode
      }
    })])], 2)], 1);
  }, i = [];
})(module, exports, __r);
