// webpack 模块 759  [nvue]
// 出现于: pagesPay/list/indent-device.js
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
    uLoadmore: require("uview-ui/components/u-loadmore/u-loadmore.vue").default,
    uEmpty: require("uview-ui/components/u-empty/u-empty.vue").default
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
    }, [n("view", {
      staticClass: ["bg-page", "flex-col", "p-h-xl"]
    }, [n("view", {
      staticClass: ["flex-col"]
    }, e._l(e.orderList, function (t, a) {
      return n("view", {
        key: a,
        staticClass: ["flex-col", "bg-white", "m-t-xl", "p-xl", "br-md"]
      }, [n("view", {
        staticClass: ["flex-row", "justify-between", "p-b-sm", "b-bottom"]
      }, [n("u-text", {
        staticClass: ["text", "text-gray"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(e.l("mine.pay.order")) + "\uff1a" + e._s(t.orderNo))]), n("u-text", {
        staticClass: ["text", "text-primary"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t.orderStatus))])]), n("view", {
        staticClass: ["flex-col"]
      }, [n("view", {
        staticClass: ["flex-col"]
      }, [n("view", {
        staticClass: ["flex-row", "justify-between", "p-b-sm", "p-t-lg", "b-bottom"]
      }, [n("u-text", {
        staticClass: ["text", "text-gray"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t.description))]), n("view", {
        staticClass: ["flex-row"]
      }, [n("u-text", {
        staticClass: ["text"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v("\xa5" + e._s(Math.floor(t.totalFee / 100)) + ".")]), n("u-text", {
        staticClass: ["text"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t.totalFee % 100))])])])]), n("view", {
        staticClass: ["flex-row", "justify-end", "p-t-sm", "items-center"]
      }, [t.payTime ? n("u-text", {
        staticClass: ["text", "text-gray"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(e.l("mine-pay.pay-time")) + "\uff1a" + e._s(t.payTime))]) : n("u-text", {
        staticClass: ["text", "text-gray"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(e.l("mine-pay.create-time")) + "\uff1a" + e._s(t.createTime))])])])]);
    }), 0), e.orderList.length ? n("view", {
      staticClass: ["m-t", "m-b-lg"]
    }, [n("u-loadmore", {
      attrs: {
        line: !0,
        status: e.status,
        loadmoreText: e.l("common.load.more"),
        loadingText: e.l("common.loading"),
        nomoreText: e.l("common.no.more")
      }
    })], 1) : e._e(), e.orderList.length ? e._e() : n("u-empty", {
      attrs: {
        text: e.l("mine.pay.no-order"),
        icon: e.cdn + "/draw/qzwl-empty.png"
      }
    })], 1)]);
  }, i = [];
})(module, exports, __r);
