// webpack 模块 645  [nvue]
// 出现于: pagesFunc/terminal/corral/info.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var a = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var r, i, o, s = a(require("@/.unpacked/nvue/22.js")), d = a(require("@/.unpacked/nvue/23.js")), u = a(require("@/.unpacked/nvue/5.js")), l = require("@/.unpacked/nvue/966.js"), _ = require("vuex"), c = require("../../common/utils.nvue.js"), m = (a(require("moment")), a(require("../../common/config.nvue.js")));
    function p(e, t) {
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
        t % 2 ? p(Object(n), !0).forEach(function (t) {
          (0, u.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : p(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var h = getApp().globalData, y = {
      data: function () {
        return {
          primaryColor: m.default.primaryColor,
          cdn: m.default.cdn,
          mapContext: null,
          slider: 300,
          sliderRadius: 300,
          scale: m.default.defaultScale,
          longitude: 116.4,
          latitude: 39.91,
          markers: [],
          polyline: [],
          polygons: [],
          circles: [],
          id: 0,
          title: "",
          points: [],
          pointsTwo: [],
          alarmTypeId: 0,
          enclosureType: null,
          circlesLocation: null,
          enclosureInfo: null,
          butText: h.$t("mine.setup.save"),
          regionText: h.$t("enclosure.please.province/city"),
          districtPickerShow: !1,
          columns: [],
          alarmTypeList: [{
            name: 0,
            lable: h.$t("enclosure.enter.fence"),
            disabled: !1
          }, {
            name: 1,
            lable: h.$t("enclosure.out.fence"),
            disabled: !1
          }, {
            name: 2,
            lable: h.$t("enclosure.Access.fence"),
            disabled: !1
          }],
          adcode: null,
          model: {
            userInfo: {
              name: ""
            }
          },
          sliderShow: !0
        };
      },
      computed: f(f({}, (0, _.mapGetters)(["isAuthenticated", "selectedTerminal", "appConfig", "userType"])), (0, _.mapState)("fence", ["regionList"])),
      onLoad: function (e) {
        var t = this;
        this.selectedTerminal && (uni.setNavigationBarTitle({
          title: e.enclosureType ? h.$t("enclosure.add.fence") : h.$t("enclosure.fence.info")
        }), this.selectedTerminal.lon && this.selectedTerminal.lat ? (this.longitude = this.selectedTerminal.lon, this.latitude = this.selectedTerminal.lat) : uni.getLocation({
          type: "gcj02",
          success: function (e) {
            (t.longitude = e.longitude, t.latitude = e.latitude);
          }
        }), this.setTerminalIcon(), this.circlesLocation = {
          longitude: this.longitude,
          latitude: this.latitude
        }, this.GetAllRegion(), e.fenceId && (this.id = e.fenceId, this.getEnclosureInfo(this.id), this.butText = h.$t("enclosure.revise")), e.enclosureType && (this.enclosureType = e.enclosureType, this.enclosureChange(this.enclosureType)));
      },
      onReady: function () {
        this.mapContext = uni.createMapContext("map", this);
      },
      onHide: function () {
        (clearInterval(r), clearInterval(i), clearInterval(o));
      },
      methods: f(f({}, (0, _.mapActions)("fence", ["AddFence", "FenceDetails", "GetCodeRegion", "GetAllRegion"])), {}, {
        l: function (e) {
          return h.$t(e);
        },
        setTerminalIcon: function () {
          var e, t = (0, c.getTerminalIconCode)(this.selectedTerminal.iconType, this.appConfig.icons), n = ("").concat(this.cdn, "/ikon/device/").concat(t.code, "-1.png");
          this.markers = [(e = {
            id: this.selectedTerminal.terminalNo,
            longitude: this.selectedTerminal.lon ? this.selectedTerminal.lon : this.longitude,
            latitude: this.selectedTerminal.lat ? this.selectedTerminal.lat : this.latitude,
            width: 40,
            height: 40,
            anchor: {
              x: .5,
              y: .5
            }
          }, (0, u.default)(e, "latitude", this.selectedTerminal.lat ? this.selectedTerminal.lat : this.latitude), (0, u.default)(e, "iconPath", n), (0, u.default)(e, "rotate", t.rotateState ? this.selectedTerminal.direction : 0), e)];
        },
        enclosureChange: function (e, t) {
          var n = this;
          if (((i || o) && (clearInterval(i), clearInterval(o)), this.circles = [], this.polyline = [], this.polygons = [], 0 == e && (this.circles = [{
            longitude: this.circlesLocation ? this.circlesLocation.longitude : this.longitude,
            latitude: this.circlesLocation ? this.circlesLocation.latitude : this.latitude,
            radius: this.sliderRadius,
            fillColor: "rgba(250, 80, 81, .2)",
            color: "rgba(250, 80, 81, .2)"
          }]), 2 == e)) {
            t && (this.points.length > 3 && this.points.pop(), this.points.push(t), this.points.length >= 3 && this.points.push(this.points[0]));
            var a = this.points.map(function (e, t) {
              var a;
              return (a = {
                id: t,
                longitude: e.longitude,
                latitude: e.latitude,
                width: 30,
                height: 30,
                anchor: {
                  x: .5,
                  y: .5
                }
              }, (0, u.default)(a, "latitude", e.latitude), (0, u.default)(a, "iconPath", ("").concat(n.cdn, "/draw/qzwl-locationMap.png")), a);
            });
            (a.length >= 3 && a.pop(), this.setTerminalIcon(), this.markers = this.markers.concat(a));
            var r = {
              points: this.points,
              colorList: this.points.map(function (e) {
                return "#F75964";
              }),
              borderWidth: 1,
              width: 4
            };
            this.polyline = [r];
          }
          3 == e && (i = setTimeout(function (e) {
            n.polygons = n.pointsTwo.map(function (e) {
              return {
                points: e,
                strokeWidth: 3,
                strokeColor: "rgb(79, 230, 71)",
                fillColor: "rgba(160, 234, 234, .4)"
              };
            });
          }, 0));
        },
        sliderChanging: function (e) {
          (this.sliderRadius = e, this.scale = (0, l.scaleRatio)(this.sliderRadius));
        },
        getEnclosureInfo: function (t) {
          var n = this;
          return (0, d.default)(s.default.mark(function a() {
            var r, i, o;
            return s.default.wrap(function (a) {
              for (; ; ) switch (a.prev = a.next) {
                case 0:
                  return (a.next = 2, n.FenceDetails(t));
                case 2:
                  if ((r = a.sent).succeeded) {
                    a.next = 6;
                    break;
                  }
                  return ((0, c.qzwlToast)(r.msg, "none"), a.abrupt("return"));
                case 6:
                  if ((n.enclosureInfo = r.data, n.enclosureInfo && (n.alarmTypeId = n.enclosureInfo.alarmType, n.model.userInfo.name = n.enclosureInfo.name, n.enclosureType = n.enclosureInfo.type), 0 == n.enclosureType && (n.sliderRadius = n.slider = n.enclosureInfo.fenceData.radius, n.longitude = n.enclosureInfo.fenceData.points[0].lng, n.latitude = n.enclosureInfo.fenceData.points[0].lat, n.circlesLocation = {
                    longitude: n.enclosureInfo.fenceData.points[0].lng,
                    latitude: n.enclosureInfo.fenceData.points[0].lat
                  }, n.sliderChanging(n.slider)), 2 == n.enclosureType && (n.points = n.enclosureInfo.fenceData.points, n.points.push(n.points[0]), n.points = n.points.map(function (e, t) {
                    return {
                      longitude: e.lng,
                      latitude: e.lat
                    };
                  }), setTimeout(function () {
                    n.mapContext.includePoints({
                      points: n.points,
                      padding: [80, 30, 180, 30],
                      fail: function (t) {
                        e("log", t, " at pagesFunc/terminal/corral/info.nvue:470");
                      }
                    });
                  }, 200)), 3 != n.enclosureType)) {
                    a.next = 15;
                    break;
                  }
                  return (a.next = 13, n.GetCodeRegion(n.enclosureInfo.fenceData.adcodes[0]));
                case 13:
                  (i = a.sent).succeeded && (n.adcode = i.data[0].adcode, n.regionText = i.data[0].name, n.pointsTwo = (0, c.parseRegion)(i.data), (o = n.pointsTwo.flat(1)).length && setTimeout(function () {
                    n.mapContext.includePoints({
                      points: o,
                      padding: [80, 30, 180, 30],
                      fail: function (t) {
                        e("log", t, " at pagesFunc/terminal/corral/info.nvue:497");
                      }
                    });
                  }, 200));
                case 15:
                  n.enclosureChange(n.enclosureType);
                case 16:
                case "end":
                  return a.stop();
              }
            }, a);
          }))();
        },
        saveEnclosure: function () {
          var t = this;
          return (0, d.default)(s.default.mark(function n() {
            var a, i, o;
            return s.default.wrap(function (n) {
              for (; ; ) switch (n.prev = n.next) {
                case 0:
                  if (t.model.userInfo.name) {
                    n.next = 3;
                    break;
                  }
                  return ((0, c.qzwlToast)(h.$t("enclosure.please.fence.name.msg"), "none"), n.abrupt("return"));
                case 3:
                  if (t.model.userInfo.name.trim()) {
                    n.next = 6;
                    break;
                  }
                  return ((0, c.qzwlToast)(h.$t("enclosure.please.fence.name.msg"), "none"), n.abrupt("return"));
                case 6:
                  if ((a = [], 0 == t.enclosureType && (a = [{
                    lat: t.circlesLocation ? t.circlesLocation.latitude : t.latitude,
                    lng: t.circlesLocation ? t.circlesLocation.longitude : t.longitude
                  }]), 2 == t.enclosureType && (a = (a = t.points.filter(function (e, n) {
                    return n !== t.points.length - 1;
                  })).map(function (e, t) {
                    return {
                      lng: e.longitude,
                      lat: e.latitude
                    };
                  })), 3 == t.enclosureType && (a = []), e("log", t.adcode, "this.adcode", " at pagesFunc/terminal/corral/info.nvue:554"), i = {
                    alarmType: t.alarmTypeId,
                    fenceData: {
                      points: a,
                      radius: 0 == t.enclosureType ? t.sliderRadius : 0,
                      adcodes: 3 == t.enclosureType ? [t.adcode] : []
                    },
                    id: t.id || 0,
                    isValid: !0,
                    name: t.model.userInfo.name,
                    type: Number(t.enclosureType),
                    terminalId: t.selectedTerminal.id
                  }, o = t.id ? "PUT" : "POST", !(2 == t.enclosureType && i.fenceData.points.length < 3))) {
                    n.next = 16;
                    break;
                  }
                  return ((0, c.qzwlToast)(h.$t("enclosure.polygon.fence-msg"), "none"), n.abrupt("return"));
                case 16:
                  if ((e("log", i.fenceData.adcodes[0], "this.adcode", " at pagesFunc/terminal/corral/info.nvue:576"), 3 != t.enclosureType || i.fenceData.adcodes[0] && i.fenceData.adcodes[0].length)) {
                    n.next = 20;
                    break;
                  }
                  return ((0, c.qzwlToast)(h.$t("enclosure.district.fence-msg"), "none"), n.abrupt("return"));
                case 20:
                  return (n.next = 22, t.AddFence([i, o]));
                case 22:
                  n.sent.succeeded && ((0, c.qzwlToast)(h.$t("common.save.success"), "none"), r = setTimeout(function () {
                    uni.navigateBack({
                      delta: 1
                    });
                  }, 1e3));
                case 24:
                case "end":
                  return n.stop();
              }
            }, n);
          }))();
        },
        clickMap: function (e) {
          (0 == this.enclosureType && (this.circlesLocation = JSON.parse(JSON.stringify(e.detail)), this.enclosureChange(this.enclosureType)), 2 == this.enclosureType && this.enclosureChange(this.enclosureType, e.detail));
        },
        backOrRemoveLine: function (e) {
          var t = this;
          "back" == e ? (this.points = this.points.filter(function (e, n) {
            return n !== t.points.length - 2;
          }), 1 == this.points.length && (this.points = []), this.enclosureChange(this.enclosureType)) : (this.points = [], this.enclosureChange(this.enclosureType));
        },
        pickerGetDistrict: function (e) {
          var t = this;
          return (async function () {
            var a, r, i, o;
            (a = [[], ["\u4e0d\u9650"], ["\u4e0d\u9650"]], r = t.regionList.sort((0, c.sortCode)("adcode")), a[0] = r.map(function (e) {
              return e.name;
            }), i = r[a[0].indexOf(e[0])], a[1] = a[1].concat(i.districts.map(function (e) {
              return e.name;
            })), (o = i.districts[a[1].indexOf(e[1]) - 1]) && (a[2] = a[2].concat(o.districts.map(function (e) {
              return e.name;
            }))), t.$nextTick(function () {
              t.columns = a;
            }));
          })();
        },
        pickerChange: function (e) {
          var t = e.columnIndex, n = (e.index, e.value), a = (e.indexs, e.picker), r = void 0 === a ? this.$refs.uPicker : a;
          (0 == t && (n[1] = "\u4e0d\u9650", n[2] = "\u4e0d\u9650", this.pickerGetDistrict(n, r)), 1 == t && (n[2] = "\u4e0d\u9650", this.pickerGetDistrict(n, r)));
        },
        showClick: function () {
          (uni.hideKeyboard(), this.pickerGetDistrict(["\u5317\u4eac\u5e02", "\u4e0d\u9650", "\u4e0d\u9650"], this.$refs.uPicker), this.districtPickerShow = !0);
        },
        pickerConirmHangler: function (t) {
          var n = this;
          return (async function () {
            var r, i, d;
            r = n.regionList.sort((0, c.sortCode)("adcode"));
            i = (0, c.getRegionInfo)(r, t.value)[0];
            n.adcode = i.adcode;
            n.regionText = i.name;
            (d = await n.GetCodeRegion(n.adcode), n.pointsTwo = (0, c.parseRegion)(d.data), i.center.split(","), n.pointsTwo.length && (o = setTimeout(function () {
              n.mapContext.includePoints({
                points: n.pointsTwo.flat(1),
                padding: [80, 30, 180, 30],
                fail: function (t) {
                  e("log", t, " at pagesFunc/terminal/corral/info.nvue:692");
                }
              });
            }, 0)), n.districtPickerShow = !1, n.enclosureChange(n.enclosureType));
          })();
        },
        sliderBlur: function () {
          ((this.slider < 300 || !this.slider) && (this.slider = this.sliderRadius = 300), this.sliderChanging(this.slider), this.sliderShow = !0);
        }
      }),
      watch: {
        sliderRadius: {
          handler: function () {
            this.enclosureChange(this.enclosureType);
          }
        }
      }
    };
    t.default = y;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
