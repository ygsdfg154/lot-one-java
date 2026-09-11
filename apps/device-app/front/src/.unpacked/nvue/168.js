// webpack 模块 168  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pages/msg/index.js, pagesCore/account/account-safety.js, pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js ...
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/5.js")), i = a(require("@/.unpacked/nvue/244.js")), o = a(require("@/.unpacked/nvue/245.js"));
  function s(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      (t && (a = a.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, a));
    }
    return n;
  }
  function d(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? s(Object(n), !0).forEach(function (t) {
        (0, r.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var u = {
    name: "u-transition",
    data: function () {
      return {
        inited: !1,
        viewStyle: {},
        status: "",
        transitionEnded: !1,
        display: !1,
        classes: ""
      };
    },
    computed: {
      mergeStyle: function () {
        var e = this.viewStyle, t = this.customStyle;
        return d(d({}, uni.$u.addStyle(t)), e);
      }
    },
    mixins: [uni.$u.mpMixin, uni.$u.mixin, o.default, i.default],
    watch: {
      show: {
        handler: function (e) {
          e ? this.nvueEnter() : this.nvueLeave();
        },
        immediate: !0
      }
    }
  };
  t.default = u;
})(module, exports, __r);
