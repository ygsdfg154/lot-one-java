/**
 * 当前设备的选中态、绑定/解绑、档案与分享（首页与设备信息页）。
 *
 * 重写自反编译产物。原版的问题：
 *   - `/terminal/statistics`、`/terminal/funcs/{id}`、`/terminal/icon`、`/terminal/filter`、
 *     `/simcard/get-card-alarm/{iccid}`、`/{type}/dates` 都是原厂路径；
 *   - 分享查看按 `locatetime/deviceState/lon` 解析，契约是 `lastPosAt/onlineStatus/lng`；
 *   - 轨迹时间用 `YYYY/MM/DD HH:mm:ss`，契约要 `YYYY-MM-DD HH:mm:ss`，且没传 limit；
 *   - 到处做 WGS84↔GCJ02 换算，而契约出入参已经是 GCJ-02（多转一次偏 600 米）。
 */
import moment from 'moment';
import * as deviceApi from '../../api/device.js';
import * as geoApi from '../../api/geo.js';
import * as trackApi from '../../api/track.js';
import * as reportApi from '../../api/report.js';
import * as shareApi from '../../api/share.js';
import * as cmdApi from '../../api/command.js';
import { normalizeDeviceDetail, normalizeDeviceNow } from '../../adapters/device.js';
import { toVendorFuncs } from '../../adapters/funcs.js';
import { toNum } from '../../adapters/num.js';

// 契约 8.3：轨迹时间跨度上限 7 天、单次点数上限 10000。超限后端返回 10001，
// 前端先拦一道，避免用户选完一个月再被打回来。
const TRACK_MAX_DAYS = 7;
const TRACK_LIMIT = 10000;
const TIME_FMT = 'YYYY-MM-DD HH:mm:ss';

const state = {
  terminalsPage: 1,
  selectedTerminal: null,
  lastSelectedId: '',
  lastTextLocation: '',
  funcDeviceId: '',
  // 6.1 的 capabilities 原样留着（新页面按语义字段判定），terminalFuncs 是给编译后的
  // 老模板用的厂商 id 数组——两者由 setDeviceFun 一起算出来，见 adapters/funcs.js
  terminalCaps: null,
  // null = 还没拉过 8.6.1（告警入口按默认值显示）；[] = 拉过了但这台设备没有可配项
  terminalAlarmCodes: null,
  terminalFuncs: null,
  simState: false,
  bindDeviceState: true,
  simData: null,
  activationState: 0,
  infoBoxShow: false,
  valueAddedConfig: {},
  defaultPasswordNotice: false,
  unBindMarkerId: null,
  // 6.7 预置图标表。原版挂在 appConfig.icons 上（厂商把它塞进了那个"应用配置"大对象），
  // 契约里它是设备域的接口，放这里；页面用 getter 取，加载前是空数组而不是 undefined
  deviceIcons: [],
};

