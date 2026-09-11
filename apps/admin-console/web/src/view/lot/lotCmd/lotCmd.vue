
<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="指令标题" prop="cmdTitle">
          <el-input v-model="searchInfo.cmdTitle" clearable placeholder="请输入指令标题" />
        </el-form-item>
        <el-form-item label="指令状态" prop="cmdStatus">
          <el-select v-model="searchInfo.cmdStatus" clearable placeholder="请选择指令状态">
            <el-option label="生效" :value="1" />
            <el-option label="失效" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">搜索</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openAddRootDialog">新增根指令</el-button>
        <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete">删除</el-button>
        <el-button icon="expand" style="margin-left: 10px" @click="expandAll">展开全部</el-button>
        <el-button icon="fold" @click="collapseAll">收起全部</el-button>
      </div>

      <el-table
        ref="cmdTableRef"
        style="width: 100%"
        tooltip-effect="dark"
        :data="filteredTableData"
        row-key="ID"
        :default-expand-all="isExpandAll"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column align="left" label="指令标题" prop="cmdTitle" min-width="180" show-overflow-tooltip/>

        <el-table-column align="left" label="指令编码" prop="cmdCode" width="140" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.cmdCode || '-' }}</template>
        </el-table-column>

        <el-table-column align="left" label="所属协议" prop="protocol" width="90">
          <template #default="scope">{{ scope.row.protocol || '-' }}</template>
        </el-table-column>

        <el-table-column align="left" label="指令状态" width="100">
          <template #default="scope">
            <el-tag :type="getCmdStatusType(scope.row.cmdStatus)">{{ getCmdStatusText(scope.row.cmdStatus) }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="left" label="指令内容" prop="cmdContent" min-width="160" show-overflow-tooltip />

        <el-table-column align="left" label="指令标识" width="100">
          <template #default="scope">{{ getCmdModeText(scope.row.canOffline) }}</template>
        </el-table-column>

        <el-table-column align="left" label="创建时间" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>

        <el-table-column align="left" label="更新时间" width="180">
          <template #default="scope">{{ formatDate(scope.row.UpdatedAt) }}</template>
        </el-table-column>

        <el-table-column align="left" label="操作" fixed="right" :min-width="appStore.operateMinWith">
          <template #default="scope">
            <el-button type="primary" link icon="edit" class="table-button" @click="updateLotCmdFunc(scope.row)">编辑</el-button>
            <el-button type="primary" link icon="plus" class="table-button" @click="openChildDialog(scope.row)">添加子指令</el-button>
            <el-button type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="dialogFormVisible" :show-close="false" :before-close="closeDialog">
      <template #header>
        <div class="flex justify-between items-center">
          <span class="text-lg">{{ dialogTitle }}</span>
          <div>
            <el-button :loading="btnLoading" type="primary" @click="enterDialog">确 定</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </div>
        </div>
      </template>

      <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rule" label-width="80px">
        <el-form-item label="上级指令:" prop="parentId">
          <el-cascader
            v-model="formData.parentId"
            style="width: 100%"
            :disabled="type === 'update'"
            :options="cmdCascaderOptions"
            :props="{ checkStrictly: true, label: 'cmdTitle', value: 'ID', emitPath: false }"
            :show-all-levels="false"
            filterable
            clearable
            placeholder="请选择上级指令（空为根指令）"
          />
        </el-form-item>
        <el-form-item label="指令标题:" prop="cmdTitle">
          <el-input v-model="formData.cmdTitle" :clearable="true" placeholder="请输入指令标题" />
        </el-form-item>
        <el-form-item label="指令编码:" prop="cmdCode">
          <el-input v-model="formData.cmdCode" :clearable="true" placeholder="registry 语义码，如 A_POS_NOW / S_SHAKE_AL（下发链路认这个）" />
        </el-form-item>
        <el-form-item label="所属协议:" prop="protocol">
          <el-select v-model="formData.protocol" :clearable="true" filterable placeholder="请选择所属协议">
            <el-option v-for="item in protocolOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="指令状态:" prop="cmdStatus">
          <el-switch v-model="formData.cmdStatus" :active-value="1" :inactive-value="0" active-text="生效" inactive-text="失效" inline-prompt />
        </el-form-item>
        <el-form-item label="指令描述:" prop="cmdDesc">
          <el-input v-model="formData.cmdDesc" type="textarea" :rows="3" :clearable="true" placeholder="请输入指令描述" />
        </el-form-item>
        <el-form-item label="排序:" prop="cmdIndex">
          <el-input v-model.number="formData.cmdIndex" :clearable="true" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="指令标识:" prop="canOffline">
          <el-select v-model="formData.canOffline" :clearable="true" placeholder="请选择指令标识">
            <el-option v-for="item in cmdModeOptions" :key="item.value" :label="item.label" :value="Number(item.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="指令内容:" prop="cmdContent">
          <el-input v-model="formData.cmdContent" type="textarea" :rows="4" :clearable="true" placeholder="请输入指令内容" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  createLotCmd,
  deleteLotCmd,
  deleteLotCmdByIds,
  updateLotCmd,
  findLotCmd,
  getLotCmdTree
} from '@/api/lot/lotCmd'

