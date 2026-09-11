import service from '@/utils/request'
// @Tags LotAppUserLoginLog
// @Summary 创建lotAppUserLoginLog表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserLoginLog true "创建lotAppUserLoginLog表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotAppUserLoginLog/createLotAppUserLoginLog [post]
export const createLotAppUserLoginLog = (data) => {
  return service({
    url: '/lotAppUserLoginLog/createLotAppUserLoginLog',
    method: 'post',
    data
  })
}

// @Tags LotAppUserLoginLog
// @Summary 删除lotAppUserLoginLog表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserLoginLog true "删除lotAppUserLoginLog表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppUserLoginLog/deleteLotAppUserLoginLog [delete]
export const deleteLotAppUserLoginLog = (params) => {
  return service({
    url: '/lotAppUserLoginLog/deleteLotAppUserLoginLog',
    method: 'delete',
    params
  })
}

// @Tags LotAppUserLoginLog
// @Summary 批量删除lotAppUserLoginLog表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除lotAppUserLoginLog表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppUserLoginLog/deleteLotAppUserLoginLog [delete]
export const deleteLotAppUserLoginLogByIds = (params) => {
  return service({
    url: '/lotAppUserLoginLog/deleteLotAppUserLoginLogByIds',
    method: 'delete',
    params
  })
}

// @Tags LotAppUserLoginLog
// @Summary 更新lotAppUserLoginLog表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserLoginLog true "更新lotAppUserLoginLog表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotAppUserLoginLog/updateLotAppUserLoginLog [put]
export const updateLotAppUserLoginLog = (data) => {
  return service({
    url: '/lotAppUserLoginLog/updateLotAppUserLoginLog',
    method: 'put',
    data
  })
}

// @Tags LotAppUserLoginLog
// @Summary 用id查询lotAppUserLoginLog表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotAppUserLoginLog true "用id查询lotAppUserLoginLog表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotAppUserLoginLog/findLotAppUserLoginLog [get]
export const findLotAppUserLoginLog = (params) => {
  return service({
    url: '/lotAppUserLoginLog/findLotAppUserLoginLog',
    method: 'get',
    params
  })
}

// @Tags LotAppUserLoginLog
// @Summary 分页获取lotAppUserLoginLog表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取lotAppUserLoginLog表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotAppUserLoginLog/getLotAppUserLoginLogList [get]
export const getLotAppUserLoginLogList = (params) => {
  return service({
    url: '/lotAppUserLoginLog/getLotAppUserLoginLogList',
    method: 'get',
    params
  })
}

// @Tags LotAppUserLoginLog
// @Summary 不需要鉴权的lotAppUserLoginLog表接口
// @Accept application/json
// @Produce application/json
// @Param data query appReq.LotAppUserLoginLogSearch true "分页获取lotAppUserLoginLog表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotAppUserLoginLog/getLotAppUserLoginLogPublic [get]
export const getLotAppUserLoginLogPublic = () => {
  return service({
    url: '/lotAppUserLoginLog/getLotAppUserLoginLogPublic',
    method: 'get',
  })
}
