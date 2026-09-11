// webpack 模块 416  [nvue]
// 出现于: pages/ability/index.js, pagesFunc/terminal/remote-setup/index.js
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
    "u-Input": require("uview-ui/components/u--input/u--input.vue").default,
    uButton: require("uview-ui/components/u-button/u-button.vue").default
  }, r = function () {
    var e = this, t = e.$createElement, n = e._self._c || t;
    return n("view", [n("view", {
      staticClass: ["title", "flex-row", "justify-center", "items-center", "m-v-lg"],
      staticStyle: {
        fontSize: "36rpx"
      },
      on: {
        click: e.hideKeyboard
      }
    }, [n("u-text", {
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.directive) + "\u8bbe\u7f6e")])]), 0 == e.popupType || 3 == e.popupType ? n("view", [n("view", {
      staticClass: ["flex-row", "justify-between", "p-h-xl", "p-t-xl"]
    }, ["Buffer" != e.param ? n("view", {
      staticClass: ["flex-row"]
    }, [n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5f53\u524d\u72b6\u6001\uff1a")]), e.selectedRadioValue ? n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5173\u95ed")]) : n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5f00\u542f")])]) : e._e(), "Buffer" == e.param ? n("view", {
      staticClass: ["flex-row"]
    }, [n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5f53\u524d\u72b6\u6001\uff1a")]), e.selectedRadioValue ? n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u672a\u65ad\u5f00")]) : n("u-text", {
      staticClass: ["text"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u65ad\u5f00")])]) : e._e(), n("view", {
      staticClass: ["flex-row", "items-center"],
      on: {
        click: e.debounceGetRadioValue
      }
    }, [n("u-icon", {
      attrs: {
        name: e.cdn + "/ikon/qzwl-refresh.png",
        size: "36rpx"
      }
    }), n("u-text", {
      staticClass: ["text", "m-l-sm", "text-primary"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u5237\u65b0")])], 1)]), n("view", [3 != e.popupType ? n("view", {
      staticClass: ["flex-row"]
    }, e._l(e.radioList, function (t) {
      return n("view", {
        key: t.name,
        staticClass: ["flex-row", "items-center", "p-xl"],
        on: {
          click: function (n) {
            e.radioValue = t.name;
          }
        }
      }, [e.radioValue == t.name ? n("view", {
        staticClass: ["selectedRadio"]
      }, [n("view", {
        staticClass: ["selectedRadio-son"]
      })]) : n("view", {
        staticClass: ["notRadio"]
      }), n("u-text", {
        staticClass: ["text", "p-l-mini"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t.lable))])]);
    }), 0) : e._e(), 3 == e.popupType ? n("view", {
      staticClass: ["flex-row", "items-start", "p-v-lg"]
    }, [n("view", {
      staticClass: ["flex-col", "items-start"]
    }, e._l(e.radioList, function (t) {
      return n("view", {
        key: t.name,
        staticClass: ["flex-row", "items-center", "p-h-xl", "p-v-md"],
        on: {
          click: function (n) {
            e.radioValue = t.name;
          }
        }
      }, [e.radioValue == t.name ? n("view", {
        staticClass: ["selectedRadio"]
      }, [n("view", {
        staticClass: ["selectedRadio-son"]
      })]) : n("view", {
        staticClass: ["notRadio"]
      }), n("u-text", {
        staticClass: ["text", "p-l-mini"],
        appendAsTree: !0,
        attrs: {
          append: "tree"
        }
      }, [e._v(e._s(t.lable))])]);
    }), 0), e.radioValue ? e._e() : n("view", {
      staticStyle: {
        width: "438rpx",
        height: "72rpx"
      }
    }, [n("u--input", {
      staticStyle: {
        height: "72rpx"
      },
      attrs: {
        placeholder: e.l("alarm-setup.please-speed"),
        border: "surround",
        type: "number"
      },
      model: {
        value: e.speed,
        callback: function (t) {
          e.speed = t;
        },
        expression: "speed"
      }
    })], 1)]) : e._e()])]) : e._e(), 1 == e.popupType ? n("view", {
      staticClass: ["p-xl"]
    }, [n("view", {
      staticClass: ["flex-row", "items-center"]
    }, [n("u-text", {
      staticClass: ["text", "text-gray"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u81ea\u5b9a\u4e49\u6307\u4ee4")]), n("view", {
      staticStyle: {
        marginLeft: "32rpx",
        width: "514rpx"
      }
    }, [n("u--input", {
      attrs: {
        placeholder: e.l("remote-setup.please-custom-directive"),
        border: "surround"
      },
      model: {
        value: e.custom,
        callback: function (t) {
          e.custom = t;
        },
        expression: "custom"
      }
    })], 1)])]) : e._e(), 2 == e.popupType ? n("view", {
      staticClass: ["p-xl"]
    }, [n("view", {
      staticClass: ["flex-row", "items-center", "m-t-lg"]
    }, [n("u-text", {
      staticClass: ["text", "text-gray", "m-r-lg"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u53f7\u78011")]), n("u--input", {
      attrs: {
        type: "number",
        placeholder: e.l("common.please.tel"),
        border: "surround"
      },
      model: {
        value: e.whiteTelList[0],
        callback: function (t) {
          e.$set(e.whiteTelList, 0, t);
        },
        expression: "whiteTelList[0]"
      }
    })], 1), n("view", {
      staticClass: ["flex-row", "items-center", "m-t-lg"]
    }, [n("u-text", {
      staticClass: ["text", "text-gray", "m-r-lg"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u53f7\u78012")]), n("u--input", {
      attrs: {
        type: "number",
        placeholder: e.l("common.please.tel"),
        border: "surround"
      },
      model: {
        value: e.whiteTelList[1],
        callback: function (t) {
          e.$set(e.whiteTelList, 1, t);
        },
        expression: "whiteTelList[1]"
      }
    })], 1), n("view", {
      staticClass: ["flex-row", "items-center", "m-t-lg"]
    }, [n("u-text", {
      staticClass: ["text", "text-gray", "m-r-lg"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u53f7\u78013")]), n("u--input", {
      attrs: {
        type: "number",
        placeholder: e.l("common.please.tel"),
        border: "surround"
      },
      model: {
        value: e.whiteTelList[2],
        callback: function (t) {
          e.$set(e.whiteTelList, 2, t);
        },
        expression: "whiteTelList[2]"
      }
    })], 1)]) : e._e(), n("view", {
      staticClass: ["p-h-xl"]
    }, [n("u-text", {
      staticClass: ["text", "text-gray"],
      staticStyle: {
        color: "#f56c6b"
      },
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u6307\u4ee4\u8bf4\u660e\uff1a")]), n("u-text", {
      staticClass: ["text", "text-gray", "m-t-mini"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v(e._s(e.describe))])]), n("view", {
      staticClass: ["bottom-bar-popup"]
    }, [n("u-button", {
      attrs: {
        type: "primary",
        text: e.l("common.instruct")
      },
      on: {
        click: e.sendDirective
      }
    })], 1)]);
  }, i = [];
})(module, exports, __r);
