// webpack 模块 677  [nvue]
// 出现于: pagesFunc/terminal/remote-setup/list.js
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
        command: {
          0: p.$t("remote.set-succeed"),
          1: p.$t("remote.set-not-connected"),
          2: p.$t("remote.set-error"),
          3: p.$t("remote.set-timeout"),
          5: p.$t("remote.set-nonsupport"),
          6: p.$t("remote.set-protocol-error"),
          8: p.$t("remote.set-fail"),
          10: p.$t("remote.set-no-answer"),
          11: p.$t("remote.set-param-error"),
          12: p.$t("remote.set-delayed-delivery"),
          13: p.$t("remote.set-unsent")
        }
      };
    },
    computed: s(s(s({}, (0, u.mapState)("remoteSet", ["handleList", "page", "status", "listNeedRefresh"])), (0, u.mapGetters)(["selectedTerminal"])), (0, u.mapState)("timingRefresh", ["remoteListRefresh"])),
    onLoad: function () {
      this.remoteListRefresh && (this.setListNeedRefresh(!0), this.fetchData(), this.setRemoteListRefresh(!1), p.$remote(3e5));
    },
    onReachBottom: function () {
      this.fetchData();
    },
    onPullDownRefresh: function () {
      (this.setListNeedRefresh(!0), this.fetchData());
    },
    methods: s(s(s(s({}, (0, u.mapActions)("remoteSet", ["GetCommandRecord"])), (0, u.mapMutations)("remoteSet", ["setListNeedRefresh"])), (0, u.mapMutations)("timingRefresh", ["setRemoteListRefresh"])), {}, {
      l: function (t) {
        return p.$t(t);
      },
      fetchData: function () {
        var t = this;
        return (async function () {
          (await t.GetCommandRecord({
            terminalId: t.selectedTerminal.id
          }), uni.stopPullDownRefresh());
        })();
      }
    })
  };
  e.default = d;
})(module, exports, __r);
