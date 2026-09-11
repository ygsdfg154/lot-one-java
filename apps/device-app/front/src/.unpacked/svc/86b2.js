// webpack 模块 86b2  [svc]
// 出现于: pagesFunc/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (t, e, a) {
  "use strict";
  (function (t, n) {
    var r = require("@/.unpacked/svc/47a9.js");
    (Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0);
    var i = r(require("@/.unpacked/svc/127e.js")), s = r(require("@/.unpacked/svc/ee10.js")), o = r(require("@/.unpacked/svc/7ca3.js")), c = require("vuex"), u = require("../../common/utils.js"), l = r(require("../../common/config.js")), d = r(require("moment")), f = r(require("../../components/audioAgree/audioAgree.vue")), p = r(require("../../components/audioBut/audioBut.vue")), m = r(require("../../components/calendarFrame/calendarFrame.vue"));
    function v(t, e) {
      var a = Object.keys(t);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(t);
        (e && (n = n.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })), a.push.apply(a, n));
      }
      return a;
    }
    function _(t) {
      for (var e = 1; e < arguments.length; e++) {
        var a = null != arguments[e] ? arguments[e] : {};
        e % 2 ? v(Object(a), !0).forEach(function (e) {
          (0, o.default)(t, e, a[e]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : v(Object(a)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
        });
      }
      return t;
    }
    var h = new Date(), x = h.getFullYear(), w = h.getMonth() + 1;
    w = w < 10 ? ("0").concat(w) : w;
    var y = h.getDate();
    y = y < 10 ? ("0").concat(y) : y;
    var g, b, $, D = getApp().globalData, C = {
      components: {
        audioAgree: f.default,
        audioBut: p.default,
        calendarFrame: m.default
      },
      data: function () {
        return {
          cdn: l.default.cdn,
          isRecordIng: !1,
          list: [{
            name: 30
          }, {
            name: 60
          }, {
            name: 120
          }],
          currentDate: (0, d.default)(h).format("YYYY-MM-DD"),
          today: (0, d.default)(h).format("YYYY-MM-DD"),
          audioContext: null,
          mp3url: "",
          maxDate: ("").concat(x, "-").concat(w, "-").concat(y, " 23:59:59"),
          item: [],
          oldId: null,
          recordVipLimit: !1
        };
      },
      onLoad: function () {},
      onShow: function () {},
      onReady: function () {
        (this.audioContext = uni.createInnerAudioContext(), this.currentDate = this.today = (0, d.default)(new Date()).format("YYYY-MM-DD"), this.setRecordDate({
          record: this.currentDate,
          date: (0, d.default)(h).format("YYYY-MM-DD"),
          maxDate: this.maxDate
        }));
      },
      onHide: function () {
        (this.recover(), uni.stopPullDownRefresh());
      },
      onUnload: function () {
        (this.audioContext.stop(), this.audioContext.destroy(), this.initState(), uni.stopPullDownRefresh(), clearInterval(g), clearInterval(b));
      },
      onReachBottom: function () {
        0 !== this.audioList.length && this.fetchData({
          updateType: 1,
          id: this.audioList[this.audioList.length - 1].id,
          refresh: !1,
          type: "more"
        });
      },
      onPullDownRefresh: function () {
        (this.initState(), this.fetchData({
          updateType: 0,
          id: this.audioList.length ? this.audioList[0].id : 0,
          refresh: !1,
          type: "refresh"
        }));
      },
      computed: _(_(_({}, (0, c.mapGetters)(["selectedTerminal", "agreeAudio"])), (0, c.mapState)("audio", ["audioList", "status"])), {}, {
        param: function () {
          return {
            updateType: 0,
            id: 0,
            refresh: !0
          };
        }
      }),
      methods: _(_(_(_(_(_({}, (0, c.mapActions)("audio", ["DeleteAudio", "PutAudioRead", "GetAudioList"])), (0, c.mapActions)("device", ["GetDeviceInfo"])), (0, c.mapActions)("packageInfo", ["GetDeviceVipTypeList"])), (0, c.mapMutations)("audio", ["setListNeedRefresh", "setListPlay", "setListRead", "setListDelete", "initState"])), (0, c.mapMutations)("app", ["setRecordDate"])), {}, {
        l: function (t) {
          return D.$t(t);
        },
        fetchData: function (t) {
          var e = this;
          return (async function () {
            e.audioContext && e.audioContext.pause();
            e.setListNeedRefresh(t.refresh);
            e.clearInfo();
            e.setListPlay();
            await e.GetAudioList({
              terminalId: e.selectedTerminal.id,
              date: e.currentDate,
              limit: 20,
              updateType: t.updateType,
              id: t.id,
              type: t.type
            });
            (e.currentDate === e.today && e.resetInterval(), uni.stopPullDownRefresh());
          })();
        },
        clearInfo: function () {
          (this.oldId = null, clearInterval(g), clearInterval(b));
        },
        audioPlay: function (t) {
          var e = this;
          return (async function () {
            (clearInterval(g), clearInterval(b), e.setListPlay(), e.audioContext.paused || e.oldId !== t.id ? (e.playAudio(t), e.audioContext.onError(function () {
              var a = uni.getStorageSync("storageRecord"), n = a.findIndex(function (e) {
                return t.id == e.id;
              });
              (-1 != n && (a = a.filter(function (e) {
                return t.id != e.id;
              }), uni.setStorageSync("storageRecord", a), e.playAudio(t)), e.audioContext.destroy());
            }), e.audioContext.onEnded(function () {
              (clearInterval(b), e.setListPlay());
              var a = e.audioList.findIndex(function (e) {
                return t.id == e.id;
              });
              a > 0 ? e.audioPlay(e.audioList[a - 1]) : e.audioContext.stop();
            })) : e.audioContext.pause(), e.resetInterval());
          })();
        },
        playAudio: function (t) {
          var e = this;
          (this.audioContext && this.audioContext.destroy(), this.audioContext = uni.createInnerAudioContext(), this.audioContext.onPlay(async function () {
            var n;
            (n = await e.PutAudioRead({
              id: t.id
            }), n.succeeded && e.setListRead(t.id), e.oldId = t.id, clearInterval(b), b = setInterval(function () {
              e.setListPlay(t.id);
            }, 250));
          }));
          var a = uni.getStorageSync("storageRecord");
          if ((a || this.downloadRecord(t, [], 2), a)) {
            var n = a.findIndex(function (e) {
              return t.id == e.id;
            });
            -1 == n ? this.downloadRecord(t, a, 2) : (this.audioContext.src = a[n].url, this.audioContext.play());
          }
        },
        downloadAndSaveFileAPP: function (t, e, a) {
          var n = this;
          uni.downloadFile({
            url: t.url,
            success: function (r) {
              if (200 === r.statusCode) {
                var i = r.tempFilePath;
                uni.saveFile({
                  tempFilePath: i,
                  success: function (a) {
                    var r = a.savedFilePath, i = {
                      id: t.id,
                      url: r
                    };
                    (e.push(i), uni.setStorageSync("storageRecord", e), n.audioContext.src = r, n.audioContext.play());
                  },
                  fail: function (t) {
                    (0, u.qzwlToast)(D.$t("audio.save-fail"), "none");
                  }
                });
              } else n.downFile(t, e, a);
            },
            fail: function (r) {
              n.downFile(t, e, a);
            },
            complete: function (t) {
              (uni.hideLoading(), clearTimeout($));
            }
          });
        },
        downloadAndSaveFileMp: function (e, a, r) {
          var o = this;
          return (async function () {
            uni.downloadFile({
              url: e.url,
              success: function (i) {
                if (200 === i.statusCode) {
                  var s = i.tempFilePath, c = t.getFileSystemManager();
                  c.saveFile({
                    tempFilePath: s,
                    filePath: ("").concat(t.env.USER_DATA_PATH, "/").concat(e.id, ".mp3"),
                    success: function (t) {
                      n("log", t.savedFilePath, "res.savedFilePath", " at pagesFunc/terminal/audio/index.vue:354");
                      var r = t.savedFilePath, i = {
                        id: e.id,
                        url: r
                      };
                      (a.push(i), uni.setStorageSync("storageRecord", a), o.audioContext.src = r, o.audioContext.play());
                    },
                    fail: function (t) {
                      (n("log", "res", t.errMsg, " at pagesFunc/terminal/audio/index.vue:366"), o.audioContext.src = e.url, o.audioContext.play());
                    }
                  });
                } else o.downFile(e, a, r);
              },
              fail: function (t) {
                o.downFile(e, a, r);
              },
              complete: function (t) {
                (uni.hideLoading(), clearTimeout($));
              }
            });
          })();
        },
        downloadRecord: function (t, e, a) {
          (clearTimeout($), $ = setTimeout(function () {
            uni.showLoading({
              title: "\u6b63\u5728\u4e0b\u8f7d"
            });
          }, 200), this.downloadAndSaveFileAPP(t, e, a));
        },
        downFile: function (t, e, a) {
          if (a) {
            var n = --a;
            this.downloadRecord(t, e, n);
          } else (0, u.qzwlToast)("\u4e0b\u8f7d\u5931\u8d25", "none");
        },
        resetInterval: function () {
          var t = this;
          (clearInterval(g), g = setInterval((0, s.default)(i.default.mark(function e() {
            return i.default.wrap(function (e) {
              while (1) switch (e.prev = e.next) {
                case 0:
                  if (t.currentDate === t.today) {
                    e.next = 3;
                    break;
                  }
                  return (clearInterval(g), e.abrupt("return"));
                case 3:
                  return (e.next = 5, t.GetAudioList({
                    terminalId: t.selectedTerminal.id,
                    date: t.currentDate,
                    limit: 20,
                    updateType: 0,
                    id: t.audioList.length ? t.audioList[0].id : 0,
                    type: "refresh"
                  }));
                case 5:
                  (e.sent, t.loadTerminalExtend());
                case 7:
                case "end":
                  return e.stop();
              }
            }, e);
          })), 1e4));
        },
        longpressAudio: function (t) {
          var e = this;
          (this.recover(), clearInterval(g), this.item = t, uni.showActionSheet({
            title: this.l("common.manipulation-menu"),
            itemList: [this.l("common.delete.but")],
            itemColor: "#6081C7",
            success: (function () {
              var a = (0, s.default)(i.default.mark(function a(n) {
                var r;
                return i.default.wrap(function (a) {
                  while (1) switch (a.prev = a.next) {
                    case 0:
                      if (n.tapIndex) {
                        a.next = 5;
                        break;
                      }
                      return (a.next = 3, e.DeleteAudio(t.id));
                    case 3:
                      (r = a.sent, r.succeeded && (e.setListDelete(t.id), (0, u.qzwlToast)(e.l("common.deleted.success"), "none"), e.resetInterval()));
                    case 5:
                    case "end":
                      return a.stop();
                  }
                }, a);
              }));
              return function (t) {
                return a.apply(this, arguments);
              };
            })(),
            fail: function (t) {
              e.resetInterval();
            }
          }));
        },
        recover: function () {
          this.audioContext && (this.audioContext.pause(), this.setListPlay(), clearInterval(b));
        },
        loadTerminalExtend: function () {
          var t = this;
          return (async function () {
            var a, n, r, s, o, c;
            o = await t.GetDeviceInfo({
              deviceID: t.selectedTerminal.id
            });
            o.succeeded && (a = o.data.extendInfo.recordMinLimited, n = o.data.extendInfo.recordMinRemainFree, r = o.data.extendInfo.recordMinRemain);
            (c = await t.GetDeviceVipTypeList({
              terminalId: t.selectedTerminal.id,
              type: 5
            }), c.succeeded && c.data && new Date(c.data.expirationTime) > new Date() && (s = !0), a ? (s && (t.recordVipLimit = !0), n + r > 0 && (t.recordVipLimit = !0)) : t.recordVipLimit = !0);
          })();
        }
      })
    };
    e.default = C;
  }).call(this, require("@/.unpacked/svc/ed83.js")["default"], require("@/.unpacked/svc/f3b9.js")["default"]);
})(module, exports, __r);
