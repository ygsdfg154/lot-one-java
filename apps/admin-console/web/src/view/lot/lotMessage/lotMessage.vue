
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

        <template v-if="showAllQuery">
          <el-form-item label="消息类型" prop="msgType">
            <el-select v-model="searchInfo.msgType" clearable placeholder="请选择消息类型">
              <el-option label="公告" :value="1" />
              <el-option label="反馈" :value="2" />
              <el-option label="通知" :value="3" />
              <el-option label="告警" :value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="searchInfo.status" clearable placeholder="请选择状态">
              <el-option label="草稿" :value="1" />
              <el-option label="已发布" :value="2" />
              <el-option label="已归档" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="关键字" prop="keyword">
            <el-input v-model="searchInfo.keyword" clearable placeholder="请输入标题/内容关键字" />
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
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog()">新增</el-button>
        <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete">删除</el-button>
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

        <el-table-column sortable align="left" label="日期" prop="CreatedAt" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>

        <el-table-column align="left" label="标题" prop="title" min-width="150" show-overflow-tooltip />

        <el-table-column align="left" label="类型" prop="msgType" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.msgType === 1" type="info">公告</el-tag>
            <el-tag v-else-if="scope.row.msgType === 2" type="success">反馈</el-tag>
            <el-tag v-else-if="scope.row.msgType === 3" type="primary">通知</el-tag>
            <el-tag v-else-if="scope.row.msgType === 4" type="danger">告警</el-tag>
            <el-tag v-else>{{ scope.row.msgType }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="left" label="发送人" prop="sender" width="120" />

        <el-table-column align="left" label="优先级" prop="priority" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.priority === 2" type="danger">紧急</el-tag>
            <el-tag v-else-if="scope.row.priority === 1" type="info">普通</el-tag>
            <el-tag v-else>{{ scope.row.priority }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="left" label="状态" prop="status" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="info">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">已发布</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="warning">已归档</el-tag>
            <el-tag v-else>{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="left" label="操作" fixed="right" :min-width="appStore.operateMinWith">
          <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)"><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>查看</el-button>
            <el-button type="primary" link icon="edit" class="table-button" @click="updateLotMessageFunc(scope.row)">编辑</el-button>
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button>
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
    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="dialogFormVisible" :show-close="false" :before-close="closeDialog">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ type === 'create' ? '新增' : '编辑' }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">确 定</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </div>
        </div>
      </template>

      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rule" label-width="80px">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="formData.title" :clearable="true" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="类型:" prop="msgType">
          <el-select v-model="formData.msgType" clearable placeholder="请选择消息类型" style="width:100%">
            <el-option label="公告" :value="1" />
            <el-option label="反馈" :value="2" />
            <el-option label="通知" :value="3" />
            <el-option label="告警" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容:" prop="content">
          <el-input v-model="formData.content" type="textarea" :rows="4" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="发送人:" prop="sender">
          <el-input v-model="formData.sender" :clearable="true" placeholder="请输入发送人" />
        </el-form-item>
        <el-form-item label="接收部门:" prop="receiverDept">
          <el-input v-model="formData.receiverDept" :clearable="true" placeholder="请输入接收部门" />
        </el-form-item>
        <el-form-item label="优先级:" prop="priority">
          <el-select v-model="formData.priority" clearable placeholder="请选择优先级" style="width:100%">
            <el-option label="普通" :value="1" />
            <el-option label="紧急" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="formData.status" clearable placeholder="请选择状态" style="width:100%">
            <el-option label="草稿" :value="1" />
            <el-option label="已发布" :value="2" />
            <el-option label="已归档" :value="3" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 查看详情弹窗 -->
    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="detailShow" :show-close="true" :before-close="closeDetailShow" title="查看">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="标题">{{ detailForm.title }}</el-descriptions-item>
        <el-descriptions-item label="类型">
          <el-tag v-if="detailForm.msgType === 1" type="info">公告</el-tag>
          <el-tag v-else-if="detailForm.msgType === 2" type="success">反馈</el-tag>
          <el-tag v-else-if="detailForm.msgType === 3" type="primary">通知</el-tag>
          <el-tag v-else-if="detailForm.msgType === 4" type="danger">告警</el-tag>
          <span v-else>{{ detailForm.msgType }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="内容">{{ detailForm.content }}</el-descriptions-item>
        <el-descriptions-item label="发送人">{{ detailForm.sender }}</el-descriptions-item>
        <el-descriptions-item label="接收部门">{{ detailForm.receiverDept }}</el-descriptions-item>
        <el-descriptions-item label="优先级">
          <el-tag v-if="detailForm.priority === 2" type="danger">紧急</el-tag>
          <el-tag v-else-if="detailForm.priority === 1" type="info">普通</el-tag>
          <span v-else>{{ detailForm.priority }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag v-if="detailForm.status === 1" type="info">草稿</el-tag>
          <el-tag v-else-if="detailForm.status === 2" type="success">已发布</el-tag>
          <el-tag v-else-if="detailForm.status === 3" type="warning">已归档</el-tag>
          <span v-else>{{ detailForm.status }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(detailForm.CreatedAt) }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  createLotMessage,
  deleteLotMessage,
  deleteLotMessageByIds,
  updateLotMessage,
  findLotMessage,
  getLotMessageList
} from '@/api/lot/lotMessage'

import { getDictFunc, formatDate, formatBoolean, filterDict, filterDataSource, returnArrImg, onDownloadFile } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { InfoFilled, QuestionFilled } from '@element-plus/icons-vue'
import { useAppStore } from "@/pinia"

defineOptions({
  name: 'LotMessage'
})

const btnLoading = ref(false)
const appStore = useAppStore()
const showAllQuery = ref(false)

const formData = ref({
  title: '',
  msgType: 1,
  content: '',
  sender: '',
  receiverDept: '',
  priority: 1,
  status: 1,
})

const rule = reactive({})

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
  elSearchFormRef.value?.validate(async (valid) => {
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

const getTableData = async () => {
  const table = await getLotMessageList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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

// 删除行
const deleteRow = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteLotMessageFunc(row)
  })
}

// 多选删除
const onDelete = async () => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const IDs = []
    if (multipleSelection.value.length === 0) {
      ElMessage({
        type: 'warning',
        message: '请选择要删除的数据'
      })
      return
    }
    multipleSelection.value &&
      multipleSelection.value.map(item => {
        IDs.push(item.ID)
      })
    const res = await deleteLotMessageByIds({ IDs })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      if (tableData.value.length === IDs.length && page.value > 1) {
        page.value--
      }
      getTableData()
    }
  })
}

const type = ref('')

// 更新行
const updateLotMessageFunc = async (row) => {
  const res = await findLotMessage({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteLotMessageFunc = async (row) => {
  const res = await deleteLotMessage({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--
    }
    getTableData()
  }
}

const dialogFormVisible = ref(false)

const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    title: '',
    msgType: 1,
    content: '',
    sender: '',
    receiverDept: '',
    priority: 1,
    status: 1,
  }
}

const enterDialog = async () => {
  btnLoading.value = true
  elFormRef.value?.validate(async (valid) => {
    if (!valid) return btnLoading.value = false
    let res
    switch (type.value) {
      case 'create':
        res = await createLotMessage(formData.value)
        break
      case 'update':
        res = await updateLotMessage(formData.value)
        break
      default:
        res = await createLotMessage(formData.value)
        break
    }
    btnLoading.value = false
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '创建/更改成功'
      })
      closeDialog()
      getTableData()
    }
  })
}

const detailForm = ref({})
const detailShow = ref(false)

const openDetailShow = () => {
  detailShow.value = true
}

const getDetails = async (row) => {
  const res = await findLotMessage({ ID: row.ID })
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

<style scoped lang="scss">
.gva-btn-list {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}
</style>
