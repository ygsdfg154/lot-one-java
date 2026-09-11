<template>
<view class="uni-navbar" :class="{ 'uni-dark': dark, 'uni-nvue-fixed': fixed }">
  <view
    class="uni-navbar__content"
    :class="{ 'uni-navbar--fixed': fixed, 'uni-navbar--shadow': shadow, 'uni-navbar--border': border }"
    :style="{ 'background-color': themeBgColor }"
  >
    <status-bar v-if="statusBar"></status-bar>
    <view
      class="uni-navbar__header"
      :style="{ color: themeColor, backgroundColor: themeBgColor, height: navbarHeight }"
    >
      <view
        class="uni-navbar__header-btns uni-navbar__header-btns-left"
        :style="{ width: leftIconWidth }"
        @click="onClickLeft"
      >
        <slot name="left">
          <view v-if="leftIcon.length > 0" class="uni-navbar__content_view">
            <uni-icons :color="themeColor" :type="leftIcon" size="25"></uni-icons>
          </view>
          <view
            v-if="leftText.length"
            class="uni-navbar-btn-text"
            :class="{ 'uni-navbar-btn-icon-left': !leftIcon.length > 0 }"
          >
            <text :style="{ color: themeColor, fontSize: '12px' }">
              {{ leftText }}
            </text>
          </view>
        </slot>
      </view>
      <view class="uni-navbar__header-container " @click="onClickTitle">
        <slot>
          <view v-if="title.length > 0" class="uni-navbar__header-container-inner">
            <text class="uni-nav-bar-text uni-ellipsis-1" :style="{ color: themeColor }">
              {{ title }}
            </text>
          </view>
        </slot>
      </view>
      <view
        class="uni-navbar__header-btns uni-navbar__header-btns-right"
        :style="{ width: rightIconWidth }"
        @click="onClickRight"
      >
        <slot name="right">
          <view v-if="rightIcon.length">
            <uni-icons :color="themeColor" :type="rightIcon" size="25"></uni-icons>
          </view>
          <view v-if="rightText.length && !rightIcon.length" class="uni-navbar-btn-text">
            <text class="uni-nav-bar-right-text" :style="{ color: themeColor }">
              {{ rightText }}
            </text>
          </view>
        </slot>
      </view>
    </view>
  </view>
  <view v-if="fixed" class="uni-navbar__placeholder">
    <status-bar v-if="statusBar"></status-bar>
    <view class="uni-navbar__placeholder-view" :style="{ height: navbarHeight }"></view>
  </view>
</view>
</template>

<script>
/*
 * 组件: uniNavBar
 * 反编译自 webpack 模块 010d（svc 编译空间）
 */
import mod88ed from '../../../../components/statusBar/statusBar.vue'

"use strict";
var i = function (e) {
  return "number" === typeof e ? e + "px" : e;
}, o = {
  name: "UniNavBar",
  components: {
    statusBar: mod88ed
  },
  emits: ["clickLeft", "clickRight", "clickTitle"],
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    leftText: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    leftIcon: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: ""
    },
    fixed: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: ""
    },
    statusBar: {
      type: [Boolean, String],
      default: false
    },
    shadow: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: [Boolean, String],
      default: true
    },
    height: {
      type: [Number, String],
      default: 44
    },
    leftWidth: {
      type: [Number, String],
      default: 60
    },
    rightWidth: {
      type: [Number, String],
      default: 60
    },
    stat: {
      type: [Boolean, String],
      default: ""
    }
  },
  computed: {
    themeBgColor: function () {
      return this.dark ? this.backgroundColor ? this.backgroundColor : this.dark ? "#333" : "#FFF" : this.backgroundColor || "#FFF";
    },
    themeColor: function () {
      return this.dark ? this.color ? this.color : this.dark ? "#fff" : "#333" : this.color || "#333";
    },
    navbarHeight: function () {
      return i(this.height);
    },
    leftIconWidth: function () {
      return i(this.leftWidth);
    },
    rightIconWidth: function () {
      return i(this.rightWidth);
    }
  },
  mounted: function () {
    uni.report && this.stat && "" !== this.title && uni.report("title", this.title);
  },
  methods: {
    onClickLeft: function () {
      this.$emit("clickLeft");
    },
    onClickRight: function () {
      this.$emit("clickRight");
    },
    onClickTitle: function () {
      this.$emit("clickTitle");
    }
  }
};
export default o;

</script>
