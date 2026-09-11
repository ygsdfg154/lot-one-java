// webpack 模块 565  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/22.js")), i = r(require("@/.unpacked/nvue/23.js")), o = r(require("@/.unpacked/nvue/5.js")), s = r(require("../../common/config.nvue.js")), d = require("vuex"), u = require("../../common/utils.nvue.js");
  function l(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      (t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r));
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
  var _ = {
    data: function () {
      return {
        cdn: s.default.cdn
      };
    },
    computed: c(c({}, (0, d.mapGetters)(["userType", "activationState", "valueAddedConfig", "sysInfo", "selectedTerminal", "access_token"])), {}, {
      topHeight: function () {
        return this.sysInfo.statusBarHeight + "px";
      },
      overlayStyle: function () {
        return 3 != this.userType ? {
          position: "fixed",
          top: 0,
          left: 0
        } : {};
      },
      mainTop: function () {
        return {
          top: "300rpx"
        };
      }
    }),
    methods: c(c(c({}, (0, d.mapActions)("account", ["SignOut"])), (0, d.mapMutations)("device", ["setActivationState", "setInfoBoxShow"])), {}, {
      tryOut: function () {
        (this.setActivationState(1), this.setInfoBoxShow(!0), uni.showTabBar());
      },
      gotoMp: function () {
        (0, u.qzGotoWx)({
          id: this.selectedTerminal.id,
          url: "/pagesPay/appreciation/index",
          access_token: this.access_token
        });
      },
      closeActivatePopup: function () {
        var e = this;
        return (async function () {
          await e.SignOut();
          uni.reLaunch({
            url: "/pagesCore/login/index"
          });
        })();
      }
    })
  };
  t.default = _;
})(module, exports, __r);
