/**
 * 声音安防 — 音频（契约 7.3）。
 *
 * 原厂那套 `/record/*`（auto/always/status/read/{id} DELETE）里，只有"声控模式"
 * 在协议上是真实可下发的（`S_AUDIO_AL` → `AMIC,2/0`）；**定时模式与持续模式**
 * 三份协议文档零命中、产品已确认硬件不支持（doc/design/sound-security-and-lbs.md），
 * 所以契约里没有对应接口，前端也不该画这两个入口。
 */
import { request } from '../common/request.js';

const p = (v) => encodeURIComponent(v);

/**
 * 7.3.1 音频列表（分页 + 可选时间范围）。
 *
 * `duration` 依赖 D-4，落地前恒为 0，别拿它当进度条总长。
 * 音频页按天看，`startTime/endTime` 必须交给后端过滤——在前端按日期筛会和分页打架。
 */
export function list(deviceId, { page = 1, pageSize = 10, startTime, endTime } = {}) {
  return request({
    url: `/devices/${p(deviceId)}/audios`,
    method: 'GET',
    loading: true,
    query: { page, pageSize, startTime, endTime },
  });
}

/**
 * 7.3.2 开/关声控声音安防。
 *
 * `mode`：voice 声控（默认）/ always 持续 / timed 定时——三种是三条独立指令。
 * `open=false` 下发关闭——这个参数是必须的，否则开了就只能等固件超时。
 * 返回体只表示"指令已下发"，当前状态要查 9.3.1 的 `audio` 开关（含 unknown 三态）。
 * 设备离线时 `ret=10`（`code` 仍是 0），`S_AUDIO_AL` 允许离线补发。
 */
export function trigger(deviceId, { duration, open, mode, intervalSeconds } = {}) {
  return request({
    url: `/devices/${p(deviceId)}/audios/trigger`,
    method: 'POST',
    loading: true,
    data: { duration, open, mode, intervalSeconds },
  });
}

/**
 * 7.3.2b 标记已听。`audioIds` **必传**，空数组返回 10001——
 * 与 12.3 告警"空数组=一键全读"不同，音频没有全量水位语义。
 */
export function markRead(deviceId, { audioIds }) {
  return request({
    url: `/devices/${p(deviceId)}/audios/read`,
    method: 'POST',
    loading: true,
    data: { audioIds },
  });
}

/**
 * 7.3.2c 删除音频（只在当前身份的列表里隐藏，不物理删文件）。
 *
 * 音频是现场证据类数据，C 端点一下就把文件销毁、出纠纷无从追溯，所以是隐藏语义。
 * 前端文案照旧写"删除"没问题，但不要承诺"彻底清除"。
 */
export function dismiss(deviceId, { audioIds }) {
  return request({
    url: `/devices/${p(deviceId)}/audios/dismiss`,
    method: 'POST',
    loading: true,
    data: { audioIds },
  });
}

/** 7.3.3 音频文件直链（302 重定向到 CDN，或直接返回音频流）。播放器直接用这个地址。 */
export function fileUrl(deviceId, audioId, { serviceRoot = '' } = {}) {
  return `${serviceRoot}/devices/${p(deviceId)}/audios/${p(audioId)}/file`;
}
