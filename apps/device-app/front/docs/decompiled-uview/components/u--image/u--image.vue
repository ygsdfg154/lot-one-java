<template>
<uvImage
  :src="src"
  :mode="mode"
  :width="width"
  :height="height"
  :shape="shape"
  :radius="radius"
  :lazyLoad="lazyLoad"
  :showMenuByLongpress="showMenuByLongpress"
  :loadingIcon="loadingIcon"
  :errorIcon="errorIcon"
  :showLoading="showLoading"
  :showError="showError"
  :fade="fade"
  :webp="webp"
  :duration="duration"
  :bgColor="bgColor"
  :customStyle="customStyle"
  @click="$emit('click')"
  @error="$emit('error')"
  @load="$emit('load')"
>
  <template v-slot:loading="t">
    <slot name="loading"></slot>
  </template>
  <template v-slot:error="t">
    <slot name="error"></slot>
  </template>
</uvImage>
</template>

<script>
/*
 * 组件: u-Image
 * 反编译自 webpack 模块 dc5f（svc 编译空间）
 */
import mod0929 from 'uview-ui/components/u-image/u-image.vue'
import aebe from '@/.unpacked/svc/aebe.js'

"use strict";
var o = {
  name: "u--image",
  mixins: [uni.$u.mpMixin, aebe, uni.$u.mixin],
  components: {
    uvImage: mod0929
  }
};
export default o;

</script>
