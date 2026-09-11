import service from '@/utils/request'
// @Tags LotFenceDevice
// @Summary 创建围栏设备
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotFenceDevice true "创建围栏设备"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotFenceDevice/createLotFenceDevice [post]
export const createLotFenceDevice = (data) => {
  return service({
    url: '/lotFenceDevice/createLotFenceDevice',
    method: 'post',
    data
  })
}

// @Tags LotFenceDevice
// @Summary 删除围栏设备
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotFenceDevice true "删除围栏设备"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotFenceDevice/deleteLotFenceDevice [delete]
export const deleteLotFenceDevice = (params) => {
  return service({
    url: '/lotFenceDevice/deleteLotFenceDevice',
    method: 'delete',
    params
  })
}

// @Tags LotFenceDevice
// @Summary 批量删除围栏设备
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除围栏设备"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotFenceDevice/deleteLotFenceDevice [delete]
export const deleteLotFenceDeviceByIds = (params) => {
  return service({
    url: '/lotFenceDevice/deleteLotFenceDeviceByIds',
    method: 'delete',
    params
  })
}

// @Tags LotFenceDevice
// @Summary 更新围栏设备
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotFenceDevice true "更新围栏设备"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotFenceDevice/updateLotFenceDevice [put]
export const updateLotFenceDevice = (data) => {
  return service({
    url: '/lotFenceDevice/updateLotFenceDevice',
    method: 'put',
    data
  })
}

// @Tags LotFenceDevice
// @Summary 用id查询围栏设备
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotFenceDevice true "用id查询围栏设备"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotFenceDevice/findLotFenceDevice [get]
export const findLotFenceDevice = (params) => {
  return service({
    url: '/lotFenceDevice/findLotFenceDevice',
    method: 'get',
    params
  })
}

// @Tags LotFenceDevice
// @Summary 分页获取围栏设备列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取围栏设备列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotFenceDevice/getLotFenceDeviceList [get]
export const getLotFenceDeviceList = (params) => {
  return service({
    url: '/lotFenceDevice/getLotFenceDeviceList',
    method: 'get',
    params
  })
}

// @Tags LotFenceDevice
// @Summary 不需要鉴权的围栏设备接口
// @Accept application/json
// @Produce application/json
// @Param data query lotReq.LotFenceDeviceSearch true "分页获取围栏设备列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotFenceDevice/getLotFenceDevicePublic [get]
export const getLotFenceDevicePublic = () => {
  return service({
    url: '/lotFenceDevice/getLotFenceDevicePublic',
    method: 'get',
  })
}
