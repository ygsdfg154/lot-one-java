<template>
  <div class="screen-page">
    <header class="screen-header">
      <div>
        <div class="screen-title">首页</div>
        <div class="screen-subtitle">{{ nowText }}</div>
      </div>
      <div class="screen-actions">
        <el-button type="primary" icon="refresh" @click="loadDashboard">刷新</el-button>
      </div>
    </header>

    <section class="metric-grid">
      <div class="metric-panel">
        <span>设备总数</span>
        <strong>{{ summary.deviceTotal || 0 }}</strong>
      </div>
      <div class="metric-panel">
        <span>在线设备</span>
        <strong>{{ summary.onlineTotal || 0 }}</strong>
      </div>
      <div class="metric-panel">
        <span>告警总数</span>
        <strong>{{ summary.alarmTotal || 0 }}</strong>
      </div>
      <div class="metric-panel">
        <span>未恢复告警</span>
        <strong>{{ summary.unresolvedAlarm || 0 }}</strong>
      </div>
      <div class="metric-panel">
        <span>里程 KM</span>
        <strong>{{ summary.todayMileage || 0 }}</strong>
      </div>
    </section>

    <main class="screen-layout">
      <section class="screen-panel map-panel">
        <div class="panel-title">实时定位</div>
        <div ref="mapRef" class="screen-map">
          <div v-if="mapError" class="map-empty">{{ mapError }}</div>
        </div>
      </section>

      <section class="screen-panel">
        <div class="panel-title">告警类型</div>
        <Chart height="260px" :options="alarmTypeChartOptions" />
      </section>

      <section class="screen-panel">
        <div class="panel-title">电量趋势</div>
        <Chart height="260px" :options="batteryChartOptions" />
      </section>

      <section class="screen-panel alarm-list">
        <div class="panel-title">最新告警</div>
        <el-table :data="summary.latestAlarms || []" height="260" class="screen-table">
          <el-table-column label="设备" prop="deviceId" min-width="120" show-overflow-tooltip />
          <el-table-column label="告警" prop="alarmName" min-width="140" show-overflow-tooltip />
          <el-table-column label="状态" width="90">
            <template #default="{ row }">
              <el-tag :type="row.status === 'resolved' ? 'success' : 'danger'">{{ row.status === 'resolved' ? '已恢复' : '告警中' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="时间" prop="alarmTime" min-width="150" show-overflow-tooltip />
        </el-table>
      </section>
    </main>
  </div>
</template>

<script setup>
import Chart from '@/components/charts/index.vue'
import { getLotDashboardSummary } from '@/api/lot/lotAlarm'
import { loadMapApi, hasMapAK, defaultMapCenter } from '@/utils/mapProvider'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({ name: 'LotDataScreen' })

const summary = ref({})
const nowText = ref('')
const mapRef = ref()
const mapError = ref('')

let $m
let map
let timer

const alarmTypeChartOptions = computed(() => ({
  color: ['#22c55e', '#f59e0b', '#ef4444', '#38bdf8', '#a78bfa'],
  textStyle: { color: '#dbeafe' },
  tooltip: { trigger: 'item' },
  legend: { bottom: 0, textStyle: { color: '#cbd5e1' } },
  series: [{
    type: 'pie',
    radius: ['45%', '70%'],
    center: ['50%', '44%'],
    data: (summary.value.alarmByType || []).map(item => ({ name: item.name, value: item.value }))
  }]
}))

const batteryChartOptions = computed(() => ({
  color: ['#22c55e'],
  textStyle: { color: '#dbeafe' },
  tooltip: { trigger: 'axis' },
  grid: { left: 42, right: 16, top: 24, bottom: 38 },
  xAxis: {
    type: 'category',
    data: (summary.value.battery || []).slice(-40).map(item => item.time),
    axisLabel: { color: '#cbd5e1' }
  },
  yAxis: { type: 'value', axisLabel: { color: '#cbd5e1' }, splitLine: { lineStyle: { color: '#334155' } } },
  series: [{
    type: 'line',
    smooth: true,
    showSymbol: false,
    areaStyle: { opacity: 0.18 },
    data: (summary.value.battery || []).slice(-40).map(item => item.value)
  }]
}))

const loadDashboard = async() => {
  nowText.value = new Date().toLocaleString('zh-CN')
  const res = await getLotDashboardSummary({})
  if (res.code === 0) {
    summary.value = res.data || {}
    await nextTick()
    drawMap()
  }
}

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
    drawMap()
  } catch (err) {
    mapError.value = err.message
  }
}

const drawMap = () => {
  if (!map || !$m) return
  $m.clearOverlays(map)
  const points = []
  ;(summary.value.realtimeLocations || []).forEach(item => {
    if (!item.lng && !item.lat) return
    const point = $m.deviceGeoPoint(item.lng, item.lat)
    points.push(point)
    const marker = $m.marker(point)
    marker.setLabel($m.label(item.deviceName || item.deviceId, $m.size(14, -12)))
    $m.addOverlay(map, marker)
  })
  if (points.length === 1) {
    $m.centerAndZoom(map, points[0], 15)
  } else if (points.length > 1) {
    $m.setViewport(map, points)
  }
}

onMounted(() => {
  initMap()
  loadDashboard()
  timer = setInterval(loadDashboard, 30000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.screen-page {
  min-height: calc(100vh - 84px);
  padding: 16px;
  color: #e2e8f0;
  background: #111827;
}

.screen-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.screen-title {
  font-size: 24px;
  font-weight: 700;
}

.screen-subtitle {
  margin-top: 4px;
  color: #94a3b8;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.metric-panel,
.screen-panel {
  border: 1px solid #334155;
  background: #172033;
}

.metric-panel {
  padding: 14px;
}

.metric-panel span {
  display: block;
  color: #94a3b8;
  font-size: 13px;
}

.metric-panel strong {
  display: block;
  margin-top: 8px;
  font-size: 26px;
  color: #f8fafc;
}

.screen-layout {
  display: grid;
  grid-template-columns: minmax(520px, 1.4fr) minmax(360px, 0.8fr);
  gap: 12px;
}

.screen-panel {
  padding: 12px;
}

.map-panel {
  grid-row: span 2;
}

.panel-title {
  margin-bottom: 10px;
  font-weight: 600;
  color: #f8fafc;
}

.screen-map {
  position: relative;
  height: 620px;
  overflow: hidden;
  background: #0f172a;
}

.map-empty {
  display: grid;
  height: 100%;
  place-items: center;
  color: #94a3b8;
}

.screen-table {
  --el-table-bg-color: #172033;
  --el-table-tr-bg-color: #172033;
  --el-table-header-bg-color: #1f2937;
  --el-table-text-color: #e2e8f0;
  --el-table-header-text-color: #f8fafc;
  --el-table-border-color: #334155;
}

@media (max-width: 1200px) {
  .metric-grid,
  .screen-layout {
    grid-template-columns: 1fr;
  }

  .screen-map {
    height: 420px;
  }
}
</style>
