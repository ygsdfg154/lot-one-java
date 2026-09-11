<template>
<u-popup
  :show="show"
  mode="bottom"
  :closeable="true"
  :round="round"
  :closeOnClickOverlay="closeOnClickOverlay"
  @close="close"
>
  <view class="u-calendar">
    <uHeader :title="title" :subtitle="subtitle" :showSubtitle="showSubtitle" :showTitle="showTitle"></uHeader>
    <scroll-view
      :style="{ height: $u.addUnit(listHeight) }"
      :scroll-top="scrollTop"
      :scrollIntoView="scrollIntoView"
      @scroll="onScroll"
    >
      <uMonth
        ref="month"
        :color="color"
        :rowHeight="rowHeight"
        :showMark="showMark"
        :months="months"
        :mode="mode"
        :maxCount="maxCount"
        :startText="startText"
        :endText="endText"
        :defaultDate="defaultDate"
        :minDate="innerMinDate"
        :maxDate="innerMaxDate"
        :maxMonth="monthNum"
        :readonly="readonly"
        :maxRange="maxRange"
        :rangePrompt="rangePrompt"
        :showRangePrompt="showRangePrompt"
        :allowSameDay="allowSameDay"
        @monthSelected="monthSelected"
        @updateMonthTop="updateMonthTop"
      ></uMonth>
    </scroll-view>
    <slot v-if="showConfirm" name="footer">
      <view class="u-calendar__confirm">
        <u-button
          shape="circle"
          :text="buttonDisabled ? confirmDisabledText : confirmText"
          :color="color"
          :disabled="buttonDisabled"
          @click="confirm"
        ></u-button>
      </view>
    </slot>
  </view>
</u-popup>
</template>

<script>
/*
 * 组件: uCalendar
 * 反编译自 webpack 模块 5d96（svc 编译空间）
 * 变量 r 在内层被重新声明，保留短名以维持遮蔽语义
 * 变量 i 在内层被重新声明，保留短名以维持遮蔽语义
 * 变量 o 在内层被重新声明，保留短名以维持遮蔽语义
 * 内层仍在调用 a()，已就地重建 interopRequireDefault
 */
import r from 'uview-ui/components/u-header/u-header.vue'
import i from 'uview-ui/components/u-month/u-month.vue'
import o from '@/.unpacked/svc/ef3d.js'
import mod8a0a from '@/.unpacked/svc/8a0a.js'

function a(m) { return m && m.__esModule ? m : { default: m }; }

