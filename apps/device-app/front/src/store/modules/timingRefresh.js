/*
 * 模块: store/modules/timingRefresh.js
 * 反编译自 webpack 模块 27cd（svc 编译空间）
 */
import 'vue'
import '../../common/request.js'

"use strict";
var r = {
  namespaced: true,
  state: {
    msgRefresh: true,
    msgTimer: null,
    remoteListRefresh: true,
    remoteListTimer: null
  },
  mutations: {
    setMsgRefresh: function (e, t) {
      e.msgRefresh = t;
    },
    setMsgTimer: function (e, t) {
      e.msgTimer = t;
    },
    setRemoteListRefresh: function (e, t) {
      e.remoteListRefresh = t;
    },
    setRemoteListTimer: function (e, t) {
      e.remoteListTimer = t;
    }
  },
  actions: {}
};
export default r;

