/**
 * 产品、订单、支付、退款（契约 11.x）。
 *
 * 支付是**两步**：11.2.1 创建订单拿 `orderNo` → 11.2.2 发起支付拿 `payParams`。
 * 原厂是一步返回 `mchOrderInfo`，前端把两者混在一个动作里；拆开的好处是订单已经
 * 落库、用户中途放弃也能在订单列表里看到并继续付，而不是凭空消失。
 */
import { request } from '../common/request.js';

const p = (v) => encodeURIComponent(v);

/** 11.1.1 VIP 套餐列表（按 sort 降序）。categoryId 过滤某个分类。 */
export function vipProducts({ categoryId } = {}) {
  return request({ url: '/vip/products', method: 'GET', loading: true, query: { categoryId } });
}

/** 11.1.2 流量包产品列表。 */
export function trafficProducts() {
  return request({ url: '/traffic/products', method: 'GET', loading: true });
}

/** 11.1.3 VIP 分类树（增值服务页左侧分类）。 */
export function vipCategories() {
  return request({ url: '/vip/categories', method: 'GET', loading: true });
}

/** 11.2.1 创建订单。返回完整订单详情（`orderStatus=0` 待支付），15 分钟不付自动过期。 */
export function create({ productType, productId, deviceId, payChannel }) {
  return request({
    url: '/orders',
    method: 'POST',
    loading: true,
    data: { productType, productId, deviceId, payChannel },
  });
}

/**
 * 11.2.2 发起支付：返回 `payParams`，直接透传给 `uni.requestPayment`。
 * 订单已支付/已取消/已过期时返回业务错误，不要重复调起 SDK。
 */
export function pay(orderNo) {
  return request({ url: `/orders/${p(orderNo)}/pay`, method: 'POST', loading: true, data: {} });
}

/** 11.2.3 订单详情（支付后轮询用它确认到账）。 */
export function detail(orderNo, { loading = false } = {}) {
  return request({ url: `/orders/${p(orderNo)}`, method: 'GET', loading });
}

/** 11.2.4 订单列表。`orderStatus` 不传 = 全部。 */
export function list({ page = 1, pageSize = 10, orderStatus, deviceId } = {}) {
  return request({
    url: '/orders',
    method: 'GET',
    loading: true,
    query: { page, pageSize: Math.min(pageSize, 50), orderStatus, deviceId },
  });
}

/** 11.2.5 取消订单（仅待支付可取消）。 */
export function cancel(orderNo) {
  return request({ url: `/orders/${p(orderNo)}/cancel`, method: 'POST', loading: true, data: {} });
}

/** 11.5 支付渠道列表。`enabled=false` 的渠道要置灰而不是隐藏——用户得知道有这个渠道。 */
export function payChannels() {
  return request({ url: '/pay/channels', method: 'GET' });
}

/**
 * 11.6 提交退款申请。`requestFee` 不传 = 全额退（取订单实付）。
 * 同一订单已有在处理中的申请时返回业务错误，不会重复建单。
 */
export function requestRefund(orderNo, { requestFee, refundReason, contactName, contactTel, allowCall } = {}) {
  return request({
    url: `/orders/${p(orderNo)}/refund`,
    method: 'POST',
    loading: true,
    data: { requestFee, refundReason, contactName, contactTel, allowCall },
  });
}

/** 11.6 查询退款申请进度（0 待处理 1 已同意 2 已拒绝 3 已退款）。 */
export function refundStatus(orderNo) {
  return request({ url: `/orders/${p(orderNo)}/refund`, method: 'GET', loading: true });
}
