// webpack 模块 272  [nvue]
// 出现于: pages/msg/index.js, pagesFunc/terminal/list/index.js, pagesFunc/terminal/remote-setup/list.js, pagesMore/message/table.js, pagesPay/list/indent-device.js, pagesPay/list/indent.js
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
    uLine: require("uview-ui/components/u-line/u-line.vue").default,
    uLoadingIcon: require("uview-ui/components/u-loading-icon/u-loading-icon.vue").default
  }, a = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["u-loadmore"],
      style: [e.$u.addStyle(e.customStyle), {
        backgroundColor: e.bgColor,
        marginBottom: e.$u.addUnit(e.marginBottom),
        marginTop: e.$u.addUnit(e.marginTop),
        height: e.$u.addUnit(e.height)
      }]
    }, [e.line ? n("u-line", {
      attrs: {
        length: "140rpx",
        color: e.lineColor,
        hairline: !1,
        dashed: e.dashed
      }
    }) : e._e(), n("view", {
      staticClass: ["u-loadmore__content"],
      class: "loadmore" == e.status || "nomore" == e.status ? "u-more" : ""
    }, ["loading" === e.status && e.icon ? n("view", {
      staticClass: ["u-loadmore__content__icon-wrap"]
    }, [n("u-loading-icon", {
      attrs: {
        color: e.iconColor,
        size: e.iconSize,
        mode: e.loadingIcon
      }
    })], 1) : e._e(), n("u-text", {
      staticClass: ["u-line-1"],
      class: ["nomore" == e.status && 1 == e.isDot ? "u-loadmore__content__dot-text" : "u-loadmore__content__text"],
      style: [e.loadTextStyle],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: e.loadMore
      }
    }, [e._v(e._s(e.showText))])]), e.line ? n("u-line", {
      attrs: {
        length: "140rpx",
        color: e.lineColor,
        hairline: !1,
        dashed: e.dashed
      }
    }) : e._e()], 1);
  }, i = [];
})(module, exports, __r);
