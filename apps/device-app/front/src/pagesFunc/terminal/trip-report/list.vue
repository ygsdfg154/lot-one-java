<template>
<view style="min-height: 100vh; background-color: #f6f6f6; padding-bottom: 60rpx;">
  <view style="background-color: #ffffff; padding: 20rpx 32rpx; display: flex; flex-direction: row; justify-content: center; border-bottom: 1rpx solid #f0f0f0;">
    <view style="width: 480rpx;">
      <u-subsection
        bgColor="#6081C7"
        mode="subsection"
        activeColor="#ffffff"
        inactiveColor="#6081C7"
        :list="tripList"
        :current="reportType"
        @change="tripTabChanged"
      ></u-subsection>
    </view>
  </view>

  <calendarFrame
    :currentDate="currentDate"
    name="trip"
    :param="param"
    :reportType="reportType"
    @update:currentDate="currentDate = $event"
    @update:current-date="currentDate = $event"
    @fetchData="fetchData"
  ></calendarFrame>

  <view style="padding: 0 32rpx;">
    <view
      v-for="(e, index) in reportList"
      :key="e.id || index"
      style="background-color: #ffffff; border-radius: 16rpx; padding: 24rpx; margin-bottom: 20rpx; cursor: pointer;"
      @click="gotoDetail(e)"
    >
      <view style="display: flex; flex-direction: row; align-items: center; justify-content: space-between; border-bottom: 1rpx solid #f9f9f9; padding-bottom: 16rpx; margin-bottom: 16rpx;">
        <view style="display: flex; flex-direction: column;">
          <view v-if="0 === reportType" style="display: flex; flex-direction: row; align-items: center; margin-bottom: 8rpx;">
            <text style="font-size: 26rpx; color: #888888;">{{ l('common.residence.time') }}：</text>
            <text v-if="e.minutes" style="font-size: 28rpx; font-weight: bold; color: #6081C7;">
              {{ e.minutes.toFixed(2) }}{{ l('common.min') }}
            </text>
          </view>
          <view style="display: flex; flex-direction: row; align-items: center; margin-bottom: 4rpx;">
            <text style="font-size: 24rpx; color: #888888;">{{ l('common.time-on') }}：</text>
            <text style="font-size: 24rpx; color: #333333;">{{ e.startTime }}</text>
          </view>
          <view style="display: flex; flex-direction: row; align-items: center;">
            <text style="font-size: 24rpx; color: #888888;">{{ l('common.time-off') }}：</text>
            <text style="font-size: 24rpx; color: #333333;">{{ e.endTime }}</text>
          </view>
        </view>
        <u-icon name="arrow-right" color="#cccccc" size="28rpx"></u-icon>
      </view>

      <view v-if="0 === reportType && e.startLon && e.startLat" style="display: flex; flex-direction: row; align-items: flex-start;">
        <text style="font-size: 24rpx; color: #888888; flex-shrink: 0;">{{ l('common.addedress') }}：</text>
        <text v-if="e.address" style="font-size: 24rpx; color: #333333; flex: 1;">{{ e.address }}</text>
        <text
          v-else
          style="font-size: 24rpx; color: #6081C7; flex: 1; text-decoration: underline;"
          @click.stop="getAddress({ id: e.id, longitude: e.startLonWGS84, latitude: e.startLatWGS84, addressName: 'address' })"
        >
          {{ e.startLonWGS84 + ',' + e.startLatWGS84 }}
        </text>
      </view>

      <view v-if="1 === reportType && e.startLon && e.startLat" style="display: flex; flex-direction: row; align-items: flex-start; margin-bottom: 8rpx;">
        <text style="font-size: 24rpx; color: #888888; flex-shrink: 0;">{{ l('common.starting') }}：</text>
        <text v-if="e.startAddress" style="font-size: 24rpx; color: #333333; flex: 1;">{{ e.startAddress }}</text>
        <text
          v-else
          style="font-size: 24rpx; color: #6081C7; flex: 1; text-decoration: underline;"
          @click.stop="getAddress({ id: e.id, longitude: e.startLonWGS84, latitude: e.startLatWGS84, addressName: 'startAddress' })"
        >
          {{ e.startLonWGS84 + ',' + e.startLatWGS84 }}
        </text>
      </view>

      <view v-if="1 === reportType && e.endLon && e.endLat" style="display: flex; flex-direction: row; align-items: flex-start;">
        <text style="font-size: 24rpx; color: #888888; flex-shrink: 0;">{{ l('common.destination') }}：</text>
        <text v-if="e.endAddress" style="font-size: 24rpx; color: #333333; flex: 1;">{{ e.endAddress }}</text>
        <text
          v-else
          style="font-size: 24rpx; color: #6081C7; flex: 1; text-decoration: underline;"
          @click.stop="getAddress({ id: e.id, longitude: e.endLonWGS84, latitude: e.endLatWGS84, addressName: 'endAddress' })"
        >
          {{ e.endLonWGS84 + ',' + e.endLatWGS84 }}
        </text>
      </view>
    </view>
  </view>

  <view style="margin-top: 60rpx;">
    <u-empty
      v-if="!reportList.length"
      :text="l('common.no.more')"
      :icon="cdn + '/draw/qzwl-empty.png'"
    ></u-empty>
    <u-loadmore v-if="reportList.length" :status="status" :line="true"></u-loadmore>
  </view>
