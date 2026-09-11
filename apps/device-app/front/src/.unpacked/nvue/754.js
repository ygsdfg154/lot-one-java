// webpack 模块 754  [nvue]
// 出现于: pagesMore/message/table.js
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
      staticClass: ["p-b-xl", "bg-page"]
    }, [o("view", {
      staticClass: ["list", "p-h-lg"]
    }, t._l(t.list, function (e, r) {
      return o("view", {
        key: r,
        staticClass: ["list-item"],
        on: {
          click: function (o) {
            t.gotoMsgDetail(e.Id);
          }
        }
      }, [o("u-icon", {
        attrs: {
          name: t.cdn + "/ikon/qzwl-msg-notice@2x.png",
          size: "48rpx"
        }
      }), o("view", {
        staticClass: ["list-item-content"]
      }, [o("view", {
        staticClass: ["list-item-header", "flex-row", "justify-between"]
      }, [o("u-text", {
        staticClass: ["text-md", "text-title"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(e.alarmTypeName))]), o("u-text", {
        staticClass: ["text-sm", "text-desc"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(e.beginTime))])]), o("u-text", {
        staticClass: ["list-item-desc", "text", "text-desc"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(t.l("info.terminal.name")) + "\uff1a" + t._s(e.terminalName || e.terminalNo))])])], 1);
    }), 0), t.list.length ? o("u-loadmore", {
      attrs: {
        status: t.status,
        line: !0,
        loadmoreText: t.l("common.load.more"),
        loadingText: t.l("common.loading"),
        nomoreText: t.l("common.no.more")
      }
    }) : t._e(), t.list.length ? t._e() : o("u-empty", {
      attrs: {
        text: t.l("common.no.more"),
        icon: t.cdn + "/draw/qzwl-empty.png"
      }
    })], 1)]);
  }, n = [];
})(module, exports, __r);
