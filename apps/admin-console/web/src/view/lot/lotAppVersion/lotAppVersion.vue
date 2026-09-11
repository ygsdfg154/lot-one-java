
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
          <el-form-item label="平台" prop="platform">
            <el-select v-model="searchInfo.platform" clearable placeholder="请选择平台">
              <el-option label="iOS" :value="1" />
              <el-option label="Android" :value="2" />
              <el-option label="小程序" :value="3" />
              <el-option label="鸿蒙" :value="4" />
            </el-select>
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

        <el-table-column align="left" label="平台" prop="platform" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.platform === 1" type="primary">iOS</el-tag>
            <el-tag v-else-if="scope.row.platform === 2" type="success">Android</el-tag>
            <el-tag v-else-if="scope.row.platform === 3" type="warning">小程序</el-tag>
            <el-tag v-else-if="scope.row.platform === 4" type="info">鸿蒙</el-tag>
            <el-tag v-else>{{ scope.row.platform }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="left" label="版本号" prop="versionCode" width="120" />

        <el-table-column align="left" label="版本名" prop="versionName" width="120" />

        <el-table-column align="left" label="强制更新" prop="forceUpdate" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.forceUpdate === 1" type="danger">是</el-tag>
            <el-tag v-else type="info">否</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="left" label="更新时间" prop="UpdatedAt" width="180">
          <template #default="scope">{{ formatDate(scope.row.UpdatedAt) }}</template>
        </el-table-column>

        <el-table-column align="left" label="操作" fixed="right" :min-width="appStore.operateMinWith">
          <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)"><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>查看</el-button>
            <el-button type="primary" link icon="edit" class="table-button" @click="updateLotAppVersionFunc(scope.row)">编辑</el-button>
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
        <el-form-item label="平台:" prop="platform">
          <el-select v-model="formData.platform" clearable placeholder="请选择平台" style="width:100%">
            <el-option label="iOS" :value="1" />
            <el-option label="Android" :value="2" />
            <el-option label="小程序" :value="3" />
            <el-option label="鸿蒙" :value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="版本号(versionCode):" prop="versionCode">
          <el-input v-model.number="formData.versionCode" :clearable="true" placeholder="请输入版本号" />
        </el-form-item>
        <el-form-item label="版本名(versionName):" prop="versionName">
          <el-input v-model="formData.versionName" :clearable="true" placeholder="请输入版本名，如 1.0.0" />
        </el-form-item>
        <el-form-item label="下载地址:" prop="downloadUrl">
          <el-input v-model="formData.downloadUrl" :clearable="true" placeholder="请输入下载地址" />
        </el-form-item>
        <el-form-item label="强制更新:" prop="forceUpdate">
          <el-switch v-model="formData.forceUpdate" :active-value="1" :inactive-value="0" active-text="是" inactive-text="否" />
        </el-form-item>
        <el-form-item label="更新说明:" prop="updateDesc">
          <el-input v-model="formData.updateDesc" type="textarea" :rows="4" placeholder="请输入更新说明" />
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 查看详情弹窗 -->
    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="detailShow" :show-close="true" :before-close="closeDetailShow" title="查看">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="平台">
          <el-tag v-if="detailForm.platform === 1" type="primary">iOS</el-tag>
          <el-tag v-else-if="detailForm.platform === 2" type="success">Android</el-tag>
          <el-tag v-else-if="detailForm.platform === 3" type="warning">小程序</el-tag>
          <el-tag v-else-if="detailForm.platform === 4" type="info">鸿蒙</el-tag>
          <span v-else>{{ detailForm.platform }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="版本号">{{ detailForm.versionCode }}</el-descriptions-item>
        <el-descriptions-item label="版本名">{{ detailForm.versionName }}</el-descriptions-item>
        <el-descriptions-item label="下载地址">{{ detailForm.downloadUrl }}</el-descriptions-item>
        <el-descriptions-item label="强制更新">
          <el-tag v-if="detailForm.forceUpdate === 1" type="danger">是</el-tag>
          <el-tag v-else type="info">否</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="更新说明">{{ detailForm.updateDesc }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(detailForm.CreatedAt) }}</el-descriptions-item>
        <el-descriptions-item label="更新时间">{{ formatDate(detailForm.UpdatedAt) }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  createLotAppVersion,
  deleteLotAppVersion,
  deleteLotAppVersionByIds,
  updateLotAppVersion,
  findLotAppVersion,
  getLotAppVersionList
} from '@/api/lot/lotAppVersion'

import { getDictFunc, formatDate, formatBoolean, filterDict, filterDataSource, returnArrImg, onDownloadFile } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { InfoFilled, QuestionFilled } from '@element-plus/icons-vue'
import { useAppStore } from "@/pinia"

defineOptions({
  name: 'LotAppVersion'
})

const btnLoading = ref(false)
const appStore = useAppStore()
const showAllQuery = ref(false)

const formData = ref({
  platform: 1,
  versionCode: null,
  versionName: '',
  downloadUrl: '',
  forceUpdate: 0,
  updateDesc: '',
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
  const table = await getLotAppVersionList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteLotAppVersionFunc(row)
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
    const res = await deleteLotAppVersionByIds({ IDs })
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
const updateLotAppVersionFunc = async (row) => {
  const res = await findLotAppVersion({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteLotAppVersionFunc = async (row) => {
  const res = await deleteLotAppVersion({ ID: row.ID })
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
    platform: 1,
    versionCode: null,
    versionName: '',
    downloadUrl: '',
    forceUpdate: 0,
    updateDesc: '',
  }
}

const enterDialog = async () => {
  btnLoading.value = true
  elFormRef.value?.validate(async (valid) => {
    if (!valid) return btnLoading.value = false
    let res
    switch (type.value) {
      case 'create':
        res = await createLotAppVersion(formData.value)
        break
      case 'update':
        res = await updateLotAppVersion(formData.value)
        break
      default:
        res = await createLotAppVersion(formData.value)
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
  const res = await findLotAppVersion({ ID: row.ID })
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
