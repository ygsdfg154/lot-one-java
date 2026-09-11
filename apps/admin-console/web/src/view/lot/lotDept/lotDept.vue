
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
        <el-form-item label="组织类型" prop="orgType">
          <el-select v-model="searchInfo.orgType" clearable placeholder="请选择组织类型">
            <el-option v-for="item in orgTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="searchInfo.deptName" clearable placeholder="请输入部门名称" />
        </el-form-item>
        <template v-if="showAllQuery">
          <el-form-item label="状态" prop="status">
          <el-select v-model="searchInfo.status" clearable placeholder="请选择状态">
            <el-option label="正常" value="0" />
            <el-option label="停用" value="1" />
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
        <el-button type="primary" icon="plus" @click="openAddRootDialog">新增根部门</el-button>
        <el-button icon="delete" style="margin-left: 10px" :disabled="!multipleSelection.length" @click="onDelete">删除</el-button>
        <!-- <el-button icon="expand" style="margin-left: 10px" @click="expandAll">展开全部</el-button>
        <el-button icon="fold" @click="collapseAll">收起全部</el-button> -->
      </div>

      <!-- 树形表格，不分页 -->
      <el-table
        ref="deptTableRef"
        style="width: 100%"
        tooltip-effect="dark"
        :data="filteredTableData"
        row-key="ID"
        :default-expand-all="isExpandAll"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column align="left" label="部门名称" prop="deptName" min-width="150" />


        <el-table-column align="left" label="显示顺序" prop="orderNum" width="100" />

        <el-table-column align="left" label="状态" width="100">
          <template #default="scope">
            <el-switch v-model="scope.row.status" :active-value="'0'" :inactive-value="'1'" active-text="正常" inactive-text="停用" inline-prompt @change="handleStatusChange(scope.row)" />
          </template>
        </el-table-column>

        <el-table-column align="left" label="创建日期" prop="CreatedAt" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>

        <el-table-column align="left" label="操作" fixed="right" :min-width="appStore.operateMinWith">
          <template #default="scope">
            <el-button type="primary" link icon="plus" class="table-button" @click="openAddChildDialog(scope.row)">添加子部门</el-button>
            <el-button type="primary" link class="table-button" @click="getDetails(scope.row)"><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>查看</el-button>
            <el-button type="primary" link icon="edit" class="table-button" @click="updateLotDeptFunc(scope.row)">编辑</el-button>
            <el-button type="primary" link icon="delete" :disabled="scope.row.ID === userDeptId" @click="deleteRow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
        <el-form-item label="上级部门:" prop="parentId">
          <el-cascader
            v-model="formData.parentId"
            style="width: 100%"
            :disabled="type === 'update'"
            :options="deptCascaderOptions"
            :props="{
              checkStrictly: true,
              label: 'fullDeptName',
              value: 'ID',
              emitPath: false
            }"
            :show-all-levels="false"
            filterable
            clearable
            placeholder="请选择上级部门（空为根部门）"
          />
        </el-form-item>
        <el-form-item label="部门名称:" prop="deptName">
          <el-input v-model="formData.deptName" :clearable="true" placeholder="请输入部门名称" />
        </el-form-item>
        <el-form-item label="显示顺序:" prop="orderNum">
          <el-input v-model.number="formData.orderNum" :clearable="true" placeholder="请输入显示顺序" />
        </el-form-item>
        <el-form-item label="负责人:" prop="leader">
          <el-input v-model="formData.leader" :clearable="true" placeholder="请输入负责人" />
        </el-form-item>
        <el-form-item label="联系电话:" prop="phone">
          <el-input v-model="formData.phone" :clearable="true" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="formData.email" :clearable="true" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-switch v-model="formData.status" active-value="0" inactive-value="1" active-text="正常" inactive-text="停用" />
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input v-model="formData.remark" :clearable="true" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 查看详情弹窗 -->
    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="detailShow" :show-close="true" :before-close="closeDetailShow" title="查看">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="上级部门ID">{{ detailForm.parentId }}</el-descriptions-item>
        <el-descriptions-item label="祖级列表">{{ detailForm.ancestors }}</el-descriptions-item>
        <el-descriptions-item label="组织类型">{{ detailForm.orgType === 'platform' ? '平台' : '部门' }}</el-descriptions-item>
        <el-descriptions-item label="部门名称">{{ detailForm.deptName }}</el-descriptions-item>
        <el-descriptions-item label="显示顺序">{{ detailForm.orderNum }}</el-descriptions-item>
        <el-descriptions-item label="负责人">{{ detailForm.leader }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ detailForm.phone }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ detailForm.email }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ detailForm.status === '1' ? '停用' : '正常' }}</el-descriptions-item>
        <el-descriptions-item label="创建者">{{ detailForm.createBy }}</el-descriptions-item>
        <el-descriptions-item label="更新者">{{ detailForm.updateBy }}</el-descriptions-item>
        <el-descriptions-item label="备注">{{ detailForm.remark }}</el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  createLotDept,
  deleteLotDept,
  deleteLotDeptByIds,
  updateLotDept,
  findLotDept,
  getLotDeptTree
} from '@/api/lot/lotDept'

import { getDictFunc, formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive, computed } from 'vue'
import { InfoFilled, QuestionFilled } from '@element-plus/icons-vue'
import { useAppStore, useUserStore } from "@/pinia"

defineOptions({
  name: 'LotDept'
})

// 提交按钮loading
const btnLoading = ref(false)
const appStore = useAppStore()
const userStore = useUserStore()

// 当前登录用户所属部门ID，用于禁用自己部门的删除按钮
const userDeptId = computed(() => userStore.userInfo?.deptId)

// 控制更多查询条件显示/隐藏状态
const showAllQuery = ref(false)

