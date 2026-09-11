<template>
  <div class="locator-page">
    <aside class="dept-panel">
      <div class="panel-title">组织架构</div>
      <el-tree
        :data="deptTreeData"
        :props="{ label: 'deptName', children: 'children' }"
        node-key="ID"
        highlight-current
        :expand-on-click-node="true"
        default-expand-all
        @node-click="onDeptNodeClick"
      />
    </aside>

    <aside class="device-panel">
      <div class="panel-head">
        <div>
          <div class="panel-title">定位中心</div>
          <div class="panel-subtitle">设备列表</div>
        </div>
        <el-button :icon="Refresh" circle :loading="loading" @click="reloadDevices" />
      </div>

      <el-segmented v-model="statusFilter" :options="statusOptions" block />

      <div class="search-row">
        <el-input v-model="keyword" clearable placeholder="请输入设备编号/名称" @keyup.enter="reloadDevices" />
        <el-button type="primary" :icon="Search" @click="reloadDevices" />
      </div>

      <div class="check-row">
        <el-checkbox v-model="selectAllVisible" @change="toggleVisibleSelection">全选</el-checkbox>
        <span>共 {{ total }} 台，已选 {{ selectedDeviceIds.length }} 台</span>
      </div>

      <el-scrollbar class="device-scroll">
        <div
          v-for="item in filteredDevices"
          :key="deviceIdOf(item)"
          class="device-card"
          :class="{ active: selectedDeviceId === deviceIdOf(item) }"
          @click="selectDevice(item)"
        >
          <el-checkbox
            class="card-check"
            :disabled="!canOperateDevice(item)"
            :model-value="selectedDeviceIds.includes(deviceIdOf(item))"
            @click.stop
            @change="checked => toggleDeviceSelection(item, checked)"
          />
          <div class="car-badge"><el-icon><Van /></el-icon></div>
          <div class="device-main">
            <div class="device-id" :title="deviceIdOf(item)">{{ deviceIdOf(item) }}</div>
            <div class="device-name" :title="item.deviceName || item.productName || '-'">{{ item.deviceName || item.productName || '-' }}</div>
            <div class="device-meta">
              <span class="meta-item">
                <span class="meta-icon">{{ powerIcon(item) }}</span>
                <span :class="getPowerTextClass(item)">{{ powerDisplayText(item) }}</span>
              </span>
              <span class="meta-item">
                <span class="meta-icon">{{ rssiIcon(item) }}</span>
                <span :class="getRssiTextClass(item)">{{ rssiDisplayText(item) }}</span>
              </span>
            </div>
          </div>
          <div class="device-state">{{ deviceStateText(item) }}</div>
          <div class="card-actions">
            <button :disabled="!canOperateDevice(item)" @click.stop="openDetail(item)">详情</button>
            <button :disabled="!canOperateDevice(item)" @click.stop="openTrack(item)">轨迹</button>
            <button :disabled="!canOperateDevice(item)" @click.stop="openCmd(item)">指令</button>
            <button :disabled="!canOperateDevice(item)" @click.stop="openFence(item)">围栏</button>
          </div>
        </div>
        <el-empty v-if="!loading && !filteredDevices.length" description="暂无设备" />
      </el-scrollbar>

      <el-pagination
        small
        layout="prev,pager,next"
        :current-page="page"
        :page-size="pageSize"
        :total="total"
        @current-change="changePage"
      />
    </aside>

    <main class="map-shell">
      <div class="map-toolbar">
        <el-button class="timer-button" :loading="loading" @click="reloadDevices">
          {{ countdown }}s <span>刷新</span>
        </el-button>
        <div class="map-search">
          <el-input v-model="keyword" clearable placeholder="搜索设备" @keyup.enter="reloadDevices" />
          <el-button :icon="Aim" text @click="focusSelected" />
          <el-button :icon="Grid" text @click="fitMap" />
        </div>
      </div>

      <div ref="mapRef" class="map-canvas">
        <div v-if="mapError" class="map-empty">{{ mapError }}</div>
      </div>

      <!-- 选中设备信息窗口 -->
      <section v-if="selectedDevice" class="info-window">
        <div class="info-header">
          <span class="current-time">{{ currentTime }}</span>
          <span class="battery" :class="getPowerClass(selectedDevice)">{{ powerDisplayText(selectedDevice) }}</span>
          <span class="signal" :class="getRssiClass(selectedDevice)">{{ rssiDisplayText(selectedDevice) }}</span>
        </div>
        <div class="info-body">
          <div class="status-row">
            <span class="status-badge" :class="getStatusClass(selectedDevice)">
              {{ getStatusText(selectedDevice) }}
            </span>
            <span class="pos-type">{{ posTypeText(selectedDevice) }}</span>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">速度</span>
              <span class="value">{{ speedOf(selectedDevice) }} km/h</span>
            </div>
            <div class="info-item">
              <span class="label">今日里程</span>
              <span class="value">{{ mileageText(selectedDevice) }}</span>
            </div>
          </div>
          <div class="motion-row" v-if="getMotionDetail(selectedDevice)">
            <span class="motion-text">{{ getMotionDetail(selectedDevice) }}</span>
          </div>
          <div class="address-row">
            <span class="address-text">{{ addressText(selectedDevice) }}</span>
          </div>
        </div>
        <div class="info-footer">
          <button :disabled="!canOperateDevice(selectedDevice)" @click="openDetail(selectedDevice)">详情</button>
          <button :disabled="!canOperateDevice(selectedDevice)" @click="openTrack(selectedDevice)">轨迹</button>
          <button :disabled="!canOperateDevice(selectedDevice)" @click="openCmd(selectedDevice)">指令</button>
          <button :disabled="!canOperateDevice(selectedDevice)" @click="openFence(selectedDevice)">围栏</button>
          <button @click="closeInfoWindow" class="close-btn">✕</button>
        </div>
      </section>

      <!-- 地图悬停浮窗（无底部按钮） -->
      <div
        v-if="hoveredDevice && canOperateDevice(hoveredDevice)"
        class="map-hover-tooltip"
        :class="{ 'tooltip-visible': hoveredDevice }"
        @mouseenter="onTooltipEnter"
        @mouseleave="onTooltipLeave"
      >
        <div class="tooltip-header">
          <span class="device-id">{{ deviceIdOf(hoveredDevice) }}</span>
          <div class="tooltip-header-icons">
            <el-tooltip :content="'信号: '+rssiTooltip(hoveredDevice)" placement="top">
              <el-icon :class="getRssiClass(hoveredDevice)"><Connection /></el-icon>
            </el-tooltip>
            <el-tooltip :content="'电量: '+powerTooltip(hoveredDevice)" placement="top">
              <el-icon :class="getPowerClass(hoveredDevice)"><Lightning /></el-icon>
            </el-tooltip>
          </div>
        </div>
        <div class="tooltip-body">
          <div class="tooltip-row">
            <span class="label">设备状态</span>
            <span class="value">
              <template v-if="isOnline(hoveredDevice)">
                <el-tag size="small" type="success" effect="plain">在线</el-tag>
                <span v-if="motionText(hoveredDevice)" class="duration">{{ motionText(hoveredDevice) }}</span>
              </template>
              <template v-else>
                <el-tag size="small" type="danger" effect="plain">{{ offlineDurationText(hoveredDevice) }}</el-tag>
              </template>
            </span>
          </div>
          <div class="tooltip-row">
            <span class="label">设备名称</span>
            <span class="value">{{ hoveredDevice.deviceName || deviceIdOf(hoveredDevice) }}</span>
          </div>
          <div class="tooltip-row">
            <span class="label">产品类型</span>
            <span class="value">{{ getProductTypeLabel(hoveredDevice.productTypeName || hoveredDevice.deviceType) }}</span>
          </div>
          <div class="tooltip-row">
            <span class="label">产品型号</span>
            <span class="value">{{ hoveredDevice.deviceModel || hoveredDevice.productName || '-' }}</span>
          </div>
          <div class="tooltip-row">
            <span class="label">定位方式</span>
            <span class="value">{{ posTypeText(hoveredDevice) }}</span>
          </div>
          <div class="tooltip-row">
            <span class="label">定位时间</span>
            <span class="value">{{ formatTime(locationAt(hoveredDevice)) }}</span>
          </div>
          <div class="tooltip-row">
            <span class="label">通信时间</span>
            <span class="value">{{ formatTime(hoveredDevice.lastGateTime || hoveredDevice.LastGateTime || hoveredDevice.updatedAt || hoveredDevice.UpdatedAt) }}</span>
          </div>
          <div class="tooltip-row">
            <span class="label">速度</span>
            <span class="value">{{ speedOf(hoveredDevice) }} km/h</span>
          </div>
          <div class="tooltip-row">
            <span class="label">卫星数</span>
            <span class="value">{{ hoveredDevice.satNum ?? 0 }}</span>
          </div>
          <div class="tooltip-row">
            <span class="label">信号</span>
            <span class="value" :class="getRssiTextClass(hoveredDevice)">{{ rssiTooltip(hoveredDevice) }}</span>
          </div>
          <div class="tooltip-row">
            <span class="label">里程</span>
            <span class="value">{{ mileageText(hoveredDevice) }}</span>
          </div>
          <div class="tooltip-row">
            <span class="label">电量</span>
            <span class="value" :class="getPowerTextClass(hoveredDevice)">{{ powerTooltip(hoveredDevice) }}</span>
          </div>
          <div class="tooltip-row" v-if="isCar(hoveredDevice)">
            <span class="label">ACC</span>
            <span class="value">{{ hoveredDevice.acc === 1 ? '启动' : '熄火' }}</span>
          </div>
          <div class="tooltip-row" v-if="isCar(hoveredDevice)">
            <span class="label">设防</span>
            <span class="value">{{ hoveredDevice.fortification === 1 ? '设防' : '撤防' }}</span>
          </div>
          <div class="tooltip-row" v-if="isCar(hoveredDevice)">
            <span class="label">电压</span>
            <span class="value">{{ hoveredDevice.voltage != null ? hoveredDevice.voltage + ' V' : '--' }}</span>
          </div>
          <div class="tooltip-row" v-if="!isCar(hoveredDevice)">
            <span class="label">工作模式</span>
            <span class="value">{{ workModeText(hoveredDevice) }}</span>
          </div>
          <div class="tooltip-row">
            <span class="label">ICCID</span>
            <span class="value">{{ hoveredDevice.iccid || '--' }}</span>
          </div>
          <div class="tooltip-row address-row">
            <span class="label">当前位置</span>
            <span class="value ellipsis">
              <el-tooltip 
                :content="addressText(hoveredDevice)" 
                placement="top"
                :disabled="!addressText(hoveredDevice) || addressText(hoveredDevice) === '-'"
              >
                <span>{{ addressText(hoveredDevice) }}</span>
              </el-tooltip>
            </span>
          </div>
        </div>
      </div>
    </main>

    <el-drawer v-model="detailVisible" title="设备详情" size="30%">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="设备编号">{{ detailDevice.deviceId || selectedDeviceId || '-' }}</el-descriptions-item>
        <el-descriptions-item label="设备名称">{{ detailDevice.deviceName || selectedDevice?.deviceName || '-' }}</el-descriptions-item>
        <el-descriptions-item label="产品类型">{{ getProductTypeLabel(detailDevice.productTypeName || selectedDevice?.productTypeName || detailDevice.deviceType) }}</el-descriptions-item>
        <el-descriptions-item label="产品型号">{{ detailDevice.deviceModel || detailDevice.productName || selectedDevice?.productName || '-' }}</el-descriptions-item>
        <el-descriptions-item label="ICCID">{{ detailDevice.iccid || selectedDevice?.iccid || '-' }}</el-descriptions-item>
        <el-descriptions-item label="设备状态">{{ deviceStateText(detailDevice) || deviceStateText(selectedDevice) }}</el-descriptions-item>
        <el-descriptions-item label="最后通信">{{ formatTime(detailDevice.lastGateTime || detailDevice.LastGateTime || detailDevice.updatedAt || detailDevice.UpdatedAt || selectedDevice?.lastGateTime || selectedDevice?.updatedAt) }}</el-descriptions-item>
        <el-descriptions-item label="速度">{{ speedOf(detailDevice) }} km/h</el-descriptions-item>
        <el-descriptions-item label="卫星数">{{ detailDevice.satNum ?? selectedDevice?.satNum ?? 0 }}</el-descriptions-item>
        <el-descriptions-item label="信号">{{ rssiTooltip(detailDevice) }}</el-descriptions-item>
        <el-descriptions-item label="里程">{{ mileageText(detailDevice) }}</el-descriptions-item>
        <el-descriptions-item label="电量">{{ powerTooltip(detailDevice) }}</el-descriptions-item>
        <el-descriptions-item v-if="isCar(detailDevice) || isCar(selectedDevice)" label="ACC">{{ (detailDevice.acc ?? selectedDevice?.acc) === 1 ? '启动' : '熄火' }}</el-descriptions-item>
        <el-descriptions-item v-if="isCar(detailDevice) || isCar(selectedDevice)" label="设防">{{ (detailDevice.fortification ?? selectedDevice?.fortification) === 1 ? '设防' : '撤防' }}</el-descriptions-item>
        <el-descriptions-item v-if="isCar(detailDevice) || isCar(selectedDevice)" label="电压">{{ (detailDevice.voltage ?? selectedDevice?.voltage) != null ? (detailDevice.voltage ?? selectedDevice?.voltage) + ' V' : '--' }}</el-descriptions-item>
        <el-descriptions-item v-if="!isCar(detailDevice) && !isCar(selectedDevice)" label="工作模式">{{ workModeText(detailDevice) || workModeText(selectedDevice) }}</el-descriptions-item>
        <el-descriptions-item label="当前位置" show-overflow-tooltip>{{ addressText(detailDevice) || addressText(selectedDevice) }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>

    <el-drawer 
      v-model="trackVisible" 
      title="轨迹" 
      size="70%"
      @opened="onTrackDrawerOpened"
    >
      <div class="drawer-tools">
        <el-date-picker
          v-model="trackRange"
          type="datetimerange"
          value-format="YYYY-MM-DD HH:mm:ss"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
        <el-button type="primary" :icon="Search" @click="loadTrack">查询</el-button>
        <el-button :disabled="trackPoints.length === 0" :icon="VideoPlay" @click="playTrack">播放</el-button>
        <el-button :icon="VideoPause" @click="stopPlay">停止</el-button>
      </div>
      <div ref="trackMapRef" class="drawer-map"></div>
      <el-table 
        class="mt-12" 
        :data="trackPoints" 
        :height="trackTableHeight" 
        border
        style="width: 100%"
      >
        <el-table-column label="时间" prop="time" min-width="160" />
        <el-table-column label="经度" width="120"><template #default="{ row }">{{ coordText(row.lng) }}</template></el-table-column>
        <el-table-column label="纬度" width="120"><template #default="{ row }">{{ coordText(row.lat) }}</template></el-table-column>
        <el-table-column label="速度" prop="speed" width="90" />
        <el-table-column label="里程" width="100">
          <template #default="{ row }">{{ mileageText(row) }}</template>
        </el-table-column>
        <el-table-column label="定位方式" width="100">
          <template #default="{ row }">{{ posTypeLabel(row.posType) }}</template>
        </el-table-column>
        <el-table-column label="卫星数" prop="satNum" width="80" />
      </el-table>
    </el-drawer>

    <el-dialog v-model="cmdVisible" title="指令下发" width="1000px" :close-on-click-modal="false" @closed="resetCmdForm">
      <div class="cmd-modal">
        <div class="cmd-form-row">
          <span>指令：</span>
          <el-cascader
            v-model="selectedCmdId"
            class="cmd-select"
            clearable
            filterable
            placeholder="请选择指令"
            :loading="availableCmdLoading"
            :options="availableCmdOptions"
            :props="{ checkStrictly: true, emitPath: false, label: 'label', value: 'value', children: 'children' }"
            :show-all-levels="false"
            @change="onAvailableCmdChange"
          />
          <el-button type="primary" :loading="cmdSending" @click="sendCmd">立即发送</el-button>
          <el-button icon="refresh" @click="loadCmdHistory">刷新</el-button>
        </div>
        <div v-if="currentCmd" class="cmd-summary">
          <p><b>指令名称：</b>{{ currentCmd.cmdTitle || '-' }}</p>
          <p><b>指令类型：</b>{{ currentCmd.cmdCode || '-' }}</p>
          <p><b>指令描述：</b>{{ currentCmd.cmdDesc || '-' }}</p>
          <el-input v-if="isCustomCmd" v-model="customCmdText" class="mt-2" type="textarea" :rows="4" placeholder="请输入自定义指令" />
        </div>

        <h3 class="cmd-log-title">指令日志<small>（绿色的指令为最后一条待执行或已下发但设备未响应的离线指令。）</small></h3>
        <el-table :data="cmdHistory" v-loading="cmdHistoryLoading" max-height="380">
          <el-table-column label="设备编号" prop="deviceId" min-width="130" />
          <el-table-column label="指令名称" prop="cmdName" min-width="140" show-overflow-tooltip />
          <el-table-column label="指令内容" prop="cmdContent" min-width="150" show-overflow-tooltip />
          <el-table-column label="操作人" prop="operator" width="100" />
          <el-table-column label="下发渠道" prop="channel" width="110" />
          <el-table-column label="下发时间" width="150"><template #default="{ row }">{{ formatTime(row.sendTime || row.CreatedAt) }}</template></el-table-column>
          <el-table-column label="下发结果" width="130"><template #default="{ row }"><el-tag :type="getCmdResultType(row)" effect="plain">{{ getCmdResultText(row) }}</el-tag></template></el-table-column>
          <el-table-column label="回复" width="90"><template #default="{ row }"><el-button v-if="row.reply" type="primary" link @click="showCmdReply(row)">查看</el-button></template></el-table-column>
        </el-table>
        <div class="gva-pagination"><el-pagination small layout="prev,pager,next" :current-page="cmdHistoryPage" :page-size="cmdHistoryPageSize" :total="cmdHistoryTotal" @current-change="handleCmdHistoryPageChange" /></div>
      </div>
    </el-dialog>

    <el-dialog v-model="cmdReplyVisible" title="指令内容" width="560px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="下发内容">{{ selectedCmdReply.cmdContent || '-' }}</el-descriptions-item>
        <el-descriptions-item label="回复内容">{{ selectedCmdReply.reply || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <el-drawer v-model="fenceVisible" title="设备围栏" size="680px">
      <div class="drawer-tools">
        <el-button type="primary" icon="plus" @click="goFenceCreate">新增围栏</el-button>
        <el-button :icon="Refresh" @click="loadDeviceFences">刷新</el-button>
      </div>
      <el-table :data="deviceFences" height="560" border>
        <el-table-column label="围栏名称" prop="fenceName" min-width="160" show-overflow-tooltip />
        <el-table-column label="形状" width="100">
          <template #default="{ row }">{{ row.shapeType === 'circle' ? '圆形' : '多边形' }}</template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.enabled === false ? 'info' : 'success'">{{ row.enabled === false ? '停用' : '启用' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button link type="primary" @click="goFenceEdit(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script setup>
import { getLotTrack } from '@/api/lot/lotLocation'
import {
  dispatchDeviceCmd,
  getLocationCenter,
  getLotDeviceAvailableCmds,
  getLotDeviceCmdHistory,
  getLotDeviceDetail
} from '@/api/lot/lotDevice'
import { getMongoFenceList } from '@/api/lot/lotFence'
import { getLotDeptTree } from '@/api/lot/lotDept'
import { loadMapApi, hasMapAK, defaultMapCenter } from '@/utils/mapProvider'
import {
  Aim,
  CircleClose,
  Connection,
  CopyDocument,
  Document,
  Flag,
  Grid,
  Lightning,
  Link,
  Refresh,
  Search,
  Share,
  Van,
  VideoPlay,
  VideoPause
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/pinia'
import { getLotProductList } from '@/api/lot/lotProduct'
import { getDictFunc } from '@/utils/format'

defineOptions({ name: 'LotRealtimeLocation' })

const router = useRouter()
const userStore = useUserStore()
const mapRef = ref()
const trackMapRef = ref()
const mapError = ref('')
const keyword = ref('')
const statusFilter = ref('all')
const loading = ref(false)
const devices = ref([])
const selectedDevice = ref(null)
const selectedDeviceIds = ref([])
const selectAllVisible = ref(false)
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const countdown = ref(9)
const detailVisible = ref(false)
const detailDevice = ref({})
const deviceAddresses = ref({})
const trackVisible = ref(false)
const trackRange = ref([])
const trackPoints = ref([])
const trackTableHeight = ref(220)
const cmdVisible = ref(false)
const cmdSending = ref(false)
const availableCmds = ref([])
const availableCmdOptions = ref([])
const availableCmdLoading = ref(false)
const selectedCmdId = ref(null)
const isCustomCmd = ref(false)
const customCmdText = ref('')
const cmdHistory = ref([])
const cmdHistoryLoading = ref(false)
const cmdHistoryPage = ref(1)
const cmdHistoryPageSize = ref(10)
const cmdHistoryTotal = ref(0)
const cmdReplyVisible = ref(false)
const selectedCmdReply = ref({})
const fenceVisible = ref(false)
const deviceFences = ref([])
const deptTreeData = ref([])
const deptFilter = ref(null)
const productTypeOptions = ref([])

// ===== 当前时间 =====
const currentTime = ref('')

const updateCurrentTime = () => {
  const now = new Date()
  const pad = n => String(n).padStart(2, '0')
  currentTime.value = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}
let timeTimer = null

// ===== 地图悬停状态（与选中完全隔离） =====
const hoveredDevice = ref(null)
const hoveredDeviceId = ref(null)
const hoverMarker = ref(null)
let hoverTimer = null

let $m
let map
let trackMap
let playMarker
let playTimer
let refreshTimer
let countdownTimer
const markers = new Map()

const selectedDeviceId = computed(() => deviceIdOf(selectedDevice.value))
const currentCmd = computed(() => findCmdById(availableCmds.value, selectedCmdId.value) || null)
const selectedDispatchCmd = computed(() => currentCmd.value)
const filteredDevices = computed(() => {
  let list = devices.value
  if (statusFilter.value === 'online') list = list.filter(isOnline)
  else if (statusFilter.value === 'offline') list = list.filter(item => !isOnline(item) && activationText(item) !== '未激活')
  else if (statusFilter.value === 'inactive') list = list.filter(item => activationText(item) === '未激活')
  if (deptFilter.value) list = list.filter(item => Number(item.deptId) === Number(deptFilter.value))
  return list
})

// ========== 产品类型 ==========
const loadProductTypes = async () => {
  try {
    const typeDict = await getDictFunc('product_type')
    if (typeDict?.length) {
      productTypeOptions.value = typeDict
      return
    }
    const productRes = await getLotProductList({ page: 1, pageSize: 1000 })
    if (productRes.code === 0) {
      const products = productRes.data?.list || []
      const typeMap = new Map()
      products.forEach(p => {
        if (p.productTypeName && !typeMap.has(p.productTypeName)) {
          typeMap.set(p.productTypeName, { label: p.productTypeName, value: p.productTypeName })
        }
      })
      productTypeOptions.value = Array.from(typeMap.values())
    }
  } catch {
    // 加载失败不影响主流程
  }
}

const getProductTypeLabel = (value) => {
  if (value === undefined || value === null || value === '') return '-'
  const opt = productTypeOptions.value.find(item => String(item.value) === String(value))
  if (opt) return opt.label
  return value
}

const loadDeptTree = async () => {
  try {
    const res = await getLotDeptTree()
    if (res.code === 0 && res.data) deptTreeData.value = res.data
  } catch { /* ignore */ }
}

const onDeptNodeClick = (data) => {
  deptFilter.value = data ? data.ID : null
  page.value = 1
  reloadDevices()
}

const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '在线', value: 'online' },
  { label: '离线', value: 'offline' },
  { label: '未激活', value: 'inactive' }
]

watch(statusFilter, () => {
  drawDevices()
  syncSelectAll()
})

// ========== 地图初始化 ==========
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
    $m.centerAndZoom(map, $m.point(defaultMapCenter.lng, defaultMapCenter.lat), 13)
    $m.enableScrollWheelZoom(map)
  } catch (err) {
    mapError.value = err.message || '地图加载失败'
  }
}

