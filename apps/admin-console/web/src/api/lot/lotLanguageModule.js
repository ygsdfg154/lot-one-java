import service from '@/utils/request'
// @Tags LotLanguageModule
// @Summary 创建多语言
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotLanguageModule true "创建多语言"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotLanguageModule/createLotLanguageModule [post]
export const createLotLanguageModule = (data) => {
  return service({
    url: '/lotLanguageModule/createLotLanguageModule',
    method: 'post',
    data
  })
}

// @Tags LotLanguageModule
// @Summary 删除多语言
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotLanguageModule true "删除多语言"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotLanguageModule/deleteLotLanguageModule [delete]
export const deleteLotLanguageModule = (params) => {
  return service({
    url: '/lotLanguageModule/deleteLotLanguageModule',
    method: 'delete',
    params
  })
}

// @Tags LotLanguageModule
// @Summary 批量删除多语言
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除多语言"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotLanguageModule/deleteLotLanguageModule [delete]
export const deleteLotLanguageModuleByIds = (params) => {
  return service({
    url: '/lotLanguageModule/deleteLotLanguageModuleByIds',
    method: 'delete',
    params
  })
}

// @Tags LotLanguageModule
// @Summary 更新多语言
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotLanguageModule true "更新多语言"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotLanguageModule/updateLotLanguageModule [put]
export const updateLotLanguageModule = (data) => {
  return service({
    url: '/lotLanguageModule/updateLotLanguageModule',
    method: 'put',
    data
  })
}

// @Tags LotLanguageModule
// @Summary 用id查询多语言
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotLanguageModule true "用id查询多语言"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotLanguageModule/findLotLanguageModule [get]
export const findLotLanguageModule = (params) => {
  return service({
    url: '/lotLanguageModule/findLotLanguageModule',
    method: 'get',
    params
  })
}

// @Tags LotLanguageModule
// @Summary 分页获取多语言列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取多语言列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotLanguageModule/getLotLanguageModuleList [get]
export const getLotLanguageModuleList = (params) => {
  return service({
    url: '/lotLanguageModule/getLotLanguageModuleList',
    method: 'get',
    params
  })
}

// @Tags LotLanguageModule
// @Summary 不需要鉴权的多语言接口
// @Accept application/json
// @Produce application/json
// @Param data query lotReq.LotLanguageModuleSearch true "分页获取多语言列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotLanguageModule/getLotLanguageModulePublic [get]
export const getLotLanguageModulePublic = () => {
  return service({
    url: '/lotLanguageModule/getLotLanguageModulePublic',
    method: 'get',
  })
}
