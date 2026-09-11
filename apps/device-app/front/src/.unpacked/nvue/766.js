// webpack 模块 766  [nvue]
// 出现于: pagesFunc/terminal/corral/list.js
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
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uEmpty: require("uview-ui/components/u-empty/u-empty.vue").default,
    uButton: require("uview-ui/components/u-button/u-button.vue").default
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
      staticClass: ["flex-col", "justify-between"]
    }, [n("view", {
      staticClass: ["b-top", "bg-white"],
      style: {
        marginBottom: "170rpx"
      }
    }, [n("view", {
      staticClass: ["m-h-xl", "p-v-lg", "flex-row", "items-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.iconPath,
        size: "80rpx"
      }
    }), n("view", {
      staticClass: ["flex-col", "m-l-mini"]
    }, [n("u-text", {
      staticClass: ["text-title", "text", "p-l-mini", "m-b-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.selectedTerminal.terminalName || e.selectedTerminal.terminalNo))]), n("u-text", {
      staticClass: ["text", "p-l-mini", "text-desc"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("device.terminal.no")) + "\uff1a" + e._s(e.selectedTerminal.terminalNo))])])], 1), e.fenceList.length ? n("view", {}, e._l(e.fenceList, function (t, a) {
      return n("view", {
        key: t.id
      }, [n("view", {
        staticClass: ["m-h-xl", "p-v-lg", "flex-row", "items-center", "justify-between", "b-top"],
        on: {
          click: function (n) {
            e.gotoEnclosureInfo(t);
          },
          longpress: function (n) {
            e.longpressHangle(t);
          }
        }
      }, [n("view", {
        staticClass: ["flex-col"]
      }, [n("u-text", {
        staticClass: ["text-md", "text-title", "m-b-mini"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t.name))]), n("u-text", {
        staticClass: ["text", "text-desc"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(e.l("enclosure.create.time")) + "\uff1a" + e._s(t.createTime))])]), n("u-image", {
        staticClass: ["m-l"],
        style: {
          width: "15rpx",
          height: "24rpx"
        },
        attrs: {
          src: e.cdn + "/ikon/qzwl-general-right@2x.png"
        }
      })], 1)]);
    }), 0) : e._e()]), e.fenceList.length ? e._e() : n("u-empty", {
      attrs: {
        text: e.l("common.no.enclosure"),
        icon: e.cdn + "/draw/qzwl-empty.png"
      }
    }), 1 != e.userType ? n("view", {
      staticClass: ["bottom-bar"]
    }, [n("u-button", {
      attrs: {
        type: "primary",
        text: e.l("enclosure.create.fence")
      },
      on: {
        click: e.getCreateEnclosure
      }
    })], 1) : e._e()], 1)]);
  }, i = [];
})(module, exports, __r);
