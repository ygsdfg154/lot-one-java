<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="创建日期" prop="createdAtRange">
          <template #label>
            <span>
              创建日期
              <el-tooltip content="搜索范围是开始日期（包含）至结束日期（不包含）">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </span>
          </template>
          <el-date-picker
            v-model="searchInfo.createdAtRange"
            class="!w-380px"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>

        <el-form-item label="设备号" prop="deviceId">
          <el-input v-model="searchInfo.deviceId" placeholder="搜索设备号" />
        </el-form-item>

        <el-form-item label="ICCID" prop="iccid">
          <el-input v-model="searchInfo.iccid" placeholder="搜索ICCID" />
        </el-form-item>

        <el-form-item label="绑定来源" prop="bindSource">
          <el-select v-model="searchInfo.bindSource" clearable placeholder="请选择绑定来源">
            <el-option label="设备上报" value="device_report" />
            <el-option label="手动绑定" value="manual" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>

        <template v-if="showAllQuery">
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
      <div class="gva-btn-list">
        <el-button icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="onDelete">解绑</el-button>
        <span class="text-gray-400 text-sm ml-4">绑定记录由设备上报自动创建，此处仅支持查看与解绑</span>
      </div>
      <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column sortable align="left" label="ID" prop="ID" width="80" />

        <el-table-column  align="left" label="日期" prop="CreatedAt" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>

        <el-table-column align="left" label="设备号" prop="deviceId" width="150" show-overflow-tooltip />

        <el-table-column align="left" label="ICCID" prop="iccid" width="200" show-overflow-tooltip />

        <el-table-column align="left" label="卡号" prop="phoneNo" width="150" show-overflow-tooltip />

        <el-table-column align="left" label="绑定来源" prop="bindSource" width="120">
          <template #default="scope">
            <el-tag v-if="scope.row.bindSource === 'device_report'" type="success">设备上报</el-tag>
            <el-tag v-else-if="scope.row.bindSource === 'manual'" type="warning">手动绑定</el-tag>
            <el-tag v-else-if="scope.row.bindSource === 'admin'" type="info">管理员</el-tag>
            <span v-else>{{ scope.row.bindSource }}</span>
          </template>
        </el-table-column>

        <el-table-column align="left" label="绑定时间" prop="bindTime" width="180">
          <template #default="scope">{{ formatDate(scope.row.bindTime) }}</template>
        </el-table-column>

        <el-table-column align="left" label="操作" fixed="right" :min-width="appStore.operateMinWith">
          <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)"><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>查看</el-button>
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">解绑</el-button>
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

    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="detailShow" :show-close="true" :before-close="closeDetailShow" title="查看绑定详情">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="设备号">{{ detailForm.deviceId }}</el-descriptions-item>
        <el-descriptions-item label="ICCID">{{ detailForm.iccid }}</el-descriptions-item>
        <el-descriptions-item label="卡号">{{ detailForm.phoneNo || '-' }}</el-descriptions-item>
        <el-descriptions-item label="绑定来源">
          <el-tag v-if="detailForm.bindSource === 'device_report'" type="success">设备上报</el-tag>
          <el-tag v-else-if="detailForm.bindSource === 'manual'" type="warning">手动绑定</el-tag>
          <el-tag v-else-if="detailForm.bindSource === 'admin'" type="info">管理员</el-tag>
          <span v-else>{{ detailForm.bindSource }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="绑定时间">{{ formatDate(detailForm.bindTime) }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(detailForm.CreatedAt) }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>

  </div>
</template>

<script setup>
import {
  deleteLotDeviceIccidBinding,
  deleteLotDeviceIccidBindingByIds,
  findLotDeviceIccidBinding,
  getLotDeviceIccidBindingList
} from '@/api/lot/lotDeviceIccidBinding'

import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useAppStore } from '@/pinia'

defineOptions({
  name: 'LotDeviceIccidBinding'
})

const appStore = useAppStore()
const showAllQuery = ref(false)

const formData = ref({
  deviceId: '',
  iccid: '',
  phoneNo: '',
  bindSource: 'device_report',
  bindTime: undefined,
})

const elFormRef = ref()
const elSearchFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

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

const getTableData = async() => {
  const table = await getLotDeviceIccidBindingList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// 多选数据
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const deleteRow = (row) => {
  ElMessageBox.confirm('确定要解绑该设备吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteFunc(row)
  })
}

const onDelete = async() => {
  ElMessageBox.confirm('确定要批量解绑吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async() => {
    const IDs = []
    if (multipleSelection.value.length === 0) {
      ElMessage({ type: 'warning', message: '请选择要解绑的数据' })
      return
    }
    multipleSelection.value.forEach(item => IDs.push(item.ID))
    const res = await deleteLotDeviceIccidBindingByIds({ IDs })
    if (res.code === 0) {
      ElMessage({ type: 'success', message: '解绑成功' })
      if (tableData.value.length === IDs.length && page.value > 1) {
        page.value--
      }
      getTableData()
    }
  })
}

const deleteFunc = async (row) => {
  const res = await deleteLotDeviceIccidBinding({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({ type: 'success', message: '解绑成功' })
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--
    }
    getTableData()
  }
}

const detailForm = ref({})
const detailShow = ref(false)

const openDetailShow = () => {
  detailShow.value = true
}

const getDetails = async (row) => {
  const res = await findLotDeviceIccidBinding({ ID: row.ID })
  if (res.code === 0) {
    detailForm.value = res.data
    openDetailShow()
  }
}

const closeDetailShow = () => {
  detailShow.value = false
  detailForm.value = {}
}
</script>

<style>
</style>
