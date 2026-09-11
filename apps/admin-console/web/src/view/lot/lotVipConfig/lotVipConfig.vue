<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="创建日期" prop="createdAtRange">
          <template #label>
            <span>创建日期 <el-tooltip content="开始日期（包含）至结束日期（不包含）"><el-icon><QuestionFilled /></el-icon></el-tooltip></span>
          </template>
          <el-date-picker v-model="searchInfo.createdAtRange" class="!w-380px" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>
        <el-form-item label="所属套系" prop="packageId">
          <el-select v-model="searchInfo.packageId" clearable placeholder="请选择套系">
            <el-option v-for="pkg in packageOptions" :key="pkg.ID" :label="pkg.name" :value="pkg.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型" prop="typeCode">
          <el-select v-model="searchInfo.typeCode" clearable placeholder="请选择类型">
            <el-option v-for="t in typeCodeOptions" :key="t.value" :label="t.label" :value="t.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="searchInfo.name" placeholder="搜索条件" />
        </el-form-item>
        <el-form-item label="上架状态" prop="isActive">
          <el-select v-model="searchInfo.isActive" clearable placeholder="请选择状态">
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
        <el-table-column align="left" label="所属套系" width="120">
          <template #default="scope">{{ getPackageName(scope.row.packageId) }}</template>
        </el-table-column>
        <el-table-column align="left" label="类型" prop="typeCode" width="120">
          <template #default="scope">{{ typeCodeLabel(scope.row.typeCode) }}</template>
        </el-table-column>
        <el-table-column align="left" label="显示名称" prop="name" width="180" show-overflow-tooltip />
        <el-table-column align="left" label="现价" prop="price" width="100" />
        <el-table-column align="left" label="原价" prop="originalPrice" width="100" />
        <el-table-column align="left" label="规格" width="120">
          <template #default="scope">
            <span v-if="scope.row.isPermanent === 1">永久</span>
            <span v-else>{{ scope.row.specText }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="上架" prop="isActive" width="80">
          <template #default="scope">
            <el-tag v-if="scope.row.isActive === 1" type="success">上架</el-tag>
            <el-tag v-else type="danger">下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label="推荐" prop="isRecommend" width="80">
          <template #default="scope">
            <el-tag v-if="scope.row.isRecommend === 1" type="warning">推荐</el-tag>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column align="left" label="排序" prop="sort" width="70" />
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
        <el-form-item label="所属套系:" prop="packageId" :rules="[{ required: true, message: '请选择套系', trigger: 'change' }]">
          <el-select v-model="formData.packageId" clearable placeholder="请选择套系" style="width:100%">
            <el-option v-for="pkg in packageOptions" :key="pkg.ID" :label="pkg.name" :value="pkg.ID" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型:" prop="typeCode" :rules="[{ required: true, message: '请选择类型', trigger: 'change' }]">
          <el-select v-model="formData.typeCode" clearable placeholder="请选择类型" style="width:100%" @change="onTypeCodeChange">
            <el-option v-for="t in typeCodeOptions" :key="t.value" :label="t.label" :value="t.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="显示名称:" prop="name" :rules="[{ required: true, message: '请输入显示名称', trigger: 'blur' }]">
          <el-input v-model="formData.name" :clearable="true" placeholder="请输入显示名称" />
        </el-form-item>
        <el-form-item label="现价:" prop="price" :rules="[{ required: true, message: '请输入现价', trigger: 'blur' }]">
          <el-input-number v-model="formData.price" style="width:100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="原价/划线价:" prop="originalPrice">
          <el-input-number v-model="formData.originalPrice" style="width:100%" :precision="2" :clearable="true" />
        </el-form-item>
        <el-form-item label="规格数值:" prop="specValue" v-if="showSpecFields">
          <el-input v-model.number="formData.specValue" :clearable="true" :placeholder="specPlaceholder" />
        </el-form-item>
        <el-form-item label="规格显示:" prop="specText" v-if="showSpecFields">
          <el-input v-model="formData.specText" :clearable="true" placeholder="如 365天 / 500分钟 / 1次" />
        </el-form-item>
        <el-form-item label="是否永久:" prop="isPermanent" v-if="showPermanentOption">
          <el-switch v-model="formData.isPermanent" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="套餐内容说明:" prop="content">
          <el-input v-model="formData.content" :clearable="true" type="textarea" placeholder="请输入套餐内容说明" />
        </el-form-item>
        <el-form-item label="上架状态:" prop="isActive">
          <el-select v-model="formData.isActive" clearable placeholder="请选择状态" style="width:100%">
            <el-option label="上架" :value="1" />
            <el-option label="下架" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="推荐/默认选中:" prop="isRecommend">
          <el-switch v-model="formData.isRecommend" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="排序:" prop="sort">
          <el-input v-model.number="formData.sort" :clearable="true" placeholder="请输入排序权重" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { createLotVipConfig, deleteLotVipConfig, deleteLotVipConfigByIds, updateLotVipConfig, findLotVipConfig, getLotVipConfigList } from '@/api/lot/lotVipConfig'
import { getLotVipPackageList } from '@/api/lot/lotVipPackage'
import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive, computed } from 'vue'
import { useAppStore } from "@/pinia"
import service from '@/utils/request'

