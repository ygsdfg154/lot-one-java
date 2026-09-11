import service from '@/utils/request'
// @Tags LotVipPackage
// @Summary 创建VIP套系
export const createLotVipPackage = (data) => {
  return service({ url: '/lotVipPackage/createLotVipPackage', method: 'post', data })
}
// @Summary 删除VIP套系
export const deleteLotVipPackage = (params) => {
  return service({ url: '/lotVipPackage/deleteLotVipPackage', method: 'delete', params })
}
// @Summary 批量删除VIP套系
export const deleteLotVipPackageByIds = (params) => {
  return service({ url: '/lotVipPackage/deleteLotVipPackageByIds', method: 'delete', params })
}
// @Summary 更新VIP套系
export const updateLotVipPackage = (data) => {
  return service({ url: '/lotVipPackage/updateLotVipPackage', method: 'put', data })
}
// @Summary 用id查询VIP套系
export const findLotVipPackage = (params) => {
  return service({ url: '/lotVipPackage/findLotVipPackage', method: 'get', params })
}
// @Summary 分页获取VIP套系列表
export const getLotVipPackageList = (params) => {
  return service({ url: '/lotVipPackage/getLotVipPackageList', method: 'get', params })
}
