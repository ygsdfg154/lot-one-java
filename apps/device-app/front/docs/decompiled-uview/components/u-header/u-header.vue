<template>
<view class="u-calendar-header u-border-bottom">
  <text v-if="showTitle" class="u-calendar-header__title">
    {{ title }}
  </text>
  <text v-if="showSubtitle" class="u-calendar-header__subtitle">
    {{ subtitle }}
  </text>
  <view class="u-calendar-header__weekdays">
    <text class="u-calendar-header__weekdays__weekday">
      {{ l('common.u.calendar.head1') }}
    </text>
    <text class="u-calendar-header__weekdays__weekday">
      {{ l('common.u.calendar.head2') }}
    </text>
    <text class="u-calendar-header__weekdays__weekday">
      {{ l('common.u.calendar.head3') }}
    </text>
    <text class="u-calendar-header__weekdays__weekday">
      {{ l('common.u.calendar.head4') }}
    </text>
    <text class="u-calendar-header__weekdays__weekday">
      {{ l('common.u.calendar.head5') }}
    </text>
    <text class="u-calendar-header__weekdays__weekday">
      {{ l('common.u.calendar.head6') }}
    </text>
    <text class="u-calendar-header__weekdays__weekday">
      {{ l('common.u.calendar.head7') }}
    </text>
  </view>
</view>
</template>

<script>
/*
 * 组件: uHeader
 * 反编译自 webpack 模块 95d2（svc 编译空间）
 */
"use strict";
var a = getApp().globalData, r = {
  name: "u-calendar-header",
  mixins: [uni.$u.mpMixin, uni.$u.mixin],
  props: {
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showSubtitle: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {};
  },
  methods: {
    name: function () {},
    l: function (e) {
      return a.$t(e);
    }
  }
};
export default r;

</script>
