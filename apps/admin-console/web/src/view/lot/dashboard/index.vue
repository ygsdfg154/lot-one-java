<template>
  <div class="lot-dashboard">
    <!-- 区域1: 6个统计卡片 -->
    <el-row :gutter="16" class="stat-cards">
      <el-col :xs="12" :sm="8" :md="4" v-for="card in statCards" :key="card.key">
        <el-card shadow="hover" :body-style="{ padding: '16px' }">
          <div class="stat-card-content">
            <div class="stat-card-icon" :style="{ backgroundColor: card.color }">
              <el-icon :size="24"><component :is="card.icon" /></el-icon>
            </div>
            <div class="stat-card-info">
              <div class="stat-card-value">{{ card.value }}</div>
              <div class="stat-card-label">{{ card.label }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 区域2+3: 里程排行榜 + 最近告警 -->
    <el-row :gutter="16" class="content-row">
      <el-col :xs="24" :md="14">
        <el-card shadow="hover">
          <el-tabs v-model="mileageTab" @tab-change="onMileageTabChange">
            <el-tab-pane label="总里程排行榜" name="total" />
            <el-tab-pane label="今日里程排行榜" name="today" />
          </el-tabs>
          <div class="ranking-list" v-if="currentRankingList.length">
            <div class="ranking-item" v-for="(item, idx) in currentRankingList" :key="item.deviceId">
              <span class="rank-badge" :class="'rank-' + (idx + 1)">{{ idx + 1 }}</span>
              <span class="rank-device">{{ item.deviceName || item.deviceId }}</span>
              <el-progress :percentage="getRankPercent(item, currentRankingList[0])" :stroke-width="8" :show-text="false" class="rank-progress" />
              <span class="rank-mileage">{{ formatMileage(item.mileage) }} km</span>
            </div>
          </div>
          <el-empty v-else description="暂无数据" />
        </el-card>
      </el-col>

      <el-col :xs="24" :md="10">
        <el-card shadow="hover" class="alarm-card">
          <template #header>
            <div class="card-header">
              <span>最近告警</span>
              <el-button link type="primary" @click="$router.push({ name: 'LotAlarmCenter' })">更多</el-button>
            </div>
          </template>
          <el-timeline v-if="alarmList.length">
            <el-timeline-item v-for="alarm in alarmList" :key="alarm.id" :timestamp="alarm.alarmTime" placement="top" :color="alarmLevelColor(alarm.level)">
              <p class="alarm-item">{{ alarm.deviceId }}：{{ alarm.alarmName || alarm.message }}</p>
            </el-timeline-item>
          </el-timeline>
          <el-empty v-else description="暂无告警" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 区域4: 激活趋势图 -->
    <div class="trend-card">
      <div class="trend-title">激活统计</div>
      <!-- 修改：工具栏使用flex布局，占一半宽度 -->
      <div class="trend-toolbar-wrapper">
        <div class="trend-toolbar">
          <el-radio-group v-model="trendType" @change="onTrendTypeChange" class="trend-radio-group">
            <el-radio-button value="day">日</el-radio-button>
            <el-radio-button value="month">月</el-radio-button>
            <el-radio-button value="year">年</el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-model="trendTimeRange"
            :type="trendPickerType"
            :value-format="trendPickerFormat"
            range-separator="至"
            start-placeholder="开始"
            end-placeholder="结束"
            :clearable="false"
            class="trend-date-picker"
            @change="loadActiveTrend"
          />
        </div>
        <!-- 右侧留空 -->
        <div class="trend-toolbar-placeholder"></div>
      </div>
      <Charts :options="trendOption" height="400px" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  Monitor, Iphone, CircleCheck, VideoPause, Clock, WarningFilled
} from '@element-plus/icons-vue'
import { getDashboardOverview, getRecentAlarms, getActiveTrend } from '@/api/lot/dashboard'
import Charts from '@/components/charts/index.vue'

const router = useRouter()
const mileageTab = ref('total')
const totalRankingList = ref([])
const todayRankingList = ref([])
const alarmList = ref([])

// 激活趋势
function todayStr() { return new Date().toISOString().slice(0, 10) }
function daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10) }
function monthsAgo(n) {
  const d = new Date(); d.setMonth(d.getMonth() - n)
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0')
}
function yearsAgo(n) { return String(new Date().getFullYear() - n) }

const trendType = ref('day')
const trendTimeRange = ref([daysAgo(3), todayStr()])
const trendOption = ref({
  grid: { left: '5%', right: '5%', bottom: '10%', top: '10%' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: [] },
  yAxis: { type: 'value', min: 0, minInterval: 1, name: '台' },
  series: [{ data: [], type: 'line', smooth: true }]
})

const trendPickerType = computed(() => {
  if (trendType.value === 'day') return 'daterange'
  if (trendType.value === 'month') return 'monthrange'
  return 'yearrange'
})
const trendPickerFormat = computed(() => {
  if (trendType.value === 'day') return 'YYYY-MM-DD'
  if (trendType.value === 'month') return 'YYYY-MM'
  return 'YYYY'
})

const currentRankingList = computed(() => {
  return mileageTab.value === 'total' ? totalRankingList.value : todayRankingList.value
})

const statCards = reactive([
  { key: 'deviceCount', label: '设备总数', value: 0, icon: Monitor, color: '#409EFF' },
  { key: 'activationCount', label: '已激活', value: 0, icon: CircleCheck, color: '#67C23A' },
  { key: 'onlineCount', label: '在线', value: 0, icon: Iphone, color: '#409EFF' },
  { key: 'offlineCount', label: '离线', value: 0, icon: VideoPause, color: '#909399' },
  { key: 'waitActiveCount', label: '未激活', value: 0, icon: Clock, color: '#E6A23C' },
  { key: 'expiredCount', label: '已停机', value: 0, icon: WarningFilled, color: '#F56C6C' }
])

