// webpack 模块 638  [nvue]
// 出现于: pagesFunc/deviceInfo/set-icon.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var a = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = require("../../common/utils.nvue.js"), u = a(require("../../common/config.nvue.js"));
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
    data: function () {
      return {
        cdn: u.default.cdn,
        currentIconType: 1
      };
    },
    computed: l(l({}, (0, o.mapGetters)(["selectedTerminal", "appConfig"])), {}, {
      appIcons: function () {
        if (this.appConfig) return this.appConfig.appIcons;
      }
    }),
    onLoad: function (e) {
      this.currentIconType = e.iconType;
    },
    methods: l(l({}, (0, o.mapActions)("device", ["SetTerminalIcon"])), {}, {
      l: function (e) {
        return m.$t(e);
      },
      setTerminalIcon: function (e) {
        this.currentIconType = e.iconType;
      },
      putDeviceIcon: function () {
        var e = this;
        return (0, i.default)(r.default.mark(function t() {
          return r.default.wrap(function (t) {
            for (; ; ) switch (t.prev = t.next) {
              case 0:
                return (t.next = 2, e.SetTerminalIcon({
                  terminalId: e.selectedTerminal.id,
                  iconType: e.currentIconType
                }));
              case 2:
                if (!t.sent.succeeded) {
                  t.next = 8;
                  break;
                }
                return ((0, d.qzwlToast)(e.l("common.save.success"), "none"), t.next = 7, m.$sleep(1e3));
              case 7:
                uni.navigateBack();
              case 8:
              case "end":
                return t.stop();
            }
          }, t);
        }))();
      }
    })
  };
  t.default = c;
})(module, exports, __r);
