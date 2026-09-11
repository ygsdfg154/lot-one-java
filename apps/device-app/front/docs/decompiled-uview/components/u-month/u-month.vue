<template>
<view ref="u-calendar-month-wrapper" class="u-calendar-month-wrapper">
  <view
    v-for="(t, a, r) in { forItems: months }"
    :key="{ forIndex: r, key: a }"
    :ref="'u-calendar-month-' + a"
    :class="['u-calendar-month-' + a]"
    :id="'month-' + a"
  >
    <text v-if="0 !== a" class="u-calendar-month__title">
      {{ t.year }}{{ l('common.u-calendar-content-year') }}{{ t.month }}{{ l('common.u-calendar-content-month') }}
    </text>
    <view class="u-calendar-month__days">
      <view v-if="showMark" class="u-calendar-month__days__month-mark-wrapper">
        <text class="u-calendar-month__days__month-mark-wrapper__text">
          {{ t.month }}
        </text>
      </view>
      <view
        v-for="(t, r, o, s) in { forItems: t.date }"
        :key="{ forIndex: o, key: r }"
        class="u-calendar-month__days__day"
        :class="[t.selected && 'u-calendar-month__days__day__select--selected']"
        :style="[dayStyle(a, r, t)]"
        @click="clickHandler(a, r, t)"
      >
        <view class="u-calendar-month__days__day__select" :style="[daySelectStyle(a, r, t)]">
          <text
            class="u-calendar-month__days__day__select__info"
            :class="[t.disabled && 'u-calendar-month__days__day__select__info--disabled']"
            :style="[textStyle(t)]"
          >
            {{ t.day }}
          </text>
          <text
            v-if="getBottomInfo(a, r, t)"
            class="u-calendar-month__days__day__select__buttom-info"
            :class="[t.disabled && 'u-calendar-month__days__day__select__buttom-info--disabled']"
            :style="[textStyle(t)]"
          >
            {{ getBottomInfo(a, r, t) }}
          </text>
          <text v-if="t.dot" class="u-calendar-month__days__day__select__dot"></text>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script>
/*
 * 组件: uMonth
 * 反编译自 webpack 模块 b623（svc 编译空间）
 * 变量 r 在内层被重新声明，保留短名以维持遮蔽语义
 */
import r from '@/.unpacked/svc/1e2c.js'

