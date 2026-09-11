<template>
<view>
  <view class="flex-row m-t">
    <text class="text"></text>
    <text class="text text-primary m-l-mini" @click="$data.contactService"></text>
  </view>
</view>
</template>

<script>
/*
 * 组件: CustomerService
 * 反编译自 webpack 模块 31c0（svc 编译空间）
 */
import '../../common/config.js'

"use strict";
getApp().globalData;
var s = {
  props: {},
  data: function () {
    return {};
  },
  methods: {
    contactService: function () {
      uni.navigateTo({
        url: "/pagesMore/my/support"
      });
    }
  }
};
export default s;

</script>
