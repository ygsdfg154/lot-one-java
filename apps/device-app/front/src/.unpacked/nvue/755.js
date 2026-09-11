// webpack 模块 755  [nvue]
// 出现于: pagesMore/message/statement.js
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
    uniNavBar: require("../../uni_modules/uni-ui/components/uni-nav-bar/uni-nav-bar.nvue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("scroll-view", {
      staticStyle: {
        flexDirection: "column"
      },
      attrs: {
        scrollY: !0,
        showScrollbar: !0,
        enableBackToTop: !0,
        bubble: "true"
      }
    }, [n("view", [n("uni-nav-bar", {
      attrs: {
        color: e.titleColor,
        title: e.headTitle,
        backgroundColor: e.primaryColor,
        border: !1,
        leftIcon: "left",
        fixed: !0,
        statusBar: !0
      },
      on: {
        clickLeft: e.gotoPages
      }
    }), n("view", {
      staticStyle: {
        flex: "1"
      },
      style: {
        height: e.sysInfo.windowHeight + "px"
      }
    }, [n("map", {
      ref: "map",
      style: {
        width: "750rpx",
        height: "100vh",
        flex: 1,
        justifyContent: "space-between"
      },
      attrs: {
        id: "map",
        scale: e.scale,
        enableBuilding: !0,
        longitude: e.longitude,
        latitude: e.latitude,
        markers: e.markers
      }
    })], 1)], 1)]);
  }, i = [];
})(module, exports, __r);
