/**
 * 电子围栏（契约 8.2）。
 *
 * 重写自反编译产物。原版三处与契约不符：
 *   - 坐标做了 WGS84↔GCJ02 双向换算，而契约出入参与地图组件同一套 GCJ-02，多转一次
 *     围栏中心偏 600 米左右；
 *   - 行政区围栏直连高德 `/amap/config/district`（厂商 key 暴露在前端），契约改成
 *     后端代理的 8.2.6/8.2.7，并且**不新增"行政区"围栏类型**：取到边界顶点后按多边形存；
 *   - `AddFence([body, method])` 用数组传参且自己拼 URL，改成两个语义化动作。
 */
import * as fenceApi from '../../api/fence.js';
import { toContractFence, toVendorFence } from '../../adapters/fence.js';
import { toNum } from '../../adapters/num.js';

const state = {
  // 行政区树缓存在内存 + 本地存储：一次请求几百 KB，切页面重复拉没必要。
  // 注意不缓存"边界"——边界数据量大得多，且按 adcode 现取现用即可。
  regionList: uni.getStorageSync('regionList') || [],
};

const mutations = {
  setRegionList(s, v) {
    s.regionList = v || [];
  },
};

const actions = {
  /** 8.2.1 围栏列表。页面按厂商模型渲染，这里逐条翻译。 */
  async GetUserEnclosure(_ctx, payload = {}) {
    const deviceId = payload.terminalId || payload.deviceId;
    const res = await fenceApi.list(deviceId, {
      page: payload.page || 1,
      pageSize: payload.pageSize || 10,
    });
    if (res.succeeded && res.data) {
      res.list = (res.data.items || []).map(toVendorFence);
      res.count = toNum(res.data.total);
    }
    return res;
  },

  /** 8.2.5 删除围栏。入参兼容"直接传 id"与 `{fenceId}`。 */
  DeleteFence(_ctx, payload) {
    const id = payload && (payload.fenceId || payload.id || payload);
    return fenceApi.remove(id);
  },

  /** 8.2.2 围栏详情。 */
  async FenceDetails(_ctx, payload) {
    const id = payload && (payload.fenceId || payload.id || payload);
    const res = await fenceApi.detail(id);
    if (res.succeeded && res.data) {
      // 8.2.2 返回 {fence, bindDeviceIds}，页面只认围栏本体；绑定设备另挂一个字段
      res.bindDeviceIds = res.data.bindDeviceIds || [];
      res.data = toVendorFence(res.data.fence || res.data);
    }
    return res;
  },

  /**
   * 新建 / 更新围栏。`payload` 兼容原版的 `[body, method]` 数组形式。
   *
   * 行政区围栏（type=3）在这里落地成多边形：先用 8.2.7 把 adcode 换成边界顶点。
   * 取不到边界（22003 地图 key 未配置）时如实返回错误，不静默存成一个空围栏。
   */
  async AddFence(_ctx, payload) {
    const [vm, method] = Array.isArray(payload) ? payload : [payload, payload.method];
    const deviceId = vm.terminalId || vm.deviceId;
    const isDistrict = Number(vm.type) === 3;

    let points = (vm.fenceData && vm.fenceData.points) || [];
    if (isDistrict) {
      const adcode = ((vm.fenceData && vm.fenceData.adcodes) || [])[0];
      if (!adcode) return { succeeded: false, code: 10001, msg: '请选择行政区', data: null };
      const bRes = await fenceApi.regionBoundary(adcode);
      if (!bRes.succeeded) return bRes; // 22003：行政区围栏未开放，如实透出
      points = (bRes.data && bRes.data.points) || [];
    }

    const body = toContractFence(vm, points);
    // 多边形顶点数由契约限定 3~100，前端先拦一道，省一次往返
    if (body.fenceShapeType === 2 && (!body.points || body.points.length < 3)) {
      return { succeeded: false, code: 10001, msg: '多边形围栏至少需要 3 个顶点', data: null };
    }

    // 有 fenceId 就是改（页面传 method 只是历史包袱，id 才是判据）
    const fenceId = vm.fenceId || vm.id;
    const isUpdate = String(method).toUpperCase() === 'PUT' || (!!fenceId && Number(fenceId) > 0);
    return isUpdate ? fenceApi.update(fenceId, body) : fenceApi.create(deviceId, body);
  },

  /**
   * 8.2.7 行政区边界。原版这里直接打高德的 district 接口再自己 parse `polyline`
   * 字符串（`;` 与 `|` 分隔、还要按 `|` 拆多段），现在后端已经解析成顶点数组。
   */
  async GetCodeRegion(_ctx, payload) {
    const adcode = payload && (payload.adcode || payload);
    const res = await fenceApi.regionBoundary(adcode);
    if (res.succeeded && res.data) {
      res.points = (res.data.points || []).map((p) => ({ lat: p.lat, lng: p.lng }));
    }
    return res;
  },

  /** 8.2.6 行政区树。已缓存则不重复请求；22003 时保持空列表，页面提示未开放。 */
  async GetAllRegion({ state: s, commit }) {
    if (s.regionList.length) return null;
    const res = await fenceApi.regionTree();
    if (res.succeeded && res.data) {
      const items = res.data.items || [];
      commit('setRegionList', items);
      uni.setStorageSync('regionList', items);
    }
    return res;
  },
};

export default { namespaced: true, state, mutations, actions };
