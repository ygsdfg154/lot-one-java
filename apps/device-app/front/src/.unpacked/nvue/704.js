// webpack 模块 704  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/wx-mp.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r, i = a(require("@/.unpacked/nvue/22.js")), s = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), d = a(require("../../common/config.nvue.js")), u = require("vuex"), _ = require("../../common/utils.nvue.js");
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
    function m(e) {
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
    var c = getApp().globalData, h = {
      data: function () {
        return {
          cdn: d.default.cdn,
          wechatId: 0,
          code: ""
        };
      },
      onLoad: function (e) {
        this.wechatId = e.wechatId;
      },
      onHide: function () {
        (clearInterval(r), this.setWechatUserInfo(null));
      },
      computed: m({}, (0, u.mapState)("wechat", ["wechatUserInfo"])),
      methods: m(m(m(m({}, (0, u.mapActions)("wechat", ["GetWechatUser", "GetWxSign"])), (0, u.mapActions)("alarm", ["SetWechatOn"])), (0, u.mapMutations)("wechat", ["setWechatUserInfo"])), {}, {
        l: function (e) {
          return c.$t(e);
        },
        copy: function (e) {
          uni.setClipboardData({
            data: e,
            showToast: !1,
            success: function () {
              (0, _.qzwlToast)("\u5185\u5bb9\u5df2\u590d\u5236");
            }
          });
        },
        saveQRCode: function () {
          uni.saveImageToPhotosAlbum({
            filePath: this.cdn + "/draw/qzwl-qrCode.png",
            success: function (e) {
              (0, _.qzwlToast)(c.$t("tel-pay.wx-mp.save-qr"), "none");
            }
          });
        },
        preview: function () {
          uni.previewImage({
            current: this.cdn + "/draw/qzwl-qrCode.png",
            urls: [this.cdn + "/draw/qzwl-qrCode.png"],
            longPressActions: {
              itemList: [c.$t("tel-pay.wx-save-img")],
              success: function (e) {
                uni.saveImageToPhotosAlbum({
                  filePath: this.cdn + "/draw/qzwl-qrCode.png",
                  success: function (e) {
                    (0, _.qzwlToast)(c.$t("tel-pay.wx-mp.save-qr"), "none");
                  },
                  fail: function (e) {
                    (0, _.qzwlToast)(c.$t("tel-pay.wx-save-qr-fail"), "none");
                  }
                });
              },
              fail: function (t) {
                e("log", t.errMsg, " at pagesFunc/terminal/alerts-set/wx-mp.nvue:139");
              }
            }
          });
        },
        wechatChange: function () {
          var e = this;
          return (0, s.default)(i.default.mark(function t() {
            return i.default.wrap(function (t) {
              for (; ; ) switch (t.prev = t.next) {
                case 0:
                  uni.login({
                    provider: "weixin",
                    onlyAuthorize: !0,
                    success: (function () {
                      var t = (0, s.default)(i.default.mark(function t(n) {
                        var a, s;
                        return i.default.wrap(function (t) {
                          for (; ; ) switch (t.prev = t.next) {
                            case 0:
                              return (t.next = 2, e.GetWechatUser({
                                code: n.code,
                                type: 1
                              }));
                            case 2:
                              if (!(a = t.sent).succeeded) {
                                t.next = 16;
                                break;
                              }
                              return (t.next = 6, e.SetWechatOn(m(m({}, a.data), {}, {
                                id: e.wechatId
                              })));
                            case 6:
                              if (!(s = t.sent).succeeded) {
                                t.next = 13;
                                break;
                              }
                              return ((0, _.qzwlToast)(s.msg, "none"), r = setTimeout(function () {
                                uni.navigateBack();
                              }, 1500), t.abrupt("return"));
                            case 13:
                              (0, _.qzwlToast)(s.msg, "none");
                            case 14:
                              t.next = 17;
                              break;
                            case 16:
                              (0, _.qzwlToast)(a.msg, "none");
                            case 17:
                            case "end":
                              return t.stop();
                          }
                        }, t);
                      }));
                      return function (e) {
                        return t.apply(this, arguments);
                      };
                    })(),
                    fail: function (e) {
                      (0, _.qzwlToast)(c.$t("alarm-setup.bindwx-faild"), "none");
                    }
                  });
                case 1:
                case "end":
                  return t.stop();
              }
            }, t);
          }))();
        }
      })
    };
    t.default = h;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
