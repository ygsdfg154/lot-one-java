// webpack 模块 660  [nvue]
// 出现于: pagesFunc/terminal/trip-report/detail.js
const __r = require('./__runtime.js').wrap();
(function (t, e, r) {
  "use strict";
  var o = require("@/.unpacked/nvue/3.js");
  (Object.defineProperty(e, "__esModule", {
    value: !0
  }), e.default = void 0);
  var n = o(require("@/.unpacked/nvue/22.js")), i = o(require("@/.unpacked/nvue/23.js")), a = o(require("@/.unpacked/nvue/5.js")), s = require("vuex"), u = o(require("../../common/config.nvue.js"));
  function p(t, e) {
    var r = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(t);
      (e && (o = o.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable;
      })), r.push.apply(r, o));
    }
    return r;
  }
  function l(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = null != arguments[e] ? arguments[e] : {};
      e % 2 ? p(Object(r), !0).forEach(function (e) {
        (0, a.default)(t, e, r[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r)) : p(Object(r)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
      });
    }
    return t;
  }
  var c, d = getApp().globalData, f = {
    data: function () {
      return {
        cdn: u.default.cdn,
        mapContext: null,
        enableSatellite: !1,
        enableTraffic: !1,
        scale: 16,
        longitude: 116.39742,
        latitude: 39.909,
        markers: [],
        polyline: [],
        points: [],
        reportInfo: null,
        reportType: null
      };
    },
    computed: l(l({}, (0, s.mapState)("report", ["reportItem"])), (0, s.mapGetters)(["isAuthenticated", "selectedTerminal", "sysInfo", "userId"])),
    onLoad: function (t) {
      (this.reportInfo = this.reportItem, this.reportType = this.reportItem.reportType);
    },
    onUnload: function () {
      clearInterval(c);
    },
    onReady: function () {
      var t = this;
      return (async function () {
        (t.mapContext = uni.createMapContext("map", t), t.isAuthenticated && t.fetchData());
      })();
    },
    methods: l(l({}, (0, s.mapActions)("device", ["GetGeocode"])), {}, {
      l: function (t) {
        return d.$t(t);
      },
      fetchData: function () {
        var t = this;
        return (0, i.default)(n.default.mark(function e() {
          var r, o, i;
          return n.default.wrap(function (e) {
            for (; ; ) switch (e.prev = e.next) {
              case 0:
                if (t.reportType) {
                  e.next = 9;
                  break;
                }
                if ((t.longitude = t.reportInfo.startLon, t.latitude = t.reportInfo.startLat, t.drawStayMarkers(), t.reportInfo.address)) {
                  e.next = 9;
                  break;
                }
                return (e.next = 7, t.GetGeocode({
                  longitude: t.reportInfo.startLonWGS84,
                  latitude: t.reportInfo.startLatWGS84
                }));
              case 7:
                (r = e.sent).succeeded && (t.reportInfo.address = r.address);
              case 9:
                if (!t.reportType) {
                  e.next = 24;
                  break;
                }
                if ((t.drawLocusMarkers(), t.pointsHandler(), t.reportInfo.startAddress)) {
                  e.next = 17;
                  break;
                }
                return (e.next = 15, t.GetGeocode({
                  longitude: t.reportInfo.startLonWGS84,
                  latitude: t.reportInfo.startLatWGS84
                }));
              case 15:
                (o = e.sent).succeeded && (t.reportInfo.startAddress = o.address);
              case 17:
                if (t.reportInfo.endAddress) {
                  e.next = 22;
                  break;
                }
                return (e.next = 20, t.GetGeocode({
                  longitude: t.reportInfo.endLonWGS84,
                  latitude: t.reportInfo.endLatWGS84
                }));
              case 20:
                (i = e.sent).succeeded && (t.reportInfo.endAddress = i.address);
              case 22:
                (c = setTimeout(function () {
                  t.mapContext.includePoints({
                    points: t.points,
                    padding: [80, 30, 180, 30]
                  });
                }, 500), t.drawLine());
              case 24:
              case "end":
                return e.stop();
            }
          }, e);
        }))();
      },
      drawStayMarkers: function () {
        var t = [];
        this.reportInfo && (t.push({
          id: 0,
          longitude: this.reportInfo.startLon,
          latitude: this.reportInfo.startLat,
          width: 35,
          height: 35,
          anchor: {
            x: .5,
            y: .5
          },
          iconPath: ("").concat(u.default.cdn, "/ikon/qzwl-locus-stay.png ")
        }), this.markers = t);
      },
      drawLocusMarkers: function () {
        var t = [];
        this.reportInfo && (t.push({
          id: 0,
          longitude: this.reportInfo.startLon,
          latitude: this.reportInfo.startLat,
          width: 37,
          height: 37,
          iconPath: ("").concat(u.default.cdn, "/ikon/qzwl-locus-start@2x.png")
        }), t.push({
          id: 1,
          longitude: this.reportInfo.endLon,
          latitude: this.reportInfo.endLat,
          width: 35,
          height: 35,
          iconPath: ("").concat(u.default.cdn, "/ikon/qzwl-locus-end@2x.png")
        }), this.markers = t, this.markers = this.markers.concat(t));
      },
      drawLine: function () {
        var t = {
          points: this.points,
          arrowLine: !0,
          colorList: this.points.map(function (t) {
            return u.default.primaryColor;
          }),
          borderWidth: 1,
          width: 12,
          arrowIconPath: u.default.cdn + "/draw/qzwl-trackPath-img.png"
        };
        this.polyline = [t];
      },
      pointsHandler: function () {
        this.points = [{
          longitude: this.reportInfo.startLon,
          latitude: this.reportInfo.startLat
        }, {
          longitude: this.reportInfo.endLon,
          latitude: this.reportInfo.endLat
        }];
      },
      layerChane: function () {
        this.enableSatellite = !this.enableSatellite;
      },
      trafficChane: function () {
        this.enableTraffic = !this.enableTraffic;
      }
    })
  };
  e.default = f;
})(module, exports, __r);
