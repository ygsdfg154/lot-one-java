/**
 * 指令下发与设备控制（契约 8.1 / 8.4 / 9.2 / 9.3 / 9.4 / 10.x）。
 *
 * 几乎所有设备控制都收口到 10.1 `POST /devices/{id}/commands`：前端从 9.3.1/9.4.1 拿到
 * `cmdCode` 与参数定义，组装好 `params` 提交即可，不需要为每个开关单开接口。
 */
import { request } from '../common/request.js';

const p = (deviceId) => encodeURIComponent(deviceId);

/** 指令码（取值以 contracts/commands/registry.yaml 为准）。 */
export const CMD = {
  LOCATE_NOW: 'A_POS_NOW',
  RESTART: 'A_RESET',
  POWER_OFF: 'S_CLOSE',
  DEFENSE: 'S_DEFENSE',
  OIL_CUT: 'S_DIS_OIL_ELE',
  AUDIO: 'S_AUDIO_AL',
  SHAKE_ALARM: 'S_SHAKE_AL',
  POS_MODE: 'I_POS_MOD_LEVEL',
  FLIGHT_LEVEL: 'I_FLIGHT_LEVEL',
  POS_PRIORITY: 'I_GPS_WIFI',
  // 自定义文本透传，params.content ≤512 字符
  CUSTOM: 'CUSTOM_CMD',
  // 以下四条：指令码与参数已在 contracts/commands/registry.yaml 定稿，协议帧体待厂商
  // 文档。下发会被网关 REJECTED 并回 ret=12，调用方按"设备不支持"提示即可
  FACTORY_RESET: 'A_FACTORY_RESET',
  FAMILY_NUM: 'S_FAMILY_NUM',
  AUDIO_ALWAYS: 'S_AUDIO_ALWAYS',
  AUDIO_TIMED: 'I_AUDIO_TIMED',
  POS_SCHEDULE: 'I_POS_SCHEDULE',
};

/**
 * 10.1 通用指令下发。
 *
 * canOffline 只对 registry 里 `offline_policy: allowed` 的指令有效；对 `forbidden` 的
 * （如 A_POS_NOW 立即定位）传 1 会被拒（10001）——补发一条过期的定位请求没有意义。
 * 返回体里的 `ret` 才是设备侧结果：0 成功 / 10 离线 / 12 不支持，**ret=10 时 code 仍是 0**，
 * 调用方要按"设备离线，请稍后重试"提示，不能当成失败。
 */
export function send(deviceId, { cmdCode, params, canOffline, ttlSeconds } = {}) {
  return request({
    url: `/devices/${p(deviceId)}/commands`,
    method: 'POST',
    loading: true,
    data: { cmdCode, params: params || {}, canOffline, ttlSeconds, appSource: 'app' },
  });
}

/** 10.2 操作记录。deviceIds 是**复数**且为重复参数——传 deviceId 单数不生效。 */
export function records({ page = 1, pageSize = 10, deviceIds } = {}) {
  return request({
    url: '/command-records',
    method: 'GET',
    loading: true,
    query: { page, pageSize: Math.min(pageSize, 50), deviceIds },
  });
}

/** 8.1 立即定位（薄封装 A_POS_NOW，不支持离线补发）。 */
export function locateNow(deviceId) {
  return request({ url: `/devices/${p(deviceId)}/locate`, method: 'POST', loading: true, data: {} });
}

/** 8.4.1 查询定位模式（前端按 availableModes 渲染选项，不要硬编码三档）。 */
export function locationMode(deviceId) {
  return request({ url: `/devices/${p(deviceId)}/location-mode`, method: 'GET', loading: true });
}

/** 8.4.2 设置定位模式（level 必须来自 availableModes[].level）。 */
export function setLocationMode(deviceId, { level }) {
  return request({
    url: `/devices/${p(deviceId)}/location-mode`,
    method: 'PUT',
    loading: true,
    data: { level },
  });
}

/** 9.2.1 自检（五项：GPS/GSM/电池/ACC/电压；从未上报 21022）。 */
export function selfCheck(deviceId) {
  return request({ url: `/devices/${p(deviceId)}/self-check`, method: 'GET', loading: true });
}

/** 9.3.1 开关状态列表（三态 on/off/unknown，切换走 10.1）。 */
export function switchStatus(deviceId) {
  return request({ url: `/devices/${p(deviceId)}/switch-status`, method: 'GET', loading: true });
}

/** 9.4.1 可设置项（按 paramDefs 渲染表单，提交走 10.1）。 */
export function remoteSettings(deviceId) {
  return request({ url: `/devices/${p(deviceId)}/remote-settings`, method: 'GET', loading: true });
}
