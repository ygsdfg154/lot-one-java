import service from '@/utils/request'
// @Tags LotProduct
// @Summary 创建产品
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotProduct true "创建产品"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotProduct/createLotProduct [post]
export const createLotProduct = (data) => {
  return service({
    url: '/lotProduct/createLotProduct',
    method: 'post',
    data
  })
}

// @Tags LotProduct
// @Summary 删除产品
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotProduct true "删除产品"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotProduct/deleteLotProduct [delete]
export const deleteLotProduct = (params) => {
  return service({
    url: '/lotProduct/deleteLotProduct',
    method: 'delete',
    params
  })
}

// @Tags LotProduct
// @Summary 批量删除产品
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除产品"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotProduct/deleteLotProduct [delete]
export const deleteLotProductByIds = (params) => {
  return service({
    url: '/lotProduct/deleteLotProductByIds',
    method: 'delete',
    params
  })
}

// @Tags LotProduct
// @Summary 更新产品
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotProduct true "更新产品"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotProduct/updateLotProduct [put]
export const updateLotProduct = (data) => {
  return service({
    url: '/lotProduct/updateLotProduct',
    method: 'put',
    data
  })
}

// @Tags LotProduct
// @Summary 用id查询产品
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotProduct true "用id查询产品"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotProduct/findLotProduct [get]
export const findLotProduct = (params) => {
  return service({
    url: '/lotProduct/findLotProduct',
    method: 'get',
    params
  })
}

// @Tags LotProduct
// @Summary 分页获取产品列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取产品列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotProduct/getLotProductList [get]
export const getLotProductList = (params) => {
  return service({
    url: '/lotProduct/getLotProductList',
    method: 'get',
    params
  })
}

// @Tags LotProduct
// @Summary 不需要鉴权的产品接口
// @Accept application/json
// @Produce application/json
// @Param data query lotReq.LotProductSearch true "分页获取产品列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotProduct/getLotProductPublic [get]
export const getLotProductPublic = () => {
  return service({
    url: '/lotProduct/getLotProductPublic',
    method: 'get',
  })
}
