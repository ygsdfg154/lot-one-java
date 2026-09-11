import service from '@/utils/request'
// @Tags LotAppUserDeviceLog
// @Summary 创建lotAppUserDeviceLog表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserDeviceLog true "创建lotAppUserDeviceLog表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotAppUserDeviceLog/createLotAppUserDeviceLog [post]
export const createLotAppUserDeviceLog = (data) => {
  return service({
    url: '/lotAppUserDeviceLog/createLotAppUserDeviceLog',
    method: 'post',
    data
  })
}

// @Tags LotAppUserDeviceLog
// @Summary 删除lotAppUserDeviceLog表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserDeviceLog true "删除lotAppUserDeviceLog表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppUserDeviceLog/deleteLotAppUserDeviceLog [delete]
export const deleteLotAppUserDeviceLog = (params) => {
  return service({
    url: '/lotAppUserDeviceLog/deleteLotAppUserDeviceLog',
    method: 'delete',
    params
  })
}

// @Tags LotAppUserDeviceLog
// @Summary 批量删除lotAppUserDeviceLog表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除lotAppUserDeviceLog表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppUserDeviceLog/deleteLotAppUserDeviceLog [delete]
export const deleteLotAppUserDeviceLogByIds = (params) => {
  return service({
    url: '/lotAppUserDeviceLog/deleteLotAppUserDeviceLogByIds',
    method: 'delete',
    params
  })
}

// @Tags LotAppUserDeviceLog
// @Summary 更新lotAppUserDeviceLog表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserDeviceLog true "更新lotAppUserDeviceLog表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotAppUserDeviceLog/updateLotAppUserDeviceLog [put]
export const updateLotAppUserDeviceLog = (data) => {
  return service({
    url: '/lotAppUserDeviceLog/updateLotAppUserDeviceLog',
    method: 'put',
    data
  })
}

// @Tags LotAppUserDeviceLog
// @Summary 用id查询lotAppUserDeviceLog表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotAppUserDeviceLog true "用id查询lotAppUserDeviceLog表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotAppUserDeviceLog/findLotAppUserDeviceLog [get]
export const findLotAppUserDeviceLog = (params) => {
  return service({
    url: '/lotAppUserDeviceLog/findLotAppUserDeviceLog',
    method: 'get',
    params
  })
}

// @Tags LotAppUserDeviceLog
// @Summary 分页获取lotAppUserDeviceLog表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取lotAppUserDeviceLog表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotAppUserDeviceLog/getLotAppUserDeviceLogList [get]
export const getLotAppUserDeviceLogList = (params) => {
  return service({
    url: '/lotAppUserDeviceLog/getLotAppUserDeviceLogList',
    method: 'get',
    params
  })
}

// @Tags LotAppUserDeviceLog
// @Summary 不需要鉴权的lotAppUserDeviceLog表接口
// @Accept application/json
// @Produce application/json
// @Param data query appReq.LotAppUserDeviceLogSearch true "分页获取lotAppUserDeviceLog表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotAppUserDeviceLog/getLotAppUserDeviceLogPublic [get]
export const getLotAppUserDeviceLogPublic = () => {
  return service({
    url: '/lotAppUserDeviceLog/getLotAppUserDeviceLogPublic',
    method: 'get',
  })
}
