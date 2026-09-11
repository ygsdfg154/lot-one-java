/**
 * 设备列表与当前选中设备（首页主链路）。
 *
 * 重写自反编译产物：原版按原厂后端的响应结构解析（`data.list`/`data.count`、
 * `data.lbsInfo.*`、`data.terminalTypeInfo.terminalTypeExtend.*`），对着新契约会静默拿到
 * undefined；批量实时态原来打 `/v2/terminal/ids`，契约里没有这个接口——1.9 列表每项
 * 本身就带实时态，一次请求即可，不需要 N 次并发 6.2。
 */
import * as deviceApi from '../../api/device.js';
import { normalizeDeviceNow, normalizeMyDeviceItem, normalizePage } from '../../adapters/device.js';

const state = {
  terminals: [],
  // getDeviceNum 是原有的"连续失败后降频"计数：请求失败时置 3，之后三次轮询直接跳过，
  // 避免网络异常时每 20 秒打一次无效请求。
  getDeviceNum: 0,
  deviceMarker: [],
  initNeed: false,
};

const mutations = {
  clearUseDeviceInfo(s) {
    s.terminals = [];
  },
  setAllTerminals(s, list) {
    s.terminals = list || [];
  },
  setTerminals(s, list) {
    s.terminals = s.terminals.length ? s.terminals.concat(list || []) : list || [];
  },
  setGetDeviceNum(s, n) {
    s.getDeviceNum = n;
  },
  setDeviceMarker(s, payload) {
    if (!payload) {
      s.deviceMarker = [];
      return;
    }
    if (Array.isArray(payload)) {
      s.deviceMarker = payload;
      return;
    }
    if (!s.deviceMarker.length) {
      s.deviceMarker = [payload];
      return;
    }
    s.deviceMarker = s.deviceMarker.map((m) => (m.id === payload.id ? payload : m));
  },
  setInitNeed(s, v) {
    s.initNeed = v;
  },
};

/** 当前应展示哪台设备：优先上次选中的，否则列表第一台。 */
function resolveTargetId(rootState, terminals, payload) {
  if (payload && payload.id) return payload.id;
  if (rootState.device.lastSelectedId) return rootState.device.lastSelectedId;
  return terminals.length ? terminals[0].id : '';
}

