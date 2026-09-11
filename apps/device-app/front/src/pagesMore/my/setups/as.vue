<template>
<view class="about-page">
  <view class="about-header">
    <image class="logo-img" :src="cdn + '/draw/qzwl-logo.png'" mode="aspectFit" />
    <text class="app-name">
      {{ l('app.name') || '铭智物联' }}
    </text>
    <text v-if="version" class="app-version" @click="tapVersion">
      Version {{ version }}
    </text>
  </view>

  <view class="card-box">
    <view class="menu-item" @click="gotoPage('/pagesMore/my/setups/privacy_notice')">
      <text class="menu-text">
        {{ l('mine.setup.privacy.notice') || '隐私政策' }}
      </text>
      <u-icon name="arrow-right" color="#ccc" size="32rpx"></u-icon>
    </view>
    <view class="menu-item" @click="gotoPage('/pagesMore/my/setups/service_terms')">
      <text class="menu-text">
        {{ l('mine.setup.service.agreement') || '服务协议' }}
      </text>
      <u-icon name="arrow-right" color="#ccc" size="32rpx"></u-icon>
    </view>
    <view class="menu-item" @click="check">
      <text class="menu-text">
        {{ l('common.update') || '检测更新' }}
      </text>
      <u-icon name="arrow-right" color="#ccc" size="32rpx"></u-icon>
    </view>
  </view>

  <view class="copyright-box">
    <text class="copyright-text">
      Copyright © {{ year }}
    </text>
    <text class="copyright-text">
      {{ l('app.copy') || '东莞市铭智电子有限公司' }}
    </text>
    <text class="copyright-text">
      {{ l('app.ICP') || '粤ICP备2024357304号' }}
    </text>
  </view>
</view>
</template>

<script>
/*
 * 页面: pagesMore/my/setups/as
 */
import e113 from '../../../common/config.js';
import mod918f from '@/.unpacked/svc/918f.js';
import * as mod8f59 from 'vuex';

"use strict";
var f = {
  onLoad: function () {
    this.version = (this.sysInfo && this.sysInfo.appWgtVersion) || "1.0.0";
  },
  data: function () {
    return {
      cdn: e113.cdn,
      version: "1.0.0",
      sysInfo: uni.getSystemInfoSync(),
      year: new Date().getFullYear(),
      about: {},
      tapCount: 0
    };
  },
  computed: {
    ...mod8f59.mapGetters(["isDevMode"])
  },
  methods: {
    ...mod8f59.mapMutations("dev", ["setDevelopMode"]),
    l: function (t) {
      if (this && typeof this.$t === 'function') {
        var res = this.$t(t);
        if (res && res !== t) return res;
      }
      var app = getApp() && getApp().globalData;
      if (app && typeof app.$t === 'function') {
        return app.$t(t);
      }
      return '';
    },
    check: function () {
      var self = this;
      return (async function () {
        var e = await mod918f();
        uni.showToast({
          title: self.l("common.new.version") || "当前是最新版本",
          icon: "none"
        });
      })();
    },
    tapVersion: function () {
      this.isDevMode ? uni.showToast({
        title: "您已处于开发者模式",
        icon: "none"
      }) : (this.tapCount += 1, 7 == this.tapCount && (this.tapCount = 0, this.setDevelopMode(true), setTimeout(function () {
        uni.showToast({
          title: "启用开发者模式",
          icon: "none"
        });
      }, 0), uni.navigateBack()));
    },
    gotoPage: function (t) {
      uni.navigateTo({
        url: t
      });
    }
  }
};
export default f;
</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f6f6f6;
  padding: 40px 16px 30px 16px;
  box-sizing: border-box;
  position: relative;
}

.about-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

.logo-img {
  width: 90px;
  height: 90px;
  border-radius: 18px;
  margin-bottom: 12px;
}

.app-name {
  font-size: 20px;
  font-weight: bold;
  color: #333333;
  margin-top: 4px;
}

.app-version {
  font-size: 13px;
  color: #999999;
  margin-top: 6px;
}

.card-box {
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 0 16px;
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

.menu-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f2f2f2;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-text {
  font-size: 15px;
  color: #333333;
  font-weight: 500;
}

.copyright-box {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.copyright-text {
  font-size: 12px;
  color: #999999;
  line-height: 18px;
  text-align: center;
}
</style>
