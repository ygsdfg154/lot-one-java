// webpack 模块 782  [nvue]
// 出现于: pagesCore/account/revise-pwd.js
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
      staticClass: ["u-page"]
    }, [n("view", {
      staticClass: ["bg-white", "br-md", "main"]
    }, [n("view", [n("u--input", {
      attrs: {
        type: "password",
        placeholder: e.l("mine.setup.old.pwd"),
        border: "surround"
      },
      model: {
        value: e.oldUserPwd,
        callback: function (t) {
          e.oldUserPwd = t;
        },
        expression: "oldUserPwd"
      }
    })], 1), n("view", {
      staticClass: ["m-t-lg"]
    }, [n("u--input", {
      attrs: {
        type: "password",
        placeholder: e.l("mine.setup.new.pwd"),
        border: "surround"
      },
      model: {
        value: e.repeatUserPwd,
        callback: function (t) {
          e.repeatUserPwd = t;
        },
        expression: "repeatUserPwd"
      }
    })], 1), n("view", {
      staticClass: ["m-t-lg"]
    }, [n("u--input", {
      attrs: {
        type: "password",
        placeholder: e.l("mine.setup.confirm.pwd"),
        border: "surround"
      },
      model: {
        value: e.userPwd,
        callback: function (t) {
          e.userPwd = t;
        },
        expression: "userPwd"
      }
    })], 1), 3 == e.userState ? n("u-text", {
      staticClass: ["text-sm", "text-gray", "m-t-sm"],
      appendAsTree: !0,
      attrs: {
        append: "tree"
      }
    }, [e._v("\u8bf7\u8f93\u5165\u8be5\u8bbe\u5907\u65e7\u5bc6\u7801\u8fdb\u884c\u4fee\u6539\u3010\u9ed8\u8ba4\u5bc6\u7801:123456\u3011")]) : e._e()]), n("view", {
      staticClass: ["m-t-xl"]
    }, [n("u-button", {
      attrs: {
        shape: "circle",
        type: "primary",
        size: "large",
        text: e.l("mine.setup.save")
      },
      on: {
        click: e.savePwd
      }
    })], 1)])]);
  }, i = [];
})(module, exports, __r);
