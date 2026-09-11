// webpack 模块 672  [nvue]
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
        primaryColor: d.default.primaryColor,
        cdn: d.default.cdn,
        deviceCurrent: 0,
        limit: 100,
        terminalLoadStatus: "loadmore",
        terminalState: "",
        tabsStyle: {
          color: d.default.primaryColor
        },
        inactiveStyle: {
          color: "#A3A3A3"
        },
        deviceStateTab: [{
          id: 0,
          name: _.$t("common.device.status.all")
        }, {
          id: 1,
          name: _.$t("common.device.status.online")
        }, {
          id: 2,
          name: _.$t("common.device.status.offline")
        }, {
          id: 3,
          name: _.$t("common.device.status.unused")
        }]
      };
    },
    computed: c(c(c({}, (0, s.mapState)("device", ["terminalsPage"])), (0, s.mapGetters)(["terminals", "userType", "sysInfo", "selectedTerminal", "appConfig"])), {}, {
      terminalKey: function () {
        if (this.selectedTerminal) return this.selectedTerminal.terminalNo;
      }
    }),
    props: ["searchValue"],
    mounted: function () {
      this.init();
    },
    methods: c(c(c(c(c({}, (0, s.mapMutations)("device", ["setSelectedDevice", "setTerminalsPage", "clearSelectedDevice"])), (0, s.mapMutations)("terminal", ["clearUseDeviceInfo"])), (0, s.mapActions)("device", ["UnBindTerminal", "GetDeviceStatistics"])), (0, s.mapActions)("terminal", ["GetTerminalList", "GetTerminalInfo"])), {}, {
      l: function (e) {
        return _.$t(e);
      },
      init: function () {
        (this.terminalLoadStatus = "loadmore", this.setTerminalsPage(1), this.refresh(this.terminalsPage, this.limit, !0), this.terminalLoadStatus = this.terminals.length < 100 ? "nomore" : "loadmore", this.deviceStateNum());
      },
      pullDownRefresh: function () {
        (this.terminalLoadStatus = "loadmore", this.setTerminalsPage(1), this.refresh(this.terminalsPage, this.limit, !0), this.deviceStateNum(), uni.stopPullDownRefresh());
      },
      reachBottom: function () {
        "nomore" != this.terminalLoadStatus && "loading" != this.terminalLoadStatus && (this.setTerminalsPage(this.terminalsPage + 1), this.refresh(this.terminalsPage, this.limit));
      },
      terminalBindRefresh: function () {
        (this.terminalLoadStatus = "loadmore", this.setTerminalsPage(1), this.deviceStateNum(), this.refresh(this.terminalsPage, this.limit, !0));
      },
      badgeState: function (e) {
        return (0, u.badgeState)(e);
      },
      setIconCode: function (e, t) {
        return (0, u.getTerminalIconCode)(e, t).code;
      },
      selectTerminal: function (e) {
        var t = this.terminals.find(function (t) {
          return t.terminalNo == e.terminalNo;
        });
        if (null == t) return (0, u.qzwlToast)(_.$t("device.not.online"), "none");
        (this.clearSelectedDevice(), this.setSelectedDevice(t), uni.navigateBack());
      },
      showMore: function (e) {
        var t, n = this;
        uni.showActionSheet({
          itemList: [("").concat(_.$t("common.unbind.device"))],
          itemColor: d.default.erorColor,
          success: (t = (0, r.default)(i.default.mark(function t(a) {
            return i.default.wrap(function (t) {
              for (; ; ) switch (t.prev = t.next) {
                case 0:
                  return (t.next = 2, n.UnBindTerminal({
                    id: e.id
                  }));
                case 2:
                  if (!t.sent.succeeded) {
                    t.next = 9;
                    break;
                  }
                  return (t.next = 6, n.deviceStateNum());
                case 6:
                  return (t.next = 8, _.$sleep(100));
                case 8:
                  (0, u.qzwlToast)(_.$t("common.unbind-success"), "none");
                case 9:
                case "end":
                  return t.stop();
              }
            }, t);
          })), function (e) {
            return t.apply(this, arguments);
          })
        });
      },
      deviceStateChange: function (e) {
        (this.terminalState = ["", 1, 2, 0][e.id], this.deviceCurrent = e.id, this.terminalLoadStatus = "loadmore", this.setTerminalsPage(1), this.refresh(this.terminalsPage, this.limit, !0));
      },
      searchTerminals: function () {
        (this.terminalLoadStatus = "loadmore", this.setTerminalsPage(1), this.refresh(this.terminalsPage, this.limit, !0));
      },
      deviceStateNum: function () {
        var e = this;
        return (async function () {
          var n;
          (n = await e.GetDeviceStatistics()).succeeded && (e.deviceStateTab = [{
            id: 0,
            name: _.$t("common.device.status.all") + ("(").concat(n.data.totalCount, ")")
          }, {
            id: 1,
            name: _.$t("common.device.status.online") + ("(").concat(n.data.onlineCount, ")")
          }, {
            id: 2,
            name: _.$t("common.device.status.offline") + ("(").concat(n.data.offlineCount, ")")
          }, {
            id: 3,
            name: _.$t("common.device.status.unused") + ("(").concat(n.data.unusedCount, ")")
          }]);
        })();
      },
      refresh: function (e, t, n) {
        var a = this;
        return (async function () {
          var o;
          a.terminalLoadStatus = "loading";
          (o = await a.GetTerminalList({
            page: e,
            limit: t,
            concat: n,
            terminalState: a.terminalState,
            searchKey: a.searchValue
          }), uni.stopPullDownRefresh(), o.succeeded ? o.data.list.length ? a.terminalLoadStatus = 100 === o.data.list.length ? "loadmore" : "nomore" : a.terminalLoadStatus = "nomore" : (a.setTerminalsPage(1 == a.terminalsPage ? 1 : a.terminalsPage - 1), a.terminalLoadStatus = "nomore"));
        })();
      }
    })
  };
  t.default = m;
})(module, exports, __r);
