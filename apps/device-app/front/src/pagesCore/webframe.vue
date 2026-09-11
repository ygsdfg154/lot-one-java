<template>
<view>
  <web-view
    ref="webview"
    :webview-styles="{ progress: { color: $data.primaryColor } }"
    :src="$data.dataUrl"
    @message="$data.handlePostMessage"
  ></web-view>
</view>
</template>

<script>
/*
 * 页面: pagesCore/webframe
 * 反编译自 webpack 模块 8a65（svc 编译空间）
 * 已剥离 webpack 的 global 注入包装（保留了 1 个注入参数的绑定）
 * 变量 r 在内层被重新声明，保留短名以维持遮蔽语义
 * 辅助函数 c 仍被引用，保留原定义
 */
import r from '@/.unpacked/svc/7ca3.js'
import * as mod8f59 from 'vuex'
import e113 from '../common/config.js'

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

"use strict";
var e = require("@/.unpacked/svc/f3b9.js")["default"];
var o;
var l = uni.getSystemInfoSync(), u = {
  data: function () {
    return {
      dataUrl: "",
      primaryColor: e113.primaryColor
    };
  },
  computed: (function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = null != arguments[t] ? arguments[t] : {};
      t % 2 ? c(Object(a), true).forEach(function (t) {
        r(e, t, a[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(a)) : c(Object(a)).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(a, t));
      });
    }
    return e;
  })({}, mod8f59.mapGetters(["token"])),
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
        hideAlbum: false
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
export default u;

</script>
