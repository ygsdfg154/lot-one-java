<template>
  <div class="device-page">
    <div class="device-layout">
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
      <div class="content-panel">
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo" @keyup.enter="onSubmit">
        <el-form-item label="关键字"><el-input v-model="searchInfo.keyword" clearable placeholder="设备 IMEI/名称/类型" /></el-form-item>
        <el-form-item label="设备 IMEI"><el-input v-model="searchInfo.deviceId" clearable placeholder="请输入设备 IMEI" /></el-form-item>
        <el-form-item label="设备名称"><el-input v-model="searchInfo.deviceName" clearable placeholder="请输入设备名称" /></el-form-item>
      <template v-if="showAllQuery">
        <el-form-item label="收费类型"><el-select v-model="searchInfo.billingType" clearable placeholder="请选择"><el-option label="免费" :value="BILLING_TYPE.FREE" /><el-option label="收费" :value="BILLING_TYPE.PAID" /></el-select></el-form-item>
        <el-form-item label="在线状态"><el-select v-model="searchInfo.status" clearable placeholder="请选择"><el-option label="在线" :value="ONLINE_STATUS.ONLINE" /><el-option label="离线" :value="ONLINE_STATUS.OFFLINE" /></el-select></el-form-item>
        <el-form-item label="设备状态"><el-select v-model="searchInfo.activationStatus" clearable placeholder="请选择"><el-option label="已激活" :value="ACTIVATION_STATUS.ACTIVATED" /><el-option label="未激活" :value="ACTIVATION_STATUS.INACTIVE" /><el-option label="已停机" :value="ACTIVATION_STATUS.STOPPED" /></el-select></el-form-item>
        <el-form-item label="禁用状态"><el-select v-model="searchInfo.disableStatus" clearable placeholder="请选择"><el-option label="正常" :value="DISABLE_STATUS.NORMAL" /><el-option label="已禁用" :value="DISABLE_STATUS.DISABLED" /></el-select></el-form-item>
        <el-form-item label="ICCID"><el-input v-model="searchInfo.iccid" clearable placeholder="请输入 ICCID" /></el-form-item>
        <el-form-item label="绑定手机号"><el-input v-model="searchInfo.bindPhone" clearable placeholder="请输入手机号" /></el-form-item>
        <el-form-item label="产品分类"><el-select v-model="searchInfo.productCategoryType" clearable filterable placeholder="请选择产品分类"><el-option v-for="item in productCategoryOptions" :key="item.value" :label="item.label" :value="Number(item.value)" /></el-select></el-form-item>
        <el-form-item label="所属商店"><el-select v-model="searchInfo.shopId" clearable filterable placeholder="请选择商店"><el-option v-for="item in shopOptions" :key="item.value" :label="item.label" :value="Number(item.value)" /></el-select></el-form-item>
        </template>
        <el-form-item label=" ">
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
          <el-button link type="primary" icon="arrow-down" @click="showAllQuery=true" v-if="!showAllQuery">展开</el-button>
          <el-button link type="primary" icon="arrow-up" @click="showAllQuery=false" v-else>收起</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="upload" @click="openBatchCreate">批量入库</el-button>
        <el-button icon="promotion" :disabled="!canBatchDispatch" @click="openBatchCmd">批量下发指令</el-button>
        <el-button icon="connection" :disabled="!canBatchEdit" @click="openBatchAssign">分配部门</el-button>
        <el-button icon="collection-tag" :disabled="!canBatchEdit" @click="openBatchLabel">批量标签</el-button>
        <el-button icon="copy-document" :disabled="!hasSelectedDevices" @click="copySelectedDeviceIds">复制设备号</el-button>
        <el-button icon="refresh-left" :disabled="!hasSelectedDevices" @click="resetSelectedDevices">重置设备</el-button>
        <el-button icon="download" @click="handleExport">本次查询导出 Excel</el-button>
        <el-button icon="refresh" @click="getTableData">刷新</el-button>
      </div>

      <div v-if="multipleSelection.length > 0 && !selectAll" class="select-all-bar">
        <el-alert type="info" :closable="false" show-icon>
          <template #title><span>已选择当前页 <b>{{ multipleSelection.length }}</b> 项。<el-button type="primary" link size="small" @click="onSelectAll">选择全部 {{ total }} 项</el-button></span></template>
        </el-alert>
      </div>
      <div v-if="selectAll" class="select-all-bar">
        <el-alert type="warning" :closable="false" show-icon>
          <template #title><span>已选择全部 <b>{{ total }}</b> 项。<el-button type="primary" link size="small" @click="onClearSelectAll">清除选择</el-button></span></template>
        </el-alert>
      </div>

      <el-table style="width:100%" :data="tableData" row-key="deviceId" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="48" />
        <el-table-column label="设备 IMEI" prop="deviceId" min-width="150" show-overflow-tooltip />
        <el-table-column label="对外展示号" prop="displayNo" min-width="130" show-overflow-tooltip><template #default="{ row }">{{ row.displayNo || '-' }}</template></el-table-column>
        <el-table-column label="设备名称" min-width="140" show-overflow-tooltip><template #default="{ row }">{{ row.deviceName || row.deviceId }}</template></el-table-column>
        <el-table-column label="付费" width="90"><template #default="{ row }"><el-tag :type="getBillingPaidTagType(row)" size="small">{{ getBillingPaidText(row) }}</el-tag></template></el-table-column>
        <el-table-column label="产品分类" min-width="110" show-overflow-tooltip><template #default="{ row }">{{ getProductCategoryLabel(row.productCategoryName || row.productCategoryType) }}</template></el-table-column>
        <el-table-column label="设备型号" min-width="110" show-overflow-tooltip><template #default="{ row }">{{ row.productName || row.deviceModel || '-' }}</template></el-table-column>
        <el-table-column label="所属组织" min-width="120" show-overflow-tooltip><template #default="{ row }">{{ getDeptDisplayName(row) || '-' }}</template></el-table-column>
        <el-table-column label="设备状态" width="100"><template #default="{ row }"><el-tag :type="getActivationStatusTagType(row.activationStatus)">{{ getActivationStatusDisplay(row) }}</el-tag></template></el-table-column>
        <el-table-column label="禁用状态" width="90"><template #default="{ row }"><el-tag :type="getDisableStatusTagType(row.disableStatus)" size="small">{{ getDisableStatusText(row.disableStatus) }}</el-tag></template></el-table-column>
        <el-table-column label="在线状态" width="90"><template #default="{ row }"><el-tag :type="getOnlineStatusTagType(row.onlineStatus)">{{ getOnlineStatusText(row.onlineStatus) }}</el-tag></template></el-table-column>
        <el-table-column label="所属商店" min-width="120" show-overflow-tooltip><template #default="{ row }">{{ row.shopName || '-' }}</template></el-table-column>
        <el-table-column label="标签" min-width="140" show-overflow-tooltip><template #default="{ row }"><span v-if="!row.labels">-</span><el-tag v-for="(t, i) in (row.labels || '').split(',').map(s => s.trim()).filter(Boolean)" :key="i" size="small" class="label-inline-tag">{{ t }}</el-tag></template></el-table-column>
        <el-table-column label="绑定手机号" min-width="120" show-overflow-tooltip><template #default="{ row }">{{ row.bindPhone || '-' }}</template></el-table-column>
        <el-table-column label="ICCID" min-width="150" show-overflow-tooltip><template #default="{ row }">{{ row.iccid || '-' }}</template></el-table-column>
        <el-table-column label="导入时间" width="180" show-overflow-tooltip><template #default="{ row }">{{ formatTime(row.importTime) }}</template></el-table-column>
        <el-table-column label="销售时间" width="180" show-overflow-tooltip><template #default="{ row }">{{ formatTime(row.saleTime) }}</template></el-table-column>
        <el-table-column label="激活时间" width="180" show-overflow-tooltip><template #default="{ row }">{{ formatTime(row.activeTime) }}</template></el-table-column>
        <el-table-column label="绑定时间" width="180" show-overflow-tooltip><template #default="{ row }">{{ formatTime(row.bindTime) }}</template></el-table-column>
        <el-table-column label="操作" width="380" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link icon="promotion" :disabled="!canDispatchDevice(row)" @click="goCmd(row)">下发指令</el-button>
            <el-button type="primary" link icon="edit" :disabled="!canEditDevice(row)" @click="openEdit(row)">编辑</el-button>
            <el-button type="primary" link icon="edit-pen" :disabled="!canEditDevice(row)" @click="openRename(row)">改名</el-button>
            <el-button type="primary" link icon="collection-tag" :disabled="!canEditDevice(row)" @click="openLabel(row)">标签</el-button>
            <el-button type="primary" link icon="data-analysis" @click="goReport(row)">报表</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination"><el-pagination layout="total,sizes,prev,pager,next,jumper" :current-page="page" :page-size="pageSize" :page-sizes="[10,30,50,100]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" /></div>
    </div>

    <el-dialog v-model="cmdVisible" title="指令下发" width="1000px" :close-on-click-modal="false" @closed="resetCmdForm">
      <div class="cmd-modal">
        <el-alert v-if="isBatchCmd" class="mb-2" type="info" :closable="false" show-icon><template #title>所选设备：{{ batchCmdDeviceIds.join(', ') }}</template></el-alert>
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
          <el-input v-if="isFamilyNumCmd" v-model="familyNumText" class="mt-2" placeholder="请输入 3 个手机号，用逗号分隔，如 13800001111,13800002222,13800003333" />
        </div>

        <h3 class="cmd-log-title">指令日志<small>（绿色的指令为最后一条待执行或已下发但设备未响应的离线指令。）</small></h3>
        <el-table :data="cmdHistory" v-loading="cmdHistoryLoading" max-height="380">
          <el-table-column label="设备 IMEI" prop="deviceId" min-width="130" />
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

    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="editVisible" :show-close="false" :before-close="closeEdit">
      <template #header><div class="flex justify-between items-center"><span class="text-lg">设备信息编辑</span><div><el-button :loading="btnLoading" type="primary" @click="saveEdit">确定</el-button><el-button @click="closeEdit">取消</el-button></div></div></template>
      <el-form :model="editForm" label-position="top">
        <el-form-item label="设备 IMEI"><el-input v-model="editForm.deviceId" disabled /></el-form-item>
        <el-form-item label="对外展示号"><el-input v-model="editForm.displayNo" clearable placeholder="面向用户的逻辑编号，留空则不展示" /></el-form-item>
        <!-- <el-form-item label="设备名称"><span>{{ editForm.deviceName || '-' }}</span></el-form-item> -->
        <!-- <el-form-item label="产品类型"><span>{{ getProductTypeLabel(editForm.productTypeName) }}</span></el-form-item> -->
        <el-form-item label="收费类型"><el-select v-model="editForm.billingType" clearable><el-option label="免费" :value="BILLING_TYPE.FREE" /><el-option label="收费" :value="BILLING_TYPE.PAID" /></el-select></el-form-item>
        <!-- <el-form-item label="标签"><span v-if="!editForm.labels">-</span><el-tag v-for="(t, i) in (editForm.labels || '').split(',').map(s => s.trim()).filter(Boolean)" :key="i" size="small" class="label-inline-tag">{{ t }}</el-tag></el-form-item> -->
        <el-form-item label="分配部门"><el-tree-select v-model="editForm.deptId" :data="deptTreeOptions" :props="{ label: 'label', value: 'value', children: 'children' }" check-strictly clearable filterable :render-after-expand="false" style="width:100%" /></el-form-item>
        <el-form-item label="所属商店"><el-select v-model="editForm.shopId" clearable filterable><el-option v-for="item in shopOptions" :key="item.value" :label="item.label" :value="item.value" /></el-select></el-form-item>
        <!-- <el-form-item label="设备型号"><span>{{ editForm.deviceModel || editForm.productName || '-' }}</span></el-form-item> -->
        <el-form-item label="ICCID"><el-input v-model="editForm.iccid" clearable /></el-form-item>
        <el-form-item label="绑定手机号"><el-input v-model="editForm.bindPhone" clearable /></el-form-item>
        <!-- <el-form-item label="在线状态"><span>{{ getOnlineStatusText(editForm.onlineStatus) }}</span></el-form-item> -->
        <!-- <el-form-item label="设备状态"><span>{{ getActivationStatusText(editForm.activationStatus) }}</span></el-form-item> -->
        <el-form-item label="禁用状态"><el-select v-model="editForm.disableStatus" clearable><el-option label="正常" :value="DISABLE_STATUS.NORMAL" /><el-option label="已禁用" :value="DISABLE_STATUS.DISABLED" /></el-select></el-form-item>
        <!-- <el-form-item label="导入时间"><span>{{ editForm.importTime || '-' }}</span></el-form-item>
        <el-form-item label="销售时间"><span>{{ editForm.saleTime || '-' }}</span></el-form-item>
        <el-form-item label="激活时间"><span>{{ editForm.activeTime || '-' }}</span></el-form-item>
        <el-form-item label="绑定时间"><span>{{ editForm.bindTime || '-' }}</span></el-form-item> -->
      </el-form>
    </el-drawer>

    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="addVisible" :show-close="false" :before-close="closeAdd">
      <template #header><div class="flex justify-between items-center"><span class="text-lg">新增设备</span><div><el-button :loading="btnLoading" type="primary" @click="saveAdd">确定</el-button><el-button @click="closeAdd">取消</el-button></div></div></template>
      <el-form :model="addForm" label-position="top">
        <el-form-item label="设备 IMEI"><el-input v-model="addForm.deviceId" clearable placeholder="请输入设备 IMEI（IMEI/SN）" /></el-form-item>
        <el-form-item label="设备名称"><el-input v-model="addForm.deviceName" clearable /></el-form-item>
        <el-form-item label="产品类型"><el-input v-model="addForm.deviceType" clearable /></el-form-item>
        <el-form-item label="收费类型"><el-select v-model="addForm.billingType" clearable><el-option label="免费" :value="BILLING_TYPE.FREE" /><el-option label="收费" :value="BILLING_TYPE.PAID" /></el-select></el-form-item>
        <el-form-item label="标签"><el-input v-model="addForm.labels" clearable /></el-form-item>
        <el-form-item label="分配部门"><el-tree-select v-model="addForm.deptId" :data="deptTreeOptions" :props="{ label: 'label', value: 'value', children: 'children' }" check-strictly clearable filterable :render-after-expand="false" style="width:100%" /></el-form-item>
        <el-form-item label="所属商店"><el-select v-model="addForm.shopId" clearable filterable><el-option v-for="item in shopOptions" :key="item.value" :label="item.label" :value="item.value" /></el-select></el-form-item>
      </el-form>
    </el-drawer>

    <el-dialog v-model="batchCreateVisible" title="批量入库" width="600px" :close-on-click-modal="false">
      <el-form ref="elBatchFormRef" :model="batchCreateForm" :rules="batchCreateRules" label-width="100px">
        <el-form-item label="设备 IMEI" prop="deviceIdsText"><el-input v-model="batchCreateForm.deviceIdsText" type="textarea" :rows="6" placeholder="请输入设备 IMEI，多个用逗号或换行分隔" /></el-form-item>
        <el-form-item label="产品" prop="productId"><el-select v-model="batchCreateForm.productId" clearable filterable style="width:100%"><el-option v-for="item in productOptions" :key="item.value" :label="item.label" :value="Number(item.value)" /></el-select></el-form-item>
        <el-form-item label="收费类型"><el-select v-model="batchCreateForm.billingType" clearable style="width:100%"><el-option label="免费" :value="BILLING_TYPE.FREE" /><el-option label="收费" :value="BILLING_TYPE.PAID" /></el-select></el-form-item>
        <el-form-item label="所属部门" prop="deptId"><el-tree-select v-model="batchCreateForm.deptId" :data="deptTreeOptions" :props="{ label: 'label', value: 'value', children: 'children' }" check-strictly clearable filterable :render-after-expand="false" style="width:100%" /></el-form-item>
        <el-form-item label="所属商店"><el-select v-model="batchCreateForm.shopId" clearable filterable style="width:100%"><el-option v-for="item in shopOptions" :key="item.value" :label="item.label" :value="Number(item.value)" /></el-select></el-form-item>
      </el-form>
      <div v-if="batchResults.length" class="mt-4"><el-table :data="batchResults" border size="small" max-height="250"><el-table-column label="IMEI" prop="deviceId" /><el-table-column label="结果" width="80"><template #default="{ row }"><el-tag :type="row.success ? 'success' : 'danger'" size="small">{{ row.success ? '通过' : '不通过' }}</el-tag></template></el-table-column><el-table-column label="原因" prop="message" /></el-table></div>
      <template #footer><el-button @click="batchCreateVisible = false">取消</el-button><el-button type="primary" :loading="btnLoading" @click="doBatchCreate">校验并入库</el-button></template>
    </el-dialog>

    <el-dialog v-model="batchAssignVisible" title="设备分配" width="400px">
      <el-tree-select v-model="batchAssignDeptId" :data="deptTreeOptions" :props="{ label: 'label', value: 'value', children: 'children' }" check-strictly clearable filterable :render-after-expand="false" placeholder="请选择部门" style="width:100%" />
      <template #footer><el-button @click="batchAssignVisible = false">取消</el-button><el-button type="primary" :loading="btnLoading" @click="doBatchAssign">确定分配</el-button></template>
    </el-dialog>

    <el-dialog v-model="labelEditVisible" title="标签修改" width="500px" :close-on-click-modal="false" @closed="labelEditDeviceId = ''">
      <div class="label-edit-area">
        <div class="label-tags">
          <el-tag v-for="(tag, idx) in labelEditTags" :key="idx" closable class="label-tag-item" @close="removeLabelTag(idx)">{{ tag }}</el-tag>
          <span v-if="!labelEditTags.length" class="label-empty-hint">暂无标签，请在下方添加</span>
        </div>
        <div class="label-input-row">
          <el-input v-model="labelNewTag" placeholder="输入新标签，回车添加" @keyup.enter="addLabelTag" />
          <el-button type="primary" @click="addLabelTag">添加</el-button>
        </div>
      </div>
      <template #footer><el-button @click="labelEditVisible = false">取消</el-button><el-button type="primary" :loading="btnLoading" @click="saveLabelEdit">确定</el-button></template>
    </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { exportLotDevices, getLotDeviceList, updateLotDevice, updateLotDeviceName, updateLotDeviceTags, updateLotDevicesTags, dispatchDeviceCmd, batchDispatchDeviceCmd, createLotDevice, batchCreateDevices, assignLotDevicesDept, resetLotDevices, getLotDeviceAvailableCmds, getLotDeviceCmdHistory } from '@/api/lot/lotDevice'
