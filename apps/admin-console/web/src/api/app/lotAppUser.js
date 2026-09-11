import service from '@/utils/request'
// @Tags LotAppUser
// @Summary 创建lotAppUser表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUser true "创建lotAppUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotAppUser/createLotAppUser [post]
export const createLotAppUser = (data) => {
  return service({
    url: '/lotAppUser/createLotAppUser',
    method: 'post',
    data
  })
}

// @Tags LotAppUser
// @Summary 删除lotAppUser表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUser true "删除lotAppUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppUser/deleteLotAppUser [delete]
export const deleteLotAppUser = (params) => {
  return service({
    url: '/lotAppUser/deleteLotAppUser',
    method: 'delete',
    params
  })
}

// @Tags LotAppUser
// @Summary 批量删除lotAppUser表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除lotAppUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotAppUser/deleteLotAppUser [delete]
export const deleteLotAppUserByIds = (params) => {
  return service({
    url: '/lotAppUser/deleteLotAppUserByIds',
    method: 'delete',
    params
  })
}

// @Tags LotAppUser
// @Summary 更新lotAppUser表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotAppUser true "更新lotAppUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotAppUser/updateLotAppUser [put]
export const updateLotAppUser = (data) => {
  return service({
    url: '/lotAppUser/updateLotAppUser',
    method: 'put',
    data
  })
}

// @Tags LotAppUser
// @Summary 用id查询lotAppUser表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotAppUser true "用id查询lotAppUser表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotAppUser/findLotAppUser [get]
export const findLotAppUser = (params) => {
  return service({
    url: '/lotAppUser/findLotAppUser',
    method: 'get',
    params
  })
}

// @Tags LotAppUser
// @Summary 分页获取lotAppUser表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取lotAppUser表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotAppUser/getLotAppUserList [get]
export const getLotAppUserList = (params) => {
  return service({
    url: '/lotAppUser/getLotAppUserList',
    method: 'get',
    params
  })
}

// @Tags LotAppUser
// @Summary 不需要鉴权的lotAppUser表接口
// @Accept application/json
// @Produce application/json
// @Param data query appReq.LotAppUserSearch true "分页获取lotAppUser表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotAppUser/getLotAppUserPublic [get]
// @Tags LotAppUser
// @Summary 重置C端用户密码
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body object{ID=uint,password=string} true "ID和密码"
// @Success 200 {object} response.Response{msg=string} "重置成功"
// @Router /lotAppUser/resetLotAppUserPassword [post]
export const resetLotAppUserPassword = (data) => {
  return service({
    url: '/lotAppUser/resetLotAppUserPassword',
    method: 'post',
    data
  })
}

export const getLotAppUserPublic = () => {
  return service({
    url: '/lotAppUser/getLotAppUserPublic',
    method: 'get',
  })
}
