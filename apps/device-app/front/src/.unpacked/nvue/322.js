// webpack 模块 322  [nvue]
// 出现于: pages/ability/index.js, pages/home/home.js, pagesFunc/terminal/locate-mode/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/5.js")), i = a(require("../../common/config.nvue.js")), o = require("vuex"), s = require("../../common/utils.nvue.js");
    function d(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        (t && (a = a.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, a));
      }
      return n;
    }
    function u(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? d(Object(n), !0).forEach(function (t) {
          (0, r.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : d(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var l = {
      name: "payPopup",
      props: {
        message: {
          type: Object,
          default: {
            title: "",
            content: "",
            description: ""
          }
        },
        url: {
          type: String,
          default: ""
        },
        type: {
          type: String,
          default: ""
        }
      },
      data: function () {
        return {
          cdn: i.default.cdn
        };
      },
      computed: u(u({}, (0, o.mapGetters)(["sysInfo", "selectedTerminal", "access_token"])), {}, {
        mainTop: function () {
          uni.getSystemInfoSync().statusBarHeight;
          return {
            top: this.sysInfo.windowHeight / 5 + "px"
          };
        },
        imgTop: function () {
          return {
            top: this.sysInfo.windowHeight / 6 + "px"
          };
        }
      }),
      methods: u(u({}, (0, o.mapMutations)("device", ["setSimState"])), {}, {
        gotoPages: function (t) {
          ("iccid" == this.type && this.setSimState(!1), e("log", t, "gogo", " at components/payPopup.vue:106"), this.$emit("closeVipPopup"), t && ("iccid" != this.type ? (0, s.qzGotoWx)({
            id: this.selectedTerminal.id,
            url: this.url,
            access_token: this.access_token
          }) : uni.navigateTo({
            url: this.url
          })));
        }
      })
    };
    t.default = l;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
