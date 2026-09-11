<template>
<view
  class="u-safe-bottom"
  :class="[!$data.isNvue && 'u-safe-area-inset-bottom']"
  :style="[$data.style]"
></view>
</template>

<script>
/*
 * 组件: uSafeBottom
 * 反编译自 webpack 模块 6480（svc 编译空间）
 */
import mod62b5 from '@/.unpacked/svc/62b5.js'

"use strict";
var i = {
  name: "u-safe-bottom",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, mod62b5],
  data: function () {
    return {
      safeAreaBottomHeight: 0,
      isNvue: false
    };
  },
  computed: {
    style: function () {
      return uni.$u.deepMerge({}, uni.$u.addStyle(this.customStyle));
    }
  },
  mounted: function () {}
};
export default i;

</script>