import { getLotDeptTree } from '@/api/lot/lotDept'
import { deptTreeToOptions, getDeptDisplayName } from '@/utils/deptHelper'
import { getLotProductList } from '@/api/lot/lotProduct'
import { getLotShopDataSource } from '@/api/lot/lotShop'
import { getDictFunc } from '@/utils/format'
import { ACTIVATION_STATUS, ONLINE_STATUS, DISABLE_STATUS, BILLING_TYPE, getActivationStatusTagType, getActivationStatusText, getActivationStatusDisplay, getOnlineStatusText, getOnlineStatusTagType, getDisableStatusText, getDisableStatusTagType, getBillingPaidText, getBillingPaidTagType } from '../constants'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, onActivated, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore, useUserStore } from '@/pinia'

defineOptions({ name: 'LotDeviceInfo' })
const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()
const btnLoading = ref(false)
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})
const multipleSelection = ref([])
const deptTreeOptions = ref([])
const deptTreeData = ref([])
const shopOptions = ref([])
const showAllQuery = ref(false)

const loadDeptTree = async () => {
  try {
    const res = await getLotDeptTree()
    if (res.code === 0 && res.data) deptTreeData.value = res.data
  } catch { /* 部门树加载失败不影响主流程 */ }
}
const onDeptNodeClick = (data) => {
  searchInfo.value.deptId = data ? data.ID : undefined
  onSubmit()
}
const editVisible = ref(false)
const editForm = ref(getDefaultEditForm())
const addVisible = ref(false)
const addForm = ref(getDefaultAddForm())
const cmdVisible = ref(false)
const cmdDeviceId = ref('')
const cmdSending = ref(false)
const customCmdText = ref('')
const familyNumText = ref('')
const selectedCmdId = ref(null)
const availableCmds = ref([])
const availableCmdOptions = ref([])
const availableCmdLoading = ref(false)
const isCustomCmd = ref(false)
const isFamilyNumCmd = ref(false)
const cmdHistory = ref([])
const cmdHistoryLoading = ref(false)
const cmdHistoryPage = ref(1)
const cmdHistoryPageSize = ref(10)
const cmdHistoryTotal = ref(0)
const cmdReplyVisible = ref(false)
const selectedCmdReply = ref({})
const selectAll = ref(false)
const batchCreateVisible = ref(false)
const batchAssignVisible = ref(false)
const batchAssignDeptId = ref(null)
const labelEditVisible = ref(false)
const labelEditDeviceId = ref('')
const labelEditTags = ref([])
const labelNewTag = ref('')
const elBatchFormRef = ref()
const batchCreateForm = ref({ deviceIdsText: '', productId: null, deptId: null, shopId: null, billingType: 0 })
const batchResults = ref([])
const productCategoryOptions = ref([])
const productTypeOptions = ref([])
const productOptions = ref([])
const mounted = ref(false)
const batchCreateRules = {
  deviceIdsText: [{ required: true, message: '请输入设备 IMEI', trigger: 'blur' }],
  productId: [{ required: true, message: '请选择产品', trigger: 'change' }],
  deptId: [{ required: true, message: '请选择所属部门', trigger: 'change' }]
}
const hasSelectedDevices = computed(() => selectAll.value || multipleSelection.value.length > 0)
const currentCmd = computed(() => findCmdById(availableCmds.value, selectedCmdId.value) || null)
const selectedDispatchCmd = computed(() => currentCmd.value)
const batchCmdDeviceIds = computed(() => cmdDeviceId.value.split(',').map(item => item.trim()).filter(Boolean))
const isBatchCmd = computed(() => batchCmdDeviceIds.value.length > 1)
const canBatchDispatch = computed(() => {
  if (!hasSelectedDevices.value) return false
  return true
})
const canBatchEdit = computed(() => {
  if (!hasSelectedDevices.value) return false
  return true
})

