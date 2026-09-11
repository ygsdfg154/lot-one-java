/*
 * 模块: store/modules/wechat.js
 * 反编译自 webpack 模块 17ea（svc 编译空间）
 * async/await 还原: 2 个已转换
 * 变量 i 在内层被重新声明，保留短名以维持遮蔽语义
 * 内层仍在调用 a()，已就地重建 interopRequireDefault
 */
import mod127e from '@/.unpacked/svc/127e.js';
import i from '@/.unpacked/svc/ee10.js';
function a(m) {
  return m && m.__esModule ? m : {
    default: m
  };
}
"use strict";
var o = (a(require("vue")), require("../../common/request.js")), s = {
  namespaced: true,
  state: {
    wechatUserInfo: null
  },
  mutations: {
    setWechatUserInfo: function (e, t) {
      e.wechatUserInfo = t;
    }
  },
  actions: {
    GetWechatUser: function (e, t) {
      return (async function () {
        var a, i;
        e.state;
        a = e.commit;
        i = await o.request({
          url: "/wx/get-wx-user-info",
          method: "GET",
          loading: true,
          data: {
            code: t.code,
            type: t.type
          }
        });
        i.succeeded && a("setWechatUserInfo", i.data);
        return i;
      })();
    },
    GetWxSign: function (e, t) {
      return (async function () {
        var a;
        e.commit;
        e.state;
        a = await o.request({
          url: "/wx/js-sign",
          method: "POST",
          loading: true,
          data: {
            url: t.url
          }
        });
        return a;
      })();
    }
  }
}, u = s;
export default u;