const actions = {
  /**
   * 1.9 我的设备列表。契约只有 page/pageSize（上限 50），原来传的
   * limit/enterpriseId/deviceState/searchKey 后端不支持，已去掉——searchKey 这类筛选
   * 要么后端加参数，要么前端本地过滤，不能继续发一个被忽略的参数假装生效。
   */
  async GetTerminalList({ commit, rootState }, payload = {}) {
    // 设备身份不能访问 1.9（21010）：名下只有自己这一台，用 1.10 拼成单元素列表，
    // 设备列表页照常渲染（"切换设备"对设备登录没有意义，但页面不该报错或空白）
    if (rootState.account.identityType === 'device') {
      const cur = await deviceApi.currentDevice({ loading: false });
      if (!cur.succeeded || !cur.data) return cur;
      const list = [normalizeDeviceNow(cur.data)];
      commit(payload.concat ? 'setAllTerminals' : 'setTerminals', list);
      cur.data = { items: [], total: 1, list, count: 1 };
      cur.list = list;
      cur.count = 1;
      return cur;
    }
    const res = await deviceApi.myDevices({
      page: payload.page || 1,
      pageSize: Math.min(payload.pageSize || payload.limit || 50, 50),
      loading: !payload.noLoading,
    });
    if (res.succeeded && res.data) {
      const { list, count } = normalizePage(res.data, normalizeMyDeviceItem);
      commit(payload.concat ? 'setAllTerminals' : 'setTerminals', list);
      // 设备列表组件按 `data.list.length` 判断有没有下一页（原厂分页信封），
      // 契约给的是 `items`/`total`。两套都挂上，否则组件里 undefined.length 直接抛，
      // 页签与"加载更多"状态都停在错的值上
      res.data = { ...res.data, list, count };
      res.list = list;
      res.count = count;
    }
    return res;
  },

  /**
   * 6.2 单设备实时态（首页选中设备）。
   * 从未上报的设备返回 code=0 且实时字段缺省（契约降级约定），这里照常写入 —— 视图
   * 模型里 lon/lat 为 0、locateTime 为空，页面据此显示"暂无定位"。
   */
  async GetTerminalInfo({ state: s, rootState, commit, dispatch }, payload) {
    if (s.getDeviceNum > 0) {
      commit('setGetDeviceNum', s.getDeviceNum - 1);
      return;
    }
    const deviceId = resolveTargetId(rootState, s.terminals, payload);
    if (!deviceId) {
      commit('device/clearSelectedDevice', null, { root: true });
      commit('device/clearlastDevice', null, { root: true });
      commit('device/setFuncDeviceId', '', { root: true });
      return;
    }
    const res = await deviceApi.realtime(deviceId, { loading: true });
    if (!res.succeeded) {
      // 网络/上游异常：降频三次，避免 20 秒一次的轮询把错误提示刷满屏
      commit('setGetDeviceNum', 3);
      return res;
    }
    const vm = normalizeDeviceNow(res.data);
    if (!vm) return res;
    commit('device/setSelectedDevice', vm, { root: true });
    commit('setDeviceMarker', vm);
    if (!vm.TextLocation) {
      dispatch('device/GetSelectedDeviceAddress', {}, { root: true });
    }
    return res;
  },

  /**
   * 首页地图上所有设备的点位。
   *
   * 原来打 `/v2/terminal/ids` 批量取实时态，契约里没有这个接口；1.9 列表的每一项
   * 已经带了实时态（DeviceRow），所以这里复用列表结果，一次请求拿到全部 marker，
   * 不再对每台设备并发调 6.2（设备多时那是 N 个请求）。
   */
  async GetTerminalInfos({ state: s, rootState, commit, dispatch }) {
    if (s.getDeviceNum > 0) {
      commit('setGetDeviceNum', s.getDeviceNum - 1);
      return;
    }
    // 设备身份（1.7 设备号+密码登录）名下只有自己这一台，且**不能**访问 1.9
    // 账号级列表（会返回 21010）。这条路要走 1.10 /devices/current：
    // 后端从 token 取 deviceId 返回该设备。不分派的话设备登录进来就是
    // "21010 → 列表空 → 弹『您还未绑定设备』"，而它明明就是一台设备登录的。
    if (rootState.account.identityType === 'device') {
      const cur = await deviceApi.currentDevice({ loading: false });
      if (!cur.succeeded || !cur.data) {
        commit('setGetDeviceNum', 3);
        return cur;
      }
      const one = normalizeDeviceNow(cur.data);
      commit('setAllTerminals', [one]);
      commit('setDeviceMarker', [one]);
      commit('device/setSelectedDevice', one, { root: true });
      return cur;
    }
    const res = await deviceApi.myDevices({ page: 1, pageSize: 50, loading: false });
    if (!res.succeeded || !res.data) {
      commit('setGetDeviceNum', 3);
      return res;
    }
    const { list } = normalizePage(res.data, normalizeMyDeviceItem);
    commit('setAllTerminals', list);
    commit('setDeviceMarker', list);
    if (!list.length) {
      commit('device/clearSelectedDevice', null, { root: true });
      return res;
    }
    const lastId = rootState.device.lastSelectedId;
    let selected = lastId ? list.find((d) => d.id === lastId) : null;
    if (lastId && !selected) {
      // 上次选中的设备已不在名下（被解绑/换绑）：让首页回到"重新初始化"状态
      commit('setInitNeed', true);
    }
    selected = selected || list.find((d) => d.isDefault) || list[0];
    commit('device/setSelectedDevice', selected, { root: true });
    if (!selected.TextLocation) {
      dispatch('device/GetSelectedDeviceAddress', {}, { root: true });
    }
    return res;
  },

  /** 1.15 修改设备登录密码。 */
  ChangeTerminalPassword(_ctx, payload) {
    return deviceApi.changeDevicePassword({
      deviceId: payload.deviceId || payload.terminalNo,
      newPassword: payload.newPassword || payload.password,
    });
  },

  /** 1.13 切换默认设备（原来只在本地记 lastSelectedId，服务端并不知道）。 */
  async SwitchDefaultDevice({ dispatch }, payload) {
    const res = await deviceApi.switchDefault({ deviceId: payload.deviceId || payload.id });
    if (res.succeeded) {
      await dispatch('GetTerminalList', { page: 1, concat: true, noLoading: true });
    }
    return res;
  },
};

export default { namespaced: true, state, mutations, actions };
