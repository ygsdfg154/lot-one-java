/**
 * 历史轨迹与日历打点（契约 8.3 / 8.3b）。
 */
import { request } from '../common/request.js';

const p = (deviceId) => encodeURIComponent(deviceId);

/**
 * 8.3 历史轨迹。**不分页**：用 limit + truncated（轨迹是连续序列，翻页对绘制没有意义）。
 * 时间跨度 >7 天返回 10001；truncated=true 时应提示用户缩小范围。
 */
export function track(deviceId, { startTime, endTime, limit, posTypes, minSpeed } = {}) {
  return request({
    url: `/devices/${p(deviceId)}/track`,
    method: 'GET',
    loading: true,
    time: 60000, // 轨迹点多，给足超时
    query: { startTime, endTime, limit, posTypes, minSpeed },
  });
}

/** 8.3b 某月哪几天有数据（type: track | report | audio）。 */
export function dataDates(deviceId, { type = 'track', month } = {}) {
  return request({
    url: `/devices/${p(deviceId)}/data-dates`,
    method: 'GET',
    query: { type, month },
  });
}

/** 物理删除轨迹（不可恢复，跨度 ≤7 天）。 */
export function remove(deviceId, { startTime, endTime } = {}) {
  return request({
    url: `/devices/${p(deviceId)}/track`,
    method: 'DELETE',
    loading: true,
    query: { startTime, endTime },
  });
}
