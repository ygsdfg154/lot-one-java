// webpack 模块 668  [nvue]
// 出现于: pagesFunc/terminal/list/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var i = a(require("@/.unpacked/nvue/5.js")), r = require("vuex"), o = a(require("../../common/config.nvue.js")), s = (require("../../common/utils.nvue.js"), a(require("../../components/_unnamed/unknown-974.nvue"))), d = a(require("../../components/TerminalList/TerminalList.nvue"));
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
        (0, i.default)(e, t, n[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
      });
    }
    return e;
  }
  var c = getApp().globalData, _ = {
    components: {
      Bind: s.default,
      TerminalList: d.default
    },
    data: function () {
      return {
        cdn: o.default.cdn,
        titleColor: o.default.titleColor,
        primaryColor: o.default.primaryColor,
        searchValue: "",
        isBind: !1
      };
    },
    computed: l(l({}, (0, r.mapGetters)(["userType", "sysInfo", "enterpriseId", "enterpriseInfo", "refreshTerminalPage"])), {}, {
      enterpriseName: function () {
        var e, t = this;
        if (1 == this.userType) return (this.enterpriseId && (e = this.enterpriseInfo.find(function (e) {
          return e.id == t.enterpriseId;
        })), this.enterpriseId || (e = this.enterpriseInfo.reduce(function (e, t) {
          return t.id.length < e.id.length ? t : e;
        })), e ? e.name.length <= 4 ? e.name : e.name.substring(0, 4) + "..." : void 0);
      },
      marginTop: function () {
        return this.sysInfo.statusBarHeight + 44 + "px";
      }
    }),
    onLoad: function (e) {
      e.bind && (this.isBind = !!e.bind);
    },
    onShow: function () {
      var e = this;
      this.refreshTerminalPage && (this.setRefreshTerminalPage(!1), this.$nextTick(function () {
        e.$refs.TerminalList.pullDownRefresh();
      }));
    },
    onPullDownRefresh: function () {
      this.$refs.TerminalList.pullDownRefresh();
    },
    onReachBottom: function () {
      this.$refs.TerminalList.reachBottom();
    },
    methods: l(l({}, (0, r.mapMutations)("account", ["setRefreshTerminalPage"])), {}, {
      l: function (e) {
        return c.$t(e);
      },
      searchHandler: function (e) {
        (this.searchValue = e, this.$refs.TerminalList.searchTerminals());
      },
      gotoRight: function () {
        2 == this.userType && this.isBindChange(!0);
      },
      gotoPages: function (e) {
        e ? uni.navigateTo({
          url: e
        }) : uni.navigateBack();
      },
      isBindChange: function (e) {
        this.isBind = e;
      },
      bindRefresh: function () {
        this.$refs.TerminalList.terminalBindRefresh();
      }
    })
  };
  t.default = _;
})(module, exports, __r);
