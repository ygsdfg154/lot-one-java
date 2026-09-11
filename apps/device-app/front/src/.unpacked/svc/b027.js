// webpack 模块 b027  [svc]
// 出现于: pagesMore/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, s) {
  "use strict";
  var i = require("@/.unpacked/svc/47a9.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var n = i(require("@/.unpacked/svc/127e.js")), a = i(require("@/.unpacked/svc/ee10.js")), r = i(require("@/.unpacked/svc/7ca3.js")), c = i(require("@/.unpacked/svc/918f.js")), o = require("vuex"), u = i(require("../../common/config.js"));
  function l(t, e) {
    var s = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(t);
      (e && (i = i.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), s.push.apply(s, i));
    }
    return s;
  }
  function p(t) {
    for (var e = 1; e < arguments.length; e++) {
      var s = null != arguments[e] ? arguments[e] : {};
      e % 2 ? l(Object(s), !0).forEach(function (e) {
        (0, r.default)(t, e, s[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(s)) : l(Object(s)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(s, e));
      });
    }
    return t;
  }
  var _ = getApp().globalData, f = {
    onLoad: function () {
      this.version = this.sysInfo.appWgtVersion;
    },
    data: function () {
      return {
        cdn: u.default.cdn,
        version: "1.0.0",
        sysInfo: uni.getSystemInfoSync(),
        year: new Date().getFullYear(),
        about: {},
        tapCount: 0
      };
    },
    computed: p({}, (0, o.mapGetters)(["isDevMode"])),
    methods: p(p({}, (0, o.mapMutations)("dev", ["setDevelopMode"])), {}, {
      l: function (t) {
        return _.$t(t);
      },
      check: function () {
        return (async function () {
          var e;
          (e = await (0, c.default)(), e && e.succeeded && 0 == e.code && uni.showToast({
            title: _.$t("common.new.version"),
            icon: "none"
          }));
        })();
      },
      tapVersion: function () {
        this.isDevMode ? uni.showToast({
          title: "\u60a8\u5df2\u5904\u4e8e\u5f00\u53d1\u8005\u6a21\u5f0f",
          icon: "none"
        }) : (this.tapCount += 1, 7 == this.tapCount && (this.tapCount = 0, this.setDevelopMode(!0), setTimeout(function () {
          uni.showToast({
            title: "\u542f\u7528\u5f00\u53d1\u8005\u6a21\u5f0f",
            icon: "none"
          });
        }, 0), uni.navigateBack()));
      },
      gotoPage: function (t) {
        uni.navigateTo({
          url: t
        });
      }
    })
  };
  e.default = f;
})(module, exports, __r);
