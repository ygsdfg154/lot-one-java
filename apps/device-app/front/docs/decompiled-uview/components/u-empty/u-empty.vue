<template>
<view v-if="show" class="u-empty" :style="[emptyStyle]">
  <u-icon
    v-if="!isSrc"
    :name="'message' === mode ? 'chat' : 'empty-' + mode"
    :size="iconSize"
    :color="iconColor"
    margin-top="14"
  ></u-icon>
  <image v-else :style="{ width: $u.addUnit(width), height: $u.addUnit(height) }" :src="icon" />
  <text class="u-empty__text" :style="[textStyle]">
    {{ text ? text : icons[mode] }}
  </text>
  <view v-if="$slots.default || $slots.$default" class="u-empty__wrap">
    <slot></slot>
  </view>
</view>
</template>

<script>
/*
 * 组件: uEmpty
 * 反编译自 webpack 模块 e255（svc 编译空间）
 */
import fc24 from '@/.unpacked/svc/fc24.js'

"use strict";
var i = {
  name: "u-empty",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, fc24],
  data: function () {
    return {
      icons: {
        car: "\u8d2d\u7269\u8f66\u4e3a\u7a7a",
        page: "\u9875\u9762\u4e0d\u5b58\u5728",
        search: "\u6ca1\u6709\u641c\u7d22\u7ed3\u679c",
        address: "\u6ca1\u6709\u6536\u8d27\u5730\u5740",
        wifi: "\u6ca1\u6709WiFi",
        order: "\u8ba2\u5355\u4e3a\u7a7a",
        coupon: "\u6ca1\u6709\u4f18\u60e0\u5238",
        favor: "\u6682\u65e0\u6536\u85cf",
        permission: "\u65e0\u6743\u9650",
        history: "\u65e0\u5386\u53f2\u8bb0\u5f55",
        news: "\u65e0\u65b0\u95fb\u5217\u8868",
        message: "\u6d88\u606f\u5217\u8868\u4e3a\u7a7a",
        list: "\u5217\u8868\u4e3a\u7a7a",
        data: "\u6570\u636e\u4e3a\u7a7a",
        comment: "\u6682\u65e0\u8bc4\u8bba"
      }
    };
  },
  computed: {
    emptyStyle: function () {
      var e = {};
      return (e.marginTop = uni.$u.addUnit(this.marginTop), uni.$u.deepMerge(uni.$u.addStyle(this.customStyle), e));
    },
    textStyle: function () {
      var e = {};
      return (e.color = this.textColor, e.fontSize = uni.$u.addUnit(this.textSize), e);
    },
    isSrc: function () {
      return this.icon.indexOf("/") >= 0;
    }
  }
};
export default i;

</script>
