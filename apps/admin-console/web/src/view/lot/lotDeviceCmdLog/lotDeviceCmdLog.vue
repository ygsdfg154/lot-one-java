<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" @keyup.enter="onSubmit">
        <el-form-item label="设备编号" prop="deviceId">
          <el-input v-model="searchInfo.deviceId" clearable placeholder="请输入设备编号" />
        </el-form-item>
        <el-form-item label="指令名称" prop="cmdName">
          <el-input v-model="searchInfo.cmdName" clearable placeholder="请输入指令名称" />
        </el-form-item>

        <template v-if="showAllQuery">
          <el-form-item label="下发结果" prop="result">
            <el-select v-model="searchInfo.result" clearable placeholder="请选择结果">
              <el-option label="成功" value="success" />
              <el-option label="失败" value="fail" />
              <el-option label="待处理" value="pending" />
            </el-select>
          </el-form-item>
          <el-form-item label="下发渠道" prop="channel">
            <el-input v-model="searchInfo.channel" clearable placeholder="请输入下发渠道" />
          </el-form-item>
          <el-form-item label="操作人" prop="operator">
            <el-input v-model="searchInfo.operator" clearable placeholder="请输入操作人" />
          </el-form-item>
        </template>

        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
          <el-button link type="primary" icon="arrow-down" @click="showAllQuery = true" v-if="!showAllQuery">展开</el-button>
          <el-button link type="primary" icon="arrow-up" @click="showAllQuery = false" v-else>收起</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="gva-table-box">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        :default-sort="{ prop: 'sendTime', order: 'descending' }"
      >
        <el-table-column label="ID" prop="ID" width="80" />
        <el-table-column label="设备编号" prop="deviceId" width="160" show-overflow-tooltip />
        <el-table-column label="指令名称" prop="cmdName" width="140" show-overflow-tooltip />
        <el-table-column label="指令类型" prop="cmdType" width="100" show-overflow-tooltip/>
        <el-table-column label="指令内容" prop="cmdContent" min-width="180" show-overflow-tooltip />
        <el-table-column label="操作人" prop="operator" width="120" />
        <el-table-column label="下发渠道" prop="channel" width="100" />
        <el-table-column label="下发时间" width="170" sortable>
          <template #default="{ row }">{{ formatTime(row.sendTime || row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column label="下发结果" prop="result" width="100">
          <template #default="{ row }">
            <el-tag :type="getCmdResultType(row)" size="small" effect="plain">
              {{ getCmdResultText(row) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="回复" prop="reply" min-width="160" show-overflow-tooltip />
      </el-table>
      <gva-pagination
        :total="total"
        :page="page"
        :page-size="pageSize"
        :page-sizes="[10, 30, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getLotDeviceCmdLogList } from '@/api/lot/lotDeviceCmdLog'
import { toSQLLine } from '@/utils/stringFun'
import { useRouteQueryValue } from '@/hooks/useRouteQuery'

defineOptions({ name: 'LotDeviceCmdLog' })

const loading = ref(false)
const showAllQuery = ref(false)
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const tableData = ref([])

const searchInfo = reactive({
  deviceId: '',
  cmdName: '',
  result: '',
  channel: '',
  operator: '',
})

const onSubmit = () => {
  page.value = 1
  getTableData()
}

const onReset = () => {
  searchInfo.deviceId = ''
  searchInfo.cmdName = ''
  searchInfo.result = ''
  searchInfo.channel = ''
  searchInfo.operator = ''
  page.value = 1
  getTableData()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

const formatTime = (value) => {
  if (!value) return '-'
  return String(value)
    .replace('T', ' ')
    .replace(/\.\d+.*$/, '')
    .replace(/\+.*$/, '')
}

const getCmdResultType = (row) => {
  if (row.offlineEffect) return 'success'
  if (row.result === 'success') return 'success'
  if (row.result === 'fail') return 'danger'
  return 'warning'
}

const getCmdResultText = (row) => {
  if (row.reply) return '终端回复成功'
  if (row.result === 'success') return '下发成功'
  if (row.result === 'fail') return '下发失败'
  if (row.offlineEffect) return '离线待执行'
  return '待处理'
}

const getTableData = async () => {
  loading.value = true
  try {
    const params = {
      page: page.value,
      pageSize: pageSize.value,
    }
    if (searchInfo.deviceId) params.deviceId = toSQLLine(searchInfo.deviceId)
    if (searchInfo.cmdName) params.cmdName = searchInfo.cmdName
    if (searchInfo.result) params.result = searchInfo.result
    if (searchInfo.channel) params.channel = searchInfo.channel
    if (searchInfo.operator) params.operator = searchInfo.operator

    const res = await getLotDeviceCmdLogList(params)
    if (res.code === 0) {
      tableData.value = res.data.list
      total.value = res.data.total
      page.value = res.data.page
      pageSize.value = res.data.pageSize
    }
  } finally {
    loading.value = false
  }
}

const qDeviceId = useRouteQueryValue('deviceId')
if (qDeviceId) {
  searchInfo.deviceId = qDeviceId
}
getTableData()
</script>

<style scoped>
.gva-btn-list {
  margin-bottom: 8px;
}
</style>
