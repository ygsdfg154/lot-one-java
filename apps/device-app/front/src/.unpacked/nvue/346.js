// webpack 模块 346  [nvue]
// 出现于: pagesFunc/terminal/list/index.js, pagesMore/message/statement.js, pagesPay/value-added/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (n.d(t, "b", function () {
    return i;
  }), n.d(t, "c", function () {
    return r;
  }), n.d(t, "a", function () {
    return a;
  }));
  var a = {
    uniIcons: require("../../uni_modules/uni-ui/components/uni-icons/uni-icons.nvue").default
  }, i = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: ["uni-navbar"],
      class: {
        "uni-dark": e.dark,
        "uni-nvue-fixed": e.fixed
      }
    }, [n("view", {
      staticClass: ["uni-navbar__content"],
      class: {
        "uni-navbar--fixed": e.fixed,
        "uni-navbar--shadow": e.shadow,
        "uni-navbar--border": e.border
      },
      style: {
        "background-color": e.themeBgColor
      }
    }, [e.statusBar ? n("status-bar") : e._e(), n("view", {
      staticClass: ["uni-navbar__header"],
      style: {
        color: e.themeColor,
        backgroundColor: e.themeBgColor,
        height: e.navbarHeight
      }
    }, [n("view", {
      staticClass: ["uni-navbar__header-btns", "uni-navbar__header-btns-left"],
      style: {
        width: e.leftIconWidth
      },
      on: {
        click: e.onClickLeft
      }
    }, [e._t("left", [e.leftIcon.length > 0 ? n("view", {
      staticClass: ["uni-navbar__content_view"]
    }, [n("uni-icons", {
      attrs: {
        color: e.themeColor,
        type: e.leftIcon,
        size: "25"
      }
    })], 1) : e._e(), e.leftText.length ? n("view", {
      staticClass: ["uni-navbar-btn-text"],
      class: {
        "uni-navbar-btn-icon-left": !e.leftIcon.length > 0
      }
    }, [n("u-text", {
      style: {
        color: e.themeColor,
        fontSize: "12px"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.leftText))])]) : e._e()])], 2), n("view", {
      staticClass: ["uni-navbar__header-container"],
      on: {
        click: e.onClickTitle
      }
    }, [e._t("default", [e.title.length > 0 ? n("view", {
      staticClass: ["uni-navbar__header-container-inner"]
    }, [n("u-text", {
      staticClass: ["uni-nav-bar-text", "uni-ellipsis-1"],
      style: {
        color: e.themeColor
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.title))])]) : e._e()])], 2), n("view", {
      staticClass: ["uni-navbar__header-btns", "uni-navbar__header-btns-right"],
      style: {
        width: e.rightIconWidth
      },
      on: {
        click: e.onClickRight
      }
    }, [e._t("right", [e.rightIcon.length ? n("view", [n("uni-icons", {
      attrs: {
        color: e.themeColor,
        type: e.rightIcon,
        size: "25"
      }
    })], 1) : e._e(), e.rightText.length && !e.rightIcon.length ? n("view", {
      staticClass: ["uni-navbar-btn-text"]
    }, [n("u-text", {
      staticClass: ["uni-nav-bar-right-text"],
      style: {
        color: e.themeColor
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.rightText))])]) : e._e()])], 2)])], 1)]);
  }, r = [];
})(module, exports, __r);
