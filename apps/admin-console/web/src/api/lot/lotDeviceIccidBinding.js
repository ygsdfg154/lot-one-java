import service from '@/utils/request'

// 创建设备-ICCID绑定
export const createLotDeviceIccidBinding = (data) => {
  return service({
    url: '/lotDeviceIccidBinding/createLotDeviceIccidBinding',
    method: 'post',
    data
  })
}

// 删除设备-ICCID绑定
export const deleteLotDeviceIccidBinding = (params) => {
  return service({
    url: '/lotDeviceIccidBinding/deleteLotDeviceIccidBinding',
    method: 'delete',
    params
  })
}

// 批量删除设备-ICCID绑定
export const deleteLotDeviceIccidBindingByIds = (params) => {
  return service({
    url: '/lotDeviceIccidBinding/deleteLotDeviceIccidBindingByIds',
    method: 'delete',
    params
  })
}

// 更新设备-ICCID绑定
export const updateLotDeviceIccidBinding = (data) => {
  return service({
    url: '/lotDeviceIccidBinding/updateLotDeviceIccidBinding',
    method: 'put',
    data
  })
}

// 根据ID查询设备-ICCID绑定
export const findLotDeviceIccidBinding = (params) => {
  return service({
    url: '/lotDeviceIccidBinding/findLotDeviceIccidBinding',
    method: 'get',
    params
  })
}

// 分页获取设备-ICCID绑定列表
export const getLotDeviceIccidBindingList = (params) => {
  return service({
    url: '/lotDeviceIccidBinding/getLotDeviceIccidBindingList',
    method: 'get',
    params
  })
}
