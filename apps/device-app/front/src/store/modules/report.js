/**
 * 报表：停留（reportType 0）与行程（reportType 1）。契约 8.5。
 *
 * 重写自反编译产物。三处与契约不符：
 *   - 读 `data.list`，契约给的是 `data.items`（并且有 `total` 用来判断还有没有下一页，
 *     原版靠"这页是否满 20 条"判断，末页刚好 20 条会多请求一次并卡在 loadmore）；
 *   - 字段名：`startLng/endLng`（契约） vs `startLon/endLon`（页面）、
 *     `startedAt/endedAt` vs `startTime/endTime`；
 *   - 坐标做了 GCJ02→WGS84 换算，而契约出参与地图组件同为 GCJ-02，
 *     逆地理编码（13.1）入参也是 GCJ-02——换算一次地址就偏到隔壁街区。
 *
 * `id` 沿用原版的"下标 + 页偏移"生成：契约里停留/行程记录的 id 是 int64 字符串，
 * 而页面把 id 当 map 的 key 且详情页靠它定位，用后端 id 更稳，这里直接用后端的。
 */
import moment from 'moment';
import * as reportApi from '../../api/report.js';
import { toNum } from '../../adapters/num.js';

const PAGE_SIZE = 20;

const state = {
  reportList: [],
  page: 1,
  limit: PAGE_SIZE,
  status: 'loadmore',
  listNeedRefresh: true,
  reportItem: null,
};

const mutations = {
  initState(s) {
    s.reportList = [];
    s.status = 'loadmore';
    s.page = 1;
  },
  setListNeedRefresh(s, v) {
    s.listNeedRefresh = !!v;
  },
  SetReportInfo(s, { list, count }) {
    const ids = new Set(s.reportList.map((it) => it.id));
    s.reportList = s.reportList.concat((list || []).filter((it) => !ids.has(it.id)));
    s.page += 1;
    s.status = s.reportList.length < count ? 'loadmore' : 'nomore';
    s.listNeedRefresh = false;
  },
  setReportInfoAddress(s, { id, addressName, addressValue }) {
    s.reportList = s.reportList.map((it) =>
      it.id === id ? { ...it, [addressName]: addressValue } : it
    );
  },
  setStatus(s, v) {
    s.status = v;
  },
  setReportItem(s, v) {
    s.reportItem = v;
  },
};

/** 分钟数（页面按 `minutes.toFixed(2)` 展示），后端给的是秒。 */
function minutesOf(seconds) {
  return toNum(seconds) / 60;
}

/**
 * 行程一条 → 页面模型。
 *
 * `*WGS84` 后缀是原版留下的名字，值仍是 GCJ-02——页面拿它去调 13.1 逆地理编码，
 * 而 13.1 入参就是 GCJ-02，所以不改名也不换算，只是名字不再字面成立（注在此处）。
 */
function normalizeTrip(it) {
  return {
    ...it,
    id: it.id,
    startTime: it.startedAt,
    endTime: it.endedAt,
    minutes: minutesOf(it.duration),
    distance: toNum(it.distance),
    maxSpeed: toNum(it.maxSpeed),
    avgSpeed: toNum(it.avgSpeed),
    startLon: it.startLng,
    startLat: it.startLat,
    endLon: it.endLng,
    endLat: it.endLat,
    startLonWGS84: it.startLng,
    startLatWGS84: it.startLat,
    endLonWGS84: it.endLng,
    endLatWGS84: it.endLat,
    startAddress: '',
    endAddress: '',
  };
}

/**
 * 停留一条 → 页面模型。
 *
 * 停留只有**一个**坐标点（契约 `lat/lng`），而页面模板对停留也读 `startLon/startLat`，
 * 所以起终点填同一个点——不是复制粘贴，停留本来就没有"终点"。
 */
function normalizeStay(it) {
  return {
    ...it,
    id: it.id,
    startTime: it.startedAt,
    endTime: it.endedAt,
    minutes: minutesOf(it.duration),
    startLon: it.lng,
    startLat: it.lat,
    endLon: it.lng,
    endLat: it.lat,
    startLonWGS84: it.lng,
    startLatWGS84: it.lat,
    endLonWGS84: it.lng,
    endLatWGS84: it.lat,
    address: '',
  };
}

const actions = {
  /** 8.5 报表列表。`type` 真值 = 行程报表，假值 = 停留报表（沿用页面的 reportType）。 */
  async GetReportList({ state: s, commit }, payload = {}) {
    if (s.listNeedRefresh) commit('initState');
    if (s.status === 'nomore') return null;
    commit('setStatus', 'loading');

    const day = moment(payload.date).format('YYYY-MM-DD');
    const query = {
      startDate: day,
      endDate: day,
      page: s.page,
      pageSize: s.limit || PAGE_SIZE,
    };
    const isTrip = !!payload.type;
    const res = isTrip
      ? await reportApi.trips(payload.deviceId, query)
      : await reportApi.stays(payload.deviceId, query);

    if (!res.succeeded) {
      commit('setStatus', 'nomore');
      return res;
    }
    const data = res.data || {};
    commit('SetReportInfo', {
      list: (data.items || []).map(isTrip ? normalizeTrip : normalizeStay),
      count: toNum(data.total),
    });
    return res;
  },
};

export default { namespaced: true, state, mutations, actions };
