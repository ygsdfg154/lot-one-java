import service from '@/utils/request'
// @Tags LotAppUserDevice
// @Summary 创建lotAppUserDevice表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserDevice true "创建lotAppUserDevice表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotAppUserDevice/createLotAppUserDevice [post]
export const createLotAppUserDevice = (data) => {
  return service({
    url: '/lotAppUserDevice/createLotAppUserDevice',
    method: 'post',
    data
  })
}

// @Tags LotAppUserDevice
// @Summary 删除lotAppUserDevice表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserDevice true "删除lotAppUserDevice表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppUserDevice/deleteLotAppUserDevice [delete]
export const deleteLotAppUserDevice = (params) => {
  return service({
    url: '/lotAppUserDevice/deleteLotAppUserDevice',
    method: 'delete',
    params
  })
}

// @Tags LotAppUserDevice
// @Summary 批量删除lotAppUserDevice表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除lotAppUserDevice表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppUserDevice/deleteLotAppUserDevice [delete]
export const deleteLotAppUserDeviceByIds = (params) => {
  return service({
    url: '/lotAppUserDevice/deleteLotAppUserDeviceByIds',
    method: 'delete',
    params
  })
}

// @Tags LotAppUserDevice
// @Summary 更新lotAppUserDevice表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserDevice true "更新lotAppUserDevice表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotAppUserDevice/updateLotAppUserDevice [put]
export const updateLotAppUserDevice = (data) => {
  return service({
    url: '/lotAppUserDevice/updateLotAppUserDevice',
    method: 'put',
    data
  })
}

// @Tags LotAppUserDevice
// @Summary 用id查询lotAppUserDevice表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotAppUserDevice true "用id查询lotAppUserDevice表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotAppUserDevice/findLotAppUserDevice [get]
export const findLotAppUserDevice = (params) => {
  return service({
    url: '/lotAppUserDevice/findLotAppUserDevice',
    method: 'get',
    params
  })
}

// @Tags LotAppUserDevice
// @Summary 分页获取lotAppUserDevice表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取lotAppUserDevice表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotAppUserDevice/getLotAppUserDeviceList [get]
export const getLotAppUserDeviceList = (params) => {
  return service({
    url: '/lotAppUserDevice/getLotAppUserDeviceList',
    method: 'get',
    params
  })
}

// @Tags LotAppUserDevice
// @Summary 不需要鉴权的lotAppUserDevice表接口
// @Accept application/json
// @Produce application/json
// @Param data query appReq.LotAppUserDeviceSearch true "分页获取lotAppUserDevice表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotAppUserDevice/getLotAppUserDevicePublic [get]
export const getLotAppUserDevicePublic = () => {
  return service({
    url: '/lotAppUserDevice/getLotAppUserDevicePublic',
    method: 'get',
  })
}
