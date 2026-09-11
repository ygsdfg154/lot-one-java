// webpack 模块 652  [nvue]
// 出现于: pagesFunc/terminal/device-card.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = a(require("../../common/config.nvue.js")), d = (a(require("moment")), require("vuex")), u = require("../../common/utils.nvue.js");
    function _(e, t) {
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
        t % 2 ? _(Object(n), !0).forEach(function (t) {
          (0, s.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var c = getApp().globalData, m = {
      data: function () {
        return {
          cdn: o.default.cdn,
          iccid: "",
          selectedIccid: "",
          providerCode: "",
          cardInfo: null
        };
      },
      computed: l(l({}, (0, d.mapGetters)(["selectedTerminal", "userId", "userType", "isAuditMode", "sysInfo", "access_token", "isAuditMode"])), {}, {
        disabled: function () {
          return !this.cardInfo || !this.iccid.trim();
        },
        payShow: function () {
          return !!this.providerCode && !this.isAuditMode;
        }
      }),
      onLoad: function (e) {
        this.iccid = e.iccid || this.selectedTerminal.iccid || "";
      },
      onShow: function () {
        this.iccid && this.getSimInfo();
      },
      onHide: function () {
        this.clearSimInfo();
      },
      methods: l(l({}, (0, d.mapActions)("packageInfo", ["GetSimInfo"])), {}, {
        l: function (e) {
          return c.$t(e);
        },
        n: function (e) {
          return c.$isNull(e);
        },
        gotoPay: function () {
          (0, u.qzGotoWx)({
            id: this.selectedTerminal.id,
            url: ("/pagesPay/card/index?iccid=").concat(this.iccid),
            access_token: this.access_token
          });
        },
        getSimInfo: function () {
          var t = this;
          return (0, i.default)(r.default.mark(function n() {
            var a;
            return r.default.wrap(function (n) {
              for (; ; ) switch (n.prev = n.next) {
                case 0:
                  if (!new RegExp("[\\u4E00-\\u9FFF]+", "g").test(t.iccid)) {
                    n.next = 5;
                    break;
                  }
                  return ((0, u.qzwlToast)(c.$t("common.please.chinese"), "none"), t.cardInfo = null, n.abrupt("return"));
                case 5:
                  if ((t.iccid = t.iccid.trim(), 20 === t.iccid.length)) {
                    n.next = 10;
                    break;
                  }
                  return ((0, u.qzwlToast)(c.$t("common.please.valid.ICCID"), "none"), t.cardInfo = null, n.abrupt("return"));
                case 10:
                  return (n.next = 12, t.GetSimInfo({
                    iccid: t.iccid ? t.iccid.trim() : t.iccid
                  }));
                case 12:
                  (a = n.sent, e("log", "result.data", a.data, " at pagesFunc/terminal/device-card.nvue:227"), a.succeeded && (t.cardInfo = a.data, t.selectedIccid = a.data.iccid, t.providerCode = a.data.providerCode));
                case 15:
                case "end":
                  return n.stop();
              }
            }, n);
          }))();
        },
        copy: function (e) {
          uni.setClipboardData({
            data: e,
            showToast: !1,
            success: function () {
              (0, u.qzwlToast)("\u5185\u5bb9\u5df2\u590d\u5236");
            }
          });
        },
        clearSimInfo: function () {
          (this.selectedIccid = "", this.cardInfo = null);
        },
        setProgress: function (e, t) {
          var n = (e / t * 100).toFixed(2);
          return n || 0;
        }
      })
    };
    t.default = m;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
