// webpack 模块 785  [nvue]
// 出现于: pagesCore/login/logout.js
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
    uButton: require("uview-ui/components/u-button/u-button.vue").default,
    "u-Input": require("uview-ui/components/u--input/u--input.vue").default,
    uCode: require("uview-ui/components/u-code/u-code.vue").default
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
      staticClass: ["flex-1", "bg-white"]
    }, [n("view", {
      staticClass: ["content"]
    }, [0 === e.cancellationStep ? n("view", [n("view", {
      staticClass: ["flex-row", "justify-center", "m-b-lg"]
    }, [n("u-text", {
      staticClass: ["text-bold"],
      style: {
        fontSize: "38rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-cancelled.title")))])]), n("view", {
      staticClass: ["flex-row", "justify-center", "m-b-lg"]
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-cand.tip")))])]), n("view", {
      staticClass: ["m-b-md", "flex-row", "items-start"]
    }, [n("view", {
      staticClass: ["content-icon", "bg-primary"]
    }), n("u-text", {
      staticClass: ["text-md"],
      style: {
        width: "600rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-canion.account")))])]), n("view", {
      staticClass: ["m-b-md", "flex-row", "items-start"]
    }, [n("view", {
      staticClass: ["content-icon", "bg-primary"]
    }), n("view", [n("u-text", {
      staticClass: ["text-md"],
      style: {
        width: "600rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-cand.tip1")))])])]), n("view", {
      staticClass: ["m-b-md", "flex-row", "items-start"]
    }, [n("view", {
      staticClass: ["content-icon", "bg-primary"]
    }), n("view", [n("u-text", {
      staticClass: ["text-md"],
      style: {
        width: "600rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-cand.tip2")))])])]), n("view", {
      staticClass: ["m-b-md", "flex-row", "items-start"]
    }, [n("view", {
      staticClass: ["content-icon", "bg-primary"]
    }), n("view", [n("u-text", {
      staticClass: ["text-md"],
      style: {
        width: "600rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-cand.tip3")))])])]), n("view", {
      staticClass: ["m-b-md", "flex-row", "items-start"]
    }, [n("view", {
      staticClass: ["content-icon", "bg-primary"]
    }), n("view", [n("u-text", {
      staticClass: ["text-md"],
      style: {
        width: "600rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-cand.tip4")))])])]), n("view", {
      staticClass: ["m-b-xl", "flex-row", "items-start"]
    }, [n("view", {
      staticClass: ["content-icon", "bg-primary"]
    }), n("view", [n("u-text", {
      staticClass: ["text-md"],
      style: {
        width: "600rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-cand.tip5")))])])]), n("view", {
      style: {
        marginTop: "45rpx"
      }
    }, [n("u-button", {
      attrs: {
        type: "primary",
        text: e.l("account-canion.confim")
      },
      on: {
        click: e.goOnCancellation
      }
    })], 1)]) : e._e(), 1 === e.cancellationStep ? n("view", [n("view", {
      staticClass: ["m-b-lg"]
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.tel")) + "\uff1a")]), n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("+86 " + e._s(e.phoneNumber))])]), e.codeShow ? n("view", {
      staticClass: ["flex-row"]
    }, [n("u-text", {
      staticClass: ["text-grey", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("common.send.code")))]), n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.phoneNumber))]), n("u-text", {
      staticClass: ["text-grey", "text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\uff0c" + e._s(e.l("common.please.check")))])]) : e._e(), n("view", {
      staticClass: ["m-t-lg", "flex-row"]
    }, [n("view", {
      style: {
        width: "350rpx"
      }
    }, [n("u--input", {
      style: {
        height: "80rpx"
      },
      attrs: {
        type: "code",
        placeholder: e.l("common.code")
      },
      model: {
        value: e.code,
        callback: function (t) {
          e.code = t;
        },
        expression: "code"
      }
    })], 1), n("view", {
      staticClass: ["m-l-xl"]
    }, [n("u-code", {
      ref: "uCode",
      attrs: {
        keepRunning: !0,
        uniqueKey: "page-a",
        seconds: "60",
        changeText: e.l("common.x.get.code"),
        startText: e.l("common.get.code"),
        endText: e.l("common.anew.code")
      },
      on: {
        change: e.codeTimeChange,
        start: function (t) {
          e.disabled = !0;
        },
        end: function (t) {
          e.disabled = !1;
        }
      }
    }), n("view", {
      style: {
        width: "200rpx",
        height: "80rpx"
      }
    }, [n("u-button", {
      attrs: {
        type: "primary",
        text: e.codeTime
      },
      on: {
        click: e.getSmsCode
      }
    })], 1)], 1)]), n("view", {
      style: {
        width: "588rpx",
        height: "82rpx",
        marginTop: "50rpx"
      }
    }, [n("u-button", {
      attrs: {
        type: "primary",
        text: "\u786e\u5b9a\u6ce8\u9500"
      },
      on: {
        click: e.validationCancellation
      }
    })], 1)]) : e._e(), 2 === e.cancellationStep ? n("view", [n("view", {
      staticClass: ["flex-row", "justify-center", "m-b-xl"]
    }, [n("view", {
      style: {
        width: "620rpx"
      }
    }, [n("u-text", {
      staticClass: ["text-bold"],
      style: {
        fontSize: "38rpx",
        textAlign: "center"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-cand.succeed-tip")) + "\uff1a")])])]), n("view", {
      staticClass: ["m-b-md", "flex-row", "items-start", "m-t-xl"]
    }, [n("view", {
      staticClass: ["content-icon", "bg-primary"]
    }), n("view", [n("u-text", {
      staticClass: ["text-md"],
      style: {
        width: "600rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-cand.succeed-tip1")))])])]), n("view", {
      staticClass: ["m-b-xl", "flex-row", "items-start"]
    }, [n("view", {
      staticClass: ["content-icon", "bg-primary"]
    }), n("view", [n("u-text", {
      staticClass: ["text-md"],
      style: {
        width: "600rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-cand.succeed-tip2")))])])]), n("view", {
      staticClass: ["m-b-xl", "flex-row", "items-start"]
    }, [n("view", {
      staticClass: ["content-icon", "bg-primary"]
    }), n("view", [n("u-text", {
      staticClass: ["text-md"],
      style: {
        width: "600rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("account-cand.succeed-tip3")))])])]), n("view", {
      style: {
        marginTop: "45rpx"
      }
    }, [n("u-button", {
      attrs: {
        type: "primary",
        text: e.l("common.close")
      },
      on: {
        click: e.close
      }
    })], 1)]) : e._e()]), e.imgCaptchaShow ? n("verificationCode", {
      ref: "imgCaptchaRef",
      attrs: {
        phoneNumber: e.username
      },
      on: {
        imgCaptchaChange: e.imgCaptchaChange,
        smsCodeChange: e.smsCodeChange
      }
    }) : e._e()], 1)]);
  }, i = [];
})(module, exports, __r);