const mutations = {
  setTerminalsPage(s, v) {
    s.terminalsPage = v;
  },
  setSelectedDevice(s, d) {
    if (!d) return;
    s.lastTextLocation = d.TextLocation || s.lastTextLocation;
    s.selectedTerminal = { ...d, TextLocation: d.TextLocation || s.lastTextLocation };
    s.lastSelectedId = d.id;
  },
  clearSelectedDevice(s) {
    s.selectedTerminal = null;
  },
  clearDevices(s) {
    s.terminalsPage = 1;
    s.lastTextLocation = '';
  },
  clearlastDevice(s) {
    s.lastSelectedId = '';
  },
  setFuncDeviceId(s, v) {
    s.funcDeviceId = v;
  },
  /**
   * 入参是 6.1 的 capabilities 对象。老模板要的是 `[{id}]`，这里顺手翻译一份；
   * 直接把 capabilities 塞给 terminalFuncs 会让 `funcShowHandler` 里的 `.some` 炸掉。
   */
  setDeviceFun(s, caps) {
    s.terminalCaps = caps || null;
    s.terminalFuncs = toVendorFuncs(caps, s.terminalAlarmCodes);
  },
  /** 8.6.1 告警配置回来后回写：告警类入口改按这台设备实际可配的码显隐。 */
  setDeviceAlarmCodes(s, codes) {
    s.terminalAlarmCodes = codes || null;
    s.terminalFuncs = toVendorFuncs(s.terminalCaps, s.terminalAlarmCodes);
  },
  setSimState(s, v) {
    s.simState = v;
  },
  setBindDeviceState(s, v) {
    s.bindDeviceState = v;
  },
  setSimData(s, v) {
    s.simData = v;
  },
  setActivationState(s, v) {
    s.activationState = v;
  },
  setInfoBoxShow(s, v) {
    s.infoBoxShow = v;
  },
  setValueAddedConfig(s, v) {
    s.valueAddedConfig = v || {};
  },
  setDefaultPasswordNotice(s, v) {
    s.defaultPasswordNotice = v;
  },
  setUnBindMarkerId(s, v) {
    s.unBindMarkerId = v || null;
  },
  /**
   * 6.7 图标表 → 页面在用的形状。
   *
   * 契约给 `{iconId, iconName, iconUrl, rotatable}`，页面（含 getTerminalIconCode）
   * 按 `{id, code, rotate}` 用，并且按 code 拼 CDN 路径。这里两套都给：`url` 是
   * 后端下发的完整地址（新代码优先用它），`code` 保留给还在拼路径的老页面。
   */
  setDeviceIcons(s, v) {
    var CODE_MAP = {
      ebike: 'motor',
      motorcycle: 'motor',
      cargo: 'truck',
    };
    s.deviceIcons = (v || []).map((it) => ({
      id: it.iconId,
      code: CODE_MAP[it.iconId] || it.iconId,
      name: it.iconName,
      url: it.iconUrl,
      rotate: !!it.rotatable,
    }));
  },
};

/** 把页面传来的日期/区间归一成契约要求的时间字符串。 */
function timeRangeOf(date) {
  if (date && typeof date === 'object' && (date.strat || date.start || date.end)) {
    // 原厂拼写是 strat（typo），页面还在用，两种都接
    const from = date.strat || date.start;
    return [moment(from).format(TIME_FMT), moment(date.end).format(TIME_FMT)];
  }
  const day = moment(date).format('YYYY-MM-DD');
  return [`${day} 00:00:00`, `${day} 23:59:59`];
}

/**
 * 轨迹点 → 分段结构。按"这一段是否在动"切段：speed>0 走绿色、静止走蓝色，
 * 与原厂 color 语义一致。段内字段用页面在读的那套名字。
 *
 * 坐标不换算：契约与地图组件同为 GCJ-02。`lon/lat` 与 `*WGS84` 两个字段给同一个值，
 * 是为了不改页面（页面把 `*WGS84` 传给逆地理编码，而 13.1 入参也是 GCJ-02）。
 */
function toTraceSegments(points) {
  const segments = [];
  let cur = null;
  for (const p of points) {
    const moving = toNum(p.speed) > 0;
    const color = moving ? 'green' : 'blue';
    if (!cur || cur.color !== color) {
      cur = { color, items: [] };
      segments.push(cur);
    }
    cur.items.push({
      lon: p.lng,
      lat: p.lat,
      // 定位方式文案后端已给（posTypeName），前端不再按数字索引猜——原厂那张
      // ["GPS+北斗","基站","Wi-Fi","Wi-Fi"] 表的下标顺序与契约 posType 并不一致
      posTypeName: p.posTypeName || '',
      lbsMode: toNum(p.posType),
      direction: toNum(p.direct),
      deviceTime: p.posAt,
      speed: toNum(p.speed),
    });
  }
  return segments;
}

/** 停留报表 → 轨迹页的停留点标注。坐标已是 GCJ-02。 */
function toDetentionAreas(stayRes) {
  if (!stayRes || !stayRes.succeeded) return [];
  return ((stayRes.data && stayRes.data.items) || []).map((it) => ({
    id: it.id,
    lon: it.lng,
    lat: it.lat,
    startTime: it.startedAt,
    endTime: it.endedAt,
    // 停留时长后端给秒，页面按分钟展示
    duration: toNum(it.duration),
  }));
}

/** 行程报表的 distance（公里）求和 = 这段时间的总里程。 */
function sumTripDistance(tripRes) {
  if (!tripRes || !tripRes.succeeded) return 0;
  return ((tripRes.data && tripRes.data.items) || []).reduce(
    (sum, it) => sum + toNum(it.distance),
    0
  );
}

