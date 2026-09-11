import service from '@/utils/request'
// @Tags LotDeviceVip
// @Summary 创建lotDeviceVip表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotDeviceVip true "创建lotDeviceVip表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotDeviceVip/createLotDeviceVip [post]
export const createLotDeviceVip = (data) => {
  return service({
    url: '/lotDeviceVip/createLotDeviceVip',
    method: 'post',
    data
  })
}

// @Tags LotDeviceVip
// @Summary 删除lotDeviceVip表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotDeviceVip true "删除lotDeviceVip表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotDeviceVip/deleteLotDeviceVip [delete]
export const deleteLotDeviceVip = (params) => {
  return service({
    url: '/lotDeviceVip/deleteLotDeviceVip',
    method: 'delete',
    params
  })
}

// @Tags LotDeviceVip
// @Summary 批量删除lotDeviceVip表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除lotDeviceVip表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotDeviceVip/deleteLotDeviceVip [delete]
export const deleteLotDeviceVipByIds = (params) => {
  return service({
    url: '/lotDeviceVip/deleteLotDeviceVipByIds',
    method: 'delete',
    params
  })
}

// @Tags LotDeviceVip
// @Summary 更新lotDeviceVip表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotDeviceVip true "更新lotDeviceVip表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotDeviceVip/updateLotDeviceVip [put]
export const updateLotDeviceVip = (data) => {
  return service({
    url: '/lotDeviceVip/updateLotDeviceVip',
    method: 'put',
    data
  })
}

// @Tags LotDeviceVip
// @Summary 用id查询lotDeviceVip表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotDeviceVip true "用id查询lotDeviceVip表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotDeviceVip/findLotDeviceVip [get]
export const findLotDeviceVip = (params) => {
  return service({
    url: '/lotDeviceVip/findLotDeviceVip',
    method: 'get',
    params
  })
}

// @Tags LotDeviceVip
// @Summary 分页获取lotDeviceVip表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取lotDeviceVip表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotDeviceVip/getLotDeviceVipList [get]
export const getLotDeviceVipList = (params) => {
  return service({
    url: '/lotDeviceVip/getLotDeviceVipList',
    method: 'get',
    params
  })
}

// @Tags LotDeviceVip
// @Summary 不需要鉴权的lotDeviceVip表接口
// @Accept application/json
// @Produce application/json
// @Param data query appReq.LotDeviceVipSearch true "分页获取lotDeviceVip表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotDeviceVip/getLotDeviceVipPublic [get]
export const getLotDeviceVipPublic = () => {
  return service({
    url: '/lotDeviceVip/getLotDeviceVipPublic',
    method: 'get',
  })
}
