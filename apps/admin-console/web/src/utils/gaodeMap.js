let GAODE_MAP_AK = ''
let akPromise = null

/**
 * 获取高德地图 AK，优先从系统参数 API 获取，fallback 到环境变量
 */
const fetchAK = async () => {
  if (GAODE_MAP_AK) return GAODE_MAP_AK
  if (akPromise) return akPromise
  akPromise = (async () => {
    try {
      const { getParams } = await import('@/utils/params')
      const ak = await getParams('gaode_map_ak')
      if (ak) {
        GAODE_MAP_AK = ak
        return GAODE_MAP_AK
      }
    } catch {
      // API 获取失败，fallback 到环境变量
    }
    // fallback: 构建时环境变量
    GAODE_MAP_AK = import.meta.env.VITE_GAODE_MAP_AK || ''
    return GAODE_MAP_AK
  })()
  return akPromise
}

export const hasGaodeMapAK = async () => {
  const ak = await fetchAK()
  return Boolean(ak)
}

export const getGaodeMapAK = () => fetchAK()

let loadingPromise

export const loadGaodeMap = async () => {
  const ak = await fetchAK()
  if (window.AMap) {
    return Promise.resolve(window.AMap)
  }
  if (!ak) {
    return Promise.resolve(null)
  }
  if (loadingPromise) {
    return loadingPromise
  }
  loadingPromise = new Promise((resolve, reject) => {
    const callbackName = `__initGaodeMap_${Date.now()}`
    window[callbackName] = () => {
      delete window[callbackName]
      resolve(window.AMap)
    }
    const script = document.createElement('script')
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${ak}&callback=${callbackName}`
    script.onerror = () => {
      delete window[callbackName]
      loadingPromise = null
      reject(new Error('高德地图脚本加载失败'))
    }
    document.head.appendChild(script)
  })
  return loadingPromise
}

export const defaultMapCenter = { lng: 116.404, lat: 39.915 }
