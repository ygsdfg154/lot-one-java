/**
 * WGS84（设备 GPS 原始坐标，我们库里存的就是这个）到国内地图坐标系的转换。
 *
 * 背景：设备上报/入库的坐标是 WGS84，国内地图为了合规都做了偏移加密——
 * 高德/腾讯用 GCJ02，百度在 GCJ02 基础上再加一层偏移用 BD09。直接把
 * WGS84 坐标交给这些地图的画点/逆地理编码接口，会产生系统性偏移
 * （国内城区约 100~700 米），轻则点位画歪，重则逆地理编码解析到相邻街道
 * （2026-08-27 实测：`services/iot-runtime` 侧 GS1 基站定位坐标解析对了，
 * 但 admin-console 前端拿设备坐标直接查高德逆地理编码，解析出的地址与
 * 真实地址对不上，转换后重新查询才精确匹配到门牌号）。
 *
 * 算法是公开的国测局偏移算法，非高德/百度私有，网上常见移植版本一致。
 */

const PI = Math.PI
const A = 6378245.0
const EE = 0.006693421622966943 // WGS84 椭球偏心率平方，超出 float64 精度的位数截掉，不影响计算结果
const X_PI = (PI * 3000.0) / 180.0

function transformLat(x, y) {
  let ret =
    -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
  ret += ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) / 3.0
  ret += ((160.0 * Math.sin((y / 12.0) * PI) + 320 * Math.sin((y * PI) / 30.0)) * 2.0) / 3.0
  return ret
}

function transformLng(x, y) {
  let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
  ret += ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) / 3.0
  ret += ((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) / 3.0
  ret += ((150.0 * Math.sin((x / 12.0) * PI) + 300.0 * Math.sin((x / 30.0) * PI)) * 2.0) / 3.0
  return ret
}

/** 是否在中国境外（境外不做偏移，直接原样返回，避免把海外坐标转歪）。 */
function outOfChina(lng, lat) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271
}

/** WGS84 → GCJ02（高德/腾讯）。 */
export function wgs84ToGcj02(lng, lat) {
  if (outOfChina(lng, lat)) return [lng, lat]
  let dLat = transformLat(lng - 105.0, lat - 35.0)
  let dLng = transformLng(lng - 105.0, lat - 35.0)
  const radLat = (lat / 180.0) * PI
  let magic = Math.sin(radLat)
  magic = 1 - EE * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = (dLat * 180.0) / (((A * (1 - EE)) / (magic * sqrtMagic)) * PI)
  dLng = (dLng * 180.0) / ((A / sqrtMagic) * Math.cos(radLat) * PI)
  return [lng + dLng, lat + dLat]
}

/** GCJ02 → BD09（百度，在高德坐标基础上再加一层偏移）。 */
export function gcj02ToBd09(lng, lat) {
  const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * X_PI)
  const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * X_PI)
  return [z * Math.cos(theta) + 0.0065, z * Math.sin(theta) + 0.006]
}

/** WGS84 → BD09（百度）。 */
export function wgs84ToBd09(lng, lat) {
  const [gcjLng, gcjLat] = wgs84ToGcj02(lng, lat)
  return gcj02ToBd09(gcjLng, gcjLat)
}
