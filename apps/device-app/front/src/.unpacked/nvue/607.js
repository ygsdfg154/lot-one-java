// webpack 模块 607  [nvue]
// 出现于: pagesMore/public/locate.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = require("../../common/utils.nvue.js"), u = require("@/.unpacked/nvue/819.js"), _ = a(require("../../common/config.nvue.js")), l = a(require("moment"));
    function m(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        (t && (a = a.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, a));
      }
      return n;
    }
    function c(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? m(Object(n), !0).forEach(function (t) {
          (0, s.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : m(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var h, f = getApp().globalData, p = (uni.getSystemInfoSync(), {
      data: function () {
        return {
          cdn: _.default.cdn,
          mapContext: null,
          enableSatellite: !1,
          enableTraffic: !1,
          scale: _.default.defaultScale,
          longitude: 0,
          latitude: 0,
          myLongitude: 0,
          myLatitude: 0,
          markers: [],
          secondsToRefresh: _.default.secondsToRefresh,
          code: "",
          selectedDeviceName: "",
          deviceInfoShart: null,
          deviceShareRecord: null,
          location: "",
          singInfo: null,
          wxBrowser: !0
        };
      },
      computed: c(c({}, (0, o.mapGetters)(["sysInfo", "appConfig"])), {}, {
        backgroundColor: function () {
          if (this.deviceInfoShart) return (0, d.badgeBgColor)(this.deviceInfoShart.status);
        },
        backgroundColorMarker: function () {
          if (this.deviceInfoShart) return (0, d.badgeBgColor)(this.deviceInfoShart.status);
        },
        WLSignalIcon: function () {
          if (this.deviceInfoShart) {
            var e = this.deviceInfoShart.wlsignal;
            if (e <= 20) return this.cdn + "/ikon/signal-1.png";
            if (e > 20 && e <= 50) return this.cdn + "/ikon/signal-2.png";
            if (e > 50 && e <= 80) return this.cdn + "/ikon/signal-3.png";
            if (e > 80 && e <= 100) return this.cdn + "/ikon/signal-4.png";
          }
        },
        GNSSCountIcon: function () {
          if (this.deviceInfoShart) {
            var e = this.deviceInfoShart.gpssignal;
            return 2 == e ? this.cdn + "/ikon/gps-1.png" : 3 == e ? this.cdn + "/ikon/gps-2.png" : 4 == e ? this.cdn + "/ikon/gps-3.png" : this.cdn + "/ikon/gps-1.png";
          }
        },
        genBetteryIcon: function () {
          if (this.deviceInfoShart) return this.deviceInfoShart.battery <= 0 || this.deviceInfoShart.battery > 80 ? this.cdn + "/ikon/b100.png" : this.deviceInfoShart.battery <= 80 && this.deviceInfoShart.battery > 60 ? this.cdn + "/ikon/b80.png" : this.deviceInfoShart.battery <= 60 && this.deviceInfoShart.battery > 40 ? this.cdn + "/ikon/b60.png" : this.deviceInfoShart.battery <= 40 && this.deviceInfoShart.battery > 20 ? this.cdn + "/ikon/b40.png" : this.cdn + "/ikon/b20.png";
        },
        genAddress: function () {
          return this.location ? this.location : this.l("common.get.locate");
        },
        genDistance: function () {
          return (0, u.getDistance)(this.latitude, this.longitude, this.myLatitude, this.myLongitude) / 1e3;
        },
        LBSMode: function () {
          if (this.deviceInfoShart) {
            if (0 === this.deviceInfoShart.lbsMode) return f.$t("common.GPS-Beidou");
            if (1 === this.deviceInfoShart.lbsMode) return f.$t("common.base");
            if (2 === this.deviceInfoShart.lbsMode) return f.$t("common.WIFI");
            if (3 === this.deviceInfoShart.lbsMode) return f.$t("common.WIFI");
          }
        },
        genTime: function () {
          if (this.deviceInfoShart && this.deviceInfoShart.lastalive) return (0, l.default)(this.deviceInfoShart.lastalive, "YYYY/MM/DD HH:mm").format("YYYY/MM/DD HH:mm");
        }
      }),
      onLoad: function (e) {
        var t = this;
        (this.code = e.code, this.longitude = 116.4, this.latitude = 39.91, uni.getLocation({
          type: "gcj02",
          success: function (e) {
            (t.myLongitude = e.longitude, t.myLatitude = e.latitude, clearInterval(h));
          }
        }), this.getSharePosition(!0), this.initInterval(), this.secondsToRefresh = 0);
      },
      onHide: function () {
        var e = this;
        (clearInterval(h), setTimeout(function () {
          e.secondsToRefresh = 0;
        }, 100));
      },
      onReady: function () {
        var e = this;
        return (async function () {
          e.mapContext = uni.createMapContext("map", e);
        })();
      },
      methods: c(c(c({}, (0, o.mapActions)("device", ["GetSharePosition", "GetSharePositionRecord", "GetGeocode"])), (0, o.mapActions)("wechat", ["GetWxSign"])), {}, {
        l: function (e) {
          return f.$t(e);
        },
        getSharePosition: function (t) {
          var n = this;
          return (0, i.default)(r.default.mark(function a() {
            var i, s, o, u;
            return r.default.wrap(function (a) {
              for (; ; ) switch (a.prev = a.next) {
                case 0:
                  if ((e("log", "type", t, " at pagesMore/public/locate.nvue:364"), !t)) {
                    a.next = 6;
                    break;
                  }
                  return (a.next = 4, n.GetSharePositionRecord({
                    code: n.code
                  }));
                case 4:
                  (i = a.sent).succeeded && (n.deviceShareRecord = i.data);
                case 6:
                  return (a.next = 8, n.GetSharePosition({
                    code: n.code
                  }));
                case 8:
                  return ((s = a.sent).succeeded && (n.selectedDeviceName = s.data.terminalName || s.data.devicenum, n.latitude = s.data.latGCJ02, n.longitude = s.data.lonGCJ02, n.deviceInfoShart = s.data, o = (0, d.getTerminalIconCode)(s.data.iconType, n.appConfig.icons), n.markers = [{
                    id: 0,
                    longitude: n.longitude,
                    latitude: n.latitude,
                    width: 40,
                    height: 40,
                    anchor: {
                      x: .5,
                      y: .5
                    },
                    rotate: o.rotateState ? n.deviceInfoShart.direction : 0,
                    iconPath: ("").concat(n.cdn, "/ikon/device/").concat(o.code, "-").concat(s.data.deviceState, ".png"),
                    callout: {
                      content: n.selectedDeviceName,
                      display: "ALWAYS",
                      color: n.backgroundColorMarker,
                      bgColor: "#fff",
                      textAlign: "center",
                      padding: 8,
                      borderRadius: 10,
                      fontSize: 13
                    }
                  }]), a.next = 12, n.GetGeocode({
                    latitude: s.data.lat,
                    longitude: s.data.lon
                  }));
                case 12:
                  (u = a.sent).succeeded && (n.location = u.address);
                case 14:
                case "end":
                  return a.stop();
              }
            }, a);
          }))();
        },
        initInterval: function () {
          var e = this;
          (this.secondsToRefresh = _.default.secondsToRefresh, h = setInterval((0, i.default)(r.default.mark(function t() {
            return r.default.wrap(function (t) {
              for (; ; ) switch (t.prev = t.next) {
                case 0:
                  if ((e.secondsToRefresh = 0 === e.secondsToRefresh ? _.default.secondsToRefresh : e.secondsToRefresh - 1, 0 !== e.secondsToRefresh)) {
                    t.next = 4;
                    break;
                  }
                  return (t.next = 4, e.getSharePosition());
                case 4:
                case "end":
                  return t.stop();
              }
            }, t);
          })), 1e3));
        },
        debounceRefreshDeviceInfo: function () {
          uni.$u.debounce(this.refreshDeviceInfo, 500);
        },
        refreshDeviceInfo: function () {
          var e = this;
          return (async function () {
            clearInterval(h);
            e.secondsToRefresh = 0;
            uni.getLocation({
              type: "gcj02",
              success: function (t) {
                (e.myLongitude = t.longitude, e.myLatitude = t.latitude);
              }
            });
            await e.getSharePosition();
            e.initInterval();
            return (0, d.qzwlToast)(f.$t("common.refurbish.success"), "none");
          })();
        },
        toggleLayer: function () {
          this.enableSatellite = !this.enableSatellite;
        },
        toggleTraffic: function () {
          this.enableTraffic = !this.enableTraffic;
        },
        ranging: function () {
          if (this.deviceInfoShart) if (this.longitude || this.latitude) {
            if (this.longitude && this.latitude) {
              var t = [{
                longitude: this.longitude,
                latitude: this.latitude
              }, {
                longitude: this.myLongitude,
                latitude: this.myLatitude
              }];
              (this.mapContext.includePoints({
                points: t,
                padding: [80, 30, 180, 30],
                fail: function (t) {
                  e("log", t, " at pagesMore/public/locate.nvue:516");
                }
              }), uni.showToast({
                title: "\u60a8\u8ddd\u79bb\u8bbe\u5907\u6709" + this.genDistance + "km",
                icon: "none"
              }));
            }
          } else uni.showToast({
            title: f.$t("device.no-locate"),
            icon: "none"
          }); else uni.showToast({
            title: f.$t("device.no.terminal"),
            icon: "none"
          });
        },
        changeMapScale: function (e) {
          this.scale = e ? this.scale + .5 : this.scale - .5;
        },
        moveToDeviceLocation: function () {
          this.deviceInfoShart && (this.mapContext.moveToLocation({
            longitude: this.longitude,
            latitude: this.latitude
          }), this.scale = _.default.defaultScale, uni.showToast({
            title: f.$t("common.Switched.to.terminal"),
            icon: "none"
          }));
        },
        moveToMyLocation: function () {
          var e = this;
          uni.getLocation({
            type: "gcj02",
            success: function (t) {
              (e.mapContext.moveToLocation({
                longitude: t.longitude,
                latitude: t.latitude
              }), e.scale = _.default.defaultScale, uni.showToast({
                title: f.$t("common.Switched.to.mine"),
                icon: "none"
              }));
            }
          });
        },
        getWxSign: function () {
          var t = this;
          return (async function () {
            var a;
            (a = await t.GetWxSign({
              url: t.getWxConfigUrl
            }), t.singInfo = a.data, wx.config({
              debug: !1,
              appId: t.singInfo.appId,
              timestamp: t.singInfo.timestamp,
              nonceStr: t.singInfo.nonceStr,
              signature: t.singInfo.signature,
              jsApiList: ["openLocation", "getLocation"]
            }), wx.ready(function () {
              e("log", wx, "resresresresresresres", " at pagesMore/public/locate.nvue:586");
            }), wx.error(function (t) {
              e("log", "wxwxerror", t, " at pagesMore/public/locate.nvue:591");
            }));
          })();
        },
        openNavigation: function () {},
        is_weixin: function () {
          return "micromessenger" == navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
        }
      })
    });
    t.default = p;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
