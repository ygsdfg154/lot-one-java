// webpack 模块 9451  [svc]
// 出现于: pagesFunc/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  (function (t) {
    var n = require("@/.unpacked/svc/47a9.js");
    (Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0);
    var r = n(require("@/.unpacked/svc/127e.js")), i = n(require("@/.unpacked/svc/ee10.js")), s = n(require("@/.unpacked/svc/7ca3.js")), o = require("vuex"), c = n(require("../../common/config.js")), u = require("@/.unpacked/svc/aa02.js"), l = require("../../common/utils.js");
    function d(t, e) {
      var a = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        (e && (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })), a.push.apply(a, n));
      }
      return a;
    }
    function f(t) {
      for (var e = 1; e < arguments.length; e++) {
        var a = null != arguments[e] ? arguments[e] : {};
        e % 2 ? d(Object(a), !0).forEach(function (e) {
          (0, s.default)(t, e, a[e]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : d(Object(a)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
        });
      }
      return t;
    }
    var p = getApp().globalData, m = {
      computed: f({}, (0, o.mapGetters)(["selectedTerminal", "access_token", "terminalFuncs"])),
      props: ["value", "recordVipLimit"],
      methods: f(f({}, (0, o.mapActions)("audio", ["SendAudioCommand", "AtouSendAudioCommand", "AlwaysSendAudioCommand"])), {}, {
        l: function (t) {
          return p.$t(t);
        },
        manualAudio: function () {
          var e = this;
          return (0, i.default)(r.default.mark(function a() {
            var n, s;
            return r.default.wrap(function (a) {
              while (1) switch (a.prev = a.next) {
                case 0:
                  if (e.recordVipLimit) {
                    a.next = 2;
                    break;
                  }
                  return a.abrupt("return", uni.showModal({
                    showCancel: !0,
                    title: "\u58f0\u97f3\u5b89\u9632\u5145\u503c",
                    content: "\u5f53\u524d\u8bbe\u5907\u65e0\u53ef\u7528\u58f0\u97f3\u5b89\u9632\u65f6\u957f\uff0c\u662f\u5426\u524d\u5f80\u5145\u503c",
                    confirmText: "\u524d\u5f80\u5145\u503c",
                    cancelText: "\u6682\u4e0d\u524d\u5f80",
                    success: function (t) {
                      t.confirm && (0, l.qzGotoWx)({
                        id: e.selectedTerminal.id,
                        url: "/pagesPay/value-added/index",
                        access_token: e.access_token
                      });
                    }
                  }));
                case 2:
                  (n = [{
                    key: {
                      label: p.$t("audio.mode1"),
                      value: 0
                    },
                    state: !0
                  }, {
                    key: {
                      label: p.$t("audio.mode2"),
                      value: 1
                    },
                    state: (0, l.funcShowHandler)(e.terminalFuncs, 20)
                  }, {
                    key: {
                      label: "\u6301\u7eed\u58f0\u97f3\u5b89\u9632",
                      value: 2
                    },
                    state: (0, l.funcShowHandler)(e.terminalFuncs, 26)
                  }], s = n.filter(function (t) {
                    return t.state;
                  }).map(function (t) {
                    return t.key;
                  }), uni.showActionSheet({
                    title: p.$t("audio.mode"),
                    itemList: s.map(function (t) {
                      return t.label;
                    }),
                    itemColor: c.default.primaryColor,
                    success: (function () {
                      var a = async function (n) {
                        var o;
                        (o = s[n.tapIndex], 0 == o.value ? uni.showActionSheet({
                          title: ("").concat(p.$t("audio.select-timing-audioing-time"), "(").concat(p.$t("audio.unit"), ")"),
                          itemList: ["30", "60", "120"],
                          itemColor: c.default.primaryColor,
                          success: (function () {
                            var a = async function (n) {
                              var i;
                              t("log", "recordTime(res1.tapIndex)", (0, u.recordTime)(n.tapIndex), " at pagesFunc/terminal/audio/audio-but.vue:119");
                              (i = await e.SendAudioCommand({
                                deviceId: e.selectedTerminal.id,
                                timeValue: (0, u.recordTime)(n.tapIndex)
                              }), i.succeeded && (0, l.qzwlToast)(p.$t("common.timing.recor"), "none"));
                            };
                            return function (t) {
                              return a.apply(this, arguments);
                            };
                          })()
                        }) : 1 == o.value ? uni.showModal({
                          title: p.$t("audio.modal-open-record"),
                          content: p.$t("audio.modal-content"),
                          cancelText: p.$t("common.cancel"),
                          confirmText: p.$t("common.ok"),
                          success: function (t) {
                            t.cancel || e.atouAudioHangler("open");
                          }
                        }) : 2 == o.value && uni.showModal({
                          title: "\u662f\u5426\u5f00\u542f\u6301\u7eed\u58f0\u97f3\u5b89\u9632",
                          content: "\u5f00\u542f\u6301\u7eed\u58f0\u97f3\u5b89\u9632\u6d41\u91cf\u6d88\u8017\u8f83\u5927,\u786e\u5b9a\u5f00\u542f\u5417\uff1f",
                          cancelText: p.$t("common.cancel"),
                          confirmText: p.$t("common.ok"),
                          success: function (t) {
                            t.cancel || e.alwaysAudioHangler("open");
                          }
                        }));
                      };
                      return function (t) {
                        return a.apply(this, arguments);
                      };
                    })(),
                    fail: function (t) {},
                    complete: function () {
                      e.$emit("recover");
                    }
                  }));
                case 5:
                case "end":
                  return a.stop();
              }
            }, a);
          }))();
        },
        atouAudioHangler: function (e) {
          var a = this;
          return (async function () {
            var i;
            (i = await a.AtouSendAudioCommand({
              deviceId: a.selectedTerminal.id,
              state: "open" == e
            }), t("log", "result", i, " at pagesFunc/terminal/audio/audio-but.vue:170"), i.succeeded && (a.$emit("input", "open" === e ? 2 : 1), (0, l.qzwlToast)("open" === e ? p.$t("audio.open-voice-control") : p.$t("audio.close-voice-control"), "none")));
          })();
        },
        alwaysAudioHangler: function (e) {
          var a = this;
          return (async function () {
            var i;
            (i = await a.AlwaysSendAudioCommand({
              deviceId: a.selectedTerminal.id,
              state: "open" == e
            }), t("log", "result", i, " at pagesFunc/terminal/audio/audio-but.vue:186"), i.succeeded && (a.$emit("input", "open" === e ? 3 : 1), (0, l.qzwlToast)("open" === e ? "\u6301\u7eed\u58f0\u97f3\u5b89\u9632\u5df2\u5f00\u542f" : "\u6301\u7eed\u58f0\u97f3\u5b89\u9632\u5df2\u5173\u95ed", "none")));
          })();
        },
        isCloseAtouAudio: function () {
          var t = this;
          uni.showModal({
            title: p.$t("audio.modal-close-audio"),
            cancelText: p.$t("common.cancel"),
            confirmText: p.$t("common.ok"),
            success: function (e) {
              e.cancel || t.atouAudioHangler("close");
            }
          });
        },
        isCloseAlwaysAudio: function () {
          var t = this;
          uni.showModal({
            title: "\u662f\u5426\u5173\u95ed\u6301\u7eed\u58f0\u97f3\u5b89\u9632",
            cancelText: p.$t("common.cancel"),
            confirmText: p.$t("common.ok"),
            success: function (e) {
              e.cancel || t.alwaysAudioHangler("close");
            }
          });
        }
      })
    };
    e.default = m;
  }).call(this, require("@/.unpacked/svc/f3b9.js")["default"]);
})(module, exports, __r);
