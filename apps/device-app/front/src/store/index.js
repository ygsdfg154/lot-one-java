/*
 * 模块: store/index.js
 * 反编译自 webpack 模块 6921（svc 编译空间）
 */
import mod951c from 'vue'
import mod8f59 from 'vuex'
import d1d6 from 'vuex-persistedstate'
import e0ea from '@/.unpacked/svc/e0ea.js'
import fb73 from './modules/app.js'
import mod04f1 from './modules/account.js'
import mod4c62 from './modules/alarm.js'
import mod9d79 from './modules/alarmLog.js'
import beec from './modules/device.js'
import da67 from './modules/dev.js'
import mod464b from './modules/packageInfo.js'
import mod7318 from './modules/order.js'
import mod0083 from './modules/report.js'
import e73b from './modules/sys.js'
import mod9d7d from './modules/terminal.js'
import mod4fb9 from './modules/user.js'
import mod17ea from './modules/wechat.js'
import d65a from './modules/remoteSet.js'
import mod7191 from './modules/audio.js'
import b366 from './modules/fence.js'
import mod27cd from './modules/timingRefresh.js'

"use strict";
mod951c.use(mod8f59);
var k = new mod8f59.Store({
  plugins: [d1d6({
    paths: ["app", "account", "alarmLog", "user", "device", "dev", "packageInfo", "order", "wechat", "alarm", "report", "timingRefresh"],
    storage: {
      getItem: function (e) {
        return uni.getStorageSync(e);
      },
      setItem: function (e, t) {
        return uni.setStorageSync(e, t);
      },
      removeItem: function (e) {
        return uni.removeStorageSync(e);
      }
    }
  })],
  modules: {
    app: fb73,
    account: mod04f1,
    alarm: mod4c62,
    alarmLog: mod9d79,
    device: beec,
    dev: da67,
    order: mod7318,
    packageInfo: mod464b,
    report: mod0083,
    sys: e73b,
    terminal: mod9d7d,
    user: mod4fb9,
    wechat: mod17ea,
    remoteSet: d65a,
    audio: mod7191,
    fence: b366,
    timingRefresh: mod27cd
  },
  state: {},
  mutations: {},
  actions: {},
  getters: e0ea
}), S = k;
export default S;

