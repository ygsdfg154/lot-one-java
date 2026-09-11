<template>
<view class="u-popup">
  <u-overlay
    v-if="overlay"
    :show="show"
    :duration="overlayDuration"
    :customStyle="overlayStyle"
    :opacity="overlayOpacity"
    @click="overlayClick"
  ></u-overlay>
  <u-transition
    :show="show"
    :customStyle="transitionStyle"
    :mode="position"
    :duration="duration"
    @afterEnter="afterEnter"
    @click="clickHandler"
  >
    <view class="u-popup__content" :style="[contentStyle]" @click="(t.stopPropagation(), noop(t))">
      <u-status-bar v-if="safeAreaInsetTop"></u-status-bar>
      <slot></slot>
      <view
        v-if="closeable"
        class="u-popup__content__close"
        :class="['u-popup__content__close--' + closeIconPos]"
        @click="(t.stopPropagation(), close(t))"
      >
        <u-icon name="close" color="#909399" size="18" :bold="true"></u-icon>
      </view>
      <u-safe-bottom v-if="safeAreaInsetBottom"></u-safe-bottom>
    </view>
  </u-transition>
</view>
</template>

<script>
/*
 * 组件: uPopup
 * 反编译自 webpack 模块 0e9e（svc 编译空间）
 */
import b8ab from '@/.unpacked/svc/b8ab.js'

"use strict";
var i = {
  name: "u-popup",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, b8ab],
  data: function () {
    return {
      overlayDuration: this.duration + 50
    };
  },
  watch: {
    show: function (e, t) {}
  },
  computed: {
    transitionStyle: function () {
      var e = {
        zIndex: this.zIndex,
        position: "fixed",
        display: "flex"
      };
      return (e[this.mode] = 0, "left" === this.mode || "right" === this.mode ? uni.$u.deepMerge(e, {
        bottom: 0,
        top: 0
      }) : "top" === this.mode || "bottom" === this.mode ? uni.$u.deepMerge(e, {
        left: 0,
        right: 0
      }) : "center" === this.mode ? uni.$u.deepMerge(e, {
        alignItems: "center",
        "justify-content": "center",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }) : undefined);
    },
    contentStyle: function () {
      var e = {}, t = uni.$u.sys();
      t.safeAreaInsets;
      if (("center" !== this.mode && (e.flex = 1), this.bgColor && (e.backgroundColor = this.bgColor), this.round)) {
        var n = uni.$u.addUnit(this.round);
        "top" === this.mode ? (e.borderBottomLeftRadius = n, e.borderBottomRightRadius = n) : "bottom" === this.mode ? (e.borderTopLeftRadius = n, e.borderTopRightRadius = n) : "center" === this.mode && (e.borderRadius = n);
      }
      return uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle));
    },
    position: function () {
      return "center" === this.mode ? this.zoom ? "fade-zoom" : "fade" : "left" === this.mode ? "slide-left" : "right" === this.mode ? "slide-right" : "bottom" === this.mode ? "slide-up" : "top" === this.mode ? "slide-down" : undefined;
    }
  },
  methods: {
    overlayClick: function () {
      this.closeOnClickOverlay && this.$emit("close");
    },
    close: function (e) {
      this.$emit("close");
    },
    afterEnter: function () {
      this.$emit("open");
    },
    clickHandler: function () {
      ("center" === this.mode && this.overlayClick(), this.$emit("click"));
    }
  }
};
export default i;

</script>
