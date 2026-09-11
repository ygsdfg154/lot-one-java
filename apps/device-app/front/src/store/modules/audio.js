/**
 * 声音安防 — 音频列表与三种模式开关（契约 7.3 + 9.3 的 audio 开关）。
 *
 * 重写自反编译产物。原厂三种模式分别打 `/record/auto`、`/record/always`、
 * `/record/status`；契约收口到 7.3.2 一个接口，用 `mode` 选指令码：
 *
 *   - **声控** voice → `S_AUDIO_AL`（`AMIC,2/0`），协议已接入；
 *   - **持续** always → `S_AUDIO_ALWAYS`、**定时** timed → `I_AUDIO_TIMED`：
 *     指令码与参数已在 contracts/commands/registry.yaml 定稿，**协议帧体待厂商文档**。
 *     下发会被网关 REJECTED 并回 ret=12，页面按"设备不支持"提示——不静默成功
 *     （用户以为开了持续拾音、实际什么都没发生，比报错更糟）。
 *
 * 另外三处按契约纠正：
 *   - 列表按日期筛选交给后端（7.3.1 startTime/endTime），原版把日期算出来却没传，
 *     实际拉的是"最近 N 条"，日期选择器是摆设；
 *   - 字段改名：`readFlag`→`isRead`、`fileUrl`→`url`（页面用的是后者那套名字）；
 *   - "删除"是 7.3.2c 的隐藏语义，不物理删对象存储文件（现场证据类数据）。
 */
import moment from 'moment';
import * as audioApi from '../../api/audio.js';
import * as cmdApi from '../../api/command.js';
import { toNum } from '../../adapters/num.js';

const PAGE_SIZE = 20;

const state = {
  audioList: [],
  status: 'loadmore',
  page: 1,
  limit: PAGE_SIZE,
  listNeedRefresh: true,
};

/** 7.3.1 一条音频 → 页面用的形状。 */
function normalizeAudio(it) {
  return {
    ...it,
    id: it.id,
    name: it.audioName,
    url: it.fileUrl,
    // duration 依赖 D-4，落地前恒为 0；页面据此显示"--:--"而不是 0:00
    duration: toNum(it.duration),
    isRead: !!it.readFlag,
    createTime: it.createdAt,
    // 播放态图标：0 未播 1 播放中 2 暂停，由 setListPlay 轮转
    iconShow: 0,
  };
}

const mutations = {
  initState(s) {
    s.audioList = [];
    s.status = 'loadmore';
    s.page = 1;
  },
  setListNeedRefresh(s, v) {
    s.listNeedRefresh = !!v;
  },
  setList(s, { list, count, type }) {
    const incoming = list || [];
    if (type === 'refresh') {
      // 下拉刷新：新数据插到前面，按 id 去重（原版用 concat 不去重，刷两次出双份）
      const ids = new Set(incoming.map((it) => it.id));
      s.audioList = incoming.concat(s.audioList.filter((it) => !ids.has(it.id)));
    } else {
      const ids = new Set(s.audioList.map((it) => it.id));
      s.audioList = s.audioList.concat(incoming.filter((it) => !ids.has(it.id)));
    }
    s.page += 1;
    // 用 total 判断有没有下一页，不用"这页是否满 20 条"（末页刚好 20 条会误判成还有）
    s.status = s.audioList.length < count ? 'loadmore' : 'nomore';
    s.listNeedRefresh = false;
  },
  setListPlay(s, id) {
    if (!id) {
      s.audioList = s.audioList.map((it) => ({ ...it, iconShow: 0 }));
      return;
    }
    s.audioList = s.audioList.map((it) =>
      it.id === id ? { ...it, iconShow: (it.iconShow + 1) % 3 } : it
    );
  },
  setListRead(s, id) {
    s.audioList = s.audioList.map((it) => (it.id === id ? { ...it, isRead: true } : it));
  },
  setListDelete(s, id) {
    s.audioList = s.audioList.filter((it) => it.id !== id);
  },
  setStatus(s, v) {
    s.status = v;
  },
};

