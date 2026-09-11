import service from '@/utils/request'

export const getLotDeviceCmdLogList = (params) => {
  return service({
    url: '/lotDeviceCmdLog/getLotDeviceCmdLogList',
    method: 'get',
    params
  })
}

export const getLotDeviceCmdLog = (id) => {
  return service({
    url: '/lotDeviceCmdLog/findLotDeviceCmdLog',
    method: 'get',
    params: { ID: id }
  })
}
