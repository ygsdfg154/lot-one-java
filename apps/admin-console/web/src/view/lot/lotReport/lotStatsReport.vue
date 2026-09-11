<template>
  <div class="report-page">
    <div class="gva-search-box">
      <el-form :inline="true" :model="query" @keyup.enter="getTableData">
        <el-form-item label="设备号" :required="deviceIdRequired">
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
          <el-button type="primary" icon="search" @click="getTableData">查询</el-button>
          <el-button icon="refresh" @click="resetQuery">重置</el-button>
          <el-button icon="download" @click="exportData">导出</el-button>
        </el-form-item>
      </el-form>
      <div class="gva-search-tip">
        数据来源 iot-runtime,查询区间最长 31 天{{ deviceIdRequired ? ',本报表须指定设备编号' : '(不填设备编号则按当前数据权限取一批设备)' }}
      </div>
    </div>

    <div class="gva-table-box">
      <el-tabs v-model="activeTab" @tab-change="changeTab">
        <el-tab-pane label="里程报表" name="mileage" />
        <el-tab-pane label="行程报表" name="trip" />
        <el-tab-pane label="停留报表" name="stop" />
        <el-tab-pane label="电池报表" name="battery" />
      </el-tabs>

      <div v-if="activeTab === 'mileage' || activeTab === 'trip' || activeTab === 'stop'" class="gva-total-tip">
        区间总里程:{{ totalMileage }} km
      </div>

      <el-table :data="tableData" border v-loading="loading" height="560">
        <template v-if="activeTab === 'mileage'">
          <el-table-column label="设备编号" prop="deviceId" min-width="150" />
          <el-table-column label="日期" prop="date" min-width="140" />
          <el-table-column label="日里程(km)" prop="mileage" min-width="120" />
        </template>
        <template v-else-if="activeTab === 'trip'">
          <el-table-column label="设备编号" prop="deviceId" min-width="150" />
          <el-table-column label="开始时间" prop="startTime" min-width="170" />
          <el-table-column label="结束时间" prop="endTime" min-width="170" />
          <el-table-column label="时长(秒)" prop="durationSecond" min-width="110" />
          <el-table-column label="里程(km)" prop="mileage" min-width="110" />
        </template>
        <template v-else-if="activeTab === 'stop'">
          <el-table-column label="设备编号" prop="deviceId" min-width="150" />
          <el-table-column label="开始时间" prop="startTime" min-width="170" />
          <el-table-column label="结束时间" prop="endTime" min-width="170" />
          <el-table-column label="停留时长(秒)" prop="durationSecond" min-width="120" />
          <el-table-column label="经度" prop="startLng" min-width="120" />
          <el-table-column label="纬度" prop="startLat" min-width="120" />
        </template>
        <template v-else>
          <el-table-column label="设备编号" prop="deviceId" min-width="150" />
          <el-table-column label="采集时间" prop="time" min-width="170" />
          <el-table-column label="电量(%)" prop="value" min-width="120" />
        </template>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import {
  exportLotBatteryCurve,
  exportLotMileageStats,
  exportLotSegmentStats,
  getLotBatteryCurve,
  getLotMileageStats,
  getLotSegmentStats
} from '@/api/lot/lotAlarm'
import { downloadBlobResponse } from '@/utils/downloadBlob'
import { ElMessage } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import { useRouteQueryValue } from '@/hooks/useRouteQuery'

defineOptions({ name: 'LotStatsReport' })

const activeTab = ref(useRouteQueryValue('tab') || 'mileage')
const query = ref({ deviceId: useRouteQueryValue('deviceId') || '' })
const timeRange = ref(defaultTimeRange())
const tableData = ref([])
const totalMileage = ref(0)
const loading = ref(false)

// GetSegmentStats（行程/停留报表)在后端强制要求 deviceId，与里程/电池报表
// "不填则按数据权限取一批设备"的行为不同——这里跟着后端约束走。
const deviceIdRequired = computed(() => activeTab.value === 'trip' || activeTab.value === 'stop')

function defaultTimeRange() {
  const end = new Date()
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000)
  const fmt = (d) => d.toISOString().slice(0, 19).replace('T', ' ')
  return [fmt(start), fmt(end)]
}

const cleanParams = () => {
  const params = { deviceId: query.value.deviceId, startTime: timeRange.value?.[0], endTime: timeRange.value?.[1] }
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== undefined && value !== null))
}

const getTableData = async() => {
  if (deviceIdRequired.value && !query.value.deviceId) {
    ElMessage.warning('行程/停留报表需要先输入设备编号')
    return
  }
  loading.value = true
  try {
    const params = cleanParams()
    if (activeTab.value === 'mileage') {
      const res = await getLotMileageStats(params)
      if (res.code === 0) {
        tableData.value = res.data?.items || []
        totalMileage.value = res.data?.totalMileage || 0
      }
    } else if (activeTab.value === 'trip' || activeTab.value === 'stop') {
      const res = await getLotSegmentStats(params)
      if (res.code === 0) {
        const type = activeTab.value === 'trip' ? 'drive' : 'stay'
        tableData.value = (res.data?.segments || []).filter(item => item.type === type)
        totalMileage.value = res.data?.totalMileage || 0
      }
    } else {
      const res = await getLotBatteryCurve(params)
      if (res.code === 0) {
        tableData.value = res.data?.points || []
      }
    }
  } finally {
    loading.value = false
  }
}

const resetQuery = () => {
  query.value = { deviceId: '' }
  timeRange.value = defaultTimeRange()
  getTableData()
}

const changeTab = () => {
  getTableData()
}

const exportData = async() => {
  if (deviceIdRequired.value && !query.value.deviceId) {
    ElMessage.warning('行程/停留报表需要先输入设备编号')
    return
  }
  const params = cleanParams()
  if (activeTab.value === 'mileage') {
    const res = await exportLotMileageStats(params)
    downloadBlobResponse(res, '里程报表.xlsx')
  } else if (activeTab.value === 'trip' || activeTab.value === 'stop') {
    // 行程/停留共用同一个导出接口(后端不按 type 拆分),导出内容含两者。
    const res = await exportLotSegmentStats(params)
    downloadBlobResponse(res, '行程停留报表.xlsx')
  } else {
    const res = await exportLotBatteryCurve(params)
    downloadBlobResponse(res, '电池报表.xlsx')
  }
}

onMounted(getTableData)
</script>

<style scoped>
.gva-search-tip {
  margin-top: 4px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.gva-total-tip {
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}
</style>
