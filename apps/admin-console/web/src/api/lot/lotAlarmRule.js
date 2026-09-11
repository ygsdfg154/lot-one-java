import service from '@/utils/request'

export const createLotAlarmRule = (data) => {
  return service({
    url: '/lotAlarmRule/createLotAlarmRule',
    method: 'post',
    data
  })
}

export const deleteLotAlarmRule = (params) => {
  return service({
    url: '/lotAlarmRule/deleteLotAlarmRule',
    method: 'delete',
    params
  })
}

export const deleteLotAlarmRuleByIds = (params) => {
  return service({
    url: '/lotAlarmRule/deleteLotAlarmRuleByIds',
    method: 'delete',
    params
  })
}

export const updateLotAlarmRule = (data) => {
  return service({
    url: '/lotAlarmRule/updateLotAlarmRule',
    method: 'put',
    data
  })
}

export const findLotAlarmRule = (params) => {
  return service({
    url: '/lotAlarmRule/findLotAlarmRule',
    method: 'get',
    params
  })
}

export const getLotAlarmRuleList = (params) => {
  return service({
    url: '/lotAlarmRule/getLotAlarmRuleList',
    method: 'get',
    params
  })
}

export const exportLotAlarmRule = (params) => {
  return service({
    url: '/lotAlarmRule/exportLotAlarmRule',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

export const getLotAlarmRulePublic = () => {
  return service({
    url: '/lotAlarmRule/getLotAlarmRulePublic',
    method: 'get'
  })
}
