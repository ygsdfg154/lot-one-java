// webpack 模块 641  [nvue]
// 出现于: pagesFunc/deviceInfo/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  var r = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.default = void 0);
  var a = r(require("@/.unpacked/nvue/22.js")), i = r(require("@/.unpacked/nvue/23.js")), o = r(require("@/.unpacked/nvue/5.js")), s = require("vuex"), d = require("../../common/utils.nvue.js"), u = r(require("../../common/config.nvue.js"));
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
  function _(e) {
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
  var c = getApp().globalData, m = {
    data: function () {
      return {
        cdn: u.default.cdn,
        primaryColor: u.default.primaryColor,
        deviceName: "",
        currentDeviceName: "",
        terminalIconInfo: {
          id: 0,
          iconType: 0,
          code: "",
          iconName: ""
        },
        terminalIconShow: !1,
        terminalNameShow: !1,
        lbsStatus: !1
      };
    },
    onShow: function () {
      this.fetchData();
    },
    computed: _(_({}, (0, s.mapGetters)(["selectedTerminal", "appConfig", "terminalFuncs"])), {}, {
      genAddress: function () {
        return (this.selectedTerminal ? this.selectedTerminal.TextLocation : this.l("common.get.locate")) || this.l("common.get.locate-fail");
      },
      terminalIcon: function () {
        return ("").concat(this.cdn, "/ikon/device/").concat(this.terminalIconInfo.code, "-1.png");
      },
      wireless: function () {
        return u.default.wirelessDevice.includes(this.selectedTerminal.terminalTypeDisplayName);
      }
    }),
    methods: _(_({}, (0, s.mapActions)("device", ["SetDeviceInfo", "GetDeviceInfo", "SetTerminalFilter"])), {}, {
      l: function (e) {
        return c.$t(e);
      },
      gotoPages: function (e) {
        uni.navigateTo({
          url: e
        });
      },
      bStateHangle: function (e, t) {
        return (0, d.batteryStateHangle)(e, t);
      },
      fetchData: function () {
        var e = this;
        return (async function () {
          var n, r, i;
          (n = await e.GetDeviceInfo({
            deviceID: e.selectedTerminal.id
          })).succeeded && (e.deviceName = e.currentDeviceName = n.data.terminalName, e.lbsStatus = 1 == n.data.lbs, r = e.appConfig.icons.find(function (e) {
            return e.id == n.data.iconType;
          }), i = r ? {
            id: r.id,
            iconType: r.id,
            iconName: r.name,
            code: r.code
          } : {
            id: 1,
            iconType: 1,
            iconName: "\u9ed8\u8ba4",
            code: "default"
          }, e.terminalIconInfo = i);
        })();
      },
      copy: function (e) {
        uni.setClipboardData({
          data: e,
          showToast: !1,
          success: function () {
            (0, d.qzwlToast)("\u5185\u5bb9\u5df2\u590d\u5236");
          }
        });
      },
      setTerminalName: function () {
        (this.terminalNameShow = !1, this.putDeviceInfo({
          terminalId: this.selectedTerminal.id,
          deviceName: this.currentDeviceName ? this.currentDeviceName.trim() : this.currentDeviceName
        }));
      },
      terminalNameClose: function () {
        (this.terminalNameShow = !1, this.fetchData());
      },
      putDeviceInfo: function (e) {
        var t = this;
        return (async function () {
          (await t.SetDeviceInfo(e)).succeeded && ((0, d.qzwlToast)(t.l("common.save.success"), "none"), t.fetchData());
        })();
      },
      lbsStateChange: function (e) {
        var t = this;
        return (async function () {
          var r;
          ((r = await t.SetTerminalFilter({
            terminalId: t.selectedTerminal.id,
            Lbs: e ? 1 : 2
          })).succeeded && (0, d.qzwlToast)(e ? t.l("info.no.filter.lbs") : t.l("info.ilter.lbs"), "none"), r.succeeded || (t.lbsStatus = !e));
        })();
      }
    })
  };
  t.default = m;
})(module, exports, __r);
