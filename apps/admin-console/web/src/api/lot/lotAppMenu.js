import service from '@/utils/request'

// @Tags LotAppMenu
// @Summary 创建APP菜单
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppMenu true "创建APP菜单"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotAppMenu/createLotAppMenu [post]
export const createLotAppMenu = (data) => {
  return service({
    url: '/lotAppMenu/createLotAppMenu',
    method: 'post',
    data
  })
}

// @Tags LotAppMenu
// @Summary 删除APP菜单
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppMenu true "删除APP菜单"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppMenu/deleteLotAppMenu [delete]
export const deleteLotAppMenu = (params) => {
  return service({
    url: '/lotAppMenu/deleteLotAppMenu',
    method: 'delete',
    params
  })
}

// @Tags LotAppMenu
// @Summary 批量删除APP菜单
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除APP菜单"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppMenu/deleteLotAppMenuByIds [delete]
export const deleteLotAppMenuByIds = (params) => {
  return service({
    url: '/lotAppMenu/deleteLotAppMenuByIds',
    method: 'delete',
    params
  })
}

// @Tags LotAppMenu
// @Summary 更新APP菜单
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppMenu true "更新APP菜单"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotAppMenu/updateLotAppMenu [put]
export const updateLotAppMenu = (data) => {
  return service({
    url: '/lotAppMenu/updateLotAppMenu',
    method: 'put',
    data
  })
}

// @Tags LotAppMenu
// @Summary 用id查询APP菜单
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotAppMenu true "用id查询APP菜单"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotAppMenu/findLotAppMenu [get]
export const findLotAppMenu = (params) => {
  return service({
    url: '/lotAppMenu/findLotAppMenu',
    method: 'get',
    params
  })
}

// @Tags LotAppMenu
// @Summary 分页获取APP菜单列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取APP菜单列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotAppMenu/getLotAppMenuList [get]
export const getLotAppMenuList = (params) => {
  return service({
    url: '/lotAppMenu/getLotAppMenuList',
    method: 'get',
    params
  })
}
