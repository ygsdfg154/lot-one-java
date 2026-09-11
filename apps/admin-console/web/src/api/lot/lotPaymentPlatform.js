import service from '@/utils/request'

// @Tags LotPaymentPlatform
// @Summary 创建支付平台
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotPaymentPlatform true "创建支付平台"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotPaymentPlatform/createLotPaymentPlatform [post]
export const createLotPaymentPlatform = (data) => {
  return service({
    url: '/lotPaymentPlatform/createLotPaymentPlatform',
    method: 'post',
    data
  })
}

// @Tags LotPaymentPlatform
// @Summary 删除支付平台
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotPaymentPlatform true "删除支付平台"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotPaymentPlatform/deleteLotPaymentPlatform [delete]
export const deleteLotPaymentPlatform = (params) => {
  return service({
    url: `/lotPaymentPlatform/deleteLotPaymentPlatform/${params.ID}`,
    method: 'delete',
  })
}

// @Tags LotPaymentPlatform
// @Summary 批量删除支付平台
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除支付平台"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotPaymentPlatform/deleteLotPaymentPlatformByIds [delete]
export const deleteLotPaymentPlatformByIds = (params) => {
  return service({
    url: '/lotPaymentPlatform/deleteLotPaymentPlatformByIds',
    method: 'delete',
    params
  })
}

// @Tags LotPaymentPlatform
// @Summary 更新支付平台
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotPaymentPlatform true "更新支付平台"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotPaymentPlatform/updateLotPaymentPlatform [put]
export const updateLotPaymentPlatform = (data) => {
  return service({
    url: `/lotPaymentPlatform/updateLotPaymentPlatform/${data.ID}`,
    method: 'put',
    data
  })
}

// @Tags LotPaymentPlatform
// @Summary 用id查询支付平台
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotPaymentPlatform true "用id查询支付平台"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotPaymentPlatform/findLotPaymentPlatform [get]
export const findLotPaymentPlatform = (params) => {
  return service({
    url: '/lotPaymentPlatform/findLotPaymentPlatform',
    method: 'get',
    params
  })
}

// @Tags LotPaymentPlatform
// @Summary 分页获取支付平台列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取支付平台列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotPaymentPlatform/getLotPaymentPlatformList [get]
export const getLotPaymentPlatformList = (params) => {
  return service({
    url: '/lotPaymentPlatform/getLotPaymentPlatformList',
    method: 'get',
    params
  })
}
