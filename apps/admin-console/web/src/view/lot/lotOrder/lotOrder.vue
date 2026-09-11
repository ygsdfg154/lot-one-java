<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" @keyup.enter="onSubmit">
        <el-form-item label="设备IMEI" prop="deviceId">
          <el-input v-model="searchInfo.deviceId" clearable placeholder="请输入设备IMEI" />
        </el-form-item>
        <el-form-item label="状态" prop="orderStatus">
          <el-select v-model="searchInfo.orderStatus" clearable placeholder="请选择状态" class="!w-140px">
            <el-option label="待支付" :value="0" />
            <el-option label="已支付" :value="1" />
            <el-option label="已取消" :value="2" />
            <el-option label="已过期" :value="3" />
            <el-option label="退款中" :value="4" />
            <el-option label="已退款" :value="5" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="createdAtRange">
          <el-date-picker
            v-model="searchInfo.createdAtRange"
            class="!w-380px"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="gva-table-box">
      <el-table style="width: 100%" tooltip-effect="dark" :data="tableData" row-key="ID">
        <el-table-column align="left" label="序号" type="index" width="80" />
        <el-table-column align="left" label="设备IMEI" prop="deviceId" min-width="160" show-overflow-tooltip />
        <el-table-column align="left" label="金额" prop="payAmount" width="120">
          <template #default="scope">{{ formatMoney(scope.row.payAmount) }}</template>
        </el-table-column>
        <el-table-column align="left" label="状态" prop="orderStatus" width="120">
          <template #default="scope">
            <el-tag :type="orderStatusType(scope.row.orderStatus)">
              {{ orderStatusText(scope.row.orderStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="套餐编码" prop="packageCode" width="140" />
        <el-table-column align="left" label="创建时间" prop="CreatedAt" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="支付时间" prop="paidAt" width="180">
          <template #default="scope">{{ formatDate(scope.row.paidAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="操作" fixed="right" width="100">
          <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)">
              <el-icon style="margin-right: 5px"><InfoFilled /></el-icon>查看
            </el-button>
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

    <el-drawer v-model="detailShow" destroy-on-close :size="appStore.drawerSize" title="查看">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="订单号">{{ detailForm.orderNo }}</el-descriptions-item>
        <el-descriptions-item label="设备IMEI">{{ detailForm.deviceId }}</el-descriptions-item>
        <el-descriptions-item label="金额">{{ formatMoney(detailForm.payAmount) }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ orderStatusText(detailForm.orderStatus) }}</el-descriptions-item>
        <el-descriptions-item label="套餐编码">{{ detailForm.packageCode }}</el-descriptions-item>
        <el-descriptions-item label="套餐名称">{{ detailForm.productName }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(detailForm.CreatedAt) }}</el-descriptions-item>
        <el-descriptions-item label="支付时间">{{ formatDate(detailForm.paidAt) }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/pinia'
import { formatDate } from '@/utils/format'
import { findLotOrder, getLotOrderList } from '@/api/lot/lotOrder'

defineOptions({
  name: 'LotOrder'
})

const appStore = useAppStore()
const elSearchFormRef = ref()
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})
const detailShow = ref(false)
const detailForm = ref({})

const statusMap = {
  0: { text: '待支付', type: 'warning' },
  1: { text: '已支付', type: 'success' },
  2: { text: '已取消', type: 'info' },
  3: { text: '已过期', type: 'info' },
  4: { text: '退款中', type: 'warning' },
  5: { text: '已退款', type: 'success' }
}

const formatMoney = (value) => {
  if (value === null || value === undefined || value === '') return '-'
  return `￥${Number(value).toFixed(2)}`
}

const orderStatusText = (value) => statusMap[value]?.text || '-'
const orderStatusType = (value) => statusMap[value]?.type || 'info'

const getTableData = async() => {
  const table = await getLotOrderList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

const onReset = () => {
  searchInfo.value = {}
  getTableData()
}

const onSubmit = () => {
  elSearchFormRef.value?.validate(async(valid) => {
    if (!valid) return
    page.value = 1
    getTableData()
  })
}

const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

const getDetails = async(row) => {
  const res = await findLotOrder({ ID: row.ID })
  if (res.code === 0) {
    detailForm.value = res.data
    detailShow.value = true
  }
}

getTableData()
</script>
