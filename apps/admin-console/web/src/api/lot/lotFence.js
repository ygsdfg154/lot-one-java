import service from '@/utils/request'
// @Tags LotFence
// @Summary 创建围栏
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotFence true "创建围栏"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotFence/createLotFence [post]
export const createLotFence = (data) => {
  return service({
    url: '/lotFence/createLotFence',
    method: 'post',
    data
  })
}

// @Tags LotFence
// @Summary 删除围栏
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotFence true "删除围栏"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotFence/deleteLotFence [delete]
export const deleteLotFence = (params) => {
  return service({
    url: '/lotFence/deleteLotFence',
    method: 'delete',
    params
  })
}

// @Tags LotFence
// @Summary 批量删除围栏
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除围栏"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotFence/deleteLotFence [delete]
export const deleteLotFenceByIds = (params) => {
  return service({
    url: '/lotFence/deleteLotFenceByIds',
    method: 'delete',
    params
  })
}

// @Tags LotFence
// @Summary 更新围栏
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotFence true "更新围栏"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotFence/updateLotFence [put]
export const updateLotFence = (data) => {
  return service({
    url: '/lotFence/updateLotFence',
    method: 'put',
    data
  })
}

// @Tags LotFence
// @Summary 用id查询围栏
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotFence true "用id查询围栏"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotFence/findLotFence [get]
export const findLotFence = (params) => {
  return service({
    url: '/lotFence/findLotFence',
    method: 'get',
    params
  })
}

// @Tags LotFence
// @Summary 分页获取围栏列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取围栏列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotFence/getLotFenceList [get]
export const getLotFenceList = (params) => {
  return service({
    url: '/lotFence/getLotFenceList',
    method: 'get',
    params
  })
}

// @Tags LotFence
// @Summary 不需要鉴权的围栏接口
// @Accept application/json
// @Produce application/json
// @Param data query lotReq.LotFenceSearch true "分页获取围栏列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotFence/getLotFencePublic [get]
export const getLotFencePublic = () => {
  return service({
    url: '/lotFence/getLotFencePublic',
    method: 'get',
  })
}

export const createMongoFence = (data) => {
  return service({
    url: '/lot/fence',
    method: 'post',
    data
  })
}

export const updateMongoFence = (id, data) => {
  return service({
    url: `/lot/fence/${encodeURIComponent(id)}`,
    method: 'put',
    data
  })
}

export const deleteMongoFence = (id) => {
  return service({
    url: `/lot/fence/${encodeURIComponent(id)}`,
    method: 'delete'
  })
}

export const getMongoFence = (id) => {
  return service({
    url: `/lot/fence/${encodeURIComponent(id)}`,
    method: 'get'
  })
}

export const getMongoFenceList = (params) => {
  return service({
    url: '/lot/fence/list',
    method: 'get',
    params
  })
}

export const bindFenceDevices = (id, deviceIds) => {
  return service({
    url: `/lot/fence/${encodeURIComponent(id)}/bind`,
    method: 'post',
    data: { deviceIds }
  })
}

export const unbindFenceDevices = (id, deviceIds = []) => {
  return service({
    url: `/lot/fence/${encodeURIComponent(id)}/unbind`,
    method: 'post',
    data: { deviceIds }
  })
}
