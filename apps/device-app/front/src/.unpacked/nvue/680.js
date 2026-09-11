// webpack 模块 680  [nvue]
// 出现于: pagesFunc/terminal/remote-setup/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = a(require("../../components/directivePopup/directivePopup.nvue")), d = require("vuex"), u = require("../../common/utils.nvue.js");
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
    function _(e) {
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
    var c = getApp().globalData, m = {
      components: {
        directivePopup: s.default
      },
      data: function () {
        return {
          funcPopupShow: !1,
          popupType: 0,
          directive: "",
          describe: "",
          param: "",
          showUploadTime: !1,
          uploadInterval: null,
          timeSlice: [[{
            id: 10,
            label: "10\u79d2"
          }, {
            id: 20,
            label: "20\u79d2"
          }, {
            id: 30,
            label: "30\u79d2"
          }, {
            id: 60,
            label: "60\u79d2"
          }, {
            id: 120,
            label: "120\u79d2"
          }]]
        };
      },
      computed: _({}, (0, d.mapGetters)(["selectedTerminal", "terminalFuncs"])),
      onLoad: function () {
        this.terminalFuncShow(65) && this.getTimeInterval();
      },
      methods: _(_({}, (0, d.mapActions)("remoteSet", ["SetResetTerminal", "SetFactoryReset", "Locateing", "SetTerminalParams", "GetTerminalParams"])), {}, {
        l: function (e) {
          return c.$t(e);
        },
        setDirective: function (e, t, n, a) {
          (this.popupType = e, this.directive = c.$t(t), this.describe = c.$t(n), this.param = a, this.funcPopupShow = !0);
        },
        back: function () {
          uni.navigateBack();
        },
        gotoSetList: function (e) {
          uni.navigateTo({
            url: e
          });
        },
        terminalFuncShow: function (e) {
          return (0, u.funcShowHandler)(this.terminalFuncs, e);
        },
        factoryReset: function () {
          var e, t = this;
          uni.showModal({
            title: c.$t("remote-setup.confirm-factory-reset"),
            cancelText: c.$t("common.cancel"),
            confirmText: c.$t("common.ok"),
            success: (e = (0, i.default)(r.default.mark(function e(n) {
              return r.default.wrap(function (e) {
                for (; ; ) switch (e.prev = e.next) {
                  case 0:
                    if (n.cancel) {
                      e.next = 6;
                      break;
                    }
                    return (e.next = 3, t.SetFactoryReset({
                      TerminalId: t.selectedTerminal.id
                    }));
                  case 3:
                    if (!e.sent.succeeded) {
                      e.next = 6;
                      break;
                    }
                    return e.abrupt("return", (0, u.qzwlToast)(t.l("common.factory.reset"), "none"));
                  case 6:
                  case "end":
                    return e.stop();
                }
              }, e);
            })), function (t) {
              return e.apply(this, arguments);
            })
          });
        },
        resetTerminal: function () {
          var e = this;
          return (0, i.default)(r.default.mark(function t() {
            return r.default.wrap(function (t) {
              for (; ; ) switch (t.prev = t.next) {
                case 0:
                  uni.showModal({
                    title: "\u786e\u5b9a\u5c06\u8bbe\u5907\u91cd\u542f\u5417",
                    cancelText: c.$t("common.cancel"),
                    confirmText: c.$t("common.ok"),
                    success: (function () {
                      var t = (0, i.default)(r.default.mark(function t(n) {
                        return r.default.wrap(function (t) {
                          for (; ; ) switch (t.prev = t.next) {
                            case 0:
                              if (n.cancel) {
                                t.next = 5;
                                break;
                              }
                              return (t.next = 3, e.SetResetTerminal({
                                TerminalId: e.selectedTerminal.id
                              }));
                            case 3:
                              t.sent.succeeded && (0, u.qzwlToast)(e.l("common.device.restart"), "none");
                            case 5:
                            case "end":
                              return t.stop();
                          }
                        }, t);
                      }));
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })()
                  });
                case 1:
                case "end":
                  return t.stop();
              }
            }, t);
          }))();
        },
        refreshLocate: function () {
          var e = this;
          return (async function () {
            (await e.Locateing(e.selectedTerminal.id)).succeeded && (0, u.qzwlToast)(e.l("common.refurbish.locate"), "none");
          })();
        },
        setUploadTime: function () {
          this.showUploadTime = !0;
        },
        timeConfirm: function (e) {
          var t = this;
          return (0, i.default)(r.default.mark(function n() {
            var a;
            return r.default.wrap(function (n) {
              for (; ; ) switch (n.prev = n.next) {
                case 0:
                  if (!e.value.length) {
                    n.next = 9;
                    break;
                  }
                  return (a = e.value[0].id, n.next = 4, t.SetTerminalParams({
                    deviceId: t.selectedTerminal.id,
                    param: [{
                      name: "UploadInterval",
                      value: a
                    }]
                  }));
                case 4:
                  if (!n.sent.succeeded) {
                    n.next = 9;
                    break;
                  }
                  return (t.showUploadTime = !1, t.getTimeInterval(), n.abrupt("return", (0, u.qzwlToast)("\u8bbe\u5907\u4e0a\u4f20\u95f4\u9694\u8bbe\u7f6e\u6307\u4ee4\u4e0b\u53d1\u6210\u529f\uff0c\u72b6\u6001\u7a0d\u540e\u66f4\u65b0", "none")));
                case 9:
                case "end":
                  return n.stop();
              }
            }, n);
          }))();
        },
        getTimeInterval: function () {
          var t = this;
          return (async function () {
            var a, i;
            (a = await t.GetTerminalParams({
              terminalId: t.selectedTerminal.id
            })).succeeded && a.data.length && (i = a.data.find(function (e) {
              return "UploadInterval" === e.FieldName;
            })) && (e("log", "target", i, " at pagesFunc/terminal/remote-setup/index.nvue:351"), t.uploadInterval = i.Value);
          })();
        }
      })
    };
    t.default = m;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
