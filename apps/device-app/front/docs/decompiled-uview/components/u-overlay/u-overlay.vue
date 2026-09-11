<template>
<u-transition
  :show="$data.show"
  custom-class="u-overlay"
  :duration="$data.duration"
  :custom-style="$data.overlayStyle"
  @click="$data.clickHandler"
>
  <slot></slot>
</u-transition>
</template>

<script>
/*
 * 组件: uOverlay
 * 反编译自 webpack 模块 5e8c（svc 编译空间）
 */
import mod18dc from '@/.unpacked/svc/18dc.js'

"use strict";
var i = {
  name: "u-overlay",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, mod18dc],
  computed: {
    overlayStyle: function () {
      var e = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: this.zIndex,
        bottom: 0,
        "background-color": ("rgba(0, 0, 0, ").concat(this.opacity, ")")
      };
      return uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle));
    }
  },
  methods: {
    clickHandler: function () {
      this.$emit("click");
    }
  }
};
export default i;

</script>