// ========== 轨迹表格高度计算 ==========
const calcTrackTableHeight = () => {
  try {
    nextTick(() => {
      try {
        const drawerBody = document.querySelector('.el-drawer__body')
        if (!drawerBody) {
          console.warn('未找到抽屉主体元素')
          return
        }

        const mapEl = document.querySelector('.drawer-map')
        if (!mapEl) {
          console.warn('未找到地图容器')
          return
        }

        const toolsEl = document.querySelector('.drawer-tools')
        if (!toolsEl) {
          console.warn('未找到工具栏')
          return
        }

        const drawerHeight = drawerBody.clientHeight
        const toolsHeight = toolsEl.clientHeight || 60
        const mapHeight = mapEl.clientHeight || 360
        const paddingAndGap = 80

        const availableHeight = drawerHeight - toolsHeight - mapHeight - paddingAndGap
        
        if (availableHeight > 100) {
          trackTableHeight.value = Math.floor(availableHeight)
        } else {
          trackTableHeight.value = 220
        }
      } catch (innerError) {
        console.warn('计算表格高度失败:', innerError)
        trackTableHeight.value = 220
      }
    })
  } catch (error) {
    console.warn('calcTrackTableHeight 执行失败:', error)
    trackTableHeight.value = 220
  }
}

const onTrackDrawerOpened = () => {
  setTimeout(() => {
    calcTrackTableHeight()
  }, 300)
}

