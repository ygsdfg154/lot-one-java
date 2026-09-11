/**
 * 地图统一抽象层 —— 自动选择高德(AMap)或百度(BMap)，提供统一 API。
 *
 * 优先级：高德 > 百度。哪个 AK 配了就用哪个；都配了优先高德。
 *
 * 使用方式：
 *   import { loadMapApi, hasMapAK, defaultMapCenter } from '@/utils/mapProvider'
 *   const $m = await loadMapApi()          // $m 就是下文所有 API 的命名空间
 *   const map = $m.createMap(container)
 *   const pt = $m.point(116.4, 39.9)
 *   $m.centerAndZoom(map, pt, 13)
 */

import { hasBaiduMapAK, loadBaiduMap } from './baiduMap'
import { hasGaodeMapAK, loadGaodeMap } from './gaodeMap'
import { wgs84ToBd09, wgs84ToGcj02 } from './coordTransform'

// ---------------------------------------------------------------------------
// 内部状态
// ---------------------------------------------------------------------------

let _provider = null // 'baidu' | 'gaode'
let _sdk = null // window.BMap | window.AMap

// ---------------------------------------------------------------------------
// 对外入口
// ---------------------------------------------------------------------------

/** 是否有任一地图 AK 可用 */
export const hasMapAK = async () => {
  if (await hasGaodeMapAK()) return true
  return hasBaiduMapAK()
}

/** 加载地图 SDK 并返回统一 API 命名空间；无 AK 时返回 null */
export const loadMapApi = async () => {
  // 高德优先
  if (await hasGaodeMapAK()) {
    _sdk = await loadGaodeMap()
    if (_sdk) {
      _provider = 'gaode'
      return _buildGaodeApi(_sdk)
    }
  }
  // 回退百度
  if (await hasBaiduMapAK()) {
    _sdk = await loadBaiduMap()
    if (_sdk) {
      _provider = 'baidu'
      return _buildBaiduApi(_sdk)
    }
  }
  return null
}

export { defaultMapCenter } from './gaodeMap'

// ===========================================================================
// 百度 API 适配
// ===========================================================================

const _buildBaiduApi = (BMap) => ({
  // ---- 地图 ----
  createMap: (container) => new BMap.Map(container),
  centerAndZoom: (map, pt, zoom) => map.centerAndZoom(new BMap.Point(pt.lng, pt.lat), zoom),
  enableScrollWheelZoom: (map) => { map.enableScrollWheelZoom(true) },
  setViewport: (map, points) => {
    const pts = points.map(p => new BMap.Point(p.lng, p.lat))
    map.setViewport(pts)
  },
  clearOverlays: (map) => map.clearOverlays(),
  addOverlay: (map, o) => map.addOverlay(o._raw),
  getZoom: (map) => map.getZoom(),
  panTo: (map, pt) => map.panTo(new BMap.Point(pt.lng, pt.lat)),
  addMapListener: (map, event, fn) => map.addEventListener(event, fn),

  // ---- 几何 ----
  point: (lng, lat) => ({ lng, lat, _raw: new BMap.Point(lng, lat) }),
  // deviceGeoPoint：入参是设备原始 WGS84 坐标（GPS 芯片给的那个，我们库里存的就是
  // 这个），内部转换成百度的 BD09 再建点——用于设备位置/轨迹这类"坐标来自 WGS84"
  // 的场景。fence 等由用户在地图上直接画出来、坐标本就是地图原生坐标系的场景，
  // 继续用上面的 point()，不要跟这个混用（混用会被再转一次，坐标反而画歪）。
  deviceGeoPoint: (lng, lat) => {
    const [bLng, bLat] = wgs84ToBd09(lng, lat)
    return { lng: bLng, lat: bLat, _raw: new BMap.Point(bLng, bLat) }
  },
  marker: (pt) => {
    const rawPt = pt._raw || new BMap.Point(pt.lng, pt.lat)
    const raw = new BMap.Marker(rawPt)
    return {
      _raw: raw,
      setLabel: (lbl) => raw.setLabel(lbl._raw),
      addEventListener: (evt, fn) => raw.addEventListener(evt, fn),
      setPosition: (p) => raw.setPosition(p._raw || new BMap.Point(p.lng, p.lat)),
    }
  },
  polyline: (points, opts) => ({
    _raw: new BMap.Polyline(points.map(p => p._raw || new BMap.Point(p.lng, p.lat)), opts),
  }),
  polygon: (points, opts) => ({
    _raw: new BMap.Polygon(points.map(p => p._raw || new BMap.Point(p.lng, p.lat)), opts),
  }),
  circle: (pt, radius, opts) => ({
    _raw: new BMap.Circle(pt._raw || new BMap.Point(pt.lng, pt.lat), radius, opts),
  }),
  label: (text, offset) => ({
    _raw: new BMap.Label(text, { offset: new BMap.Size(offset.w, offset.h) }),
    text,
    offset,
  }),
  size: (w, h) => ({ w, h, _raw: new BMap.Size(w, h) }),

  // ---- 逆地理编码 ----
  createGeocoder: () => {
    const geo = new BMap.Geocoder()
    return {
      getLocation: (pt, cb) => geo.getLocation(pt._raw || new BMap.Point(pt.lng, pt.lat), cb),
    }
  },
})

