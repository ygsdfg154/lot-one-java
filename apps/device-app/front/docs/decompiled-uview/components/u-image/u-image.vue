<template>
<u-transition mode="fade" :show="show" :duration="fade ? 1e3 : 0">
  <view class="u-image" :style="[wrapStyle, backgroundStyle]" @click="onClick">
    <image
      v-if="!isError"
      class="u-image__image"
      :style="{ borderRadius: 'circle' == shape ? '10000px' : $u.addUnit(radius), width: $u.addUnit(width), height: $u.addUnit(height) }"
      :src="src"
      :mode="mode"
      :show-menu-by-longpress="showMenuByLongpress"
      :lazy-load="lazyLoad"
      @error="onErrorHandler"
      @load="onLoadHandler"
     />
    <view
      v-if="showLoading && loading"
      class="u-image__loading"
      :style="{ borderRadius: 'circle' == shape ? '50%' : $u.addUnit(radius), backgroundColor: $data.bgColor, width: $u.addUnit(width), height: $u.addUnit(height) }"
    >
      <slot name="loading">
        <u-icon :name="loadingIcon" :width="width" :height="height"></u-icon>
      </slot>
    </view>
    <view
      v-if="showError && isError && !loading"
      class="u-image__error"
      :style="{ borderRadius: 'circle' == shape ? '50%' : $u.addUnit(radius), width: $u.addUnit(width), height: $u.addUnit(height) }"
    >
      <slot name="error">
        <u-icon :name="errorIcon" :width="width" :height="height"></u-icon>
      </slot>
    </view>
  </view>
</u-transition>
</template>

<script>
/*
 * 组件: uvImage
 * 反编译自 webpack 模块 a911（svc 编译空间）
 */
import aebe from '@/.unpacked/svc/aebe.js'

"use strict";
var i = {
  name: "u-image",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, aebe],
  data: function () {
    return {
      isError: false,
      loading: true,
      opacity: 1,
      durationTime: this.duration,
      backgroundStyle: {},
      show: false
    };
  },
  watch: {
    src: {
      immediate: true,
      handler: function (e) {
        e ? (this.isError = false, this.loading = true) : this.isError = true;
      }
    }
  },
  computed: {
    wrapStyle: function () {
      var e = {};
      return (e.width = this.$u.addUnit(this.width), e.height = this.$u.addUnit(this.height), e.borderRadius = "circle" == this.shape ? "10000px" : uni.$u.addUnit(this.radius), e.overflow = this.borderRadius > 0 ? "hidden" : "visible", uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
    }
  },
  mounted: function () {
    this.show = true;
  },
  methods: {
    onClick: function () {
      this.$emit("click");
    },
    onErrorHandler: function (e) {
      (this.loading = false, this.isError = true, this.$emit("error", e));
    },
    onLoadHandler: function (e) {
      (this.loading = false, this.isError = false, this.$emit("load", e), this.removeBgColor());
    },
    removeBgColor: function () {
      this.backgroundStyle = {
        backgroundColor: "transparent"
      };
    }
  }
};
export default i;

</script>
