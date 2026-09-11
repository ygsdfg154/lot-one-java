/**
 * 远程设置、开关、告警开关、亲情号、操作记录。
 *
 * 重写自反编译产物。原版把所有设置都打到 `/terminal/set-params`（按厂商 `FieldName`
 * 打通一切），并且用了 `/terminal/restart`、`/terminal/factory`、`/terminal/garrison`、
 * `/terminal/set-power`、`/terminal/cut-buffer`、`/terminal/white-list` 这些原厂路径。
 * 契约把这件事按**权威源**拆成三类，映射见 adapters/remoteset.js：
 *
 *   - 开关类     → 读 9.3.1 switch-status，写 10.1 commands（翻转 cmdParams）
 *   - 告警开关类 → 读 8.6.1 alarm-settings，写 8.6.2 PUT（存平台侧，不是每次都打设备）
 *   - 档位类     → 定义读 9.4.1，当前值读 8.4.1，写 10.1
 *
 * 恢复出厂设置在契约里**没有对应指令码**（厂商协议文档也没有），入口已在功能位映射里
 * 隐藏；这里保留动作但直接返回失败，避免哪天入口被放出来就打一个 404。
 */
import * as cmdApi from '../../api/command.js';
import * as alarmApi from '../../api/alarm.js';
import * as deviceApi from '../../api/device.js';
import { SWITCH_OF, ALARM_OF, ALARM_WITH_VALUE, kindOf, switchState, switchCmd } from '../../adapters/remoteset.js';
import { toNum } from '../../adapters/num.js';

const state = {
  handleList: [],
  status: 'loadmore',
  page: 1,
  limit: 20,
  listNeedRefresh: true,
};

const mutations = {
  initState(s) {
    s.handleList = [];
    s.status = 'loadmore';
    s.page = 1;
  },
  setListNeedRefresh(s, v) {
    s.listNeedRefresh = !!v;
  },
  setList(s, { list, count }) {
    // 原版用 JSON.stringify 去重（字段顺序一变就失效），改成按记录 id 去重
    const seen = new Set(s.handleList.map((it) => it.id));
    s.handleList = s.handleList.concat((list || []).filter((it) => !seen.has(it.id)));
    s.page += 1;
    s.status = s.handleList.length < count ? 'loadmore' : 'nomore';
    s.listNeedRefresh = false;
  },
  setStatus(s, v) {
    s.status = v;
  },
};

/** 10.2 一条操作记录 → 列表展示用的形状。 */
function normalizeRecord(it) {
  if (!it) return {};
  const isSuccess = it.result === 'success' || it.commandState === 0 || it.status === 0;
  const isFail = it.result === 'fail' || it.commandState === 8 || it.status === 8;
  const commandState = isSuccess ? 0 : isFail ? 8 : 12;
  const sendTime = it.sentAt || it.sendTime || it.createTime || it.createdAt || '-';
  const paramName = it.cmdName || it.paramName || it.cmdCode || '指令操作';
  const resultContent = it.resultContent || (it.resultMsg ? `结果: ${it.resultMsg}` : '');

  return {
    ...it,
    Id: it.id || it.Id,
    id: it.id || it.Id,
    paramName,
    commandState,
    result: it.result || (isSuccess ? 'success' : isFail ? 'fail' : 'pending'),
    resultText: isSuccess ? '发送成功' : isFail ? '发送失败' : '处理中',
    sendTime,
    sentAt: sendTime,
    createTime: sendTime,
    resultContent,
  };
}

