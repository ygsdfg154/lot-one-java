/**
 * 订单、支付、退款（契约 11.2 / 11.5 / 11.6）。
 *
 * 重写自反编译产物。与契约的关键差异：
 *   - **支付是两步**：创建订单（拿 orderNo）→ 发起支付（拿 payParams）。原厂一步
 *     返回 `mchOrderInfo`，前端把两件事塞进一个动作。拆开之后用户中途放弃支付，
 *     订单仍在列表里可以继续付，而不是凭空消失；
 *   - 订单对外标识是 `orderNo`（契约不暴露自增 ID），原版用 `id`；
 *   - 金额契约给"元"，页面模型用"分"，换算集中在 adapters/order.js；
 *   - 退款是独立接口（11.6），不是订单里内嵌的 `userRefundRequests[]`；
 *   - 支付渠道走 11.5 `/pay/channels`（原 `/pay/provider`），`enabled=false` 的渠道
 *     要置灰而不是隐藏——用户得知道有这个渠道、只是暂时不可用。
 */
import * as orderApi from '../../api/order.js';
import { normalizeOrder, normalizeRefund, toPaymentArgs } from '../../adapters/order.js';
import { toNum } from '../../adapters/num.js';
import { orderStatus as orderStatusText } from '../../common/utils.js';

const PAGE_SIZE = 20;

const state = {
  currentOrder: null,
  orderList: [],
  status: 'loadmore',
  page: 1,
  limit: PAGE_SIZE,
  listNeedRefresh: true,
  // 11.5 支付渠道（含 enabled，前端据此置灰）
  providerList: [],
};

const mutations = {
  initState(s) {
    s.orderList = [];
    s.status = 'loadmore';
    s.page = 1;
  },
  setListNeedRefresh(s, v) {
    s.listNeedRefresh = !!v;
  },
  setList(s, { list, count }) {
    // 按 orderNo 去重（原版不去重，下拉刷新两次会出双份）
    const seen = new Set(s.orderList.map((it) => it.orderNo));
    const incoming = (list || []).filter((it) => !seen.has(it.orderNo));
    s.orderList = s.orderList.concat(incoming);
    s.page += 1;
    s.status = s.orderList.length < count ? 'loadmore' : 'nomore';
    s.listNeedRefresh = false;
  },
  setStatus(s, v) {
    s.status = v;
  },
  setCurrent(s, v) {
    s.currentOrder = v;
  },
  setProviderList(s, v) {
    s.providerList = v || [];
  },
};

/** 订单 + 状态文案。列表与详情都要，抽出来免得两处各写一遍。 */
function withStatusText(dto) {
  const vm = normalizeOrder(dto);
  // 优先用后端给的中文名；后端没给再用本地映射兜底
  vm.orderStatus = vm.statusName || orderStatusText(vm.status);
  return vm;
}

