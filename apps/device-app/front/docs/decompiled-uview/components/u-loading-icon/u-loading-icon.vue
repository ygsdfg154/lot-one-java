<template>
<view
  v-if="show"
  class="u-loading-icon"
  :class="[vertical && 'u-loading-icon--vertical']"
  :style="[$u.addStyle(customStyle)]"
>
  <view
    v-if="!webviewHide"
    ref="ani"
    class="u-loading-icon__spinner"
    :class="['u-loading-icon__spinner--' + mode]"
    :style="{ color: color, width: $u.addUnit(size), height: $u.addUnit(size), borderTopColor: color, borderBottomColor: otherBorderColor, borderLeftColor: otherBorderColor, borderRightColor: otherBorderColor, 'animation-duration': duration + 'ms', 'animation-timing-function': 'semicircle' === mode || 'circle' === mode ? timingFunction : '' }"
  >
    <view
      v-for="(t, a, r) in { forItems: array12 }"
      v-if="'spinner' === mode"
      :key="{ forIndex: r, key: a }"
      class="u-loading-icon__dot"
    ></view>
  </view>
  <text
    v-if="text"
    class="u-loading-icon__text"
    :style="{ fontSize: $u.addUnit(textSize), color: textColor }"
  >
    {{ text }}
  </text>
</view>
</template>

<script>
/*
 * 组件: uLoadingIcon
 * 反编译自 webpack 模块 b51a（svc 编译空间）
 */
import e402 from '@/.unpacked/svc/e402.js'

"use strict";
var i = {
  name: "u-loading-icon",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, e402],
  data: function () {
    return {
      array12: Array.from({
        length: 12
      }),
      aniAngel: 360,
      webviewHide: false,
      loading: false
    };
  },
  computed: {
    otherBorderColor: function () {
      var e = uni.$u.colorGradient(this.color, "#ffffff", 100)[80];
      return "circle" === this.mode ? this.inactiveColor ? this.inactiveColor : e : "transparent";
    }
  },
  watch: {
    show: function (e) {}
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init: function () {
      var e = this;
      setTimeout(function () {
        e.show && e.addEventListenerToWebview();
      }, 20);
    },
    addEventListenerToWebview: function () {
      var e = this, t = getCurrentPages(), n = t[t.length - 1], a = n.$getAppWebview();
      (a.addEventListener("hide", function () {
        e.webviewHide = true;
      }), a.addEventListener("show", function () {
        e.webviewHide = false;
      }));
    }
  }
};
export default i;

</script>
