import service from '@/utils/request'
// @Tags LotFencePoint
// @Summary 创建围栏点位
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotFencePoint true "创建围栏点位"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotFencePoint/createLotFencePoint [post]
export const createLotFencePoint = (data) => {
  return service({
    url: '/lotFencePoint/createLotFencePoint',
    method: 'post',
    data
  })
}

// @Tags LotFencePoint
// @Summary 删除围栏点位
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotFencePoint true "删除围栏点位"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotFencePoint/deleteLotFencePoint [delete]
export const deleteLotFencePoint = (params) => {
  return service({
    url: '/lotFencePoint/deleteLotFencePoint',
    method: 'delete',
    params
  })
}

// @Tags LotFencePoint
// @Summary 批量删除围栏点位
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除围栏点位"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotFencePoint/deleteLotFencePoint [delete]
export const deleteLotFencePointByIds = (params) => {
  return service({
    url: '/lotFencePoint/deleteLotFencePointByIds',
    method: 'delete',
    params
  })
}

// @Tags LotFencePoint
// @Summary 更新围栏点位
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotFencePoint true "更新围栏点位"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotFencePoint/updateLotFencePoint [put]
export const updateLotFencePoint = (data) => {
  return service({
    url: '/lotFencePoint/updateLotFencePoint',
    method: 'put',
    data
  })
}

// @Tags LotFencePoint
// @Summary 用id查询围栏点位
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotFencePoint true "用id查询围栏点位"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotFencePoint/findLotFencePoint [get]
export const findLotFencePoint = (params) => {
  return service({
    url: '/lotFencePoint/findLotFencePoint',
    method: 'get',
    params
  })
}

// @Tags LotFencePoint
// @Summary 分页获取围栏点位列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取围栏点位列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotFencePoint/getLotFencePointList [get]
export const getLotFencePointList = (params) => {
  return service({
    url: '/lotFencePoint/getLotFencePointList',
    method: 'get',
    params
  })
}

// @Tags LotFencePoint
// @Summary 不需要鉴权的围栏点位接口
// @Accept application/json
// @Produce application/json
// @Param data query lotReq.LotFencePointSearch true "分页获取围栏点位列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotFencePoint/getLotFencePointPublic [get]
export const getLotFencePointPublic = () => {
  return service({
    url: '/lotFencePoint/getLotFencePointPublic',
    method: 'get',
  })
}
