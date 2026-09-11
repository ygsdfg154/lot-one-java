import service from '@/utils/request'
// @Tags LotDeviceTraffic
// @Summary 创建lotDeviceTraffic表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotDeviceTraffic true "创建lotDeviceTraffic表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotDeviceTraffic/createLotDeviceTraffic [post]
export const createLotDeviceTraffic = (data) => {
  return service({
    url: '/lotDeviceTraffic/createLotDeviceTraffic',
    method: 'post',
    data
  })
}

// @Tags LotDeviceTraffic
// @Summary 删除lotDeviceTraffic表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotDeviceTraffic true "删除lotDeviceTraffic表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotDeviceTraffic/deleteLotDeviceTraffic [delete]
export const deleteLotDeviceTraffic = (params) => {
  return service({
    url: '/lotDeviceTraffic/deleteLotDeviceTraffic',
    method: 'delete',
    params
  })
}

// @Tags LotDeviceTraffic
// @Summary 批量删除lotDeviceTraffic表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除lotDeviceTraffic表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotDeviceTraffic/deleteLotDeviceTraffic [delete]
export const deleteLotDeviceTrafficByIds = (params) => {
  return service({
    url: '/lotDeviceTraffic/deleteLotDeviceTrafficByIds',
    method: 'delete',
    params
  })
}

// @Tags LotDeviceTraffic
// @Summary 更新lotDeviceTraffic表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotDeviceTraffic true "更新lotDeviceTraffic表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotDeviceTraffic/updateLotDeviceTraffic [put]
export const updateLotDeviceTraffic = (data) => {
  return service({
    url: '/lotDeviceTraffic/updateLotDeviceTraffic',
    method: 'put',
    data
  })
}

// @Tags LotDeviceTraffic
// @Summary 用id查询lotDeviceTraffic表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotDeviceTraffic true "用id查询lotDeviceTraffic表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotDeviceTraffic/findLotDeviceTraffic [get]
export const findLotDeviceTraffic = (params) => {
  return service({
    url: '/lotDeviceTraffic/findLotDeviceTraffic',
    method: 'get',
    params
  })
}

// @Tags LotDeviceTraffic
// @Summary 分页获取lotDeviceTraffic表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取lotDeviceTraffic表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotDeviceTraffic/getLotDeviceTrafficList [get]
export const getLotDeviceTrafficList = (params) => {
  return service({
    url: '/lotDeviceTraffic/getLotDeviceTrafficList',
    method: 'get',
    params
  })
}

// @Tags LotDeviceTraffic
// @Summary 不需要鉴权的lotDeviceTraffic表接口
// @Accept application/json
// @Produce application/json
// @Param data query appReq.LotDeviceTrafficSearch true "分页获取lotDeviceTraffic表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotDeviceTraffic/getLotDeviceTrafficPublic [get]
export const getLotDeviceTrafficPublic = () => {
  return service({
    url: '/lotDeviceTraffic/getLotDeviceTrafficPublic',
    method: 'get',
  })
}
