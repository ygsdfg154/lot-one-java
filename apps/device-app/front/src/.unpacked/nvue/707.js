// webpack 模块 707  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/wx.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = a(require("../../common/config.nvue.js")), d = require("../../common/utils.nvue.js"), u = require("vuex");
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
  var m = getApp().globalData, c = {
    data: function () {
      return {
        cdn: o.default.cdn,
        wechatName: "",
        wechatImgurl: "",
        wechatId: 0,
        bindedShow: !0
      };
    },
    onLoad: function (e) {
      (this.wechatName = e.wechatName, this.wechatImgurl = e.wechatImgurl, this.wechatId = e.wechatId);
    },
    onHide: function () {
      clearInterval(void 0);
    },
    computed: l({}, (0, u.mapGetters)(["isAuditMode", "selectedTerminal", "access_token"])),
    methods: l(l({}, (0, u.mapActions)("alarm", ["SetWechatAlarm"])), {}, {
      l: function (e) {
        return m.$t(e);
      },
      unbindWx: function () {
        var e = this;
        return (async function () {
          (await e.SetWechatAlarm({
            id: e.wechatId
          })).succeeded && ((0, d.qzwlToast)(m.$t("tel-pay.wx-unbind-success")), e.bindedShow = !1, uni.navigateBack());
        })();
      },
      confirmBind: function () {
        var e = this;
        uni.showModal({
          title: m.$t("tel-pay.wx-unbind-account"),
          cancelText: m.$t("common.cancel"),
          confirmText: m.$t("common.ok"),
          success: function (t) {
            t.cancel || e.unbindWx();
          }
        });
      },
      payWxAlarm: function () {
        (0, d.qzGotoWx)({
          id: this.selectedTerminal.id,
          url: "/pagesPay/value-added/index?type=3&alarm=0",
          access_token: this.access_token
        });
      }
    })
  };
  t.default = c;
})(module, exports, __r);
