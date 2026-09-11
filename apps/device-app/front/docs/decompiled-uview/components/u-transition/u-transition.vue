<template>
<view
  v-if="inited"
  ref="u-transition"
  class="u-transition"
  :class="classes"
  :style="[mergeStyle]"
  @touchmove="noop"
  @click="clickHandler"
>
  <slot></slot>
</view>
</template>

<script>
/*
 * 组件: uTransition
 * 反编译自 webpack 模块 9d67（svc 编译空间）
 */
import mod7ca3 from '@/.unpacked/svc/7ca3.js'
import mod540c from '@/.unpacked/svc/540c.js'
import mod59ee from '@/.unpacked/svc/59ee.js'

"use strict";
var d = {
  name: "u-transition",
  data: function () {
    return {
      inited: false,
      viewStyle: {},
      status: "",
      transitionEnded: false,
      display: false,
      classes: ""
    };
  },
  computed: {
    mergeStyle: function () {
      var e = this.viewStyle, t = this.customStyle;
      return {
        transitionDuration: ("").concat(this.duration, "ms"),
        transitionTimingFunction: this.timingFunction,
        ...uni.$u.addStyle(t),
        ...e
      };
    }
  },
  mixins: [uni.$u.mpMixin, uni.$u.mixin, mod59ee, mod540c],
  watch: {
    show: {
      handler: function (e) {
        e ? this.vueEnter() : this.vueLeave();
      },
      immediate: true
    }
  }
};
export default d;

</script>
