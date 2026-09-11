// webpack 模块 776  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/messages.js
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
    "u-Form": require("uview-ui/components/u--form/u--form.vue").default,
    uFormItem: require("uview-ui/components/u-form-item/u-form-item.vue").default,
    "u-Input": require("uview-ui/components/u--input/u--input.vue").default,
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
      staticClass: ["flex-1", "bg-white", "p-lg", "b-top"]
    }, [n("view", {}, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-text", {
      staticClass: ["text-md", "text-bold"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.alarm-tel")))])]), n("u--form", {
      ref: "form1",
      attrs: {
        labelWidth: "80",
        labelAlign: "left"
      }
    }, [n("u-form-item", {
      attrs: {
        label: e.l("common.tel") + "1"
      }
    }, [n("view", [n("u--input", {
      staticClass: ["m-l-md"],
      style: {
        width: "526rpx",
        backgroundColor: "#FAFAFA"
      },
      attrs: {
        type: "number",
        placeholder: e.l("common.please.tel"),
        maxlength: "20"
      },
      model: {
        value: e.alarmSmsList[0],
        callback: function (t) {
          e.$set(e.alarmSmsList, 0, t);
        },
        expression: "alarmSmsList[0]"
      }
    })], 1)]), n("u-form-item", {
      attrs: {
        label: e.l("common.tel") + "2"
      }
    }, [n("view", [n("u--input", {
      staticClass: ["m-l-md"],
      style: {
        width: "526rpx",
        backgroundColor: "#FAFAFA"
      },
      attrs: {
        type: "number",
        placeholder: e.l("common.please.tel"),
        maxlength: "20"
      },
      model: {
        value: e.alarmSmsList[1],
        callback: function (t) {
          e.$set(e.alarmSmsList, 1, t);
        },
        expression: "alarmSmsList[1]"
      }
    })], 1)]), n("u-form-item", {
      attrs: {
        label: e.l("common.tel") + "3"
      }
    }, [n("view", [n("u--input", {
      staticClass: ["m-l-md"],
      style: {
        width: "526rpx",
        backgroundColor: "#FAFAFA"
      },
      attrs: {
        type: "number",
        placeholder: e.l("common.please.tel"),
        maxlength: "20"
      },
      model: {
        value: e.alarmSmsList[2],
        callback: function (t) {
          e.$set(e.alarmSmsList, 2, t);
        },
        expression: "alarmSmsList[2]"
      }
    })], 1)]), n("u-form-item", {
      attrs: {
        label: e.l("common.tel") + "4"
      }
    }, [n("view", [n("u--input", {
      staticClass: ["m-l-md"],
      style: {
        width: "526rpx",
        backgroundColor: "#FAFAFA"
      },
      attrs: {
        type: "number",
        placeholder: e.l("common.please.tel"),
        maxlength: "20"
      },
      model: {
        value: e.alarmSmsList[3],
        callback: function (t) {
          e.$set(e.alarmSmsList, 3, t);
        },
        expression: "alarmSmsList[3]"
      }
    })], 1)]), n("u-form-item", {
      attrs: {
        label: e.l("common.tel") + "5"
      }
    }, [n("view", [n("u--input", {
      staticClass: ["m-l-md"],
      style: {
        width: "526rpx",
        backgroundColor: "#FAFAFA"
      },
      attrs: {
        type: "number",
        placeholder: e.l("common.please.tel"),
        maxlength: "20"
      },
      model: {
        value: e.alarmSmsList[4],
        callback: function (t) {
          e.$set(e.alarmSmsList, 4, t);
        },
        expression: "alarmSmsList[4]"
      }
    })], 1)]), n("u-form-item", {
      attrs: {
        label: e.l("common.tel") + "6"
      }
    }, [n("view", [n("u--input", {
      staticClass: ["m-l-md"],
      style: {
        width: "526rpx",
        backgroundColor: "#FAFAFA"
      },
      attrs: {
        type: "number",
        placeholder: e.l("common.please.tel"),
        maxlength: "20"
      },
      model: {
        value: e.alarmSmsList[5],
        callback: function (t) {
          e.$set(e.alarmSmsList, 5, t);
        },
        expression: "alarmSmsList[5]"
      }
    })], 1)])], 1)], 1), n("view", {
      staticClass: ["main", "flex-row", "items-center", "justify-between", "b-bottom", "b-top"]
    }, [n("u-text", {
      staticClass: ["text-md"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.remaining-sms")))]), n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-text", {
      staticClass: ["text-md"],
      style: {
        marginRight: "50rpx"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.smsRemain))]), e.isAuditMode ? e._e() : n("view", {
      staticClass: ["plyButton", "flex-row"]
    }, [n("u-button", {
      style: {
        height: "65rpx"
      },
      attrs: {
        text: e.l("device.pay"),
        type: "primary"
      },
      on: {
        click: e.gotoTopup
      }
    })], 1)])]), n("view", {
      staticClass: ["text-md"],
      style: {
        paddingTop: "34rpx"
      }
    }, [n("u-text", {
      staticClass: ["text", "text-bold"],
      style: {
        color: "#f56c6b"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.notice-tel")) + "\uff1a")]), n("u-text", {
      staticClass: ["text-sm", "text-gray"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.l("tel-pay.notice-sms-content2")))])]), n("view", {
      staticClass: ["bottomBar"]
    }, [n("u-button", {
      attrs: {
        text: e.l("mine.setup.save"),
        type: "primary"
      },
      on: {
        click: e.saveAlarmTel
      }
    })], 1)])]);
  }, i = [];
})(module, exports, __r);