function getDefaultEditForm() { return { deviceId: '', displayNo: '', deviceName: '', deviceType: '', productTypeName: '', billingType: 0, deviceModel: '', productName: '', iccid: '', bindPhone: '', labels: '', proxyCode: '', deptId: undefined, shopId: undefined, status: undefined, activationStatus: undefined, disableStatus: undefined, importTime: '', activeTime: '', saleTime: '', bindTime: '' } }
function getDefaultAddForm() { return { deviceId: '', deviceName: '', deviceType: '', billingType: 0, labels: '', proxyCode: '', deptId: undefined, shopId: undefined } }
const getSearchParams = () => Object.fromEntries(Object.entries(searchInfo.value).filter(([, v]) => v !== '' && v !== undefined && v !== null))
const onReset = () => { searchInfo.value = {}; page.value = 1; getTableData() }
const onSubmit = () => { page.value = 1; getTableData() }
const handleSizeChange = (val) => { pageSize.value = val; getTableData() }
const handleCurrentChange = (val) => { page.value = val; getTableData() }
const getTableData = async() => { selectAll.value = false; multipleSelection.value = []; const table = await getLotDeviceList({ page: page.value, pageSize: pageSize.value, ...getSearchParams() }); if (table.code === 0) { tableData.value = table.data.list || []; total.value = table.data.total; page.value = table.data.page; pageSize.value = table.data.pageSize } }
const setOptions = async() => { const deptRes = await getLotDeptTree(); if (deptRes.code === 0) deptTreeOptions.value = deptTreeToOptions(deptRes.data); const [productRes, catDict] = await Promise.allSettled([getLotProductList({ page: 1, pageSize: 1000 }), getDictFunc('product_category')]); if (productRes.status === 'fulfilled' && productRes.value.code === 0) productOptions.value = (productRes.value.data?.list || []).map(p => ({ label: p.name || p.productName || p.code || String(p.ID), value: Number(p.ID) })); if (catDict.status === 'fulfilled' && catDict.value?.length) productCategoryOptions.value = catDict.value; const typeDict = await getDictFunc('product_type'); if (typeDict?.length) productTypeOptions.value = typeDict; const shopRes = await getLotShopDataSource(); if (shopRes.code === 0) shopOptions.value = shopRes.data.shopList || [] }
const getProductCategoryLabel = (code) => { if (code === undefined || code === null || code === '') return '-'; const opt = productCategoryOptions.value.find(item => String(item.value) === String(code)); return opt?.label || code || '-' }
const getProductTypeLabel = (v) => { if (v === undefined || v === null || v === '') return '-'; const opt = productTypeOptions.value.find(item => String(item.value) === String(v)); return opt?.label || v || '-' }
const canDispatchDevice = (row) => Boolean(row?.deviceId)
const canEditDevice = (row) => Boolean(row?.deviceId)
const handleSelectionChange = (val) => { multipleSelection.value = val; if (!val.length) selectAll.value = false }
const toPickerTime = (v) => { if (!v) return ''; const d = new Date(v); if (isNaN(d.getTime())) return v; const pad = (n) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` }
const openEdit = (row) => { editForm.value = { deviceId: row.deviceId || '', displayNo: row.displayNo || '', deviceName: row.deviceName || '', deviceType: row.deviceType || '', productTypeName: row.productTypeName || '', billingType: row.billingType != null ? Number(row.billingType) : 0, deviceModel: row.deviceModel || '', productName: row.productName || '', iccid: row.iccid || '', bindPhone: row.bindPhone || '', labels: row.labels || '', proxyCode: row.proxyCode || '', deptId: row.deptId ? Number(row.deptId) : undefined, shopId: row.shopId ? Number(row.shopId) : undefined, onlineStatus: row.onlineStatus != null ? Number(row.onlineStatus) : undefined, activationStatus: row.activationStatus != null ? Number(row.activationStatus) : undefined, disableStatus: row.disableStatus != null ? Number(row.disableStatus) : undefined, importTime: toPickerTime(row.importTime), activeTime: toPickerTime(row.activeTime), saleTime: toPickerTime(row.saleTime), bindTime: toPickerTime(row.bindTime) }; editVisible.value = true }
const closeEdit = () => { editVisible.value = false; editForm.value = getDefaultEditForm() }
const saveEdit = async() => { btnLoading.value = true; const payload = { ...editForm.value }; delete payload.deviceId; delete payload.onlineStatus; delete payload.activationStatus; delete payload.deviceName; delete payload.labels; delete payload.importTime; delete payload.saleTime; delete payload.activeTime; delete payload.bindTime; delete payload.deviceModel; delete payload.deviceType; delete payload.productTypeName; const res = await updateLotDevice(editForm.value.deviceId, payload); btnLoading.value = false; if (res.code === 0) { ElMessage.success('更新成功'); closeEdit(); getTableData() } }
const closeAdd = () => { addVisible.value = false; addForm.value = getDefaultAddForm() }
const saveAdd = async() => { if (!addForm.value.deviceId) return ElMessage.warning('请输入设备 IMEI'); btnLoading.value = true; const res = await createLotDevice({ ...addForm.value, status: 1 }); btnLoading.value = false; if (res.code === 0) { ElMessage.success('新增成功'); closeAdd(); getTableData() } }
const openRename = (row) => { ElMessageBox.prompt('请输入新名称', '修改名称', { inputValue: row.deviceName || '' }).then(async({ value }) => { if (!value || value === row.deviceName) return; const res = await updateLotDeviceName(row.deviceId, value); if (res.code === 0) { ElMessage.success('名称已更新'); getTableData() } }) }
const openLabel = (row) => { labelEditDeviceId.value = row.deviceId; labelEditTags.value = (row.labels || '').split(',').map(s => s.trim()).filter(Boolean); labelNewTag.value = ''; labelEditVisible.value = true }
const addLabelTag = () => { const v = labelNewTag.value.trim(); if (!v) return; if (labelEditTags.value.includes(v)) { ElMessage.warning('标签已存在'); return } labelEditTags.value.push(v); labelNewTag.value = '' }
const removeLabelTag = (idx) => { labelEditTags.value.splice(idx, 1) }
const saveLabelEdit = async() => { if (!labelEditDeviceId.value) return; btnLoading.value = true; const res = await updateLotDeviceTags(labelEditDeviceId.value, labelEditTags.value.join(',')); btnLoading.value = false; if (res.code === 0) { ElMessage.success('标签已更新'); labelEditVisible.value = false; getTableData() } }
const goReport = (row) => { if (row.deviceId) router.push({ name: 'LotStatsReport', query: { deviceId: row.deviceId } }) }
const goCmd = async(row) => { if (!row.deviceId) return; cmdDeviceId.value = row.deviceId; resetCmdForm(); cmdVisible.value = true; await Promise.all([loadAvailableCmds(row.deviceId), loadCmdHistory()]) }
const resetCmdForm = () => { selectedCmdId.value = null; customCmdText.value = ''; familyNumText.value = ''; isCustomCmd.value = false; isFamilyNumCmd.value = false; availableCmds.value = []; availableCmdOptions.value = []; cmdHistory.value = []; cmdHistoryPage.value = 1; cmdHistoryTotal.value = 0 }
const getCmdId = (cmd) => cmd?.ID ?? cmd?.id
const toCascaderOptions = (nodes) => (nodes || []).map(item => ({ value: getCmdId(item), label: item.cmdTitle || item.cmdCode || getCmdId(item), children: item.children?.length ? toCascaderOptions(item.children) : undefined }))
// S_FAMILY_NUM(亲情号码):HLXT 目前只验证过恰好 3 个号码一起下发这一种帧型
// (services/iot-runtime crates/protocol-hlxt/src/cmd.rs 的 S_FAMILY_NUM 分支),
// 不是 3 个的形状后端会直接拒绝(不猜帧体),这里前置校验避免用户发了才发现被拒。
const familyNumPhonePattern = /^1[3-9]\d{9}$/
const loadAvailableCmds = async(deviceId) => { availableCmdLoading.value = true; const res = await getLotDeviceAvailableCmds(deviceId); availableCmdLoading.value = false; if (res.code === 0) { availableCmds.value = res.data?.cmdList || []; availableCmdOptions.value = toCascaderOptions(availableCmds.value); if (!availableCmdOptions.value.length) ElMessage.warning('当前设备暂无绑定指令') } }
const loadCmdHistory = async() => { const ids = batchCmdDeviceIds.value; if (!ids.length || ids.length > 1) return; cmdHistoryLoading.value = true; const res = await getLotDeviceCmdHistory(ids[0], { page: cmdHistoryPage.value, pageSize: cmdHistoryPageSize.value }); cmdHistoryLoading.value = false; if (res.code === 0) { cmdHistory.value = res.data?.list || []; cmdHistoryTotal.value = res.data?.total || 0; cmdHistoryPage.value = res.data?.page || cmdHistoryPage.value } }
const handleCmdHistoryPageChange = (val) => { cmdHistoryPage.value = val; loadCmdHistory() }
const onAvailableCmdChange = (id) => { const cmd = findCmdById(availableCmds.value, id); if (!cmd) return; applySelectedCmd(cmd) }
const applySelectedCmd = (cmd) => { isCustomCmd.value = isCustomCommand(cmd); customCmdText.value = isCustomCmd.value ? (cmd?.cmdContent || cmd?.template || '') : ''; isFamilyNumCmd.value = isFamilyNumCommand(cmd); familyNumText.value = '' }
const findCmdById = (list, id) => { for (const item of list || []) { if (Number(getCmdId(item)) === Number(id)) return item; const child = findCmdById(item.children || [], id); if (child) return child } return null }
const getCmdCode = (cmd) => cmd?.cmdCode || ''
const isCustomCommand = (cmd) => getCmdCode(cmd) === 'CUSTOM_CMD'
const isFamilyNumCommand = (cmd) => getCmdCode(cmd) === 'S_FAMILY_NUM'
const parseCmdParams = (template) => { if (!template) return {}; try { const parsed = JSON.parse(template); if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed } catch { ElMessage.error('指令参数格式错误'); return null } return {} }
const buildOldCmdPayload = (cmd) => {
  const isCustom = isCustomCommand(cmd)
  if (isCustom && !customCmdText.value) { ElMessage.warning('请输入自定义指令'); return null }
  const isFamilyNum = isFamilyNumCommand(cmd)
  let params
  let sd
  if (isFamilyNum) {
    const phones = familyNumText.value.split(/[,，\s]+/).map(s => s.trim()).filter(Boolean)
    if (phones.length !== 3) { ElMessage.warning('请输入 3 个手机号（用逗号分隔）'); return null }
    if (!phones.every(p => familyNumPhonePattern.test(p))) { ElMessage.warning('手机号格式不对，请检查'); return null }
    params = { phones }
  } else {
    params = isCustom ? {} : parseCmdParams(cmd.cmdContent || cmd.template)
    if (params === null) return null
    sd = isCustom ? customCmdText.value : undefined
  }
  const cmdParamsText = JSON.stringify(params)
  return { cmdId: getCmdId(cmd), cmdCode: getCmdCode(cmd), params, sd, cmdTitle: cmd.cmdTitle, cmdName: cmd.cmdTitle, cmdParams: cmdParamsText, cmdContent: sd || cmdParamsText, operator: getCurrentOperator(), canOffline: getCanOfflineValue(cmd), appSource: 'web', channel: 'web' }
}
const sendCmd = async() => { if (!selectedCmdId.value) return ElMessage.warning('请选择指令'); const payload = buildOldCmdPayload(selectedDispatchCmd.value); if (!payload) return; const ids = batchCmdDeviceIds.value; if (!ids.length) return ElMessage.warning('请选择设备'); cmdSending.value = true; let failCount = ids.length; try { if (ids.length === 1) { const res = await dispatchDeviceCmd({ ...payload, deviceId: ids[0] }); failCount = res.code === 0 ? 0 : 1 } else { const res = await batchDispatchDeviceCmd(ids, payload); failCount = res.code === 0 ? (res.data?.failed || 0) : ids.length } } catch { failCount = ids.length } finally { cmdSending.value = false } if (failCount === 0) ElMessage.success('发送成功'); else if (failCount === ids.length) ElMessage.error('发送失败'); else ElMessage.warning(`发送成功 ${ids.length - failCount}/${ids.length}`); loadCmdHistory() }
const getCurrentOperator = () => userStore.userInfo?.nickName || userStore.userInfo?.userName || userStore.userInfo?.ID?.toString() || ''
const getCanOfflineValue = (cmd) => { if (cmd?.cmdFlags) return cmd.cmdFlags === 'OFFLINE' ? 1 : 0; if (cmd?.canOffline === undefined || cmd?.canOffline === null) return undefined; return Number(cmd.canOffline) === 0 ? 1 : 0 }
const getCmdResultType = (row) => row.offlineEffect ? 'success' : row.result === 'success' ? 'success' : row.result === 'fail' ? 'danger' : 'warning'
const getCmdResultText = (row) => row.reply ? '终端回复成功' : row.result === 'success' ? '下发成功' : row.result === 'fail' ? '下发失败' : row.offlineEffect ? '离线待执行' : '待处理'
const showCmdReply = (row) => { selectedCmdReply.value = row; cmdReplyVisible.value = true }
const formatTime = (value) => { if (!value) return '-'; return String(value).replace('T', ' ').replace(/\.\d+.*$/, '').replace(/\+.*$/, '') }
const getSelectedDevices = async() => { if (!selectAll.value) return multipleSelection.value; const res = await getLotDeviceList({ page: 1, pageSize: total.value || 99999, ...getSearchParams() }); return res.code === 0 ? (res.data?.list || []) : [] }
const getSelectedDeviceIds = async() => { const rows = await getSelectedDevices(); return rows.map(item => item.deviceId).filter(Boolean) }
const ensureSelectedDevicesEditable = async() => { const rows = await getSelectedDevices(); return rows.map(item => item.deviceId).filter(Boolean) }
const openBatchCreate = () => { batchCreateForm.value = { deviceIdsText: '', productId: null, deptId: null, shopId: null, billingType: 0 }; batchResults.value = []; batchCreateVisible.value = true }
const doBatchCreate = async() => {
  elBatchFormRef.value?.validate(async(valid) => {
    if (!valid) return;
    const ids = [...new Set(batchCreateForm.value.deviceIdsText.split(/[\n,，\s]+/).map(s => s.trim()).filter(Boolean))];
    if (!ids.length) return ElMessage.warning('请输入设备 IMEI');
    btnLoading.value = true;
    const res = await batchCreateDevices({
      deviceIds: ids,
      productId: Number(batchCreateForm.value.productId),
      deptId: Number(batchCreateForm.value.deptId),
      shopId: Number(batchCreateForm.value.shopId || 0),
      billingType: Number(batchCreateForm.value.billingType || 0)
    });
    btnLoading.value = false;
    if (res.code === 0) {
      const data = res.data || {};
      const successCount = data.created || 0;
      const failCount = data.failed || 0;

      if (failCount === 0) {
        // 全部成功：关闭弹框，刷新列表
        ElMessage.success(`全部入库成功！共 ${successCount} 台`);
        batchCreateVisible.value = false;
        getTableData();
        // 重置表单和结果
        batchCreateForm.value = { deviceIdsText: '', productId: null, deptId: null, shopId: null, billingType: 0 };
        batchResults.value = [];
      } else {
        // 有失败：只保留失败记录，弹框保持打开
        const failedResults = (data.results || []).filter(item => !item.success);
        batchResults.value = failedResults;
        
        // 把失败的 IMEI 回填到输入框，方便用户修正后重试
        const failedIds = failedResults.map(item => item.deviceId).filter(Boolean);
        if (failedIds.length) {
          batchCreateForm.value.deviceIdsText = failedIds.join('\n');
        }
        
        ElMessage.warning(`入库完成：成功 ${successCount} 台，失败 ${failCount} 台，请修正后重新入库`);
      }
    }
  })
}
const openBatchAssign = async() => { const ids = await ensureSelectedDevicesEditable(); if (!ids.length) return ElMessage.warning('请选择设备'); batchAssignDeptId.value = null; batchAssignVisible.value = true }
const doBatchAssign = async() => { if (!batchAssignDeptId.value) return ElMessage.warning('请选择部门'); const ids = await ensureSelectedDevicesEditable(); if (!ids.length) return ElMessage.warning('请选择设备'); btnLoading.value = true; const res = await assignLotDevicesDept(ids, Number(batchAssignDeptId.value)); btnLoading.value = false; if (res.code === 0) { ElMessage.success('分配完成'); batchAssignVisible.value = false; getTableData() } }
const openBatchCmd = async() => { const rows = await getSelectedDevices(); const ids = rows.map(item => item.deviceId).filter(Boolean); if (!ids.length) return ElMessage.warning('请选择设备'); cmdDeviceId.value = ids.join(','); resetCmdForm(); cmdDeviceId.value = ids.join(','); cmdVisible.value = true; await loadAvailableCmds(ids[0]); if (ids.length === 1) await loadCmdHistory() }
const resetSelectedDevices = async() => { const ids = await getSelectedDeviceIds(); if (!ids.length) return ElMessage.warning('请选择设备'); ElMessageBox.confirm(`确定要重置这些设备吗？\n${ids.join(', ').slice(0, 160)}`, '提示', { type: 'warning' }).then(async() => { const res = await resetLotDevices(ids); if (res.code === 0) { ElMessage.success('设备重置成功'); getTableData() } }) }
const copySelectedDeviceIds = async() => { const ids = await getSelectedDeviceIds(); if (!ids.length) return ElMessage.warning('请选择设备'); const text = ids.join('\n'); try { await navigator.clipboard.writeText(text) } catch { const el = document.createElement('textarea'); el.value = text; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el) } ElMessage.success('复制成功') }
const openBatchLabel = async() => { const ids = await ensureSelectedDevicesEditable(); if (!ids.length) return ElMessage.warning('请选择设备'); ElMessageBox.prompt('请输入标签，多个用逗号分隔', '添加标签').then(async({ value }) => { const res = await updateLotDevicesTags(ids, value || ''); if (res.code === 0) { ElMessage.success('标签已更新'); getTableData() } }) }
const onSelectAll = () => { selectAll.value = true; multipleSelection.value = [] }
const onClearSelectAll = () => { selectAll.value = false }
const handleExport = async() => { const params = getSearchParams(); if (selectAll.value) params.selectAll = true; else if (multipleSelection.value.length) params.deviceIds = multipleSelection.value.map(r => r.deviceId); const res = await exportLotDevices(params); const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); const filename = getDownloadFilename(res.headers?.['content-disposition']) || '设备列表.xlsx'; const url = window.URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; document.body.appendChild(link); link.click(); document.body.removeChild(link); window.URL.revokeObjectURL(url) }
const getDownloadFilename = (cd) => { if (!cd) return ''; const m = cd.match(/filename\*=UTF-8''([^;]+)/i); if (m?.[1]) return decodeURIComponent(m[1]); const m2 = cd.match(/filename="?([^";]+)"?/i); return m2?.[1] || '' }
onMounted(() => { mounted.value = true; loadDeptTree(); setOptions(); getTableData() })
onActivated(() => { if (mounted.value) getTableData() })
</script>

<style scoped>
.device-layout {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
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
.content-panel {
  min-width: 0;
  overflow-y: auto;
}
.gva-btn-list { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.cmd-modal { min-height: 620px; }
.cmd-form-row { display: flex; gap: 12px; align-items: center; }
.cmd-select { width: 240px; }
.cmd-summary { margin-top: 10px; padding: 14px 18px; background: #eef4ff; min-height: 120px; }
.cmd-summary p { margin: 8px 0; }
.cmd-log-title { margin: 22px 0 12px; font-size: 16px; font-weight: 700; }
.cmd-log-title small { margin-left: 4px; font-size: 14px; font-weight: 600; }
.mt-2 { margin-top: 8px; }
.mt-4 { margin-top: 16px; }
.mb-2 { margin-bottom: 8px; }
.select-all-bar { margin-bottom: 12px; }
.label-edit-area { min-height: 120px; }
.label-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px; min-height: 36px; align-items: flex-start; }
.label-tag-item { margin: 0; }
.label-empty-hint { color: #c0c4cc; font-size: 14px; line-height: 32px; }
.label-input-row { display: flex; gap: 8px; }
.label-input-row .el-input { flex: 1; }
.label-inline-tag { margin: 0 2px 2px 0; }
.gva-search-box .el-form-item__label {
  width: 80px !important;
  text-align: left !important;    /* 左对齐 */
  padding-right: 12px;
  line-height: 32px !important;
  height: 32px !important;
}
.gva-search-box .el-form-item__content {
  line-height: 32px !important;
  height: 32px !important;
}
.gva-search-box .el-input,
.gva-search-box .el-select {
  width: 150px;
}
</style>
