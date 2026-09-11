/**
 * 告警设置页：告警类型开关（8.6）+ 通知渠道与接收号码（8.6.2b）+ 配额（7.3 items）。
 *
 * 重写自反编译产物。原版为每种告警各开一个原厂接口
 * （`/terminal-alarm-setting/set-{sos,tear,low-power,vibration,speed,power-off,voice,
 * rest,offline,fence,wechat,sms,tel,push}-alarm`，14 条），全部按 `{id, status}` 提交，
 * `id` 是原厂"告警设置记录"的主键。契约把这些收成两个维度：
 *
 *   - **告警类型开关**（8.6.1/8.6.2，权威源 iot-runtime）：一次 PUT 提交 `alarmItems`，
 *     只带修改项。哪些类型可配由后端按设备返回，前端不再假定固定 10 种。
 *   - **通知渠道**（8.6.2b，BFF 私有偏好）：微信/短信/电话/APP 四个开关 +
 *     **两份独立**接收号码名单（telPhones / smsPhones）。PUT 整体覆盖，两份都要带。
 *
 * "剩余电话/短信次数"在契约里属于 VIP 配额（7.3 `items[].remainingQuota`），
 * 不在告警设置里——原版从告警设置响应里读 telRemain/smsRemain，那是把两件事塞在一起。
 */
import * as alarmApi from '../../api/alarm.js';
import * as deviceApi from '../../api/device.js';
import { ALARM_OF } from '../../adapters/remoteset.js';
import { toNum } from '../../adapters/num.js';

/** 页面 stateOnList 的键 → 8.6 的 alarmCode（与 adapters/remoteset.js 同一张表）。 */
const STATE_KEY_TO_CODE = {
  vibration: ALARM_OF.Vibration,
  dismantle: ALARM_OF.TamperAlarm,
  battery: ALARM_OF.LowBatteryAlarm,
  voice: ALARM_OF.VoiceAlarm,
  sos: ALARM_OF.SosAlarm,
  cutPower: ALARM_OF.CutPowerAlarm,
  speed: ALARM_OF.SpeedAlarm,
};

/** 通知渠道开关：页面键 → 契约字段。 */
const CHANNEL_KEY_TO_FIELD = {
  wechat: 'wechatPush',
  sms: 'smsNotify',
  tel: 'telNotify',
  push: 'appPush',
};

const state = {
  // 8.6.2b 的当前值。PUT 是整体覆盖，改一个开关也要把其余字段一起带上，
  // 所以必须在 store 里留一份完整快照，不能只发用户刚点的那一项。
  channels: {
    wechatPush: false,
    smsNotify: false,
    telNotify: false,
    appPush: false,
    telPhones: [],
    smsPhones: [],
  },
  // 8.6.1 的告警项（原样留着，页面按 alarmCode 取 alarmValue/alarmValueDesc）
  alarmItems: [],
};

const mutations = {
  setChannels(s, c) {
    s.channels = {
      wechatPush: !!(c && c.wechatPush),
      smsNotify: !!(c && c.smsNotify),
      telNotify: !!(c && c.telNotify),
      appPush: !!(c && c.appPush),
      telPhones: (c && c.telPhones) || [],
      smsPhones: (c && c.smsPhones) || [],
    };
  },
  setAlarmItems(s, items) {
    s.alarmItems = items || [];
  },
};