const actions = {
  /** 11.2.4 订单列表（分页追加）。 */
  async GetTopupOrderPage({ state: s, commit }, payload = {}) {
    if (s.listNeedRefresh) commit('initState');
    if (s.status === 'nomore') return null;
    commit('setStatus', 'loading');
    const res = await orderApi.list({
      page: s.page,
      pageSize: s.limit,
      orderStatus: payload.orderStatus,
      deviceId: payload.deviceId || payload.terminalId,
    });
    if (!res.succeeded) {
      commit('setStatus', 'nomore');
      return res;
    }
    const data = res.data || {};
    commit('setList', {
      list: (data.items || []).map(withStatusText),
      count: toNum(data.total),
    });
    return res;
  },

  /**
   * 11.2.4 某台设备的订单（充值记录页）。
   *
   * `data.list` / `data.count` 是页面在读的名字（原厂分页信封），契约给 `items`/`total`。
   * 两套都挂上：`data.list` 给现有页面，`res.list` 给新代码，省得页面各自转一次。
   */
  async GetDeviceOrderPage(_ctx, payload = {}) {
    const res = await orderApi.list({
      page: payload.page || 1,
      pageSize: payload.limit || PAGE_SIZE,
      deviceId: payload.terminalId || payload.deviceId,
    });
    if (res.succeeded && res.data) {
      const list = (res.data.items || []).map(withStatusText);
      const count = toNum(res.data.total);
      res.data = { ...res.data, list, count };
      res.list = list;
      res.count = count;
    }
    return res;
  },

  /**
   * 下单并发起支付（契约两步，对调用方仍是一次）。
   *
   * 返回 `{order, payChannel, payParams, paymentArgs}`：`paymentArgs` 已经是
   * `uni.requestPayment` 的入参形状。第二步失败时**订单仍然有效**，如实把订单带回，
   * 页面可以提示"订单已创建，去订单列表继续支付"，而不是让用户以为下单失败又下一单。
   */
  async CreateCardPackageOrderAuth({ commit }, payload = {}) {
    const createRes = await orderApi.create({
      productType: payload.productType || 1,
      productId: payload.productId,
      deviceId: payload.terminalId || payload.deviceId,
      payChannel: payload.payChannel || 1,
    });
    if (!createRes.succeeded) return createRes;

    const order = withStatusText(createRes.data);
    commit('setCurrent', order);

    const payRes = await orderApi.pay(order.orderNo);
    if (!payRes.succeeded) {
      // 订单已经落库，把它带回去让页面能引导用户继续支付
      payRes.order = order;
      return payRes;
    }
    const payChannel = toNum((payRes.data && payRes.data.payChannel) || order.provider);
    const payParams = (payRes.data && payRes.data.payParams) || null;
    return {
      ...payRes,
      order,
      payChannel,
      payParams,
      paymentArgs: toPaymentArgs(payChannel, payParams),
    };
  },

  /** 11.2.3 订单状态（支付后轮询）。轮询时不要 loading 遮罩。 */
  async GetCardPackageOrderState({ commit }, payload) {
    const orderNo = payload && (payload.orderNo || payload.id || payload);
    const res = await orderApi.detail(orderNo);
    if (res.succeeded) {
      res.data = withStatusText(res.data);
      commit('setCurrent', res.data);
    }
    return res;
  },

  /** 11.5 支付渠道列表。 */
  async GetPayProvider({ commit }) {
    const res = await orderApi.payChannels();
    if (res.succeeded) commit('setProviderList', (res.data && res.data.items) || []);
    return res;
  },

  /**
   * 11.2.3 订单详情 + 11.6 退款进度。
   *
   * 页面读订单里的 `userRefundRequests[]`（原厂内嵌），契约把退款拆成独立接口，
   * 这里查回来包成数组塞进去——一个订单最多一张在处理中的单，所以数组最多一项。
   */
  async GetTopupById({ commit }, payload = {}) {
    const orderNo = payload.orderNo || payload.id;
    const res = await orderApi.detail(orderNo, { loading: true });
    if (!res.succeeded) return res;
    const order = withStatusText(res.data);

    const refundRes = await orderApi.refundStatus(orderNo);
    // 没有退款申请是正常态（后端返回空 data 或业务码），不当错误处理
    if (refundRes.succeeded && refundRes.data && refundRes.data.id) {
      order.userRefundRequests = [normalizeRefund(refundRes.data)];
    }
    res.data = order;
    commit('setCurrent', order);
    return res;
  },

  /** 11.2.5 取消订单（仅待支付可取消）。 */
  CancelOrder(_ctx, payload) {
    const orderNo = payload && (payload.orderNo || payload.id || payload);
    return orderApi.cancel(orderNo);
  },

  /**
   * 11.6 提交退款申请。页面传的 `requestFee` 是**分**，契约收**元**。
   * `orderId` 沿用页面叫法，值实际是 orderNo。
   */
  SendRefund(_ctx, payload = {}) {
    const orderNo = payload.orderNo || payload.orderId;
    const feeCent = toNum(payload.requestFee);
    return orderApi.requestRefund(orderNo, {
      // 不传或 ≤0 = 全额退，交给后端按订单实付算，前端不自己推
      requestFee: feeCent > 0 ? feeCent / 100 : undefined,
      refundReason: payload.refundReason,
      contactName: payload.contactName,
      contactTel: payload.contactTel,
      allowCall: payload.allowCall,
    });
  },
};

export default { namespaced: true, state, mutations, actions };
