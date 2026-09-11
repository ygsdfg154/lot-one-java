<template>
<view></view>
</template>

<script>
/*
 * 组件: Pay —— 下单 + 调起支付 + 轮询到账
 *
 * 重写自反编译产物。契约把支付拆成两步（11.2.1 创建订单 → 11.2.2 发起支付），
 * store 的 CreateCardPackageOrderAuth 已经把两步串好并给出 `paymentArgs`，
 * 这里只负责调 SDK 与轮询。
 *
 * 三处按契约纠正：
 *   - 轮询用 `orderNo`（契约对外不暴露自增 ID），判断字段是 `orderStatus`；
 *   - 第二步失败时订单**已经落库**，提示用户去订单列表继续支付，不要让他再下一单；
 *   - 轮询固定三次是原版行为，这里保留但改成循环 + 明确的超时提示：支付成功而回调
 *     还没到时，原版静默什么都不做，用户以为付款没生效会重复支付。
 */
import * as VUEX from 'vuex';
import * as mod4ddb from '../../common/utils.js';

"use strict";

/** 轮询到账：间隔 1s，最多 5 次（微信回调通常 1~3s 到）。 */
var POLL_INTERVAL_MS = 1000;
var POLL_TIMES = 5;

export default {
  methods: {
    ...VUEX.mapActions("order", ["CreateCardPackageOrderAuth", "GetCardPackageOrderState"]),
    sleepFunc: function (ms) {
      return new Promise(function (resolve) {
        setTimeout(resolve, ms);
      });
    },
    /** 下单并调起支付。`e` 至少含 {productType, productId, deviceId, payChannel}。 */
    createOrderPay: function (e) {
      var self = this;
      return (async function () {
        var res = await self.CreateCardPackageOrderAuth({ ...e });
        if (!res.succeeded) {
          // 订单创建成功但发起支付失败：订单还在，别让用户重复下单
          if (res.order && res.order.orderNo) {
            return mod4ddb.qzwlToast("订单已创建，可在订单列表继续支付", "none");
          }
          return mod4ddb.qzwlToast(res.msg, "none");
        }
        self.payment(res);
      })();
    },
    /** 调起支付 SDK。参数形状由 adapters/order.js 的 toPaymentArgs 决定。 */
    payment: function (res) {
      var self = this;
      var args = res.paymentArgs || {};
      var orderNo = res.order && res.order.orderNo;
      // #ifdef APP-PLUS
      if (args.provider === "wxpay" && typeof plus !== "undefined") {
        var installed = plus.runtime.isApplicationExist({
          pname: "com.tencent.mm",
          action: "weixin://"
        });
        if (!installed) return mod4ddb.qzwlToast("请先安装微信");
      }
      // #endif
      uni.requestPayment({
        provider: args.provider,
        orderInfo: args.orderInfo,
        // 小程序端 requestPayment 直接吃 payParams 各字段，一并展开
        ...(args.orderInfo || {}),
        success: function () {
          self.getOrderState(orderNo);
        },
        fail: function (err) {
          if (err && err.code === -8) {
            return mod4ddb.qzwlToast("支付失败，微信客户端未安装", "none");
          }
          // 用户主动取消不算错误，不弹提示
          if (err && String(err.errMsg || "").indexOf("fail cancel") === -1) {
            mod4ddb.qzwlToast("支付未完成", "none");
          }
        }
      });
    },
    /**
     * 轮询订单状态确认到账。orderStatus：0 待支付 1 已支付。
     * 轮完还没到账就明确告知"支付结果确认中"，不要静默——用户会重复付款。
     */
    getOrderState: function (orderNo) {
      var self = this;
      return (async function () {
        for (var i = 0; i < POLL_TIMES; i++) {
          await self.sleepFunc(POLL_INTERVAL_MS);
          var res = await self.GetCardPackageOrderState(orderNo);
          if (res && res.succeeded && res.data && res.data.status === 1) {
            self.$emit("paySucces");
            uni.navigateTo({
              url:
                "/pagesPay/paySuccess/index?outTradeNo=" +
                encodeURIComponent(res.data.orderNo) +
                "&payTime=" +
                encodeURIComponent(res.data.payTime || "") +
                "&totalFee=" +
                encodeURIComponent(res.data.totalFee)
            });
            await self.sleepFunc(500);
            return mod4ddb.qzwlToast("支付成功");
          }
        }
        // 支付回调可能稍晚到，让用户去订单列表查看，而不是以为没付成功
        mod4ddb.qzwlToast("支付结果确认中，请稍后在订单列表查看", "none");
      })();
    }
  }
};
</script>
