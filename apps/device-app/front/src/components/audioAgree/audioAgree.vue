<template>
<view>
  <u-popup
    :show="agreeAudio"
    mode="center"
    round="15"
    customStyle="width: 650rpx"
    :closeable="true"
    :safeAreaInsetBottom="false"
    @close="agreeClose"
  >
    <view class="p-xl m-b">
      <view class="flex-row justify-center">
        <text class="text-lx">
          {{ l('audio.terms-for-usage') }}
        </text>
      </view>
      <view class="flex-col">
        <text class="m-b-xl text">
          {{ l('audio.scene') }}
        </text>
        <text class="text">
          {{ l('audio.scene1') }}
        </text>
        <text class="text">
          {{ l('audio.scene2') }}
        </text>
        <text class="text">
          {{ l('audio.scene3') }}
        </text>
        <text class="text">
          {{ l('audio.scene4') }}
        </text>
        <text class="text m-v-xl">
          {{ l('audio.warning') }}
        </text>
      </view>
      <u-button type="primary" :text="l('common.agree')" @click="agreeConfirm"></u-button>
    </view>
  </u-popup>
</view>
</template>

<script>
/*
 * 组件: audioAgree
 * 反编译自 webpack 模块 c8c0（svc 编译空间）
 * async/await 还原: 2 个已转换
 */
import mod127e from '@/.unpacked/svc/127e.js';
import ee10 from '@/.unpacked/svc/ee10.js';
import mod7ca3 from '@/.unpacked/svc/7ca3.js';
import * as mod8f59 from 'vuex';
import * as mod4ddb from '../../common/utils.js';
"use strict";
var d = getApp().globalData, f = {
  computed: {
    ...mod8f59.mapGetters(["agreeAudio", "selectedTerminal"])
  },
  created: function () {
    this.agreeAudio || this.init();
  },
  methods: {
    ...mod8f59.mapMutations("app", ["setAgreeAudio"]),
    ...mod8f59.mapActions("audio", ["GetautoStatus"]),
    l: function (t) {
      return d.$t(t);
    },
    agreeClose: function () {
      return (async function () {
        uni.showToast({
          title: d.$t("audio.unconfirmed-clause"),
          icon: "none"
        });
        await d.$sleep(500);
        uni.navigateBack();
      })();
    },
    agreeConfirm: function () {
      (this.setAgreeAudio(false), this.init());
    },
    init: function () {
      (this.$emit("fetchData", {
        updateType: 0,
        id: 0,
        refresh: true
      }), this.getAutoAudioState(), this.$emit("loadTerminalExtend"));
    },
    /**
     * 声控当前状态：契约 9.3.1 的 `audio` 开关（三态）。
     *
     * 原版读老接口 `/record/status` 的 `isAuto`/`isAlways` 两个布尔；契约里持续模式
     * 不存在（硬件不支持），状态只有开/关/待同步三种。`unknown` 时按"未开启"渲染按钮
     * 但**不提示**"正在声控中"——没有依据的状态不要说得像确定的。
     */
    getAutoAudioState: function () {
      var self = this;
      return (async function () {
        var res = await self.GetautoStatus({ deviceId: self.selectedTerminal.id });
        if (!res || !res.succeeded) return;
        var on = !!(res.audio && res.audio.on);
        if (on) mod4ddb.qzwlToast(self.l("audio.terminal-using-voice-control"), "none");
        self.$nextTick(function () {
          self.$emit("input", on ? 2 : 1);
        });
      })();
    }
  }
};
export default f;

</script>
