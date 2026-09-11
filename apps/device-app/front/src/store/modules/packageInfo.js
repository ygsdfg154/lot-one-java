/**
 * 产品与套餐（契约 7.1 SIM / 11.1 产品 / 11.3 设备 VIP）。
 *
 * 重写自反编译产物。原版 `GetSimInfo` 与 `GetSimCardPackage` 打的是同一个接口
 * （`/devices/{id}/sim`）——前者要卡信息、后者要"可买的流量包"，是两件事：
 * 可买的产品在 11.1.2 `/traffic/products`。
 */
import * as deviceApi from '../../api/device.js';
import * as orderApi from '../../api/order.js';

const state = {
  // 11.1.3 VIP 分类树（增值服务页左侧分类），一次拉取够用
  vipCategories: [],
};

const mutations = {
  setVipCategories(s, v) {
    s.vipCategories = v || [];
  },
};

const actions = {
  /** 7.1 SIM 卡信息（无购买记录时流量字段为 0，是正常态不是错误）。 */
  GetSimInfo(_ctx, payload = {}) {
    return deviceApi.sim(payload.deviceId || payload.iccid);
  },

  /** 11.1.2 可购买的流量包产品（原版误打成 `/sim`，那是"卡现状"不是"能买什么"）。 */
  GetSimCardPackage() {
    return orderApi.trafficProducts();
  },

  /** 11.1.1 VIP 套餐列表；categoryId 过滤某个分类。 */
  GetPackage(_ctx, payload = {}) {
    return orderApi.vipProducts({ categoryId: payload && payload.categoryId });
  },

  /** 11.1.3 VIP 分类树。 */
  async GetVipCategories({ state: s, commit }) {
    if (s.vipCategories.length) return null;
    const res = await orderApi.vipCategories();
    if (res.succeeded) commit('setVipCategories', (res.data && res.data.items) || []);
    return res;
  },

  /**
   * 11.3 设备当前生效的 VIP。
   *
   * `type`/`categoryId` 用于按分类过滤（增值服务页按分类展示"是否已开通"）。
   * 注意粗粒度的 `hasVip` 是"名下随便挑一条"，按分类判断必须看 `items` 或带
   * `categoryId` 过滤后再看——一台设备可以同时有多个分类的服务。
   */
  GetDeviceVipTypeList(_ctx, payload = {}) {
    return deviceApi.vip(payload.terminalId || payload.deviceId, {
      categoryId: payload.categoryId || payload.type,
    });
  },
};

export default { namespaced: true, state, mutations, actions };
