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
          <el-date-picker v-model="searchInfo.createdAtRange" class="!w-380px" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>
        <el-form-item label="套系名称" prop="name">
          <el-input v-model="searchInfo.name" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="searchInfo.status" clearable placeholder="请选择状态">
            <el-option label="上架" :value="1" />
            <el-option label="下架" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog()">新增</el-button>
        <el-button icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="onDelete">删除</el-button>
      </div>
      <el-table ref="multipleTable" style="width: 100%" tooltip-effect="dark" :data="tableData" row-key="ID" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column sortable align="left" label="ID" prop="ID" width="80" />
        <el-table-column align="left" label="套系名称" prop="name" width="150" />
        <el-table-column align="left" label="描述" prop="desc" width="200" show-overflow-tooltip />
        <el-table-column align="left" label="状态" prop="status" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" type="success">上架</el-tag>
            <el-tag v-else type="danger">下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="排序" prop="sort" width="80" />
        <el-table-column sortable align="left" label="创建时间" prop="CreatedAt" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label="操作" fixed="right" :min-width="appStore.operateMinWith">
          <template #default="scope">
            <el-button type="primary" link icon="edit" class="table-button" @click="updateFunc(scope.row)">编辑</el-button>
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
      </div>
    </div>
    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="dialogFormVisible" :show-close="false" :before-close="closeDialog">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{type==='create'?'新增':'编辑'}}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">确 定</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </div>
        </div>
      </template>
      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rule" label-width="80px">
        <el-form-item label="套系名称:" prop="name" :rules="[{ required: true, message: '请输入套系名称', trigger: 'blur' }]">
          <el-input v-model="formData.name" :clearable="true" placeholder="请输入套系名称" />
        </el-form-item>
        <el-form-item label="描述:" prop="desc">
          <el-input v-model="formData.desc" :clearable="true" type="textarea" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-select v-model="formData.status" clearable placeholder="请选择状态" style="width:100%">
            <el-option label="上架" :value="1" />
            <el-option label="下架" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model.number="formData.sort" :clearable="true" placeholder="请输入排序权重" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { createLotVipPackage, deleteLotVipPackage, deleteLotVipPackageByIds, updateLotVipPackage, findLotVipPackage, getLotVipPackageList } from '@/api/lot/lotVipPackage'
import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { useAppStore } from "@/pinia"

defineOptions({ name: 'LotVipPackage' })

const btnLoading = ref(false)
const appStore = useAppStore()

const formData = ref({ name: '', desc: '', status: undefined, sort: undefined })
const rule = reactive({})

const elFormRef = ref()
const elSearchFormRef = ref()
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

const onReset = () => { searchInfo.value = {}; getTableData() }
const onSubmit = () => { elSearchFormRef.value?.validate(async(valid) => { if (!valid) return; page.value = 1; getTableData() }) }
const handleSizeChange = (val) => { pageSize.value = val; getTableData() }
const handleCurrentChange = (val) => { page.value = val; getTableData() }

const getTableData = async() => {
  const table = await getLotVipPackageList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) { tableData.value = table.data.list; total.value = table.data.total; page.value = table.data.page; pageSize.value = table.data.pageSize }
}
getTableData()

const multipleSelection = ref([])
const handleSelectionChange = (val) => { multipleSelection.value = val }

const deleteRow = (row) => { ElMessageBox.confirm('确定要删除吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => { deleteFunc(row) }) }
const onDelete = async() => {
  ElMessageBox.confirm('确定要删除吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(async() => {
    const IDs = multipleSelection.value.map(item => item.ID)
    if (IDs.length === 0) { ElMessage({ type: 'warning', message: '请选择要删除的数据' }); return }
    const res = await deleteLotVipPackageByIds({ IDs })
    if (res.code === 0) { ElMessage({ type: 'success', message: '删除成功' }); if (tableData.value.length === IDs.length && page.value > 1) page.value--; getTableData() }
  })
}

const type = ref('')
const updateFunc = async(row) => {
  const res = await findLotVipPackage({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) { formData.value = res.data; dialogFormVisible.value = true }
}
const deleteFunc = async (row) => {
  const res = await deleteLotVipPackage({ ID: row.ID })
  if (res.code === 0) { ElMessage({ type: 'success', message: '删除成功' }); if (tableData.value.length === 1 && page.value > 1) page.value--; getTableData() }
}

const dialogFormVisible = ref(false)
const openDialog = () => { type.value = 'create'; dialogFormVisible.value = true }
const closeDialog = () => { dialogFormVisible.value = false; formData.value = { name: '', desc: '', status: undefined, sort: undefined } }
const enterDialog = async () => {
  btnLoading.value = true
  elFormRef.value?.validate(async (valid) => {
    if (!valid) return btnLoading.value = false
    let res
    switch (type.value) { case 'create': res = await createLotVipPackage(formData.value); break; case 'update': res = await updateLotVipPackage(formData.value); break; default: res = await createLotVipPackage(formData.value) }
    btnLoading.value = false
    if (res.code === 0) { ElMessage({ type: 'success', message: '创建/更改成功' }); closeDialog(); getTableData() }
  })
}
</script>