const actions = {
  /**
   * 拉齐设置页要的两份数据。返回给页面的 `stateOnList` 形状与原版一致，
   * 免得每个页面各拼一次。
   */
  async GetAlarmSettings({ commit, rootState }, payload) {
    const deviceId =
      (payload && (payload.deviceId || payload.terminalId)) ||
      (rootState.device.selectedTerminal && rootState.device.selectedTerminal.id);
    if (!deviceId) return { succeeded: false, data: null };

    const [settingsRes, channelsRes] = await Promise.all([
      alarmApi.settings(deviceId),
      alarmApi.notifyChannels(deviceId),
    ]);

    const items = (settingsRes.succeeded && settingsRes.data && settingsRes.data.alarmItems) || [];
    commit('setAlarmItems', items);
    // 告警入口显隐要按"这台设备实际可配哪些告警"来，空数组也是有效答案
    if (settingsRes.succeeded) {
      commit(
        'device/setDeviceAlarmCodes',
        items.map((it) => it.alarmCode),
        { root: true }
      );
    }
    if (channelsRes.succeeded) commit('setChannels', channelsRes.data);

    const enabled = (code) => {
      const it = items.find((x) => x.alarmCode === code);
      return !!(it && it.alarmEnable);
    };
    const c = (channelsRes.succeeded && channelsRes.data) || {};
    return {
      succeeded: settingsRes.succeeded || channelsRes.succeeded,
      code: settingsRes.code,
      msg: settingsRes.msg,
      data: {
        alarmItems: items,
        // 页面直接绑这个对象；没有的项恒 false（对应的入口本就不显示）
        stateOnList: {
          wechat: !!c.wechatPush,
          sms: !!c.smsNotify,
          tel: !!c.telNotify,
          push: !!c.appPush,
          vibration: enabled(STATE_KEY_TO_CODE.vibration),
          dismantle: enabled(STATE_KEY_TO_CODE.dismantle),
          battery: enabled(STATE_KEY_TO_CODE.battery),
          voice: enabled(STATE_KEY_TO_CODE.voice),
          sos: enabled(STATE_KEY_TO_CODE.sos),
          cutPower: enabled(STATE_KEY_TO_CODE.cutPower),
          speed: enabled(STATE_KEY_TO_CODE.speed),
        },
        telPhones: c.telPhones || [],
        smsPhones: c.smsPhones || [],
      },
    };
  },

  /**
   * 切换一项告警类型开关（8.6.2）。只提交这一项，`alarmValue` 沿用当前值——
   * 不带 alarmValue 会把已配好的阈值/灵敏度清掉。
   */
  async SetAlarmEnabled({ state: s, commit, rootState }, payload = {}) {
    const deviceId =
      payload.deviceId || (rootState.device.selectedTerminal && rootState.device.selectedTerminal.id);
    const code = payload.alarmCode || STATE_KEY_TO_CODE[payload.key];
    if (!deviceId || !code) return { succeeded: false, data: null };

    const cur = s.alarmItems.find((x) => x.alarmCode === code);
    const item = { alarmCode: code, alarmEnable: !!payload.status };
    const value = payload.alarmValue !== undefined ? payload.alarmValue : cur && cur.alarmValue;
    if (value !== undefined && value !== null) item.alarmValue = String(value);

    const res = await alarmApi.saveSettings(deviceId, { alarmItems: [item] });
    if (res.succeeded) {
      const next = s.alarmItems.map((x) => (x.alarmCode === code ? { ...x, ...item } : x));
      commit('setAlarmItems', cur ? next : next.concat(item));
    }
    return res;
  },

  /**
   * 切换一个通知渠道开关（8.6.2b）。PUT 是整体覆盖，所以把 store 里的完整快照
   * 合并后再提交——只发变化的那个字段会把其余开关和两份号码名单一起清空。
   */
  async SetNotifyChannel({ state: s, commit, rootState }, payload = {}) {
    const deviceId =
      payload.deviceId || (rootState.device.selectedTerminal && rootState.device.selectedTerminal.id);
    const field = payload.field || CHANNEL_KEY_TO_FIELD[payload.key];
    if (!deviceId || !field) return { succeeded: false, data: null };

    const next = { ...s.channels, [field]: !!payload.status };
    const res = await alarmApi.saveNotifyChannels(deviceId, next);
    if (res.succeeded) commit('setChannels', next);
    return res;
  },

  /**
   * 保存一份接收号码名单（'tel' 或 'sms'）。另一份从快照带回，不能省——
   * 契约是整体覆盖，省掉等于清空对方名单。
   */
  async SetNotifyPhones({ state: s, commit, rootState }, payload = {}) {
    const deviceId =
      payload.deviceId || (rootState.device.selectedTerminal && rootState.device.selectedTerminal.id);
    if (!deviceId) return { succeeded: false, data: null };

    const phones = (payload.phones || []).map((v) => String(v || '').trim()).filter(Boolean);
    const next = {
      ...s.channels,
      telPhones: payload.channel === 'sms' ? s.channels.telPhones : phones,
      smsPhones: payload.channel === 'sms' ? phones : s.channels.smsPhones,
    };
    const res = await alarmApi.saveNotifyChannels(deviceId, next);
    if (res.succeeded) commit('setChannels', next);
    return res;
  },

  /**
   * 7.3 某分类的剩余配额（电话/短信告警页的"剩余次数"）。
   * 按量包才有配额；订阅包 total/remaining 为 null，页面显示"不限量"或"-"。
   */
  async GetAlarmQuota(_ctx, payload = {}) {
    const res = await deviceApi.vip(payload.deviceId, { categoryId: payload.categoryId });
    if (!res.succeeded) return res;
    const items = (res.data && res.data.items) || [];
    const hit = payload.categoryId
      ? items.find((it) => String(it.categoryId) === String(payload.categoryId))
      : items[0];
    res.quota = hit
      ? {
          total: hit.totalQuota == null ? null : toNum(hit.totalQuota),
          remaining: hit.remainingQuota == null ? null : toNum(hit.remainingQuota),
          unitName: hit.quotaUnitName || '',
          productName: hit.productName || '',
        }
      : null;
    return res;
  },
};

export default { namespaced: true, state, mutations, actions };
