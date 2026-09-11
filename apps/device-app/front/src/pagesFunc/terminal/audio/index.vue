<template>
<view>
  <calendarFrame
    :currentDate="currentDate"
    :param="param"
    name="audio"
    @update:currentDate="currentDate = e"
    @update:current-date="currentDate = e"
    @fetchData="fetchData"
  ></calendarFrame>
  <audioAgree @fetchData="fetchData" @loadTerminalExtend="loadTerminalExtend" v-model="isRecordIng"></audioAgree>
  <view v-if="!agreeAudio" class="page p-b-xl">
    <view class="flex-col p-l-xl">
      <view
        v-for="(e, n, r) in { forItems: audioList }"
        :key="{ forIndex: r, key: e.id }"
        class="flex-col m-v-lg"
      >
        <view class="flex-row justify-center">
          <text class="text-sm text-grey">
            {{ e.createTime }}
          </text>
        </view>
        <view class="flex-row m-t-lg items-center" @longpress="longpressAudio(e)">
          <image class="m-r-lg" :src="cdn + '/ikon/qzwl-voice-lu.png'" />
          <view
            class="flex-row bg-primary p-v-sm p-l-lg br-xxl"
            :style="{ width: '312rpx' }"
            @click="audioPlay(e)"
          >
            <image
              :style="{ width: '48rpx', height: '48rpx' }"
              :src="cdn + '/ikon/voice-' + e.iconShow + '.png'"
             />
          </view>
          <view v-if="!e.isRead" class="m-l audioRead"></view>
        </view>
      </view>
      <u-loadmore
        v-if="audioList.length"
        :status="status"
        :line="true"
        :loadmore-text="l('common.load.more')"
        :loading-text="l('common.loading')"
        :nomore-text="l('common.no.more')"
      ></u-loadmore>
      <u-empty
        v-if="!audioList.length"
        :text="l('common.no.audio')"
        :icon="cdn + '/draw/qzwl-empty.png'"
      ></u-empty>
    </view>
    <audioBut :recordVipLimit="recordVipLimit" @recover="recover" v-model="isRecordIng"></audioBut>
  </view>
</view>
</template>

<script>
/*
 * 页面: pagesFunc/terminal/audio/index
 * 反编译自 webpack 模块 86b2（svc 编译空间）
 * async/await 还原: 5 个已转换, 2 个含条件跳转/try-catch 保持状态机原样
 * 已剥离 webpack 的 global 注入包装（保留了 2 个注入参数的绑定）
 * 变量 i 在内层被重新声明，保留短名以维持遮蔽语义
 * 变量 o 在内层被重新声明，保留短名以维持遮蔽语义
 * 变量 s 在内层被重新声明，保留短名以维持遮蔽语义
 * 变量 c 在内层被重新声明，保留短名以维持遮蔽语义
 */
import i from '@/.unpacked/svc/127e.js';
import s from '@/.unpacked/svc/ee10.js';
import o from '@/.unpacked/svc/7ca3.js';
import * as c from 'vuex';
import * as mod4ddb from '../../../common/utils.js';
import e113 from '../../../common/config.js';
import mod54f6 from 'moment';
import fefc from '../../../components/audioAgree/audioAgree.vue';
import mod0978 from '../../../components/audioBut/audioBut.vue';
import c2a6 from '../../../components/calendarFrame/calendarFrame.vue';
"use strict";
var t = require("@/.unpacked/svc/ed83.js")["default"];
var n = require("@/.unpacked/svc/f3b9.js")["default"];
var h = new Date(), x = h.getFullYear(), w = h.getMonth() + 1;
w = w < 10 ? ("0").concat(w) : w;
var y = h.getDate();
y = y < 10 ? ("0").concat(y) : y;
var g, b, $, D = getApp().globalData, C = {
  components: {
    audioAgree: fefc,
    audioBut: mod0978,
    calendarFrame: c2a6
  },
  data: function () {
    return {
      cdn: e113.cdn,
      isRecordIng: false,
      list: [{
        name: 30
      }, {
        name: 60
      }, {
        name: 120
      }],
      currentDate: mod54f6(h).format("YYYY-MM-DD"),
      today: mod54f6(h).format("YYYY-MM-DD"),
      audioContext: null,
      mp3url: "",
      maxDate: ("").concat(x, "-").concat(w, "-").concat(y, " 23:59:59"),
      item: [],
      oldId: null,
      recordVipLimit: false
    };
  },
  onLoad: function () {},
  onShow: function () {},
  onReady: function () {
    (this.audioContext = uni.createInnerAudioContext(), this.currentDate = this.today = mod54f6(new Date()).format("YYYY-MM-DD"), this.setRecordDate({
      record: this.currentDate,
      date: mod54f6(h).format("YYYY-MM-DD"),
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
      refresh: false,
      type: "more"
    });
  },
  onPullDownRefresh: function () {
    (this.initState(), this.fetchData({
      updateType: 0,
      id: this.audioList.length ? this.audioList[0].id : 0,
      refresh: false,
      type: "refresh"
    }));
  },
  computed: {
    ...c.mapGetters(["selectedTerminal", "agreeAudio"]),
    ...c.mapState("audio", ["audioList", "status"]),
    param: function () {
      return {
        updateType: 0,
        id: 0,
        refresh: true
      };
    }
  },
  methods: {
    ...c.mapActions("audio", ["DeleteAudio", "PutAudioRead", "GetAudioList"]),
    ...c.mapActions("device", ["GetDeviceInfo"]),
    ...c.mapActions("packageInfo", ["GetDeviceVipTypeList"]),
    ...c.mapMutations("audio", ["setListNeedRefresh", "setListPlay", "setListRead", "setListDelete", "initState"]),
    ...c.mapMutations("app", ["setRecordDate"]),
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
                mod4ddb.qzwlToast(D.$t("audio.save-fail"), "none");
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
      } else mod4ddb.qzwlToast("\u4e0b\u8f7d\u5931\u8d25", "none");
    },
    resetInterval: function () {
      var t = this;
      (clearInterval(g), g = setInterval(s(i.mark(function e() {
        return i.wrap(function (e) {
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
          var a = s(i.mark(function a(n) {
            var r;
            return i.wrap(function (a) {
              while (1) switch (a.prev = a.next) {
                case 0:
                  if (n.tapIndex) {
                    a.next = 5;
                    break;
                  }
                  return (a.next = 3, e.DeleteAudio(t.id));
                case 3:
                  (r = a.sent, r.succeeded && (e.setListDelete(t.id), mod4ddb.qzwlToast(e.l("common.deleted.success"), "none"), e.resetInterval()));
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
        }), c.succeeded && c.data && new Date(c.data.expirationTime) > new Date() && (s = true), a ? (s && (t.recordVipLimit = true), n + r > 0 && (t.recordVipLimit = true)) : t.recordVipLimit = true);
      })();
    }
  }
};
export default C;

</script>

<style scoped>
@charset "UTF-8";.audioRead{background-color:red;width:16rpx;height:16rpx;border-radius:8rpx}
</style>