// 表单数据
const formData = ref({
  orgType: 'dept',
  parentId: 0,
  deptName: '',
  orderNum: 0,
  leader: '',
  phone: '',
  email: '',
  status: '0',
  remark: '',
})

// 验证规则
const rule = reactive({})

const elFormRef = ref()
const elSearchFormRef = ref()
const deptTableRef = ref()

// =========== 树形表格控制 ===========
const tableData = ref([])
const searchInfo = ref({})
const isExpandAll = ref(true)

// 从搜索条件构建过滤后的树
const filteredTableData = computed(() => {
  if (!searchInfo.value.orgType && !searchInfo.value.deptName && !searchInfo.value.createdAtRange && !searchInfo.value.status) {
    return tableData.value
  }
  return filterTree(tableData.value)
})

// 递归过滤树
const filterTree = (nodes) => {
  return nodes.reduce((acc, node) => {
    let match = true
    if (searchInfo.value.orgType && node.orgType !== searchInfo.value.orgType) match = false
    if (searchInfo.value.deptName && (!node.deptName || !node.deptName.includes(searchInfo.value.deptName))) match = false
    if (searchInfo.value.status && node.status !== searchInfo.value.status) match = false
    if (searchInfo.value.createdAtRange?.length === 2) {
      const date = new Date(node.CreatedAt)
      if (date < new Date(searchInfo.value.createdAtRange[0]) || date > new Date(searchInfo.value.createdAtRange[1])) {
        match = false
      }
    }

    const filteredChildren = node.children ? filterTree(node.children) : []

    if (match || filteredChildren.length > 0) {
      acc.push({ ...node, children: filteredChildren })
    }
    return acc
  }, [])
}

// 重置
const onReset = () => {
  searchInfo.value = {}
  getTableData()
}

// 搜索
const onSubmit = () => {
  elSearchFormRef.value?.validate(async (valid) => {
    if (!valid) return
  })
}

// 获取树形数据
const getTableData = async () => {
  const table = await getLotDeptTree()
  if (table.code === 0) {
    tableData.value = table.data || []
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
  ElMessageBox.confirm('确定要删除吗? 如果存在子部门也会一并展示，请手动处理。', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteLotDeptFunc(row)
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
    const res = await deleteLotDeptByIds({ IDs })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getTableData()
    }
  })
}

// 行为控制标记
const type = ref('')

// 更新行
const updateLotDeptFunc = async (row) => {
  const res = await findLotDept({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = { ...res.data }
    buildCascaderOptions()
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteLotDeptFunc = async (row) => {
  const res = await deleteLotDept({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getTableData()
  }
}

// 列表中快速切换状态
const handleStatusChange = async (row) => {
  const res = await updateLotDept({ ID: row.ID, status: row.status })
  if (res.code === 0) {
    ElMessage.success('状态更新成功')
  } else {
    // 失败时回滚
    row.status = row.status === '0' ? '1' : '0'
    ElMessage.error(res.msg || '状态更新失败')
  }
}

// 弹窗控制
const dialogFormVisible = ref(false)

// 字典选项
const orgTypeOptions = ref([])
const loadDeptDict = async () => {
  const opts = await getDictFunc('org_type')
  if (opts && opts.length) orgTypeOptions.value = opts
}
loadDeptDict()

// cascader 选项
const deptCascaderOptions = ref([
  { ID: 0, deptName: '根部门', fullDeptName: '根部门' }
])

// 从树数据递归构建 cascader 选项
const buildCascaderOptions = () => {
  deptCascaderOptions.value = [
    { ID: 0, deptName: '根部门', fullDeptName: '根部门' }
  ]
  buildCascaderChildren(tableData.value, deptCascaderOptions.value)
}

const buildCascaderChildren = (nodes, parentOptions) => {
  nodes && nodes.forEach((item) => {
    const base = {
      ID: item.ID,
      deptName: item.deptName,
      fullDeptName: item.fullDeptName || item.deptName,
      disabled: item.ID === formData.value.ID
    }
    if (item.children && item.children.length) {
      const option = { ...base, children: [] }
      buildCascaderChildren(item.children, option.children)
      parentOptions.push(option)
    } else {
      parentOptions.push(base)
    }
  })
}

// 打开新增根部门弹窗
const openAddRootDialog = () => {
  type.value = 'create'
  formData.value = {
    orgType: 'dept',
    parentId: 0,
    deptName: '',
    orderNum: 0,
    leader: '',
    phone: '',
    email: '',
    status: '0',
    remark: '',
  }
  buildCascaderOptions()
  dialogFormVisible.value = true
}

// 打开新增子部门弹窗
const openAddChildDialog = (row) => {
  type.value = 'create'
  formData.value = {
    orgType: 'dept',
    parentId: row.ID,
    deptName: '',
    orderNum: 0,
    leader: '',
    phone: '',
    email: '',
    status: '0',
    remark: '',
  }
  buildCascaderOptions()
  dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    orgType: 'dept',
    parentId: 0,
    deptName: '',
    orderNum: 0,
    leader: '',
    phone: '',
    email: '',
    status: '0',
    remark: '',
  }
}

// 弹窗确定
const enterDialog = async () => {
  btnLoading.value = true
  elFormRef.value?.validate(async (valid) => {
    if (!valid) return btnLoading.value = false
    let res
    switch (type.value) {
      case 'create':
        res = await createLotDept(formData.value)
        break
      case 'update':
        res = await updateLotDept(formData.value)
        break
      default:
        res = await createLotDept(formData.value)
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

// 查看详情
const detailShow = ref(false)

const openDetailShow = () => {
  detailShow.value = true
}

const getDetails = async (row) => {
  const res = await findLotDept({ ID: row.ID })
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
