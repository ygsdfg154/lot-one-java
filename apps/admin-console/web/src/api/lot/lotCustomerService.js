import service from '@/utils/request'

// @Tags LotCustomerService
// @Summary 创建客服
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotCustomerService true "创建客服"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotCustomerService/createLotCustomerService [post]
export const createLotCustomerService = (data) => {
  return service({
    url: '/lotCustomerService/createLotCustomerService',
    method: 'post',
    data
  })
}

// @Tags LotCustomerService
// @Summary 删除客服
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotCustomerService true "删除客服"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotCustomerService/deleteLotCustomerService [delete]
export const deleteLotCustomerService = (params) => {
  return service({
    url: '/lotCustomerService/deleteLotCustomerService',
    method: 'delete',
    params
  })
}

// @Tags LotCustomerService
// @Summary 批量删除客服
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除客服"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotCustomerService/deleteLotCustomerServiceByIds [delete]
export const deleteLotCustomerServiceByIds = (params) => {
  return service({
    url: '/lotCustomerService/deleteLotCustomerServiceByIds',
    method: 'delete',
    params
  })
}

// @Tags LotCustomerService
// @Summary 更新客服
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotCustomerService true "更新客服"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotCustomerService/updateLotCustomerService [put]
export const updateLotCustomerService = (data) => {
  return service({
    url: '/lotCustomerService/updateLotCustomerService',
    method: 'put',
    data
  })
}

// @Tags LotCustomerService
// @Summary 用id查询客服
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotCustomerService true "用id查询客服"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotCustomerService/findLotCustomerService [get]
export const findLotCustomerService = (params) => {
  return service({
    url: '/lotCustomerService/findLotCustomerService',
    method: 'get',
    params
  })
}

// @Tags LotCustomerService
// @Summary 分页获取客服列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取客服列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotCustomerService/getLotCustomerServiceList [get]
export const getLotCustomerServiceList = (params) => {
  return service({
    url: '/lotCustomerService/getLotCustomerServiceList',
    method: 'get',
    params
  })
}
