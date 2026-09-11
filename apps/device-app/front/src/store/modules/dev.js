/*
 * 模块: store/modules/dev.js
 * 反编译自 webpack 模块 da67（svc 编译空间）
 */
"use strict";
var a = {
  namespaced: true,
  state: {
    isDevMode: false,
    pushMessages: []
  },
  mutations: {
    setDevelopMode: function (e, t) {
      e.isDevMode = t;
    },
    addToMessages: function (e, t) {
      var n = e.pushMessages;
      (t.time = new Date().toISOString(), n.unshift(t));
    }
  },
  actions: {}
}, r = a;
export default r;

