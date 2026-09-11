/*
 * 模块: store/modules/account.js
 * 反编译自 webpack 模块 04f1（svc 编译空间）
 * async/await 还原: 15 个已转换, 1 个含条件跳转/try-catch 保持状态机原样
 * 已剥离 webpack 的 global 注入包装（保留了 1 个注入参数的绑定）
 * 变量 i 在内层被重新声明，保留短名以维持遮蔽语义
 * 变量 o 在内层被重新声明，保留短名以维持遮蔽语义
 * 内层仍在调用 a()，已就地重建 interopRequireDefault
 */
import mod127e from '@/.unpacked/svc/127e.js';
import i from '@/.unpacked/svc/7ca3.js';
import o from '@/.unpacked/svc/ee10.js';
import e113 from '../../common/config.js';
import mod6921 from '../index.js';
import * as mod5691 from '../../common/request.js';
function a(m) {
  return m && m.__esModule ? m : {
    default: m
  };
}
"use strict";
var e = require("@/.unpacked/svc/f3b9.js")["default"];
var s = (a(require("vue")), a(require("@/.unpacked/svc/ec78.js")));
var m = {
  namespaced: true,
  state: {
    access_token: null,
    isAuthenticated: false,
    lastUsername: null,
    lastPassword: null,
    enterpriseInfo: null,
    enterpriseId: null,
    refreshTerminalPage: false,
    remPassword: false
  },
  mutations: {
    setRemPassword: function (e, t) {
      e.remPassword = t;
    },
    setLogedIn: function (e, t) {
      if (!t) return;
      (e.access_token = t.token || t.access_token, e.token = t.token || t.access_token, e.identityType = t.identityType || 'account', e.isAuthenticated = true);
    },
    setLogedOut: function (e, t) {
      (e.access_token = null, e.token = null, e.isAuthenticated = false);
    },
    setLastUsername: function (e, t) {
      (e.lastUsername = t.username, e.lastPassword = t.password);
    },
    setAccessToken: function (e, t) {
      e.access_token = t;
    },
    setEnterprise: function (e, t) {
      e.enterpriseInfo = t;
    },
    setEnterpriseId: function (e, t) {
      e.enterpriseId = t;
    },
    setRefreshTerminalPage: function (e, t) {
      e.refreshTerminalPage = t;
    }
  },
  actions: {
    SignIn: function (e, t) {
      return o(mod127e.mark(function n() {
        var a, i, o, s;
        return mod127e.wrap(function (n) {
          while (1) switch (n.prev = n.next) {
            case 0:
              return (a = e.state, i = e.commit, o = e.dispatch, n.next = 3, mod5691.request({
                url: "/auth/login/phone-password",
                method: "POST",
                loading: true,
                data: {
                  phone: t.username,
                  password: t.password
                }
              }));
            case 3:
              if ((s = n.sent, !s.succeeded)) {
                n.next = 12;
                break;
              }
              (i("setLogedIn", s.data), i("setLastUsername", t));
              // 账号身份先落 userType=2（页面据此显示设备列表/添加设备），
              // 再异步拉 1.8 profile 补昵称等资料——不能等 profile 回来才有身份，
              // 否则首屏那几个入口会先隐藏再出现
              i("user/setUserInfo", { user: { ...(s.data || {}), identityType: "account" } }, { root: true });
              if (!(s.data && s.data.user)) {
                o("user/GetSystemUserInfo", null, { root: true });
              }
            case 12:
              return n.abrupt("return", s);
            case 13:
            case "end":
              return n.stop();
          }
        }, n);
      }))();
    },
    /**
     * 1.7 设备号 + 设备密码登录（identityType=device）。
     *
     * 与账号登录是两种身份：device token 只能看这一台设备，账号级能力（我的设备列表、
     * 订单、绑定其它设备）不可用——契约 0.4 对 device 身份有单独的可见范围约定。
     * 设备出厂默认密码是 123456，登录后会提示改密。
     */
    SignInDevice: async function ({ commit, dispatch }, payload) {
      const res = await mod5691.request({
        url: "/auth/login/device",
        method: "POST",
        loading: true,
        data: {
          deviceId: (payload.deviceId || payload.username || "").trim(),
          password: payload.password
        }
      });
      if (res.succeeded) {
        commit("setLogedIn", res.data);
        commit("setLastUsername", payload);
        // 设备身份下 1.8 profile 取不到账号资料（没有账号），不去调它——
        // 调了只会拿到一个业务错误弹窗。但 userType 必须落到 3：页面靠它区分
        // "设备登录只有自己这一台"（无设备列表/切换/添加，"我的"显示设备号），
        // 而 setUserInfo 是随 profile 走的，这条路径不会触发它。
        // 身份码由 identityType 映射（user.js/identityUserType），不在这里手写数字
        commit("user/setUserInfo", {
          user: { ...(res.data || {}), identityType: "device" },
        }, { root: true });
        dispatch("terminal/GetTerminalInfos", {}, { root: true });
      }
      return res;
    },
    SignInWx: function (e, t) {
      return (async function () {
        var a, i;
        e.state;
        a = e.commit;
        e.dispatch;
        i = await mod5691.request({
          url: "/auth/login/wechat",
          method: "POST",
          loading: true,
          data: {
            credential: t.code
          }
        });
        if (i.succeeded && i.data) {
          a("setLogedIn", i.data);
          if (i.data.user) {
            a("setLastUsername", { username: i.data.user.username });
            a("user/setUserInfo", i.data, { root: true });
          } else {
            o("user/GetSystemUserInfo", null, { root: true });
          }
        }
        return i;
      })();
    },
    BindUserWx: function (t, n) {
      return (async function () {
        var i, o;
        t.state;
        i = t.commit;
        t.dispatch;
        o = await mod5691.request({
          url: "/auth/app/bind-phone",
          method: "POST",
          loading: true,
          data: {
            phone: n.username,
            smsCode: n.verifyCode
          }
        });
        e("log", "res.data", o.data, " at store/modules/account.js:160");
        if (o.succeeded && o.data) {
          i("setLogedIn", o.data);
          if (o.data.user) {
            i("setLastUsername", { username: o.data.user.username });
            i("user/setUserInfo", o.data, { root: true });
          } else {
            t.dispatch("user/GetSystemUserInfo", null, { root: true });
          }
        }
        return o;
      })();
    },
    SignInApple: function (e, t) {
      return (async function () {
        var a, i;
        e.state;
        a = e.commit;
        e.dispatch;
        i = await mod5691.request({
          url: "/auth/login/apple",
          method: "POST",
          loading: true,
          data: {
            credential: t.identityToken
          }
        });
        if (i.succeeded && i.data) {
          a("setLogedIn", i.data);
          if (i.data.user) {
            a("setLastUsername", { username: i.data.user.username });
            a("user/setUserInfo", i.data, { root: true });
          } else {
            e.dispatch("user/GetSystemUserInfo", null, { root: true });
          }
        }
        return i;
      })();
    },
    // Apple 首登后绑手机号：与 BindUserWx 同一个接口（契约 1.6）。
    // 原来打的 /auth/bind-user/apple 带一堆 vendor 字段（applicationId/pushClientId/
    // openId/authorizationCode…），契约里绑手机号只认 {phone, smsCode}。
    BindUserApple: async function ({ commit, dispatch }, payload) {
      const res = await mod5691.request({
        url: "/auth/app/bind-phone",
        method: "POST",
        loading: true,
        data: { phone: payload.username || payload.phoneNumber, smsCode: payload.verifyCode }
      });
      if (res.succeeded) {
        dispatch("user/GetSystemUserInfo", null, { root: true });
      }
      return res;
    },
    // 2.2 / 2.4 解绑第三方。mode: wechat | apple —— 契约是两条固定路径，
    // 原来的 /account/unbind-{mode} 会把任意 mode 拼进 URL。
    UnbindAccount: function (_ctx, payload) {
      const provider = payload.mode === "apple" ? "apple" : "wechat";
      return mod5691.request({
        url: "/auth/app/unbind-" + provider,
        method: "POST",
        loading: true,
        data: {}
      });
    },
    GetUserAccountOauth: function (e, t) {
      return (async function () {
        var n;
        e.state;
        e.commit;
        e.dispatch;
        n = await mod5691.request({
          url: "/auth/app/oauth-accounts",
          method: "GET",
          loading: true
        });
        return n;
      })();
    },
    // 2.1 绑定微信。credential = wx.login() 的 code；重复绑定本账号是幂等成功，
    // 绑到别人名下才报 21013。调用方两种叫法都接（页面里既有 code 也有 credential）。
    BindWechatAccount: function (_ctx, payload) {
      return mod5691.request({
        url: "/auth/app/bind-wechat",
        method: "POST",
        loading: true,
        data: { credential: (payload && (payload.credential || payload.code)) || "" }
      });
    },
    // 2.4 绑定 Apple（与 2.1 微信对称）。credential = Apple identityToken。
    BindAppleAccount: function (_ctx, payload) {
      return mod5691.request({
        url: "/auth/app/bind-apple",
        method: "POST",
        loading: true,
        data: { credential: payload.identityToken || payload.credential }
      });
    },
    SignOut: function (e) {
      var t = e.commit;
      return (t("setLogedOut"), t("user/clearUserInfo", null, {
        root: true
      }), t("device/clearDevices", null, {
        root: true
      }), t("device/clearSelectedDevice", null, {
        root: true
      }), t("terminal/clearUseDeviceInfo", null, {
        root: true
      }), t("terminal/setDeviceMarker", null, {
        root: true
      }), t("device/clearlastDevice", null, {
        root: true
      }), t("device/setFuncDeviceId", "", {
        root: true
      }), t("device/setBindDeviceState", true, {
        root: true
      }), t("device/setSimState", false, {
        root: true
      }), t("device/setActivationState", 0, {
        root: true
      }), t("device/setInfoBoxShow", false, {
        root: true
      }), t("alarmLog/initState", null, {
        root: true
      }), t("setEnterprise", null), t("setEnterpriseId", null), true);
    },
    SendSmsCode: function (e, t) {
      return (async function () {
        var a;
        e.commit;
        e.state;
        a = await mod5691.request({
          method: "POST",
          url: "/auth/app/sms-code",
          loading: true,
          data: {
            phone: t.phoneNumber,
            uuid: t.captchaId,
            code: t.captchaCode
          }
        });
        return a;
      })();
    },
    GetSendImgCode: function (e, t) {
      return (async function () {
        var n;
        e.state;
        e.commit;
        n = await mod5691.request({
          url: "/auth/captcha",
          method: "GET",
          loading: true
        });
        return n;
      })();
    },
    SignUp: function (e, t) {
      return (async function () {
        var a, i, o;
        a = e.commit;
        i = e.dispatch;
        o = await mod5691.request({
          url: "/auth/login/phone-code",
          method: "POST",
          loading: true,
          data: {
            phone: t.phoneNumber,
            smsCode: t.code,
            password: t.password
          }
        });
        if (o.succeeded && o.data) {
          a("setLogedIn", o.data);
          a("setLastUsername", { username: t.phoneNumber, password: t.password });
          i("user/GetSystemUserInfo", null, { root: true });
        }
        return o;
      })();
    },
    ResetPassword: function (e, t) {
      return (async function () {
        var a;
        e.commit;
        e.state;
        a = await mod5691.request({
          url: "/auth/app/password/reset",
          method: "POST",
          loading: true,
          data: {
            phone: t.phoneNumber,
            smsCode: t.code,
            newPassword: t.password
          }
        });
        return a;
      })();
    },
    ChangeAuthPassword: function (e, t) {
      return (async function () {
        e.commit;
        return mod5691.request({
          url: "/auth/app/password",
          method: "PUT",
          loading: true,
          data: {
            oldPassword: t.oldPassword,
            newPassword: t.password
          }
        });
      })();
    },
    BindUserPhone: function (e, t) {
      return (async function () {
        var a;
        e.commit;
        e.state;
        a = await mod5691.request({
          url: "/auth/app/bind-phone",
          method: "POST",
          loading: true,
          data: {
            phone: t.phoneNumber,
            smsCode: t.captcha
          }
        });
        return a;
      })();
    },
    // 注销账号（契约：已设密码校验 password，错 21029；未设过密码校验 smsCode，错 21004）。
    // 原来传 {phoneNumber, code} 打 /account/cancellation，后端没有这个接口。
    // 效果不可逆：解绑名下全部设备、清空手机号/昵称/头像、吊销全部 token。
    Cancellation: async function ({ dispatch }, payload) {
      const res = await mod5691.request({
        url: "/auth/app/cancel-account",
        method: "POST",
        loading: true,
        data: { password: payload.password, smsCode: payload.smsCode || payload.code }
      });
      if (res.succeeded) {
        dispatch("SignOut");
      }
      return res;
    },

    // 4.3 安全信息（账号与安全页：脱敏手机号 / 是否设过密码 / 第三方绑定态 / 注册时间）。
    GetSecurityInfo: function () {
      return mod5691.request({ url: "/auth/app/security", method: "GET", loading: true });
    }
  }
}, p = m;
export default p;
