<template>
<view class="u-sticky" :style="[style]" :id="elId">
  <view class="u-sticky__content" :style="[stickyContent]">
    <slot></slot>
  </view>
</view>
</template>

<script>
/*
 * 组件: uSticky
 * 反编译自 webpack 模块 31f9（svc 编译空间）
 * async/await 还原: 1 个已转换
 */
import mod127e from '@/.unpacked/svc/127e.js';
import ee10 from '@/.unpacked/svc/ee10.js';
import mod049b from '@/.unpacked/svc/049b.js';
"use strict";
var s = {
  name: "u-sticky",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, mod049b],
  data: function () {
    return {
      cssSticky: false,
      stickyTop: 0,
      elId: uni.$u.guid(),
      left: 0,
      width: "auto",
      height: "auto",
      fixed: false
    };
  },
  computed: {
    style: function () {
      var e = {};
      return (this.disabled ? e.position = "static" : this.cssSticky ? (e.position = "sticky", e.zIndex = this.uZindex, e.top = uni.$u.addUnit(this.stickyTop)) : e.height = this.fixed ? this.height + "px" : "auto", e.backgroundColor = this.bgColor, uni.$u.deepMerge(uni.$u.addStyle(this.customStyle), e));
    },
    stickyContent: function () {
      var e = {};
      return (this.cssSticky || (e.position = this.fixed ? "fixed" : "static", e.top = this.stickyTop + "px", e.left = this.left + "px", e.width = "auto" == this.width ? "auto" : this.width + "px", e.zIndex = this.uZindex), e);
    },
    uZindex: function () {
      return this.zIndex ? this.zIndex : uni.$u.zIndex.sticky;
    }
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init: function () {
      (this.getStickyTop(), this.checkSupportCssSticky(), this.cssSticky || !this.disabled && this.initObserveContent());
    },
    initObserveContent: function () {
      var e = this;
      this.$uGetRect("#" + this.elId).then(function (t) {
        (e.height = t.height, e.left = t.left, e.width = t.width, e.$nextTick(function () {
          e.observeContent();
        }));
      });
    },
    observeContent: function () {
      var e = this;
      this.disconnectObserver("contentObserver");
      var t = uni.createIntersectionObserver({
        thresholds: [.95, .98, 1]
      });
      (t.relativeToViewport({
        top: -this.stickyTop
      }), t.observe(("#").concat(this.elId), function (t) {
        e.setFixed(t.boundingClientRect.top);
      }), this.contentObserver = t);
    },
    setFixed: function (e) {
      var t = e <= this.stickyTop;
      this.fixed = t;
    },
    disconnectObserver: function (e) {
      var t = this[e];
      t && t.disconnect();
    },
    getStickyTop: function () {
      this.stickyTop = uni.$u.getPx(this.offsetTop) + uni.$u.getPx(this.customNavHeight);
    },
    checkSupportCssSticky: function () {
      var e = this;
      return (async function () {
        "android" === uni.$u.os() && Number(uni.$u.sys().system) > 8 && (e.cssSticky = true);
        (e.cssSticky = await e.checkComputedStyle(), "ios" === uni.$u.os() && (e.cssSticky = true));
      })();
    },
    checkComputedStyle: function () {
      var e = this;
      return new Promise(function (t) {
        uni.createSelectorQuery().in(e).select(".u-sticky").fields({
          computedStyle: ["position"]
        }).exec(function (e) {
          t("sticky" === e[0].position);
        });
      });
    },
    checkCssStickyForH5: function () {}
  },
  beforeDestroy: function () {
    this.disconnectObserver("contentObserver");
  }
};
export default s;

</script>
