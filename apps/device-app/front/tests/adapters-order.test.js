import { normalizeOrder, normalizeRefund, yuanToCent, centToYuanText, toPaymentArgs } from '../src/adapters/order.js';
import orderStore from '../src/store/modules/order.js';
import * as orderApi from '../src/api/order.js';

let requests = [];
/**
 * 按 "METHOD 正则" 给出预置响应。
 *
 * 用正则而不是 includes：`/v1/orders/LO123/pay` 同时包含 `/orders` 和 `/pay`，
 * 用 includes 会被第一条规则吃掉，两步支付就测不出来了。
 */
function stub(routes) {
  requests = [];
  global.uni.request = (opts) => {
    requests.push({ url: opts.url, method: opts.method, data: opts.data });
    const hit = Object.keys(routes).find((k) => {
      const idx = k.indexOf(' ');
      const m = k.slice(0, idx);
      const pattern = k.slice(idx + 1);
      return opts.method === m && new RegExp(pattern).test(opts.url);
    });
    const body = hit ? routes[hit] : { code: 0, msg: 'ok', data: {} };
    opts.success({ statusCode: 200, header: {}, data: body });
  };
}

const orderDto = {
  orderNo: 'LO260726202101482913',
  productType: 2,
  productTypeName: '流量充值',
  productId: '1',
  productName: '1G流量包',
  deviceId: '87078795936',
  productPrice: 9.9,
  payAmount: 9.9,
  payChannel: 1,
  payChannelName: '微信支付',
  orderStatus: 1,
  orderStatusName: '已支付',
  paidAt: '2026-07-26 20:22:00',
  expiredAt: '2026-07-26 20:36:00',
  createdAt: '2026-07-26 20:21:00',
};

describe('金额单位（契约给元，页面模型用分）', () => {
  test('元 → 分用四舍五入，避免浮点尾差', () => {
    expect(yuanToCent(9.9)).toBe(990);
    expect(yuanToCent(0.1)).toBe(10); // 0.1*100 = 10.000000000000002
    expect(yuanToCent('29.90')).toBe(2990);
    expect(yuanToCent(null)).toBe(0);
  });

  test('分 → 元文案', () => {
    expect(centToYuanText(990)).toBe('9.90');
    expect(centToYuanText(0)).toBe('0.00');
  });
});

describe('normalizeOrder（契约 11.2.3）', () => {
  test('id 取 orderNo —— 契约不暴露自增 ID，页面拿 id 只能用它查接口', () => {
    const vm = normalizeOrder(orderDto);
    expect(vm.id).toBe('LO260726202101482913');
    expect(vm.orderNo).toBe('LO260726202101482913');
  });

  test('金额换成分、渠道与状态换成页面在用的字段名', () => {
    const vm = normalizeOrder(orderDto);
    expect(vm.totalFee).toBe(990); // 模板里是 `.01 * totalFee`
    expect(vm.provider).toBe(1);
    expect(vm.providerName).toBe('微信支付');
    expect(vm.status).toBe(1);
    expect(vm.description).toBe('1G流量包');
    expect(vm.createTime).toBe('2026-07-26 20:21:00');
  });

  test('退款单先给空数组 —— 页面直接读 .length，undefined 会炸', () => {
    expect(normalizeOrder(orderDto).userRefundRequests).toEqual([]);
    expect(normalizeOrder(null).userRefundRequests).toEqual([]);
  });
});

describe('normalizeRefund（契约 11.6）', () => {
  test('元→分、remark→approvalOpinion、createdAt→requestTime', () => {
    const vm = normalizeRefund({
      id: '7', status: 1, statusName: '已同意', requestFee: 9.9,
      remark: '同意退款', createdAt: '2026-07-27 10:00:00', handledAt: '2026-07-27 11:00:00',
      contactName: '张三', contactTel: '13800001234', allowCall: true,
    });
    expect(vm.requestFee).toBe(990);
    expect(vm.approvalOpinion).toBe('同意退款');
    expect(vm.requestTime).toBe('2026-07-27 10:00:00');
    expect(vm.allowCall).toBe(true);
    // 退款流水号只有真打款后才有，没有时是空串而不是 undefined
    expect(vm.outRefundNo).toBe('');
  });
});

describe('支付两步流程（契约 11.2.1 → 11.2.2）', () => {
  test('创建订单成功后立刻发起支付，返回可直接调 SDK 的参数', async () => {
    stub({
      'POST /v1/orders$': { code: 0, msg: 'ok', data: orderDto },
      'POST /pay$': {
        code: 0, msg: 'ok',
        data: { orderNo: orderDto.orderNo, payChannel: 1, payParams: { appId: 'wx1', paySign: 'S' } },
      },
    });
    const commits = [];
    const res = await orderStore.actions.CreateCardPackageOrderAuth(
      { commit: (t, v) => commits.push([t, v]) },
      { productType: 2, productId: 1, deviceId: 'd1', payChannel: 1 }
    );
    // 两次请求，顺序为 创建 → 支付
    expect(requests.map((r) => r.method)).toEqual(['POST', 'POST']);
    expect(requests[0].url).toContain('/v1/orders');
    expect(requests[1].url).toContain('/pay');
    expect(res.paymentArgs.provider).toBe('wxpay');
    expect(res.paymentArgs.orderInfo).toEqual({ appId: 'wx1', paySign: 'S' });
    expect(res.order.orderNo).toBe(orderDto.orderNo);
  });

  test('发起支付失败时把订单带回 —— 订单已落库，不能让用户重复下单', async () => {
    stub({
      'POST /v1/orders$': { code: 0, msg: 'ok', data: orderDto },
      'POST /pay$': { code: 21026, msg: '产品不存在或已下架', data: null },
    });
    const res = await orderStore.actions.CreateCardPackageOrderAuth({ commit: () => {} }, { productId: 1, deviceId: 'd1' });
    expect(res.succeeded).toBe(false);
    expect(res.order.orderNo).toBe(orderDto.orderNo);
  });

  test('支付宝渠道走 alipay provider', () => {
    expect(toPaymentArgs(2, 'orderStr').provider).toBe('alipay');
    expect(toPaymentArgs(1, {}).provider).toBe('wxpay');
  });
});

