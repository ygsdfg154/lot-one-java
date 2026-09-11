<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" @keyup.enter="onSubmit">
        <el-form-item label="设备 IMEI" prop="deviceId">
          <el-input v-model="searchInfo.deviceId" clearable placeholder="请输入设备IMEI" />
        </el-form-item>
        <el-form-item label="设备名称" prop="deviceName">
          <el-input v-model="searchInfo.deviceName" clearable placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="绑定手机号" prop="bindPhone">
          <el-input v-model="searchInfo.bindPhone" clearable placeholder="请输入手机号" />
        </el-form-item>
        <template v-if="showAllQuery">
                  <el-form-item label="销售订单号" prop="saleOrderNo">
          <el-input v-model="searchInfo.saleOrderNo" clearable placeholder="请输入销售订单号" />
        </el-form-item>
        <el-form-item label="设备状态" prop="activationStatus">
          <el-select v-model="searchInfo.activationStatus" clearable placeholder="请选择" class="!w-130px">
            <el-option label="已激活" :value="ACTIVATION_STATUS.ACTIVATED" />
            <el-option label="未激活" :value="ACTIVATION_STATUS.INACTIVE" />
            <el-option label="已停机" :value="ACTIVATION_STATUS.STOPPED" />
          </el-select>
        </el-form-item>
        <el-form-item label="在线状态" prop="onlineStatus">
          <el-select v-model="searchInfo.onlineStatus" clearable placeholder="请选择" class="!w-130px">
            <el-option label="在线" :value="ONLINE_STATUS.ONLINE" />
            <el-option label="离线" :value="ONLINE_STATUS.OFFLINE" />
          </el-select>
        </el-form-item>
        <el-form-item label="禁用状态" prop="disableStatus">
          <el-select v-model="searchInfo.disableStatus" clearable placeholder="请选择" class="!w-130px">
            <el-option label="正常" :value="DISABLE_STATUS.NORMAL" />
            <el-option label="已禁用" :value="DISABLE_STATUS.DISABLED" />
          </el-select>
        </el-form-item>
        <el-form-item label="收费类型" prop="billingType">
          <el-select v-model="searchInfo.billingType" clearable placeholder="请选择" class="!w-130px">
            <el-option label="免费" :value="BILLING_TYPE.FREE" />
            <el-option label="收费" :value="BILLING_TYPE.PAID" />
          </el-select>
        </el-form-item>
        <el-form-item label="激活时间" prop="activeTimeRange">
          <el-date-picker
            v-model="searchInfo.activeTimeRange"
            class="!w-280px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始"
            end-placeholder="结束"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="绑定时间" prop="bindTimeRange">
          <el-date-picker
            v-model="searchInfo.bindTimeRange"
            class="!w-280px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始"
            end-placeholder="结束"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
          <el-button link type="primary" icon="arrow-down" @click="showAllQuery=true" v-if="!showAllQuery">展开</el-button>
          <el-button link type="primary" icon="arrow-up" @click="showAllQuery=false" v-else>收起</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="gva-table-box">
      <el-table style="width: 100%" tooltip-effect="dark" :data="tableData" row-key="deviceId" @sort-change="onSortChange">
        <el-table-column align="left" label="设备 IMEI" prop="deviceId" min-width="160" show-overflow-tooltip />
        <el-table-column align="left" label="设备名称" prop="deviceName" min-width="140" show-overflow-tooltip />
        <el-table-column align="left" label="绑定手机号" prop="bindPhone" width="130" />
        <el-table-column align="left" label="所属店铺" prop="shopName" width="140" show-overflow-tooltip />
        <el-table-column align="left" label="ICCID" prop="iccid" width="180" show-overflow-tooltip />
        <el-table-column align="left" label="销售订单号" prop="saleOrderNo" width="160" show-overflow-tooltip />
        <el-table-column align="left" label="设备状态" prop="activationStatus" width="100">
          <template #default="scope">
            <el-tag :type="getActivationStatusTagType(scope.row.activationStatus)">
              {{ getActivationStatusDisplay(scope.row) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="禁用状态" prop="disableStatus" width="90">
          <template #default="scope">
            <el-tag :type="getDisableStatusTagType(scope.row.disableStatus)" size="small">
              {{ getDisableStatusText(scope.row.disableStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="付费" prop="billingType" width="90">
          <template #default="scope">
            <el-tag :type="getBillingPaidTagType(scope.row)" size="small">
              {{ getBillingPaidText(scope.row) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="在线状态" prop="onlineStatus" width="90">
          <template #default="scope">
            <el-tag :type="getOnlineStatusTagType(scope.row.onlineStatus)" size="small">
              {{ getOnlineStatusText(scope.row.onlineStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="销售时间" prop="saleTime" width="180" sortable="custom" show-overflow-tooltip/>
        <el-table-column align="left" label="激活时间" prop="activeTime" width="180" sortable="custom" show-overflow-tooltip/>
        <el-table-column align="left" label="绑定时间" prop="bindTime" width="180" sortable="custom" show-overflow-tooltip />
        <el-table-column align="left" label="电量" prop="battery" width="80">
          <template #default="scope">{{ scope.row.battery ? scope.row.battery + '%' : '-' }}</template>
        </el-table-column>
        <el-table-column align="left" label="流量卡套餐" prop="trafficPackage" width="120" />
        <el-table-column align="left" label="操作" fixed="right" width="460">
          <template #default="scope">
            <el-button type="primary" link class="table-button" @click="unbindPhone(scope.row)">解绑手机</el-button>
            <el-button type="warning" link class="table-button" @click="deleteTraffic(scope.row)">删流量套餐</el-button>
            <el-button type="success" link class="table-button" @click="selfCheck(scope.row)">设备自检</el-button>
            <el-button type="primary" link class="table-button" @click="dispatchCommand(scope.row)">下发指令</el-button>
            <el-button type="danger" link class="table-button" @click="resetDevicePassword(scope.row)">重置密码</el-button>
            <el-button type="danger" link class="table-button" @click="rebootDevice(scope.row)">设备重启</el-button>
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
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAfterSalesList, unbindPhone as apiUnbindPhone, deleteTrafficPackage, selfCheck as apiSelfCheck, dispatchCmd as apiDispatchCmd, resetPassword as apiResetPassword, reboot as apiReboot } from '@/api/lot/lotDevice'
import { ACTIVATION_STATUS, ONLINE_STATUS, DISABLE_STATUS, BILLING_TYPE, getActivationStatusDisplay, getActivationStatusTagType, getOnlineStatusText, getOnlineStatusTagType, getDisableStatusText, getDisableStatusTagType, getBillingPaidText, getBillingPaidTagType } from '../constants'

defineOptions({ name: 'AfterSalesDevice' })

const elSearchFormRef = ref()
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})
const sortInfo = ref({ sortField: '', sortOrder: '' })
const showAllQuery = ref(false)
const buildParams = () => {
  const p = { page: page.value, pageSize: pageSize.value, ...searchInfo.value }
  if (p.activeTimeRange?.length === 2) {
    p.activeTimeStart = p.activeTimeRange[0]
    p.activeTimeEnd = p.activeTimeRange[1]
  }
  if (p.bindTimeRange?.length === 2) {
    p.bindTimeStart = p.bindTimeRange[0]
    p.bindTimeEnd = p.bindTimeRange[1]
  }
  delete p.activeTimeRange
  delete p.bindTimeRange
  if (sortInfo.value.sortField) {
    p.sortField = sortInfo.value.sortField
    p.sortOrder = sortInfo.value.sortOrder
  }
  return p
}

const getTableData = async () => {
  const table = await getAfterSalesList(buildParams())
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

const onReset = () => {
  page.value = 1
  searchInfo.value = {}
  sortInfo.value = {}
  getTableData()
}

const onSubmit = () => {
  elSearchFormRef.value?.validate(async (valid) => {
    if (!valid) return
    page.value = 1
    getTableData()
  })
}

const onSortChange = ({ prop, order }) => {
  sortInfo.value = { sortField: prop, sortOrder: order === 'ascending' ? 'asc' : 'desc' }
  getTableData()
}

const handleSizeChange = (val) => { pageSize.value = val; getTableData() }
const handleCurrentChange = (val) => { page.value = val; getTableData() }

const unbindPhone = async (row) => {
  try {
    await ElMessageBox.confirm(`确认解绑设备 ${row.deviceId} 的手机号？`, '提示', { type: 'warning' })
    const res = await apiUnbindPhone({ deviceId: row.deviceId })
    if (res.code === 0) { ElMessage.success('解绑成功'); getTableData() }
  } catch { /* 取消 */ }
}

const deleteTraffic = async (row) => {
  try {
    await ElMessageBox.confirm(`确认删除设备 ${row.deviceId} 的流量卡套餐？`, '提示', { type: 'warning' })
    const res = await deleteTrafficPackage({ deviceId: row.deviceId })
    if (res.code === 0) { ElMessage.success('删除成功'); getTableData() }
  } catch { /* 取消 */ }
}

const selfCheck = async (row) => {
  try {
    await ElMessageBox.confirm(`确认对设备 ${row.deviceId} 进行自检？`, '提示', { type: 'info' })
    const res = await apiSelfCheck({ deviceId: row.deviceId })
    if (res.code === 0) { ElMessage.success('自检指令已下发') }
  } catch { /* 取消 */ }
}

const dispatchCommand = async (row) => {
  try {
    const { value: cmdCode } = await ElMessageBox.prompt(`请输入下发到设备 ${row.deviceId} 的指令编码`, '下发指令', {
      confirmButtonText: '确认下发',
      cancelButtonText: '取消',
      inputPlaceholder: '请输入指令编码',
      inputValidator: (val) => val?.trim() ? true : '指令编码不能为空',
    })
    if (!cmdCode?.trim()) return
    const res = await apiDispatchCmd({ deviceId: row.deviceId, cmdCode: cmdCode.trim() })
    if (res.code === 0) { ElMessage.success('指令已下发') }
  } catch { /* 取消 */ }
}

const resetDevicePassword = async (row) => {
  try {
    await ElMessageBox.confirm(`确认重置设备 ${row.deviceId} 的密码？`, '提示', { type: 'warning' })
    const res = await apiResetPassword({ deviceId: row.deviceId })
    if (res.code === 0) { ElMessage.success('密码重置指令已下发') }
  } catch { /* 取消 */ }
}

const rebootDevice = async (row) => {
  try {
    await ElMessageBox.confirm(`确认重启设备 ${row.deviceId}？重启期间设备将暂时离线。`, '提示', { type: 'warning' })
    const res = await apiReboot({ deviceId: row.deviceId })
    if (res.code === 0) { ElMessage.success('重启指令已下发') }
  } catch { /* 取消 */ }
}

getTableData()
</script>

<style scoped>
.table-button {
  margin: 0 2px;
  padding: 0 4px;
}
</style>