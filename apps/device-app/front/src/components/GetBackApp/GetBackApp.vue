<template>
<view>
  <button v-if="$data.appMpShow" class="phone-btn" @error="">
    <text></text>
  </button>
</view>
</template>

<script>
/*
 * 组件: GetBackApp
 * 反编译自 webpack 模块 0b90（svc 编译空间）
 * 辅助函数 i 仍被引用，保留原定义
 */
import mod7ca3 from '@/.unpacked/svc/7ca3.js'
import * as mod8f59 from 'vuex'

function i(t, e) {
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
getApp().globalData;
var c = {
  data: function () {
    return {};
  },
  computed: (function (t) {
    for (var e = 1; e < arguments.length; e++) {
      var a = null != arguments[e] ? arguments[e] : {};
      e % 2 ? i(Object(a), true).forEach(function (e) {
        mod7ca3(t, e, a[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(a)) : i(Object(a)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(a, e));
      });
    }
    return t;
  })({}, mod8f59.mapGetters(["appMpShow"])),
  methods: {}
};
export default c;

</script>