describe('设备订单列表（页面读 data.list/data.count）', () => {
  test('契约的 items/total 同时挂成 data.list/data.count —— 页面直接读它，undefined 会炸', async () => {
    stub({ 'GET /v1/orders': { code: 0, msg: 'ok', data: { items: [orderDto], total: 1 } } });
    const res = await orderStore.actions.GetDeviceOrderPage({}, { terminalId: 'd1', page: 1, limit: 20 });
    expect(res.data.list.length).toBe(1);
    expect(res.data.count).toBe(1);
    expect(res.data.list[0].totalFee).toBe(990);
  });
});

describe('订单详情合并退款进度（11.2.3 + 11.6）', () => {
  test('有退款单时包成数组塞进 userRefundRequests', async () => {
    stub({
      'GET /v1/orders/[^/]+$': { code: 0, msg: 'ok', data: orderDto },
      'GET /refund$': { code: 0, msg: 'ok', data: { id: '7', status: 0, statusName: '待处理', requestFee: 9.9 } },
    });
    const res = await orderStore.actions.GetTopupById({ commit: () => {} }, { orderNo: orderDto.orderNo });
    expect(res.data.userRefundRequests.length).toBe(1);
    expect(res.data.userRefundRequests[0].requestFee).toBe(990);
  });

  test('没有退款申请是正常态，不当错误', async () => {
    stub({
      'GET /v1/orders/[^/]+$': { code: 0, msg: 'ok', data: orderDto },
      'GET /refund$': { code: 0, msg: 'ok', data: null },
    });
    const res = await orderStore.actions.GetTopupById({ commit: () => {} }, { orderNo: orderDto.orderNo });
    expect(res.succeeded).toBe(true);
    expect(res.data.userRefundRequests).toEqual([]);
  });
});

describe('退款提交（页面传分，契约收元）', () => {
  test('分 → 元', async () => {
    stub({ 'POST /refund$': { code: 0, msg: 'ok', data: null } });
    await orderStore.actions.SendRefund({}, { orderId: 'LO1', requestFee: 990, refundReason: '不想要了' });
    expect(requests[0].data.requestFee).toBe(9.9);
  });

  test('金额 ≤0 时不传 —— 全额退由后端按订单实付算，前端不自己推', async () => {
    stub({ 'POST /refund$': { code: 0, msg: 'ok', data: null } });
    await orderStore.actions.SendRefund({}, { orderId: 'LO1', requestFee: 0 });
    expect(requests[0].data.requestFee).toBeUndefined();
  });
});

describe('产品与渠道接口路径', () => {
  test('流量包是 /traffic/products，不是设备的 /sim（那是卡现状）', async () => {
    stub({});
    await orderApi.trafficProducts();
    expect(requests[0].url).toBe('/v1/traffic/products');
  });

  test('支付渠道走 11.5 /pay/channels', async () => {
    stub({});
    await orderApi.payChannels();
    expect(requests[0].url).toBe('/v1/pay/channels');
  });

  test('取消订单只对待支付有意义，路径带 orderNo', async () => {
    stub({});
    await orderApi.cancel('LO1');
    expect(requests[0].url).toBe('/v1/orders/LO1/cancel');
    expect(requests[0].method).toBe('POST');
  });
});

/**
 * 协议帧待接入的指令：前端要能把它们发出去，由网关回"不支持"，
 * 而不是前端自己拦下来——协议接入当天前端不该需要改任何代码。
 */
describe('待接入协议的指令（registry 已定稿）', () => {
  const audioStore = require('../src/store/modules/audio.js').default;
  const remoteSetStore = require('../src/store/modules/remoteSet.js').default;

  test('声音安防三种模式各发各的指令码', async () => {
    stub({ 'POST /audios/trigger$': { code: 0, msg: 'ok', data: {} } });
    await audioStore.actions.AtouSendAudioCommand({}, { deviceId: 'd1', state: true });
    expect(requests[0].data.mode).toBeUndefined(); // 不传 = 声控（后端默认）
    expect(requests[0].data.open).toBe(true);

    await audioStore.actions.AlwaysSendAudioCommand({}, { deviceId: 'd1', state: true });
    expect(requests[1].data.mode).toBe('always');

    await audioStore.actions.TimedSendAudioCommand({}, { deviceId: 'd1', state: true, duration: 30, intervalSeconds: 600 });
    expect(requests[2].data.mode).toBe('timed');
    expect(requests[2].data.intervalSeconds).toBe(600);
  });

  test('恢复出厂真的下发 A_FACTORY_RESET，且不允许离线补发', async () => {
    stub({ 'POST /commands$': { code: 0, msg: 'ok', data: { ret: 0 } } });
    await remoteSetStore.actions.SetFactoryReset({}, { deviceId: 'd1' });
    expect(requests[0].url).toBe('/v1/devices/d1/commands');
    expect(requests[0].data.cmdCode).toBe('A_FACTORY_RESET');
    // 破坏性且不可撤销：用户此刻的意图不该在几小时后设备上线时突然执行
    expect(requests[0].data.canOffline).toBe(0);
  });
});
