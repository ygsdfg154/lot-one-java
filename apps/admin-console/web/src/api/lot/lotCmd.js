import service from '@/utils/request'
// @Tags LotCmd
// @Summary 创建指令
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotCmd true "创建指令"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotCmd/createLotCmd [post]
export const createLotCmd = (data) => {
  return service({
    url: '/lotCmd/createLotCmd',
    method: 'post',
    data
  })
}

// @Tags LotCmd
// @Summary 删除指令
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotCmd true "删除指令"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotCmd/deleteLotCmd [delete]
export const deleteLotCmd = (params) => {
  return service({
    url: '/lotCmd/deleteLotCmd',
    method: 'delete',
    params
  })
}

// @Tags LotCmd
// @Summary 批量删除指令
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除指令"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotCmd/deleteLotCmd [delete]
export const deleteLotCmdByIds = (params) => {
  return service({
    url: '/lotCmd/deleteLotCmdByIds',
    method: 'delete',
    params
  })
}

// @Tags LotCmd
// @Summary 更新指令
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotCmd true "更新指令"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotCmd/updateLotCmd [put]
export const updateLotCmd = (data) => {
  return service({
    url: '/lotCmd/updateLotCmd',
    method: 'put',
    data
  })
}

// @Tags LotCmd
// @Summary 用id查询指令
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotCmd true "用id查询指令"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotCmd/findLotCmd [get]
export const findLotCmd = (params) => {
  return service({
    url: '/lotCmd/findLotCmd',
    method: 'get',
    params
  })
}

// @Tags LotCmd
// @Summary 分页获取指令列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取指令列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotCmd/getLotCmdList [get]
export const getLotCmdList = (params) => {
  return service({
    url: '/lotCmd/getLotCmdList',
    method: 'get',
    params
  })
}

// @Tags LotCmd
// @Summary 不需要鉴权的指令接口
// @Accept application/json
// @Produce application/json
// @Param data query lotReq.LotCmdSearch true "分页获取指令列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotCmd/getLotCmdTree [get]
export const getLotCmdTree = (params) => {
  return service({
    url: '/lotCmd/getLotCmdTree',
    method: 'get',
    params
  })
}

// @Router /lotCmd/getLotCmdPublic [get]
export const getLotCmdPublic = () => {
  return service({
    url: '/lotCmd/getLotCmdPublic',
    method: 'get',
  })
}