const actions = {
  /** 7.3.1 音频列表。date 传"YYYY-MM-DD"时按当天筛选（交给后端）。 */
  async GetAudioList({ state: s, commit }, payload = {}) {
    if (s.listNeedRefresh) commit('initState');
    if (s.status === 'nomore' && payload.type !== 'refresh') return null;
    commit('setStatus', 'loading');

    const deviceId = payload.terminalId || payload.deviceId;
    const day = payload.date ? moment(payload.date).format('YYYY-MM-DD') : '';
    const res = await audioApi.list(deviceId, {
      page: s.page,
      pageSize: payload.limit || s.limit,
      startTime: day ? `${day} 00:00:00` : undefined,
      endTime: day ? `${day} 23:59:59` : undefined,
    });
    if (!res.succeeded) {
      commit('setStatus', 'nomore');
      return res;
    }
    const data = res.data || {};
    commit('setList', {
      list: (data.items || []).map(normalizeAudio),
      count: toNum(data.total),
      type: payload.type,
    });
    return res;
  },

  /** 7.3.2 开启声控声音安防（原"定时/手动拾音"入口也归到这里）。 */
  SendAudioCommand(_ctx, payload = {}) {
    return audioApi.trigger(payload.deviceId, {
      duration: payload.timeValue || 60,
      open: true,
    });
  },

  /** 7.3.2 声控开关。state=true 开、false 关（关闭走 AMIC,0）。 */
  AtouSendAudioCommand(_ctx, payload = {}) {
    return audioApi.trigger(payload.deviceId, { open: !!payload.state });
  },

  /**
   * 7.3.2 持续声音安防（mode=always → S_AUDIO_ALWAYS）。
   *
   * 与声控是两条独立指令：声控"有声音才录"、持续"一直录"，流量与耗电差一个数量级。
   * 协议帧体待厂商文档，届时网关回 ret=12，页面按"设备不支持"提示。
   */
  AlwaysSendAudioCommand(_ctx, payload = {}) {
    return audioApi.trigger(payload.deviceId, { mode: 'always', open: !!payload.state });
  },

  /** 7.3.2 定时声音安防（mode=timed → I_AUDIO_TIMED）。 */
  TimedSendAudioCommand(_ctx, payload = {}) {
    return audioApi.trigger(payload.deviceId, {
      mode: 'timed',
      open: !!payload.state,
      duration: payload.duration,
      intervalSeconds: payload.intervalSeconds,
    });
  },

  /**
   * 声控当前状态：9.3.1 的 `audio` 开关（三态）。
   * 返回 `{on, unknown}`——unknown 表示既无快照也无下发记录，页面显示"待同步"。
   */
  async GetautoStatus(_ctx, payload = {}) {
    const res = await cmdApi.switchStatus(payload.deviceId || payload.terminalId);
    if (!res.succeeded) return res;
    const sw = ((res.data && res.data.switches) || []).find((x) => x.switchCode === 'audio');
    res.audio = sw
      ? { on: sw.switchStatus === 'on', unknown: sw.switchStatus !== 'on' && sw.switchStatus !== 'off' }
      : { on: false, unknown: true, unavailable: true };
    return res;
  },

  /** 7.3.2b 标记已听。契约收数组，页面按单条调用。 */
  PutAudioRead({ commit }, payload = {}) {
    const id = payload.id;
    return audioApi.markRead(payload.deviceId, { audioIds: [id] }).then((res) => {
      if (res.succeeded) commit('setListRead', id);
      return res;
    });
  },

  /** 7.3.2c 删除（当前身份列表内隐藏，不物理删文件）。 */
  DeleteAudio({ commit }, payload) {
    const id = payload && (payload.id !== undefined ? payload.id : payload);
    const deviceId = payload && payload.deviceId;
    return audioApi.dismiss(deviceId, { audioIds: [id] }).then((res) => {
      if (res.succeeded) commit('setListDelete', id);
      return res;
    });
  },
};

export default { namespaced: true, state, mutations, actions };