// ========== 设备相关 ==========
const reloadDevices = async() => {
  loading.value = true
  try {
    const params = { keyword: keyword.value, page: page.value, pageSize: pageSize.value }
    if (deptFilter.value) params.deptId = deptFilter.value
    const res = await getLocationCenter(params)
    if (res.code === 0) {
      devices.value = res.data?.list || []
      total.value = res.data?.total || 0
      const visibleOperableIds = new Set(devices.value.filter(canOperateDevice).map(deviceIdOf))
      selectedDeviceIds.value = selectedDeviceIds.value.filter(id => visibleOperableIds.has(id))
      if (selectedDevice.value && (!devices.value.some(item => deviceIdOf(item) === selectedDeviceId.value) || !canOperateDevice(selectedDevice.value))) selectedDevice.value = null
      if (!selectedDevice.value) selectedDevice.value = devices.value.find(canOperateDevice) || null
      if (selectedDevice.value) fetchAddress(selectedDevice.value)
      drawDevices()
      syncSelectAll()
    }
  } finally {
    loading.value = false
    countdown.value = 9
  }
  // 如果当前悬停的设备不在列表中，清除悬停状态
  if (hoveredDevice.value && !devices.value.some(item => deviceIdOf(item) === hoveredDeviceId.value)) {
    hideHoverTooltip()
  }
}

