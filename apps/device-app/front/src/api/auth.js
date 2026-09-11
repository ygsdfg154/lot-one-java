/**
 * 登录与账号（契约 1.x / 2.x / 4.x）。
 *
 * 本层只管"路径、方法、参数名"，不做业务判断、不碰 store：契约变了只改这里。
 */
import { request } from '../common/request.js';

/** 1.1 图形验证码。data: {captchaEnabled, uuid, img(base64 不含 data: 前缀)} */
export function captcha() {
  return request({ url: '/auth/captcha', method: 'GET', loading: true });
}

/** 1.2 发送短信验证码。uuid/code 是图形码凭据与答案（captchaEnabled=true 时必带）。 */
export function sendSmsCode({ phone, uuid, code }) {
  return request({
    url: '/auth/app/sms-code',
    method: 'POST',
    loading: true,
    data: { phone, uuid, code },
  });
}

/** 1.3 手机号+验证码登录（未注册自动建号；password 可选=同时设置账号密码）。 */
export function loginByPhoneCode({ phone, smsCode, password }) {
  return request({
    url: '/auth/login/phone-code',
    method: 'POST',
    loading: true,
    data: { phone, smsCode, password },
  });
}

/** 1.4 手机号+密码登录。 */
export function loginByPhonePassword({ phone, password }) {
  return request({
    url: '/auth/login/phone-password',
    method: 'POST',
    loading: true,
    data: { phone, password },
  });
}

/** 1.5 微信登录（credential = wx.login() 的 code）。 */
export function loginByWechat({ credential }) {
  return request({ url: '/auth/login/wechat', method: 'POST', loading: true, data: { credential } });
}

/** 1.5b Apple 登录（credential = identityToken）。 */
export function loginByApple({ credential }) {
  return request({ url: '/auth/login/apple', method: 'POST', loading: true, data: { credential } });
}

/** 1.7 设备号+密码登录。连续错 5 次锁 15 分钟（10005）。 */
export function loginByDevice({ deviceId, password }) {
  return request({
    url: '/auth/login/device',
    method: 'POST',
    loading: true,
    data: { deviceId, password },
  });
}

/** 1.6 绑定手机号（账号级；21003 白名单接口）。 */
export function bindPhone({ phone, smsCode }) {
  return request({
    url: '/auth/app/bind-phone',
    method: 'POST',
    loading: true,
    data: { phone, smsCode },
  });
}

/** 1.11 设备登录下绑定手机号（手机号未注册时 newAccountPassword 必填，否则 21009）。 */
export function bindAccountViaDevice({ phone, smsCode, newAccountPassword }) {
  return request({
    url: '/auth/device/bind-account',
    method: 'POST',
    loading: true,
    data: { phone, smsCode, newAccountPassword },
  });
}

/** 1.12 登出（公开接口，token 过期也可幂等调用）。 */
export function logout() {
  return request({ url: '/auth/app/logout', method: 'POST' });
}

/** 1.8 账号资料。 */
export function profile() {
  return request({ url: '/auth/app/profile', method: 'GET' });
}

/** 1.17 修改账号资料（部分更新：只传要改的字段）。 */
export function updateProfile(fields) {
  return request({ url: '/auth/app/profile', method: 'PATCH', loading: true, data: fields });
}

/** 4.1 修改登录密码（已设密码传 oldPassword；未设过传 smsCode）。 */
export function changePassword({ oldPassword, smsCode, newPassword }) {
  return request({
    url: '/auth/app/password',
    method: 'PUT',
    loading: true,
    data: { oldPassword, smsCode, newPassword },
  });
}

/** 4.2 短信重置密码（公开；对未注册手机号也返回成功文案，防枚举）。 */
export function resetPassword({ phone, smsCode, newPassword }) {
  return request({
    url: '/auth/app/password/reset',
    method: 'POST',
    loading: true,
    data: { phone, smsCode, newPassword },
  });
}

/** 4.3 安全信息（脱敏手机号 / 是否设过密码 / 第三方绑定态 / 注册时间）。 */
export function securityInfo() {
  return request({ url: '/auth/app/security', method: 'GET', loading: true });
}

/** 2.3 已绑定第三方账号列表。 */
export function oauthAccounts() {
  return request({ url: '/auth/app/oauth-accounts', method: 'GET', loading: true });
}

/** 2.1 / 2.4 绑定第三方（provider: wechat | apple）。 */
export function bindOAuth(provider, { credential }) {
  return request({
    url: '/auth/app/bind-' + provider,
    method: 'POST',
    loading: true,
    data: { credential },
  });
}

/** 2.2 / 2.4 解绑第三方（provider: wechat | apple）。未绑 21015 / 无手机号 21014。 */
export function unbindOAuth(provider) {
  return request({ url: '/auth/app/unbind-' + provider, method: 'POST', loading: true, data: {} });
}

/** 2.5 注册厂商推送标识。platform 传数字（1安卓 2iOS 3小程序），与 5.1 同一套编码。 */
export function registerPushToken({ pushToken, platform }) {
  return request({
    url: '/auth/app/push-token',
    method: 'PUT',
    data: { pushToken, platform },
  });
}

/** 2.5 注销推送标识（幂等）。 */
export function unregisterPushToken({ pushToken }) {
  return request({
    url: '/auth/app/push-token/unregister',
    method: 'POST',
    data: { pushToken },
  });
}

/** 注销账号（password / smsCode 二选一）。不可逆。 */
export function cancelAccount({ password, smsCode }) {
  return request({
    url: '/auth/app/cancel-account',
    method: 'POST',
    loading: true,
    data: { password, smsCode },
  });
}

/** 1.16 设备密码找回（公开；设备未关联手机号 21016）。 */
export function resetDevicePassword({ deviceId, phone, smsCode, newPassword }) {
  return request({
    url: '/auth/device/reset-password',
    method: 'POST',
    loading: true,
    data: { deviceId, phone, smsCode, newPassword },
  });
}

/** 3.1 我的页面菜单（账号身份）。 */
export function accountMenus() {
  return request({ url: '/auth/app/mine/menus', method: 'GET' });
}

/** 3.2 我的页面菜单（设备身份；路径设备须与登录身份一致，否则 21010）。 */
export function deviceMenus(deviceId) {
  return request({ url: `/devices/${encodeURIComponent(deviceId)}/mine/menus`, method: 'GET' });
}