defineOptions({ name: 'LotVipConfig' })

const btnLoading = ref(false)
const appStore = useAppStore()

// 类型数据——从后端API加载（单一源：Go model/lot/lot_vip_type.go）
const typeCodeOptions = ref([])
const durationTypes = ref([])
const countTypes = ref([])
const usageTypes = ref([])

const loadTypeCodes = async () => {
  const res = await service({ url: '/lotVipConfig/getVipTypeCodes', method: 'get' })
  if (res.code === 0 && res.data) {
    typeCodeOptions.value = (res.data || []).map(t => ({ value: t.code, label: `${t.code} ${t.name}`, attr: t.attr }))
    durationTypes.value = (res.data || []).filter(t => t.attr === "duration").map(t => t.code)
    countTypes.value = (res.data || []).filter(t => t.attr === "count").map(t => t.code)
    usageTypes.value = (res.data || []).filter(t => t.attr === "usage").map(t => t.code)
  }
}
loadTypeCodes()

const typeCodeLabel = (code) => { const t = typeCodeOptions.value.find(o => o.value === code); return t ? t.label : code }

const showSpecFields = computed(() => {
  const tc = formData.value.typeCode
  return tc && tc !== 'T09'
})
const showPermanentOption = computed(() => {
  const tc = formData.value.typeCode
  return tc && durationTypes.value.includes(tc)
})
const specPlaceholder = computed(() => {
  const tc = formData.value.typeCode
  if (!tc) return ''
  if (durationTypes.value.includes(tc)) return '输入天数'
  if (countTypes.value.includes(tc)) return '输入次数'
  if (usageTypes.value.includes(tc)) return '输入分钟数'
  return ''
})

const onTypeCodeChange = () => {
  formData.value.specValue = undefined; formData.value.specText = ''; formData.value.isPermanent = 0
}

// 套系下拉
const packageOptions = ref([])
const loadPackages = async () => {
  const res = await getLotVipPackageList({ page: 1, pageSize: 1000, status: 1 })
  if (res.code === 0) packageOptions.value = res.data.list
}
loadPackages()
const getPackageName = (id) => { const p = packageOptions.value.find(o => o.ID === id); return p ? p.name : '' }

const formData = ref({ packageId: undefined, typeCode: '', name: '', price: 0, originalPrice: 0, specValue: undefined, specText: '', isPermanent: 0, content: '', isActive: undefined, isRecommend: 0, sort: undefined })
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
  const table = await getLotVipConfigList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    const res = await deleteLotVipConfigByIds({ IDs })
    if (res.code === 0) { ElMessage({ type: 'success', message: '删除成功' }); if (tableData.value.length === IDs.length && page.value > 1) page.value--; getTableData() }
  })
}

const type = ref('')
const updateFunc = async(row) => {
  const res = await findLotVipConfig({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = { ...res.data }
    dialogFormVisible.value = true
  }
}
const deleteFunc = async (row) => {
  const res = await deleteLotVipConfig({ ID: row.ID })
  if (res.code === 0) { ElMessage({ type: 'success', message: '删除成功' }); if (tableData.value.length === 1 && page.value > 1) page.value--; getTableData() }
}

const dialogFormVisible = ref(false)
const openDialog = () => { type.value = 'create'; dialogFormVisible.value = true }
const closeDialog = () => { dialogFormVisible.value = false; formData.value = { packageId: undefined, typeCode: '', name: '', price: 0, originalPrice: 0, specValue: undefined, specText: '', isPermanent: 0, content: '', isActive: undefined, isRecommend: 0, sort: undefined } }
const enterDialog = async () => {
  btnLoading.value = true
  elFormRef.value?.validate(async (valid) => {
    if (!valid) return btnLoading.value = false
    let res
    switch (type.value) { case 'create': res = await createLotVipConfig(formData.value); break; case 'update': res = await updateLotVipConfig(formData.value); break; default: res = await createLotVipConfig(formData.value) }
    btnLoading.value = false
    if (res.code === 0) { ElMessage({ type: 'success', message: '创建/更改成功' }); closeDialog(); getTableData() }
  })
}
</script>