</view>
</template>

<script>
/*
 * 页面: pagesFunc/terminal/trip-report/list
 * 反编译自 webpack 模块 a361（svc 编译空间）
 * async/await 还原: 2 个已转换
 * 已剥离 webpack 的 global 注入包装（保留了 1 个注入参数的绑定）
 * 变量 i 在内层被重新声明，保留短名以维持遮蔽语义
 * 内层仍在调用 n()，已就地重建 interopRequireDefault
 */
import mod127e from '@/.unpacked/svc/127e.js';
import i from '@/.unpacked/svc/ee10.js';
import mod7ca3 from '@/.unpacked/svc/7ca3.js';
import * as mod8f59 from 'vuex';
import e113 from '../../../common/config.js';
import c2a6 from '../../../components/calendarFrame/calendarFrame.vue';
function n(m) {
  return m && m.__esModule ? m : {
    default: m
  };
}
"use strict";
var t = require("@/.unpacked/svc/f3b9.js")["default"];
var u = (require("@/.unpacked/svc/aa02.js"), require("../../../common/utils.js"), n(require("moment")));
var p = getApp().globalData, m = new Date(), v = {
  components: {
    calendarFrame: c2a6
  },
  data: function () {
    var t;
    return {
      cdn: e113.cdn,
      pattern: (t = {
        color: e113.primaryColor,
        backgroundColor: "#fff",
        selectedColor: e113.primaryColor,
        buttonColor: e113.primaryColor
      }, mod7ca3(t, "backgroundColor", e113.primaryColor), mod7ca3(t, "icon", "bars"), t),
      reportType: 0,
      date: [u.default(m).format("YYYY-MM-DD")],
      currentDate: u.default(m).format("YYYY-MM-DD"),
      tripList: [{
        name: "\u505c\u7559\u62a5\u8868"
      }, {
        name: "\u884c\u7a0b\u62a5\u8868"
      }]
    };
  },
  computed: {
    ...mod8f59.mapState("report", ["reportList", "status"]),
    ...mod8f59.mapGetters(["selectedTerminal"]),
    param: function () {
      return {
        type: this.reportType,
        refresh: true
      };
    }
  },
  onLoad: function () {
    this.fetchData({
      type: this.reportType,
      refresh: true
    });
  },
  onReady: function () {
    this.currentDate = this.date[0] = u.default(new Date()).format("YYYY-MM-DD");
  },
  onReachBottom: function () {
    this.fetchData({
      type: this.reportType,
      refresh: false
    });
  },
  onPullDownRefresh: function () {
    (this.fetchData({
      type: this.reportType,
      refresh: true
    }), uni.stopPullDownRefresh());
  },
  methods: {
    l: function (t) {
      return p.$t(t);
    },
    ...mod8f59.mapActions("report", ["GetReportList"]),
    ...mod8f59.mapActions("device", ["GetGeocode"]),
    ...mod8f59.mapMutations("report", ["setListNeedRefresh", "setReportItem", "setReportInfoAddress"]),
    fetchData: function (t) {
      var e = this;
      return (async function () {
        e.setListNeedRefresh(t.refresh);
        (await e.GetReportList({
          deviceId: e.selectedTerminal.id,
          type: t.type,
          date: e.currentDate
        }), uni.stopPullDownRefresh());
      })();
    },
    gotoDetail: function (t) {
      (this.setReportItem({
        ...t,
        reportType: this.reportType
      }), uni.navigateTo({
        url: "/pagesFunc/terminal/trip-report/detail"
      }));
    },
    tripTabChanged: function (t) {
      this.reportType = t;
    },
    getAddress: function (e) {
      var a = this;
      return (async function () {
        var i;
        t("log", "reportList", a.reportList, " at pagesFunc/terminal/trip-report/list.vue:254");
        t("log", "data", e, " at pagesFunc/terminal/trip-report/list.vue:255");
        (i = await a.GetGeocode({
          longitude: e.longitude,
          latitude: e.latitude
        }), i.succeeded && (t("log", "result", i, " at pagesFunc/terminal/trip-report/list.vue:258"), a.setReportInfoAddress({
          id: e.id,
          addressName: e.addressName,
          addressValue: i.address
        })));
      })();
    }
  }
};
export default v;

</script>

<style scoped>
@charset "UTF-8";.content-align{width:140rpx;text-align:right}.text_2{font-size:28rpx;font-family:PingFangSC-Medium;font-weight:500;line-height:40rpx}
</style>