const drawDevices = () => {
  if (!map || !$m) return
  $m.clearOverlays(map)
  markers.clear()
  const points = []
  filteredDevices.value.forEach(item => {
    const point = pointOf(item)
    if (!point) return
    points.push(point)
    const mk = $m.marker(point)
    mk.setLabel($m.label(deviceIdOf(item), $m.size(-28, 22)))
    
    // ===== 添加鼠标悬停事件到地图标记 =====
    mk.addEventListener('mouseover', (e) => {
      if (canOperateDevice(item)) {
        onMarkerHover(item, e)
      }
    })
    mk.addEventListener('mouseout', onMarkerLeave)
    
    mk.addEventListener('click', () => selectDevice(item))
    markers.set(deviceIdOf(item), mk)
    $m.addOverlay(map, mk)
  })
  if (selectedDevice.value && canOperateDevice(selectedDevice.value)) focusSelected(false)
  else if (points.length) $m.setViewport(map, points)
}

const selectDevice = item => {
  if (!ensureDeviceOperable(item)) return
  selectedDevice.value = item
  fetchAddress(item)
  focusSelected()
}

const focusSelected = (zoom = true) => {
  if (!map || !$m || !selectedDevice.value) return
  const point = pointOf(selectedDevice.value)
  if (!point) return
  $m.centerAndZoom(map, point, zoom ? 17 : $m.getZoom(map))
}

const fitMap = () => {
  if (!map || !$m) return
  const points = filteredDevices.value.map(pointOf).filter(Boolean)
  if (points.length === 1) $m.centerAndZoom(map, points[0], 17)
  if (points.length > 1) $m.setViewport(map, points)
}

const closeInfoWindow = () => {
  selectedDevice.value = null
}

// ========== 地图标记悬停事件（悬浮框固定在右侧） ==========
const onMarkerHover = (item, event) => {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }

  const id = deviceIdOf(item)
  if (hoveredDeviceId.value === id) {
    return
  }

  if (!canOperateDevice(item)) {
    hideHoverTooltip()
    return
  }

  hoveredDevice.value = item
  hoveredDeviceId.value = id
  hoverMarker.value = markers.get(id)
  fetchAddress(item)
}

const onMarkerLeave = () => {
  hoverTimer = setTimeout(() => {
    hideHoverTooltip()
  }, 300)
}

const onTooltipEnter = () => {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
}

const onTooltipLeave = () => {
  hoverTimer = setTimeout(() => {
    hideHoverTooltip()
  }, 300)
}

const hideHoverTooltip = () => {
  hoveredDevice.value = null
  hoveredDeviceId.value = null
  hoverMarker.value = null
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
}


// ========== 详情 ==========
const openDetail = async item => {
  if (!ensureDeviceOperable(item)) return
  selectDevice(item)
  detailDevice.value = item
  detailVisible.value = true
  fetchAddress(item)
  const res = await getLotDeviceDetail(deviceIdOf(item))
  if (res.code === 0) detailDevice.value = { ...item, ...(res.data || {}) }
}

// ========== 轨迹 ==========
const openTrack = async item => {
  if (!ensureDeviceOperable(item)) return
  selectDevice(item)
  trackVisible.value = true
  await nextTick()
  initTrackMap()
  loadTrack()
}

const initTrackMap = () => {
  if (!$m || !trackMapRef.value) return
  if (!trackMap) {
    trackMap = $m.createMap(trackMapRef.value)
    $m.centerAndZoom(trackMap, $m.point(defaultMapCenter.lng, defaultMapCenter.lat), 12)
    $m.enableScrollWheelZoom(trackMap)
  }
}

const loadTrack = async() => {
  if (!selectedDeviceId.value) return
  if (selectedDevice.value && !ensureDeviceOperable(selectedDevice.value)) return
  const res = await getLotTrack({
    deviceId: selectedDeviceId.value,
    startTime: trackRange.value?.[0],
    endTime: trackRange.value?.[1]
  })
  if (res.code === 0) {
    trackPoints.value = res.data?.points || []
    drawTrack()
    setTimeout(() => {
      calcTrackTableHeight()
    }, 100)
  }
}

const drawTrack = () => {
  if (!trackMap || !$m) return
  stopPlay()
  $m.clearOverlays(trackMap)
  const points = trackPoints.value.map(item => $m.point(Number(item.lng), Number(item.lat))).filter(item => item.lng && item.lat)
  if (!points.length) return
  $m.addOverlay(trackMap, $m.polyline(points, { strokeColor: '#2f80ed', strokeWeight: 4, strokeOpacity: 0.86 }))
  $m.addOverlay(trackMap, $m.marker(points[0]))
  $m.addOverlay(trackMap, $m.marker(points[points.length - 1]))
  $m.setViewport(trackMap, points)
}

