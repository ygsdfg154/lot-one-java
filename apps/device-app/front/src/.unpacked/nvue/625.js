// webpack 模块 625  [nvue]
// 出现于: pagesPay/list/indent.js
const __r = require('./__runtime.js').wrap();
(function (t, e, o) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var i = r(require("@/.unpacked/nvue/22.js")), n = r(require("@/.unpacked/nvue/23.js")), a = r(require("@/.unpacked/nvue/5.js")), u = require("vuex"), l = r(require("../../common/config.nvue.js"));
  function c(t, e) {
    var o = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(t);
      (e && (r = r.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), o.push.apply(o, r));
    }
    return o;
  }
  function s(t) {
    for (var e = 1; e < arguments.length; e++) {
      var o = null != arguments[e] ? arguments[e] : {};
      e % 2 ? c(Object(o), !0).forEach(function (e) {
        (0, a.default)(t, e, o[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o)) : c(Object(o)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e));
      });
    }
    return t;
  }
  var p = getApp().globalData, d = {
    components: {},
    data: function () {
      return {
        cdn: l.default.cdn
      };
    },
    onLoad: function () {
      (this.setListNeedRefresh(!0), this.fetchData());
    },
    onPullDownRefresh: function () {
      (this.setListNeedRefresh(!0), this.fetchData());
    },
    onReachBottom: function () {
      "loading" != this.status && this.fetchData();
    },
    computed: s({}, (0, u.mapState)("order", ["orderList", "page", "status", "listNeedRefresh"])),
    methods: s(s(s({}, (0, u.mapActions)("order", ["GetTopupOrderPage"])), (0, u.mapMutations)("order", ["setListNeedRefresh"])), {}, {
      l: function (t) {
        return p.$t(t);
      },
      fetchData: function () {
        var t = this;
        return (async function () {
          (await t.GetTopupOrderPage(), uni.stopPullDownRefresh());
        })();
      },
      goDetail: function (t) {
        uni.navigateTo({
          url: "/pagesPay/list/specifics?id=" + t.id
        });
      },
      contactService: function () {
        "nomore" == this.status && uni.navigateTo({
          url: "/pagesMore/my/support"
        });
      }
    })
  };
  e.default = d;
})(module, exports, __r);
