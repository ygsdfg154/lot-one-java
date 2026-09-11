// webpack 模块 670  [nvue]
// 出现于: pagesFunc/terminal/list/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var i = a(require("@/.unpacked/nvue/22.js")), r = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = a(require("../../common/config.nvue.js")), u = require("../../common/utils.nvue.js");
  function l(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(e);
      (t && (a = a.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, a));
    }
    return n;
  }
  function c(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? l(Object(n), !0).forEach(function (t) {
        (0, o.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var _ = getApp().globalData, m = {
    data: function () {
      return {
        pattern: (0, o.default)({
          color: d.default.primaryColor,
          backgroundColor: "#fff",
          selectedColor: d.default.primaryColor,
          buttonColor: d.default.primaryColor
        }, "backgroundColor", d.default.primaryColor),
        deviceInfo: {
          name: "",
          password: ""
        }
      };
    },
    computed: c(c({}, (0, s.mapGetters)(["userType", "isAuditModeAndroid"])), {}, {
      content: function () {
        return ("").concat(_.$t("bind-device.confim-bind"), " ").concat(this.deviceInfo.name);
      }
    }),
    props: ["isBind"],
    methods: c(c({}, (0, s.mapActions)("device", ["BindTerminal"])), {}, {
      l: function (e) {
        return _.$t(e);
      },
      closeSubmit: function () {
        (uni.hideKeyboard(), this.deviceInfo.name = "", this.deviceInfo.password = "", this.$emit("isBindChange", !1));
      },
      submit: function () {
        var e = this;
        return (uni.hideKeyboard(), this.deviceInfo.name && this.deviceInfo.password ? uni.$u.test.rangeLength(this.deviceInfo.password, [6, 20]) ? void uni.showModal({
          title: _.$t("mine.bind.terminal.submit"),
          content: this.content,
          cancelText: _.$t("common.cancel"),
          confirmText: _.$t("common.ok"),
          success: function (t) {
            t.cancel || e.bind();
          }
        }) : (0, u.qzwlToast)(_.$t("common.please.pwd.num"), "none") : (0, u.qzwlToast)("\u8bf7\u8f93\u5165\u5185\u5bb9", "none"));
      },
      bind: function () {
        var e = this;
        return (0, r.default)(i.default.mark(function t() {
          return i.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if (!(e.deviceInfo.name.length >= 7 && e.deviceInfo.name.length <= 20 && e.deviceInfo.password.length >= 6)) {
                  t.next = 7;
                  break;
                }
                return (t.next = 3, e.BindTerminal({
                  terminalNo: e.deviceInfo.name,
                  password: e.deviceInfo.password.trim()
                }));
              case 3:
                (t.sent.succeeded && ((0, u.qzwlToast)(_.$t("common.bind.success"), "success"), e.$emit("bindRefresh"), e.$emit("isBindChange", !1), e.deviceInfo.name = "", e.deviceInfo.password = ""), t.next = 8);
                break;
              case 7:
                (0, u.qzwlToast)(_.$t("common.legal.content"), "none");
              case 8:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      popupClick: function () {
        uni.hideKeyboard();
      },
      scanCode: function () {
        var e, t = this;
        (uni.hideKeyboard(), uni.scanCode({
          onlyFromCamera: !1,
          scanType: ["barCode", "qrCode", "datamatrix", "pdf417"],
          success: (e = async function (n) {
            await t.$nextTick();
            setTimeout(function () {
              t.$set(t.deviceInfo, "name", n.result);
            }, 800);
          }, function (t) {
            return e.apply(this, arguments);
          })
        }));
      }
    })
  };
  t.default = m;
})(module, exports, __r);
