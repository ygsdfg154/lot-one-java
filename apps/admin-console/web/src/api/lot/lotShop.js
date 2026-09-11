import service from '@/utils/request'
// @Tags LotShop
// @Summary 创建lotShop表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotShop true "创建lotShop表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotShop/createLotShop [post]
export const createLotShop = (data) => {
  return service({
    url: '/lotShop/createLotShop',
    method: 'post',
    data
  })
}

// @Tags LotShop
// @Summary 删除lotShop表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotShop true "删除lotShop表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotShop/deleteLotShop [delete]
export const deleteLotShop = (params) => {
  return service({
    url: '/lotShop/deleteLotShop',
    method: 'delete',
    params
  })
}

// @Tags LotShop
// @Summary 批量删除lotShop表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除lotShop表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotShop/deleteLotShop [delete]
export const deleteLotShopByIds = (params) => {
  return service({
    url: '/lotShop/deleteLotShopByIds',
    method: 'delete',
    params
  })
}

// @Tags LotShop
// @Summary 更新lotShop表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotShop true "更新lotShop表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotShop/updateLotShop [put]
export const updateLotShop = (data) => {
  return service({
    url: '/lotShop/updateLotShop',
    method: 'put',
    data
  })
}

// @Tags LotShop
// @Summary 用id查询lotShop表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotShop true "用id查询lotShop表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotShop/findLotShop [get]
export const findLotShop = (params) => {
  return service({
    url: '/lotShop/findLotShop',
    method: 'get',
    params
  })
}

// @Tags LotShop
// @Summary 分页获取lotShop表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取lotShop表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotShop/getLotShopList [get]
export const getLotShopList = (params) => {
  return service({
    url: '/lotShop/getLotShopList',
    method: 'get',
    params
  })
}
// @Tags LotShop
// @Summary 获取数据源
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotShop/findLotShopDataSource [get]
export const getLotShopDataSource = () => {
  return service({
    url: '/lotShop/getLotShopDataSource',
    method: 'get',
  })
}

// @Tags LotShop
// @Summary 不需要鉴权的lotShop表接口
// @Accept application/json
// @Produce application/json
// @Param data query lotReq.LotShopSearch true "分页获取lotShop表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotShop/getLotShopPublic [get]
export const getLotShopPublic = () => {
  return service({
    url: '/lotShop/getLotShopPublic',
    method: 'get',
  })
}
