/**
 * 消息中心与告警设置（契约 8.6 / 12.x）。
 */
import { request } from '../common/request.js';

const p = (deviceId) => encodeURIComponent(deviceId);

/**
 * 12.1 消息列表（跨设备）。
 * deviceIds / alarmCodes 是**重复参数**，由 qs 展开（逗号分隔后端不认，会返回 21011）。
 */
export function list({ page = 1, pageSize = 10, deviceIds, startTime, endTime, alarmCodes } = {}) {
  return request({
    url: '/alarms',
    method: 'GET',
    loading: true,
    query: { page, pageSize: Math.min(pageSize, 50), deviceIds, startTime, endTime, alarmCodes },
  });
}

/** 12.2 未读数（30 天窗口，封顶 99）。 */
export function unreadCount() {
  return request({ url: '/alarms/unread-count', method: 'GET' });
}

/** 12.3 标记已读。**不传/空数组 = 一键全部已读**（契约如此设计）。 */
export function markRead({ alarmIds } = {}) {
  return request({ url: '/alarms/read', method: 'POST', data: { alarmIds } });
}

/** 清空消息（App 层隐藏，不物理删除）。空数组 = 一键清空。 */
export function dismiss({ alarmIds } = {}) {
  return request({ url: '/alarms/dismiss', method: 'POST', loading: true, data: { alarmIds } });
}

/** 12.4 分类统计（消息页角标）。过滤条件与 12.1 同源。 */
export function statistics({ deviceIds, startTime, endTime, alarmCodes } = {}) {
  return request({
    url: '/alarms/statistics',
    method: 'GET',
    query: { deviceIds, startTime, endTime, alarmCodes },
  });
}

/**
 * 12.5 告警详情。**强烈建议带 deviceId + alarmedAt 提示**——id 是服务端派生的哈希，
 * 上游存储里没有这个键，带提示能把查找窗口收窄到"一台设备的一天"，否则退化为扫描。
 */
export function detail({ id, deviceId, alarmedAt }) {
  return request({
    url: '/alarms/detail',
    method: 'GET',
    loading: true,
    query: { id, deviceId, alarmedAt },
  });
}

/** 8.6.1 告警配置。 */
export function settings(deviceId) {
  return request({ url: `/devices/${p(deviceId)}/alarm-settings`, method: 'GET', loading: true });
}

/** 8.6.2 保存告警配置（只传修改项）。 */
export function saveSettings(deviceId, { alarmItems }) {
  return request({
    url: `/devices/${p(deviceId)}/alarm-settings`,
    method: 'PUT',
    loading: true,
    data: { alarmItems },
  });
}

/** 8.6.2b 通知渠道（微信/短信/电话/APP + 接收号码）。 */
export function notifyChannels(deviceId) {
  return request({ url: `/devices/${p(deviceId)}/notify-channels`, method: 'GET', loading: true });
}

/**
 * 8.6.2b 保存通知渠道。
 *
 * `telPhones` 与 `smsPhones` 是**两份独立名单**（语音按次计费且会打扰人，短信便宜，
 * 收件人本就不同），各自整体覆盖：只传一份会把另一份清空，所以调用方要把两份都带上。
 */
export function saveNotifyChannels(deviceId, payload) {
  return request({
    url: `/devices/${p(deviceId)}/notify-channels`,
    method: 'PUT',
    loading: true,
    data: payload,
  });
}
