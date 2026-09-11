<template>
<view
  ref="u-subsection"
  class="u-subsection"
  :class="['u-subsection--' + mode]"
  :style="[$u.addStyle(customStyle), wrapperStyle]"
>
  <view
    ref="u-subsection__bar"
    class="u-subsection__bar"
    :class="['button' === mode && 'u-subsection--button__bar', 0 === current && 'subsection' === mode && 'u-subsection__bar--first', current > 0 && current < list.length - 1 && 'subsection' === mode && 'u-subsection__bar--center', current === list.length - 1 && 'subsection' === mode && 'u-subsection__bar--last']"
    :style="[barStyle]"
  ></view>
  <view
    v-for="(t, a, r) in { forItems: list }"
    :key="{ forIndex: r, key: a }"
    :ref="'u-subsection__item--' + a"
    class="u-subsection__item"
    :class="['u-subsection__item--' + a, a < list.length - 1 && 'u-subsection__item--no-border-right', 0 === a && 'u-subsection__item--first', a === list.length - 1 && 'u-subsection__item--last']"
    :style="[itemStyle(a)]"
    @click="clickHandler(a)"
  >
    <text class="u-subsection__item__text" :style="[textStyle(a)]">
      {{ getText(t) }}
    </text>
  </view>
</view>
</template>

<script>
/*
 * 组件: uSubsection
 * 反编译自 webpack 模块 93c1（svc 编译空间）
 */
import mod3b2d from '@/.unpacked/svc/3b2d.js'
import mod0eef from '@/.unpacked/svc/0eef.js'

"use strict";
var o = {
  name: "u-subsection",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, mod0eef],
  data: function () {
    return {
      itemRect: {
        width: 0,
        height: 0
      }
    };
  },
  watch: {
    list: function (e, t) {
      this.init();
    },
    current: {
      immediate: true,
      handler: function (e) {}
    }
  },
  computed: {
    wrapperStyle: function () {
      var e = {};
      return ("button" === this.mode && (e.backgroundColor = this.bgColor), e);
    },
    barStyle: function () {
      var e = {};
      return (e.width = ("").concat(this.itemRect.width, "px"), e.height = ("").concat(this.itemRect.height, "px"), e.transform = ("translateX(").concat(this.current * this.itemRect.width, "px)"), "subsection" === this.mode && (e.backgroundColor = this.activeColor), e);
    },
    itemStyle: function (e) {
      var t = this;
      return function (e) {
        var n = {};
        return ("subsection" === t.mode && (n.borderColor = t.activeColor, n.borderWidth = "1px", n.borderStyle = "solid"), n);
      };
    },
    textStyle: function (e) {
      var t = this;
      return function (e) {
        var n = {};
        return (n.fontWeight = t.bold && t.current === e ? "bold" : "normal", n.fontSize = uni.$u.addUnit(t.fontSize), "subsection" === t.mode ? n.color = t.current === e ? "#fff" : t.inactiveColor : n.color = t.current === e ? t.activeColor : t.inactiveColor, n);
      };
    }
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init: function () {
      var e = this;
      uni.$u.sleep().then(function () {
        return e.getRect();
      });
    },
    getText: function (e) {
      return "object" === mod3b2d(e) ? e[this.keyName] : e;
    },
    getRect: function () {
      var e = this;
      this.$uGetRect(".u-subsection__item--0").then(function (t) {
        e.itemRect = t;
      });
    },
    clickHandler: function (e) {
      this.$emit("change", e);
    }
  }
};
export default o;

</script>
