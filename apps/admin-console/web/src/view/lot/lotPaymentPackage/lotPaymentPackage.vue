<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" @keyup.enter="onSubmit">
        <el-form-item label="套餐名称" prop="packageName">
          <el-input v-model="searchInfo.packageName" clearable placeholder="请输入套餐名称" />
        </el-form-item>
        <el-form-item label="套餐编码" prop="packageCode">
          <el-input v-model="searchInfo.packageCode" clearable placeholder="请输入套餐编码" />
        </el-form-item>
        <el-form-item label="产品类型" prop="productType">
          <el-select v-model="searchInfo.productType" clearable placeholder="请选择产品类型" class="!w-160px">
            <el-option label="VIP套餐" :value="1" />
            <el-option label="流量套餐" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchInfo.status" clearable placeholder="请选择状态" class="!w-140px">
            <el-option label="上架" :value="1" />
            <el-option label="下架" :value="0" />
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
      <el-table
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
      >
        <el-table-column align="left" label="序号" type="index" width="80" />
        <el-table-column align="left" label="套餐名称" prop="packageName" min-width="160" show-overflow-tooltip />
        <el-table-column align="left" label="套餐编码" prop="packageCode" width="140" />
        <el-table-column align="left" label="套餐列表" prop="packageList" min-width="220" show-overflow-tooltip />
        <el-table-column align="left" label="套餐容量" prop="packageCapacity" width="140" show-overflow-tooltip />
        <el-table-column align="left" label="价格" prop="price" width="120">
          <template #default="scope">{{ formatPrice(scope.row.price) }}</template>
        </el-table-column>
        <el-table-column align="left" label="状态" prop="status" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
              {{ scope.row.status === 1 ? '上架' : '下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="创建时间" prop="CreatedAt" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="更新时间" prop="UpdatedAt" width="180">
          <template #default="scope">{{ formatDate(scope.row.UpdatedAt) }}</template>
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
        <el-descriptions-item label="套餐名称">{{ detailForm.packageName }}</el-descriptions-item>
        <el-descriptions-item label="套餐编码">{{ detailForm.packageCode }}</el-descriptions-item>
        <el-descriptions-item label="套餐列表">{{ detailForm.packageList }}</el-descriptions-item>
        <el-descriptions-item label="套餐容量">{{ detailForm.packageCapacity }}</el-descriptions-item>
        <el-descriptions-item label="价格">{{ formatPrice(detailForm.price) }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ detailForm.status === 1 ? '上架' : '下架' }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(detailForm.CreatedAt) }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ formatDate(detailForm.UpdatedAt) }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/pinia'
import { formatDate } from '@/utils/format'
import { getLotPaymentPackageList } from '@/api/lot/lotPaymentPackage'

defineOptions({
  name: 'LotPaymentPackage'
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

const formatPrice = (value) => {
  if (value === null || value === undefined || value === '') return '-'
  return `￥${Number(value).toFixed(2)}`
}

const getTableData = async() => {
  const table = await getLotPaymentPackageList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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

const getDetails = (row) => {
  detailForm.value = row
  detailShow.value = true
}

getTableData()
</script>
