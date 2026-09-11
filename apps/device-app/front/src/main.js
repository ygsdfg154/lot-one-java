/*
 * 应用入口 main.js
 * 反编译自 webpack 模块 2cc4（svc 编译空间）
 * 辅助函数 l 仍被引用，保留原定义
 */
import mod7ca3 from '@/.unpacked/svc/7ca3.js'
import '@/.unpacked/svc/56db.js'
import mod951c from 'vue'
import d169 from './App.vue'
import mod6921 from './store/index.js'
import mod4d79 from 'vue-i18n'
import mod17c2 from './locale/messages.js'
import mod70c9 from '@/.unpacked/svc/70c9.js'
import { configureRequest } from './common/request.js'

// 把登录态交给 HTTP 层：请求层不 import store（会形成 store → api → request → store
// 的循环依赖），改由入口注入。见 common/request.js 的 configureRequest。
configureRequest({
  token: () => mod6921.state.account.access_token,
  onTokenRefreshed: (token) => mod6921.commit('account/setAccessToken', token),
  onUnauthorized: () => {
    mod6921.dispatch('account/SignOut');
    uni.reLaunch({ url: '/pages/home/home' });
  },
  onPhoneBindRequired: () => {
    // 第三方登录建号后未绑手机号：除绑定接口外一律 21003，必须把用户带到绑定页，
    // 否则他会在每个页面看到同一条提示却不知道该做什么
    uni.navigateTo({ url: '/pagesCore/login/bind-tel-more' });
  },
});

function l(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    (t && (a = a.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, a));
  }
  return n;
}

import '@/common/h5-plus-shim.js';   // [还原补丁] 仅 H5 预览用，app-plus 下为空

if (typeof window !== 'undefined') {
  window._AMapSecurityConfig = {
    securityJsCode: '105ff72d07e60b1e42e7bb0e340a6b7e',
  };
}

"use strict";
mod951c.use(mod4d79);
var f = new mod4d79({
  locale: uni.getLocale(),
  messages: mod17c2
});
mod951c.config.productionTip = false;
d169.mpType = "app";
mod951c.use(mod70c9);
var m = new mod951c((function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? l(Object(n), true).forEach(function (t) {
      mod7ca3(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : l(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
})({
  i18n: f,
  store: mod6921
}, d169));
m.$mount();
var p = m;
export default p;