"use strict";
var s = (a(require("dayjs")), a(require("@/.unpacked/svc/1e2c.js"))), d = getApp().globalData, c = {
  name: "u-calendar",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, o],
  components: {
    uHeader: r,
    uMonth: i
  },
  data: function () {
    return {
      months: [],
      monthIndex: 0,
      listHeight: 0,
      selected: [],
      scrollIntoView: "",
      scrollTop: 0,
      innerFormatter: function (e) {
        return e;
      }
    };
  },
  watch: {
    selectedChange: {
      immediate: true,
      handler: function (e) {
        this.setMonth();
      }
    },
    show: {
      immediate: true,
      handler: function (e) {
        this.setMonth();
      }
    }
  },
  computed: {
    innerMaxDate: function () {
      return uni.$u.test.number(this.maxDate) ? Number(this.maxDate) : this.maxDate;
    },
    innerMinDate: function () {
      return uni.$u.test.number(this.minDate) ? Number(this.minDate) : this.minDate;
    },
    selectedChange: function () {
      return [this.innerMinDate, this.innerMaxDate, this.defaultDate];
    },
    subtitle: function () {
      return this.months.length ? ("").concat(this.months[this.monthIndex].year).concat(this.l("common.u-calendar-content-year"), "\xa0").concat(this.months[this.monthIndex].month).concat(this.l("common.u-calendar-content-month")) : "";
    },
    buttonDisabled: function () {
      return "range" === this.mode && this.selected.length <= 1;
    }
  },
  mounted: function () {
    (this.start = Date.now(), this.init());
  },
  methods: {
    l: function (e) {
      return d.$t(e);
    },
    setFormatter: function (e) {
      this.innerFormatter = e;
    },
    monthSelected: function (e) {
      (this.selected = e, this.showConfirm || ("multiple" === this.mode || "single" === this.mode || "range" === this.mode && this.selected.length >= 2) && this.$emit("confirm", this.selected));
    },
    init: function () {
      if (this.innerMaxDate && this.innerMinDate && new Date(this.innerMaxDate).getTime() < new Date(this.innerMinDate).getTime()) return uni.$u.error("maxDate\u4e0d\u80fd\u5c0f\u4e8eminDate");
      (this.listHeight = 5 * this.rowHeight + 30, this.setMonth());
    },
    close: function () {
      this.$emit("close");
    },
    confirm: function () {
      this.buttonDisabled || this.$emit("confirm", this.selected);
    },
    getMonths: function (e, t) {
      var n = s.default(e).year(), a = s.default(e).month() + 1, r = s.default(t).year(), i = s.default(t).month() + 1;
      return 12 * (r - n) + (i - a) + 1;
    },
    setMonth: function () {
      var e = this, t = this.innerMinDate || s.default().valueOf(), n = this.innerMaxDate || s.default(t).add(this.monthNum - 1, "month").valueOf(), a = uni.$u.range(1, this.monthNum, this.getMonths(t, n));
      this.months = [];
      for (var r = function (a) {
        e.months.push({
          date: new Array(s.default(t).add(a, "month").daysInMonth()).fill(1).map(function (r, i) {
            var o = i + 1, d = s.default(t).add(a, "month").date(o).day(), c = s.default(t).add(a, "month").date(o).format("YYYY-MM-DD"), l = "";
            if (e.showLunar) {
              var f = mod8a0a.solar2lunar(s.default(c).year(), s.default(c).month() + 1, s.default(c).date());
              l = f.IDayCn;
            }
            var m = {
              day: o,
              week: d,
              disabled: s.default(c).isBefore(s.default(t).format("YYYY-MM-DD")) || s.default(c).isAfter(s.default(n).format("YYYY-MM-DD")),
              date: new Date(c),
              bottomInfo: l,
              dot: false,
              month: s.default(t).add(a, "month").month() + 1
            }, p = e.formatter || e.innerFormatter;
            return p(m);
          }),
          month: s.default(t).add(a, "month").month() + 1,
          year: s.default(t).add(a, "month").year()
        });
      }, i = 0; i < a; i++) r(i);
    },
    scrollIntoDefaultMonth: function (e) {
      var t = this, n = this.months.findIndex(function (t) {
        var n = t.year, a = t.month;
        return (a = uni.$u.padZero(a), ("").concat(n, "-").concat(a) === e);
      });
      -1 !== n && this.$nextTick(function () {
        t.scrollIntoView = ("month-").concat(n);
      });
    },
    onScroll: function (e) {
      for (var t = Math.max(0, e.detail.scrollTop), n = 0; n < this.months.length; n++) t >= (this.months[n].top || this.listHeight) && (this.monthIndex = n);
    },
    updateMonthTop: function () {
      var e = this, t = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : [];
      if ((t.map(function (t, n) {
        e.months[n].top = t;
      }), this.defaultDate)) {
        var n = s.default().format("YYYY-MM");
        (n = uni.$u.test.array(this.defaultDate) ? s.default(this.defaultDate[0]).format("YYYY-MM") : s.default(this.defaultDate).format("YYYY-MM"), this.scrollIntoDefaultMonth(n));
      } else {
        var a = s.default().format("YYYY-MM");
        this.scrollIntoDefaultMonth(a);
      }
    }
  }
};
export default c;

</script>
