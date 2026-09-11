// webpack 模块 781  [nvue]
// 出现于: pagesCore/account/revise-userInfo.js
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
      staticClass: ["flex-1", "bg-white"]
    }, [n("view", {
      staticClass: ["p"]
    }, [n("u--input", {
      attrs: {
        placeholder: e.l("mine.setup.revise.userInfo"),
        border: "surround"
      },
      model: {
        value: e.newNickName,
        callback: function (t) {
          e.newNickName = t;
        },
        expression: "newNickName"
      }
    })], 1), n("view", {
      staticClass: ["p-lg"]
    }, [n("u-button", {
      attrs: {
        shape: "circle",
        type: "primary",
        size: "large",
        text: e.l("mine.setup.save")
      },
      on: {
        click: e.save
      }
    })], 1)])]);
  }, i = [];
})(module, exports, __r);
