<template>
<view>
  <view class="m-b-lg">
    <text class="text-md text-bold">
      {{ l('common.pay.mode') }}
    </text>
  </view>
  <view
    v-for="(e, r, s, n) in { forItems: payMode }"
    :key="{ forIndex: s, key: r }"
    class="flex-row items-center justify-between b-bottom p-v-lg"
    :class="1 != r ? 'b-top' : ''"
    @click="changePay(e.type)"
  >
    <view class="flex-row items-center">
      <u-icon :name="cdn + '/draw/' + e.icon" size="48rpx"></u-icon>
      <text class="text-md p-l-sm">
        {{ e.name }}
      </text>
    </view>
    <u-icon v-if="payType == e.type" name="checkmark-circle-fill" color="#6081C7" size="40rpx"></u-icon>
    <view v-else class="pay-icon"></view>
  </view>
</view>
</template>

<script>
/*
 * 组件: PayMode
 * 反编译自 webpack 模块 2591（svc 编译空间）
 * 辅助函数 c 仍被引用，保留原定义
 */
import mod7ca3 from '@/.unpacked/svc/7ca3.js'
import e113 from '../../common/config.js'
import * as mod8f59 from 'vuex'

function c(t, e) {
  var a = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    (e && (r = r.filter(function (e) {
      return Object.getOwnPropertyDescriptor(t, e).enumerable;
    })), a.push.apply(a, r));
  }
  return a;
}

"use strict";
var o = getApp().globalData, u = {
  props: {
    payType: {
      type: String,
      default: "wxpay"
    }
  },
  data: function () {
    return {
      cdn: e113.cdn,
      mode: [{
        type: "wxpay",
        name: o.$t("common.wx.pay"),
        icon: "qzwl-pay-wx@2x.png"
      }, {
        type: "alipay",
        name: o.$t("common.alipay.pay"),
        icon: "qzwl-pay-alipay@2x.png"
      }],
      payMode: []
    };
  },
  computed: (function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var a = null != arguments[e] ? arguments[e] : {};
      e % 2 ? c(Object(a), true).forEach(function (e) {
        mod7ca3(t, e, a[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : c(Object(a)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
      });
    }
    return t;
  })({}, mod8f59.mapGetters(["providerList"])),
  mounted: function () {
    var t = this;
    (this.payMode = this.mode.filter(function (e) {
      return t.providerList.includes(e.type);
    }), this.$emit("changePayType", this.providerList[0]));
  },
  methods: {
    l: function (t) {
      return o.$t(t);
    },
    changePay: function (t) {
      this.$emit("changePayType", t);
    }
  }
};
export default u;

</script>