const playTrack = () => {
  if (!trackMap || !$m || trackPoints.value.length === 0) return
  stopPlay()
  let index = 0
  playMarker = $m.marker($m.point(trackPoints.value[0].lng, trackPoints.value[0].lat))
  $m.addOverlay(trackMap, playMarker)
  playTimer = window.setInterval(() => {
    index += 1
    if (index >= trackPoints.value.length) return stopPlay()
    const point = $m.point(trackPoints.value[index].lng, trackPoints.value[index].lat)
    playMarker.setPosition(point)
    $m.panTo(trackMap, point)
  }, 700)
}

const stopPlay = () => {
  if (playTimer) window.clearInterval(playTimer)
  playTimer = null
}

// ========== 指令 ==========
const getCmdId = (cmd) => cmd?.ID ?? cmd?.id

const openCmd = async item => {
  if (!ensureDeviceOperable(item)) return
  selectDevice(item)
  resetCmdForm()
  cmdVisible.value = true
  await loadAvailableCmds(deviceIdOf(item))
  await loadCmdHistory()
}

const resetCmdForm = () => {
  selectedCmdId.value = null
  customCmdText.value = ''
  isCustomCmd.value = false
  availableCmds.value = []
  availableCmdOptions.value = []
  cmdHistory.value = []
  cmdHistoryPage.value = 1
  cmdHistoryTotal.value = 0
}

const toCascaderOptions = (nodes) => (nodes || []).map(item => ({ value: getCmdId(item), label: item.cmdTitle || item.cmdCode || getCmdId(item), children: item.children?.length ? toCascaderOptions(item.children) : undefined }))

const loadAvailableCmds = async (deviceId) => {
  availableCmdLoading.value = true
  const res = await getLotDeviceAvailableCmds(deviceId)
  availableCmdLoading.value = false
  if (res.code === 0) {
    availableCmds.value = res.data?.cmdList || res.data?.list || res.data || []
    availableCmdOptions.value = toCascaderOptions(availableCmds.value)
    if (!availableCmdOptions.value.length) ElMessage.warning('当前设备暂无绑定指令')
  }
}

const loadCmdHistory = async () => {
  if (!selectedDeviceId.value) return
  cmdHistoryLoading.value = true
  const res = await getLotDeviceCmdHistory(selectedDeviceId.value, { page: cmdHistoryPage.value, pageSize: cmdHistoryPageSize.value })
  cmdHistoryLoading.value = false
  if (res.code === 0) {
    cmdHistory.value = res.data?.list || []
    cmdHistoryTotal.value = res.data?.total || 0
    cmdHistoryPage.value = res.data?.page || cmdHistoryPage.value
  }
}

const handleCmdHistoryPageChange = (val) => {
  cmdHistoryPage.value = val
  loadCmdHistory()
}

const findCmdById = (list, id) => {
  for (const item of list || []) {
    if (Number(getCmdId(item)) === Number(id)) return item
    const child = findCmdById(item.children || [], id)
    if (child) return child
  }
  return null
}

const onAvailableCmdChange = (id) => {
  const cmd = findCmdById(availableCmds.value, id)
  if (!cmd) return
  applySelectedCmd(cmd)
}

const applySelectedCmd = (cmd) => {
  isCustomCmd.value = isCustomCommand(cmd)
  customCmdText.value = isCustomCmd.value ? (cmd?.cmdContent || cmd?.template || '') : ''
}

const getCmdCode = (cmd) => cmd?.cmdCode || ''

const isCustomCommand = (cmd) => getCmdCode(cmd) === 'CUSTOM_CMD'

const parseCmdParams = (template) => {
  if (!template) return {}
  try {
    const parsed = JSON.parse(template)
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed
  } catch {
    ElMessage.error('指令参数格式错误')
    return null
  }
  return {}
}

const getCurrentOperator = () => userStore.userInfo?.nickName || userStore.userInfo?.userName || userStore.userInfo?.ID?.toString() || ''

const getCanOfflineValue = (cmd) => {
  if (cmd?.cmdFlags) return cmd.cmdFlags === 'OFFLINE' ? 1 : 0
  if (cmd?.canOffline === undefined || cmd?.canOffline === null) return undefined
  return Number(cmd.canOffline) === 0 ? 1 : 0
}

const buildOldCmdPayload = (cmd) => {
  const isCustom = isCustomCommand(cmd)
  if (isCustom && !customCmdText.value) {
    ElMessage.warning('请输入自定义指令')
    return null
  }
  const params = isCustom ? {} : parseCmdParams(cmd.cmdContent || cmd.template)
  if (params === null) return null
  const sd = isCustom ? customCmdText.value : undefined
  const cmdParamsText = JSON.stringify(params)
  return {
    cmdId: getCmdId(cmd),
    cmdCode: getCmdCode(cmd),
    params,
    sd,
    cmdTitle: cmd.cmdTitle,
    cmdName: cmd.cmdTitle,
    cmdParams: cmdParamsText,
    cmdContent: sd || cmdParamsText,
    operator: getCurrentOperator(),
    canOffline: getCanOfflineValue(cmd),
    appSource: 'web',
    channel: 'web'
  }
}

const sendCmd = async () => {
  if (!selectedCmdId.value) return ElMessage.warning('请选择指令')
  const cmd = selectedDispatchCmd.value
  if (!cmd) return ElMessage.warning('请选择指令')
  const payload = buildOldCmdPayload(cmd)
  if (!payload) return
  if (!selectedDeviceId.value) return ElMessage.warning('请选择设备')
  if (selectedDevice.value && !ensureDeviceOperable(selectedDevice.value)) return
  cmdSending.value = true
  try {
    const res = await dispatchDeviceCmd({ ...payload, deviceId: selectedDeviceId.value })
    if (res.code === 0) {
      ElMessage.success('发送成功')
      loadCmdHistory()
    }
  } finally {
    cmdSending.value = false
  }
}

const getCmdResultType = (row) => row.offlineEffect ? 'success' : row.result === 'success' ? 'success' : row.result === 'fail' ? 'danger' : 'warning'
const getCmdResultText = (row) => row.reply ? '终端回复成功' : row.result === 'success' ? '下发成功' : row.result === 'fail' ? '下发失败' : row.offlineEffect ? '离线待执行' : '待处理'
const showCmdReply = (row) => {
  selectedCmdReply.value = row
  cmdReplyVisible.value = true
}

// ========== 围栏 ==========
const openFence = async item => {
  if (!ensureDeviceOperable(item)) return
  selectDevice(item)
  fenceVisible.value = true
  loadDeviceFences()
}

const loadDeviceFences = async() => {
  const res = await getMongoFenceList({ page: 1, pageSize: 100, deviceId: selectedDeviceId.value })
  if (res.code === 0) deviceFences.value = res.data?.list || []
}

const goFenceCreate = () => router.push({ name: 'LotFence', query: { deviceId: selectedDeviceId.value, action: 'create' } })
const goFenceEdit = row => router.push({ name: 'LotFence', query: { id: row.id, deviceId: selectedDeviceId.value } })

// ========== 工具函数 ==========
const pointOf = item => {
  const lng = Number(item?.lng ?? item?.latestLocation?.longitude ?? item?.longitude)
  const lat = Number(item?.lat ?? item?.latestLocation?.latitude ?? item?.latitude)
  if (!lng || !lat || !$m) return null
  return $m.deviceGeoPoint(lng, lat)
}

