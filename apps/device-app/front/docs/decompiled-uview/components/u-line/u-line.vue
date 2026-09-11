<template>
<view class="u-line" :style="[$data.lineStyle]"></view>
</template>

<script>
/*
 * 组件: uLine
 * 反编译自 webpack 模块 c55d（svc 编译空间）
 */
import c9cb from '@/.unpacked/svc/c9cb.js'

"use strict";
var i = {
  name: "u-line",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, c9cb],
  computed: {
    lineStyle: function () {
      var e = {};
      return (e.margin = this.margin, "row" === this.direction ? (e.borderBottomWidth = "1px", e.borderBottomStyle = this.dashed ? "dashed" : "solid", e.width = uni.$u.addUnit(this.length), this.hairline && (e.transform = "scaleY(0.5)")) : (e.borderLeftWidth = "1px", e.borderLeftStyle = this.dashed ? "dashed" : "solid", e.height = uni.$u.addUnit(this.length), this.hairline && (e.transform = "scaleX(0.5)")), e.borderColor = this.color, uni.$u.deepMerge(e, uni.$u.addStyle(this.customStyle)));
    }
  }
};
export default i;

</script>
