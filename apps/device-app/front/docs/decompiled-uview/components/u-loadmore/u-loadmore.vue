<template>
<view
  class="u-loadmore"
  :style="[$u.addStyle(customStyle), { backgroundColor: bgColor, marginBottom: $u.addUnit(marginBottom), marginTop: $u.addUnit(marginTop), height: $u.addUnit(height) }]"
>
  <u-line v-if="line" length="140rpx" :color="lineColor" :hairline="false" :dashed="dashed"></u-line>
  <view
    class="u-loadmore__content"
    :class="'loadmore' == status || 'nomore' == status ? 'u-more' : ''"
  >
    <view v-if="'loading' === status && icon" class="u-loadmore__content__icon-wrap">
      <u-loading-icon :color="iconColor" :size="iconSize" :mode="loadingIcon"></u-loading-icon>
    </view>
    <text
      class="u-line-1"
      :class="['nomore' == status && 1 == isDot ? 'u-loadmore__content__dot-text' : 'u-loadmore__content__text']"
      :style="[loadTextStyle]"
      @click="loadMore"
    >
      {{ showText }}
    </text>
  </view>
  <u-line v-if="line" length="140rpx" :color="lineColor" :hairline="false" :dashed="dashed"></u-line>
</view>
</template>

<script>
/*
 * 组件: uLoadmore
 * 反编译自 webpack 模块 7f8c（svc 编译空间）
 */
import mod9117 from '@/.unpacked/svc/9117.js'

"use strict";
var i = {
  name: "u-loadmore",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, mod9117],
  data: function () {
    return {
      dotText: "\u25cf"
    };
  },
  computed: {
    loadTextStyle: function () {
      return {
        color: "nomore" == this.status && 1 == this.serviceShow ? "#6081C7" : this.color,
        fontSize: uni.$u.addUnit(this.fontSize),
        lineHeight: uni.$u.addUnit(this.fontSize),
        backgroundColor: this.bgColor
      };
    },
    showText: function () {
      var e = "";
      return (e = "loadmore" == this.status ? this.loadmoreText : "loading" == this.status ? this.loadingText : "nomore" == this.status && this.isDot ? this.dotText : this.nomoreText, e);
    }
  },
  methods: {
    loadMore: function () {
      "loadmore" == this.status && this.$emit("loadmore");
    }
  }
};
export default i;

</script>
