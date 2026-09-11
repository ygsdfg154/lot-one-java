/**
 * 报表（契约 8.5）：行程与停留。
 *
 * 两份报表都按**日期**分页（`startDate`/`endDate` 是 `YYYY-MM-DD`，不带时分秒——
 * 与 8.3 轨迹的 `startTime`/`endTime` 不是一套参数，别混用）。
 */
import { request } from '../common/request.js';

const p = (v) => encodeURIComponent(v);

/** 8.5.1 行程报表（每段行程的起终点、里程、耗时、最高/平均速度）。 */
export function trips(deviceId, { startDate, endDate, page = 1, pageSize = 10 } = {}) {
  return request({
    url: `/devices/${p(deviceId)}/reports/trip`,
    method: 'GET',
    loading: true,
    query: { startDate, endDate, page, pageSize: Math.min(pageSize, 50) },
  });
}

/** 8.5.2 停留报表（每次停留的位置与时长）。轨迹页的停留点标注也用它。 */
export function stays(deviceId, { startDate, endDate, page = 1, pageSize = 10 } = {}) {
  return request({
    url: `/devices/${p(deviceId)}/reports/stay`,
    method: 'GET',
    loading: true,
    query: { startDate, endDate, page, pageSize: Math.min(pageSize, 50) },
  });
}