onMounted(() => {
  loadOverview()
  loadAlarms()
  loadActiveTrend()
})

async function loadOverview() {
  try {
    const res = await getDashboardOverview()
    if (res.code === 0) {
      const d = res.data
      statCards[0].value = d.deviceCount
      statCards[1].value = d.activationCount
      statCards[2].value = d.onlineCount
      statCards[3].value = d.offlineCount
      statCards[4].value = d.waitActiveCount
      statCards[5].value = d.expiredCount
      totalRankingList.value = d.totalMileageRank || []
      todayRankingList.value = d.todayMileageRank || []
    }
  } catch (e) {
    console.error('load overview failed', e)
  }
}

async function loadActiveTrend() {
  try {
    const [startTime, endTime] = trendTimeRange.value
    const res = await getActiveTrend({
      trendType: trendType.value,
      startTime,
      endTime
    })
    if (res.code === 0 && res.data) {
      const xData = res.data.map(item => item.date)
      const yData = res.data.map(item => item.activeNum)
      trendOption.value = {
        grid: { left: '5%', right: '5%', bottom: '10%', top: '10%' },
        tooltip: { trigger: 'axis' },
        xAxis: { type: 'category', data: xData },
        yAxis: { type: 'value', min: 0, minInterval: 1, name: '台' },
        series: [{ data: yData, type: 'line', smooth: true }]
      }
    }
  } catch (e) {
    console.error('load active trend failed', e)
  }
}

function onTrendTypeChange() {
  if (trendType.value === 'day') {
    trendTimeRange.value = [daysAgo(3), todayStr()]
  } else if (trendType.value === 'month') {
    trendTimeRange.value = [monthsAgo(6), monthsAgo(0)]
  } else {
    trendTimeRange.value = [yearsAgo(5), yearsAgo(0)]
  }
  loadActiveTrend()
}

function onMileageTabChange() {
  // computed already handles switching
}

async function loadAlarms() {
  try {
    const res = await getRecentAlarms()
    if (res.code === 0) {
      alarmList.value = res.data || []
    }
  } catch (e) {
    console.error('load alarms failed', e)
  }
}

function getRankPercent(item, top) {
  if (!top || !top.mileage) return 0
  return Math.round((item.mileage / top.mileage) * 100)
}

function formatMileage(val) {
  if (!val) return '0'
  return Number(val).toLocaleString('zh-CN', { maximumFractionDigits: 1 })
}

function alarmLevelColor(level) {
  const map = { critical: '#F56C6C', high: '#E6A23C', normal: '#409EFF', low: '#67C23A' }
  return map[level] || '#909399'
}


</script>

<style scoped lang="scss">
.lot-dashboard {
  padding: 16px;
  .stat-cards { margin-bottom: 16px; }
  .content-row { margin-bottom: 16px; }

  .stat-card-content {
    display: flex; align-items: center; gap: 12px;
    .stat-card-icon {
      width: 48px; height: 48px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      color: #fff;
    }
    .stat-card-info {
      .stat-card-value { font-size: 24px; font-weight: 700; line-height: 1.2; }
      .stat-card-label { font-size: 13px; color: #909399; }
    }
  }

  .card-header {
    display: flex; justify-content: space-between; align-items: center;
  }

  .ranking-list {
    .ranking-item {
      display: flex; align-items: center; gap: 10px; padding: 6px 0;
      .rank-badge {
        width: 24px; height: 24px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 12px; font-weight: 600; background: #e0e0e0; color: #666;
        &.rank-1 { background: #FFD700; color: #fff; }
        &.rank-2 { background: #C0C0C0; color: #fff; }
        &.rank-3 { background: #CD7F32; color: #fff; }
      }
      .rank-device { flex: 0 0 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
      .rank-progress { flex: 1; }
      .rank-mileage { flex: 0 0 80px; text-align: right; font-size: 13px; color: #606266; }
    }
  }

  .alarm-item {
    margin: 0; display: flex; align-items: center; gap: 8px;
    .alarm-device { font-weight: 500; }
  }

  .trend-card {
    margin-top: 16px;
    background: #ffffff;
    border-radius: 10px;
    padding: 24px;
    .trend-title {
      font-weight: normal;
      font-size: 16px;
      color: #242424;
      line-height: 17px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    // 新增：外层容器使用flex，各占一半
    .trend-toolbar-wrapper {
      margin: 20px 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 0;
      width: 100%;
    }
    .trend-toolbar {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
      flex: 0 0 25%;
      max-width: 25%;
      .trend-radio-group {
        width: 136px;
        height: 32px;
        flex-shrink: 0;
      }
      .trend-date-picker {
        width: 404px;
        height: 32px;
        flex-shrink: 0;
        :deep(.el-input__wrapper) {
          width: 404px;
          height: 32px;
          box-sizing: border-box;
        }
        :deep(.el-range-input) {
          height: 22px;
          line-height: 22px;
        }
      }
    }
    // 右侧占位留空
    .trend-toolbar-placeholder {
      flex: 1;
    }
  }
}

// 压缩日期选择器输入框的内边距，减少留白
.compact-date-picker {
  :deep(.el-input__wrapper) {
    padding: 0 4px !important;
  }
  :deep(.el-input__inner) {
    padding: 0 2px !important;
  }
  :deep(.el-range-separator) {
    padding: 0 2px !important;
  }
  :deep(.el-range__close-icon) {
    margin-left: 0 !important;
  }
}
</style>