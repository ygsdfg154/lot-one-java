import service from '@/utils/request'
// @Tags LotShareLocation
// @Summary 创建lotShareLocation表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotShareLocation true "创建lotShareLocation表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotShareLocation/createLotShareLocation [post]
export const createLotShareLocation = (data) => {
  return service({
    url: '/lotShareLocation/createLotShareLocation',
    method: 'post',
    data
  })
}

// @Tags LotShareLocation
// @Summary 删除lotShareLocation表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotShareLocation true "删除lotShareLocation表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotShareLocation/deleteLotShareLocation [delete]
export const deleteLotShareLocation = (params) => {
  return service({
    url: '/lotShareLocation/deleteLotShareLocation',
    method: 'delete',
    params
  })
}

// @Tags LotShareLocation
// @Summary 批量删除lotShareLocation表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除lotShareLocation表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotShareLocation/deleteLotShareLocation [delete]
export const deleteLotShareLocationByIds = (params) => {
  return service({
    url: '/lotShareLocation/deleteLotShareLocationByIds',
    method: 'delete',
    params
  })
}

// @Tags LotShareLocation
// @Summary 更新lotShareLocation表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotShareLocation true "更新lotShareLocation表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotShareLocation/updateLotShareLocation [put]
export const updateLotShareLocation = (data) => {
  return service({
    url: '/lotShareLocation/updateLotShareLocation',
    method: 'put',
    data
  })
}

// @Tags LotShareLocation
// @Summary 用id查询lotShareLocation表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotShareLocation true "用id查询lotShareLocation表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotShareLocation/findLotShareLocation [get]
export const findLotShareLocation = (params) => {
  return service({
    url: '/lotShareLocation/findLotShareLocation',
    method: 'get',
    params
  })
}

// @Tags LotShareLocation
// @Summary 分页获取lotShareLocation表列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取lotShareLocation表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotShareLocation/getLotShareLocationList [get]
export const getLotShareLocationList = (params) => {
  return service({
    url: '/lotShareLocation/getLotShareLocationList',
    method: 'get',
    params
  })
}

// @Tags LotShareLocation
// @Summary 不需要鉴权的lotShareLocation表接口
// @Accept application/json
// @Produce application/json
// @Param data query appReq.LotShareLocationSearch true "分页获取lotShareLocation表列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotShareLocation/getLotShareLocationPublic [get]
export const getLotShareLocationPublic = () => {
  return service({
    url: '/lotShareLocation/getLotShareLocationPublic',
    method: 'get',
  })
}
