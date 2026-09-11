<template>
  <div class="track-page">
    <div class="gva-search-box">
      <el-form :inline="true" :model="query" @keyup.enter="loadTrack">
        <el-form-item label="设备编号">
          <el-input v-model="query.deviceId" clearable placeholder="请输入设备编号" />
        </el-form-item>
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="loadTrack">查询</el-button>
          <el-button icon="video-play" :disabled="trackPoints.length === 0" @click="playTrack">播放</el-button>
          <el-button icon="video-pause" @click="stopPlay">停止</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="track-layout">
      <div class="gva-table-box track-map-box">
        <div class="map-toolbar">
          <span>轨迹点：{{ trackPoints.length }}</span>
          <el-tag v-if="mapError" type="warning">{{ mapError }}</el-tag>
        </div>
        <div ref="mapRef" class="track-map">
          <div v-if="mapError" class="map-empty">{{ mapError }}</div>
        </div>
      </div>

      <div class="gva-table-box track-table-box">
        <el-table :data="trackPoints" border height="620">
          <el-table-column label="时间" prop="time" min-width="160" />
          <el-table-column label="经度" prop="lng" width="110" />
          <el-table-column label="纬度" prop="lat" width="110" />
          <el-table-column label="速度" prop="speed" width="90" />
          <el-table-column label="方向" prop="direct" width="90" />
          <el-table-column label="里程" width="100">
            <template #default="{ row }">{{ mileageText(row) }}</template>
          </el-table-column>
          <el-table-column label="定位方式" width="100">
            <template #default="{ row }">{{ posTypeLabel(row.posType) }}</template>
          </el-table-column>
          <el-table-column label="卫星数" prop="satNum" width="80" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getLotTrack } from '@/api/lot/lotLocation'
import { loadMapApi, hasMapAK, defaultMapCenter } from '@/utils/mapProvider'
import { ElMessage } from 'element-plus'
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  name: 'LotTrackPlayback'
})

const mapRef = ref()
const mapError = ref('')
const query = ref({ deviceId: '' })
const timeRange = ref([])
const trackPoints = ref([])

let $m
let map
let playMarker
let playTimer
let playIndex = 0

const initMap = async() => {
  if (!await hasMapAK()) {
    mapError.value = '请配置地图AK（高德或百度）'
    return
  }
  try {
    $m = await loadMapApi()
    if (!$m) {
      mapError.value = '地图SDK加载失败'
      return
    }
    map = $m.createMap(mapRef.value)
    $m.centerAndZoom(map, $m.point(defaultMapCenter.lng, defaultMapCenter.lat), 12)
    $m.enableScrollWheelZoom(map)
  } catch (err) {
    mapError.value = err.message
  }
}

const loadTrack = async() => {
  if (!query.value.deviceId) {
    ElMessage.warning('请输入设备编号')
    return
  }
  const params = {
    deviceId: query.value.deviceId,
    startTime: timeRange.value?.[0],
    endTime: timeRange.value?.[1]
  }
  const res = await getLotTrack(params)
  if (res.code === 0) {
    trackPoints.value = res.data?.points || []
    drawTrack()
  }
}

const drawTrack = () => {
  if (!map || !$m) return
  $m.clearOverlays(map)
  stopPlay()
  if (trackPoints.value.length === 0) return
  const points = trackPoints.value.map(item => $m.deviceGeoPoint(item.lng, item.lat))
  const polyline = $m.polyline(points, { strokeColor: '#2f80ed', strokeWeight: 4, strokeOpacity: 0.85 })
  $m.addOverlay(map, polyline)
  $m.addOverlay(map, $m.marker(points[0]))
  $m.addOverlay(map, $m.marker(points[points.length - 1]))
  $m.setViewport(map, points)
}

const playTrack = () => {
  if (!map || !$m || trackPoints.value.length === 0) return
  stopPlay()
  playIndex = 0
  playMarker = $m.marker($m.deviceGeoPoint(trackPoints.value[0].lng, trackPoints.value[0].lat))
  $m.addOverlay(map, playMarker)
  playTimer = setInterval(() => {
    playIndex++
    if (playIndex >= trackPoints.value.length) {
      stopPlay()
      return
    }
    const point = $m.deviceGeoPoint(trackPoints.value[playIndex].lng, trackPoints.value[playIndex].lat)
    playMarker.setPosition(point)
    $m.panTo(map, point)
  }, 700)
}

const mileageText = row => {
  const v = row?.mileage ?? row?.Mileage
  if (v === null || v === undefined) return '--'
  const km = Number(v) / 1000
  return km >= 1 ? km.toFixed(1) + ' km' : Number(v) + ' m'
}

const POS_TYPE_MAP = { 0: '未定位', 1: '卫星定位', 2: 'WIFI定位', 3: '基站定位', 4: '多基站定位', 5: '混合定位' }
const posTypeLabel = code => POS_TYPE_MAP[code] ?? (code !== undefined && code !== null ? '未知(' + code + ')' : '--')

const stopPlay = () => {
  if (playTimer) {
    clearInterval(playTimer)
    playTimer = null
  }
}

onMounted(initMap)
onBeforeUnmount(stopPlay)
</script>

<style scoped>
.track-layout {
  display: grid;
  grid-template-columns: minmax(520px, 1.4fr) minmax(360px, 0.8fr);
  gap: 12px;
}

.track-map {
  position: relative;
  width: 100%;
  height: 620px;
  overflow: hidden;
  background: #f3f4f6;
}

.map-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 600;
}

.map-empty {
  display: grid;
  height: 100%;
  place-items: center;
  color: #909399;
}

@media (max-width: 1200px) {
  .track-layout {
    grid-template-columns: 1fr;
  }
}
</style>
