// webpack 模块 701  [nvue]
// 出现于: pagesFunc/terminal/alerts-set/phone.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), o = a(require("@/.unpacked/nvue/5.js")), s = (a(require("../../common/config.nvue.js")), require("vuex")), d = require("../../common/utils.nvue.js");
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
  var _ = getApp().globalData, m = {
    data: function () {
      return {
        alarmTelList: [],
        id: null,
        telRemain: ""
      };
    },
    onShow: function () {
      this.fetchData();
    },
    computed: l(l({}, (0, s.mapGetters)(["isAuditMode", "selectedTerminal", "access_token"])), {}, {
      telSum: function () {
        var e = 0;
        return !(this.alarmTelList.reduce(function (t, n) {
          return e = n ? ++e : e;
        }, 0) >= 1);
      }
    }),
    methods: l(l({}, (0, s.mapActions)("alarm", ["GetAlarmSettings", "SetAlarmTel"])), {}, {
      l: function (e) {
        return _.$t(e);
      },
      fetchData: function (e) {
        var t = this;
        return (async function () {
          var n;
          (n = await t.GetAlarmSettings()).succeeded && (t.alarmTelList = [n.data.telPhoneNo1, n.data.telPhoneNo2, n.data.telPhoneNo3, n.data.telPhoneNo4, n.data.telPhoneNo5, n.data.telPhoneNo6], t.telRemain = n.data.telRemain, t.id = n.data.id);
        })();
      },
      saveAlarmTel: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          var n;
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                if (!e.telSum) {
                  t.next = 2;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(_.$t("common.save.one.tel"), "none"));
              case 2:
                if ((n = e.alarmTelList.filter(function (e) {
                  return e;
                }), n.every(function (e) {
                  return uni.$u.test.mobile(e);
                }))) {
                  t.next = 6;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(_.$t("common.please.valid.mobile.tel"), "none"));
              case 6:
                if (!(Array.from(new Set(n)).length < n.length)) {
                  t.next = 9;
                  break;
                }
                return t.abrupt("return", (0, d.qzwlToast)(_.$t("common.please.equal.tel"), "none"));
              case 9:
                return (t.next = 11, e.SetAlarmTel({
                  id: e.id,
                  alarmTelList: e.alarmTelList
                }));
              case 11:
                if (!t.sent.succeeded) {
                  t.next = 16;
                  break;
                }
                return (t.next = 15, e.fetchData(!0));
              case 15:
                (0, d.qzwlToast)(_.$t("common.save.success"), "none");
              case 16:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      },
      gotoTopup: function () {
        (0, d.qzGotoWx)({
          id: this.selectedTerminal.id,
          url: "/pagesPay/value-added/index?type=3&alarm=1",
          access_token: this.access_token
        });
      }
    })
  };
  t.default = m;
})(module, exports, __r);
