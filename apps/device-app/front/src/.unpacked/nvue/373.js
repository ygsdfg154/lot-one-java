// webpack 模块 373  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = a(require("../../common/config.nvue.js")), u = require("../../common/utils.nvue.js");
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
          cdn: d.default.cdn,
          shareLocationShow: !1,
          selectTime: !1,
          shareTime: _.$t("common.0.5-day"),
          isToShare: !1,
          defaultIndex: [0],
          selectedTime: 720,
          code: "",
          wxBrowser: !1
        };
      },
      computed: c(c({}, (0, s.mapGetters)(["selectedTerminal", "userId"])), {}, {
        columns: function () {
          return [[{
            label: this.l("common.0.5-day"),
            time: 720
          }, {
            label: this.l("common.1-day"),
            time: 1440
          }, {
            label: this.l("common.3-day"),
            time: 4320
          }, {
            label: this.l("common.7-day"),
            time: 10080
          }]];
        }
      }),
      methods: c(c({}, (0, s.mapActions)("device", ["AddSharePosition"])), {}, {
        l: function (e) {
          return _.$t(e);
        },
        confirmShare: function () {
          var t = this;
          return (0, i.default)(r.default.mark(function n() {
            var a;
            return r.default.wrap(function (n) {
              for (; ; ) switch (n.prev = n.next) {
                case 0:
                  if (t.selectedTerminal.lon || t.selectedTerminal.lat) {
                    n.next = 2;
                    break;
                  }
                  return n.abrupt("return", (0, u.qzwlToast)("\u5f53\u524d\u8bbe\u5907\u65e0\u5b9a\u4f4d\u4fe1\u606f", "none"));
                case 2:
                  return (n.next = 4, t.AddSharePosition({
                    deviceId: t.selectedTerminal.id,
                    userId: t.userId,
                    duration: t.selectedTime
                  }));
                case 4:
                  (a = n.sent, e("log", a.data.code, "result", " at components/qzwlShare.nvue:124"), a.succeeded && a.data.code && (t.code = a.data.code, t.defaultIndex = [0], t.shareTime = _.$t("common.0.5-day"), t.selectedTime = 720, t.isToShare = !0));
                case 7:
                case "end":
                  return n.stop();
              }
            }, n);
          }))();
        },
        shareWx: function () {
          var t = ("").concat(d.default.sharePositionUrl, "?code=").concat(this.code);
          (e("log", t, "url", " at components/qzwlShare.nvue:163"), uni.share({
            provider: "weixin",
            type: 3,
            title: _.$t("common.share.locate"),
            scene: "WXSceneSession",
            mediaUrl: t,
            imageUrl: this.cdn + "/draw/qzwl-logo-108.png"
          }), this.isToShare = !1);
        },
        shareCopy: function () {
          var e = ("").concat(d.default.sharePositionUrl, "?code=").concat(this.code);
          (uni.setClipboardData({
            data: e,
            showToast: !1,
            success: function () {
              (0, u.qzwlToast)(_.$t("common.copy.success"), "none");
            }
          }), this.isToShare = !1);
        },
        confirmTime: function (e) {
          (this.selectTime = !1, this.shareTime = e.value[0].label, this.selectedTime = e.value[0].time);
        }
      })
    };
    t.default = m;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
