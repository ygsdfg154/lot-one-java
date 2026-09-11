// 设备业务状态枚举与文案/颜色映射(前后端契约值,勿随意改动——改值会破坏后端筛选与判断)。
// 后端契约来源:server/model/lot/lot_device.go(LotDevice 字段注释)、
// server/model/lot/request/lot_after_sales.go(AfterSalesDeviceResp 字段注释)。

export const ACTIVATION_STATUS = {
  ACTIVATED: 1, // 已激活
  INACTIVE: 2, // 未激活
  STOPPED: -1, // 已停机
}

export const ONLINE_STATUS = {
  ONLINE: 1, // 在线
  OFFLINE: 0, // 离线
  // null/undefined = 未上报(iot-runtime 查无数据,前端显示"未上报"而不是离线)
}

export const DISABLE_STATUS = {
  NORMAL: 0, // 正常
  DISABLED: 1, // 已禁用
}

export const BILLING_TYPE = {
  FREE: 0, // 免费
  PAID: 1, // 收费
}

export const PAID_STATUS = {
  FREE: 0, // 免费/无需付费
  PAID: 1, // 已付
  UNPAID: 2, // 未付
}

const ACTIVATION_STATUS_TEXT = {
  [ACTIVATION_STATUS.ACTIVATED]: '已激活',
  [ACTIVATION_STATUS.STOPPED]: '已停机',
}

const ACTIVATION_STATUS_TAG_TYPE = {
  [ACTIVATION_STATUS.ACTIVATED]: 'success',
  [ACTIVATION_STATUS.STOPPED]: 'danger',
}

// 激活状态文案:后端返回的 activationStatusText/deviceStatusText 是权威文案源,
// 仅在后端未返回时兜底到本地映射。
export const getActivationStatusText = (status) => ACTIVATION_STATUS_TEXT[Number(status)] || '未激活'
export const getActivationStatusTagType = (status) => ACTIVATION_STATUS_TAG_TYPE[Number(status)] || 'info'
export const getActivationStatusDisplay = (row) => row?.activationStatusText || row?.deviceStatusText || getActivationStatusText(row?.activationStatus)

export const getOnlineStatusText = (status) => status === ONLINE_STATUS.ONLINE ? '在线' : status === ONLINE_STATUS.OFFLINE ? '离线' : '未上报'
export const getOnlineStatusTagType = (status) => status === ONLINE_STATUS.ONLINE ? 'success' : status === ONLINE_STATUS.OFFLINE ? 'danger' : 'info'

export const getDisableStatusText = (status) => Number(status) === DISABLE_STATUS.DISABLED ? '已禁用' : '正常'
export const getDisableStatusTagType = (status) => Number(status) === DISABLE_STATUS.DISABLED ? 'danger' : 'success'

export const getBillingPaidText = (row) => {
  if (Number(row?.billingType || 0) !== BILLING_TYPE.PAID) return '免费'
  return Number(row?.paidStatus) === PAID_STATUS.PAID ? '已付' : '未付款'
}

export const getBillingPaidTagType = (row) => {
  if (Number(row?.billingType || 0) !== BILLING_TYPE.PAID) return 'success'
  return Number(row?.paidStatus) === PAID_STATUS.PAID ? 'success' : 'danger'
}
