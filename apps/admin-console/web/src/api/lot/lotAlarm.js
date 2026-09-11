import service from '@/utils/request'

export const getLotAlarmRecords = (params) => {
  return service({
    url: '/lot/alarm/record/list',
    method: 'get',
    params
  })
}

export const exportLotAlarmRecords = (params) => {
  return service({
    url: '/lot/alarm/record/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

export const getLotDeviceAlarmSetting = (deviceId) => {
  return service({
    url: `/lot/alarm/device-setting/${encodeURIComponent(deviceId)}`,
    method: 'get'
  })
}

export const saveLotDeviceAlarmSetting = (deviceId, data) => {
  return service({
    url: `/lot/alarm/device-setting/${encodeURIComponent(deviceId)}`,
    method: 'put',
    data
  })
}

export const getLotAlarmStats = (params) => {
  return service({
    url: '/lot/stat/alarm',
    method: 'get',
    params
  })
}

export const exportLotAlarmStats = (params) => {
  return service({
    url: '/lot/stat/alarm/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

export const getLotBatteryCurve = (params) => {
  return service({
    url: '/lot/stat/battery',
    method: 'get',
    params
  })
}

export const exportLotBatteryCurve = (params) => {
  return service({
    url: '/lot/stat/battery/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

export const getLotSegmentStats = (params) => {
  return service({
    url: '/lot/stat/segments',
    method: 'get',
    params
  })
}

export const exportLotSegmentStats = (params) => {
  return service({
    url: '/lot/stat/segments/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

export const getLotMileageStats = (params) => {
  return service({
    url: '/lot/stat/mileage',
    method: 'get',
    params
  })
}

export const exportLotMileageStats = (params) => {
  return service({
    url: '/lot/stat/mileage/export',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

export const getLotDashboardSummary = (params) => {
  return service({
    url: '/lot/screen/dashboard',
    method: 'get',
    params
  })
}
