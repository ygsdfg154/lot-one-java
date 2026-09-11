// webpack 模块 aac8  [svc]
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
    uniIcons: require("../../uni_modules/uni-ui/components/uni-icons/uni-icons.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", {
      staticClass: e._$s(0, "sc", "uni-navbar"),
      class: e._$s(0, "c", {
        "uni-dark": e.dark,
        "uni-nvue-fixed": e.fixed
      }),
      attrs: {
        _i: 0
      }
    }, [n("view", {
      staticClass: e._$s(1, "sc", "uni-navbar__content"),
      class: e._$s(1, "c", {
        "uni-navbar--fixed": e.fixed,
        "uni-navbar--shadow": e.shadow,
        "uni-navbar--border": e.border
      }),
      style: e._$s(1, "s", {
        "background-color": e.themeBgColor
      }),
      attrs: {
        _i: 1
      }
    }, [e._$s(2, "i", e.statusBar) ? n("status-bar", {
      attrs: {
        _i: 2
      }
    }) : e._e(), n("view", {
      staticClass: e._$s(3, "sc", "uni-navbar__header"),
      style: e._$s(3, "s", {
        color: e.themeColor,
        backgroundColor: e.themeBgColor,
        height: e.navbarHeight
      }),
      attrs: {
        _i: 3
      }
    }, [n("view", {
      staticClass: e._$s(4, "sc", "uni-navbar__header-btns uni-navbar__header-btns-left"),
      style: e._$s(4, "s", {
        width: e.leftIconWidth
      }),
      attrs: {
        _i: 4
      },
      on: {
        click: e.onClickLeft
      }
    }, [e._t("left", [e._$s(6, "i", e.leftIcon.length > 0) ? n("view", {
      staticClass: e._$s(6, "sc", "uni-navbar__content_view"),
      attrs: {
        _i: 6
      }
    }, [n("uni-icons", {
      attrs: {
        color: e.themeColor,
        type: e.leftIcon,
        size: "25",
        _i: 7
      }
    })], 1) : e._e(), e._$s(8, "i", e.leftText.length) ? n("view", {
      staticClass: e._$s(8, "sc", "uni-navbar-btn-text"),
      class: e._$s(8, "c", {
        "uni-navbar-btn-icon-left": !e.leftIcon.length > 0
      }),
      attrs: {
        _i: 8
      }
    }, [n("text", {
      style: e._$s(9, "s", {
        color: e.themeColor,
        fontSize: "12px"
      }),
      attrs: {
        _i: 9
      }
    }, [e._v(e._$s(9, "t0-0", e._s(e.leftText)))])]) : e._e()], {
      _i: 5
    })], 2), n("view", {
      staticClass: e._$s(10, "sc", "uni-navbar__header-container "),
      attrs: {
        _i: 10
      },
      on: {
        click: e.onClickTitle
      }
    }, [e._t("default", [e._$s(12, "i", e.title.length > 0) ? n("view", {
      staticClass: e._$s(12, "sc", "uni-navbar__header-container-inner"),
      attrs: {
        _i: 12
      }
    }, [n("text", {
      staticClass: e._$s(13, "sc", "uni-nav-bar-text uni-ellipsis-1"),
      style: e._$s(13, "s", {
        color: e.themeColor
      }),
      attrs: {
        _i: 13
      }
    }, [e._v(e._$s(13, "t0-0", e._s(e.title)))])]) : e._e()], {
      _i: 11
    })], 2), n("view", {
      staticClass: e._$s(14, "sc", "uni-navbar__header-btns uni-navbar__header-btns-right"),
      style: e._$s(14, "s", {
        width: e.rightIconWidth
      }),
      attrs: {
        _i: 14
      },
      on: {
        click: e.onClickRight
      }
    }, [e._t("right", [e._$s(16, "i", e.rightIcon.length) ? n("view", {
      attrs: {
        _i: 16
      }
    }, [n("uni-icons", {
      attrs: {
        color: e.themeColor,
        type: e.rightIcon,
        size: "25",
        _i: 17
      }
    })], 1) : e._e(), e._$s(18, "i", e.rightText.length && !e.rightIcon.length) ? n("view", {
      staticClass: e._$s(18, "sc", "uni-navbar-btn-text"),
      attrs: {
        _i: 18
      }
    }, [n("text", {
      staticClass: e._$s(19, "sc", "uni-nav-bar-right-text"),
      style: e._$s(19, "s", {
        color: e.themeColor
      }),
      attrs: {
        _i: 19
      }
    }, [e._v(e._$s(19, "t0-0", e._s(e.rightText)))])]) : e._e()], {
      _i: 15
    })], 2)])], 1), e._$s(20, "i", e.fixed) ? n("view", {
      staticClass: e._$s(20, "sc", "uni-navbar__placeholder"),
      attrs: {
        _i: 20
      }
    }, [e._$s(21, "i", e.statusBar) ? n("status-bar", {
      attrs: {
        _i: 21
      }
    }) : e._e(), n("view", {
      staticClass: e._$s(22, "sc", "uni-navbar__placeholder-view"),
      style: e._$s(22, "s", {
        height: e.navbarHeight
      }),
      attrs: {
        _i: 22
      }
    })], 1) : e._e()]);
  }, i = [];
})(module, exports, __r);
