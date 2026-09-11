<template>
  <div>
    <div class="gva-search-box">
      <el-form
        ref="elSearchFormRef"
        :inline="true"
        :model="searchInfo"
        class="demo-form-inline"
        @keyup.enter="onSubmit"
      >
        <el-form-item label="平台名称" prop="platformName">
          <el-input
            v-model="searchInfo.platformName"
            clearable
            placeholder="请输入平台名称"
          />
        </el-form-item>
        <el-form-item label="平台编码" prop="platformCode">
          <el-input
            v-model="searchInfo.platformCode"
            clearable
            placeholder="请输入平台编码"
          />
        </el-form-item>

        <template v-if="showAllQuery">
          <el-form-item label="状态" prop="status">
            <el-select v-model="searchInfo.status" clearable placeholder="请选择状态">
              <el-option label="启用" :value="1" />
              <el-option label="停用" :value="2" />
            </el-select>
          </el-form-item>
        </template>

        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
          <el-button
            v-if="!showAllQuery"
            link
            type="primary"
            icon="arrow-down"
            @click="showAllQuery = true"
          >
            展开
          </el-button>
          <el-button
            v-else
            link
            type="primary"
            icon="arrow-up"
            @click="showAllQuery = false"
          >
            收起
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog()">新增</el-button>
        <el-button
          icon="delete"
          style="margin-left: 10px"
          :disabled="!multipleSelection.length"
          @click="onDelete"
        >
          删除
        </el-button>
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
        <el-table-column align="left" label="序号" type="index" width="60" />
        <el-table-column
          align="left"
          label="平台名称"
          prop="platformName"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          align="left"
          label="平台编码"
          prop="platformCode"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column align="left" label="状态" prop="status" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="success">启用</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="danger">停用</el-tag>
            <el-tag v-else>{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="商户号"
          prop="merchantId"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column
          align="left"
          label="商户key"
          prop="merchantKey"
          min-width="180"
          show-overflow-tooltip
        />
        <el-table-column sortable align="left" label="创建时间" prop="CreatedAt" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column sortable align="left" label="更新时间" prop="UpdatedAt" width="180">
          <template #default="scope">{{ formatDate(scope.row.UpdatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="操作" fixed="right" :min-width="appStore.operateMinWith">
          <template #default="scope">
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)">
              <el-icon style="margin-right: 5px"><InfoFilled /></el-icon>
              查看
            </el-button>
            <el-button
              type="primary"
              link
              icon="edit"
              class="table-button"
              @click="updateLotPaymentPlatformFunc(scope.row)"
            >
              编辑
            </el-button>
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">
              删除
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

    <el-drawer
      v-model="dialogFormVisible"
      destroy-on-close
      :size="appStore.drawerSize"
      :show-close="false"
      :before-close="closeDialog"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ type === 'create' ? '新增' : '编辑' }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">确定</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </div>
        </div>
      </template>

      <el-form
        ref="elFormRef"
        :model="formData"
        label-position="top"
        :rules="rule"
        label-width="80px"
      >
        <el-form-item label="平台名称" prop="platformName">
          <el-input
            v-model="formData.platformName"
            clearable
            placeholder="请输入平台名称"
          />
        </el-form-item>
        <el-form-item label="平台编码" prop="platformCode">
          <el-input
            v-model="formData.platformCode"
            clearable
            placeholder="请输入平台编码"
          />
        </el-form-item>
        <el-form-item label="商户ID" prop="merchantId">
          <el-input
            v-model="formData.merchantId"
            clearable
            placeholder="请输入商户ID"
          />
        </el-form-item>
        <el-form-item label="商户密钥" prop="merchantKey">
          <el-input
            v-model="formData.merchantKey"
            clearable
            show-password
            placeholder="请输入商户密钥"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" clearable placeholder="请选择状态" style="width: 100%">
            <el-option label="启用" :value="1" />
            <el-option label="停用" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-drawer
      v-model="detailShow"
      destroy-on-close
      :size="appStore.drawerSize"
      :show-close="true"
      :before-close="closeDetailShow"
      title="查看"
    >
      <el-descriptions :column="1" border>
        <el-descriptions-item label="平台名称">{{ detailForm.platformName }}</el-descriptions-item>
        <el-descriptions-item label="平台编码">{{ detailForm.platformCode }}</el-descriptions-item>
        <el-descriptions-item label="商户ID">{{ detailForm.merchantId }}</el-descriptions-item>
        <el-descriptions-item label="商户密钥">
          {{ detailForm.merchantKey ? '******' : '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag v-if="detailForm.status === 1" type="success">启用</el-tag>
          <el-tag v-else-if="detailForm.status === 2" type="danger">停用</el-tag>
          <span v-else>{{ detailForm.status }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ formatDate(detailForm.CreatedAt) }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  createLotPaymentPlatform,
  deleteLotPaymentPlatform,
  deleteLotPaymentPlatformByIds,
  updateLotPaymentPlatform,
  findLotPaymentPlatform,
  getLotPaymentPlatformList
} from '@/api/lot/lotPaymentPlatform'

import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { useAppStore } from '@/pinia'

defineOptions({
  name: 'LotPaymentPlatform'
})

const defaultFormData = () => ({
  platformName: '',
  platformCode: '',
  merchantId: '',
  merchantKey: '',
  status: 1
})

const btnLoading = ref(false)
const appStore = useAppStore()
const showAllQuery = ref(false)
const formData = ref(defaultFormData())
const rule = reactive({
  platformName: [{ required: true, message: '请输入平台名称', trigger: 'blur' }],
  platformCode: [{ required: true, message: '请输入平台编码', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }]
})

const elFormRef = ref()
const elSearchFormRef = ref()
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})
const multipleSelection = ref([])
const type = ref('')
const dialogFormVisible = ref(false)
const detailForm = ref({})
const detailShow = ref(false)

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
  const table = await getLotPaymentPlatformList({
    page: page.value,
    pageSize: pageSize.value,
    ...searchInfo.value
  })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const deleteRow = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteLotPaymentPlatformFunc(row)
  })
}

