// webpack 模块 552  [nvue]
// 出现于: pages/home/home.js
const __r = require('./__runtime.js').wrap();
(function (e, t, n) {
  "use strict";
  (function (e) {
    var r = require("@/.unpacked/nvue/3.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var a, i, o, s = r(require("@/.unpacked/nvue/22.js")), d = r(require("@/.unpacked/nvue/23.js")), u = r(require("@/.unpacked/nvue/5.js")), l = require("vuex"), c = require("../../common/utils.nvue.js"), _ = require("@/.unpacked/nvue/819.js"), m = r(require("../../common/config.nvue.js")), p = r(require("../../components/noticeNavBar/noticeNavBar.nvue")), f = r(require("../../components/activationPopup/activationPopup.nvue")), h = r(require("../../components/terminalInfo/terminalInfo.nvue")), y = r(require("../../components/loginHint/loginHint.nvue")), M = r(require("../../components/Advertising/Advertising.nvue")), g = r(require("../../components/qzwlShare/qzwlShare.nvue")), v = r(require("../../components/payPopup/payPopup.nvue")), L = r(require("../../components/permissionPopup/permissionPopup.nvue"));
    function Y(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, r));
      }
      return n;
    }
    function b(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? Y(Object(n), !0).forEach(function (t) {
          (0, u.default)(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Y(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    var w = getApp().globalData, k = (a = {
      components: {
        activationPopup: f.default,
        noticeNavBar: p.default,
        terminalInfo: h.default,
        qzwlShare: g.default,
        loginHint: y.default,
        payPopup: v.default,
        Advertising: M.default,
        permissionPopup: L.default
      },
      data: function () {
        return {
          activationEnable: m.default.activation.enable,
          cdn: m.default.cdn,
          titleColor: m.default.titleColor,
          primaryColor: m.default.primaryColor,
          scale: m.default.defaultScale,
          secondsToRefresh: m.default.secondsToRefresh,
          mapContext: null,
          enableSatellite: !1,
          enableTraffic: !1,
          showLocation: !1,
          longitude: 116.4,
          latitude: 39.91,
          myLon: 0,
          myLat: 0,
          markers: [],
          polyline: [],
          deviceLatLonList: [],
          wxBrowser: !0,
          vipPopupShowHome: !1,
          vipPopupDataHome: null,
          vipPopupUrlHome: "",
          shareTitle: "",
          sharePath: "",
          adShow: !1
        };
      },
      computed: b(b(b(b({}, (0, l.mapGetters)(["sysInfo", "isAuthenticated", "selectedTerminal", "terminals", "appConfig", "userType", "activationState", "noticeData", "isAuditMode", "advertisingState", "unBindMarkerId", "isAuditModeAndroid"])), (0, l.mapState)("device", ["simState", "simData", "bindDeviceState", "defaultPasswordNotice"])), (0, l.mapState)("terminal", ["deviceMarker", "initNeed"])), {}, {
        noticeControl: function () {
          return (this.sysInfo.windowHeight, "50rpx");
        },
        loginHintBottom: function () {
          return {
            bottom: "8rpx"
          };
        },
        mapControl: function () {
          return (this.sysInfo.windowHeight, "32rpx");
        },
        genDistance: function () {
          return ((0, _.getDistance)(this.latitude, this.longitude, this.myLat, this.myLon) / 1e3).toFixed(3);
        },
        joinCluster: function () {
          return 3 != this.userType;
        }
      }),
      onShareAppMessage: function () {
        return {
          title: w.$t("app.name"),
          imageUrl: m.default.cdn + "/draw/qzwl-logo.png",
          path: "/pages/home/home"
        };
      },
      onLoad: function () {
        var t = this;
        (e("log", this.sysInfo, "this.sysInfo", " at pages/home/home.nvue:350"), this.isAuthenticated ? uni.showTabBar() : (this.adShow = this.advertisingState, uni.onNetworkStatusChange((function () {
          var e = (0, d.default)(s.default.mark(function e(n) {
            return s.default.wrap(function (e) {
              for (; ; ) switch (e.prev = e.next) {
                case 0:
                  if (!n.isConnected) {
                    e.next = 4;
                    break;
                  }
                  return (e.next = 3, t.GetAdvertising());
                case 3:
                  t.adShow = t.advertisingState;
                case 4:
                case "end":
                  return e.stop();
              }
            }, e);
          }));
          return function (t) {
            return e.apply(this, arguments);
          };
        })())));
      },
      onShow: function () {
        var t = this;
        (e("log", "index-onShow", " at pages/home/home.nvue:390"), this.sharePath = "/pages/home/home", this.shareTitle = w.$t("app.name"), this.isAuthenticated ? (uni.showTabBar(), this.init()) : (this.markers = [], "ios" == this.sysInfo.platform ? this.mapContext.removeMarkers({
          markerIds: this.deviceMarker.map(function (e) {
            return e.id;
          }),
          complete: function (n) {
            (t.setDeviceMarker(), e("log", "res", n, t.deviceMarker, " at pages/home/home.nvue:410"));
          }
        }) : this.mapContext.addMarkers({
          markers: [],
          clear: !0,
          complete: function (n) {
            (t.setDeviceMarker(), e("log", "res", n, t.deviceMarker, " at pages/home/home.nvue:419"));
          }
        }), this.markers = [], uni.setNavigationBarTitle({
          title: "\u9996\u9875"
        })));
      },
      onReady: function () {
        var t = this;
        (e("log", "index-onReady", " at pages/home/home.nvue:434"), this.mapContext = uni.createMapContext("map", this), this.mapContext.initMarkerCluster({
          enableDefaultStyle: !1,
          zoomOnClick: !0,
          gridSize: 60,
          complete: function (t) {
            e("log", "initMarkerCluster", t, " at pages/home/home.nvue:443");
          }
        }), this.mapContext.on("markerClusterCreate", function (e) {
          var n = [];
          (e.clusters.forEach(function (e, t) {
            var r = e.center, a = e.clusterId, i = e.markerIds, o = b(b({
              clusterId: a
            }, r), {}, {
              width: 0,
              height: 0,
              iconPath: "",
              label: {
                content: i.length + "",
                fontSize: 16,
                color: "#fff",
                width: 50,
                height: 50,
                bgColor: "rgba(0, 128, 255, 0.4)",
                borderRadius: 25,
                textAlign: "center",
                anchorX: -10,
                anchorY: -35
              }
            });
            n.push(o);
          }), t.mapContext.addMarkers({
            markers: n,
            clear: !1
          }));
        }));
      }
    }, (0, u.default)(a, "onShareAppMessage", function () {
      return {
        title: this.shareTitle,
        imageUrl: m.default.cdn + "/draw/qzwl-logo.png",
        path: this.sharePath
      };
    }), (0, u.default)(a, "onHide", function () {
      var e = this;
      (this.deviceLatLonList = [], this.polyline = [], clearInterval(void 0), clearInterval(i), clearInterval(o), setTimeout(function () {
        e.secondsToRefresh = 0;
      }, 100), this.$refs.qzwlShare && (this.$refs.qzwlShare.shareLocationShow = !1, this.$refs.qzwlShare.isToShare = !1, this.$refs.qzwlShare.selectTime = !1, this.$refs.qzwlShare.defaultIndex = [0], this.$refs.qzwlShare.shareTime = this.l("common.0.5-day"), this.$refs.qzwlShare.selectedTime = 720), this.$refs.terminalInfo && (this.$refs.terminalInfo.vipPopupShow = !1));
    }), (0, u.default)(a, "methods", b(b(b(b(b(b({}, (0, l.mapActions)("terminal", ["GetTerminalList", "GetTerminalInfo", "GetTerminalInfos"])), (0, l.mapActions)("device", ["GetDeviceInit", "GetValueAdded"])), (0, l.mapActions)("app", ["GetAdvertising"])), (0, l.mapMutations)("device", ["setBindDeviceState", "setInfoBoxShow", "clearSelectedDevice", "setSelectedDevice", "setDefaultPasswordNotice", "setUnBindMarkerId"])), (0, l.mapMutations)("terminal", ["setInitNeed", "setDeviceMarker"])), {}, {
      l: function (e) {
        return w.$t(e);
      },
      setShareMp: function (e) {
        (this.sharePath = e.path, this.shareTitle = e.title);
      },
      setBadgeColor: function (e) {
        return (0, c.badgeBgColor)(e);
      },
      toggleLayer: function () {
        this.enableSatellite = !this.enableSatellite;
      },
      toggleTraffic: function () {
        this.enableTraffic = !this.enableTraffic;
      },
      updatedMap: function () {
        this.mapContext = uni.createMapContext("map", this);
      },
      changeMapScale: function (e) {
        this.scale = e ? this.scale + .5 : this.scale - .5;
      },
      moveToTerminalLocate: function () {
        var e = this.selectedTerminal;
        e ? e.lon || e.lat ? e.lon && e.lat && (this.mapContext.moveToLocation({
          longitude: this.longitude,
          latitude: this.latitude
        }), this.scale = m.default.defaultScale, uni.showToast({
          title: w.$t("common.Switched.to.terminal"),
          icon: "none"
        })) : uni.showToast({
          title: w.$t("device.no-locate"),
          icon: "none"
        }) : uni.showToast({
          title: w.$t("device.no.terminal"),
          icon: "none"
        });
      },
      moveToMyLocate: function () {
        var e = this;
        uni.getLocation({
          type: "gcj02",
          success: function (t) {
            (e.showLocation = !0, e.mapContext.moveToLocation({
              longitude: t.longitude,
              latitude: t.latitude
            }), e.scale = m.default.defaultScale, uni.showToast({
              title: w.$t("common.Switched.to.mine"),
              icon: "none"
            }));
          },
          fail: function (e) {
            uni.showToast({
              title: w.$t("common.get.locate-fail"),
              icon: "none"
            });
          }
        });
      },
      ranging: function () {
        var t = this, n = this.selectedTerminal;
        n ? n.lon || n.lat ? uni.getLocation({
          type: "gcj02",
          success: function (r) {
            (t.myLon = r.longitude, t.myLat = r.latitude);
            var a = [{
              longitude: n.lon,
              latitude: n.lat
            }, {
              longitude: t.myLon,
              latitude: t.myLat
            }];
            (t.mapContext.includePoints({
              points: a,
              padding: [80, 30, 180, 30],
              fail: function (t) {
                e("log", t, " at pages/home/home.nvue:657");
              }
            }), uni.showToast({
              title: "\u60a8\u8ddd\u79bb\u8bbe\u5907\u6709" + t.genDistance + "km",
              icon: "none"
            }));
          },
          fail: function (e) {
            uni.showToast({
              title: w.$t("common.get.locate-fail"),
              icon: "none"
            });
          }
        }) : uni.showToast({
          title: w.$t("device.no-locate"),
          icon: "none"
        }) : uni.showToast({
          title: w.$t("device.no.terminal"),
          icon: "none"
        });
      },
      loopMyLocation: function () {
        var e = this;
        if (this.myLon && this.myLat) 116.4 == this.longitude && 39.91 == this.latitude && (this.longitude = this.myLon, this.latitude = this.myLat); else var t = setTimeout(function () {
          (uni.getLocation({
            type: "gcj02",
            success: function (t) {
              (e.myLon = t.longitude, e.myLat = t.latitude, e.showLocation = !0);
            },
            fail: function (n) {
              (clearTimeout(t), 22 != n.code && e.loopMyLocation());
            }
          }), clearTimeout(t));
        }, 1e3);
      },
      init: function () {
        var e = this;
        return (async function () {
          await e.terminalHangle();
          (i && clearInterval(i), e.resetInterval());
        })();
      },
      resetInterval: function () {
        var e = this;
        1 != this.userType && (clearInterval(i), this.secondsToRefresh = m.default.secondsToRefresh, i = setInterval(function () {
          (e.secondsToRefresh = 0 === e.secondsToRefresh ? m.default.secondsToRefresh : e.secondsToRefresh - 1, 0 == e.secondsToRefresh && e.countDown());
        }, 1e3));
      },
      countDown: function () {
        var e = this;
        return (async function () {
          e.secondsToRefresh = 0;
          clearInterval(i);
          await e.fetchDataTerminal("terId");
          e.resetInterval();
        })();
      },
      debounceOnRefresh: function () {
        if (!this.selectedTerminal) return (0, c.qzwlToast)(w.$t("device.no.terminal"), "none");
        uni.$u.debounce(this.onRefresh, 500);
      },
      onRefresh: function () {
        var e = this;
        return (async function () {
          await e.countDown();
          return (0, c.qzwlToast)(w.$t("common.refurbish.success"), "none");
        })();
      },
      terminalHangle: function () {
        var t = this;
        return (0, d.default)(s.default.mark(function n() {
          return s.default.wrap(function (n) {
            for (; ; ) switch (n.prev = n.next) {
              case 0:
                return (n.prev = 0, n.next = 3, t.fetchDataTerminal());
              case 3:
                n.next = 8;
                break;
              case 5:
                (n.prev = 5, n.t0 = n.catch(0), e("log", n.t0, "eee", " at pages/home/home.nvue:759"));
              case 8:
                if ((n.prev = 8, 0 == t.terminals.length && t.bindDeviceState && t.isAuthenticated && uni.showModal({
                  title: w.$t("mine.bind.terminal"),
                  content: w.$t("device.not.terminal"),
                  cancelText: w.$t("device.not-go"),
                  confirmText: w.$t("device.go"),
                  success: function (e) {
                    (t.setBindDeviceState(!1), e.cancel || uni.navigateTo({
                      url: ("/pagesFunc/terminal/list/index?bind=").concat(!0)
                    }));
                  }
                }), !t.selectedTerminal)) {
                  n.next = 20;
                  break;
                }
                return (n.next = 13, t.getDeviceInit());
              case 13:
                if (!(t.activationState > 1 && t.isAuthenticated)) {
                  n.next = 18;
                  break;
                }
                return (uni.hideTabBar(), t.setInfoBoxShow(!1), n.next = 18, t.GetValueAdded({
                  terminalId: t.selectedTerminal.id
                }));
              case 18:
                (t.activationState <= 1 && t.isAuthenticated && (uni.showTabBar(), t.setInfoBoxShow(!0), t.simState && t.isAuthenticated && t.$nextTick(function () {
                  (t.vipPopupShowHome = !0, t.vipPopupDataHome = t.simData, t.vipPopupUrlHome = ("/pagesFunc/terminal/device-card?iccid=").concat(t.selectedTerminal.iccid));
                })), t.defaultPasswordNotice && uni.showModal({
                  title: "\u6e29\u99a8\u63d0\u793a",
                  content: "\u60a8\u5f53\u524d\u8bbe\u5907\u7684\u5bc6\u7801\u4e3a\u9ed8\u8ba4\u5bc6\u7801\uff0c\u51fa\u4e8e\u5b89\u5168\u8003\u8651\uff0c\u5efa\u8bae\u60a8\u5c3d\u5feb\u4fee\u6539",
                  cancelText: "\u6682\u4e0d\u4fee\u6539",
                  confirmText: "\u524d\u5f80\u4fee\u6539",
                  success: function (e) {
                    (t.setDefaultPasswordNotice(!1), e.cancel || t.gotoPages(("/pagesCore/account/revise-pwd?userType=").concat(3)));
                  }
                }));
              case 20:
                return (t.$nextTick(function () {
                  t.adShow = t.advertisingState;
                }), n.finish(8));
              case 22:
              case "end":
                return n.stop();
            }
          }, n, null, [[0, 5, 8, 22]]);
        }))();
      },
      fetchDataTerminal: function (e) {
        var t = this;
        return (0, d.default)(s.default.mark(function n() {
          return s.default.wrap(function (n) {
            for (; ; ) switch (n.prev = n.next) {
              case 0:
                return (n.next = 2, t.refreshTerminal(e));
              case 2:
                if (t.selectedTerminal) {
                  n.next = 4;
                  break;
                }
                return n.abrupt("return");
              case 4:
                t.setMapDetails();
              case 5:
              case "end":
                return n.stop();
            }
          }, n);
        }))();
      },
      setMapDetails: function () {
        var t, n, r, a, i = this;
        if ((this.selectedTerminal.lon && this.selectedTerminal.lat && (t = {
          longitude: this.selectedTerminal.lon,
          latitude: this.selectedTerminal.lat
        }, (n = (0, c.storeLocation)(this.deviceLatLonList, t)) && this.deviceLatLonList.push(t), n && this.deviceLatLonList.length >= 2 ? (r = this.deviceLatLonList[this.deviceLatLonList.length - 2].longitude, a = this.deviceLatLonList[this.deviceLatLonList.length - 2].latitude) : (r = this.deviceLatLonList[this.deviceLatLonList.length - 1].longitude, a = this.deviceLatLonList[this.deviceLatLonList.length - 1].latitude)), this.longitude = r || 116.4, this.latitude = a || 39.91, this.drawMarkers(r, a), n && this.deviceLatLonList.length >= 2)) {
          this.drawTrack();
          var s = this.deviceLatLonList[this.deviceLatLonList.length - 2], d = this.deviceLatLonList[this.deviceLatLonList.length - 1];
          if ("android" == this.sysInfo.platform) {
            var u = {
              markerId: this.selectedTerminal.id,
              destination: d,
              duration: 500
            };
            (this.mapContext.removeMarkers({
              markerIds: this.selectedTerminal.id,
              complete: function (t) {
                e("log", "resremoveMarkersremoveMarkers", t, " at pages/home/home.nvue:898");
              }
            }), this.mapContext.translateMarker(u), this.mapContext.moveToLocation(d));
          } else o = setInterval(function () {
            (i.moveCar(s, d, 500), clearInterval(o));
          }, 500);
        }
      },
      drawMarkers: function (e, t) {
        var n = this, r = this.deviceMarker.map(function (r) {
          if (r.lon && r.lat) {
            var a;
            a = 1 == r.deviceState ? r.motion ? r.deviceState : "02" : r.deviceState;
            var i = (0, c.getTerminalIconCode)(r.iconType, n.appConfig.icons);
            return {
              id: r.id,
              longitude: r.id == n.selectedTerminal.id ? e : r.lon,
              latitude: r.id == n.selectedTerminal.id ? t : r.lat,
              width: 40,
              height: 40,
              anchor: {
                x: .5,
                y: .5
              },
              rotate: i.rotateState ? r.direction : 0,
              iconPath: ("").concat(n.cdn, "/ikon/device/").concat(i.code, "-").concat(a, ".png"),
              callout: {
                content: ("").concat(r.terminalName || r.terminalNo),
                display: "ALWAYS",
                color: n.setBadgeColor(r.status),
                bgColor: "#fff",
                textAlign: "center",
                padding: 8,
                borderRadius: 10,
                fontSize: 13
              },
              joinCluster: r.id != n.selectedTerminal.id && n.joinCluster
            };
          }
        });
        (this.markers = r.filter(function (e) {
          return e;
        }), this.markers = Array.from(this.markers.reduce(function (e, t) {
          return e.set(t.id, t);
        }, new Map()).values()));
      },
      drawTrack: function () {
        var e = {
          points: this.deviceLatLonList,
          arrowLine: !0,
          colorList: this.deviceLatLonList.map(function (e) {
            return m.default.primaryColor;
          }),
          borderWidth: 1,
          width: 12,
          arrowIconPath: this.cdn + "/draw/qzwl-trackPath-img.png"
        };
        this.polyline = [e];
      },
      moveCar: function (e, t, n) {
        (this.mapContext.moveAlong({
          markerId: this.selectedTerminal.id,
          path: [{
            longitude: e.longitude,
            latitude: e.latitude
          }, {
            longitude: t.longitude,
            latitude: t.latitude
          }],
          autoRotate: !0,
          duration: n
        }), this.mapContext.moveToLocation(t));
      },
      refreshTerminal: function (e) {
        var t = this;
        return (0, d.default)(s.default.mark(function n() {
          return s.default.wrap(function (n) {
            for (; ; ) switch (n.prev = n.next) {
              case 0:
                if (t.terminals.length) {
                  n.next = 12;
                  break;
                }
                return (n.next = 3, t.GetTerminalList({
                  concat: !1,
                  noLoading: !0
                }));
              case 3:
                if (3 != t.userType && "terId" != e) {
                  n.next = 8;
                  break;
                }
                return (n.next = 6, t.GetTerminalInfo());
              case 6:
                n.next = 10;
                break;
              case 8:
                return (n.next = 10, t.GetTerminalInfos());
              case 10:
                n.next = 19;
                break;
              case 12:
                if (3 != t.userType && "terId" != e) {
                  n.next = 17;
                  break;
                }
                return (n.next = 15, t.GetTerminalInfo());
              case 15:
                n.next = 19;
                break;
              case 17:
                return (n.next = 19, t.GetTerminalInfos());
              case 19:
                (t.selectedTerminal ? uni.setNavigationBarTitle({
                  title: t.selectedTerminal.terminalName || t.selectedTerminal.terminalNo
                }) : uni.setNavigationBarTitle({
                  title: "\u9996\u9875"
                }), t.terminals.length && t.setBindDeviceState(!1), t.initNeed && (t.deviceLatLonList = [], t.init(), t.setInitNeed(!1)));
              case 22:
              case "end":
                return n.stop();
            }
          }, n);
        }))();
      },
      getDeviceInit: function () {
        var e = this;
        return (async function () {
          await e.GetDeviceInit({
            id: e.selectedTerminal.id,
            iccid: e.selectedTerminal.iccid,
            vipState: e.selectedTerminal.enableActivation,
            userState: 1 != e.userType && e.activationEnable,
            defaultPas: e.selectedTerminal.isDefaultPassword && e.appConfig.enableDefaultPasswordNotice && 1 != e.userType
          }) && (e.scale = m.default.defaultScale);
        })();
      },
      markertap: function (e) {
        e.detail.markerId;
        var t = this.deviceMarker.find(function (t) {
          return t.id == e.detail.markerId;
        });
        (this.clearSelectedDevice(), this.setSelectedDevice(t), this.deviceLatLonList = [], this.init());
      },
      is_weixin: function () {
        return "micromessenger" == navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
      },
      gotoPages: function (e) {
        if (!this.isAuthenticated) return (0, c.qzwlToast)(w.$t("device.no.terminal"), "none");
        uni.navigateTo({
          url: e
        });
      },
      openNavigate: function () {
        if (!this.selectedTerminal) return (0, c.qzwlToast)(w.$t("device.no.terminal"), "none");
        this.selectedTerminal.lon && this.selectedTerminal.lat ? uni.openLocation({
          longitude: this.selectedTerminal.lon,
          latitude: this.selectedTerminal.lat,
          name: this.selectedTerminal.terminalNo,
          address: this.selectedTerminal.TextLocation,
          fail: function () {
            uni.showToast({
              title: w.$t("device.open.locate.fail"),
              icon: "none"
            });
          }
        }) : uni.showToast({
          title: w.$t("device.no-locate"),
          icon: "none"
        });
      },
      openShare: function () {
        this.$refs.qzwlShare.shareLocationShow = !0;
      },
      closeVipPopup: function () {
        this.vipPopupShowHome = !1;
      }
    })), a);
    t.default = k;
  }).call(this, require("@/.unpacked/nvue/17.js").default);
})(module, exports, __r);
