import service from '@/utils/request'
import { useUserStore } from '@/pinia/modules/user'

export const getLotTrack = (params) => {
  return service({
    url: '/lot/location/track',
    method: 'get',
    params
  })
}

export const getLotRealtimeLocation = (deviceId) => {
  return service({
    url: `/lot/location/realtime/${encodeURIComponent(deviceId)}`,
    method: 'get'
  })
}

export const getLotRealtimeLocations = (params) => {
  return service({
    url: '/lot/location/realtime',
    method: 'get',
    params
  })
}

export const buildLotLocationWsUrl = (params = {}) => {
  const userStore = useUserStore()
  const query = new URLSearchParams({
    token: userStore.token || '',
    ...Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ''))
  })
  const baseApi = import.meta.env.VITE_BASE_API || ''
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${protocol}//${window.location.host}${baseApi}/lot/location/ws?${query.toString()}`
}
