/*
 * 模块: store/modules/user.js
 * 反编译自 webpack 模块 4fb9（svc 编译空间）
 * async/await 还原: 2 个已转换
 * 内层仍在调用 a()，已就地重建 interopRequireDefault
 */
import mod127e from '@/.unpacked/svc/127e.js';
import ee10 from '@/.unpacked/svc/ee10.js';
function a(m) {
  return m && m.__esModule ? m : {
    default: m
  };
}
"use strict";

/**
 * 契约 0.4 的 `identityType` → 原厂 userType 数字码的机械映射。
 *
 * 只有这一处允许写这个映射；其余地方判断身份请用 getter `isDeviceLogin` 或直接读
 * `account.identityType`。原厂的 1（企业/B 端账号）在本 App 不出现——组织架构与
 * 子账号属于 admin-console 那一侧，C 端登录只会是 account 或 device。
 */
export function identityUserType(identityType) {
  return identityType === "device" ? 3 : 2;
}

var o = (a(require("vue")), require("../../common/request.js")), s = {
  namespaced: true,
  state: {
    userId: 0,
    nickname: "",
    openId: null,
    user: 0,
    username: "",
    wxUser: 0,
    wxUserName: "",
    // userType 是**原厂遗留**的数字身份码，契约里没有这个字段。身份的权威来源是
    // 契约 0.4 的 `identityType`（登录响应返回 `account` / `device`）：
    //   account —— 账号级身份，可访问账号接口及名下所有设备；
    //   device  —— 设备级身份，只能访问该设备相关接口，调账号接口（1.8 profile、
    //              1.9 我的设备列表）返回 21010。
    // 即"设备登录没有设备列表 / 不能切换 / 不能添加设备"是契约 0.4 写明的约束。
    //
    // 保留 userType 只为不改反编译产物里那二十来处 `3 != userType` 判断，它是
    // identityType 的机械映射（identityUserType）。新逻辑判断身份请用 getter
    // isDeviceLogin，不要再引入新的 userType 数字比较。
    userType: 2,
    terminalNo: null
  },
  mutations: {
    setUserInfo: function (e, t) {
      if (!t || !t.user) return;
      (e.userId = t.user.userId || t.user.id || 0,
       e.enterprise = t.user.enterprise || null,
       e.nickname = t.user.nickName || t.user.nickname || "",
       e.openId = t.user.openId || null,
       e.user = t.user,
       e.username = t.user.phone || t.user.username || "",
       e.wxUser = t.user.wxUser || 0,
       e.wxUserName = t.user.wxUserName || "",
       // 后端给了就用后端的，否则按契约 0.4 的 identityType 机械映射
       e.userType = t.user.userType || identityUserType(t.user.identityType),
       e.terminalNo = t.user.terminalNo || null);
    },
    setUserInfoItem: function (e, t) {
      e.nickname = t;
    },
    clearUserInfo: function (e, t) {
      (e.userId = 0, e.enterprise = null, e.nickname = "", e.openId = null, e.user = 0, e.usrName = "", e.wxUser = 0, e.wxUserName = "", e.userType = 2, e.terminalNo = null);
    }
  },
  getters: {
    /**
     * 是否设备身份登录（契约 0.4 的 `device`：只能访问该设备相关接口）。
     * 新逻辑判断身份用这个，别写 `3 == userType` —— 那个数字是原厂遗留，
     * 语义不在契约里。
     */
    isDeviceLogin: function (st) {
      return st.userType === 3;
    }
  },
  actions: {
    GetSystemUserInfo: function (e, t) {
      return (async function () {
        var n, a;
        n = e.commit;
        e.state;
        (a = await o.request({
          url: "/auth/app/profile",
          method: "GET",
          loading: true
        }), a.succeeded && (// 契约 1.8 的字段是 nickName（驼峰 N），写成 nickname 取不到值
          n("setUserInfoItem", a.data.nickName || ""), n("setUserInfo", {
          user: a.data
        })));
      })();
    },
    // 改 App 账号资料：契约 1.17 是 PATCH /auth/app/profile（部分更新）。
    // 原来打的 /system/user/nickname 是**后台 to-B 账号**的接口，改了也不影响 App 账号。
    SetSystemUserInfo: async function ({ commit }, payload) {
      const res = await o.request({
        url: "/auth/app/profile",
        method: "PATCH",
        loading: true,
        data: {
          nickName: payload.nickName,
          avatar: payload.avatar,
          sex: payload.sex
        }
      });
      if (res.succeeded && payload.nickName !== undefined) {
        commit("setUserInfoItem", payload.nickName);
      }
      return res;
    }
  }
}, u = s;
export default u;

