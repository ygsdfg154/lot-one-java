// webpack 模块 a228  [svc]
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
    uLine: require("uview-ui/components/u-line/u-line.vue").default,
    uLoadingIcon: require("uview-ui/components/u-loading-icon/u-loading-icon.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: e._$s(0, "sc", "u-loadmore"),
      style: e._$s(0, "s", [e.$u.addStyle(e.customStyle), {
        backgroundColor: e.bgColor,
        marginBottom: e.$u.addUnit(e.marginBottom),
        marginTop: e.$u.addUnit(e.marginTop),
        height: e.$u.addUnit(e.height)
      }]),
      attrs: {
        _i: 0
      }
    }, [e._$s(1, "i", e.line) ? n("u-line", {
      attrs: {
        length: "140rpx",
        color: e.lineColor,
        hairline: !1,
        dashed: e.dashed,
        _i: 1
      }
    }) : e._e(), n("view", {
      staticClass: e._$s(2, "sc", "u-loadmore__content"),
      class: e._$s(2, "c", "loadmore" == e.status || "nomore" == e.status ? "u-more" : ""),
      attrs: {
        _i: 2
      }
    }, [e._$s(3, "i", "loading" === e.status && e.icon) ? n("view", {
      staticClass: e._$s(3, "sc", "u-loadmore__content__icon-wrap"),
      attrs: {
        _i: 3
      }
    }, [n("u-loading-icon", {
      attrs: {
        color: e.iconColor,
        size: e.iconSize,
        mode: e.loadingIcon,
        _i: 4
      }
    })], 1) : e._e(), n("text", {
      staticClass: e._$s(5, "sc", "u-line-1"),
      class: e._$s(5, "c", ["nomore" == e.status && 1 == e.isDot ? "u-loadmore__content__dot-text" : "u-loadmore__content__text"]),
      style: e._$s(5, "s", [e.loadTextStyle]),
      attrs: {
        _i: 5
      },
      on: {
        click: e.loadMore
      }
    }, [e._v(e._$s(5, "t0-0", e._s(e.showText)))])]), e._$s(6, "i", e.line) ? n("u-line", {
      attrs: {
        length: "140rpx",
        color: e.lineColor,
        hairline: !1,
        dashed: e.dashed,
        _i: 6
      }
    }) : e._e()], 1);
  }, i = [];
})(module, exports, __r);
