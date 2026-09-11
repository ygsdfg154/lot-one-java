import service from '@/utils/request'
// @Tags LotDept
// @Summary 创建部门
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotDept true "创建部门"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /lotDept/createLotDept [post]
export const createLotDept = (data) => {
  return service({
    url: '/lotDept/createLotDept',
    method: 'post',
    data
  })
}

// @Tags LotDept
// @Summary 删除部门
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotDept true "删除部门"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotDept/deleteLotDept [delete]
export const deleteLotDept = (params) => {
  return service({
    url: '/lotDept/deleteLotDept',
    method: 'delete',
    params
  })
}

// @Tags LotDept
// @Summary 批量删除部门
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除部门"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /lotDept/deleteLotDept [delete]
export const deleteLotDeptByIds = (params) => {
  return service({
    url: '/lotDept/deleteLotDeptByIds',
    method: 'delete',
    params
  })
}

// @Tags LotDept
// @Summary 更新部门
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data body model.LotDept true "更新部门"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /lotDept/updateLotDept [put]
export const updateLotDept = (data) => {
  return service({
    url: '/lotDept/updateLotDept',
    method: 'put',
    data
  })
}

// @Tags LotDept
// @Summary 用id查询部门
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query model.LotDept true "用id查询部门"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /lotDept/findLotDept [get]
export const findLotDept = (params) => {
  return service({
    url: '/lotDept/findLotDept',
    method: 'get',
    params
  })
}

// @Tags LotDept
// @Summary 分页获取部门列表
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取部门列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /lotDept/getLotDeptList [get]
export const getLotDeptList = (params) => {
  return service({
    url: '/lotDept/getLotDeptList',
    method: 'get',
    params
  })
}

// @Tags LotDept
// @Summary 获取部门树形结构
// @Security ApiKeyAuth
// @Accept application/json
// @Produce application/json
// @Success 200 {object} response.Response{data=[]lot.LotDept,msg=string} "获取成功"
// @Router /lotDept/getLotDeptTree [get]
export const getLotDeptTree = (params) => {
  return service({
    url: '/lotDept/getLotDeptTree',
    method: 'get',
    params
  })
}

// @Tags LotDept
// @Summary 不需要鉴权的部门接口
// @Accept application/json
// @Produce application/json
// @Param data query lotReq.LotDeptSearch true "分页获取部门列表"
// @Success 200 {object} response.Response{data=object,msg=string} "获取成功"
// @Router /lotDept/getLotDeptPublic [get]
export const getLotDeptPublic = () => {
  return service({
    url: '/lotDept/getLotDeptPublic',
    method: 'get',
  })
}
