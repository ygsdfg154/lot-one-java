/**
 * 分享定位（契约 7.2）。
 */
import { request } from '../common/request.js';

const p = (deviceId) => encodeURIComponent(deviceId);

/** 7.2.1 生成分享链接（expireHours 默认 24，上限 168）。 */
export function create(deviceId, { expireHours = 24 } = {}) {
  return request({
    url: `/devices/${p(deviceId)}/share-location`,
    method: 'POST',
    loading: true,
    data: { expireHours },
  });
}

/** 7.2.3 撤销该设备**全部**未过期分享（不支持按单条撤销）。 */
export function revoke(deviceId) {
  return request({ url: `/devices/${p(deviceId)}/share-location`, method: 'DELETE', loading: true });
}

/** 7.2.2 查看分享位置。公开接口：不带 token，过期/撤销/不存在均 21020。 */
export function view(token) {
  return request({ url: `/share/${encodeURIComponent(token)}`, method: 'GET', loading: true });
}
