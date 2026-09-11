let BAIDU_MAP_AK = ''
let akPromise = null

/**
 * 获取百度地图 AK，优先从系统参数 API 获取，fallback 到环境变量
 */
const fetchAK = async () => {
  if (BAIDU_MAP_AK) return BAIDU_MAP_AK
  if (akPromise) return akPromise
  akPromise = (async () => {
    try {
      const { getParams } = await import('@/utils/params')
      const ak = await getParams('baidu_map_ak')
      if (ak) {
        BAIDU_MAP_AK = ak
        return BAIDU_MAP_AK
      }
    } catch {
      // API 获取失败，fallback 到环境变量
    }
    // fallback: 构建时环境变量
    BAIDU_MAP_AK = import.meta.env.VITE_BAIDU_MAP_AK || ''
    return BAIDU_MAP_AK
  })()
  return akPromise
}

export const hasBaiduMapAK = async () => {
  const ak = await fetchAK()
  return Boolean(ak)
}

export const getBaiduMapAK = () => fetchAK()

let loadingPromise

export const loadBaiduMap = async () => {
  const ak = await fetchAK()
  if (window.BMap) {
    return Promise.resolve(window.BMap)
  }
  if (!ak) {
    return Promise.resolve(null)
  }
  if (loadingPromise) {
    return loadingPromise
  }
  loadingPromise = new Promise((resolve, reject) => {
    const callbackName = `__initBaiduMap_${Date.now()}`
    window[callbackName] = () => {
      delete window[callbackName]
      resolve(window.BMap)
    }
    const script = document.createElement('script')
    script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=${callbackName}`
    script.onerror = () => {
      delete window[callbackName]
      loadingPromise = null
      reject(new Error('百度地图脚本加载失败'))
    }
    document.head.appendChild(script)
  })
  return loadingPromise
}

export const defaultMapCenter = { lng: 116.404, lat: 39.915 }
