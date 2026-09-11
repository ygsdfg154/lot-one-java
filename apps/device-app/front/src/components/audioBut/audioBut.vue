<template>
<view>
  <view class="audio-min flex-col">
    <view class="audio-bar">
      <u-button
        v-if="1 == value"
        type="primary"
        shape="circle"
        :text="l('audio.start')"
        @click="manualAudio"
      ></u-button>
      <u-button
        v-if="2 == value"
        type="primary"
        shape="circle"
        :text="l('audio.state')"
        @click="isCloseAtouAudio"
      ></u-button>
      <u-button
        v-if="3 == value"
        type="primary"
        shape="circle"
        text="正在持续声音安防..."
        @click="isCloseAtouAudio"
      ></u-button>
      <u-button
        v-if="4 == value"
        type="primary"
        shape="circle"
        text="正在定时声音安防..."
        @click="isCloseAtouAudio"
      ></u-button>
    </view>
    <view class="audio-title flex-col flex-wrap">
      <text class="text">
        {{ l('audio.prompt.title') }}
      </text>
      <view>
        <text class="text-sm text-gray">
          {{ l('audio.prompt.content') }}
        </text>
      </view>
    </view>
  </view>
</view>
</template>

<script>
/*
 * 组件: audioBut —— 声音安防开关按钮
 *
 * 重写自反编译产物（webpack 模块 9451）。三种模式（声控 / 持续 / 定时）在契约里是
 * 三条独立指令（7.3.2 的 `mode` 选码），各自的能力位由产品命令树推导：
 *   - 声控 `S_AUDIO_AL`：协议已接入；
 *   - 持续 `S_AUDIO_ALWAYS` / 定时 `I_AUDIO_TIMED`：指令码与参数已定稿，协议帧体待
 *     厂商文档——网关会 REJECTED 并回 ret=12，这里按"设备不支持"提示，不静默成功。
 *
 * 模式列表按能力位过滤：产品没配这条指令就不显示，配了就能点。协议接入当天
 * 前端不用改代码。`value`：1 未开启 / 2 声控中 / 3 持续中 / 4 定时中。
 */
import * as o from 'vuex';
import * as mod4ddb from '../../common/utils.js';

"use strict";
var p = getApp().globalData;

export default {
  computed: {
    ...o.mapGetters(["selectedTerminal", "access_token", "terminalFuncs"]),
    /** 声控能力（能力位 20 ← capabilities.audio）。没有就整块不该出现。 */
    audioSupported: function () {
      return mod4ddb.funcShowHandler(this.terminalFuncs, 20);
    },
    /** 可选模式：按能力位过滤，一个都没有时整块入口不显示。 */
    audioModes: function () {
      var all = [
        { key: "voice", label: p.$t("audio.mode2"), func: 20, value: 2 },
        { key: "always", label: "持续声音安防", func: 26, value: 3 },
        { key: "timed", label: p.$t("audio.mode1"), func: 14, value: 4 }
      ];
      var self = this;
      return all.filter(function (m) {
        return mod4ddb.funcShowHandler(self.terminalFuncs, m.func);
      });
    }
  },
  props: ["value", "recordVipLimit"],
  methods: {
    ...o.mapActions("audio", ["AtouSendAudioCommand", "AlwaysSendAudioCommand", "TimedSendAudioCommand"]),
    l: function (t) {
      return p.$t(t);
    },
    /**
     * 开启声控声音安防。
     *
     * 增值时长不足时先引导充值——这一段保留原版行为（声音安防按时长计费，
     * 配额见 7.3 的 VIP items[].remainingQuota）。
     */
    manualAudio: function () {
      var self = this;
      if (!this.recordVipLimit) {
        return uni.showModal({
          showCancel: true,
          title: "声音安防充值",
          content: "当前设备无可用声音安防时长，是否前往充值",
          confirmText: "前往充值",
          cancelText: "暂不前往",
          success: function (r) {
            if (r.confirm) {
              mod4ddb.qzGotoWx({
                id: self.selectedTerminal.id,
                url: "/pagesPay/value-added/index",
                access_token: self.access_token
              });
            }
          }
        });
      }
      var modes = this.audioModes;
      if (!modes.length) {
        return mod4ddb.qzwlToast("该设备不支持声音安防", "none");
      }
      // 只有一种模式时不必让用户选
      if (modes.length === 1) return this.confirmOpen(modes[0]);
      uni.showActionSheet({
        title: p.$t("audio.mode"),
        itemList: modes.map(function (m) {
          return m.label;
        }),
        success: function (r) {
          self.confirmOpen(modes[r.tapIndex]);
        }
      });
    },
    /** 开启前二次确认（持续模式流量消耗大，文案要说清楚）。 */
    confirmOpen: function (mode) {
      var self = this;
      uni.showModal({
        title: p.$t("audio.modal-open-record"),
        content: mode.key === "always"
          ? "开启持续声音安防流量消耗较大，确定开启吗？"
          : p.$t("audio.modal-content"),
        cancelText: p.$t("common.cancel"),
        confirmText: p.$t("common.ok"),
        success: function (r) {
          if (!r.cancel) self.toggleAudio(true, mode);
        }
      });
    },
    /**
     * 关闭当前模式。关哪个模式要按 `value` 判断——用声控的指令去关持续模式，
     * 设备侧不会停止录音（是两条不同命令字）。
     */
    isCloseAtouAudio: function () {
      var self = this;
      var current = this.audioModes.find(function (m) {
        return m.value === Number(self.value);
      }) || { key: "voice", value: 2 };
      uni.showModal({
        title: p.$t("audio.modal-close-audio"),
        cancelText: p.$t("common.cancel"),
        confirmText: p.$t("common.ok"),
        success: function (r) {
          if (!r.cancel) self.toggleAudio(false, current);
        }
      });
    },
    /**
     * 下发开/关。10.1 的 `ret` 才是设备侧结果（10 离线 / 12 不支持，code 仍是 0），
     * 离线时不能提示"已开启"——那条指令要等设备上线才补发。
     */
    toggleAudio: function (on, mode) {
      var self = this;
      var m = mode || { key: "voice", value: 2 };
      return (async function () {
        var action = m.key === "always" ? "AlwaysSendAudioCommand"
          : m.key === "timed" ? "TimedSendAudioCommand"
          : "AtouSendAudioCommand";
        var res = await self[action]({
          deviceId: self.selectedTerminal.id,
          state: on
        });
        if (!res || !res.succeeded) {
          if (res && res.msg) mod4ddb.qzwlToast(res.msg, "none");
          return;
        }
        var ret = res.data && res.data.ret;
        if (ret === 10) {
          return mod4ddb.qzwlToast("设备离线，指令将在上线后下发", "none");
        }
        if (ret === 12) {
          return mod4ddb.qzwlToast("该设备不支持声音安防", "none");
        }
        // 状态以 9.3.1 为准，这里只做乐观更新让按钮立即切换
        self.$emit("input", on ? m.value : 1);
        mod4ddb.qzwlToast(
          on ? p.$t("audio.open-voice-control") : p.$t("audio.close-voice-control"),
          "none"
        );
      })();
    }
  }
};
</script>
