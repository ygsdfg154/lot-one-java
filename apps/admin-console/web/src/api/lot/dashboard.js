import service from '@/utils/request'

export const getDashboardOverview = () => {
  return service({ url: '/lot/dashboard/overview', method: 'get' })
}

export const getRecentAlarms = () => {
  return service({ url: '/lot/dashboard/alarm/recent', method: 'get' })
}

export const getActiveTrend = (params) => {
  return service({ url: '/lot/dashboard/active/trend', method: 'get', params })
}
