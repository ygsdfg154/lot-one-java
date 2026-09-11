// webpack 模块 648  [nvue]
// 出现于: pagesFunc/terminal/corral/list.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
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
    data: function () {
      return {
        cdn: d.default.cdn,
        fenceList: [],
        item: null,
        iconPath: ""
      };
    },
    onLoad: function () {
      var e = (0, u.getTerminalIconCode)(this.selectedTerminal.iconType, this.appConfig.icons);
      this.iconPath = ("").concat(this.cdn, "/ikon/device/").concat(e.code, "-1.png");
    },
    onShow: function () {
      this.getEnclosureList();
    },
    computed: l({}, (0, o.mapGetters)(["selectedTerminal", "appConfig", "userType"])),
    methods: l(l({}, (0, o.mapActions)("fence", ["GetUserEnclosure", "DeleteFence"])), {}, {
      l: function (e) {
        return m.$t(e);
      },
      getEnclosureList: function () {
        var e = this;
        return (async function () {
          var n;
          (n = await e.GetUserEnclosure({
            terminalId: e.selectedTerminal.id
          })).succeeded && (e.fenceList = n.data.list);
        })();
      },
      gotoEnclosureInfo: function (e) {
        uni.navigateTo({
          url: ("/pagesFunc/terminal/corral/info?fenceId=").concat(e.id)
        });
      },
      getCreateEnclosure: function () {
        uni.showActionSheet({
          title: m.$t("enclosure.select.type"),
          itemList: [m.$t("enclosure.round.fence"), m.$t("enclosure.polygon.fence"), m.$t("enclosure.district.fence")],
          itemColor: d.default.primaryColor,
          success: function (e) {
            uni.navigateTo({
              url: ("/pagesFunc/terminal/corral/info?enclosureType=").concat([0, 2, 3][e.tapIndex])
            });
          }
        });
      },
      longpressHangle: function (e) {
        var t, n = this;
        (this.item = e, uni.showActionSheet({
          title: m.$t("common.manipulation-menu"),
          itemList: [m.$t("common.delete.but")],
          itemColor: d.default.primaryColor,
          success: (t = (0, i.default)(r.default.mark(function t(a) {
            return r.default.wrap(function (t) {
              for (; ; ) switch (t.prev = t.next) {
                case 0:
                  if (a.tapIndex) {
                    t.next = 5;
                    break;
                  }
                  return (t.next = 3, n.DeleteFence(e.id));
                case 3:
                  t.sent.succeeded && (n.getEnclosureList(), (0, u.qzwlToast)(m.$t("common.deleted.success"), "none"));
                case 5:
                case "end":
                  return t.stop();
              }
            }, t);
          })), function (e) {
            return t.apply(this, arguments);
          }),
          fail: function (e) {}
        }));
      }
    })
  };
  t.default = c;
})(module, exports, __r);
