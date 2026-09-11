/**
 * 告警 DTO → 页面视图模型（契约 12.1/12.5）。
 *
 * 页面读的是原厂字段：`beginTime`/`alarmTypeName`/`terminalName`/`beginLng`/`beginLat`。
 * 契约给的是 `alarmedAt`/`alarmName`/`deviceName`/`lng`/`lat`，且告警码从数字变成了
 * 字符串枚举（SOS/SHAKE/LOW_POWER…）。
 */
import { toNum } from './num.js';
import { cleanDeviceName } from './device.js';

/**
 * 一条告警。
 *
 * `hasLocation=false` 时 lng/lat 无意义（契约明确写了"不要把 (0,0) 画到地图上"），
 * 这里把坐标置为 null 并保留 hasLocation 供页面判断——原代码无条件做坐标转换，等于把
 * 没有位置的告警定位到几内亚湾。
 *
 * @param {Object} dto
 * @returns {Object|null}
 */
export function normalizeAlarm(dto) {
  if (!dto) return null;
  const hasLocation = !!dto.hasLocation;
  const rawName = dto.deviceName || dto.deviceId;
  const lng = hasLocation ? toNum(dto.lng) : null;
  const lat = hasLocation ? toNum(dto.lat) : null;
  return {
    id: dto.id,
    terminalNo: dto.deviceId,
    deviceId: dto.deviceId,
    terminalName: cleanDeviceName(rawName, dto.deviceId),
    // 标题用设备上报原文；类型名用 registry 的中文——未知码后端已回退成原文，
    // 前端不再自己维护"码值→中文"的映射表
    alarmTitle: dto.alarmTitle || '',
    alarmType: dto.alarmCode,
    alarmCode: dto.alarmCode,
    alarmTypeName: dto.alarmName || dto.alarmTitle || dto.alarmCode,
    alarmValue: dto.alarmValue || '',
    hasLocation,
    beginLng: lng,
    beginLat: lat,
    beginLngWGS84: lng,
    beginLatWGS84: lat,
    address: dto.address || '',
    beginTime: dto.alarmedAt || '',
    isRead: !!dto.readFlag,
    isShowDelete: false,
  };
}

/**
 * 12.4 分类统计 → 页面用的数组。count 是 int32 JSON 数字，不需要 toNum，但兼容一下无害。
 * @param {Object} data
 * @returns {Array<{alarmCode: string, name: string, count: number}>}
 */
export function normalizeAlarmStats(data) {
  const items = (data && data.items) || [];
  return items.map((it) => ({
    alarmCode: it.alarmCode,
    name: it.alarmName || it.alarmCode,
    count: toNum(it.count),
  }));
}
