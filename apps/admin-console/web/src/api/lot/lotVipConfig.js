import service from '@/utils/request'
// @Tags LotVipConfig
export const createLotVipConfig = (data) => {
  return service({ url: '/lotVipConfig/createLotVipConfig', method: 'post', data })
}
export const deleteLotVipConfig = (params) => {
  return service({ url: '/lotVipConfig/deleteLotVipConfig', method: 'delete', params })
}
export const deleteLotVipConfigByIds = (params) => {
  return service({ url: '/lotVipConfig/deleteLotVipConfigByIds', method: 'delete', params })
}
export const updateLotVipConfig = (data) => {
  return service({ url: '/lotVipConfig/updateLotVipConfig', method: 'put', data })
}
export const findLotVipConfig = (params) => {
  return service({ url: '/lotVipConfig/findLotVipConfig', method: 'get', params })
}
export const getLotVipConfigList = (params) => {
  return service({ url: '/lotVipConfig/getLotVipConfigList', method: 'get', params })
}