"use strict";
var i = getApp().globalData, o = {
  name: "u-calendar-month",
  mixins: [uni.$u.mpMixin, uni.$u.mixin],
  props: {
    showMark: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "#3c9cff"
    },
    months: {
      type: Array,
      default: function () {
        return [];
      }
    },
    mode: {
      type: String,
      default: "single"
    },
    rowHeight: {
      type: [String, Number],
      default: 58
    },
    maxCount: {
      type: [String, Number],
      default: 1 / 0
    },
    startText: {
      type: String,
      default: "\u5f00\u59cb"
    },
    endText: {
      type: String,
      default: "\u7ed3\u675f"
    },
    defaultDate: {
      type: [Array, String, Date],
      default: null
    },
    minDate: {
      type: [String, Number],
      default: 0
    },
    maxDate: {
      type: [String, Number],
      default: 0
    },
    maxMonth: {
      type: [String, Number],
      default: 2
    },
    readonly: {
      type: Boolean,
      default: uni.$u.props.calendar.readonly
    },
    maxRange: {
      type: [Number, String],
      default: 1 / 0
    },
    rangePrompt: {
      type: String,
      default: ""
    },
    showRangePrompt: {
      type: Boolean,
      default: true
    },
    allowSameDay: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      width: 0,
      item: {},
      selected: []
    };
  },
  watch: {
    selectedChange: {
      immediate: true,
      handler: function (e) {
        this.setDefaultDate();
      }
    }
  },
  computed: {
    selectedChange: function () {
      return [this.minDate, this.maxDate, this.defaultDate];
    },
    dayStyle: function (e, t, n) {
      var a = this;
      return function (e, t, n) {
        var r = {}, i = n.week, o = Number(parseFloat(a.width / 7).toFixed(3).slice(0, -1));
        return (r.height = uni.$u.addUnit(a.rowHeight), 0 === t && (i = (0 === i ? 7 : i) - 1, r.marginLeft = uni.$u.addUnit(i * o)), "range" === a.mode && (r.paddingLeft = 0, r.paddingRight = 0, r.paddingBottom = 0, r.paddingTop = 0), r);
      };
    },
    daySelectStyle: function () {
      var e = this;
      return function (t, n, a) {
        var i = r(a.date).format("YYYY-MM-DD"), o = {};
        if ((e.selected.some(function (t) {
          return e.dateSame(t, i);
        }) && (o.backgroundColor = e.color), "single" === e.mode)) i === e.selected[0] && (o.borderTopLeftRadius = "3px", o.borderBottomLeftRadius = "3px", o.borderTopRightRadius = "3px", o.borderBottomRightRadius = "3px"); else if ("range" === e.mode) if (e.selected.length >= 2) {
          var s = e.selected.length - 1;
          (e.dateSame(i, e.selected[0]) && (o.borderTopLeftRadius = "3px", o.borderBottomLeftRadius = "3px"), e.dateSame(i, e.selected[s]) && (o.borderTopRightRadius = "3px", o.borderBottomRightRadius = "3px"), r(i).isAfter(r(e.selected[0])) && r(i).isBefore(r(e.selected[s])) && (o.backgroundColor = uni.$u.colorGradient(e.color, "#ffffff", 100)[90], o.opacity = .7));
        } else 1 === e.selected.length && (o.borderTopLeftRadius = "3px", o.borderBottomLeftRadius = "3px"); else e.selected.some(function (t) {
          return e.dateSame(t, i);
        }) && (o.borderTopLeftRadius = "3px", o.borderBottomLeftRadius = "3px", o.borderTopRightRadius = "3px", o.borderBottomRightRadius = "3px");
        return o;
      };
    },
    textStyle: function () {
      var e = this;
      return function (t) {
        var n = r(t.date).format("YYYY-MM-DD"), a = {};
        if ((e.selected.some(function (t) {
          return e.dateSame(t, n);
        }) && (a.color = "#ffffff"), "range" === e.mode)) {
          var i = e.selected.length - 1;
          r(n).isAfter(r(e.selected[0])) && r(n).isBefore(r(e.selected[i])) && (a.color = e.color);
        }
        return a;
      };
    },
    getBottomInfo: function () {
      var e = this;
      return function (t, n, a) {
        var i = r(a.date).format("YYYY-MM-DD"), o = a.bottomInfo;
        if ("range" === e.mode && e.selected.length > 0) {
          if (1 === e.selected.length) return e.dateSame(i, e.selected[0]) ? e.startText : o;
          var s = e.selected.length - 1;
          return e.dateSame(i, e.selected[0]) && e.dateSame(i, e.selected[1]) && 1 === s ? ("").concat(e.startText, "/").concat(e.endText) : e.dateSame(i, e.selected[0]) ? e.startText : e.dateSame(i, e.selected[s]) ? e.endText : o;
        }
        return o;
      };
    }
  },
  mounted: function () {
    this.init();
  },
  methods: {
    l: function (e) {
      return i.$t(e);
    },
    init: function () {
      var e = this;
      (this.$emit("monthSelected", this.selected), this.$nextTick(function () {
        uni.$u.sleep(10).then(function () {
          (e.getWrapperWidth(), e.getMonthRect());
        });
      }));
    },
    dateSame: function (e, t) {
      return r(e).isSame(r(t));
    },
    getWrapperWidth: function () {
      var e = this;
      this.$uGetRect(".u-calendar-month-wrapper").then(function (t) {
        e.width = t.width;
      });
    },
    getMonthRect: function () {
      var e = this, t = this.months.map(function (t, n) {
        return e.getMonthRectByPromise(("u-calendar-month-").concat(n));
      });
      Promise.all(t).then(function (t) {
        for (var n = 1, a = [], r = 0; r < e.months.length; r++) (a[r] = n, n += t[r].height);
        e.$emit("updateMonthTop", a);
      });
    },
    getMonthRectByPromise: function (e) {
      var t = this;
      return new Promise(function (n) {
        t.$uGetRect((".").concat(e)).then(function (e) {
          n(e);
        });
      });
    },
    clickHandler: function (e, t, n) {
      var a = this;
      if (!this.readonly) {
        this.item = n;
        var i = r(n.date).format("YYYY-MM-DD");
        if (!n.disabled) {
          var o = uni.$u.deepClone(this.selected);
          if ("single" === this.mode) o = [i]; else if ("multiple" === this.mode) if (o.some(function (e) {
            return a.dateSame(e, i);
          })) {
            var s = o.findIndex(function (e) {
              return e === i;
            });
            o.splice(s, 1);
          } else o.length < this.maxCount && o.push(i); else if (0 === o.length || o.length >= 2) o = [i]; else if (1 === o.length) {
            var u = o[0];
            if (r(i).isBefore(u)) o = [i]; else if (r(i).isAfter(u)) {
              if (r(r(i).subtract(this.maxRange, "day")).isAfter(r(o[0])) && this.showRangePrompt) return void (this.rangePrompt ? uni.$u.toast(this.rangePrompt) : uni.$u.toast(("\u9009\u62e9\u5929\u6570\u4e0d\u80fd\u8d85\u8fc7 ").concat(this.maxRange, " \u5929")));
              o.push(i);
              var d = o[0], c = o[1], l = [], f = 0;
              do {
                (l.push(r(d).add(f, "day").format("YYYY-MM-DD")), f++);
              } while (r(d).add(f, "day").isBefore(r(c)));
              (l.push(c), o = l);
            } else {
              if (o[0] === i && !this.allowSameDay) return;
              o.push(i);
            }
          }
          this.setSelected(o);
        }
      }
    },
    setDefaultDate: function () {
      if (!this.defaultDate) {
        var e = [r().format("YYYY-MM-DD")];
        return this.setSelected(e, false);
      }
      var t = [], n = this.minDate || r().format("YYYY-MM-DD"), a = this.maxDate || r(n).add(this.maxMonth - 1, "month").format("YYYY-MM-DD");
      if ("single" === this.mode) t = uni.$u.test.array(this.defaultDate) ? [this.defaultDate[0]] : [r(this.defaultDate).format("YYYY-MM-DD")]; else {
        if (!uni.$u.test.array(this.defaultDate)) return;
        t = this.defaultDate;
      }
      (t = t.filter(function (e) {
        return r(e).isAfter(r(n).subtract(1, "day")) && r(e).isBefore(r(a).add(1, "day"));
      }), this.setSelected(t, false));
    },
    setSelected: function (e) {
      var t = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1];
      (this.selected = e, t && this.$emit("monthSelected", this.selected));
    }
  }
};
export default o;

</script>
