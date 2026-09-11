/**
 * 消息中心（"消息" Tab）。
 *
 * 重写自反编译产物。原版的三个实质错误：
 *   1. 三个"删除"动作（单条/批量/全部）全都打到 `/v1/alarms/read` —— **标记已读 ≠ 删除**，
 *      用户点删除只会把消息标成已读，刷新后又回来了。删除应走 `/alarms/dismiss`；
 *   2. `alarmCodes` 用 `join(',')` 拼串，后端只认重复参数，多选筛选实际不生效；
 *   3. 无条件把 (lng,lat) 做坐标转换并画到地图上，而契约的 `hasLocation=false` 表示
 *      这条告警没有位置（低电、离线等），(0,0) 会被画到几内亚湾。
 */
import * as alarmApi from '../../api/alarm.js';
import { normalizeAlarm, normalizeAlarmStats } from '../../adapters/alarm.js';
import { normalizePage } from '../../adapters/device.js';

const PAGE_SIZE = 20;

const state = {
  alarmList: [],
  status: 'loadmore',
  page: 1,
  limit: PAGE_SIZE,
  listNeedRefresh: true,
  statistics: [],
  unreadCount: 0,
};

const mutations = {
  initState(s) {
    s.alarmList = [];
    s.status = 'loadmore';
    s.page = 1;
    s.statistics = [];
  },
  setListNeedRefresh(s, v) {
    s.listNeedRefresh = !!v;
  },
  setList(s, { list, count }) {
    // 按 id 去重：分页边界上后端可能返回同一条（新告警插入导致偏移）。
    // 原版用 JSON.stringify 整对象去重，一条消息的 isShowDelete 变化就会被当成两条。
    const seen = new Set(s.alarmList.map((a) => a.id));
    const fresh = list.filter((a) => a.id && !seen.has(a.id));
    s.alarmList = s.alarmList.concat(fresh);
    s.page += 1;
    s.status = s.alarmList.length < count ? 'loadmore' : 'nomore';
    s.listNeedRefresh = false;
  },
  setDeleteShowList(s, payload) {
    if (!payload) {
      s.alarmList = s.alarmList.map((a) => ({ ...a, isShowDelete: false }));
      return;
    }
    if (payload.all) {
      s.alarmList = s.alarmList.map((a) => ({ ...a, isShowDelete: true }));
      return;
    }
    s.alarmList = s.alarmList.map((a) =>
      a.id === payload.id ? { ...a, isShowDelete: !a.isShowDelete } : a
    );
  },
  setStatus(s, v) {
    s.status = v;
  },
  setStatistics(s, v) {
    s.statistics = v || [];
  },
  setUnreadCount(s, v) {
    s.unreadCount = v || 0;
  },
  setListAddress(s, { id, address }) {
    s.alarmList = s.alarmList.map((a) => (a.id === id ? { ...a, address } : a));
  },
  removeFromList(s, ids) {
    const set = new Set(ids || []);
    s.alarmList = s.alarmList.filter((a) => !set.has(a.id));
  },
  markReadInList(s, ids) {
    const set = new Set(ids || []);
    // 空集合 = 一键全读
    s.alarmList = s.alarmList.map((a) =>
      set.size === 0 || set.has(a.id) ? { ...a, isRead: true } : a
    );
  },
};

/** 页面筛选条件 → 契约参数（alarmCodes/deviceIds 必须是数组，由 qs 展开成重复参数）。 */
function queryOf(payload, page, pageSize) {
  const p = payload || {};
  const codes =
    p.alarmTypes && p.alarmTypes.length ? p.alarmTypes : p.alarmType ? [p.alarmType] : undefined;
  const devices = p.deviceIds || (p.deviceId ? [p.deviceId] : undefined);
  return {
    page,
    pageSize,
    deviceIds: devices,
    alarmCodes: codes,
    startTime: p.startTime || p.beginTime,
    endTime: p.endTime,
  };
}

const actions = {
  /** 12.1 消息列表（分页追加）。 */
  async GetAlermList({ state: s, commit }, payload) {
    if (s.listNeedRefresh) commit('initState');
    if (s.status === 'nomore') return null;
    commit('setStatus', 'loading');
    const res = await alarmApi.list(queryOf(payload, s.page, s.limit));
    if (res.succeeded && res.data) {
      commit('setList', normalizePage(res.data, normalizeAlarm));
    } else {
      commit('setStatus', 'nomore');
    }
    return res;
  },

  /** 12.1 同一接口的"不写入 store"版本（独立列表页用）。 */
  async GetAlermOrg(_ctx, payload) {
    const res = await alarmApi.list(queryOf(payload, payload.page || 1, payload.limit || PAGE_SIZE));
    if (res.succeeded && res.data) {
      const { list, count } = normalizePage(res.data, normalizeAlarm);
      res.list = list;
      res.count = count;
    }
    return res;
  },

  /** 12.4 分类统计（消息页顶部角标）。 */
  async GetAlarmStatistics({ commit }, payload) {
    const res = await alarmApi.statistics(queryOf(payload, 1, 1));
    if (res.succeeded) commit('setStatistics', normalizeAlarmStats(res.data));
    return res;
  },

  /** 12.2 未读数（Tab 红点；30 天窗口、封顶 99）。 */
  async GetUnreadCount({ commit }) {
    const res = await alarmApi.unreadCount();
    if (res.succeeded && res.data) commit('setUnreadCount', res.data.unreadCount);
    return res;
  },

  /** 12.3 标记已读。不传 ids = 一键全部已读（契约如此设计，不是缺陷）。 */
  async MarkRead({ commit }, payload) {
    const ids = (payload && payload.alarmIds) || [];
    const res = await alarmApi.markRead({ alarmIds: ids });
    if (res.succeeded) {
      commit('markReadInList', ids);
      if (!ids.length) commit('setUnreadCount', 0);
    }
    return res;
  },

  /** 删除单条（App 层隐藏）。原版打的是 read 接口，那只会标已读。 */
  async DelAlermLog({ commit }, payload) {
    const ids = [payload.id];
    const res = await alarmApi.dismiss({ alarmIds: ids });
    if (res.succeeded) commit('removeFromList', ids);
    return res;
  },

  /** 批量删除。 */
  async BatchDeleteAlarm({ commit }, payload) {
    const ids = payload.alarmIds || payload.data || [];
    const res = await alarmApi.dismiss({ alarmIds: ids });
    if (res.succeeded) commit('removeFromList', ids);
    return res;
  },

  /** 一键清空（空数组 = 全部）。 */
  async AllDeleteAlarm({ commit }) {
    const res = await alarmApi.dismiss({ alarmIds: [] });
    if (res.succeeded) commit('initState');
    return res;
  },

  /**
   * 12.5 告警详情。带上 deviceId + alarmedAt 提示——id 是服务端派生的哈希，上游存储里
   * 没这个键，不带提示会退化成扫描（契约明确要求带）。
   */
  async GetAlarmDetail(_ctx, payload) {
    const res = await alarmApi.detail({
      id: payload.id || payload.alarmId,
      deviceId: payload.deviceId || payload.terminalNo,
      alarmedAt: payload.alarmedAt || payload.beginTime,
    });
    if (res.succeeded) res.view = normalizeAlarm(res.data);
    return res;
  },
};

export default { namespaced: true, state, mutations, actions };
