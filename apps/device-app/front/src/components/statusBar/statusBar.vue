<template>
<view class="uni-status-bar" :style="{ height: $data.statusBarHeight }">
  <slot></slot>
</view>
</template>

<script>
/*
 * 组件: statusBar
 * 反编译自 webpack 模块 72c8（svc 编译空间）
 */
"use strict";
var a = {
  name: "UniStatusBar",
  data: function () {
    return {
      statusBarHeight: 20
    };
  },
  mounted: function () {
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + "px";
  }
};
export default a;

</script>
