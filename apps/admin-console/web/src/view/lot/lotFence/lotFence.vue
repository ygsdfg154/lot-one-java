<template>
  <div class="fence-page">
    <!-- 三栏布局：部门树 | 列表 | 地图 -->
    <div class="fence-layout">
      <!-- 左侧部门树 -->
      <div class="dept-tree-panel">
        <div class="panel-title">组织架构</div>
        <el-tree
          ref="deptTreeRef"
          :data="deptTreeData"
          :props="{ label: 'deptName', children: 'children' }"
          node-key="ID"
          highlight-current
          :expand-on-click-node="true"
          default-expand-all
          @node-click="onDeptNodeClick"
        />
      </div>

      <!-- 中间列表区 -->
      <div class="list-panel">
        <div class="gva-search-box">
          <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" @keyup.enter="onSubmit">
            <el-form-item label="围栏名称">
              <el-input v-model="searchInfo.keyword" clearable placeholder="请输入围栏名称" style="width: 180px" />
            </el-form-item>
            <el-form-item label="围栏形状">
              <el-select v-model="searchInfo.shapeType" clearable placeholder="请选择形状" style="width: 130px">
                <el-option label="圆形" value="circle" />
                <el-option label="多边形" value="polygon" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="searchInfo.deptSubordinate">包含子级</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
              <el-button icon="refresh" @click="onReset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class="gva-table-box">
          <div class="gva-btn-list">
            <el-button type="primary" icon="plus" @click="openDialog()">新增围栏</el-button>
            <el-button
              danger
              icon="delete"
              :disabled="!multipleSelection.length"
              @click="onBatchDelete"
            >删除</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            row-key="id"
            style="width: 100%"
            highlight-current-row
            @selection-change="handleSelectionChange"
            @current-change="selectFence"
          >
            <el-table-column type="selection" width="45" />
            <el-table-column label="序号" type="index" width="52" />

            <el-table-column label="围栏名称" prop="fenceName" min-width="140" show-overflow-tooltip />

            <el-table-column label="所属组织" width="180" show-overflow-tooltip >
              <template #default="{ row }">{{ getDeptName(row.deptId) }}</template>
            </el-table-column>

            <el-table-column label="围栏形状" width="90">
              <template #default="{ row }">{{ row.shapeType === 'circle' ? '圆形' : '多边形' }}</template>
            </el-table-column>

            <el-table-column label="围栏半径(m)" width="110">
              <template #default="{ row }">
                {{ row.shapeType === 'circle' ? (row.fenceRadius || row.radius || '--') : '--' }}
              </template>
            </el-table-column>

            <el-table-column label="绑定设备" width="90">
              <template #default="{ row }">{{ deviceIdsOf(row).length }} 台</template>
            </el-table-column>

            <el-table-column label="创建时间" width="170">
              <template #default="{ row }">{{ formatTime(row.createdAt) }}</template>
            </el-table-column>

            <el-table-column label="更新时间" width="170">
              <template #default="{ row }">{{ formatTime(row.updatedAt) }}</template>
            </el-table-column>

            <el-table-column label="操作" fixed="right" width="210">
              <template #default="{ row }">
                <el-button type="primary" link @click.stop="openDetail(row)">
                  <el-icon style="margin-right: 4px"><InfoFilled /></el-icon>查看
                </el-button>
                <el-button type="primary" link icon="edit" @click.stop="openDialog(row)">编辑</el-button>
                <el-button type="danger" link icon="delete" @click.stop="deleteRow(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="gva-pagination">
            <el-pagination
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="page"
              :page-size="pageSize"
              :page-sizes="[10, 30, 50, 100]"
              :total="total"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            />
          </div>
        </div>
      </div>

      <!-- 右侧地图概览 -->
      <div class="map-panel">
        <div class="map-toolbar">
          <span>{{ selectedFence?.fenceName || '围栏概览' }}</span>
          <el-tag v-if="mapError" type="warning" size="small">{{ mapError }}</el-tag>
        </div>
        <div ref="mapRef" class="fence-map">
          <div v-if="mapError" class="map-empty">{{ mapError }}</div>
        </div>
      </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <el-drawer v-model="dialogVisible" destroy-on-close size="82%" :show-close="false" :before-close="closeDialog">
      <template #header>
        <div class="drawer-header">
          <span class="text-lg">{{ formData.id ? '编辑围栏' : '新增围栏' }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="saveFence">保存</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </div>
        </div>
      </template>

      <div class="drawer-layout">
        <el-form class="fence-form" label-position="top" :model="formData">
          <el-form-item label="所属部门">
            <el-tree-select
              v-model="formData.deptId"
              :data="deptTreeData"
              :props="{ label: 'deptName', value: 'ID', children: 'children' }"
              :check-strictly="true"
              clearable
              filterable
              placeholder="请选择所属部门"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="围栏名称" required>
            <el-input v-model="formData.fenceName" clearable placeholder="请输入围栏名称" :maxlength="50" />
          </el-form-item>
          <el-form-item label="绘制类型">
            <el-segmented v-model="formData.shapeType" :options="shapeOptions" @change="resetGeometry" />
          </el-form-item>
          <el-form-item v-if="formData.shapeType === 'circle'" label="半径（米）">
            <el-input-number v-model="formData.radius" :min="100" :max="5000" :step="50" controls-position="right" style="width: 100%" />
          </el-form-item>
          <el-form-item label="告警设置">
            <div class="switch-row">
              <el-checkbox v-model="formData.enterAlarmEnable" :true-value="1" :false-value="0">进入告警</el-checkbox>
              <el-checkbox v-model="formData.getOutAlarmEnable" :true-value="1" :false-value="0">离开告警</el-checkbox>
              <el-checkbox v-model="formData.enabled">启用围栏</el-checkbox>
            </div>
          </el-form-item>
          <!-- 已绑定设备 -->
          <el-form-item label="已绑定设备">
            <div class="bound-device-list" v-if="formData.deviceIds && formData.deviceIds.length">
              <div v-for="did in formData.deviceIds" :key="did" class="bound-device-item">
                <span class="device-id-text">{{ did }}</span>
                <el-button type="danger" link size="small" @click="unbindSingle(did)">解绑</el-button>
              </div>
            </div>
            <span v-else style="color:#909399;font-size:13px">暂未绑定设备</span>
            <div class="bound-device-actions" v-if="formData.deviceIds && formData.deviceIds.length">
              <el-button type="danger" plain size="small" @click="unbindAll">批量解绑全部</el-button>
            </div>
          </el-form-item>
          <el-form-item label="新增绑定">
            <el-input v-model="deviceIdsText" type="textarea" :rows="3" placeholder="请输入设备编号，多个用逗号或换行分隔" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formData.remark" type="textarea" :rows="3" placeholder="请输入备注" :maxlength="500" />
          </el-form-item>
          <el-descriptions :column="1" border size="small">
            <el-descriptions-item label="圆心">
              {{ formData.center ? `${formData.center.lng}, ${formData.center.lat}` : '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="半径">{{ formData.shapeType === 'circle' ? `${formData.radius} 米` : '-' }}</el-descriptions-item>
            <el-descriptions-item label="点位数">{{ formData.points.length }}</el-descriptions-item>
          </el-descriptions>
        </el-form>

        <div class="draw-panel">
          <div class="draw-toolbar">
            <div>
              <div class="draw-title">地图绘制</div>
              <div class="draw-tip">{{ drawTip }}</div>
            </div>
            <div class="draw-actions">
              <el-button type="primary" :plain="!drawing" @click="drawing = !drawing">
                {{ drawing ? '结束绘制' : '开始绘制' }}
              </el-button>
              <el-button :disabled="formData.shapeType === 'circle' ? !formData.center : formData.points.length === 0" @click="undoPoint">撤销</el-button>
              <el-button @click="resetGeometry">清空</el-button>
            </div>
          </div>
          <div ref="drawMapRef" class="draw-map">
            <div v-if="mapError" class="map-empty">{{ mapError }}</div>
          </div>
        </div>
      </div>
    </el-drawer>

    <!-- 查看详情弹窗 -->
    <el-drawer v-model="detailVisible" destroy-on-close direction="rtl" size="500px" title="围栏详情">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="围栏ID">{{ detailForm.id || detailForm.fenceId }}</el-descriptions-item>
        <el-descriptions-item label="围栏名称">{{ detailForm.fenceName }}</el-descriptions-item>
        <el-descriptions-item label="所属部门">{{ getDeptName(detailForm.deptId) }}</el-descriptions-item>
        <el-descriptions-item label="围栏形状">{{ detailForm.shapeType === 'circle' ? '圆形' : '多边形' }}</el-descriptions-item>
        <el-descriptions-item v-if="detailForm.shapeType === 'circle'" label="围栏半径">{{ (detailForm.fenceRadius || detailForm.radius || '--') + ' m' }}</el-descriptions-item>
        <el-descriptions-item v-if="detailForm.shapeType === 'circle'" label="中心点坐标">
          {{ detailForm.center ? `${detailForm.center.lng}, ${detailForm.center.lat}` : '--' }}
        </el-descriptions-item>
        <el-descriptions-item v-if="detailForm.shapeType === 'polygon'" label="顶点坐标">
          <div v-for="(pt, idx) in (detailForm.points || [])" :key="idx">
            顶点{{ idx + 1 }}: {{ pt.lng }}, {{ pt.lat }}
          </div>
          <span v-if="!detailForm.points?.length">--</span>
        </el-descriptions-item>
        <el-descriptions-item label="已绑定设备">
          <el-tag v-for="did in (detailForm.deviceIds || [])" :key="did" size="small" style="margin: 2px">{{ did }}</el-tag>
          <span v-if="!detailForm.deviceIds?.length">--</span>
        </el-descriptions-item>
        <el-descriptions-item label="进入围栏告警">
          <el-tag :type="detailForm.enterAlarmEnable ? 'success' : 'info'" size="small">
            {{ detailForm.enterAlarmEnable ? '开启' : '关闭' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="走出围栏告警">
          <el-tag :type="detailForm.getOutAlarmEnable ? 'success' : 'info'" size="small">
            {{ detailForm.getOutAlarmEnable ? '开启' : '关闭' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="detailForm.enabled !== false ? 'success' : 'danger'" size="small">
            {{ detailForm.enabled !== false ? '启用' : '停用' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="备注">{{ detailForm.remark || '--' }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatTime(detailForm.createdAt) }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ formatTime(detailForm.updatedAt) }}</el-descriptions-item>
        <el-descriptions-item label="创建人">{{ detailForm.createBy || '--' }}</el-descriptions-item>
        <el-descriptions-item label="修改人">{{ detailForm.updateBy || '--' }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  bindFenceDevices,
  createMongoFence,
  deleteMongoFence,
  getMongoFence,
  getMongoFenceList,
  unbindFenceDevices,
  updateMongoFence
} from '@/api/lot/lotFence'
import { getLotDeptTree } from '@/api/lot/lotDept'
import { getDeptDisplayName } from '@/utils/deptHelper'
import { loadMapApi, hasMapAK, defaultMapCenter } from '@/utils/mapProvider'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'LotFence' })

const route = useRoute()
const mapRef = ref()
const drawMapRef = ref()
const deptTreeRef = ref()
const mapError = ref('')
const tableData = ref([])
const multipleSelection = ref([])
const selectedFence = ref(null)
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchInfo = ref({ keyword: '', shapeType: '', deptSubordinate: true, deptIds: null })
const dialogVisible = ref(false)
const detailVisible = ref(false)
const btnLoading = ref(false)
const deviceIdsText = ref('')
const drawing = ref(false)
const detailForm = ref({})
const deptTreeData = ref([])
const deptNameMap = ref({})
const shapeOptions = [
  { label: '圆形', value: 'circle' },
  { label: '多边形', value: 'polygon' }
]
const formData = ref(defaultForm())

let $m
let map
let drawMap

const drawTip = computed(() => {
  if (!drawing.value) return '点击"开始绘制"后在地图上取点'
  if (formData.value.shapeType === 'circle') return '点击地图设置圆心，半径在左侧输入'
  return '连续点击地图添加围栏边界点，至少需要 3 个点'
})

function defaultForm() {
  return {
    id: '',
    fenceName: '',
    shapeType: 'polygon',
    cordType: 'bd09',
    deptId: null,
    center: null,
    radius: 300,
    points: [],
    enterAlarmEnable: 1,
    getOutAlarmEnable: 1,
    enabled: true,
    remark: '',
    deviceIds: []
  }
}

function formatTime(val) {
  if (!val) return '--'
  const d = new Date(val)
  if (isNaN(d.getTime())) return val
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

// 部门相关
const loadDeptTree = async () => {
  try {
    const res = await getLotDeptTree()
    if (res.code === 0 && res.data) {
      deptTreeData.value = res.data
      const walk = (nodes) => {
        for (const n of nodes) {
          deptNameMap.value[n.ID] = getDeptDisplayName(n)
          if (n.children?.length) walk(n.children)
        }
      }
      walk(res.data)
    }
  } catch { /* 部门数据加载失败不影响主流程 */ }
}

const getDeptName = (deptId) => {
  if (deptId == null) return '--'
  return deptNameMap.value[deptId] || String(deptId)
}

const onDeptNodeClick = (data) => {
  searchInfo.value.deptIds = data ? [data.ID] : null
  onSubmit()
}

// 地图初始化
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
    drawListMap()
  } catch (err) {
    mapError.value = err.message || '地图加载失败'
  }
}

const initDrawMap = () => {
  if (!$m || !drawMapRef.value) return
  drawMap = $m.createMap(drawMapRef.value)
  $m.centerAndZoom(drawMap, $m.point(defaultMapCenter.lng, defaultMapCenter.lat), 12)
  $m.enableScrollWheelZoom(drawMap)
  $m.addMapListener(drawMap, 'click', handleMapClick)
  drawEditingFence()
}

const drawListMap = () => {
  if (!map || !$m) return
  $m.clearOverlays(map)
  tableData.value.forEach(item => drawFenceOnMap(map, item, item.id === selectedFence.value?.id))
  focusFence(map, selectedFence.value || tableData.value[0])
}

const drawEditingFence = () => {
  if (!drawMap || !$m) return
  $m.clearOverlays(drawMap)
  drawFenceOnMap(drawMap, formData.value, true, true)
  focusFence(drawMap, formData.value)
}

const drawFenceOnMap = (targetMap, fence, active = false, showMarkers = false) => {
  const strokeColor = active ? '#e6a23c' : '#2f80ed'
  if (fence.shapeType === 'circle' && fence.center) {
    const point = $m.point(Number(fence.center.lng), Number(fence.center.lat))
    $m.addOverlay(targetMap, $m.circle(point, Number(fence.radius || 0), {
      strokeColor,
      fillColor: active ? '#fdf6ec' : '#dbeafe',
      strokeWeight: 2,
      fillOpacity: 0.24
    }))
    if (showMarkers) $m.addOverlay(targetMap, $m.marker(point))
  }
  if (fence.shapeType === 'polygon' && fence.points?.length) {
    const points = fence.points.map(item => $m.point(Number(item.lng), Number(item.lat)))
    if (points.length >= 2) {
      $m.addOverlay(targetMap, $m.polyline(points, { strokeColor, strokeWeight: 2, strokeOpacity: 0.9 }))
    }
    if (points.length >= 3) {
      $m.addOverlay(targetMap, $m.polygon(points, { strokeColor, fillColor: active ? '#fdf6ec' : '#dbeafe', strokeWeight: 2, fillOpacity: 0.24 }))
    }
    if (showMarkers || active) points.forEach(point => $m.addOverlay(targetMap, $m.marker(point)))
  }
}

const focusFence = (targetMap, fence) => {
  if (!targetMap || !$m || !fence) return
  if (fence.shapeType === 'circle' && fence.center) {
    $m.centerAndZoom(targetMap, $m.point(Number(fence.center.lng), Number(fence.center.lat)), 14)
  } else if (fence.points?.length) {
    const points = fence.points.map(item => $m.point(Number(item.lng), Number(item.lat)))
    $m.setViewport(targetMap, points)
  }
}

const handleMapClick = event => {
  // 兼容百度(event.point)和高德(event.lnglat)
  const raw = event.point || event.lnglat
  if (!dialogVisible.value || !drawing.value || !raw) return
  const point = { lng: Number(raw.lng.toFixed(6)), lat: Number(raw.lat.toFixed(6)) }
  if (formData.value.shapeType === 'circle') {
    formData.value.center = point
  } else {
    formData.value.points.push(point)
  }
  drawEditingFence()
}

const undoPoint = () => {
  if (formData.value.shapeType === 'circle') formData.value.center = null
  else formData.value.points.pop()
  drawEditingFence()
}

const resetGeometry = () => {
  formData.value.center = null
  formData.value.points = []
  drawEditingFence()
}

const parseDeviceIds = () => Array.from(new Set(
  deviceIdsText.value.split(/[\n,\s，]+/).map(item => item.trim()).filter(Boolean)
))

const deviceIdsOf = row => row.deviceIds || row.devices?.map(item => item.deviceId) || []

const normalizeFence = row => ({
  ...defaultForm(),
  ...row,
  enabled: row.enabled !== false,
  deviceIds: deviceIdsOf(row),
  points: row.points || row.fencePoints || [],
  center: row.center || null
})

// 递归收集部门树中某节点及其所有子节点的 ID
const collectDeptTreeIds = (node) => {
  const ids = [node.ID]
  if (node.children?.length) {
    for (const child of node.children) {
      ids.push(...collectDeptTreeIds(child))
    }
  }
  return ids
}

// 在部门树中查找指定 ID 的节点
const findDeptNode = (nodes, id) => {
  for (const n of nodes) {
    if (n.ID === id) return n
    if (n.children?.length) {
      const found = findDeptNode(n.children, id)
      if (found) return found
    }
  }
  return null
}

// 列表数据
const getTableData = async() => {
  const params = { page: page.value, pageSize: pageSize.value }
  if (searchInfo.value.keyword) params.keyword = searchInfo.value.keyword
  if (searchInfo.value.shapeType) params.shapeType = searchInfo.value.shapeType
  if (searchInfo.value.deviceId) params.deviceId = searchInfo.value.deviceId

  // 传递部门过滤条件
  if (searchInfo.value.deptIds?.length) {
    if (searchInfo.value.deptSubordinate) {
      // 包含子级：把选中节点展开为自身+全部子节点 ID
      const expanded = []
      for (const id of searchInfo.value.deptIds) {
        const node = findDeptNode(deptTreeData.value, id)
        if (node) {
          expanded.push(...collectDeptTreeIds(node))
        } else {
          expanded.push(id)
        }
      }
      params.deptIds = [...new Set(expanded)]
    } else {
      params.deptIds = searchInfo.value.deptIds
    }
  }

  const res = await getMongoFenceList(params)
  if (res.code === 0) {
    tableData.value = (res.data?.list || []).map(item => ({
      ...item,
      id: item.id || item.fenceId,
      points: item.points || item.fencePoints || []
    }))
    total.value = res.data?.total || 0
    page.value = res.data?.page || page.value
    pageSize.value = res.data?.pageSize || pageSize.value
    drawListMap()
  }
}

const onSubmit = () => {
  page.value = 1
  getTableData()
}

const onReset = () => {
  searchInfo.value = { keyword: '', shapeType: '', deptSubordinate: true, deptIds: null }
  onSubmit()
}

const handleCurrentChange = val => {
  page.value = val
  getTableData()
}

const handleSizeChange = val => {
  pageSize.value = val
  getTableData()
}

// 行选择
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const selectFence = row => {
  selectedFence.value = row
  drawListMap()
}

// 新增/编辑
const openDialog = async(row) => {
  if (row) {
    // 先获取完整数据
    const detailRes = await getMongoFence(row.id || row.fenceId)
    if (detailRes.code === 0) {
      formData.value = normalizeFence(JSON.parse(JSON.stringify(detailRes.data)))
    } else {
      formData.value = normalizeFence(JSON.parse(JSON.stringify(row)))
    }
  } else {
    formData.value = defaultForm()
    if (route.query.deviceId) formData.value.deviceIds = [String(route.query.deviceId)]
  }
  deviceIdsText.value = (formData.value.deviceIds || []).join('\n')
  dialogVisible.value = true
  drawing.value = !row
  await nextTick()
  initDrawMap()
}

const closeDialog = () => {
  dialogVisible.value = false
  drawing.value = false
  formData.value = defaultForm()
  deviceIdsText.value = ''
  drawListMap()
}

// 解绑单个设备
const unbindSingle = async (deviceId) => {
  if (!formData.value.id) return
  try {
    await unbindFenceDevices(formData.value.id, [deviceId])
    formData.value.deviceIds = formData.value.deviceIds.filter(d => d !== deviceId)
    deviceIdsText.value = formData.value.deviceIds.join('\n')
    ElMessage.success(`已解绑 ${deviceId}`)
  } catch { ElMessage.error('解绑失败') }
}
// 批量解绑全部
const unbindAll = () => {
  if (!formData.value.deviceIds?.length) return
  ElMessageBox.confirm(
    `确定要解绑全部 ${formData.value.deviceIds.length} 台设备吗？`,
    '批量解绑',
    { type: 'warning' }
  ).then(async () => {
    if (!formData.value.id) return
    try {
      await unbindFenceDevices(formData.value.id, formData.value.deviceIds)
      formData.value.deviceIds = []
      deviceIdsText.value = ''
      ElMessage.success('批量解绑成功')
    } catch { ElMessage.error('批量解绑失败') }
  })
}

const validateFence = () => {
  if (!formData.value.fenceName.trim()) return '请输入围栏名称'
  if (formData.value.shapeType === 'circle' && !formData.value.center) return '请在地图上选择圆心'
  if (formData.value.shapeType === 'polygon' && formData.value.points.length < 3) return '多边形至少需要 3 个点'
  return ''
}

const saveFence = async() => {
  const msg = validateFence()
  if (msg) {
    ElMessage.warning(msg)
    return
  }
  btnLoading.value = true
  try {
    const oldDeviceIds = formData.value.deviceIds || []
    const newDeviceIds = parseDeviceIds()
    const payload = { ...formData.value, deviceIds: newDeviceIds }
    const res = payload.id ? await updateMongoFence(payload.id, payload) : await createMongoFence(payload)
    if (res.code === 0) {
      const id = payload.id || res.data?.id || res.data?.fenceId
      const removeIds = oldDeviceIds.filter(item => !newDeviceIds.includes(item))
      const addIds = newDeviceIds.filter(item => !oldDeviceIds.includes(item))
      if (id && removeIds.length) await unbindFenceDevices(id, removeIds).catch(() => {})
      if (id && addIds.length) await bindFenceDevices(id, addIds).catch(() => {})
      ElMessage.success('保存成功')
      closeDialog()
      getTableData()
    }
  } finally {
    btnLoading.value = false
  }
}

// 删除
const deleteRow = row => {
  ElMessageBox.confirm(`确定要删除围栏"${row.fenceName}"吗？`, '提示', { type: 'warning' }).then(async() => {
    const res = await deleteMongoFence(row.id || row.fenceId)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      if (tableData.value.length === 1 && page.value > 1) page.value--
      getTableData()
    }
  })
}

const onBatchDelete = () => {
  if (!multipleSelection.value.length) {
    ElMessage.warning('请选择要删除的围栏')
    return
  }
  const names = multipleSelection.value.map(item => item.fenceName).join('、')
  ElMessageBox.confirm(`确定要删除以下围栏吗？\n${names}`, '批量删除', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(async() => {
    const results = await Promise.allSettled(
      multipleSelection.value.map(item => deleteMongoFence(item.id || item.fenceId))
    )
    const failed = results.filter(r => r.status === 'rejected').length
    if (failed === 0) {
      ElMessage.success('批量删除成功')
    } else {
      ElMessage.warning(`部分删除失败：${failed}/${results.length}`)
    }
    if (tableData.value.length <= multipleSelection.value.length && page.value > 1) page.value--
    getTableData()
  })
}

// 查看详情
const openDetail = async(row) => {
  const id = row.id || row.fenceId
  const res = await getMongoFence(id)
  if (res.code === 0) {
    detailForm.value = normalizeFence(res.data)
    detailVisible.value = true
  }
}

onMounted(async() => {
  await loadDeptTree()
  searchInfo.value.deviceId = route.query.deviceId ? String(route.query.deviceId) : ''
  await initMap()
  await getTableData()
  if (route.query.action === 'create') openDialog()
  if (route.query.id) {
    const target = tableData.value.find(item => String(item.id || item.fenceId) === String(route.query.id))
    if (target) openDialog(target)
  }
})
</script>

<style scoped>
.fence-layout {
  display: grid;
  grid-template-columns: 200px minmax(420px, 0.95fr) minmax(360px, 1.05fr);
  gap: 12px;
  height: calc(100vh - 120px);
}

.dept-tree-panel {
  background: #fff;
  border-radius: 4px;
  padding: 12px;
  overflow-y: auto;
  border: 1px solid #ebeef5;
}

.panel-title {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
  color: #303133;
}

.dept-tree-node {
  font-size: 13px;
}

.list-panel {
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.list-panel .gva-table-box {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.map-panel {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.map-toolbar,
.drawer-header,
.draw-toolbar,
.draw-actions,
.switch-row {
  display: flex;
  align-items: center;
}

.map-toolbar,
.drawer-header,
.draw-toolbar {
  justify-content: space-between;
}

.map-toolbar {
  margin-bottom: 10px;
  font-weight: 600;
  padding: 0 4px;
}

.fence-map,
.draw-map {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #f3f4f6;
  border-radius: 4px;
  border: 1px solid #ebeef5;
}

.fence-map {
  flex: 1;
  min-height: 500px;
}

.draw-map {
  height: calc(100vh - 260px);
  min-height: 500px;
}

.map-empty {
  display: grid;
  height: 100%;
  place-items: center;
  color: #909399;
}

.drawer-layout {
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 16px;
}

.fence-form,
.draw-panel {
  min-width: 0;
}

.draw-toolbar {
  gap: 12px;
  margin-bottom: 10px;
}

.draw-title {
  font-weight: 700;
}

.draw-tip {
  margin-top: 4px;
  color: #606266;
  font-size: 13px;
}

.bound-device-list {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 4px 0;
  width: 100%;
}
.bound-device-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  font-size: 13px;
}
.bound-device-item + .bound-device-item {
  border-top: 1px solid #f0f0f0;
}
.device-id-text {
  font-family: monospace;
  color: #303133;
}
.bound-device-actions {
  padding: 8px 12px 4px;
}

.draw-actions,
.switch-row {
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 1400px) {
  .fence-layout {
    grid-template-columns: 200px 1fr;
  }
  .map-panel {
    display: none;
  }
}

@media (max-width: 1000px) {
  .fence-layout {
    grid-template-columns: 1fr;
  }
  .dept-tree-panel {
    display: none;
  }
}
</style>
