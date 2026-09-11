// webpack 模块 772  [nvue]
// 出现于: pagesFunc/terminal/remote-setup/list.js
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
    uEmpty: require("uview-ui/components/u-empty/u-empty.vue").default,
    uLoadmore: require("uview-ui/components/u-loadmore/u-loadmore.vue").default
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
      staticClass: ["p-b-xl"]
    }, [t.handleList.length ? o("view", {}, t._l(t.handleList, function (e, r) {
      return o("view", {
        key: e.Id,
        staticClass: ["flex-col", "br-md", "p-lg", "m-h-xl", "m-t", "bg-white"]
      }, [o("view", {
        staticClass: ["justify-between"]
      }, [o("u-text", {
        staticClass: ["text"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(e.paramName) + " (" + t._s(t.selectedTerminal.terminalNo) + ")")])]), o("u-text", {
        staticClass: ["text-grey", "text", "m-v-mini"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(t.l("common.send-state")) + "\uff1a" + t._s(t.command[e.commandState]))]), o("u-text", {
        staticClass: ["text-grey", "text"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(t.l("common.send.time")) + "\uff1a" + t._s(e.sendTime))]), e.resultContent ? o("view", {
        staticClass: ["flex-row"]
      }, [o("u-text", {
        staticClass: ["text-grey", "text"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(t.l("common.instruc.content")) + "\uff1a")]), o("u-text", {
        staticClass: ["text-grey", "text"],
        staticStyle: {
          width: "450rpx",
          wordBreak: "break-all"
        },
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [t._v(t._s(e.resultContent.trim().length > 2 ? e.resultContent : "-"))])]) : t._e()]);
    }), 0) : t._e(), t.handleList.length ? t._e() : o("u-empty", {
      attrs: {
        text: t.l("common.no.more"),
        icon: t.cdn + "/draw/qzwl-empty.png"
      }
    }), t.handleList.length ? o("u-loadmore", {
      attrs: {
        status: t.status,
        line: !0
      }
    }) : t._e()], 1)]);
  }, n = [];
})(module, exports, __r);
