// webpack 模块 622  [nvue]
// 出现于: pagesPay/list/indent-device.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = a(require("../../common/config.nvue.js")), u = require("../../common/utils.nvue.js");
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
      components: {},
      data: function () {
        return {
          cdn: d.default.cdn,
          orderList: [],
          status: "loadmore",
          page: 1,
          limit: 20
        };
      },
      onLoad: function () {
        (this.status = "loadmore", this.orderList = [], this.page = 1, this.fetchData());
      },
      onPullDownRefresh: function () {
        (this.status = "loadmore", this.orderList = [], this.page = 1, this.fetchData());
      },
      onReachBottom: function () {
        "nomore" != this.status && "loading" != this.status && this.fetchData();
      },
      computed: l({}, (0, o.mapGetters)(["selectedTerminal"])),
      methods: l(l({}, (0, o.mapActions)("order", ["GetDeviceOrderPage"])), {}, {
        l: function (e) {
          return m.$t(e);
        },
        fetchData: function () {
          var t = this;
          return (async function () {
            var a, i;
            t.status = "loading";
            (a = await t.GetDeviceOrderPage({
              page: t.page,
              limit: t.limit,
              terminalId: t.selectedTerminal.id
            }), e("log", "result", a, " at pagesPay/list/indent-device.nvue:99"), a.succeeded && a.data.list.length ? (i = a.data.list.map(function (e) {
              return (e.orderStatus = (0, u.orderStatus)(e.status), e);
            }), t.orderList = t.orderList.concat(i), t.status = t.orderList.length < a.data.count ? "loadmore" : "nomore", t.page = t.page + 1) : t.status = "nomore", uni.stopPullDownRefresh());
          })();
        }
      })
    };
    t.default = c;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