const deviceIdOf = item => item?.deviceId || item?.DeviceId || ''
const isOnline = item => Number(item?.onlineStatus ?? item?.status) === 1 || item?.onlineStatus === 'online' || item?.statusText === '在线'
const activationText = item => {
  if (Number(item?.disableStatus) === 1) return '已禁用'
  return item?.activationStatusText || (Number(item?.activationStatus) === 1 ? '已激活' : Number(item?.activationStatus) === -1 ? '已停机' : '未激活')
}
const motionText = item => {
  const v = item?.motionState
  if (v === null || v === undefined) return ''
  return Number(v) === 1 ? '运动中' : '静止'
}
const offlineDurationText = item => {
  const dur = item?.offlineDuration
  if (dur !== null && dur !== undefined && Number(dur) > 0) {
    const totalMin = Math.floor(Number(dur) / 60)
    const hours = Math.floor(totalMin / 60)
    const minutes = totalMin % 60
    if (hours > 0) return `离线 ${hours}小时${minutes}分钟`
    return `离线 ${minutes}分钟`
  }
  return '离线'
}
const deviceStateText = item => {
  if (Number(item?.disableStatus) === 1) return '已禁用'
  if (!isActivatedDevice(item)) {
    if (Number(item?.activationStatus) === -1) return '已停机'
    return '未激活'
  }
  if (isOnline(item)) {
    const motion = motionText(item)
    if (motion) return motion
    return '在线'
  }
  return offlineDurationText(item)
}
const hasActivationStatus = item => item?.activationStatus !== undefined && item?.activationStatus !== null && item?.activationStatus !== ''
const hasActiveTime = item => {
  const value = item?.activeTime || item?.ActiveTime
  if (!value) return false
  const text = String(value)
  return !text.startsWith('0001-01-01') && text !== '0001-01-01 00:00:00'
}
const isActivatedDevice = item => hasActivationStatus(item) ? Number(item.activationStatus) === 1 : hasActiveTime(item)
const canOperateDevice = item => isActivatedDevice(item) && Number(item?.disableStatus || 0) !== 1
const ensureDeviceOperable = item => {
  if (canOperateDevice(item)) return true
  ElMessage.warning('设备未激活或已禁用，不能操作')
  return false
}
const speedOf = item => Number(item?.speed ?? item?.latestLocation?.speed ?? 0).toFixed(0)
const locationAt = item => item?.lastPosTime || item?.latestLocation?.locationAt || item?.reportTime || item?.updatedAt || item?.UpdatedAt
const addressText = item => item?.address || item?.latestAddress || deviceAddresses.value[deviceIdOf(item)] || item?.raw?.address || '-'

// ========== 状态辅助函数（用于信息窗口） ==========
const getStatusClass = (item) => {
  if (Number(item?.disableStatus) === 1) return 'inactive'
  if (!isActivatedDevice(item)) {
    if (Number(item?.activationStatus) === -1) return 'inactive'
    return 'inactive'
  }
  if (isOnline(item)) return 'online'
  return 'offline'
}

const getStatusText = (item) => {
  if (Number(item?.disableStatus) === 1) return '已禁用'
  if (!isActivatedDevice(item)) {
    if (Number(item?.activationStatus) === -1) return '已停机'
    return '未激活'
  }
  if (isOnline(item)) {
    const motion = motionText(item)
    if (motion) return motion
    return '在线'
  }
  return offlineDurationText(item)
}

// ========== 运动详情（如：静止 15分钟） ==========
const getMotionDetail = (item) => {
  if (!isOnline(item)) return ''
  const motion = motionText(item)
  if (!motion) return ''
  const dur = item?.offlineDuration
  if (dur !== null && dur !== undefined && Number(dur) > 0) {
    const totalMin = Math.floor(Number(dur) / 60)
    const hours = Math.floor(totalMin / 60)
    const minutes = totalMin % 60
    if (hours > 0) return `${motion} ${hours}h${minutes}m`
    return `${motion} ${minutes}m`
  }
  return motion
}

const fetchAddress = async (item) => {
  if (!$m) return
  const id = deviceIdOf(item)
  if (deviceAddresses.value[id] !== undefined) return
  const point = pointOf(item)
  if (!point) {
    deviceAddresses.value[id] = ''
    return
  }
  const geocoder = $m.createGeocoder()
  geocoder.getLocation(point, (result) => {
    deviceAddresses.value[id] = result?.address || ''
  })
}

const rawValue = (item, key) => item?.[key] ?? item?.raw?.[key] ?? item?.latestLocation?.raw?.[key] ?? item?.latestLocation?.[key]

const POS_TYPE_LABELS = {
  0: '未定位',
  1: '卫星定位',
  2: 'WIFI定位',
  3: '基站定位',
  4: '多基站定位',
  5: '混合定位'
}
const posTypeText = item => {
  const code = rawValue(item, 'posType')
  if (code === undefined || code === null || code === '') return '--'
  return POS_TYPE_LABELS[Number(code)] ?? `未知(${code})`
}

const posTypeLabel = code => POS_TYPE_LABELS[code] ?? (code !== undefined && code !== null ? '未知(' + code + ')' : '--')

const coordText = v => (v === null || v === undefined || v === '' ? '无GPS定位' : v)

const isCar = item => String(item?.productTypeName || item?.ProductTypeName || '') === '1'

// ========== 电量 ==========
const powerIcon = (item) => {
  const charge = item?.charge ?? item?.Charge
  const pct = item?.powerPercent ?? item?.PowerPercent
  if (charge === 1) return '⚡'
  if (pct !== null && pct !== undefined) {
    if (pct >= 80) return '🔋'
    if (pct >= 50) return '🪫'
    if (pct >= 20) return '🔋'
    return '🪫'
  }
  return '--'
}

const powerDisplayText = (item) => {
  const charge = item?.charge ?? item?.Charge
  const pct = item?.powerPercent ?? item?.PowerPercent
  if (charge === 1) return '充电'
  if (pct !== null && pct !== undefined) return `${pct}%`
  return '--'
}

const powerTooltip = (item) => {
  const charge = item?.charge ?? item?.Charge
  const pct = item?.powerPercent ?? item?.PowerPercent
  if (charge === 1) return '充电中'
  if (pct !== null && pct !== undefined) return `${pct}%`
  return '--'
}

const getPowerTextClass = (item) => {
  const charge = item?.charge ?? item?.Charge
  const pct = item?.powerPercent ?? item?.PowerPercent
  if (charge === 1) return 'power-text-charging'
  if (pct !== null && pct !== undefined) {
    if (pct >= 80) return 'power-text-high'
    if (pct >= 50) return 'power-text-medium'
    if (pct >= 20) return 'power-text-low'
    return 'power-text-critical'
  }
  return 'power-text-unknown'
}

// ========== 信号 ==========
const rssiIcon = (item) => {
  const v = item?.rssi ?? item?.Rssi
  if (v === null || v === undefined) return '📡'
  if (v >= -70) return '📶'
  if (v >= -90) return '📶'
  return '📶'
}

const rssiDisplayText = (item) => {
  const v = item?.rssi ?? item?.Rssi
  if (v === null || v === undefined) return '无'
  if (v >= -70) return '优'
  if (v >= -90) return '良'
  return '无'
}

const rssiTooltip = (item) => {
  const v = item?.rssi ?? item?.Rssi
  if (v === null || v === undefined) return '无'
  if (v >= -70) return '优'
  if (v >= -90) return '良'
  return '无'
}

const getRssiTextClass = (item) => {
  const v = item?.rssi ?? item?.Rssi
  if (v === null || v === undefined) return 'signal-text-none'
  if (v >= -70) return 'signal-text-good'
  if (v >= -90) return 'signal-text-medium'
  return 'signal-text-none'
}

const getRssiClass = (item) => {
  const v = item?.rssi ?? item?.Rssi
  if (v === null || v === undefined) return 'signal-unknown'
  if (v >= -70) return 'signal-strong'
  if (v >= -90) return 'signal-medium'
  return 'signal-weak'
}

const getPowerClass = (item) => {
  const charge = item?.charge ?? item?.Charge
  const pct = item?.powerPercent ?? item?.PowerPercent
  if (charge === 1) return 'power-charging'
  if (pct !== null && pct !== undefined) {
    if (pct >= 80) return 'power-high'
    if (pct >= 50) return 'power-medium'
    if (pct >= 20) return 'power-low'
    return 'power-critical'
  }
  return 'power-unknown'
}

const mileageText = item => {
  const v = item?.mileage ?? item?.Mileage
  if (v === null || v === undefined) return '--'
  const km = Number(v) / 1000
  return km >= 1 ? km.toFixed(1) + ' km' : Number(v) + ' m'
}

