<template>
<view class="bg-page h100">
  <uni-nav-bar
    color="#fff"
    title="支付成功"
    :backgroundColor="primaryColor"
    :border="false"
    :fixed="true"
    :statusBar="true"
    leftIcon="left"
    @clickLeft="gotoPages"
  ></uni-nav-bar>
  <view>
    <view class="main" :style="{ backgroundColor: primaryColor }">
      <view class="flex-col justify-center items-center">
        <view class="mainSuccess">
          <u-icon size="48" :name="cdn + '/draw/qzwl-paySuccess.png'"></u-icon>
        </view>
        <text class="text-bold text-white .text-lx">
          支付成功
        </text>
      </view>
    </view>
    <view class="flex-row justify-center">
      <view class="content">
        <view class="flex-row justify-center b-bottom p-b-xl">
          <text class="text-bold" :style="{ color: primaryColor }">
            ¥ {{ payInfo.totalFee }}
          </text>
        </view>
        <view class="p-t-xl">
          <view class="flex-row justify-between">
            <text class="text">
              订单编号
            </text>
            <text class="text">
              {{ payInfo.outTradeNo }}
            </text>
          </view>
          <view class="flex-row justify-between m-t">
            <text class="text">
              付款时间
            </text>
            <text class="text">
              {{ payInfo.payTime }}
            </text>
          </view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
/*
 * 页面: pagesPay/paySuccess/index
 * 反编译自 webpack 模块 242d（svc 编译空间）
 */
import e113 from '../../common/config.js'

"use strict";
var n = {
  data: function () {
    return {
      cdn: e113.cdn,
      titleColor: e113.titleColor,
      primaryColor: e113.primaryColor,
      payInfo: null
    };
  },
  onLoad: function (t) {
    this.payInfo = {
      outTradeNo: t.outTradeNo,
      payTime: t.payTime,
      totalFee: t.totalFee / 100
    };
  },
  methods: {
    gotoPages: function () {
      uni.navigateBack();
    }
  }
};
export default n;

</script>

<style scoped>
@charset "UTF-8";.main{height:350rpx;display:flex;flex-direction:column;justify-content:center;align-items:center}.mainSuccess{width:150rpx;height:150rpx;background-color:#fff;border-radius:75rpx;display:flex;flex-direction:row;justify-content:center;align-items:center;margin-bottom:40rpx}.content{width:86%;padding:40rpx 34rpx;background-color:#fff}
</style>
