<template>
<view class="u-icon" :class="['u-icon--' + labelPos]" @click="clickHandler">
  <image
    v-if="isImg"
    class="u-icon__img"
    :style="[imgStyle, $u.addStyle(customStyle)]"
    :src="name"
    :mode="imgMode"
   />
  <text
    v-else
    class="u-icon__icon"
    :class="uClasses"
    :style="[iconStyle, $u.addStyle(customStyle)]"
    :hover-class="hoverClass"
  >
    {{ icon }}
  </text>
  <text
    v-if="'' !== label"
    class="u-icon__label"
    :style="{ color: labelColor, fontSize: $u.addUnit(labelSize), marginLeft: 'right' == labelPos ? $u.addUnit(space) : 0, marginTop: 'bottom' == labelPos ? $u.addUnit(space) : 0, marginRight: 'left' == labelPos ? $u.addUnit(space) : 0, marginBottom: 'top' == labelPos ? $u.addUnit(space) : 0 }"
  >
    {{ label }}
  </text>
</view>
</template>

<script>
/*
 * 组件: uIcon
 * 反编译自 webpack 模块 299d（svc 编译空间）
 */
import mod46f8 from '@/.unpacked/svc/46f8.js'
import mod76ac from '@/.unpacked/svc/76ac.js'

"use strict";
var o = {
  name: "u-icon",
  data: function () {
    return {};
  },
  mixins: [uni.$u.mpMixin, uni.$u.mixin, mod76ac],
  computed: {
    uClasses: function () {
      var e = [];
      return (e.push(this.customPrefix + "-" + this.name), this.color && uni.$u.config.type.includes(this.color) && e.push("u-icon__icon--" + this.color), e);
    },
    iconStyle: function () {
      var e = {};
      return (e = {
        fontSize: uni.$u.addUnit(this.size),
        lineHeight: uni.$u.addUnit(this.size),
        fontWeight: this.bold ? "bold" : "normal",
        top: uni.$u.addUnit(this.top)
      }, this.color && !uni.$u.config.type.includes(this.color) && (e.color = this.color), e);
    },
    isImg: function () {
      return -1 !== this.name.indexOf("/");
    },
    imgStyle: function () {
      var e = {};
      return (e.width = this.width ? uni.$u.addUnit(this.width) : uni.$u.addUnit(this.size), e.height = this.height ? uni.$u.addUnit(this.height) : uni.$u.addUnit(this.size), e);
    },
    icon: function () {
      return mod46f8["uicon-" + this.name] || this.name;
    }
  },
  methods: {
    clickHandler: function (e) {
      (this.$emit("click", this.index), this.stop && this.preventEvent(e));
    }
  }
};
export default o;

</script>
