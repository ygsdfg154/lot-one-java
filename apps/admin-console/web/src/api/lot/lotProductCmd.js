import service from '@/utils/request'
// @Tags LotProductCmd
// @Summary 创建产品指令
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotProductCmd true "创建产品指令"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotProductCmd/createLotProductCmd [post]
export const createLotProductCmd = (data) => {
  return service({
    url: '/lotProductCmd/createLotProductCmd',
    method: 'post',
    data
  })
}

// @Tags LotProductCmd
// @Summary 删除产品指令
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotProductCmd true "删除产品指令"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotProductCmd/deleteLotProductCmd [delete]
export const deleteLotProductCmd = (params) => {
  return service({
    url: '/lotProductCmd/deleteLotProductCmd',
    method: 'delete',
    params
  })
}

// @Tags LotProductCmd
// @Summary 批量删除产品指令
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除产品指令"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotProductCmd/deleteLotProductCmd [delete]
export const deleteLotProductCmdByIds = (params) => {
  return service({
    url: '/lotProductCmd/deleteLotProductCmdByIds',
    method: 'delete',
    params
  })
}

// @Tags LotProductCmd
// @Summary 更新产品指令
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotProductCmd true "更新产品指令"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotProductCmd/updateLotProductCmd [put]
export const updateLotProductCmd = (data) => {
  return service({
    url: '/lotProductCmd/updateLotProductCmd',
    method: 'put',
    data
  })
}

// @Tags LotProductCmd
// @Summary 用id查询产品指令
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotProductCmd true "用id查询产品指令"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotProductCmd/findLotProductCmd [get]
export const findLotProductCmd = (params) => {
  return service({
    url: '/lotProductCmd/findLotProductCmd',
    method: 'get',
    params
  })
}

// @Tags LotProductCmd
// @Summary 分页获取产品指令列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取产品指令列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotProductCmd/getLotProductCmdList [get]
export const getLotProductCmdList = (params) => {
  return service({
    url: '/lotProductCmd/getLotProductCmdList',
    method: 'get',
    params
  })
}

// @Tags LotProductCmd
// @Summary 不需要鉴权的产品指令接口
// @Accept application/json
// @Produce application/json
// @Param data query lotReq.LotProductCmdSearch true "分页获取产品指令列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotProductCmd/getLotProductCmdPublic [get]
export const getLotProductCmdPublic = () => {
  return service({
    url: '/lotProductCmd/getLotProductCmdPublic',
    method: 'get',
  })
}

// @Tags LotProductCmd
// @Summary 批量绑定产品-指令（全量替换）
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body object true "{\"productId\":1,\"cmdIds\":[1,2,3]}"
// @Router /lotProductCmd/bindProductCmds [put]
export const bindProductCmds = (data) => {
  return service({
    url: '/lotProductCmd/bindProductCmds',
    method: 'put',
    data
  })
}

// @Tags LotProductCmd
// @Summary 查询产品已绑定的指令ID列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param productId query int true "产品ID"
// @Router /lotProductCmd/getProductCmdIds [get]
export const getProductCmdIds = (params) => {
  return service({
    url: '/lotProductCmd/getProductCmdIds',
    method: 'get',
    params
  })
}
