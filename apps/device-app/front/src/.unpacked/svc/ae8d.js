// webpack 模块 ae8d  [svc]
// 出现于: app-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/svc/47a9.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/svc/7ca3.js")), i = (a(require("vue")), a(require("../../common/config.js"))), o = require("vuex"), s = a(require("@/.unpacked/svc/918f.js"));
    a(require("moment"));
    function u(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        (t && (a = a.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, a));
      }
      return n;
    }
    function d(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? u(Object(n), !0).forEach(function (t) {
          (0, r.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : u(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var c = {
      globalData: {
        $i18n: {},
        $t: {},
        $sleep: null,
        $isNull: null,
        $msg: null,
        $remote: null
      },
      data: function () {
        return {
          isLaunched: !1
        };
      },
      computed: d(d({}, (0, o.mapGetters)(["isAuthenticated", "sysInfo", "autoCheckUpdate", "isAuditMode", "userType", "setLocaleState"])), (0, o.mapState)("timingRefresh", ["msgTimer", "remoteListTimer"])),
      onLaunch: function () {
        var t = this;
        (e("log", "App Launch", this.sysInfo, " at App.vue:34"), this.setFuncDeviceId(""), this.isLaunched = !0, this.globalData.$i18n = this.$i18n, this.globalData.$t = function (e) {
          return t.$t(e);
        }, this.globalData.$sleep = function (e) {
          return new Promise(function (t) {
            setTimeout(t, e);
          });
        }, this.globalData.$isNull = function (e) {
          return !(!e && 0 != e);
        }, this.globalData.$msg = function (n) {
          (clearTimeout(t.msgTimer), t.setMsgTimer(setTimeout(function () {
            (e("log", "setTimeoutmsg", " at App.vue:57"), t.setMsgRefresh(!0));
          }, n)));
        }, this.globalData.$remote = function (n) {
          (clearTimeout(t.remoteListTimer), t.setRemoteListTimer(setTimeout(function () {
            (e("log", "setTimeoutremote", " at App.vue:67"), t.setRemoteListRefresh(!0));
          }, n)));
        }, this.GetApplicationConfiguration("onLaunch"));
        var n = uni.getLaunchOptionsSync();
        if ((uni.setStorageSync("currentPage", n), !this.isAuthenticated)) {
          var a = i.default.ingoreAuthFiles.filter(function (e) {
            return -1 != n.path.indexOf(e);
          });
          !a.length && this.setLocaleState && uni.reLaunch({
            url: "/pages/home/home"
          });
        }
        (this.GetAdvertising(), "ios" != this.sysInfo.platform && this.requestPermissionListener());
        var r, o = uni.getStorageSync("environmentStorage");
        (r = o && o.value || i.default.serviceRoot, this.autoCheckUpdate && "http://h5.akbee.com/v1" === r && ("ios" == this.sysInfo.platform ? this.CheckAppAuditModeIos().then(function (e) {
          t.isAuditMode || (0, s.default)();
        }).catch(function (e) {
          t.isAuditMode || (0, s.default)();
        }) : (this.CheckAppAuditModeAndroid(), "honor" != this.sysInfo.brand && (0, s.default)())), uni.onNetworkStatusChange(function (e) {
          e.isConnected && t.GetApplicationConfiguration("onLaunch");
        }), e("log", "App onLaunch", " at App.vue:149"));
      },
      onShow: function () {
        (this.isLaunched || ("ios" == this.sysInfo.platform ? this.CheckAppAuditModeIos() : this.CheckAppAuditModeAndroid(), this.GetApplicationConfiguration()), clearTimeout(this.msgTimer), this.setMsgRefresh(!0), clearTimeout(this.remoteListTimer), this.setRemoteListRefresh(!0), e("log", "App onShow", " at App.vue:172"));
      },
      onHide: function () {
        (this.isLaunched = !1, e("log", "App onHide", " at App.vue:181"));
      },
      onExit: function () {
        e("log", "App onExit", " at App.vue:184");
      },
      onError: function (t) {
        e("log", "App onError", t, " at App.vue:187");
      },
      methods: d(d(d(d(d(d(d(d({}, (0, o.mapMutations)("app", ["setFirstUrl"])), (0, o.mapMutations)("wechat", ["setWechatUserInfo"])), (0, o.mapMutations)("device", ["setFuncDeviceId"])), (0, o.mapMutations)("sys", ["setRequestPermission"])), (0, o.mapActions)("app", ["GetApplicationConfiguration", "GetAdvertising"])), (0, o.mapActions)("sys", ["CheckAppAuditModeIos", "CheckAppAuditModeAndroid"])), (0, o.mapMutations)("timingRefresh", ["setMsgRefresh", "setMsgTimer", "setRemoteListRefresh", "setRemoteListTimer"])), {}, {
        requestPermissionListener: function () {
          var t = this, n = uni.createRequestPermissionListener();
          (n.onConfirm(function (n) {
            (e("log", "\u5443\u5443\u5443e", n, " at App.vue:208"), t.setRequestPermission({
              permission: n[0],
              permissionAlertShow: !0
            }));
          }), n.onComplete(function (e) {
            t.setRequestPermission({
              permissionAlertShow: !1
            });
          }));
        }
      })
    };
    t.default = c;
  }).call(this, require("@/.unpacked/svc/f3b9.js")["default"]);
})(module, exports, __r);
