// webpack 模块 752  [nvue]
// 出现于: pagesMore/my/developers/developers.js
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
    uCellGroup: require("uview-ui/components/u-cell-group/u-cell-group.vue").default,
    uCell: require("uview-ui/components/u-cell/u-cell.vue").default,
    uSwitch: require("uview-ui/components/u-switch/u-switch.vue").default,
    "u-Textarea": require("uview-ui/components/u--textarea/u--textarea.vue").default,
    uPicker: require("uview-ui/components/u-picker/u-picker.vue").default
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
      staticClass: ["bg-page"]
    }, [n("u-cell-group", {
      attrs: {
        border: !1
      }
    }, [n("u-cell", {
      staticClass: ["bg-white", "m-b"],
      attrs: {
        border: !1,
        size: "large",
        title: "\u5f00\u53d1\u8005\u6a21\u5f0f"
      }
    }, [n("u-switch", {
      attrs: {
        slot: "value"
      },
      on: {
        change: e.changeDevMode
      },
      slot: "value",
      model: {
        value: e.isDevMode,
        callback: function (t) {
          e.isDevMode = t;
        },
        expression: "isDevMode"
      }
    })], 1), n("u-cell", {
      staticClass: ["bg-white", "m-b"],
      attrs: {
        border: !1,
        size: "large",
        title: "\u5546\u5e97\u5ba1\u6838\u72b6\u6001",
        value: e.audit
      }
    }), n("u-cell", {
      staticClass: ["bg-white", "m-b"],
      attrs: {
        border: !1,
        size: "large",
        title: "\u5f53\u524d\u7248\u672c",
        value: e.appVersion
      }
    }), n("u-cell", {
      staticClass: ["bg-white", "m-b"],
      attrs: {
        border: !1,
        size: "large",
        title: "\u5347\u7ea7\u4e2d\u5fc3\u7684\u7248\u672c",
        value: e.version
      }
    }), e.devRecord ? n("u-cell", {
      staticClass: ["bg-white", "m-b"],
      attrs: {
        border: !1,
        size: "large",
        title: "\u58f0\u97f3\u5b89\u9632\u9875\u9762\u9876\u90e8\u65f6\u95f4",
        value: e.devRecord
      }
    }) : e._e(), e.devDate ? n("u-cell", {
      staticClass: ["bg-white", "m-b"],
      attrs: {
        border: !1,
        size: "large",
        title: "moment\u5e93\u83b7\u53d6\u7684\u65f6\u95f4",
        value: e.devDate
      }
    }) : e._e(), e.devMaxDate ? n("u-cell", {
      staticClass: ["bg-white", "m-b"],
      attrs: {
        border: !1,
        size: "large",
        title: "\u9876\u90e8\u7ec4\u4ef6maxdate\u65f6\u95f4\u4e5f\u662fmoment\u5e93\u83b7\u53d6",
        value: e.devMaxDate
      }
    }) : e._e()], 1), n("u-cell-group", {
      attrs: {
        border: !1
      }
    }, [n("u-cell", {
      staticClass: ["bg-white", "m-b"],
      attrs: {
        title: "pushClient",
        isLink: !0,
        url: "/pagesMore/my/developers/push-msgs"
      }
    }), e.environment ? n("u-cell", {
      staticClass: ["bg-white", "m-b"],
      attrs: {
        border: !1,
        size: "large",
        title: "\u5f53\u524d\u73af\u5883",
        value: e.environment.value
      }
    }) : e._e(), e.environment ? n("u-cell", {
      staticClass: ["bg-white", "m-b"],
      attrs: {
        value: e.environment.label,
        title: "\u5207\u6362\u73af\u5883",
        isLink: !0
      },
      on: {
        click: function (t) {
          e.showEnvironment = !0;
        }
      }
    }) : e._e(), n("view", {
      staticClass: ["bg-white", "m-b"]
    }, [n("u--textarea", {
      attrs: {
        value: e.pushClientId,
        border: "none",
        adjustPosition: !0,
        autoHeight: !0,
        disabled: !0
      },
      on: {
        click: e.copyPushClient
      }
    })], 1)], 1), n("u-picker", {
      attrs: {
        show: e.showEnvironment,
        columns: e.columnsEnvironment,
        closeOnClickOverlay: !0,
        keyName: "label"
      },
      on: {
        close: function (t) {
          e.showEnvironment = !1;
        },
        cancel: function (t) {
          e.showEnvironment = !1;
        },
        confirm: e.cutEnvironment
      }
    })], 1)]);
  }, i = [];
})(module, exports, __r);
