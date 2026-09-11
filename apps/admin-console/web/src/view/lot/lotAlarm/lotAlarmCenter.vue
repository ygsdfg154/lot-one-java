<template>
  <div class="alarm-center">
    <el-tabs v-model="activeTab" class="gva-table-box">
      <el-tab-pane label="告警记录" name="records">
        <el-form :inline="true" :model="recordQuery" @keyup.enter="loadRecords">
          <el-form-item label="关键字">
            <el-input v-model="recordQuery.keyword" clearable placeholder="设备/告警/内容" />
          </el-form-item>
          <el-form-item label="设备编号">
            <el-input v-model="recordQuery.deviceId" clearable placeholder="请输入设备编号" />
          </el-form-item>
          <el-form-item label="告警类型">
            <el-input v-model="recordQuery.alarmType" clearable placeholder="SPEED/GEOFENCE" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="recordQuery.status" clearable placeholder="请选择">
              <el-option v-for="item in alarmRecordStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="recordTimeRange"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm:ss"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="search" @click="loadRecords">查询</el-button>
            <el-button icon="refresh" @click="resetRecords">重置</el-button>
            <el-button icon="download" @click="exportRecords">导出</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="recordData" border>
          <el-table-column label="设备编号" prop="deviceId" min-width="140" show-overflow-tooltip />
          <el-table-column label="设备名称" prop="deviceName" min-width="130" show-overflow-tooltip />
          <el-table-column label="告警名称" prop="alarmName" min-width="140" show-overflow-tooltip />
          <el-table-column label="告警类型" prop="alarmType" width="120" />
          <el-table-column label="级别" width="90">
            <template #default="{ row }">{{ alarmLevelText(row.level) }}</template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="row.status === 'resolved' ? 'success' : 'danger'">{{ alarmStatusText(row.status) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="告警值" prop="value" width="100" />
          <el-table-column label="阈值" prop="threshold" width="100" />
          <el-table-column label="告警内容" prop="message" min-width="180" show-overflow-tooltip />
          <el-table-column label="告警时间" prop="alarmTime" min-width="160" />
          <el-table-column label="恢复时间" prop="recoverTime" min-width="160" />
        </el-table>
        <div class="gva-pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="recordPage"
            :page-size="recordPageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="recordTotal"
            @current-change="val => { recordPage = val; loadRecords() }"
            @size-change="val => { recordPageSize = val; loadRecords() }"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane label="告警规则模板" name="rules">
        <el-alert class="alarm-help" type="info" :closable="false" show-icon>
          <template #title>这里优先维护平台阈值默认项：超速 OVER_SPEED、平台低电 PLATFORM_LOW_BATTERY。围栏范围在围栏管理配置，不在这里做快捷新增。</template>
        </el-alert>
        <div class="quick-template-list">
          <el-card v-for="item in quickRuleTemplates" :key="item.alarmCode" shadow="never" class="quick-template-card">
            <div class="quick-template-title">{{ item.alarmName }}</div>
            <div class="quick-template-meta">{{ item.alarmCode }} / {{ item.alarmType }} / {{ item.alarmValueUnit || '无单位' }}</div>
            <div class="quick-template-desc">{{ item.alarmDesc }}</div>
            <el-button type="primary" link icon="plus" @click="openRuleTemplate(item)">按此新增</el-button>
          </el-card>
        </div>
        <el-form :inline="true" :model="ruleQuery" @keyup.enter="loadRules">
          <el-form-item label="关键字">
            <el-input v-model="ruleQuery.keyword" clearable placeholder="编码/名称/类型" />
          </el-form-item>
          <el-form-item label="产品">
            <el-select v-model="ruleQuery.productId" clearable filterable placeholder="请选择产品">
              <el-option v-for="item in productOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="ruleQuery.status" clearable placeholder="请选择">
              <el-option v-for="item in commonStatusOptions" :key="item.value" :label="item.label" :value="Number(item.value)" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="search" @click="loadRules">查询</el-button>
            <el-button icon="refresh" @click="resetRules">重置</el-button>
            <el-button type="primary" icon="plus" @click="openRule()">新增</el-button>
            <el-button icon="download" @click="exportRules">导出</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="ruleData" border>
          <el-table-column label="ID" prop="ID" width="80" />
          <el-table-column label="产品" min-width="120">
            <template #default="{ row }">{{ productLabel(row.productId) }}</template>
          </el-table-column>
          <el-table-column label="告警编码" prop="alarmCode" min-width="130" />
          <el-table-column label="告警名称" prop="alarmName" min-width="150" />
          <el-table-column label="告警类型" prop="alarmType" width="120" />
          <el-table-column label="配置范围" width="150">
            <template #default="{ row }">
              <el-tag :type="alarmScopeType(row.alarmCode)" effect="plain">{{ alarmScopeText(row.alarmCode) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="alarmValueUnit" width="90" />
          <el-table-column label="默认阈值" prop="defaultAlarmValue" width="110" />
          <el-table-column label="状态" width="110">
            <template #default="{ row }">
              <el-switch :model-value="row.status || '0'" active-value="1" inactive-value="0" active-text="启用" inactive-text="停用" inline-prompt disabled />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template #default="{ row }">
              <el-button type="primary" link icon="edit" @click="openRule(row)">编辑</el-button>
              <el-button type="danger" link icon="delete" @click="deleteRule(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="gva-pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page="rulePage"
            :page-size="rulePageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="ruleTotal"
            @current-change="val => { rulePage = val; loadRules() }"
            @size-change="val => { rulePageSize = val; loadRules() }"
          />
        </div>
      </el-tab-pane>

      <el-tab-pane label="设备平台告警设置" name="settings">
        <el-alert class="alarm-help" type="warning" :closable="false" show-icon>
          <template #title>这里保存到平台侧 device_alarm_config。真正有平台阈值的主要是 OVER_SPEED 和 PLATFORM_LOW_BATTERY；震动、拆卸、声控等设备侧能力请到“设备侧告警指令”。</template>
        </el-alert>
        <el-form :inline="true" :model="settingQuery" @keyup.enter="loadSetting">
          <el-form-item label="设备编号">
            <el-input v-model="settingQuery.deviceId" clearable placeholder="请输入设备编号" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="search" @click="loadSetting">查询</el-button>
            <el-button type="success" icon="check" :disabled="!settingForm.deviceId" @click="saveSetting">保存</el-button>
          </el-form-item>
        </el-form>

        <div v-if="settingForm.deviceId" class="setting-panel">
          <el-form label-position="top">
            <el-form-item label="总开关">
              <el-switch v-model="settingForm.enabled" active-text="启用" inactive-text="停用" />
            </el-form-item>
          </el-form>
          <el-table :data="settingForm.rules" border>
            <el-table-column label="告警编码" prop="alarmCode" min-width="130" />
            <el-table-column label="告警名称" prop="alarmName" min-width="150" />
            <el-table-column label="告警类型" prop="alarmType" width="120" />
            <el-table-column label="配置范围" width="150">
              <template #default="{ row }">
                <el-tag :type="alarmScopeType(row.alarmCode)" effect="plain">{{ alarmScopeText(row.alarmCode) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="生效状态" width="140">
              <template #default="{ row }">
                <el-tag :type="alarmEffectiveType(row)" effect="plain">{{ alarmEffectiveText(row) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="配置开关" width="100">
              <template #default="{ row }"><el-switch v-model="row.enabled" /></template>
            </el-table-column>
            <el-table-column label="平台阈值" width="170">
              <template #default="{ row }">
                <el-input
                  v-model="row.threshold"
                  clearable
                  :disabled="!isPlatformThresholdAlarm(row.alarmCode)"
                  :placeholder="thresholdPlaceholder(row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="说明" min-width="220" show-overflow-tooltip>
              <template #default="{ row }">{{ alarmConfigHint(row.alarmCode) }}</template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane label="设备侧告警指令" name="deviceCmds">
        <el-alert class="alarm-help" type="info" :closable="false" show-icon>
          <template #title>震动、拆卸、低电短信、声控等设备侧开关走指令下发；产品需要先绑定支持的指令，设备上才能选择下发。</template>
        </el-alert>
        <el-table :data="deviceCommandRows" border>
          <el-table-column label="后台操作" prop="name" min-width="150" />
          <el-table-column label="指令编码" prop="cmdCode" min-width="150" />
          <el-table-column label="适用场景" prop="scene" min-width="220" show-overflow-tooltip />
          <el-table-column label="入口" width="260">
            <template #default>
              <el-button type="primary" link icon="iphone" @click="goDeviceList">设备管理下发</el-button>
              <el-button type="primary" link icon="set-up" @click="goProductList">产品指令配置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="通知渠道" name="notify">
        <el-alert class="alarm-help" type="info" :closable="false" show-icon>
          <template #title>通知渠道只决定告警产生后是否通过 App、短信、电话、微信提醒，不决定告警记录是否产生。</template>
        </el-alert>
        <el-table :data="notifyRows" border>
          <el-table-column label="配置项" prop="name" min-width="140" />
          <el-table-column label="作用" prop="effect" min-width="260" show-overflow-tooltip />
          <el-table-column label="当前入口" prop="entry" min-width="180" />
          <el-table-column label="备注" prop="remark" min-width="240" show-overflow-tooltip />
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-drawer v-model="ruleVisible" :size="appStore.drawerSize" :show-close="false" destroy-on-close>
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ ruleForm.ID ? '编辑告警规则模板' : '新增告警规则模板' }}</span>
          <div>
            <el-button type="primary" :loading="savingRule" @click="saveRule">确定</el-button>
            <el-button @click="ruleVisible = false">取消</el-button>
          </div>
        </div>
      </template>
      <el-form :model="ruleForm" label-position="top">
        <el-form-item label="产品">
          <el-select v-model="ruleForm.productId" clearable filterable placeholder="请选择产品">
            <el-option v-for="item in productOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="告警编码"><el-input v-model="ruleForm.alarmCode" clearable /></el-form-item>
        <el-form-item label="告警名称"><el-input v-model="ruleForm.alarmName" clearable /></el-form-item>
        <el-form-item label="告警类型"><el-input v-model="ruleForm.alarmType" clearable /></el-form-item>
        <el-form-item label="告警单位"><el-input v-model="ruleForm.alarmValueUnit" clearable /></el-form-item>
        <el-form-item label="告警描述"><el-input v-model="ruleForm.alarmDesc" type="textarea" :rows="3" /></el-form-item>
        <el-form-item label="默认推送方式"><el-input v-model="ruleForm.pushType" clearable /></el-form-item>
        <el-form-item label="默认阈值"><el-input v-model="ruleForm.defaultAlarmValue" clearable /></el-form-item>
        <el-form-item label="状态"><el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="ruleForm.sort" :min="0" /></el-form-item>
        <el-form-item label="备注"><el-input v-model="ruleForm.remark" type="textarea" :rows="2" /></el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  exportLotAlarmRecords,
  getLotAlarmRecords,
  getLotDeviceAlarmSetting,
  saveLotDeviceAlarmSetting
} from '@/api/lot/lotAlarm'
import {
  createLotAlarmRule,
  deleteLotAlarmRule,
  exportLotAlarmRule,
  findLotAlarmRule,
  getLotAlarmRuleList,
  updateLotAlarmRule
} from '@/api/lot/lotAlarmRule'
import { getLotProductList } from '@/api/lot/lotProduct'
import { downloadBlobResponse } from '@/utils/downloadBlob'
import { getDictFunc } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/pinia'

defineOptions({ name: 'LotAlarmCenter' })

const appStore = useAppStore()
const router = useRouter()
const activeTab = ref('records')
const productOptions = ref([])
const alarmRecordStatusOptions = ref([])
const commonStatusOptions = ref([])
// 加载字典
getDictFunc('alarm_record_status').then(opts => { if (opts?.length) alarmRecordStatusOptions.value = opts })
getDictFunc('common_status').then(opts => { if (opts?.length) commonStatusOptions.value = opts })

const recordQuery = ref({})
const recordTimeRange = ref([])
const recordData = ref([])
const recordPage = ref(1)
const recordPageSize = ref(10)
const recordTotal = ref(0)

const ruleQuery = ref({})
const ruleData = ref([])
const rulePage = ref(1)
const rulePageSize = ref(10)
const ruleTotal = ref(0)
const ruleVisible = ref(false)
const savingRule = ref(false)
const ruleForm = ref(defaultRuleForm())

const settingQuery = ref({ deviceId: '' })
const settingForm = ref({ deviceId: '', enabled: true, remark: '', rules: [] })
const platformThresholdAlarmCodes = ['OVER_SPEED', 'PLATFORM_LOW_BATTERY']
const fenceAlarmCodes = ['FENCE_IN', 'FENCE_OUT']
const quickRuleTemplates = [
  {
    alarmCode: 'OVER_SPEED',
    alarmName: '超速告警',
    alarmType: 'PLATFORM',
    alarmValueUnit: 'km/h',
    alarmDesc: '平台按 GPS 速度与设备阈值计算，达到阈值后产生超速告警。',
    defaultAlarmValue: '80',
    sort: 10
  },
  {
    alarmCode: 'PLATFORM_LOW_BATTERY',
    alarmName: '平台低电告警',
    alarmType: 'PLATFORM',
    alarmValueUnit: '%',
    alarmDesc: '平台按设备电量百分比与阈值计算，低于或等于阈值后产生低电告警。',
    defaultAlarmValue: '20',
    sort: 20
  }
]
const deviceCommandRows = [
  { name: '震动告警开关/灵敏度', cmdCode: 'S_SHAKE_AL', scene: '控制设备侧震动告警能力，部分协议支持灵敏度参数。' },
  { name: '拆卸告警开关', cmdCode: 'S_REMOVE_AL', scene: '控制设备侧拆卸/移除告警能力，是否支持取决于产品协议。' },
  { name: '低电短信告警开关', cmdCode: 'S_LOW_POWER_AL', scene: '控制设备侧低电短信类能力；平台低电阈值仍在设备平台告警设置。' },
  { name: '声控声音安防开关', cmdCode: 'S_AUDIO_AL', scene: '控制 HLXT 声控拾音/声音安防开关。' }
]
const notifyRows = [
  { name: 'App 推送', effect: '告警产生后是否给 App 用户推送。', entry: '设备 App / 通知配置', remark: '不影响 alarm_record 入库。' },
  { name: '短信', effect: '告警产生后是否发送短信。', entry: '设备 App / 通知配置', remark: '需要手机号与短信通道可用。' },
  { name: '电话', effect: '告警产生后是否电话提醒。', entry: '设备 App / 通知配置', remark: '只控制提醒渠道。' },
  { name: '微信', effect: '告警产生后是否微信提醒。', entry: '设备 App / 通知配置', remark: '取决于用户绑定与通道配置。' }
]

function defaultRuleForm() {
  return {
    productId: undefined,
    alarmCode: '',
    alarmName: '',
    alarmType: '',
    alarmValueUnit: '',
    alarmDesc: '',
    pushType: '',
    isAlarmValue: 1,
    defaultAlarmValue: '',
    status: 1,
    sort: 0,
    remark: ''
  }
}

const clean = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== '' && v !== undefined && v !== null))

const recordParams = () => clean({
  ...recordQuery.value,
  startTime: recordTimeRange.value?.[0],
  endTime: recordTimeRange.value?.[1]
})

const loadRecords = async() => {
  const res = await getLotAlarmRecords({ page: recordPage.value, pageSize: recordPageSize.value, ...recordParams() })
  if (res.code === 0) {
    recordData.value = res.data?.list || []
    recordTotal.value = res.data?.total || 0
    recordPage.value = res.data?.page || recordPage.value
    recordPageSize.value = res.data?.pageSize || recordPageSize.value
  }
}

const resetRecords = () => {
  recordQuery.value = {}
  recordTimeRange.value = []
  recordPage.value = 1
  loadRecords()
}

const exportRecords = async() => {
  const res = await exportLotAlarmRecords(recordParams())
  downloadBlobResponse(res, '告警记录.xlsx')
}

const loadRules = async() => {
  const res = await getLotAlarmRuleList({ page: rulePage.value, pageSize: rulePageSize.value, ...clean(ruleQuery.value) })
  if (res.code === 0) {
    ruleData.value = res.data?.list || []
    ruleTotal.value = res.data?.total || 0
  } else {
    ruleData.value = []
    ruleTotal.value = 0
    ElMessage.error(res.msg || '告警规则模板加载失败')
  }
}

const resetRules = () => {
  ruleQuery.value = {}
  rulePage.value = 1
  loadRules()
}

const openRule = async(row) => {
  if (row?.ID) {
    const res = await findLotAlarmRule({ ID: row.ID })
    if (res.code === 0) {
      ruleForm.value = { ...defaultRuleForm(), ...res.data }
    }
  } else {
    ruleForm.value = defaultRuleForm()
  }
  ruleVisible.value = true
}

const openRuleTemplate = (tpl) => {
  ruleForm.value = { ...defaultRuleForm(), ...tpl, status: 1 }
  ruleVisible.value = true
}

const saveRule = async() => {
  savingRule.value = true
  const payload = { ...ruleForm.value }
  const res = payload.ID ? await updateLotAlarmRule(payload) : await createLotAlarmRule(payload)
  savingRule.value = false
  if (res.code === 0) {
    ElMessage.success('保存成功')
    ruleVisible.value = false
    loadRules()
  }
}

const deleteRule = (row) => {
  ElMessageBox.confirm('确定删除该告警规则吗？', '提示', { type: 'warning' }).then(async() => {
    const res = await deleteLotAlarmRule({ ID: row.ID })
    if (res.code === 0) {
      ElMessage.success('删除成功')
      loadRules()
    }
  })
}

const exportRules = async() => {
  const res = await exportLotAlarmRule(clean(ruleQuery.value))
  downloadBlobResponse(res, '告警规则.xlsx')
}

const loadSetting = async() => {
  if (!settingQuery.value.deviceId) {
    ElMessage.warning('请输入设备编号')
    return
  }
  const res = await getLotDeviceAlarmSetting(settingQuery.value.deviceId)
  if (res.code === 0) {
    settingForm.value = {
      deviceId: res.data?.deviceId || settingQuery.value.deviceId,
      enabled: res.data?.enabled !== false,
      remark: res.data?.remark || '',
      rules: res.data?.rules || []
    }
  }
}

const saveSetting = async() => {
  const res = await saveLotDeviceAlarmSetting(settingForm.value.deviceId, {
    enabled: settingForm.value.enabled,
    remark: settingForm.value.remark,
    rules: settingForm.value.rules
      .filter(item => item.configured || item.enabled)
      .map(item => ({
        alarmCode: item.alarmCode,
        enabled: item.enabled,
        threshold: item.threshold
      }))
  })
  if (res.code === 0) {
    ElMessage.success('保存成功')
    settingForm.value = {
      deviceId: res.data?.deviceId || settingForm.value.deviceId,
      enabled: res.data?.enabled !== false,
      remark: res.data?.remark || '',
      rules: res.data?.rules || []
    }
  }
}

const loadProducts = async() => {
  const res = await getLotProductList({ page: 1, pageSize: 1000 })
  if (res.code === 0) {
    productOptions.value = (res.data?.list || []).map(item => ({
      label: item.code || String(item.ID),
      value: Number(item.ID)
    }))
  }
}

const productLabel = (id) => productOptions.value.find(item => Number(item.value) === Number(id))?.label || id || '-'
const alarmStatusText = (status) => status === 'resolved' ? '已恢复' : '告警中'
const alarmLevelText = (level) => ({
  critical: '严重',
  error: '严重',
  warning: '警告',
  warn: '警告',
  info: '提示'
}[String(level || '').toLowerCase()] || '--')
const isPlatformThresholdAlarm = (alarmCode) => platformThresholdAlarmCodes.includes(String(alarmCode || '').toUpperCase())
const isFenceAlarm = (alarmCode) => fenceAlarmCodes.includes(String(alarmCode || '').toUpperCase())
const alarmScopeText = (alarmCode) => {
  if (isPlatformThresholdAlarm(alarmCode)) return '平台阈值'
  if (isFenceAlarm(alarmCode)) return '围栏管理'
  return '设备上报'
}
const alarmScopeType = (alarmCode) => {
  if (isPlatformThresholdAlarm(alarmCode)) return 'success'
  if (isFenceAlarm(alarmCode)) return 'warning'
  return 'info'
}
const alarmEffectiveText = (row) => {
  if (!row?.configured) return '仅模板未下发'
  return row.enabled ? '已开启' : '已关闭'
}
const alarmEffectiveType = (row) => {
  if (!row?.configured) return 'info'
  return row.enabled ? 'success' : 'danger'
}
const thresholdPlaceholder = (row) => {
  if (String(row?.alarmCode || '').toUpperCase() === 'OVER_SPEED') return '例如 80'
  if (String(row?.alarmCode || '').toUpperCase() === 'PLATFORM_LOW_BATTERY') return '例如 20'
  return '无平台阈值'
}
const alarmConfigHint = (alarmCode) => {
  const code = String(alarmCode || '').toUpperCase()
  if (code === 'OVER_SPEED') return '配置多少 km/h 算超速，平台按定位速度计算。'
  if (code === 'PLATFORM_LOW_BATTERY') return '配置多少百分比算低电，平台按电量计算。'
  if (isFenceAlarm(code)) return '围栏范围和进出规则在围栏管理维护。'
  return '由设备协议上报；设备侧开关/灵敏度请走下发指令。'
}
const goDeviceList = () => router.push({ name: 'LotDeviceInfo' })
const goProductList = () => router.push({ name: 'LotProduct' })

onMounted(() => {
  loadProducts()
  loadRecords()
  loadRules()
})
</script>

<style scoped>
.alarm-center :deep(.el-tabs__content) {
  padding-top: 8px;
}

.alarm-help {
  margin-bottom: 12px;
}

.quick-template-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  margin-bottom: 12px;
}

.quick-template-card {
  border-radius: 6px;
}

.quick-template-title {
  font-weight: 600;
  color: #303133;
  line-height: 22px;
}

.quick-template-meta {
  margin-top: 4px;
  font-size: 12px;
  color: #909399;
  line-height: 18px;
}

.quick-template-desc {
  min-height: 38px;
  margin-top: 6px;
  color: #606266;
  font-size: 13px;
  line-height: 19px;
}

.setting-panel {
  max-width: 1180px;
}
</style>
