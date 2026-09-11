/**
 * 订单模型适配（契约 11.2 / 11.6）。
 *
 * 页面沿用厂商模型，与契约有四处系统性差异：
 *
 *   1. **金额单位**：页面按"分"存（模板里到处 `.01 * totalFee`），契约给的是**元**；
 *   2. **订单标识**：页面用 `id`，契约对外只有 `orderNo`（不暴露自增 ID）；
 *   3. **状态字段**：页面 `status`，契约 `orderStatus`（并且额外给了中文名）；
 *   4. **退款单**：页面读订单里内嵌的 `userRefundRequests[]`，契约把退款拆成
 *      11.6 独立接口（一个订单最多一张在处理中的单），由 store 查回来包成数组。
 *
 * 金额这条最需要小心：把"元"当"分"用会让 9.9 元显示成 0.09 元，反过来显示成 990 元。
 * 所以这里一次性换算清楚，页面不再各自 `*100` / `*0.01`。
 */
import { toNum } from './num.js';

/** 元 → 分（页面模型用分）。用四舍五入而不是截断：0.1*100 在浮点下是 10.000000000000002。 */
export function yuanToCent(yuan) {
  return Math.round(toNum(yuan) * 100);
}

/** 分 → 元字符串（两位小数），给需要直接展示的地方。 */
export function centToYuanText(cent) {
  return (toNum(cent) / 100).toFixed(2);
}

/**
 * 11.2.3 订单 → 页面模型。
 *
 * `id` 填 `orderNo`：页面把它当"订单唯一标识"往下传（查详情、提退款），而契约里
 * 那个位置就是 orderNo。填自增 ID 反而没有接口能接。
 */
export function normalizeOrder(dto) {
  const d = dto || {};
  return {
    ...d,
    id: d.orderNo,
    orderNo: d.orderNo,
    // 页面模板按分展示
    totalFee: yuanToCent(d.payAmount),
    productPriceFee: yuanToCent(d.productPrice),
    provider: toNum(d.payChannel),
    providerName: d.payChannelName || '',
    status: toNum(d.orderStatus),
    statusName: d.orderStatusName || '',
    description: d.productName || '',
    createTime: d.createdAt || '',
    payTime: d.paidAt || '',
    expireTime: d.expiredAt || '',
    deviceId: d.deviceId || '',
    // 退款单由 11.6 单独查，取到后由 store 塞进来；这里给空数组，页面的
    // `userRefundRequests.length > 0` 判断才不会炸
    userRefundRequests: [],
  };
}

/**
 * 11.6 退款申请 → 页面模型。
 *
 * 页面读 `requestFee`（分）、`approvalOpinion`、`requestTime`；契约是元 + `remark`
 * + `createdAt`。`outRefundNo`（退款流水号）契约里没有——退款是人工审批流程，
 * 流水号只有真正打款后才存在，没有就留空串，不要显示 undefined。
 */
export function normalizeRefund(dto) {
  const d = dto || {};
  return {
    ...d,
    id: d.id,
    requestFee: yuanToCent(d.requestFee),
    status: toNum(d.status),
    statusName: d.statusName || '',
    approvalOpinion: d.remark || '',
    requestTime: d.createdAt || '',
    handledTime: d.handledAt || '',
    outRefundNo: d.outRefundNo || '',
    contactName: d.contactName || '',
    contactTel: d.contactTel || '',
    allowCall: !!d.allowCall,
  };
}

/**
 * 11.2.2 的 `payParams` → `uni.requestPayment` 的入参。
 *
 * 微信小程序 JSAPI 的字段名与 App 端 SDK 不同（App 要 `partnerid`/`prepayid`/`sign`，
 * 小程序要 `package`/`paySign`/`signType`），契约给的是 JSAPI 那套，可以直接透传；
 * App 端缺的字段由 uni 自己从 `package` 里解析不了，所以 App 端仍按 orderInfo 传。
 */
export function toPaymentArgs(payChannel, payParams) {
  const provider = toNum(payChannel) === 2 ? 'alipay' : 'wxpay';
  return {
    provider,
    // 支付宝返回的是一整串 orderStr，微信返回参数对象——两种都原样交给 SDK
    orderInfo: payParams,
  };
}
