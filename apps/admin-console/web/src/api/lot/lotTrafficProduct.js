import service from '@/utils/request'
// @Tags LotTrafficProduct
// @Summary 创建lotTrafficProduct表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotTrafficProduct true "创建lotTrafficProduct表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotTrafficProduct/createLotTrafficProduct [post]
export const createLotTrafficProduct = (data) => {
  return service({
    url: '/lotTrafficProduct/createLotTrafficProduct',
    method: 'post',
    data
  })
}

// @Tags LotTrafficProduct
// @Summary 删除lotTrafficProduct表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotTrafficProduct true "删除lotTrafficProduct表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotTrafficProduct/deleteLotTrafficProduct [delete]
export const deleteLotTrafficProduct = (params) => {
  return service({
    url: '/lotTrafficProduct/deleteLotTrafficProduct',
    method: 'delete',
    params
  })
}

// @Tags LotTrafficProduct
// @Summary 批量删除lotTrafficProduct表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除lotTrafficProduct表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotTrafficProduct/deleteLotTrafficProduct [delete]
export const deleteLotTrafficProductByIds = (params) => {
  return service({
    url: '/lotTrafficProduct/deleteLotTrafficProductByIds',
    method: 'delete',
    params
  })
}

// @Tags LotTrafficProduct
// @Summary 更新lotTrafficProduct表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotTrafficProduct true "更新lotTrafficProduct表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotTrafficProduct/updateLotTrafficProduct [put]
export const updateLotTrafficProduct = (data) => {
  return service({
    url: '/lotTrafficProduct/updateLotTrafficProduct',
    method: 'put',
    data
  })
}

// @Tags LotTrafficProduct
// @Summary 用id查询lotTrafficProduct表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotTrafficProduct true "用id查询lotTrafficProduct表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotTrafficProduct/findLotTrafficProduct [get]
export const findLotTrafficProduct = (params) => {
  return service({
    url: '/lotTrafficProduct/findLotTrafficProduct',
    method: 'get',
    params
  })
}

// @Tags LotTrafficProduct
// @Summary 分页获取lotTrafficProduct表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取lotTrafficProduct表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotTrafficProduct/getLotTrafficProductList [get]
export const getLotTrafficProductList = (params) => {
  return service({
    url: '/lotTrafficProduct/getLotTrafficProductList',
    method: 'get',
    params
  })
}

// @Tags LotTrafficProduct
// @Summary 不需要鉴权的lotTrafficProduct表接口
// @Accept application/json
// @Produce application/json
// @Param data query lotReq.LotTrafficProductSearch true "分页获取lotTrafficProduct表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotTrafficProduct/getLotTrafficProductPublic [get]
export const getLotTrafficProductPublic = () => {
  return service({
    url: '/lotTrafficProduct/getLotTrafficProductPublic',
    method: 'get',
  })
}
