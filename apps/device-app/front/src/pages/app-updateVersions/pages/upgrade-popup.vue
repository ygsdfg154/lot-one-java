<template>
<view class="flex-center">
  <view class="content botton-radius">
    <view class="content-bg"></view>
    <view class="content-top">
      <image class="content-top" :src="cdn + '/draw/qzwl-update.png'" />
    </view>
    <view class="content-header"></view>
    <view class="content-body">
      <view class="title">
        <text>
          {{ installing ? '正在升级' : title }}
        </text>
      </view>
      <view class="body">
        <scroll-view class="box-des-scroll">
          <text class="box-des">
            {{ installing ? '正在为您下载，请耐心等待...' : content }}
          </text>
        </scroll-view>
      </view>
      <view class="footer flex-center">
        <button
          v-if="isAppStore"
          class="content-button"
          :style="{ backgroundColor: primaryColor }"
          @click="jumpToAppStore"
        >
          {{ downLoadBtnTextiOS }}
        </button>
        <view v-if="!downloadSuccess" v-else class="progress-box flex-column">
          <progress class="progress" :percent="downLoadPercent" :activeColor="primaryColor"></progress>
          <view>
            <text>
              {{ downLoadingText }}
            </text>
            <text>
              {{ downloadedSize }}{{ packageFileSize }}
            </text>
          </view>
          <button class="content-button" @click="cancelUpdate">
            取消下载
          </button>
        </view>
        <button
          v-else
          class="content-button"
          :style="{ backgroundColor: primaryColor }"
          @click="updateApp"
        >
          {{ downLoadBtnText }}
        </button>
        <button
          v-if="downloadSuccess && !installed"
          v-else
          class="content-button"
          :style="{ backgroundColor: primaryColor }"
          :loading="installing"
          :disabled="installing"
          @click="installPackage"
        >
          {{ installing ? '正在安装……' : '下载完成，立即安装' }}
        </button>
        <button
          v-if="installed && isWGT"
          class="content-button"
          :style="{ backgroundColor: primaryColor }"
          @click="restart"
        >
          安装完毕，点击重启
        </button>
      </view>
    </view>
    <image
      v-if="!isMandatory"
      class="close-img"
      :src="cdn + '/draw/qzwl-close.png'"
      @click="(t.stopPropagation(), closeUpdate(t))"
     />
  </view>
</view>
</template>

<script>
/*
 * 页面: pages/app-updateVersions/pages/upgrade-popup
 * 反编译自 webpack 模块 97e2（svc 编译空间）
 * async/await 还原: 1 个已转换, 2 个含条件跳转/try-catch 保持状态机原样
 * 已剥离 webpack 的 global 注入包装（保留了 1 个注入参数的绑定）
 * 变量 r 在内层被重新声明，保留短名以维持遮蔽语义
 * 变量 i 在内层被重新声明，保留短名以维持遮蔽语义
 * 变量 o 在内层被重新声明，保留短名以维持遮蔽语义
 * 变量 s 在内层被重新声明，保留短名以维持遮蔽语义
 */
