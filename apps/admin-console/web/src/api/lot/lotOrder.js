import service from '@/utils/request'
// @Tags LotOrder
// @Summary 创建lotOrder表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotOrder true "创建lotOrder表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotOrder/createLotOrder [post]
export const createLotOrder = (data) => {
  return service({
    url: '/lotOrder/createLotOrder',
    method: 'post',
    data
  })
}

// @Tags LotOrder
// @Summary 删除lotOrder表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotOrder true "删除lotOrder表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotOrder/deleteLotOrder [delete]
export const deleteLotOrder = (params) => {
  return service({
    url: '/lotOrder/deleteLotOrder',
    method: 'delete',
    params
  })
}

// @Tags LotOrder
// @Summary 批量删除lotOrder表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除lotOrder表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotOrder/deleteLotOrder [delete]
export const deleteLotOrderByIds = (params) => {
  return service({
    url: '/lotOrder/deleteLotOrderByIds',
    method: 'delete',
    params
  })
}

// @Tags LotOrder
// @Summary 更新lotOrder表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotOrder true "更新lotOrder表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotOrder/updateLotOrder [put]
export const updateLotOrder = (data) => {
  return service({
    url: '/lotOrder/updateLotOrder',
    method: 'put',
    data
  })
}

// @Tags LotOrder
// @Summary 用id查询lotOrder表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotOrder true "用id查询lotOrder表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotOrder/findLotOrder [get]
export const findLotOrder = (params) => {
  return service({
    url: '/lotOrder/findLotOrder',
    method: 'get',
    params
  })
}

// @Tags LotOrder
// @Summary 分页获取lotOrder表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取lotOrder表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotOrder/getLotOrderList [get]
export const getLotOrderList = (params) => {
  return service({
    url: '/lotOrder/getLotOrderList',
    method: 'get',
    params
  })
}

// @Tags LotOrder
// @Summary 不需要鉴权的lotOrder表接口
// @Accept application/json
// @Produce application/json
// @Param data query lotReq.LotOrderSearch true "分页获取lotOrder表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotOrder/getLotOrderPublic [get]
export const getLotOrderPublic = () => {
  return service({
    url: '/lotOrder/getLotOrderPublic',
    method: 'get',
  })
}

// ========== 销售订单管理 ==========

export const getSalesList = (params) => {
  return service({ url: '/lot/order/sales-list', method: 'get', params })
}

export const createSales = (data) => {
  return service({ url: '/lot/order/sales-create', method: 'post', data })
}

export const updateSales = (id, data) => {
  return service({ url: `/lot/order/sales-update/${id}`, method: 'put', data })
}

export const deleteSales = (ids) => {
  return service({ url: '/lot/order/sales-delete', method: 'delete', data: { ids } })
}

export const getSalesDetail = (id) => {
  return service({ url: `/lot/order/sales-detail/${id}`, method: 'get' })
}

export const getNextOrderNo = () => {
  return service({ url: '/lot/order/next-order-no', method: 'get' })
}

// ========== 打单发货 ==========

export const getPendingOrder = (deviceId) => {
  return service({ url: '/lot/order/pending-by-device', method: 'get', params: { deviceId } })
}

export const dispatchOrder = (data) => {
  return service({ url: '/lot/order/dispatch', method: 'post', data })
}

export const getShopList = () => {
  return service({ url: '/lot/order/shop-list', method: 'get' })
}
