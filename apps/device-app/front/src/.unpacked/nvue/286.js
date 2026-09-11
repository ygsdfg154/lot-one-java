// webpack 模块 286  [nvue]
// 出现于: pagesCore/login/bind-tel-more.js, pagesCore/login/bind-tel.js, pagesCore/login/find-pas.js, pagesCore/login/logout.js, pagesCore/login/register.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = (a(require("../../common/config.nvue.js")), require("../../common/utils.nvue.js"));
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
  var _ = getApp().globalData, c = {
    props: ["phoneNumber"],
    data: function () {
      return {
        captchaId: "",
        captchaCode: "",
        base64: ""
      };
    },
    mounted: function () {
      this.getImgCode();
    },
    methods: l(l({}, (0, s.mapActions)("account", ["GetSendImgCode", "SendSmsCode"])), {}, {
      getImgCode: function () {
        var e = this;
        return (async function () {
          var n;
          (n = await e.GetSendImgCode()).succeeded && (e.captchaId = n.data.captchaId, e.base64 = n.data.base64);
        })();
      },
      closeImgCaptchaShow: function () {
        (uni.hideKeyboard(), this.captchaId = "", this.captchaCode = "", this.base64 = "", this.$emit("imgCaptchaChange", !1));
      },
      confirmImgCode: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if (e.captchaCode) {
                  t.next = 2;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)("\u8bf7\u8f93\u5165\u56fe\u5f62\u9a8c\u8bc1\u7801", "none"));
              case 2:
                return (t.next = 4, e.SendSmsCode({
                  phoneNumber: e.phoneNumber,
                  captchaId: e.captchaId,
                  captchaCode: e.captchaCode
                }));
              case 4:
                if (!t.sent.succeeded) {
                  t.next = 13;
                  break;
                }
                (uni.hideKeyboard(), e.captchaId = "", e.captchaCode = "", e.base64 = "", e.$emit("smsCodeChange"), t.next = 16);
                break;
              case 13:
                return (t.next = 15, _.$sleep(500));
              case 15:
                e.getImgCode();
              case 16:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      }
    })
  };
  t.default = c;
})(module, exports, __r);
