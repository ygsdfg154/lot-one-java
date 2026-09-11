// webpack 模块 596  [nvue]
// 出现于: pagesMore/my/developers/developers.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = a(require("../../common/config.nvue.js"));
  require("../../common/utils.nvue.js");
  function u(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      (t && (a = a.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, a));
    }
    return n;
  }
  function l(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? u(Object(n), !0).forEach(function (t) {
        (0, o.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  getApp().globalData;
  var _ = {
    data: function () {
      return {
        tapCount: 0,
        audit: "",
        showEnvironment: !1,
        columnsEnvironment: [[{
          label: "\u6b63\u5f0f\u73af\u5883",
          id: 6,
          value: "http://h5.akbee.com/v1"
        }, {
          label: "\u6d4b\u8bd5\u73af\u5883",
          id: 1,
          value: "http://106.55.255.7:9103/api"
        }, {
          label: "\u9884\u53d1\u5e03\u73af\u5883",
          id: 1,
          value: "https://api.stage.zhitugps.com/api"
        }]],
        environmentStorage: uni.getStorageSync("environmentStorage") || ""
      };
    },
    computed: l(l(l(l({}, (0, s.mapGetters)(["isDevMode", "pushClientId", "isAuditMode"])), (0, s.mapState)("sys", ["appVersion", "version"])), (0, s.mapState)("app", ["devRecord", "devDate", "devMaxDate"])), {}, {
      environment: function () {
        var e = this;
        return this.columnsEnvironment[0].find(function (t) {
          return t.value == (e.environmentStorage.value || d.default.serviceRoot);
        });
      }
    }),
    onLoad: function () {
      (this.devMode = this.isDevMode, this.audit = this.isAuditMode ? "\u5ba1\u6838\u4e2d" : "\u672a\u5ba1\u6838");
    },
    methods: l(l(l({}, (0, s.mapActions)("account", ["SignOut"])), (0, s.mapMutations)("dev", ["setDevelopMode"])), {}, {
      changeDevMode: function (e) {
        (this.setDevelopMode(e), e || uni.navigateBack());
      },
      tapVersion: function () {
        this.isDevMode ? uni.showToast({
          title: "\u60a8\u5df2\u5904\u4e8e\u5f00\u53d1\u8005\u6a21\u5f0f",
          icon: "none"
        }) : (this.tapCount += 1, 7 == this.tapCount && (this.tapCount = 0, this.setDevelopMode(!0), uni.showToast({
          title: "\u542f\u7528\u5f00\u53d1\u8005\u6a21\u5f0f",
          icon: "none"
        })));
      },
      navigateToPage: function (e) {
        uni.navigateTo({
          url: e
        });
      },
      copyPushClient: function () {
        (uni.setClipboardData({
          data: this.pushClientId
        }), uni.showToast({
          title: "\u5185\u5bb9\u5df2\u590d\u5236"
        }));
      },
      cutEnvironment: function (e) {
        var t, n = this;
        (this.environment.value != e.value[0].value && uni.showModal({
          showCancel: !0,
          title: ("\u662f\u5426\u5207\u6362\u4e3a").concat(e.value[0].label),
          content: ("\u8be5\u73af\u5883\u4e0b\u8bf7\u6c42\u7684\u57df\u540d\u662f").concat(e.value[0].value),
          confirmText: "\u5207\u6362",
          cancelText: "\u53d6\u6d88",
          success: (t = (0, i.default)(r.default.mark(function t(a) {
            return r.default.wrap(function (t) {
              for (; ;) switch (t.prev = t.next) {
                case 0:
                  if (!a.confirm) {
                    t.next = 8;
                    break;
                  }
                  if ((uni.setStorageSync("environmentStorage", e.value[0]), !uni.getStorageSync("environmentStorage"))) {
                    t.next = 8;
                    break;
                  }
                  return (uni.showToast({
                    title: ("\u6b63\u5728\u4e3a\u60a8\u5207\u6362").concat(e.value[0].label, "\u7248\u672c"),
                    icon: "none"
                  }), t.next = 7, n.SignOut());
                case 7:
                  setTimeout(function () {
                    (uni.reLaunch({
                      url: "/pagesCore/login/index"
                    }), plus.runtime.restart(), uni.hideToast());
                  }, 1e3);
                case 8:
                case "end":
                  return t.stop();
              }
            }, t);
          })), function (e) {
            return t.apply(this, arguments);
          })
        }), this.showEnvironment = !1);
      }
    })
  };
  t.default = _;
})(module, exports, __r);