import { getDictFunc, formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive, computed } from 'vue'
import { useAppStore } from "@/pinia"

defineOptions({ name: 'LotCmd' })

const btnLoading = ref(false)
const appStore = useAppStore()

const cmdModeOptions = ref([])

// 所属协议取值对齐 contracts/enums/registry.yaml 的 ProtocolId（HLXT/JT808），
// 与 lot_product.protocol 一致——保存产品指令关联时按它做一致性校验。
const protocolOptions = [
  { label: 'HLXT（鸿联信通 3G）', value: 'HLXT' },
  { label: 'JT808（车网 JT/T 808）', value: 'JT808' },
]

const stringifyOptionValue = (value) => {
  if (value === null || value === undefined) return ''
  return String(value)
}
const getCmdStatusType = (status) => {
  const value = Number(status)
  return value === 1 ? 'success' : 'danger'
}
const getCmdStatusText = (status) => Number(status) === 1 ? '生效' : '失效'
const getCmdModeText = (mode) => Number(mode) === 0 ? '离线指令' : '实时指令'

const getDefaultFormData = () => ({
  cmdTitle: '',
  cmdCode: '',
  protocol: '',
  cmdStatus: 0,
  cmdDesc: '',
  cmdIndex: 0,
  canOffline: 0,
  parentId: 0,
  cmdContent: '',
})

const normalizeFormData = (data = {}) => ({
  ...data,
  cmdCode: stringifyOptionValue(data.cmdCode),
  protocol: stringifyOptionValue(data.protocol),
  cmdStatus: Number(data.cmdStatus ?? 0),
  canOffline: Number(data.canOffline ?? 0),
})

const formData = ref(getDefaultFormData())
const rule = reactive({})
const elFormRef = ref()
const elSearchFormRef = ref()
const cmdTableRef = ref()

// =========== 树形表格 ===========
const tableData = ref([])
const searchInfo = ref({})
const isExpandAll = ref(true)

const filteredTableData = computed(() => {
  if (!searchInfo.value.cmdTitle && !searchInfo.value.cmdStatus) {
    return tableData.value
  }
  return filterTree(tableData.value)
})

const filterTree = (nodes) => {
  return nodes.reduce((acc, node) => {
    let match = true
    if (searchInfo.value.cmdTitle && (!node.cmdTitle || !node.cmdTitle.includes(searchInfo.value.cmdTitle))) match = false
    if (searchInfo.value.cmdStatus !== undefined && searchInfo.value.cmdStatus !== null && searchInfo.value.cmdStatus !== '' && Number(node.cmdStatus) !== Number(searchInfo.value.cmdStatus)) match = false
    const filteredChildren = node.children ? filterTree(node.children) : []
    if (match || filteredChildren.length > 0) {
      acc.push({ ...node, children: filteredChildren })
    }
    return acc
  }, [])
}

const onReset = () => {
  searchInfo.value = {}
}
const onSubmit = () => {}