// ===========================================================================
// 高德 API 适配
// ===========================================================================

const _buildGaodeApi = (AMap) => ({
  // ---- 地图 ----
  createMap: (container) => new AMap.Map(container, { resizeEnable: true }),
  centerAndZoom: (map, pt, zoom) => map.setZoomAndCenter(zoom, [pt.lng, pt.lat]),
  enableScrollWheelZoom: (map) => { map.setStatus({ scrollWheel: true }) },
  setViewport: (map, points) => {
    if (!points.length) return
    if (points.length === 1) {
      map.setZoomAndCenter(15, [points[0].lng, points[0].lat])
      return
    }
    const lngs = points.map(p => p.lng)
    const lats = points.map(p => p.lat)
    map.setBounds(
      new AMap.Bounds(
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ),
    )
  },
  clearOverlays: (map) => map.clearMap(),
  addOverlay: (map, o) => map.add(o._raw),
  getZoom: (map) => map.getZoom(),
  panTo: (map, pt) => map.panTo([pt.lng, pt.lat]),
  addMapListener: (map, event, fn) => map.on(event, fn),

  // ---- 几何 ----
  point: (lng, lat) => ({ lng, lat, _raw: [lng, lat] }),
  // deviceGeoPoint：同百度适配层的 deviceGeoPoint，入参是设备原始 WGS84 坐标，
  // 内部转换成高德的 GCJ02 再建点。fence 等地图原生坐标场景继续用 point()。
  deviceGeoPoint: (lng, lat) => {
    const [gLng, gLat] = wgs84ToGcj02(lng, lat)
    return { lng: gLng, lat: gLat, _raw: [gLng, gLat] }
  },
  marker: (pt) => {
    const pos = pt._raw instanceof Array ? pt._raw : [pt.lng, pt.lat]
    const raw = new AMap.Marker({ position: pos })
    return {
      _raw: raw,
      setLabel: (lbl) => {
        raw.setLabel({
          content: lbl.text,
          offset: lbl.offset ? new AMap.Pixel(lbl.offset.w, lbl.offset.h) : undefined,
        })
      },
      addEventListener: (evt, fn) => raw.on(evt, fn),
      setPosition: (p) => {
        raw.setPosition(p._raw instanceof Array ? p._raw : [p.lng, p.lat])
      },
    }
  },
  polyline: (points, opts) => ({
    _raw: new AMap.Polyline({
      path: points.map(p => (p._raw instanceof Array ? p._raw : [p.lng, p.lat])),
      strokeColor: opts.strokeColor,
      strokeWeight: opts.strokeWeight,
      strokeOpacity: opts.strokeOpacity,
    }),
  }),
  polygon: (points, opts) => ({
    _raw: new AMap.Polygon({
      path: points.map(p => (p._raw instanceof Array ? p._raw : [p.lng, p.lat])),
      strokeColor: opts.strokeColor,
      fillColor: opts.fillColor,
      strokeWeight: opts.strokeWeight,
      fillOpacity: opts.fillOpacity,
    }),
  }),
  circle: (pt, radius, opts) => ({
    _raw: new AMap.Circle({
      center: pt._raw instanceof Array ? pt._raw : [pt.lng, pt.lat],
      radius,
      strokeColor: opts.strokeColor,
      fillColor: opts.fillColor,
      strokeWeight: opts.strokeWeight,
      fillOpacity: opts.fillOpacity,
    }),
  }),
  label: (text, offset) => ({
    _raw: { content: text, offset: offset ? new AMap.Pixel(offset.w, offset.h) : undefined },
    text,
    offset,
  }),
  size: (w, h) => ({ w, h, _raw: new AMap.Pixel(w, h) }),

  // ---- 逆地理编码（HTTP API，不依赖 JS 插件） ----
  createGeocoder: () => ({
    getLocation: async(pt, cb) => {
      const coords = pt._raw instanceof Array ? pt._raw : [pt.lng, pt.lat]
      try {
        const { getGaodeMapAK } = await import('./gaodeMap')
        const ak = await getGaodeMapAK()
        const res = await fetch(`https://restapi.amap.com/v3/geocode/regeo?key=${ak}&location=${coords[0]},${coords[1]}`)
        const data = await res.json()
        cb({ address: data?.regeocode?.formatted_address || '' })
      } catch {
        cb({ address: '' })
      }
    },
  }),
})
