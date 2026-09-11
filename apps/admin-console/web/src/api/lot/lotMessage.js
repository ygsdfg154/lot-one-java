import service from '@/utils/request'

// @Tags LotMessage
// @Summary 创建消息
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotMessage true "创建消息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotMessage/createLotMessage [post]
export const createLotMessage = (data) => {
  return service({
    url: '/lotMessage/createLotMessage',
    method: 'post',
    data
  })
}

// @Tags LotMessage
// @Summary 删除消息
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotMessage true "删除消息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotMessage/deleteLotMessage [delete]
export const deleteLotMessage = (params) => {
  return service({
    url: '/lotMessage/deleteLotMessage',
    method: 'delete',
    params
  })
}

// @Tags LotMessage
// @Summary 批量删除消息
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除消息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotMessage/deleteLotMessageByIds [delete]
export const deleteLotMessageByIds = (params) => {
  return service({
    url: '/lotMessage/deleteLotMessageByIds',
    method: 'delete',
    params
  })
}

// @Tags LotMessage
// @Summary 更新消息
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotMessage true "更新消息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotMessage/updateLotMessage [put]
export const updateLotMessage = (data) => {
  return service({
    url: '/lotMessage/updateLotMessage',
    method: 'put',
    data
  })
}

// @Tags LotMessage
// @Summary 用id查询消息
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotMessage true "用id查询消息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotMessage/findLotMessage [get]
export const findLotMessage = (params) => {
  return service({
    url: '/lotMessage/findLotMessage',
    method: 'get',
    params
  })
}

// @Tags LotMessage
// @Summary 分页获取消息列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取消息列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotMessage/getLotMessageList [get]
export const getLotMessageList = (params) => {
  return service({
    url: '/lotMessage/getLotMessageList',
    method: 'get',
    params
  })
}
