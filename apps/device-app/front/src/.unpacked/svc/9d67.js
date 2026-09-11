// webpack 模块 9d67  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/svc/7ca3.js")), i = a(require("@/.unpacked/svc/540c.js")), o = a(require("@/.unpacked/svc/59ee.js"));
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
  function u(e) {
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
  var d = {
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
        return u(u({
          transitionDuration: ("").concat(this.duration, "ms"),
          transitionTimingFunction: this.timingFunction
        }, uni.$u.addStyle(t)), e);
      }
    },
    mixins: [uni.$u.mpMixin, uni.$u.mixin, o.default, i.default],
    watch: {
      show: {
        handler: function (e) {
          e ? this.vueEnter() : this.vueLeave();
        },
        immediate: !0
      }
    }
  };
  t.default = d;
})(module, exports, __r);
