// webpack 模块 605  [nvue]
// 出现于: pagesMore/public/qzwl-authorize.js
const __r = require('./__runtime.js').wrap();
(function (t, e, r) {
  "use strict";
  var o = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var i = o(require("@/.unpacked/nvue/22.js")), n = o(require("@/.unpacked/nvue/23.js")), a = o(require("@/.unpacked/nvue/5.js")), c = require("vuex"), u = o(require("../../common/config.nvue.js"));
  function l(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(t);
      (e && (o = o.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), r.push.apply(r, o));
    }
    return r;
  }
  function s(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = null != arguments[e] ? arguments[e] : {};
      e % 2 ? l(Object(r), !0).forEach(function (e) {
        (0, a.default)(t, e, r[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : l(Object(r)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
      });
    }
    return t;
  }
  var p = {
    data: function () {
      return {
        cdn: u.default.cdn,
        url: ""
      };
    },
    computed: s({}, (0, c.mapGetters)([])),
    methods: s(s(s(s(s({}, (0, c.mapActions)("terminal", ["GetTerminalInfo"])), (0, c.mapActions)("user", ["GetSystemUserInfo"])), (0, c.mapMutations)("account", ["setLogedIn"])), (0, c.mapMutations)("sys", ["setAppMpShow"])), {}, {
      getInfo: function (t) {
        var e = this;
        return (async function () {
          await e.GetTerminalInfo({
            id: t
          });
          await e.GetSystemUserInfo();
          (e.setAppMpShow(!0), setTimeout(function () {
            uni.reLaunch({
              url: e.url
            });
          }, 1e3));
        })();
      }
    }),
    onLoad: function (t) {
      (this.url = t.url, this.setLogedIn({
        access_token: t.access_token
      }), this.getInfo(t.id));
    }
  };
  e.default = p;
})(module, exports, __r);