const toggleTree = (expanded) => {
  const walk = (nodes) => {
    ;(nodes || []).forEach(node => {
      if (node.children && node.children.length) {
        cmdTableRef.value?.toggleRowExpansion(node, expanded)
        walk(node.children)
      }
    })
  }
  walk(filteredTableData.value)
}
const expandAll = () => { isExpandAll.value = true; toggleTree(true) }
const collapseAll = () => { isExpandAll.value = false; toggleTree(false) }

const getTableData = async () => {
  const table = await getLotCmdTree()
  if (table.code === 0) {
    tableData.value = table.data || []
  }
}
getTableData()

// cascader 选项
const cmdCascaderOptions = ref([{ ID: 0, cmdTitle: '根指令' }])
const buildCascaderOptions = () => {
  cmdCascaderOptions.value = [{ ID: 0, cmdTitle: '根指令' }]
  buildCascaderChildren(tableData.value, cmdCascaderOptions.value)
}
const buildCascaderChildren = (nodes, parentOptions) => {
  nodes && nodes.forEach((item) => {
    if (item.children && item.children.length) {
      const option = { ID: item.ID, cmdTitle: item.cmdTitle, disabled: item.ID === formData.value.ID, children: [] }
      buildCascaderChildren(item.children, option.children)
      parentOptions.push(option)
    } else {
      parentOptions.push({ ID: item.ID, cmdTitle: item.cmdTitle, disabled: item.ID === formData.value.ID })
    }
  })
}

// 多选
const multipleSelection = ref([])
const handleSelectionChange = (val) => { multipleSelection.value = val }

const deleteRow = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
    .then(() => { deleteLotCmdFunc(row) })
}
const onDelete = async () => {
  ElMessageBox.confirm('确定要删除吗?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' })
    .then(async () => {
      const IDs = []
      if (multipleSelection.value.length === 0) {
        ElMessage({ type: 'warning', message: '请选择要删除的数据' })
        return
      }
      multipleSelection.value.map(item => IDs.push(item.ID))
      const res = await deleteLotCmdByIds({ IDs })
      if (res.code === 0) {
        ElMessage({ type: 'success', message: '删除成功' })
        getTableData()
      }
    })
}

const type = ref('')
const dialogTitle = ref('新增')

const updateLotCmdFunc = async (row) => {
  const res = await findLotCmd({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    const normalized = normalizeFormData(res.data)
    formData.value = normalized
    dialogTitle.value = '编辑'
    buildCascaderOptions()
    dialogFormVisible.value = true
  }
}

const openChildDialog = (row) => {
  type.value = 'create'
  dialogTitle.value = '添加子指令'
  formData.value = {
    ...getDefaultFormData(),
    parentId: row.ID,
    cmdCode: stringifyOptionValue(row.cmdCode),
    protocol: stringifyOptionValue(row.protocol),
    cmdStatus: Number(row.cmdStatus ?? 0),
    canOffline: Number(row.canOffline ?? 0)
  }
  buildCascaderOptions()
  dialogFormVisible.value = true
}

const deleteLotCmdFunc = async (row) => {
  const res = await deleteLotCmd({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({ type: 'success', message: '删除成功' })
    getTableData()
  }
}

const dialogFormVisible = ref(false)

const openAddRootDialog = () => {
  type.value = 'create'
  dialogTitle.value = '新增根指令'
  formData.value = getDefaultFormData()
  buildCascaderOptions()
  dialogFormVisible.value = true
}

const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = getDefaultFormData()
}

const enterDialog = async () => {
  btnLoading.value = true
  elFormRef.value?.validate(async (valid) => {
    if (!valid) return btnLoading.value = false
    let res
    switch (type.value) {
      case 'create': res = await createLotCmd(formData.value); break
      case 'update': res = await updateLotCmd(formData.value); break
      default: res = await createLotCmd(formData.value); break
    }
    btnLoading.value = false
    if (res.code === 0) {
      ElMessage({ type: 'success', message: '创建/更改成功' })
      closeDialog()
      getTableData()
    }
  })
}

const setOptions = async () => {
  const modeRes = await getDictFunc('cmd_mode')
  if (modeRes) cmdModeOptions.value = modeRes
}
setOptions()
</script>

<style scoped lang="scss">
.gva-btn-list {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}
</style>
