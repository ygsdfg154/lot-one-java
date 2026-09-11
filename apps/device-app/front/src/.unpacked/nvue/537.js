// webpack 模块 537  [nvue]
// 出现于: pages/msg/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var r = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var a = r(require("@/.unpacked/nvue/22.js")), i = r(require("@/.unpacked/nvue/23.js")), o = r(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = r(require("../../common/config.nvue.js")), u = r(require("../../components/TerminalFilter/TerminalFilter.nvue")), l = require("../../common/utils.nvue.js");
    function c(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, r));
      }
      return n;
    }
    function _(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? c(Object(n), !0).forEach(function (t) {
          (0, o.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var m = getApp().globalData, f = {
      components: {
        TerminalFilter: u.default
      },
      computed: _(_({}, (0, s.mapState)("alarmLog", ["alarmList", "status", "listNeedRefresh"])), (0, s.mapGetters)(["userType", "selectedTerminal", "sysInfo"])),
      data: function () {
        return {
          cdn: d.default.cdn,
          isShowAllDelete: !1,
          filterData: null
        };
      },
      props: ["deleteShow", "filterShow"],
      mounted: function () {},
      methods: _(_(_(_({}, (0, s.mapActions)("alarmLog", ["GetAlermList", "GetAlarmStatistics", "BatchDeleteAlarm", "AllDeleteAlarm", "DelAlermLog"])), (0, s.mapActions)("device", ["GetGeocode"])), (0, s.mapMutations)("alarmLog", ["setListNeedRefresh", "setDeleteShowList", "initState", "setListAddress"])), {}, {
        l: function (e) {
          return m.$t(e);
        },
        fetchData: function (e) {
          var t = this;
          return (0, i.default)(a.default.mark(function n() {
            var r;
            return a.default.wrap(function (n) {
              for (; ; ) switch (n.prev = n.next) {
                case 0:
                  if ((t.filterData = null, t.setListNeedRefresh(e.value), t.selectedTerminal)) {
                    n.next = 6;
                    break;
                  }
                  return (t.initState(), uni.stopPullDownRefresh(), n.abrupt("return"));
                case 6:
                  return (r = {
                    terminalId: t.selectedTerminal.id
                  }, e.param && (r = {
                    terminalId: t.selectedTerminal.id,
                    alarmTypes: e.param.alarmTypes,
                    beginTime: e.param.beginTime,
                    endTime: e.param.endTime
                  }, t.filterData = r), r = _(_({}, r), {}, {
                    terminalNo: e.terminalNo
                  }), n.next = 11, t.GetAlermList(r));
                case 11:
                  uni.stopPullDownRefresh();
                case 12:
                case "end":
                  return n.stop();
              }
            }, n);
          }))();
        },
        getItemAddress: function (e) {
          var t = this;
          return (async function () {
            var r;
            (r = await t.GetGeocode({
              longitude: e.beginLngWGS84,
              latitude: e.beginLatWGS84
            }), t.setListAddress({
              id: e.id,
              address: r.address
            }));
          })();
        },
        setDeleteShowTerminal: function () {
          return 1 != this.userType && (!!this.alarmList.length || ((0, l.qzwlToast)("\u5f53\u524d\u65e0\u53ef\u5220\u9664\u7684\u544a\u8b66\u6d88\u606f", "none"), !1));
        },
        gotoAlarmDetail: function (e) {
          this.deleteShow ? this.setDeleteShowList(e) : uni.navigateTo({
            url: ("/pagesMore/message/statement?id=").concat(e.id)
          });
        },
        setShowAllDeleteList: function () {
          (this.isShowAllDelete ? this.setDeleteShowList() : this.setDeleteShowList({
            all: !0
          }), this.isShowAllDelete = !this.isShowAllDelete);
        },
        itemDeleteChange: function (e) {
          var t = this, n = (function () {
            var n = async function () {
              (await t.DelAlermLog({
                id: e.id
              })).succeeded && ((0, l.qzwlToast)(m.$t("common.deleted.success"), "none"), t.fetchData({
                value: !0
              }));
            };
            return function () {
              return n.apply(this, arguments);
            };
          })();
          uni.showModal({
            title: m.$t("common.confirm-delete"),
            cancelText: m.$t("common.cancel"),
            confirmText: m.$t("common.confirm"),
            success: function (e) {
              e.cancel || n();
            }
          });
        },
        deleteMsg: function () {
          var e = this, t = (function () {
            var t = async function () {
              var n;
              n = e.alarmList.map(function (e) {
                if (e.isShowDelete) return e.id;
              }).filter(function (e) {
                return !!e;
              });
              (await e.BatchDeleteAlarm({
                data: n
              })).succeeded && ((0, l.qzwlToast)(m.$t("common.deleted.success"), "none"), e.$emit("setDeleteShow", !1), e.fetchData({
                value: !0
              }));
            };
            return function () {
              return t.apply(this, arguments);
            };
          })();
          uni.showModal({
            title: m.$t("common.confirm-delete"),
            cancelText: m.$t("common.cancel"),
            confirmText: m.$t("common.confirm"),
            success: function (e) {
              e.cancel || t();
            }
          });
        },
        allDeleteMsg: function () {
          var t = this;
          return (async function () {
            var r;
            (r = (function () {
              var n = async function () {
                var r;
                (r = await t.AllDeleteAlarm({
                  id: t.selectedTerminal.id
                }), e("log", r, "result", " at pages/msg/components/terminalMsg.nvue:294"), r.succeeded && ((0, l.qzwlToast)(m.$t("common.all.clear.success"), "none"), t.$emit("setDeleteShow", !1), t.fetchData({
                  value: !0
                })));
              };
              return function () {
                return n.apply(this, arguments);
              };
            })(), uni.showModal({
              title: m.$t("common.confirm-clear"),
              cancelText: m.$t("common.cancel"),
              confirmText: m.$t("common.confirm"),
              success: function (e) {
                e.cancel || r();
              }
            }));
          })();
        },
        filterClose: function () {
          this.$emit("msgFilter", !1);
        }
      }),
      watch: {
        deleteShow: {
          immediate: !0,
          handler: function () {
            this.deleteShow || (this.setDeleteShowList(), this.isShowAllDelete = !1);
          }
        }
      }
    };
    t.default = f;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
