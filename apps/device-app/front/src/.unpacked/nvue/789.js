// webpack 模块 789  [nvue]
// 出现于: pagesCore/login/index.js
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
    "u-Input": require("uview-ui/components/u--input/u--input.vue").default,
    uIcon: require("uview-ui/components/u-icon/u-icon.vue").default,
    uButton: require("uview-ui/components/u-button/u-button.vue").default,
    uPopup: require("uview-ui/components/u-popup/u-popup.vue").default
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
      staticClass: ["page"]
    }, [n("view", {
      staticClass: ["login-page"]
    }), n("view", {
      staticClass: ["login-from"]
    }, [n("view", {
      staticStyle: {
        height: "96rpx"
      }
    }, [n("u--input", {
      staticStyle: {
        border: "2rpx solid #c6d5f6",
        height: "96rpx"
      },
      attrs: {
        shape: "circle",
        placeholder: e.l("common.account")
      },
      model: {
        value: e.username,
        callback: function (t) {
          e.username = t;
        },
        expression: "username"
      }
    }, [n("u-icon", {
      style: {
        marginRight: "12rpx"
      },
      attrs: {
        slot: "prefix",
        name: e.cdn + "/ikon/qzwl-username.png",
        size: "48rpx",
        stop: !0
      },
      slot: "prefix"
    })], 1)], 1), n("view", {
      staticClass: ["m-t-xl"],
      staticStyle: {
        height: "96rpx"
      }
    }, [n("u--input", {
      staticStyle: {
        border: "2rpx solid #c6d5f6",
        height: "96rpx"
      },
      attrs: {
        password: e.pwdState,
        shape: "circle",
        placeholder: e.l("common.password")
      },
      model: {
        value: e.password,
        callback: function (t) {
          e.password = t;
        },
        expression: "password"
      }
    }, [n("u-icon", {
      style: {
        marginRight: "12rpx"
      },
      attrs: {
        slot: "prefix",
        name: e.cdn + "/ikon/qzwl-password.png",
        size: "48rpx",
        stop: !0
      },
      slot: "prefix"
    })], 1)], 1), n("view", {
      staticClass: ["m-t-xl", "flex-row", "justify-between"]
    }, [n("view", {
      staticClass: ["flex-row", "items-center"],
      on: {
        click: function (t) {
          e.setRemPassword(!e.remPassword);
        }
      }
    }, [e.remPassword ? n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-sleed.png",
        size: "32rpx"
      }
    }) : n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-no-sle.png",
        size: "32rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "m-l-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u8bb0\u4f4f\u5bc6\u7801")])], 1), n("u-text", {
      staticClass: ["text", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: e.gotoForgotPass
      }
    }, [e._v(e._s(e.l("common.forget.password")))])]), n("view", {
      staticClass: ["flex-wrap", "items-center"],
      staticStyle: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "72rpx"
      }
    }, [e.agreeSigninAgreement ? n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-sleed.png",
        size: "32rpx",
        stop: !0
      },
      on: {
        click: function (t) {
          e.setAgreeSigninAgreement(!e.agreeSigninAgreement);
        }
      }
    }) : n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-no-sle.png",
        size: "32rpx",
        stop: !0
      },
      on: {
        click: function (t) {
          e.setAgreeSigninAgreement(!e.agreeSigninAgreement);
        }
      }
    }), n("u-text", {
      staticClass: ["text-sm", "m-l"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.agree.text2")))]), n("u-text", {
      staticClass: ["text-sm", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: function (t) {
          e.gotoPage("/pagesMore/my/setups/service_terms");
        }
      }
    }, [e._v(e._s(e.l("common.agreement")))]), n("u-text", {
      staticClass: ["text-sm"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.and")))]), n("u-text", {
      staticClass: ["text-sm", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: function (t) {
          e.gotoPage("/pagesMore/my/setups/privacy_notice");
        }
      }
    }, [e._v(e._s(e.l("common.privacy")))])], 1), n("view", {
      staticClass: ["m-t-xl"]
    }, [n("u-button", {
      attrs: {
        type: "primary",
        shape: "circle",
        size: "large",
        text: e.l("index.signin")
      },
      on: {
        click: e.signin
      }
    })], 1), n("view", {
      staticClass: ["flex-row", "items-center", "justify-center", "m-t-xl"]
    }, [n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u8fd8\u6ca1\u6709\u8d26\u53f7\uff1f")]), n("u-text", {
      staticClass: ["text", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: e.gotoSignup
      }
    }, [e._v("\u7acb\u5373\u6ce8\u518c")])])]), n("view", {
      staticClass: ["flex-col", "items-center", "logo"]
    }, [n("u-image", {
      staticClass: ["logoImg"],
      attrs: {
        src: e.cdn + "/draw/qzwl-logo.png"
      }
    }), n("u-text", {
      staticClass: ["logoText"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("app.name")))])], 1), e.isAuditMode ? e._e() : n("view", {}, [1 == e.deviceType ? n("view", {
      staticClass: ["moreSignin", "flex-row", "justify-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/draw/qzwl-login-wechat.png",
        size: "96rpx"
      },
      on: {
        click: e.loninWx
      }
    })], 1) : e._e(), 2 == e.deviceType ? n("view", {
      staticClass: ["moreSignin", "flex-row", "justify-center"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/draw/qzwl-login-apple.png",
        size: "96rpx"
      },
      on: {
        click: e.loninApple
      }
    })], 1) : e._e(), 3 == e.deviceType ? n("view", {
      staticClass: ["moreSignin", "flex-row", "justify-between"]
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/draw/qzwl-login-wechat.png",
        size: "96rpx"
      },
      on: {
        click: e.loninWx
      }
    }), n("u-icon", {
      attrs: {
        name: e.cdn + "/draw/qzwl-login-apple.png",
        size: "96rpx"
      },
      on: {
        click: e.loninApple
      }
    })], 1) : e._e()]), n("u-popup", {
      staticStyle: {
        position: "absolute"
      },
      attrs: {
        show: e.agreePopupShow,
        round: "10",
        closeable: !0
      },
      on: {
        close: e.agreeClose
      }
    }, [n("view", {
      staticClass: ["b-bottom"]
    }, [n("view", {
      staticClass: ["p-md", "m-b-xl"]
    }, [n("u-text", {
      staticClass: ["text-md", "text-bold", "m-t-sm"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("index.Agreement-Privacy")))]), n("u-text", {
      staticClass: ["text-gray", "text", "m-t-lg"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("index.Agreement-Privacy-msg")))])])]), n("view", {
      staticClass: ["p-md", "flex-row", "flex-wrap"]
    }, [n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("index.read-agree")))]), n("u-text", {
      staticClass: ["text", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: function (t) {
          e.gotoPage("/pagesMore/my/setups/service_terms");
        }
      }
    }, [e._v(e._s(e.l("common.agreement")))]), n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.and")))]), n("u-text", {
      staticClass: ["text", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      },
      on: {
        click: function (t) {
          e.gotoPage("/pagesMore/my/setups/privacy_notice");
        }
      }
    }, [e._v("\u300a" + e._s(e.l("mine.setup.privacy.notice")) + "\u300b")])]), n("view", {
      staticClass: ["flex-row", "p-md", "justify-between", "p-h-md", "m-b-xl"]
    }, [n("view", {
      style: {
        width: "300rpx"
      }
    }, [n("u-button", {
      attrs: {
        text: e.l("common.no-agree")
      },
      on: {
        click: e.agreeClose
      }
    })], 1), n("view", {
      style: {
        width: "300rpx"
      }
    }, [n("u-button", {
      attrs: {
        type: "primary",
        text: e.l("common.agree")
      },
      on: {
        click: e.agreeConfirm
      }
    })], 1)])])], 1)]);
  }, i = [];
})(module, exports, __r);
