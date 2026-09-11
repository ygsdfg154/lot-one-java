import service from '@/utils/request'

// ========== 设备 CRUD ==========

export const getLotDeviceList = (params) => service({ url: '/lot/device/list', method: 'get', params })

export const getLotDeviceDetail = (deviceId) => service({ url: `/lot/device/detail/${encodeURIComponent(deviceId)}`, method: 'get' })

export const getLotDeviceStatus = (deviceId) => service({ url: `/lot/device/status/${encodeURIComponent(deviceId)}`, method: 'get' })

export const getLotDeviceGate = (deviceId) => service({ url: `/lot/device/gate/${encodeURIComponent(deviceId)}`, method: 'get' })

export const kickoutLotDevice = (deviceId) => service({ url: `/lot/device/kickout/${encodeURIComponent(deviceId)}`, method: 'put' })

export const validateDevice = (deviceId) => service({ url: `/lot/device/validate/${encodeURIComponent(deviceId)}`, method: 'get' })

export const createLotDevice = (data) => service({ url: '/lot/device/create', method: 'post', data })

export const updateLotDevice = (deviceId, data) => service({ url: `/lot/device/update/${encodeURIComponent(deviceId)}`, method: 'put', data })

export const updateLotDeviceName = (deviceId, deviceName) => service({ url: `/lot/device/name/${encodeURIComponent(deviceId)}`, method: 'put', data: { deviceName } })

export const updateLotDeviceTags = (deviceId, labels) => service({ url: `/lot/device/tags/${encodeURIComponent(deviceId)}`, method: 'put', data: { labels } })

export const updateLotDevicesTags = (deviceIds, labels) => service({ url: '/lot/device/tags', method: 'post', data: { deviceIds, labels } })

export const assignLotDeviceDept = (deviceId, deptId) => service({ url: `/lot/device/department/${encodeURIComponent(deviceId)}`, method: 'put', data: { deptId } })

export const assignLotDevicesDept = (deviceIds, deptId) => service({ url: '/lot/device/department', method: 'post', data: { deviceIds, deptId } })

export const resetLotDevices = (deviceIds) => service({ url: '/lot/device/reset', method: 'post', data: { deviceIds } })

export const deleteLotDevice = (deviceId) => service({ url: `/lot/device/delete/${encodeURIComponent(deviceId)}`, method: 'delete' })

export const deleteLotDevicesByIds = (ids, extraParams) => service({ url: '/lot/device/deleteByIds', method: 'delete', params: { ids, ...(extraParams||{}) } })

export const batchCreateDevices = (data) => service({ url: '/lot/device/batch-create', method: 'post', data })

export const importLotDevices = (file) => { const data = new FormData(); data.append('file', file); return service({ url: '/lot/device/import', method: 'post', headers: { 'Content-Type': 'multipart/form-data' }, data }) }

export const exportLotDevices = (params) => service({ url: '/lot/device/export', method: 'get', params, responseType: 'blob' })

export const getLocationCenter = (params) => service({ url: '/lot/device/location-center', method: 'get', params })

export const getProxyCodeList = (keyword) => service({ url: '/lot/device/proxy-codes', method: 'get', params: { keyword } })

// ========== 指令 ==========

export const dispatchDeviceCmd = (data) => service({ url: '/lot/device/cmd/dispatch', method: 'post', data })

export const batchDispatchDeviceCmd = (deviceIds, data) => service({ url: '/lot/device/cmd/batch-dispatch', method: 'post', data: { ...data, deviceIds } })

export const getLotDeviceAvailableCmds = (deviceId) => service({ url: `/lot/device/cmd/available/${encodeURIComponent(deviceId)}`, method: 'get' })

export const getLotDeviceCmdHistory = (deviceId, params) => service({ url: `/lot/device/cmd/history/${encodeURIComponent(deviceId)}`, method: 'get', params })

// ========== 售后管理 ==========

export const getAfterSalesList = (params) => service({ url: '/lot/device/after-sales/list', method: 'get', params })

export const unbindPhone = (data) => service({ url: '/lot/device/after-sales/unbind-phone', method: 'post', data })

export const deleteTrafficPackage = (data) => service({ url: '/lot/device/after-sales/traffic-package', method: 'delete', data })

export const selfCheck = (data) => service({ url: '/lot/device/after-sales/self-check', method: 'post', data })

export const dispatchCmd = (data) => service({ url: '/lot/device/after-sales/dispatch-cmd', method: 'post', data })

export const resetPassword = (data) => service({ url: '/lot/device/after-sales/reset-password', method: 'post', data })

export const reboot = (data) => service({ url: '/lot/device/after-sales/reboot', method: 'post', data })
