<template>
<view class="bg-page p-h-lg p-t-xl">
  <view class="header bg-white">
    <u-icon :name="iconCode" size="90rpx"></u-icon>
    <view class="m-l-lg">
      <view>
        <text class="text">
          {{ l('device.terminal.no') }}：
        </text>
        <text class="text">
          {{ selectedTerminal.terminalNo }}
        </text>
      </view>
      <view>
        <text class="text">
          ICCID：
        </text>
        <text class="text m-l">
          {{ selectedTerminal.iccid || '-' }}
        </text>
      </view>
      <view>
        <text v-if="'暂无服务信息' != addValueExpirationTime" class="text text-grey">
          {{ l('traffic-card.service.expiration.time') }}：
        </text>
        <text class="text text-grey">
          {{ addValueExpirationTime }}
        </text>
      </view>
    </view>
  </view>
  <view class="flex-col m-t-lg">
    <view class="section_4">
      <view
        v-for="(e, r, s, n) in { forItems: packages }"
        :key="{ forIndex: s, key: e.id }"
        class="flex-col equal-division-item"
        :class="e.borderShow ? 'styleBorder' : 'styleBorder1'"
        @click="selectHandler(e, r)"
      >
        <text class="text_13">
          {{ e.pkgName }}
        </text>
        <view class="flex-row group_10">
          <text class="text_14">
            ¥
          </text>
          <text class="text_15">
            {{ e.price / 100 }}
          </text>
        </view>
      </view>
    </view>
  </view>
  <view>
    <PayMode :payType="payType" @changePayType="changePayType"></PayMode>
  </view>
  <view class="p-md bg-white br-md m-t-lg">
    <text class="text-md text-bold p-b-lg">
      套餐内容:
    </text>
    <view v-if="selectedPackage" class="flex-col">
      <text class="text-sm text-gray">
        {{ selectedPackage.pkgDesc }}
      </text>
    </view>
  </view>
  <view class="p-md bg-white br-md m-t-lg">
    <text class="text-md text-bold p-b-lg">
      购买说明
    </text>
    <view class="flex-col">
      <text class="text-sm text-gray">
        1：此为虚拟商品，一经售出概不退款。
      </text>
    </view>
    <CustomerService></CustomerService>
  </view>
  <view>
    <view class="flex-row justify-start items-center m-l">
      <GetBackApp></GetBackApp>
    </view>
    <view class="justify-between section_6">
      <view class="flex-row group_14">
        <view class="group_9 view_4">
          <text class="text_28">
            {{ l('common.topup.pay') }}：
          </text>
          <text class="text_29 text-primary">
            ¥
          </text>
        </view>
        <text class="text_30 text-primary">
          {{ price }}
        </text>
      </view>
      <view>
        <u-button
          type="primary"
          :text="l('common.vip.pay')"
          :disabled="payDisabled"
          @click="confirmBuy"
        ></u-button>
      </view>
    </view>
  </view>
  <Pay ref="Pay" @paySucces="paySucces"></Pay>
</view>
</template>

<script>
/*
 * 页面: pagesPay/appreciation/index
 * 反编译自 webpack 模块 51f5（svc 编译空间）
 * async/await 还原: 2 个已转换, 1 个含条件跳转/try-catch 保持状态机原样
 */
