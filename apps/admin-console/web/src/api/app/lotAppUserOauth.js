import service from '@/utils/request'
// @Tags LotAppUserOauth
// @Summary 创建lotAppUserOauth表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserOauth true "创建lotAppUserOauth表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotAppUserOauth/createLotAppUserOauth [post]
export const createLotAppUserOauth = (data) => {
  return service({
    url: '/lotAppUserOauth/createLotAppUserOauth',
    method: 'post',
    data
  })
}

// @Tags LotAppUserOauth
// @Summary 删除lotAppUserOauth表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserOauth true "删除lotAppUserOauth表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppUserOauth/deleteLotAppUserOauth [delete]
export const deleteLotAppUserOauth = (params) => {
  return service({
    url: '/lotAppUserOauth/deleteLotAppUserOauth',
    method: 'delete',
    params
  })
}

// @Tags LotAppUserOauth
// @Summary 批量删除lotAppUserOauth表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除lotAppUserOauth表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppUserOauth/deleteLotAppUserOauth [delete]
export const deleteLotAppUserOauthByIds = (params) => {
  return service({
    url: '/lotAppUserOauth/deleteLotAppUserOauthByIds',
    method: 'delete',
    params
  })
}

// @Tags LotAppUserOauth
// @Summary 更新lotAppUserOauth表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUserOauth true "更新lotAppUserOauth表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotAppUserOauth/updateLotAppUserOauth [put]
export const updateLotAppUserOauth = (data) => {
  return service({
    url: '/lotAppUserOauth/updateLotAppUserOauth',
    method: 'put',
    data
  })
}

// @Tags LotAppUserOauth
// @Summary 用id查询lotAppUserOauth表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotAppUserOauth true "用id查询lotAppUserOauth表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotAppUserOauth/findLotAppUserOauth [get]
export const findLotAppUserOauth = (params) => {
  return service({
    url: '/lotAppUserOauth/findLotAppUserOauth',
    method: 'get',
    params
  })
}

// @Tags LotAppUserOauth
// @Summary 分页获取lotAppUserOauth表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取lotAppUserOauth表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotAppUserOauth/getLotAppUserOauthList [get]
export const getLotAppUserOauthList = (params) => {
  return service({
    url: '/lotAppUserOauth/getLotAppUserOauthList',
    method: 'get',
    params
  })
}

// @Tags LotAppUserOauth
// @Summary 不需要鉴权的lotAppUserOauth表接口
// @Accept application/json
// @Produce application/json
// @Param data query appReq.LotAppUserOauthSearch true "分页获取lotAppUserOauth表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotAppUserOauth/getLotAppUserOauthPublic [get]
export const getLotAppUserOauthPublic = () => {
  return service({
    url: '/lotAppUserOauth/getLotAppUserOauthPublic',
    method: 'get',
  })
}