import r from '@/.unpacked/svc/127e.js';
import i from '@/.unpacked/svc/7ca3.js';
import o from '@/.unpacked/svc/ee10.js';
import s from '../../../common/config.js';
"use strict";
var e = require("@/.unpacked/svc/f3b9.js")["default"];
var c, l = "UNI_ADMIN_UPGRADE_CENTER_LOCAL_FILE_PATH", f = null;
var m = {
  data: function () {
    return {
      cdn: s.cdn,
      primaryColor: s.primaryColor,
      installForBeforeFilePath: "",
      installed: false,
      installing: false,
      downloadSuccess: false,
      downloading: false,
      downLoadPercent: 0,
      downloadedSize: 0,
      packageFileSize: 0,
      tempFilePath: "",
      title: "\u66f4\u65b0\u65e5\u5fd7",
      contents: "",
      isMandatory: false,
      subTitle: "\u53d1\u73b0\u65b0\u7248\u672c",
      downLoadBtnTextiOS: "\u7acb\u5373\u8df3\u8f6c\u5347\u7ea7",
      downLoadBtnText: "\u7acb\u5373\u5347\u7ea7",
      downLoadingText: "\u5b89\u88c5\u5305\u4e0b\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e"
    };
  },
  onLoad: function (t) {
    var n = t.local_storage_key;
    if (!n) return (e("error", "local_storage_key\u4e3a\u7a7a\uff0c\u8bf7\u68c0\u67e5\u540e\u91cd\u8bd5", " at pages/app-updateVersions/pages/upgrade-popup.vue:206"), void uni.navigateBack());
    var a = uni.getStorageSync(n);
    if (!a) return (e("error", "\u5b89\u88c5\u5305\u4fe1\u606f\u4e3a\u7a7a\uff0c\u8bf7\u68c0\u67e5\u540e\u91cd\u8bd5", " at pages/app-updateVersions/pages/upgrade-popup.vue:213"), void uni.navigateBack());
    e("log", "localPackageInfo", a, " at pages/app-updateVersions/pages/upgrade-popup.vue:217");
    var r = ["version", "url", "type"];
    for (var i in a) if (-1 !== r.indexOf(i) && !a[i]) return (e("error", ("\u53c2\u6570 ").concat(i, " \u5fc5\u586b\uff0c\u8bf7\u68c0\u67e5\u540e\u91cd\u8bd5"), " at pages/app-updateVersions/pages/upgrade-popup.vue:221"), void uni.navigateBack());
    (Object.assign(this, a), this.checkLocalStoragePackage());
  },
  onBackPress: function () {
    if (this.isMandatory) return true;
    f && f.abort();
  },
  onHide: function () {
    c = null;
  },
  computed: {
    isWGT: function () {
      return "wgt" === this.type;
    },
    isiOS: function () {
      return !this.isWGT && this.platform.includes("iOS");
    },
    isAppStore: function () {
      return this.isiOS || !this.isiOS && !this.isWGT && -1 === this.url.indexOf(".apk");
    }
  },
  methods: {
    checkLocalStoragePackage: function () {
      var e = uni.getStorageSync(l);
      if (e) {
        var t = e.version, n = e.savedFilePath, a = e.installed;
        a || 0 !== (function () {
          var e = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : "0", t = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : "0";
          (e = String(e).split("."), t = String(t).split("."));
          for (var n = Math.min(e.length, t.length), a = 0, r = 0; r < n; r++) {
            var i = Number(e[r]), o = Number(t[r]);
            if (i > o) {
              a = 1;
              break;
            }
            if (i < o) {
              a = -1;
              break;
            }
          }
          if (0 === a && e.length !== t.length) for (var s = e.length > t.length, u = s ? e : t, d = n; d < u.length; d++) {
            var c = Number(u[d]);
            if (c > 0) {
              a = s ? 1 : -1;
              break;
            }
          }
          return a;
        })(t, this.version) ? this.deleteSavedFile(n) : (this.downloadSuccess = true, this.installForBeforeFilePath = n, this.tempFilePath = n);
      }
    },
    cancelUpdate: function () {
      uni.showModal({
        title: "\u662f\u5426\u53d6\u6d88\u4e0b\u8f7d\uff1f",
        cancelText: "\u5426",
        confirmText: "\u662f",
        success: function (e) {
          e.confirm && (f && f.abort(), uni.navigateBack());
        }
      });
    },
    closeUpdate: function () {
      var e = this;
      return o(r.mark(function t() {
        return r.wrap(function (t) {
          while (1) switch (t.prev = t.next) {
            case 0:
              if (!e.downloading) {
                t.next = 5;
                break;
              }
              if (!e.isMandatory) {
                t.next = 3;
                break;
              }
              return t.abrupt("return", uni.showToast({
                title: "\u4e0b\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e\u2026\u2026",
                icon: "none",
                duration: 500
              }));
            case 3:
              return (e.cancelUpdate(), t.abrupt("return"));
            case 5:
              if (!e.downloadSuccess || !e.tempFilePath) {
                t.next = 10;
                break;
              }
              return (t.next = 8, e.saveFile(e.tempFilePath, e.version));
            case 8:
              return (uni.navigateBack(), t.abrupt("return"));
            case 10:
              uni.navigateBack();
            case 11:
            case "end":
              return t.stop();
          }
        }, t);
      }))();
    },
    updateApp: function () {
      var e = this;
      this.checkStoreScheme().catch(function () {
        e.downloadPackage();
      });
    },
    checkStoreScheme: function () {
      var e = (this.store_list || []).filter(function (e) {
        return e.enable;
      });
      return e && e.length ? (e.sort(function (e, t) {
        return t.priority - e.priority;
      }).map(function (e) {
        return e.scheme;
      }).reduce(function (e, t, n) {
        return (c = (e || (e = Promise.reject())).catch(function () {
          return new Promise(function (e, n) {
            plus.runtime.openURL(t, function (e) {
              n(e);
            });
          });
        }), c);
      }, c), c) : Promise.reject();
    },
    downloadPackage: function () {
      var e = this;
      (this.downloading = true, f = uni.downloadFile({
        url: this.url,
        success: function (t) {
          200 == t.statusCode && (e.downloadSuccess = true, e.tempFilePath = t.tempFilePath, e.isMandatory && e.installPackage());
        },
        complete: function () {
          (e.downloading = false, e.downLoadPercent = 0, e.downloadedSize = 0, e.packageFileSize = 0, f = null);
        }
      }), f.onProgressUpdate(function (t) {
        (e.downLoadPercent = t.progress, e.downloadedSize = (t.totalBytesWritten / Math.pow(1024, 2)).toFixed(2), e.packageFileSize = (t.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2));
      }));
    },
    installPackage: function () {
      var e = this;
      (this.isWGT && (this.installing = true), plus.runtime.install(this.tempFilePath, {
        force: false
      }, (function () {
        var t = async function (n) {
          var a;
          (e.installing = false, e.installed = true, e.isWGT ? e.isMandatory && (uni.showLoading({
            icon: "none",
            title: "\u5b89\u88c5\u6210\u529f\uff0c\u6b63\u5728\u91cd\u542f\u2026\u2026"
          }), setTimeout(function () {
            (uni.hideLoading(), e.restart());
          }, 1e3)) : (a = uni.getStorageSync(l), uni.setStorageSync(l, {
            ...a,
            installed: true
          })));
        };
        return function (e) {
          return t.apply(this, arguments);
        };
      })(), (function () {
        var t = o(r.mark(function t(n) {
          return r.wrap(function (t) {
            while (1) switch (t.prev = t.next) {
              case 0:
                if (!e.installForBeforeFilePath) {
                  t.next = 4;
                  break;
                }
                return (t.next = 3, e.deleteSavedFile(e.installForBeforeFilePath));
              case 3:
                e.installForBeforeFilePath = "";
              case 4:
                (e.installing = false, e.installed = false, uni.showModal({
                  title: "\u66f4\u65b0\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u4e0b\u8f7d",
                  content: n.message,
                  showCancel: false
                }));
              case 7:
              case "end":
                return t.stop();
            }
          }, t);
        }));
        return function (e) {
          return t.apply(this, arguments);
        };
      })()), this.isWGT || this.isMandatory || uni.navigateBack());
    },
    restart: function () {
      (this.installed = false, plus.runtime.restart());
    },
    saveFile: function (e, t) {
      return new Promise(function (n, a) {
        uni.saveFile({
          tempFilePath: e,
          success: function (e) {
            var n = e.savedFilePath;
            uni.setStorageSync(l, {
              version: t,
              savedFilePath: n
            });
          },
          complete: function () {
            n();
          }
        });
      });
    },
    deleteSavedFile: function (e) {
      return (uni.removeStorageSync(l), uni.removeSavedFile({
        filePath: e
      }));
    },
    jumpToAppStore: function () {
      plus.runtime.openURL(this.url);
    }
  }
};
export default m;

</script>
