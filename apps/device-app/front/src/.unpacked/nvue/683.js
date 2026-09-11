// webpack 模块 683  [nvue]
// 出现于: pagesFunc/terminal/locus/index.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r = a(require("@/.unpacked/nvue/22.js")), i = a(require("@/.unpacked/nvue/23.js")), s = a(require("@/.unpacked/nvue/5.js")), o = require("vuex"), d = require("../../common/utils.nvue.js"), u = (require("@/.unpacked/nvue/979.js"), a(require("moment"))), l = a(require("../../common/config.nvue.js")), _ = a(require("../../components/selectTime/selectTime.nvue")), c = a(require("../../components/locusPanel/locusPanel.nvue"));
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
    function f(e) {
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
    var p = getApp().globalData, h = new Date(), y = h.getFullYear(), M = h.getMonth() + 1;
    M = M < 10 ? ("0").concat(M) : M;
    var L, g = h.getDate();
    g = g < 10 ? ("0").concat(g) : g;
    var v = {
      components: {
        selectTime: _.default,
        locusPanel: c.default
      },
      data: function () {
        return {
          cdn: l.default.cdn,
          mapContext: null,
          scale: 16,
          longitude: 116.39742,
          latitude: 39.909,
          markers: [],
          polyline: [],
          title: "",
          minDate: (0, u.default)(h).subtract(6, "months").format("YYYY-MM-DD"),
          maxDate: ("").concat(y, "-").concat(M, "-").concat(g, " 23:59:59"),
          date: [(0, u.default)(h).format("YYYY-MM-DD")],
          points: [],
          currentIndex: 0,
          currentPoint: null,
          currentAddress: "",
          progress: 1,
          isPlaying: !1,
          speed: 400,
          pointMileageItems: null,
          totalMileage: "",
          show: !1,
          basePoint: [],
          startPoint: null,
          endPoint: null,
          startTime: "",
          endTime: "",
          iconInfo: null,
          closeDate: null
        };
      },
      computed: f(f({}, (0, o.mapGetters)(["selectedTerminal", "sysInfo", "userId", "appConfig"])), {}, {
        currentDate: function () {
          return this.date[0];
        }
      }),
      onLoad: function () {
        this.selectedTerminal && (this.iconInfo = (0, d.getTerminalIconCode)(this.selectedTerminal.iconType, this.appConfig.icons));
      },
      onUnload: function () {
        L && clearInterval(L);
      },
      onReady: function () {
        (this.mapContext = uni.createMapContext("map", this), this.fetchData());
      },
      methods: f(f({}, (0, o.mapActions)("device", ["GetDeviceTrack", "GetGeocode"])), {}, {
        l: function (e) {
          return p.$t(e);
        },
        fetchData: function (e) {
          var t = this;
          return (async function () {
            var a, i;
            (a = await t.GetDeviceTrack({
              terminalId: t.selectedTerminal.id,
              date: e || t.currentDate
            }), t.closeDate = e || t.currentDate, a.succeeded ? (i = a.data.traceItems, t.pointMileageItems = a.data.pointMileageItems, t.clearTrack(), i.length && t.pointMileageItems ? (t.drawTrack(i), t.drawDetentionMileage(), t.startPoint = i[0], t.endPoint = i[i.length - 1]) : (0, d.qzwlToast)(p.$t("locus.no.data"), "none")) : t.clearTrack());
          })();
        },
        getCurrentAddress: function () {
          var e = this;
          return (0, i.default)(r.default.mark(function t() {
            var n;
            return r.default.wrap(function (t) {
              for (; ; ) switch (t.prev = t.next) {
                case 0:
                  if (e.currentPoint) {
                    t.next = 3;
                    break;
                  }
                  return (e.currentAddress = "", t.abrupt("return"));
                case 3:
                  return (t.next = 5, e.GetGeocode({
                    longitude: e.currentPoint.longitudeWGS84,
                    latitude: e.currentPoint.latitudeWGS84
                  }));
                case 5:
                  (n = t.sent, e.currentAddress = n.succeeded ? n.address : "");
                case 7:
                case "end":
                  return t.stop();
              }
            }, t);
          }))();
        },
        clearTrack: function () {
          (this.polyline = [{}], this.markers = [], this.points = [], this.currentPoint = null, this.basePoint = [], this.startPoint = null, this.endPoint = null, this.$refs.locusPanel.baseValue = !1);
        },
        drawMarkers: function () {
          var e = [];
          this.points.length && (e.push({
            id: 0,
            longitude: this.points[0].longitude,
            latitude: this.points[0].latitude,
            width: 30,
            height: 30,
            iconPath: ("").concat(this.cdn, "/ikon/qzwl-locus-start@2x.png")
          }), e.push({
            id: 1,
            longitude: this.points[this.points.length - 1].longitude,
            latitude: this.points[this.points.length - 1].latitude,
            width: 30,
            height: 30,
            iconPath: ("").concat(this.cdn, "/ikon/qzwl-locus-end@2x.png")
          }), e.push({
            id: 2,
            longitude: this.currentPoint.longitude,
            latitude: this.currentPoint.latitude,
            width: 45,
            height: 45,
            anchor: {
              x: .5,
              y: .5
            },
            rotate: this.iconInfo.rotateState ? this.currentPoint.direction : 0,
            iconPath: ("").concat(this.cdn, "/ikon/device/").concat(this.iconInfo.code, "-1.png")
          }), this.markers = e);
        },
        drawLine: function () {
          var e = {
            points: this.points,
            arrowLine: !0,
            colorList: this.points.map(function (e) {
              return l.default.primaryColor;
            }),
            borderWidth: 1,
            width: 12,
            arrowIconPath: this.cdn + "/draw/qzwl-trackPath-img.png"
          };
          this.polyline = [e];
        },
        drawTrack: function (e) {
          for (var t = this, n = [], a = ["GPS+\u5317\u6597\u5b9a\u4f4d", "\u57fa\u7ad9\u5b9a\u4f4d", "Wi-Fi\u5b9a\u4f4d", "Wi-Fi\u5b9a\u4f4d"], r = 0; r < e.length; r++) for (var i = 0; i < e[r].items.length; i++) {
            var s = (0, d.gcoordTransform)({
              lonlat: [e[r].items[i].lon, e[r].items[i].lat],
              to: "WGS84",
              form: "GCJ02"
            });
            n.push({
              longitude: s[0].toFixed(6),
              latitude: s[1].toFixed(6),
              longitudeWGS84: e[r].items[i].lon,
              latitudeWGS84: e[r].items[i].lat,
              mode: a[e[r].items[i].lbsMode],
              direction: e[r].items[i].direction,
              dir: (0, d.deviceDirection)(e[r].items[i].direction),
              color: "green" == e[r].color ? "#03C160" : "#6081C7",
              locateTime: e[r].items[i].deviceTime,
              speed: e[r].items[i].speed
            });
          }
          (this.basePoint = n.filter(function (e) {
            return "\u57fa\u7ad9\u5b9a\u4f4d" === e.mode;
          }), this.basePoint = this.basePoint.map(function (e, t) {
            return f(f({}, e), {}, {
              id: -t - 1
            });
          }), n = n.filter(function (e) {
            return "\u57fa\u7ad9\u5b9a\u4f4d" !== e.mode;
          }), this.points = n, this.currentPoint = n[0] ? n[0] : null, this.getCurrentAddress(), this.drawLine(), this.drawMarkers(), n.length ? setTimeout(function () {
            t.mapContext.includePoints({
              points: n,
              padding: [80, 30, 180, 30]
            });
          }, 500) : this.basePoint.length && (this.latitude = this.basePoint[0].latitude, this.longitude = this.basePoint[0].longitude));
        },
        openCalendar: function () {
          this.$refs.selectTime.showCalendar = !0;
        },
        prevDate: function () {
          (this.stop(), this.$refs.selectTime.currentStartDate = "", this.$refs.selectTime.currentEndDate = "");
          var e = (0, u.default)(this.currentDate).subtract(1, "days").format("YYYY-MM-DD");
          (0, u.default)(e).isBefore((0, u.default)(this.minDate)) ? (0, d.qzwlToast)(p.$t("common.unable-minimum-date"), "none") : (this.date = [e], this.fetchData());
        },
        nextDate: function () {
          (this.stop(), this.$refs.selectTime.currentStartDate = "", this.$refs.selectTime.currentEndDate = "");
          var e = (0, u.default)(this.currentDate).add(1, "days").format("YYYY-MM-DD");
          (0, u.default)(e).isAfter((0, u.default)(this.maxDate)) ? (0, d.qzwlToast)(p.$t("common.unable-greater.than-today"), "none") : (this.date = [e], this.fetchData());
        },
        confirmCalendar: function (e) {
          (this.stop(), this.date = [e[0].slice(0, 10)], this.fetchData({
            strat: e[0],
            end: e[1]
          }));
        },
        moveCar: function (e, t, n) {
          (this.mapContext.moveToLocation({
            longitude: t.longitude,
            latitude: t.latitude
          }), this.mapContext.moveAlong({
            markerId: 2,
            path: [{
              longitude: e.longitude,
              latitude: e.latitude
            }, {
              longitude: t.longitude,
              latitude: t.latitude
            }],
            autoRotate: this.iconInfo.rotateState,
            duration: n
          }));
        },
        play: function () {
          var e = this;
          if (!this.points.length) return (0, d.qzwlToast)(p.$t("locus.no.play"), "error");
          (this.scale = 17, this.isPlaying = !0, 100 != this.progress && this.currentIndex != this.points.length || (this.currentIndex = 0, this.currentPoint = this.points[this.currentIndex], this.progress = 1, this.getCurrentAddress()), L = setInterval(function () {
            if ((e.currentIndex += 1, e.currentIndex == e.points.length)) (e.isPlaying = !1, clearInterval(L), (0, d.qzwlToast)(p.$t("locus.played.out"), "none")); else {
              var t = e.currentPoint;
              (e.currentPoint = e.points[e.currentIndex], e.progress = 100 * (e.currentIndex + 1) / e.points.length, e.moveCar(t, e.currentPoint, e.speed - 100), e.getCurrentAddress());
            }
          }, this.speed));
        },
        pause: function () {
          (this.isPlaying = !1, clearInterval(L));
        },
        stop: function () {
          (this.isPlaying = !1, clearInterval(L), this.currentIndex = 0, this.progress = 1);
        },
        progressChanging: function (e) {
          if (!this.points.length) return (0, d.qzwlToast)(p.$t("locus.no.play"), "error");
          this.isPlaying && this.pause();
          var t = this.currentPoint;
          (this.currentIndex = e >= 20 ? Math.floor(e / 100 * this.points.length) - 1 : Math.ceil(e / 100 * this.points.length) - 1, this.currentIndex = this.currentIndex <= 0 ? 0 : this.currentIndex, this.currentPoint = this.points[this.currentIndex], this.progress = e, this.moveCar(t, this.currentPoint, 1));
        },
        progressChanged: function (e) {
          if (!this.points.length) return (0, d.qzwlToast)(p.$t("locus.no.play"), "error");
          this.getCurrentAddress();
        },
        changeSpeed: function (e) {
          (this.speed = e, this.isPlaying && (this.pause(), this.play()));
        },
        drawDetentionMileage: function () {
          var e = this;
          this.totalMileage = this.pointMileageItems.totalMileage.toFixed(2);
          var t;
          (t = this.pointMileageItems.detentionAreas.map(function (t, n) {
            var a = 0;
            t.id.toString().length > 9 && (a = (a = String(t.id)).substring(0, 9), a = Number(a));
            var r = (0, d.gcoordTransform)({
              lonlat: [t.lon, t.lat],
              to: "WGS84",
              form: "GCJ02"
            });
            return {
              id: a || t.id,
              longitude: r[0],
              latitude: r[1],
              width: 30,
              height: 30,
              anchor: {
                x: .5,
                y: .5
              },
              iconPath: ("").concat(e.cdn, "/ikon/qzwl-locus-stay.png")
            };
          }), this.markers = this.markers.concat(t), this.pointMileageItems.detentionAreas = this.pointMileageItems.detentionAreas.map(function (e, t) {
            var n = 0;
            return e.id.toString().length > 9 ? (n = (n = String(e.id)).substring(0, 9), n = Number(n), f(f({}, e), {}, {
              id: n
            })) : e;
          }));
        },
        drawBaseMarker: function (e) {
          var t = this;
          if (e) {
            var n;
            (n = this.basePoint.map(function (e, n) {
              return {
                id: e.id,
                longitude: e.longitude,
                latitude: e.latitude,
                width: 25,
                height: 28,
                iconPath: ("").concat(t.cdn, "/draw/qzwl-locationMap.png")
              };
            }), this.markers = this.markers.concat(n));
          } else this.markers = this.markers.filter(function (e) {
            return e.id > -1;
          });
        },
        markertap: function (e) {
          var t = this;
          return (async function () {
            (e.detail.markerId >= 2 && t.openDetentionAreasMarker(e.detail.markerId), e.detail.markerId <= -1 && t.openBaseMarker(e.detail.markerId));
          })();
        },
        mapTap: function (e) {
          var t = this;
          return (0, i.default)(r.default.mark(function e() {
            var n, a;
            return r.default.wrap(function (e) {
              for (; ; ) switch (e.prev = e.next) {
                case 0:
                  if (!(t.markers.length > 3)) {
                    e.next = 6;
                    break;
                  }
                  return (n = t.markers.filter(function (e) {
                    return e.id < 3;
                  }), t.markerLableHandle(n), e.next = 5, p.$sleep(0));
                case 5:
                  t.drawDetentionMileage();
                case 6:
                  if (!t.$refs.locusPanel.baseValue) {
                    e.next = 12;
                    break;
                  }
                  return (a = t.markers.filter(function (e) {
                    return e.id > -1;
                  }), t.markerLableHandle(a), e.next = 11, p.$sleep(0));
                case 11:
                  t.drawBaseMarker(!0);
                case 12:
                case "end":
                  return e.stop();
              }
            }, e);
          }))();
        },
        openDetentionAreasMarker: function (t) {
          var n = this;
          return (async function () {
            var i, s, o;
            (i = n.pointMileageItems.detentionAreas.find(function (e) {
              return e.id == t;
            })) && (s = ("").concat(p.$t("common.stop")).concat((0, d.getNetworkTime)(i.beginTime, i.endTime, !0)), e("log", o = {
              content: s,
              display: "ALWAYS",
              color: "#333333",
              bgColor: "#fff",
              textAlign: "center",
              padding: 8,
              borderRadius: 10,
              fontSize: 13
            }, "callout", " at pagesFunc/terminal/locus/index.nvue:679"), n.markerLableHandle(n.markers, t, o));
          })();
        },
        openBaseMarker: function (e) {
          var t = {
            content: this.basePoint.find(function (t) {
              return t.id === e;
            }).locateTime,
            display: "ALWAYS",
            color: "#6EA2E3",
            bgColor: "#fff",
            textAlign: "center",
            padding: 8,
            borderRadius: 10,
            fontSize: 13
          };
          this.markerLableHandle(this.markers, e, t);
        },
        markerLableHandle: function (t, n, a) {
          var r = this;
          (e("log", a, "callout", " at pagesFunc/terminal/locus/index.nvue:711"), this.markers = t.map(function (e) {
            return (delete e.callout, n == e.id && n && (e = f(f({}, e), {}, {
              callout: a
            })), r.currentPoint && "ios" === r.sysInfo.platform && 2 === e.id ? f(f({}, e), {}, {
              longitude: r.currentPoint.longitude,
              latitude: r.currentPoint.latitude
            }) : e);
          }));
        }
      })
    };
    t.default = v;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