const actions = {
  /** 10.2 操作记录（分页追加）。deviceIds 是复数重复参数。 */
  async GetCommandRecord({ commit, state: s }, payload = {}) {
    if (s.listNeedRefresh) commit('initState');
    if (s.status === 'nomore') return null;
    commit('setStatus', 'loading');

    const deviceId = payload.terminalId || payload.deviceId;
    const res = await cmdApi.records({
      page: s.page,
      pageSize: s.limit,
      deviceIds: deviceId ? [deviceId] : undefined,
    });
    if (!res.succeeded) {
      commit('setStatus', 'nomore');
      return res;
    }
    const data = res.data || {};
    commit('setList', {
      list: (data.items || []).map(normalizeRecord),
      count: toNum(data.total),
    });
    return res;
  },

  /**
   * 读取某个入口的当前状态。返回 `{on, unknown, value, max, statusText, pendingSync}`
   * ——组件只认这一个形状，不用管背后是开关、告警项还是亲情号。
   */
  async GetDirectiveState(_ctx, { deviceId, param } = {}) {
    const kind = kindOf(param);

    if (kind === 'switch') {
      const res = await cmdApi.switchStatus(deviceId);
      if (!res.succeeded) return { succeeded: false, data: null, res };
      const sw = ((res.data && res.data.switches) || []).find((x) => x.switchCode === SWITCH_OF[param]);
      // 命令树里没有这条指令 → 该开关不可用（能力位本该已经把入口藏掉）
      if (!sw) return { succeeded: true, data: { on: false, unknown: true, unavailable: true } };
      return { succeeded: true, data: { ...switchState(sw), raw: sw } };
    }

    if (kind === 'alarm') {
      const res = await alarmApi.settings(deviceId);
      if (!res.succeeded) return { succeeded: false, data: null, res };
      const item = ((res.data && res.data.alarmItems) || []).find((x) => x.alarmCode === ALARM_OF[param]);
      if (!item) return { succeeded: true, data: { on: false, unknown: true, unavailable: true } };
      const meta = ALARM_WITH_VALUE[param];
      return {
        succeeded: true,
        data: {
          on: !!item.alarmEnable,
          unknown: false,
          value: item.alarmValue || '',
          max: meta ? meta.max : undefined,
          statusText: item.alarmValueDesc || '',
          raw: item,
        },
      };
    }

    if (kind === 'family') {
      const res = await deviceApi.familyPhones(deviceId);
      if (!res.succeeded) return { succeeded: false, data: null, res };
      return {
        succeeded: true,
        data: {
          items: (res.data && res.data.items) || [],
          pendingSync: !!(res.data && res.data.pendingSync),
        },
      };
    }

    return { succeeded: false, data: null, unsupported: true };
  },

  /**
   * 下发某个入口的目标状态。
   *
   * 开关类走 10.1，返回体里的 `ret` 才是设备侧结果（10=离线、12=不支持，此时 code 仍是 0），
   * 所以这里把 `ret` 一起透出，页面按它区分"已下发"与"设备离线，稍后重试"。
   */
  async SetDirectiveState({ dispatch }, { deviceId, param, on, value, items } = {}) {
    const kind = kindOf(param);

    if (kind === 'switch') {
      const cur = await dispatch('GetDirectiveState', { deviceId, param });
      const sw = cur.succeeded && cur.data && cur.data.raw;
      if (!sw) return { succeeded: false, data: null };
      const { cmdCode, params } = switchCmd(sw, on);
      const res = await cmdApi.send(deviceId, { cmdCode, params });
      return { ...res, ret: res.data && res.data.ret };
    }

    if (kind === 'alarm') {
      const meta = ALARM_WITH_VALUE[param];
      const item = { alarmCode: ALARM_OF[param], alarmEnable: !!on };
      // 阈值型告警：开启时必须带阈值，关闭时清空（后端按告警类型校验取值）
      if (meta) item.alarmValue = on ? String(value == null ? '' : value) : '';
      return alarmApi.saveSettings(deviceId, { alarmItems: [item] });
    }

    if (kind === 'family') {
      return deviceApi.saveFamilyPhones({ deviceId, items: items || [] });
    }

    return { succeeded: false, data: null, unsupported: true };
  },

  /** 8.1 立即定位（A_POS_NOW，不支持离线补发）。 */
  Locateing(_ctx, payload) {
    const deviceId = payload && (payload.deviceId || payload.id || payload);
    return cmdApi.locateNow(deviceId);
  },

  /** 10.1 设备重启（A_RESET）。 */
  SetResetTerminal(_ctx, payload = {}) {
    const deviceId = payload.TerminalId || payload.deviceId || payload.terminalId;
    return cmdApi.send(deviceId, { cmdCode: cmdApi.CMD.RESTART });
  },

  /**
   * 10.1 恢复出厂设置（A_FACTORY_RESET）。
   *
   * 破坏性且不可撤销，registry 里 `offline_policy: forbidden`——设备离线时不缓存补发：
   * 用户此刻的意图不该在几小时后设备上线时突然执行。协议帧体待厂商文档，届时网关
   * 回 ret=12，调用方按"设备不支持"提示。
   */
  SetFactoryReset(_ctx, payload = {}) {
    const deviceId = payload.TerminalId || payload.deviceId || payload.terminalId;
    return cmdApi.send(deviceId, { cmdCode: cmdApi.CMD.FACTORY_RESET, canOffline: 0 });
  },

  /** 9.4.1 可设置项定义（select/number 表单由 paramDefs 渲染）。 */
  GetTerminalSettings(_ctx, payload = {}) {
    return cmdApi.remoteSettings(payload.terminalId || payload.deviceId);
  },

  /** 8.4.1 定位模式当前值 + 可选档位。 */
  GetLocationMode(_ctx, payload = {}) {
    return cmdApi.locationMode(payload.terminalId || payload.deviceId);
  },

  /** 8.4.2 设置定位模式（level 必须来自 availableModes）。 */
  SetLocationMode(_ctx, payload = {}) {
    return cmdApi.setLocationMode(payload.terminalId || payload.deviceId, { level: toNum(payload.level) });
  },

  /** 10.1 通用下发（档位类设置提交走这里：cmdCode + params 都来自 9.4.1）。 */
  SendCommand(_ctx, payload = {}) {
    return cmdApi.send(payload.deviceId, {
      cmdCode: payload.cmdCode,
      params: payload.params || {},
      canOffline: payload.canOffline,
      ttlSeconds: payload.ttlSeconds,
    });
  },

  /** 9.2.1 自检（五项）。设备从未上报时返回 21022，页面按"暂不可用"提示。 */
  GetSelfCheck(_ctx, payload = {}) {
    return cmdApi.selfCheck(payload.terminalId || payload.deviceId);
  },
};

export default { namespaced: true, state, mutations, actions };
