// webpack 模块 8a65  [svc]
// 出现于: pagesCore/app-sub-service.js
const __r = require('./__runtime.js').wrap();
(function (e, t, a) {
  "use strict";
  (function (e) {
    var n = require("@/.unpacked/svc/47a9.js");
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0);
    var o, r = n(require("@/.unpacked/svc/7ca3.js")), i = require("vuex"), s = n(require("../../common/config.js"));
    function c(e, t) {
      var a = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e);
        (t && (n = n.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), a.push.apply(a, n));
      }
      return a;
    }
    var l = uni.getSystemInfoSync(), u = {
      data: function () {
        return {
          dataUrl: "",
          primaryColor: s.default.primaryColor
        };
      },
      computed: (function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? arguments[t] : {};
          t % 2 ? c(Object(a), !0).forEach(function (t) {
            (0, r.default)(e, t, a[t]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : c(Object(a)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
          });
        }
        return e;
      })({}, (0, i.mapGetters)(["token"])),
      onReady: function () {
        var e = this.$scope.$getAppWebview();
        "android" == l.platform && l.statusBarHeight;
        o = e.children()[0];
      },
      onLoad: function (t) {
        (t.from ? this.dataUrl = t.url + "&from=" + t.from : t.sim ? this.dataUrl = t.url + "&sim=" + t.sim : t.lat ? this.dataUrl = t.url + "&lat=" + t.lat : this.dataUrl = t.url, e("log", this.dataUrl, "this.dataUrl", " at pagesCore/webframe.vue:50"));
      },
      onNavigationBarButtonTap: function (e) {
        if ("menu" == e.type) {
          var t = this.$scope.$getAppWebview(), a = t.children()[0], n = a.getURL(), o = a.getTitle();
          uni.shareWithSystem({
            href: n,
            summary: o
          });
        } else "close" == e.type && uni.navigateBack();
      },
      methods: {
        handlePostMessage: function (e) {
          if (e && e.detail && e.detail.data && e.detail.data[0]) {
            var t = e.detail.data[0], a = t.action, n = t.payload;
            switch (a) {
              case "login":
                this.startLogin(a, n);
                break;
              case "getVersion":
                this.startGetVersion(a, n);
                break;
              case "scanCode":
                this.startScanCode(a, n);
                break;
              case "getLocation":
                this.startGetLocation(a, n);
                break;
              case "openLocation":
                this.startOpenLocation(a, n);
                break;
              case "chooseImage":
                this.startChooseImage(a, n);
                break;
              case "chooseVideo":
                this.startChooseVideo(a, n);
                break;
              case "previewImage":
                this.startPreviewImage(a, n);
                break;
              case "getVideoInfo":
                this.startGetVideoInfo(a, n);
                break;
              case "setClipboardData":
                this.startSetClipboardData(a, n);
                break;
              case "getClipboardData":
                this.startGetClipboardData(a);
                break;
              case "getSystemInfo":
                this.startGetSystemInfo(a, n);
                break;
              default:
                break;
            }
          }
        },
        startLogin: function (e) {
          this.token;
          var t = {
            action: e,
            data: {
              token: this.token
            }
          };
          o.evalJS(("handleMessage(").concat(JSON.stringify(t), ")"));
        },
        startGetVersion: function (e) {
          var t = plus.runtime, a = t.version, n = t.versionCode, r = {
            action: e,
            data: {
              version: a,
              versionCode: n
            }
          };
          o.evalJS(("handleMessage(").concat(JSON.stringify(r), ")"));
        },
        startScanCode: function (e) {
          var t = uni.requireNativePlugin("Mpaas-Scan-Module");
          t.mpaasScan({
            type: "qr",
            scanType: ["qrCode", "barCode"],
            hideAlbum: !1
          }, function (t) {
            if ("success" == t.resp_message) {
              var a = {
                action: e,
                data: t
              };
              o.evalJS(("handleMessage(").concat(JSON.stringify(a), ")"));
            }
          });
        },
        startGetLocation: function (e) {
          uni.getLocation({
            type: "gcj02",
            complete: function (t) {
              var a = {
                action: e,
                data: t
              };
              o.evalJS(("handleMessage(").concat(JSON.stringify(a), ")"));
            }
          });
        },
        startOpenLocation: function (e, t) {
          uni.openLocation({
            latitude: parseFloat(t.latitude),
            longitude: parseFloat(t.longitude),
            scale: parseInt(t.scale) || 18,
            name: t.name || "",
            address: t.address || "",
            complete: function (t) {
              var a = {
                action: e,
                data: t
              };
              o.evalJS(("handleMessage(").concat(JSON.stringify(a), ")"));
            }
          });
        },
        startChooseImage: function (t, a) {
          uni.chooseImage({
            count: a.count,
            sizeType: a.sizeType,
            extension: a.extension,
            sourceType: a.sourceType,
            crop: a.crop,
            complete: function (a) {
              e("log", "chooseImage.complete", a, " at pagesCore/webframe.vue:178");
              var n = {
                action: t,
                data: a
              };
              o.evalJS(("handleMessage(").concat(JSON.stringify(n), ")"));
            }
          });
        },
        startChooseVideo: function (t, a) {
          uni.chooseVideo({
            sourceType: a.sourceType,
            extension: a.extension,
            compressed: a.compressed,
            maxDuration: a.maxDuration,
            camera: a.camera,
            complete: function (a) {
              e("log", "chooseVideo.complete", a, " at pagesCore/webframe.vue:192");
              var n = {
                action: t,
                data: a
              };
              o.evalJS(("handleMessage(").concat(JSON.stringify(n), ")"));
            }
          });
        },
        startSetClipboardData: function (e, t) {
          uni.setClipboardData({
            data: t.data,
            complete: function (t) {
              var a = {
                action: e,
                data: "setClipboardData:ok"
              };
              o.evalJS(("handleMessage(").concat(JSON.stringify(a), ")"));
            }
          });
        },
        startGetClipboardData: function (t) {
          uni.getClipboardData({
            success: function (a) {
              e("log", "getClipboardData.success", a, " at pagesCore/webframe.vue:210");
              var n = {
                action: t,
                data: a
              };
              o.evalJS(("handleMessage(").concat(JSON.stringify(n), ")"));
            },
            fail: function (e) {
              var a = {
                action: t,
                data: {
                  errCode: -1,
                  code: -1,
                  errMsg: "getClipboardData:fail"
                }
              };
              o.evalJS(("handleMessage(").concat(JSON.stringify(a), ")"));
            }
          });
        },
        startPreviewImage: function (e, t) {
          uni.previewImage({
            urls: t.urls || [],
            current: t.current || 0,
            complete: function (t) {
              var a = {
                action: e,
                data: t
              };
              o.evalJS(("handleMessage(").concat(JSON.stringify(a), ")"));
            }
          });
        },
        startGetVideoInfo: function (e, t) {
          uni.getVideoInfo({
            src: t.src,
            complete: function (t) {
              var a = {
                action: e,
                data: t
              };
              o.evalJS(("handleMessage(").concat(JSON.stringify(a), ")"));
            }
          });
        },
        startGetSystemInfo: function (e) {
          uni.getSystemInfo({
            complete: function (t) {
              var a = {
                action: e,
                data: t
              };
              o.evalJS(("handleMessage(").concat(JSON.stringify(a), ")"));
            }
          });
        }
      }
    };
    t.default = u;
  }).call(this, require("@/.unpacked/svc/f3b9.js")["default"]);
})(module, exports, __r);
