// webpack 模块 529  [nvue]
// 出现于: pages/msg/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/5.js")), i = require("vuex"), o = r(require("../../common/config.nvue.js")), s = r(require("../../components/OrgMsg/OrgMsg.nvue")), d = r(require("../../components/TerminalMsg/TerminalMsg.nvue"));
  function u(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r));
    }
    return n;
  }
  function l(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = null != arguments[t] ? arguments[t] : {};
      t % 2 ? u(Object(n), !0).forEach(function (t) {
        (0, a.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var c = getApp().globalData, _ = {
    components: {
      OrgMsg: s.default,
      TerminalMsg: d.default
    },
    computed: l(l({}, (0, i.mapGetters)(["userType", "sysInfo", "selectedTerminal", "isAuthenticated"])), (0, i.mapState)("timingRefresh", ["msgRefresh"])),
    data: function () {
      return {
        cdn: o.default.cdn,
        deleteShow: !1,
        filterShow: !1,
        searchValue: ""
      };
    },
    onLoad: function () {},
    onShow: function () {
      var e = this;
      1 != this.userType && this.msgRefresh && this.$nextTick(function () {
        (e.$refs.TerminalMsg.fetchData({
          value: !0
        }), e.setMsgRefresh(!1), c.$msg(3e5));
      });
    },
    onPullDownRefresh: function () {
      (1 == this.userType ? this.$refs.OrgMsg.fetchData() : this.$refs.TerminalMsg.fetchData({
        value: !0
      }), this.deleteShow = !1);
    },
    onReachBottom: function () {
      1 != this.userType && this.$refs.TerminalMsg.fetchData({
        value: !1
      });
    },
    methods: l(l({}, (0, i.mapMutations)("timingRefresh", ["setMsgRefresh"])), {}, {
      l: function (e) {
        return c.$t(e);
      },
      gotoPages: function (e) {
        if (e) {
          if (this.deleteShow || !this.selectedTerminal) return;
          uni.navigateTo({
            url: e
          });
        } else uni.navigateBack();
      },
      setDeleteShow: function (e) {
        e ? this.deleteShow = e : this.$refs.TerminalMsg.setDeleteShowTerminal() && (this.deleteShow = !this.deleteShow);
      },
      msgFilter: function (e) {
        this.deleteShow || (this.filterShow = e || !this.filterShow);
      },
      searchHandler: function (e) {
        this.$refs.TerminalMsg.fetchData({
          value: !0,
          terminalNo: e
        });
      },
      clearHandler: function () {
        this.$refs.TerminalMsg.fetchData({
          value: !0,
          terminalNo: ""
        });
      }
    })
  };
  t.default = _;
})(module, exports, __r);
