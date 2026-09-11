import service from '@/utils/request'

// @Tags LotAppVersion
// @Summary 创建APP版本
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppVersion true "创建APP版本"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotAppVersion/createLotAppVersion [post]
export const createLotAppVersion = (data) => {
  return service({
    url: '/lotAppVersion/createLotAppVersion',
    method: 'post',
    data
  })
}

// @Tags LotAppVersion
// @Summary 删除APP版本
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppVersion true "删除APP版本"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppVersion/deleteLotAppVersion [delete]
export const deleteLotAppVersion = (params) => {
  return service({
    url: '/lotAppVersion/deleteLotAppVersion',
    method: 'delete',
    params
  })
}

// @Tags LotAppVersion
// @Summary 批量删除APP版本
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除APP版本"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppVersion/deleteLotAppVersionByIds [delete]
export const deleteLotAppVersionByIds = (params) => {
  return service({
    url: '/lotAppVersion/deleteLotAppVersionByIds',
    method: 'delete',
    params
  })
}

// @Tags LotAppVersion
// @Summary 更新APP版本
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppVersion true "更新APP版本"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotAppVersion/updateLotAppVersion [put]
export const updateLotAppVersion = (data) => {
  return service({
    url: '/lotAppVersion/updateLotAppVersion',
    method: 'put',
    data
  })
}

// @Tags LotAppVersion
// @Summary 用id查询APP版本
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotAppVersion true "用id查询APP版本"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotAppVersion/findLotAppVersion [get]
export const findLotAppVersion = (params) => {
  return service({
    url: '/lotAppVersion/findLotAppVersion',
    method: 'get',
    params
  })
}

// @Tags LotAppVersion
// @Summary 分页获取APP版本列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取APP版本列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotAppVersion/getLotAppVersionList [get]
export const getLotAppVersionList = (params) => {
  return service({
    url: '/lotAppVersion/getLotAppVersionList',
    method: 'get',
    params
  })
}
