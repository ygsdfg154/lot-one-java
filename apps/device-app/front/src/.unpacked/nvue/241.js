// webpack 模块 241  [nvue]
// 出现于: pages/ability/index.js, pages/msg/index.js, pagesFunc/terminal/corral/list.js, pagesFunc/terminal/list/index.js, pagesFunc/terminal/remote-setup/list.js, pagesMore/message/table.js ...
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
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return e.show ? n("view", {
      staticClass: ["u-empty"],
      style: [e.emptyStyle]
    }, [e.isSrc ? n("u-image", {
      style: {
        width: e.$u.addUnit(e.width),
        height: e.$u.addUnit(e.height)
      },
      attrs: {
        src: e.icon,
        mode: "widthFix"
      }
    }) : n("u-icon", {
      attrs: {
        name: "message" === e.mode ? "chat" : "empty-" + e.mode,
        size: e.iconSize,
        color: e.iconColor,
        marginTop: "14"
      }
    }), n("u-text", {
      staticClass: ["u-empty__text"],
      style: [e.textStyle],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.text ? e.text : e.icons[e.mode]))]), e.$slots.default || e.$slots.$default ? n("view", {
      staticClass: ["u-empty__wrap"]
    }, [e._t("default")], 2) : e._e()], 1) : e._e();
  }, i = [];
})(module, exports, __r);
