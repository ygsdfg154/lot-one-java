// webpack 模块 600  [nvue]
// 出现于: pagesMore/message/table.js
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
    data: function () {
      return {
        cdn: l.default.cdn,
        list: [],
        status: "loadmore",
        page: 1,
        alarmType: 0,
        current: 0
      };
    },
    computed: s({}, (0, u.mapGetters)(["userType", "selectedTerminal"])),
    onLoad: function (t) {
      (this.alarmType = t.alarmType, this.current = t.current, this.fetchData(this.alarmType, this.page));
    },
    onPullDownRefresh: function () {
      (this.status = "loadmore", this.list = [], this.fetchData(this.alarmType, 1));
    },
    onReachBottom: function () {
      "loading" != this.status && (this.page = this.page + 1, this.fetchData(this.alarmType, this.page));
    },
    methods: s(s({}, (0, u.mapActions)("alarmLog", ["GetAlermOrg"])), {}, {
      l: function (t) {
        return p.$t(t);
      },
      fetchData: function (t, e) {
        var o = this;
        return (0, n.default)(i.default.mark(function r() {
          var n;
          return i.default.wrap(function (r) {
            for (; ; ) switch (r.prev = r.next) {
              case 0:
                if ("nomore" != o.status) {
                  r.next = 2;
                  break;
                }
                return r.abrupt("return");
              case 2:
                return (o.status = "loading", r.next = 5, o.GetAlermOrg({
                  limit: 20,
                  page: e,
                  alarmType: t,
                  type: o.current
                }));
              case 5:
                (n = r.sent, o.status = "nomore", uni.stopPullDownRefresh(), n.succeeded && n.data.list.length ? (o.status = 20 === n.data.list.length ? "loadmore" : "nomore", o.list = o.list.concat(n.data.list)) : o.status = "nomore");
              case 9:
              case "end":
                return r.stop();
            }
          }, r);
        }))();
      },
      gotoMsgDetail: function (t) {}
    })
  };
  e.default = d;
})(module, exports, __r);