const onDelete = async () => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    if (multipleSelection.value.length === 0) {
      ElMessage({
        type: 'warning',
        message: '请选择要删除的数据'
      })
      return
    }
    const IDs = multipleSelection.value.map(item => item.ID)
    const res = await deleteLotPaymentPlatformByIds({ IDs })
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

const updateLotPaymentPlatformFunc = async (row) => {
  const res = await findLotPaymentPlatform({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = { ...defaultFormData(), ...res.data }
    dialogFormVisible.value = true
  }
}

const deleteLotPaymentPlatformFunc = async (row) => {
  const res = await deleteLotPaymentPlatform({ ID: row.ID })
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

const openDialog = () => {
  type.value = 'create'
  formData.value = defaultFormData()
  dialogFormVisible.value = true
}

const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = defaultFormData()
}

const enterDialog = async () => {
  btnLoading.value = true
  elFormRef.value?.validate(async (valid) => {
    if (!valid) {
      btnLoading.value = false
      return
    }

    const res = type.value === 'update'
      ? await updateLotPaymentPlatform(formData.value)
      : await createLotPaymentPlatform(formData.value)

    btnLoading.value = false
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: type.value === 'update' ? '更新成功' : '创建成功'
      })
      closeDialog()
      getTableData()
    }
  })
}

const getDetails = async (row) => {
  const res = await findLotPaymentPlatform({ ID: row.ID })
  if (res.code === 0) {
    detailForm.value = res.data
    detailShow.value = true
  }
}

const closeDetailShow = () => {
  detailShow.value = false
  detailForm.value = {}
}

getTableData()
</script>

<style scoped lang="scss">
.gva-btn-list {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}
</style>
