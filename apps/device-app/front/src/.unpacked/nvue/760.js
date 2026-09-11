// webpack 模块 760  [nvue]
// 出现于: pagesPay/list/indent.js
const __r = require('./__runtime.js').wrap();
(function (t, e, o) {
  "use strict";
  (o.d(e, "b", function () {
    return i;
  }), o.d(e, "c", function () {
    return n;
  }), o.d(e, "a", function () {
    return r;
  }));
  var r = {
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uLoadmore: require("uview-ui/components/u-loadmore/u-loadmore.vue").default,
    uEmpty: require("uview-ui/components/u-empty/u-empty.vue").default
  }, i = function () {
    var t = this, e = t.$createElement, o = t._self._c || e;
    return o("scroll-view", {
      staticStyle: {
        flexDirection: "column"
      },
      attrs: {
        scrollY: !0,
        showScrollbar: !0,
        enableBackToTop: !0,
        bubble: "true"
      }
    }, [o("view", {
      staticClass: ["bg-page", "flex-col", "p-h-xl"]
    }, [o("view", {
      staticClass: ["flex-col"]
    }, t._l(t.orderList, function (e, r) {
      return o("view", {
        key: r,
        staticClass: ["flex-col", "bg-white", "m-t-xl", "p-xl", "br-md"],
        on: {
          click: function (o) {
            t.goDetail(e);
          }
        }
      }, [o("view", {
        staticClass: ["flex-row", "justify-between", "p-b-sm", "b-bottom"]
      }, [o("u-text", {
        staticClass: ["text", "text-gray"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(t.l("mine.pay.order")) + "\uff1a" + t._s(e.orderNo))]), o("u-text", {
        staticClass: ["text", "text-primary"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(e.orderStatus))])]), o("view", {
        staticClass: ["flex-col"]
      }, [o("view", {
        staticClass: ["flex-col"]
      }, [o("view", {
        staticClass: ["flex-row", "justify-between", "p-b-sm", "p-t-lg", "b-bottom"]
      }, [o("u-text", {
        staticClass: ["text", "text-gray"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(e.description))]), o("view", {
        staticClass: ["flex-row"]
      }, [o("u-text", {
        staticClass: ["text"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v("\xa5" + t._s(Math.floor(e.totalFee / 100)) + ".")]), o("u-text", {
        staticClass: ["text"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(e.totalFee % 100))])])])]), o("view", {
        staticClass: ["flex-row", "justify-end", "p-t-sm", "items-center"]
      }, [e.payTime ? o("u-text", {
        staticClass: ["text", "text-gray"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(t.l("mine-pay.pay-time")) + "\uff1a" + t._s(e.payTime))]) : o("u-text", {
        staticClass: ["text", "text-gray"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(t.l("mine-pay.create-time")) + "\uff1a" + t._s(e.createTime))]), o("view", {
        staticClass: ["text", "text-desc", "flex", "justify-center", "m-l-mini"]
      }, [o("u-icon", {
        attrs: {
          name: "arrow-right",
          size: "14"
        }
      })], 1)])])]);
    }), 0), t.orderList.length ? o("view", {
      staticClass: ["m-t"],
      staticStyle: {
        marginBottom: "42rpx"
      },
      on: {
        click: t.contactService
      }
    }, [o("u-loadmore", {
      attrs: {
        serviceShow: !0,
        line: !0,
        status: t.status,
        nomoreText: "\u5bf9\u8ba2\u5355\u6709\u4efb\u4f55\u7591\u95ee\uff0c\u8bf7\u8054\u7cfb\u5ba2\u670d"
      }
    })], 1) : t._e(), t.orderList.length ? t._e() : o("u-empty", {
      attrs: {
        text: t.l("mine.pay.no-order"),
        icon: t.cdn + "/draw/qzwl-empty.png"
      }
    })], 1)]);
  }, n = [];
})(module, exports, __r);
