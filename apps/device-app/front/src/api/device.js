/**
 * 设备（契约 1.9/1.10/1.13~1.15/1.18/6.x/9.5）。
 *
 * 约定：deviceId 一律走路径参数（契约 0.5），唯一例外是 1.10 `/devices/current`
 * （冷启动尚未确定当前设备时用；已知 deviceId 时应直接用 6.1/6.2）。
 */
import { request } from '../common/request.js';

const p = (deviceId) => encodeURIComponent(deviceId);

/** 1.9 / 6.3 我的设备列表（分页；pageSize 上限 50）。 */
export function myDevices({ page = 1, pageSize = 10, loading = true } = {}) {
  return request({
    url: '/auth/app/devices',
    method: 'GET',
    loading,
    query: { page, pageSize },
  });
}

/** 1.18 我的设备统计（总数/在线/离线/待激活/已过期）。 */
export function myDeviceStatistics() {
  return request({ url: '/auth/app/devices/statistics', method: 'GET' });
}

/** 1.10 当前设备（设备身份=自身；账号身份=默认设备；无绑定 21007）。 */
export function currentDevice({ loading = false } = {}) {
  return request({ url: '/devices/current', method: 'GET', loading });
}

/** 6.1 设备档案详情（含 capabilities / isDefaultPassword / msisdn）。 */
export function detail(deviceId, { loading = false } = {}) {
  return request({ url: `/devices/${p(deviceId)}`, method: 'GET', loading });
}

/** 6.2 首页实时状态。 */
export function realtime(deviceId, { loading = false } = {}) {
  return request({ url: `/devices/${p(deviceId)}/realtime`, method: 'GET', loading });
}

/** 6.4 / 1.14 绑定设备（设备号 + 设备登录密码；密码错 21012、已被绑 21008）。 */
export function bind({ deviceId, password, deviceName }) {
  return request({
    url: '/auth/app/devices/bind',
    method: 'POST',
    loading: true,
    data: { deviceId, password, deviceName },
  });
}

/** 6.5 解绑设备（最后一台 21017、他人设备 21011）。 */
export function unbind({ deviceId }) {
  return request({
    url: '/auth/app/devices/unbind',
    method: 'POST',
    loading: true,
    data: { deviceId },
  });
}

/** 1.13 切换默认设备。 */
export function switchDefault({ deviceId }) {
  return request({
    url: '/auth/app/devices/default',
    method: 'POST',
    loading: true,
    data: { deviceId },
  });
}

/** 1.15 修改设备登录密码（弱密码 21005：至少 8 位且不能纯数字）。 */
export function changeDevicePassword({ deviceId, newPassword }) {
  return request({
    url: '/auth/app/devices/change-password',
    method: 'POST',
    loading: true,
    data: { deviceId, newPassword },
  });
}

/** 6.6 修改设备名称（≤25 字）。 */
export function rename({ deviceId, deviceName }) {
  return request({
    url: `/devices/${p(deviceId)}`,
    method: 'PATCH',
    loading: true,
    data: { deviceName },
  });
}

/** 预置设备图标库（公开）。 */
export function icons() {
  return request({ url: '/device-icons', method: 'GET' });
}

/** 更换设备图标（iconId 必须来自 icons()，否则 10001）。 */
export function setIcon({ deviceId, iconId }) {
  return request({
    url: `/devices/${p(deviceId)}/icon`,
    method: 'PUT',
    loading: true,
    data: { iconId },
  });
}

/** 设备可用指令树（按产品过滤；能力显隐优先用 6.1 的 capabilities）。 */
export function commands(deviceId) {
  return request({ url: `/devices/${p(deviceId)}/commands`, method: 'GET' });
}

/** 9.5 亲情号码（pendingSync=true：已保存但尚未下发到设备）。 */
export function familyPhones(deviceId) {
  return request({ url: `/devices/${p(deviceId)}/family-numbers`, method: 'GET', loading: true });
}

/** 9.5 保存亲情号码（整体覆盖，最多 6 个）。 */
export function saveFamilyPhones({ deviceId, items }) {
  return request({
    url: `/devices/${p(deviceId)}/family-numbers`,
    method: 'PUT',
    loading: true,
    data: { items },
  });
}

/** 7.1 SIM 卡信息（无购买记录时四个流量字段为 0/null，是正常态不是错误）。 */
export function sim(deviceId) {
  return request({ url: `/devices/${p(deviceId)}/sim`, method: 'GET', loading: true });
}

/** 11.3 设备 VIP 状态（categoryId 不传=名下全部生效中的服务）。 */
export function vip(deviceId, { categoryId, loading = false } = {}) {
  return request({
    url: `/devices/${p(deviceId)}/vip`,
    method: 'GET',
    loading,
    query: { categoryId },
  });
}