import mod127e from '@/.unpacked/svc/127e.js';
import ee10 from '@/.unpacked/svc/ee10.js';
import mod7ca3 from '@/.unpacked/svc/7ca3.js';
import * as mod8f59 from 'vuex';
import * as mod4ddb from '../../common/utils.js';
import e113 from '../../common/config.js';
import a63f from '../../components/CustomerService/CustomerService.vue';
import mod93a2 from '../../components/Pay/Pay.vue';
import mod9a8a from '../../components/PayMode/PayMode.vue';
import d0ff from '../../components/GetBackApp/GetBackApp.vue';
"use strict";
var y = getApp().globalData, m = {
  components: {
    PayMode: mod9a8a,
    CustomerService: a63f,
    Pay: mod93a2,
    GetBackApp: d0ff
  },
  data: function () {
    return {
      cdn: e113.cdn,
      packages: [],
      selectedPackage: null,
      price: "-",
      openid: null,
      addedInfo: null,
      payType: "wxpay",
      videoContext: null
    };
  },
  computed: {
    ...mod8f59.mapGetters(["selectedTerminal", "appConfig", "userType", "sysInfo"]),
    ...mod8f59.mapState("device", ["deviceIcons"]),
    iconCode: function () {
      if (this.selectedTerminal && this.appConfig) return ("").concat(this.cdn, "/ikon/").concat(mod4ddb.getTerminalIconCode(this.selectedTerminal.iconType, this.deviceIcons).code, "-1@2x.png");
    },
    payDisabled: function () {
      if (this.addedInfo) return "9999" == this.addedInfo.expirationTime.substr(0, 4);
    },
    addValueExpirationTime: function () {
      var t;
      return (t = this.addedInfo && this.addedInfo.expirationTime ? "9999" == this.addedInfo.expirationTime.substr(0, 4) ? "\u7ec8\u8eab" : new Date(this.addedInfo.expirationTime) < new Date() ? "\u672a\u6fc0\u6d3b" : this.addedInfo.expirationTime : "\u672a\u6fc0\u6d3b", t);
    }
  },
  onLoad: function () {
    (this.getActivationPackage(), this.getDeviceConfig());
  },
  onShow: function () {},
  watch: {
    payDisabled: {
      handler: function (t) {
        t && this.clearSelectedPackage();
      }
    }
  },
  methods: {
    ...mod8f59.mapActions("packageInfo", ["GetPackage", "GetDeviceVipTypeList"]),
    ...mod8f59.mapMutations("device", ["setActivationState", "setInfoBoxShow"]),
    l: function (t) {
      return y.$t(t);
    },
    getDeviceConfig: function () {
      var t = this;
      return (async function () {
        var a;
        (a = await t.GetDeviceVipTypeList({
          terminalId: t.selectedTerminal.id,
          type: 6
        }), a.succeeded && (t.addedInfo = a.data));
      })();
    },
    getActivationPackage: function () {
      var t = this;
      return ee10(mod127e.mark(function e() {
        var a;
        return mod127e.wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              return (e.next = 2, t.GetPackage({
                deviceId: t.selectedTerminal.id,
                path: "activation"
              }));
            case 2:
              if ((a = e.sent, a.succeeded && 0 != a.data.length)) {
                e.next = 9;
                break;
              }
              return (setTimeout(function () {
                uni.showToast({
                  title: y.$t("common.no-package"),
                  icon: "none"
                });
              }, 100), e.next = 7, y.$sleep(1500));
            case 7:
              return (uni.navigateBack(), e.abrupt("return"));
            case 9:
              (t.packages = a.data.map(function (t) {
                return {
                  ...t,
                  borderShow: false
                };
              }), t.packages[0].borderShow = true, t.selectedPackage = {
                ...t.packages[0],
                index: 0
              }, t.price = t.selectedPackage.price / 100);
            case 13:
            case "end":
              return e.stop();
          }
        }, e);
      }))();
    },
    selectHandler: function (t, e) {
      this.payDisabled || (this.packages = this.packages.map(function (t) {
        return {
          ...t,
          borderShow: false
        };
      }), this.packages[e].borderShow = true, this.selectedPackage = {
        ...t,
        index: e
      }, this.price = this.selectedPackage.price / 100);
    },
    clearSelectedPackage: function () {
      (this.packages = this.packages.map(function (t) {
        return {
          ...t,
          borderShow: false
        };
      }), this.selectedPackage = null, this.price = "-");
    },
    changePayType: function (t) {
      this.payType = t;
    },
    confirmBuy: function () {
      var t = this;
      return (async function () {
        t.$refs.Pay.createOrderPay({
          provider: t.payType,
          productId: t.selectedPackage.id,
          terminalId: t.selectedTerminal.id
        });
      })();
    },
    paySucces: function (t) {
      (this.getDeviceConfig(), this.setActivationState(1), this.setInfoBoxShow(true), uni.showTabBar());
    }
  }
};
export default m;

</script>

<style scoped>
@charset "UTF-8";.header{border-radius:16rpx;padding:35rpx;display:flex;flex-direction:row;align-items:center}.header-icon{width:110rpx;height:110rpx;display:flex;flex-direction:row;justify-content:center;align-items:center;border-radius:50%;background-color:#fff;box-shadow:3px 3px 5px rgba(0,0,0,.3)}.section_4{display:flex;justify-content:flex-start;flex-wrap:wrap;padding:24rpx 24rpx;background-color:#fff;border-radius:16rpx}.section_4 .equal-division-item{padding:32rpx 18rpx 0rpx 18rpx;width:30%;background-color:#edf6ff;border-radius:16rpx;height:202rpx;margin:0 10rpx 20rpx}.section_4 .equal-division-item .text_13{color:#333;font-size:24rpx;font-family:PingFangSC-Medium;font-weight:500;line-height:34rpx;text-align:center}.section_4 .equal-division-item .group_10{margin-top:30rpx;padding:0 34rpx;justify-content:center}.section_4 .equal-division-item .group_10 .text_14{margin-top:12rpx;color:#6081c7;font-size:32rpx;font-family:PingFangSC-Medium;font-weight:500;line-height:44rpx}.section_4 .equal-division-item .group_10 .text_15{color:#6081c7;font-size:48rpx;margin-left:5rpx;font-family:DINAlternate-Bold;font-weight:700;line-height:56rpx}.section_6{padding:32rpx 32rpx 64rpx;background-color:#fff;width:100vw}.section_6 .group_14{align-self:center}.section_6 .group_14 .view_4{margin-top:8rpx}.section_6 .group_14 .text_30{margin-left:8rpx;margin-top:2px;font-size:40rpx;font-family:\.AppleSystemUIFont;line-height:46rpx}.section_6 .text-wrapper_2{padding:18rpx 0;border-radius:15rpx;width:278rpx;height:80rpx}.section_6 .text-wrapper_2 .text_31{color:#fff;font-size:32rpx;font-family:PingFangSC-Medium;font-weight:500;line-height:44rpx}.styleBorder{border:solid 4rpx #6081c7}.styleBorder1{border:solid 4rpx #edf6ff}
</style>
