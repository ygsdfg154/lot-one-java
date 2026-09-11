import service from '@/utils/request'
import { createLotDevice, deleteLotDevice, deleteLotDevicesByIds, updateLotDevice, getLotDeviceList, getLotDeviceDetail } from './lotDevice'

// @Router /lot/device/create [post]
export const createLotDeviceInfo = (data) => createLotDevice(data)

// @Router /lot/device/delete/{deviceId} [delete]
export const deleteLotDeviceInfo = (params) => {
  const id = params?.ID || params?.deviceId
  if (!id) return Promise.reject(new Error('缺少删除参数'))
  return deleteLotDevice(String(id))
}

// @Router /lot/device/deleteByIds [delete]
export const deleteLotDeviceInfoByIds = (params) => {
  const ids = Array.isArray(params?.IDs) ? params.IDs : (params?.IDs || params?.ids || [])
  return deleteLotDevicesByIds(ids)
}

// @Router /lot/device/update/:deviceId [put]
export const updateLotDeviceInfo = (data) => {
  const deviceId = data?.deviceId || data?.ID
  return updateLotDevice(String(deviceId), data)
}

// @Router /lot/device/list [get]

// @Router /lot/device/list [get]
export const getLotDeviceInfoList = (params) => getLotDeviceList(params)

export const findLotDeviceInfo = (params) => getLotDeviceDetail(params?.deviceId || params?.ID)

// @Router /lot/device/list [get]
export const getLotDeviceInfoPublic = () => getLotDeviceList({ page: 1, pageSize: 10 })
