<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" @keyup.enter="onSubmit">
        <el-form-item label="订单号" prop="orderNo">
          <el-input v-model="searchInfo.orderNo" clearable placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="设备IMEI" prop="deviceId">
          <el-input v-model="searchInfo.deviceId" clearable placeholder="请输入设备IMEI" />
        </el-form-item>
        <el-form-item label="快递单号" prop="trackingNo">
          <el-input v-model="searchInfo.trackingNo" clearable placeholder="请输入快递单号" />
        </el-form-item>
        <el-form-item label="购买人" prop="buyerName">
          <el-input v-model="searchInfo.buyerName" clearable placeholder="请输入购买人姓名" />
        </el-form-item>
        <el-form-item label="订单状态" prop="orderStatus">
          <el-select v-model="searchInfo.orderStatus" clearable placeholder="请选择" class="!w-130px">
            <el-option label="全部" :value="-1" />
            <el-option label="待发货" :value="1" />
            <el-option label="已发货" :value="5" />
            <el-option label="已完成" :value="6" />
            <el-option label="已取消" :value="7" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="timeRange">
          <el-date-picker
            v-model="searchInfo.timeRange"
            class="!w-280px"
            type="daterange"
            range-separator="至"
            start-placeholder="开始"
            end-placeholder="结束"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog()">新增订单</el-button>
        <el-button type="danger" icon="delete" :disabled="!selectedIds.length" @click="batchDelete">批量删除</el-button>
      </div>

      <el-table
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="id"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" />
        <el-table-column align="left" label="序号" type="index" width="60" />
        <el-table-column align="left" label="订单号" prop="orderNo" min-width="180" show-overflow-tooltip />
        <el-table-column align="left" label="设备IMEI" prop="deviceId" width="160" show-overflow-tooltip />
        <el-table-column align="left" label="设备名称" prop="deviceName" width="140" show-overflow-tooltip />
        <el-table-column align="left" label="快递单号" prop="trackingNo" width="160" show-overflow-tooltip />
        <el-table-column align="left" label="所属店铺" prop="shopName" width="140" show-overflow-tooltip />
        <el-table-column align="left" label="购买人" prop="buyerName" width="100" show-overflow-tooltip />
        <el-table-column align="left" label="订单状态" prop="orderStatus" width="100">
          <template #default="scope">
            <el-tag :type="statusType(scope.row.orderStatus)">{{ scope.row.orderStatusText }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="金额" prop="payAmount" width="100">
          <template #default="scope">{{ formatMoney(scope.row.payAmount) }}</template>
        </el-table-column>
        <el-table-column align="left" label="发货时间" prop="deliveryTime" width="180" show-overflow-tooltip />
        <el-table-column align="left" label="创建时间" prop="createdAt" width="180" show-overflow-tooltip />
        <el-table-column align="left" label="操作" fixed="right" width="160">
          <template #default="scope">
            <el-button type="primary" link class="table-button" @click="openDialog(scope.row)">编辑</el-button>
            <el-button type="primary" link class="table-button" @click="viewDetail(scope.row)">详情</el-button>
            <el-button type="danger" link class="table-button" @click="deleteRow(scope.row)">删除</el-button>
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

    <!-- 新增/编辑弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑销售订单' : '新增销售订单'"
      width="600px"
      destroy-on-close
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px">
        <el-form-item label="设备IMEI" prop="deviceId">
          <el-input v-model="formData.deviceId" :disabled="isEdit" placeholder="请输入设备IMEI" />
        </el-form-item>
        <el-form-item label="快递单号" prop="trackingNo">
          <el-input v-model="formData.trackingNo" placeholder="请输入快递单号" />
        </el-form-item>
        <el-form-item label="购买人" prop="buyerName">
          <el-input v-model="formData.buyerName" placeholder="请输入购买人姓名" />
        </el-form-item>
        <el-form-item label="联系电话" prop="buyerPhone">
          <el-input v-model="formData.buyerPhone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="收货地址" prop="shippingAddress">
          <el-input v-model="formData.shippingAddress" placeholder="请输入收货地址" />
        </el-form-item>
        <el-form-item label="金额" prop="payAmount">
          <el-input-number v-model="formData.payAmount" :precision="2" :min="0" class="!w-full" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item v-if="isEdit" label="订单状态" prop="orderStatus">
          <el-select v-model="formData.orderStatus" class="!w-full">
            <el-option label="待发货" :value="1" />
            <el-option label="已发货" :value="5" />
            <el-option label="已完成" :value="6" />
            <el-option label="已取消" :value="7" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" :rows="2" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>

    <!-- 详情弹窗 -->
    <el-dialog v-model="detailVisible" title="订单详情" width="600px" destroy-on-close>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="订单号" :span="2">{{ detailForm.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="设备IMEI">{{ detailForm.deviceId }}</el-descriptions-item>
        <el-descriptions-item label="设备名称">{{ detailForm.deviceName }}</el-descriptions-item>
        <el-descriptions-item label="快递单号">{{ detailForm.trackingNo }}</el-descriptions-item>
        <el-descriptions-item label="所属店铺">{{ detailForm.shopName }}</el-descriptions-item>
        <el-descriptions-item label="购买人">{{ detailForm.buyerName }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ detailForm.buyerPhone }}</el-descriptions-item>
        <el-descriptions-item label="收货地址" :span="2">{{ detailForm.shippingAddress }}</el-descriptions-item>
        <el-descriptions-item label="金额">{{ formatMoney(detailForm.payAmount) }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="statusType(detailForm.orderStatus)">{{ detailForm.orderStatusText }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="发货时间">{{ detailForm.deliveryTime || '-' }}</el-descriptions-item>
        <el-descriptions-item label="完成时间">{{ detailForm.completeTime || '-' }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ detailForm.remark || '-' }}</el-descriptions-item>
        <el-descriptions-item label="创建时间" :span="2">{{ detailForm.createdAt }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getSalesList, createSales, updateSales, deleteSales, getSalesDetail, getNextOrderNo } from '@/api/lot/lotOrder'

defineOptions({ name: 'SalesOrder' })

const elSearchFormRef = ref()
const formRef = ref()
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const selectedIds = ref([])
const searchInfo = ref({ orderStatus: -1 })

const dialogVisible = ref(false)
const isEdit = ref(false)
const formData = ref({})
const detailVisible = ref(false)
const detailForm = ref({})

const formRules = {
  deviceId: [{ required: true, message: '请输入设备IMEI', trigger: 'blur' }]
}

const statusMap = {
  1: { text: '待发货', type: 'warning' },
  5: { text: '已发货', type: 'success' },
  6: { text: '已完成', type: 'info' },
  7: { text: '已取消', type: 'danger' }
}
const statusType = (v) => statusMap[v]?.type || 'info'
const formatMoney = (v) => (v || v === 0) ? `￥${Number(v).toFixed(2)}` : '-'

const buildParams = () => {
  const p = { page: page.value, pageSize: pageSize.value, ...searchInfo.value }
  if (p.timeRange?.length === 2) {
    p.startTime = p.timeRange[0]
    p.endTime = p.timeRange[1]
  }
  delete p.timeRange
  return p
}

const getTableData = async () => {
  const table = await getSalesList(buildParams())
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

const onReset = () => { searchInfo.value = { orderStatus: -1 }; getTableData() }

const onSubmit = () => {
  elSearchFormRef.value?.validate(async (valid) => {
    if (!valid) return
    page.value = 1
    getTableData()
  })
}

const handleSizeChange = (val) => { pageSize.value = val; getTableData() }
const handleCurrentChange = (val) => { page.value = val; getTableData() }
const handleSelectionChange = (rows) => { selectedIds.value = rows.map(r => r.id) }

const openDialog = async (row) => {
  if (row) {
    isEdit.value = true
    formData.value = { ...row }
  } else {
    isEdit.value = false
    formData.value = {}
    const res = await getNextOrderNo()
    if (res.code === 0) formData.value.orderNo = res.data.orderNo
  }
  dialogVisible.value = true
}

const submitForm = async () => {
  const valid = await formRef.value?.validate().catch(() => false)
  if (!valid) return
  const data = { ...formData.value }
  delete data.orderNo; delete data.id; delete data.createdAt
  let res
  if (isEdit.value) {
    res = await updateSales(formData.value.id, data)
  } else {
    res = await createSales(data)
  }
  if (res.code === 0) {
    ElMessage.success(isEdit.value ? '编辑成功' : '创建成功')
    dialogVisible.value = false
    getTableData()
  }
}

const viewDetail = async (row) => {
  const res = await getSalesDetail(row.id)
  if (res.code === 0) {
    detailForm.value = res.data
    detailVisible.value = true
  }
}

const deleteRow = async (row) => {
  try {
    await ElMessageBox.confirm('确认删除该订单？', '提示', { type: 'warning' })
    const res = await deleteSales([row.id])
    if (res.code === 0) { ElMessage.success('删除成功'); getTableData() }
  } catch { /* 取消 */ }
}

const batchDelete = async () => {
  try {
    await ElMessageBox.confirm(`确认删除选中的 ${selectedIds.value.length} 条订单？`, '提示', { type: 'warning' })
    const res = await deleteSales(selectedIds.value)
    if (res.code === 0) { ElMessage.success('删除成功'); selectedIds.value = []; getTableData() }
  } catch { /* 取消 */ }
}

getTableData()
</script>
