/**
 * 电子围栏与行政区（契约 8.2）。
 *
 * 行政区那两个接口（8.2.6 树 / 8.2.7 边界）是**后端代理**地图厂商的，前端不再直连
 * 高德的 `/config/district`——原版把厂商 key 带在前端请求里，等于把 key 公开了。
 * 未配置地图 key 时返回 `22003`，此时只是行政区围栏不可用，圆形/多边形照常。
 */
import { request } from '../common/request.js';

const p = (v) => encodeURIComponent(v);

/** 8.2.1 围栏列表（分页）。 */
export function list(deviceId, { page = 1, pageSize = 10 } = {}) {
  return request({
    url: `/devices/${p(deviceId)}/fences`,
    method: 'GET',
    loading: true,
    query: { page, pageSize },
  });
}

/** 8.2.2 围栏详情（返回 `{fence, bindDeviceIds}`）。 */
export function detail(fenceId) {
  return request({ url: `/fences/${p(fenceId)}`, method: 'GET', loading: true });
}

/** 8.2.3 创建围栏。名称重复 21018、数量超上限 21019。 */
export function create(deviceId, body) {
  return request({
    url: `/devices/${p(deviceId)}/fences`,
    method: 'POST',
    loading: true,
    data: body,
  });
}

/** 8.2.4 更新围栏（整体覆盖，字段同创建）。 */
export function update(fenceId, body) {
  return request({ url: `/fences/${p(fenceId)}`, method: 'PUT', loading: true, data: body });
}

/** 8.2.5 删除围栏。 */
export function remove(fenceId) {
  return request({ url: `/fences/${p(fenceId)}`, method: 'DELETE', loading: true });
}

/**
 * 8.2.6 行政区树（省→市→区县）。
 *
 * 区划码表**不内置进 App 包**：行政区划每年都在调整，内置就意味着发版才能修。
 */
export function regionTree() {
  return request({ url: '/regions/tree', method: 'GET', loading: true });
}

/** 8.2.7 行政区边界（GCJ-02 顶点，3~100 个，可直接当多边形围栏的 points）。 */
export function regionBoundary(adcode) {
  return request({ url: `/regions/${p(adcode)}/boundary`, method: 'GET', loading: true });
}