const workModeText = item => {
  const v = item?.workMode ?? item?.WorkMode
  if (v === null || v === undefined || v === '') return '--'
  return String(v)
}

const formatTime = value => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  const pad = n => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

// ========== 选择相关 ==========
const toggleDeviceSelection = (item, checked) => {
  if (checked && !ensureDeviceOperable(item)) return
  const id = deviceIdOf(item)
  selectedDeviceIds.value = checked
    ? [...new Set([...selectedDeviceIds.value, id])]
    : selectedDeviceIds.value.filter(itemId => itemId !== id)
  syncSelectAll()
}

const toggleVisibleSelection = checked => {
  const visibleIds = filteredDevices.value.filter(canOperateDevice).map(deviceIdOf)
  selectedDeviceIds.value = checked
    ? [...new Set([...selectedDeviceIds.value, ...visibleIds])]
    : selectedDeviceIds.value.filter(id => !visibleIds.includes(id))
}

const syncSelectAll = () => {
  selectAllVisible.value = filteredDevices.value.length > 0 && filteredDevices.value.every(row => selectedDeviceIds.value.includes(deviceIdOf(row)))
}

const changePage = val => {
  page.value = val
  reloadDevices()
}

// const copyDeviceId = async () => {
//   const text = selectedDeviceId.value
//   if (!text) {
//     ElMessage.warning('没有可复制的设备ID')
//     return
//   }

//   try {
//     if (navigator.clipboard && navigator.clipboard.writeText) {
//       await navigator.clipboard.writeText(text)
//       ElMessage.success('已复制设备ID')
//       return
//     }
//   } catch (clipboardError) {
//     console.warn('Clipboard API 失败，使用降级方案')
//   }

//   let textarea = null
//   try {
//     textarea = document.createElement('textarea')
//     textarea.value = text
//     textarea.style.position = 'fixed'
//     textarea.style.opacity = '0'
//     textarea.style.left = '-9999px'
//     textarea.style.top = '-9999px'
//     textarea.style.width = '1px'
//     textarea.style.height = '1px'
//     textarea.setAttribute('readonly', 'readonly')
//     document.body.appendChild(textarea)
    
//     textarea.select()
//     textarea.setSelectionRange(0, text.length)
    
//     const success = document.execCommand('copy')
//     if (success) {
//       ElMessage.success('已复制设备ID')
//     } else {
//       ElMessage.info(`设备ID: ${text}`)
//     }
//   } catch (execError) {
//     console.error('复制失败:', execError)
//     ElMessage.info(`设备ID: ${text}`)
//   } finally {
//     if (textarea && textarea.parentNode) {
//       document.body.removeChild(textarea)
//     }
//   }
// }

// ========== 定时器 ==========
const startTimers = () => {
  refreshTimer = window.setInterval(reloadDevices, 9000)
  countdownTimer = window.setInterval(() => {
    countdown.value = countdown.value <= 1 ? 9 : countdown.value - 1
  }, 1000)
}

// ========== 生命周期 ==========
onMounted(async() => {
  await Promise.all([
    loadDeptTree(),
    loadProductTypes()
  ])
  await nextTick()
  await initMap()
  await reloadDevices()
  startTimers()
  
  // 初始化当前时间并每秒更新
  updateCurrentTime()
  timeTimer = window.setInterval(updateCurrentTime, 1000)
  
  window.addEventListener('resize', () => {
    if (trackVisible.value) {
      calcTrackTableHeight()
    }
  })
})

onBeforeUnmount(() => {
  window.clearInterval(refreshTimer)
  window.clearInterval(countdownTimer)
  window.clearInterval(timeTimer)
  stopPlay()
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
.locator-page {
  display: grid;
  grid-template-columns: 200px 340px minmax(0, 1fr);
  height: calc(100vh - 120px);
  min-height: 680px;
  background: #eaf6ff;
}

.dept-panel {
  padding: 12px;
  background: #fff;
  border-right: 1px solid #dbe7f2;
  overflow-y: auto;
}

.dept-panel .panel-title {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
  color: #303133;
}

.device-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: #fff;
  border-right: 1px solid #dbe7f2;
  overflow-y: auto;
}

.panel-head,
.check-row,
.map-toolbar,
.drawer-tools {
  display: flex;
  align-items: center;
}

.panel-head,
.check-row,
.map-toolbar {
  justify-content: space-between;
}

.panel-title {
  font-size: 18px;
  font-weight: 700;
}

.panel-subtitle,
.check-row,
.device-name,
.device-meta {
  color: #606266;
  font-size: 13px;
}

.search-row {
  display: grid;
  grid-template-columns: 1fr 40px;
  gap: 6px;
}

.device-scroll {
  flex: 1;
  min-height: 0;
}

.device-card {
  position: relative;
  display: grid;
  grid-template-columns: 24px 48px 1fr auto;
  gap: 10px;
  min-height: 124px;
  padding: 12px 10px 52px;
  margin-bottom: 10px;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  cursor: pointer;
}

.device-card.active {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.12);
}

.card-check {
  margin-top: 14px;
}

.car-badge {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  color: #f47b20;
  background: #fff1e6;
  border-radius: 24px;
  font-size: 22px;
}

.device-main {
  min-width: 0;
}

