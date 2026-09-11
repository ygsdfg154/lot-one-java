/**
 * 地理编码（契约 13.1）。
 *
 * 坐标一律 GCJ-02，与地图组件同一套；(0,0) 是"设备未定位"的表现，后端会按 10001 拒绝，
 * 调用方应先判空再来（见 store/modules/device.js 的 GetGeocode）。
 */
import { request } from '../common/request.js';

/** 逆地理编码：坐标 → 结构化地址。查无结果不是错误，返回空 formattedAddress。 */
export function regeo({ lat, lng }) {
  return request({ url: '/geo/regeo', method: 'GET', query: { lat, lng } });
}