const actions = {
  /** 1.18 我的设备统计（原 `/terminal/statistics`）。 */
  async GetDeviceStatistics({ rootState }) {
    // 1.18 是账号级统计，设备身份访问会 21010。设备登录名下恒为 1 台，
    // 在线与否看它自己 —— 直接按 1.10 的实时态算，不打那个接口
    if (rootState.account.identityType === 'device') {
      const cur = await deviceApi.currentDevice({ loading: false });
      const online = cur.succeeded && cur.data && toNum(cur.data.onlineStatus) === 1 ? 1 : 0;
      return {
        succeeded: true,
        code: 0,
        data: {
          total: 1, online, offline: 1 - online, inactive: 0, expired: 0,
          totalCount: 1, onlineCount: online, offlineCount: 1 - online,
          unusedCount: 0, expiredCount: 0,
        },
      };
    }
    const res = await deviceApi.myDeviceStatistics();
    if (res.succeeded && res.data) {
      // 契约 1.18 给 total/online/offline/inactive/expired，设备列表页读的是
      // totalCount/onlineCount/... 两套名字都挂上，否则页签会显示"全部(undefined)"。
      // 注意 online+offline 才是全部，inactive/expired 是另一个维度的计数
      // （待激活设备同时也计进 offline），四个数字相加不等于 total。
      const d = res.data;
      res.data = {
        ...d,
        totalCount: toNum(d.total),
        onlineCount: toNum(d.online),
        offlineCount: toNum(d.offline),
        unusedCount: toNum(d.inactive),
        expiredCount: toNum(d.expired),
      };
    }
    return res;
  },

  /**
   * 逆地理编码：把选中设备的坐标转成地址文案。
   * 入参是 GCJ-02（契约 13.1 与地图组件同一套坐标），不做换算。
   */
  async GetGeocode(_ctx, payload) {
    const lat = toNum(payload && payload.latitude);
    const lng = toNum(payload && payload.longitude);
    // (0,0) 是"设备未定位"的表现，查地址只会得到误导性结果，后端也会拒（10001）
    if (!lat || !lng) return null;
    const res = await geoApi.regeo({ lat, lng });
    if (res.succeeded && res.data) {
      res.address = res.data.formattedAddress || '';
    }
    return res;
  },

  /** 选中设备的地址文案，取到后回写进 selectedTerminal.TextLocation。 */
  async GetSelectedDeviceAddress({ state: s, commit, dispatch }) {
    const d = s.selectedTerminal;
    if (!d) return null;
    const res = await dispatch('GetGeocode', { longitude: d.lon, latitude: d.lat });
    if (res && res.succeeded) {
      commit('setSelectedDevice', { ...d, TextLocation: res.address });
    }
    return res;
  },

  /**
   * 8.3 历史轨迹 + 8.5 停留/行程（轨迹页要三样东西：线、停留点、总里程）。
   *
   * 契约用 limit + truncated（不是 page/pageSize）：轨迹是连续序列，翻页对地图绘制
   * 没有意义，需要的是"完整轨迹"或"明确知道数据不完整"。
   *
   * 返回体组装成页面在用的两个字段：
   *   - `traceItems`：**分段**结构 `[{color, items:[...]}]`。按"是否在动"分段（原厂用
   *     color 区分行驶/静止），静止段画蓝、行驶段画绿；
   *   - `pointMileageItems`：`{totalMileage, detentionAreas}`，停留点来自停留报表、
   *     总里程由行程报表的 distance 求和。原厂是一个接口一次给全，契约拆成了三个。
   */
  async GetDeviceTrack(_ctx, payload) {
    const deviceId = payload.deviceId || payload.terminalId;
    const [startTime, endTime] = timeRangeOf(payload.date);
    if (moment(endTime).diff(moment(startTime), 'days') > TRACK_MAX_DAYS) {
      return { succeeded: false, code: 10001, msg: `时间跨度不能超过 ${TRACK_MAX_DAYS} 天`, data: null };
    }
    const startDate = moment(startTime).format('YYYY-MM-DD');
    const endDate = moment(endTime).format('YYYY-MM-DD');

    const [trackRes, stayRes, tripRes] = await Promise.all([
      trackApi.track(deviceId, {
        startTime,
        endTime,
        limit: TRACK_LIMIT,
        posTypes: payload.posTypes,
        minSpeed: payload.minSpeed,
      }),
      // 停留点与总里程属于"锦上添花"：拉不到不该让轨迹画不出来，所以失败按空处理
      reportApi.stays(deviceId, { startDate, endDate, page: 1, pageSize: 50 }),
      reportApi.trips(deviceId, { startDate, endDate, page: 1, pageSize: 50 }),
    ]);
    if (!trackRes.succeeded) return trackRes;

    const points = (trackRes.data && trackRes.data.items) || [];
    trackRes.data = {
      ...trackRes.data,
      traceItems: toTraceSegments(points),
      pointMileageItems: {
        totalMileage: sumTripDistance(tripRes),
        detentionAreas: toDetentionAreas(stayRes),
      },
    };
    // 截断时要让用户知道看到的不是全部（契约给了 truncated，别悄悄吞掉）
    trackRes.truncated = !!(trackRes.data && trackRes.data.truncated);
    return trackRes;
  },

  /** 8.3b 日历打点：某月哪几天有数据（原 `/{type}/dates`）。 */
  GetListDates(_ctx, payload) {
    return trackApi.dataDates(payload.deviceId || payload.terminalId, {
      type: payload.type || 'track',
      month: payload.month || moment(payload.date).format('YYYY-MM'),
    });
  },

  /**
   * 设备进入功能页时的初始化：VIP 状态 + SIM 卡 + 默认密码提醒。
   * 能力开关不再单独请求（原 `/terminal/funcs/{id}`）——6.1 详情里的 capabilities
   * 就是它，随详情一起拿到。
   */
  async GetDeviceInit({ commit, state: s }, payload) {
    const deviceId = payload && (payload.id || payload.deviceId);
    if (!deviceId || s.funcDeviceId === deviceId) return null;

    const detailRes = await deviceApi.detail(deviceId);
    if (!detailRes.succeeded) return detailRes;
    const detail = normalizeDeviceDetail(detailRes.data);
    commit('setFuncDeviceId', deviceId);
    // 先清掉上一台设备的告警码，否则新设备会沿用旧设备的告警入口显隐
    commit('setDeviceAlarmCodes', null);
    commit('setDeviceFun', detail.capabilities);
    // 出厂默认密码提醒由后端判定（6.1 isDefaultPassword），前端不再自己比密码
    commit('setDefaultPasswordNotice', detail.isDefaultPassword);

    const vipRes = await deviceApi.vip(deviceId);
    if (vipRes.succeeded && vipRes.data) {
      commit('setValueAddedConfig', vipRes.data);
      // activationState：0 无增值服务 / 1 生效中 / 2 已过期（remainDays=-1 表示永久）
      const remain = toNum(vipRes.data.remainDays);
      commit('setActivationState', vipRes.data.hasVip ? (remain === 0 ? 2 : 1) : 0);
    } else {
      commit('setActivationState', 0);
    }

    const simRes = await deviceApi.sim(deviceId);
    if (simRes.succeeded) {
      // 无流量购买记录时字段全 0/null，是正常态（契约 7.1），不是错误
      commit('setSimState', !!(simRes.data && simRes.data.iccid));
      commit('setSimData', simRes.data || null);
    }
    return detailRes;
  },

  /** 6.1 设备档案。 */
  async GetDeviceInfo(_ctx, payload) {
    const res = await deviceApi.detail(payload.deviceId || payload.deviceID, {
      loading: !!payload.loading,
    });
    if (res.succeeded) res.view = normalizeDeviceDetail(res.data);
    return res;
  },

  /** 7.2.1 生成分享链接。 */
  AddSharePosition(_ctx, payload) {
    return shareApi.create(payload.deviceId, { expireHours: payload.duration || 24 });
  },

  /** 7.2.3 撤销该设备全部未过期分享。 */
  RevokeSharePosition(_ctx, payload) {
    return shareApi.revoke(payload.deviceId);
  },

  /**
   * 分享记录（分享者/有效期等）。
   *
   * 契约里公开分享**只有一个接口** `GET /share/{token}`（7.2.2），没有单独的"分享记录"
   * 端点——原厂那两个调用打的是同一个 URL。落地页先用它显示分享信息、再显示位置，
   * 所以这里保留成同一个请求的别名，而不是删掉动作（删掉会让落地页报
   * "unknown local action type"，冒烟已经抓到过一次）。
   */
  GetSharePositionRecord(_ctx, payload) {
    return shareApi.view(payload.code);
  },

  /**
   * 7.2.2 公开查看分享位置（无需登录）。
   * 契约字段：deviceName/onlineStatus/powerPercent/lng/lat/lastPosAt/speed/direct，
   * 与原厂的 locatetime/deviceState/lon 完全不同。
   */
  async GetSharePosition(_ctx, payload) {
    const res = await shareApi.view(payload.code);
    if (res.succeeded && res.data) {
      res.view = normalizeDeviceNow({ ...res.data, deviceId: res.data.deviceName || '' });
    }
    return res;
  },

  /** 6.5 解绑设备。 */
  async UnBindTerminal({ state: s, commit, dispatch }, payload) {
    const deviceId = payload.deviceId || payload.id;
    const res = await deviceApi.unbind({ deviceId });
    if (res.succeeded) {
      commit('setUnBindMarkerId', deviceId);
      commit('setTerminalsPage', 1);
      if (deviceId === s.lastSelectedId) {
        commit('clearlastDevice');
        commit('setFuncDeviceId', '');
        commit('clearSelectedDevice');
      }
      await dispatch('terminal/GetTerminalInfos', {}, { root: true });
    }
    return res;
  },

  /** 6.4 绑定设备（设备号 + 设备登录密码，DR-11）。 */
  async BindTerminal({ commit, dispatch }, payload) {
    const res = await deviceApi.bind({
      deviceId: payload.deviceId || payload.terminalNo,
      password: payload.password,
      deviceName: payload.deviceName || '',
    });
    if (res.succeeded) {
      commit('setTerminalsPage', 1);
      await dispatch('terminal/GetTerminalInfos', {}, { root: true });
    }
    return res;
  },

  /** 6.6 改设备名称。 */
  SetDeviceInfo(_ctx, payload) {
    return deviceApi.rename({
      deviceId: payload.deviceId || payload.terminalId,
      deviceName: payload.deviceName,
    });
  },

  /**
   * 6.7 预置图标库 + 更换图标（原 `/terminal/icon` 的 iconType 换成 iconId）。
   * 图标表一个租户一份、几乎不变，取到就缓存，页面不必各自请求。
   */
  async GetDeviceIcons({ state: s, commit }) {
    if (s.deviceIcons.length) return null;
    const res = await deviceApi.icons();
    if (res.succeeded) commit('setDeviceIcons', (res.data && res.data.items) || []);
    return res;
  },
  SetTerminalIcon(_ctx, payload) {
    return deviceApi.setIcon({
      deviceId: payload.deviceId || payload.terminalId,
      iconId: payload.iconId || payload.iconType,
    });
  },

  /**
   * 定位方式设置（页面上是"定位过滤"）。
   *
   * 原厂 `PUT /terminal/filter` 有 lbs/wifi/mix 六个开关；本平台的设备协议**只有
   * `I_GPS_WIFI` 一条指令、两个档位**（1 GPS 优先 / 2 WIFI 优先），六选项收敛为二选一
   * （见 doc/design/sound-security-and-lbs.md：平台侧没有可下发的基站开关）。
   * 该指令仅 HLXT 协议设备支持，是否可用看 6.1 的 `capabilities.posPriority`。
   */
  SetTerminalFilter(_ctx, payload) {
    const deviceId = payload.deviceId || payload.terminalId;
    // 兼容页面既有入参：优先取显式 level，其次按 Wifi 开关推断
    const level = payload.level || (payload.Wifi || payload.wifi ? 2 : 1);
    return cmdApi.send(deviceId, { cmdCode: cmdApi.CMD.POS_PRIORITY, params: { level } });
  },

  /** 11.3 设备 VIP 状态。 */
  async GetValueAdded({ commit }, payload) {
    const res = await deviceApi.vip(payload.deviceId || payload.terminalId, {
      categoryId: payload.categoryId,
    });
    if (res.succeeded) commit('setValueAddedConfig', res.data);
    return res;
  },
};

const getters = {
  /** 图标表：页面按 iconId 查图标，未加载时是空数组（不是 undefined）。 */
  deviceIcons: (s) => s.deviceIcons,
};

export default { namespaced: true, state, mutations, actions, getters };