.device-id {
  overflow: hidden;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.device-name {
  margin-top: 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.device-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 6px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 3px;
}

.meta-icon {
  font-size: 14px;
}

.power-text-charging {
  color: #16a34a;
  font-weight: 600;
}
.power-text-high {
  color: #16a34a;
  font-weight: 600;
}
.power-text-medium {
  color: #f59e0b;
  font-weight: 600;
}
.power-text-low {
  color: #ef4444;
  font-weight: 600;
}
.power-text-critical {
  color: #dc2626;
  font-weight: 600;
}
.power-text-unknown {
  color: #9ca3af;
}

.signal-text-good {
  color: #16a34a;
  font-weight: 600;
}
.signal-text-medium {
  color: #f59e0b;
  font-weight: 600;
}
.signal-text-none {
  color: #ef4444;
  font-weight: 600;
}

.device-state {
  color: #909399;
  font-size: 13px;
  white-space: nowrap;
}

.card-actions {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid #edf0f5;
}

.card-actions button {
  height: 40px;
  color: #0b7ff3;
  background: #fff;
  border: 0;
  cursor: pointer;
}

.card-actions button:disabled {
  color: #a8abb2;
  cursor: not-allowed;
}

.card-actions button + button {
  border-left: 1px solid #edf0f5;
}

.map-shell {
  position: relative;
  min-width: 0;
}

.map-toolbar {
  position: absolute;
  z-index: 5;
  top: 20px;
  right: 160px;
  left: 20px;
  pointer-events: none;
}

.timer-button,
.map-search {
  pointer-events: auto;
}

.timer-button span {
  margin-left: 12px;
  color: #409eff;
}

.map-search {
  display: grid;
  grid-template-columns: minmax(260px, 400px) 36px 36px;
  gap: 6px;
}

.map-canvas {
  width: 100%;
  height: 100%;
  min-height: 680px;
  background: #eaf6ff;
}

.map-empty {
  display: grid;
  height: 100%;
  place-items: center;
  color: #909399;
}

/* ===== 选中设备信息窗口 ===== */
.info-window {
  position: absolute;
  z-index: 6;
  top: 104px;
  left: 24px;
  width: 280px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 0;
  font-size: 13px;
  color: #1a1a2e;
  overflow: hidden;
}

.info-window .info-header {
  display: flex;
  align-items: center;
  padding: 10px 14px 6px;
  background: #f8f9fa;
  border-bottom: 1px solid #f0f0f0;
  gap: 8px;
  flex-wrap: wrap;
}

.info-window .info-header .device-id {
  font-weight: 600;
  font-size: 14px;
  color: #1a1a2e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100px;
  flex-shrink: 1;
}

.info-window .info-header .current-time {
  font-size: 12px;
  color: #6b7280;
  font-weight: 400;
  flex-shrink: 0;
}

.info-window .info-header .battery {
  font-size: 13px;
  font-weight: 500;
  margin-left: auto;
  flex-shrink: 0;
}

.info-window .info-header .battery.power-charging {
  color: #22c55e;
}
.info-window .info-header .battery.power-high {
  color: #22c55e;
}
.info-window .info-header .battery.power-medium {
  color: #f59e0b;
}
.info-window .info-header .battery.power-low {
  color: #ef4444;
}
.info-window .info-header .battery.power-critical {
  color: #dc2626;
}
.info-window .info-header .battery.power-unknown {
  color: #9ca3af;
}

.info-window .info-header .signal {
  font-size: 13px;
  font-weight: 500;
  flex-shrink: 0;
}

.info-window .info-header .signal.signal-strong {
  color: #22c55e;
}
.info-window .info-header .signal.signal-medium {
  color: #f59e0b;
}
.info-window .info-header .signal.signal-weak {
  color: #ef4444;
}
.info-window .info-header .signal.signal-unknown {
  color: #9ca3af;
}

.info-window .info-body {
  padding: 8px 14px 10px;
}

.info-window .status-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.info-window .status-row .status-badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.info-window .status-row .status-badge.online {
  background: #dcfce7;
  color: #16a34a;
}

.info-window .status-row .status-badge.offline {
  background: #fee2e2;
  color: #dc2626;
}

.info-window .status-row .status-badge.inactive {
  background: #fef3c7;
  color: #d97706;
}

.info-window .status-row .pos-type {
  font-size: 12px;
  color: #6b7280;
}

.info-window .info-grid {
  display: flex;
  gap: 20px;
  margin: 2px 0;
}

.info-window .info-grid .info-item {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.info-window .info-grid .info-item .label {
  font-size: 12px;
  color: #9ca3af;
}

.info-window .info-grid .info-item .value {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a2e;
}

.info-window .motion-row {
  margin: 1px 0 3px;
}

.info-window .motion-row .motion-text {
  font-size: 12px;
  color: #6b7280;
}

.info-window .address-row {
  margin-top: 4px;
  padding-top: 5px;
  border-top: 1px solid #f0f0f0;
}

.info-window .address-row .address-text {
  font-size: 12px;
  color: #6b7280;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.info-window .info-footer {
  display: flex;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}

.info-window .info-footer button {
  flex: 1;
  padding: 10px 0;
  background: transparent;
  border: none;
  color: #409eff;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
  border-radius: 0;
}

.info-window .info-footer button:hover:not(:disabled) {
  background: #ecf5ff;
}

.info-window .info-footer button + button {
  border-left: 1px solid #f0f0f0;
}

.info-window .info-footer button:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.info-window .info-footer .close-btn {
  flex: 0 0 40px;
  color: #9ca3af;
  border-left: 1px solid #f0f0f0;
}

.info-window .info-footer .close-btn:hover {
  background: #fef2f2;
  color: #ef4444;
}

/* ===== 地图悬浮弹框（无底部按钮） ===== */
.map-hover-tooltip {
  position: absolute;
  z-index: 6;
  top: 104px;
  right: 24px;
  width: 340px;
  max-height: 560px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(64, 158, 255, 0.2);
  padding: 0;
  pointer-events: auto;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
  font-size: 13px;
  color: #303133;
  overflow: hidden;
}

.map-hover-tooltip.tooltip-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.map-hover-tooltip .tooltip-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 8px;
  border-bottom: 1px solid #f0f2f5;
  background: #fafcff;
}

.map-hover-tooltip .tooltip-header .device-id {
  font-weight: 700;
  font-size: 14px;
  color: #1a3a5c;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}

.map-hover-tooltip .tooltip-header-icons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.map-hover-tooltip .tooltip-header-icons .el-icon {
  font-size: 18px;
  cursor: default;
}

.map-hover-tooltip .tooltip-header-icons .signal-strong {
  color: #16a34a;
}
.map-hover-tooltip .tooltip-header-icons .signal-medium {
  color: #f59e0b;
}
.map-hover-tooltip .tooltip-header-icons .signal-weak {
  color: #ef4444;
}
.map-hover-tooltip .tooltip-header-icons .signal-unknown {
  color: #9ca3af;
}

.map-hover-tooltip .tooltip-header-icons .power-charging {
  color: #16a34a;
}
.map-hover-tooltip .tooltip-header-icons .power-high {
  color: #16a34a;
}
.map-hover-tooltip .tooltip-header-icons .power-medium {
  color: #f59e0b;
}
.map-hover-tooltip .tooltip-header-icons .power-low {
  color: #ef4444;
}
.map-hover-tooltip .tooltip-header-icons .power-critical {
  color: #dc2626;
}
.map-hover-tooltip .tooltip-header-icons .power-unknown {
  color: #9ca3af;
}

.map-hover-tooltip .tooltip-body {
  padding: 8px 14px 12px;
  max-height: 480px;
  overflow-y: auto;
}

.map-hover-tooltip .tooltip-body::-webkit-scrollbar {
  width: 4px;
}

.map-hover-tooltip .tooltip-body::-webkit-scrollbar-thumb {
  background: #d0d5dd;
  border-radius: 4px;
}

.map-hover-tooltip .tooltip-body::-webkit-scrollbar-track {
  background: transparent;
}

.map-hover-tooltip .tooltip-row {
  display: flex;
  align-items: center;
  padding: 3px 0;
  gap: 10px;
}

.map-hover-tooltip .tooltip-row .label {
  color: #909399;
  font-size: 12px;
  min-width: 64px;
  flex-shrink: 0;
}

.map-hover-tooltip .tooltip-row .value {
  color: #303133;
  font-weight: 500;
  font-size: 13px;
  flex: 1;
  min-width: 0;
}

.map-hover-tooltip .tooltip-row .value .duration {
  margin-left: 6px;
  font-weight: 400;
  color: #606266;
}

.map-hover-tooltip .tooltip-row .value.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.map-hover-tooltip .tooltip-row.address-row .value {
  font-weight: 400;
  color: #606266;
  font-size: 12px;
  cursor: default;
}

.drawer-tools {
  gap: 10px;
  margin-bottom: 12px;
  flex-shrink: 0;
  flex-wrap: wrap;
}

.drawer-map {
  height: 360px;
  background: #f3f4f6;
  flex-shrink: 0;
  border-radius: 4px;
}

.mt-12 {
  margin-top: 12px;
  flex: 1;
  min-height: 0;
}

.mt-2 {
  margin-top: 8px;
}

:deep(.el-drawer__body) {
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;
}

:deep(.el-table) {
  flex: 1;
  min-height: 0;
}

.cmd-modal {
  min-height: 620px;
}

.cmd-form-row {
  display: flex;
  gap: 12px;
  align-items: center;
}

.cmd-select {
  width: 240px;
}

.cmd-summary {
  margin-top: 10px;
  padding: 14px 18px;
  background: #eef4ff;
  min-height: 120px;
}

.cmd-summary p {
  margin: 8px 0;
}

.cmd-log-title {
  margin: 22px 0 12px;
  font-size: 16px;
  font-weight: 700;
}

.cmd-log-title small {
  margin-left: 4px;
  font-size: 14px;
  font-weight: 600;
}

.gva-pagination {
  display: flex;
  justify-content: flex-end;
  padding: 12px 0;
}

@media (max-width: 1400px) {
  .locator-page {
    grid-template-columns: 180px 300px minmax(0, 1fr);
  }
}

@media (max-width: 1200px) {
  .locator-page {
    grid-template-columns: 300px minmax(0, 1fr);
  }
  .dept-panel {
    display: none;
  }
  .info-window {
    left: 24px;
  }
  .map-hover-tooltip {
    right: 24px;
  }
}

@media (max-width: 768px) {
  .drawer-map {
    height: 200px;
  }
  .info-window {
    width: 240px;
    left: 12px;
  }
  .map-hover-tooltip {
    width: 260px;
    right: 12px;
  }
}
</style>