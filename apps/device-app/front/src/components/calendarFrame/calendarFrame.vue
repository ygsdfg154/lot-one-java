<template>
<view>
  <view style="background-color: #ffffff; padding: 20rpx 32rpx; margin-bottom: 20rpx; display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
    <view style="display: flex; flex-direction: row; align-items: center; cursor: pointer;" @click="changeDateHandler(currentDate, 'down')">
      <u-icon name="play-left-fill" size="24rpx" color="#6081C7"></u-icon>
      <text style="font-size: 26rpx; color: #6081C7; margin-left: 8rpx;">
        {{ l('common.before.day') }}
      </text>
    </view>
    <view style="display: flex; flex-direction: row; align-items: center; cursor: pointer;" @click="openDatePicker">
      <u-icon :name="cdn + '/ikon/qzwl-calendar@2x.png'" size="44rpx"></u-icon>
      <text style="font-size: 28rpx; font-weight: bold; color: #333333; margin-left: 12rpx;">
        {{ currentDate }}
      </text>
    </view>
    <view style="display: flex; flex-direction: row; align-items: center; cursor: pointer;" @click="changeDateHandler(currentDate, 'up')">
      <text style="font-size: 26rpx; color: #6081C7; margin-right: 8rpx;">
        {{ l('common.last.day') }}
      </text>
      <u-icon name="play-right-fill" size="24rpx" color="#6081C7"></u-icon>
    </view>
  </view>
  <u-calendar
    ref="calendar"
    :defaultDate="currentDate"
    :show="isShow"
    mode="single"
    :closeOnClickOverlay="true"
    :monthNum="100"
    :minDate="minDate"
    :maxDate="maxDate"
    :showLunar="true"
    :formatter="formatter"
    :confirmText="l('common.confirm')"
    :title="l('common.u.calendar.head')"
    @confirm="dateConfirm"
    @close="isShow = false"
  ></u-calendar>
</view>
</template>

<script>
/*
 * 组件: calendarFrame
 * 反编译自 webpack 模块 fa1f（svc 编译空间）
 * async/await 还原: 0 个已转换, 2 个含条件跳转/try-catch 保持状态机原样
 */
import mod127e from '@/.unpacked/svc/127e.js'
import ee10 from '@/.unpacked/svc/ee10.js'
import mod7ca3 from '@/.unpacked/svc/7ca3.js'
import * as mod8f59 from 'vuex'
import mod54f6 from 'moment'
import e113 from '../../common/config.js'

"use strict";
var f = new Date(), p = f.getFullYear(), m = f.getMonth() + 1;
m = m < 10 ? ("0").concat(m) : m;
var v = f.getDate();
v = v < 10 ? ("0").concat(v) : v;
var _ = getApp().globalData, h = {
  data: function () {
    return {
      cdn: e113.cdn,
      maxDate: ("").concat(p, "-").concat(m, "-").concat(v, " 23:59:59"),
      minDate: mod54f6(f).subtract(6, "months").format("YYYY-MM-DD"),
      isShow: false,
      onloadDate: true,
      dateList: []
    };
  },
  props: ["currentDate", "param", "name", "reportType"],
  computed: {
    ...mod8f59.mapGetters(["selectedTerminal"])
  },
  mounted: function () {},
  beforeDestroy: function () {
    this.onloadDate = true;
  },
  methods: {
    ...mod8f59.mapActions("device", ["GetListDates"]),
    l: function (t) {
      return _.$t(t);
    },
    openDatePicker: function () {
      var t = this;
      return ee10(mod127e.mark(function e() {
        return mod127e.wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              if (!t.onloadDate) {
                e.next = 3;
                break;
              }
              return (e.next = 3, t.getDates());
            case 3:
              (t.isShow = true, t.onloadDate = false);
            case 5:
            case "end":
              return e.stop();
          }
        }, e);
      }))();
    },
    getDates: function () {
      var t = this;
      return ee10(mod127e.mark(function e() {
        var a, n;
        return mod127e.wrap(function (e) {
          while (1) switch (e.prev = e.next) {
            case 0:
              if ("trip" != t.name) {
                e.next = 13;
                break;
              }
              if (1 != t.reportType) {
                e.next = 7;
                break;
              }
              return (e.next = 4, t.GetListDates({
                terminalId: t.selectedTerminal.id,
                type: "trip/trip"
              }));
            case 4:
              (a = e.sent, e.next = 10);
              break;
            case 7:
              return (e.next = 9, t.GetListDates({
                terminalId: t.selectedTerminal.id,
                type: "trip/stopover"
              }));
            case 9:
              a = e.sent;
            case 10:
              (a.succeeded && (t.dateList = a.data), e.next = 18);
              break;
            case 13:
              if ("audio" != t.name) {
                e.next = 18;
                break;
              }
              return (e.next = 16, t.GetListDates({
                type: "record",
                terminalId: t.selectedTerminal.id
              }));
            case 16:
              (n = e.sent, n.succeeded && (t.dateList = n.data));
            case 18:
            case "end":
              return e.stop();
          }
        }, e);
      }))();
    },
    changeDateHandler: function (t, e) {
      var a = mod54f6(t).add(1, "days").format("YYYY-MM-DD"), n = mod54f6(t).subtract(1, "days").format("YYYY-MM-DD");
      ("up" === e && (mod54f6(a).isAfter(mod54f6(this.maxDate)) ? uni.showToast({
        title: _.$t("common.unable-greater.than-today"),
        icon: "none"
      }) : this.$emit("update:currentDate", a)), "down" === e && (mod54f6(n).isBefore(mod54f6(this.minDate)) ? uni.showToast({
        title: _.$t("common.unable-minimum-date"),
        icon: "none"
      }) : this.$emit("update:currentDate", n)));
    },
    dateConfirm: function (t) {
      (this.$emit("update:currentDate", t[0]), this.isShow = false);
    },
    formatter: function (t) {
      var e = new Date(), a = e.getMonth() + 1, n = e.getDate();
      return (t.month == a && t.day == n && (t.bottomInfo = _.$t("common.today")), this.dateList.length && this.dateList.forEach(function (e) {
        var a = e.substr(5, 2), n = e.substr(8, 2);
        t.month == Number(a) && t.day == Number(n) && (t.dot = true);
      }), t);
    }
  },
  watch: {
    currentDate: {
      handler: function () {
        this.$emit("fetchData", this.param);
      }
    },
    reportType: {
      handler: function () {
        (this.onloadDate = true, this.$emit("fetchData", this.param));
      }
    }
  }
};
export default h;

</script>
