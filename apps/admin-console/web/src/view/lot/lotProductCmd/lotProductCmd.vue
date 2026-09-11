
<template>
  <div>
    <div class="gva-table-box">
      <div class="header-info">
        当前产品：<b>{{ productCode || '-' }}</b>（{{ productProtocol || '未标协议' }} 协议）
        <span class="checked-count">已勾选 <b>{{ selectedIds.size }}</b> 条指令</span>
      </div>
      <div class="gva-btn-list">
        <el-button type="primary" icon="check" :loading="btnLoading" @click="save">保存勾选</el-button>
        <el-button icon="expand" style="margin-left: 10px" @click="expandAll">展开全部</el-button>
        <el-button icon="fold" @click="collapseAll">收起全部</el-button>
      </div>

      <el-table
        ref="cmdTableRef"
        style="width: 100%"
        tooltip-effect="dark"
        :data="filteredCmdTree"
        row-key="ID"
        :default-expand-all="isExpandAll"
        @select="handleSelect"
        @select-all="handleSelect"
      >
        <el-table-column type="selection" width="45" />

        <el-table-column align="left" label="指令标题" prop="cmdTitle" min-width="200" show-overflow-tooltip />

        <el-table-column align="left" label="指令编码" prop="cmdCode" width="160" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.cmdCode || '-' }}</template>
        </el-table-column>

        <el-table-column align="left" label="所属协议" prop="protocol" width="100">
          <template #default="scope">{{ scope.row.protocol || '-' }}</template>
        </el-table-column>

        <el-table-column align="left" label="指令状态" width="90">
          <template #default="scope">
            <el-tag :type="Number(scope.row.cmdStatus) === 1 ? 'success' : 'danger'" size="small">
              {{ Number(scope.row.cmdStatus) === 1 ? '生效' : '失效' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column align="left" label="指令标识" width="110">
          <template #default="scope">{{ Number(scope.row.canOffline) === 0 ? '离线指令' : '实时指令' }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { bindProductCmds, getProductCmdIds } from '@/api/lot/lotProductCmd'
import { getLotCmdTree } from '@/api/lot/lotCmd'
import { findLotProduct } from '@/api/lot/lotProduct'

import { ElMessage } from 'element-plus'
import { ref, computed, nextTick } from 'vue'
import { useRouteQueryValue } from '@/hooks/useRouteQuery'

defineOptions({ name: 'LotProductCmd' })

const btnLoading = ref(false)
const queryProductId = useRouteQueryValue('product_id', v => parseInt(v))
const cmdTableRef = ref()

const productCode = ref('')
const productProtocol = ref('')
const selectedIds = ref(new Set())
const boundIds = ref(new Set())

// 全量指令树（按产品协议过滤后展示：只显示该产品能用的协议指令）
const fullCmdTree = ref([])
const filterByProtocol = (nodes, protocol) => {
  return (nodes || []).reduce((acc, node) => {
    if (node.protocol !== protocol) return acc
    const children = node.children ? filterByProtocol(node.children, protocol) : []
    acc.push({ ...node, children })
    return acc
  }, [])
}
const filteredCmdTree = computed(() => {
  if (!productProtocol.value) return fullCmdTree.value
  return filterByProtocol(fullCmdTree.value, productProtocol.value)
})

const loadProductInfo = async () => {
  const prodRes = await findLotProduct({ ID: queryProductId })
  if (prodRes.code === 0) {
    productCode.value = prodRes.data?.code || ''
    productProtocol.value = prodRes.data?.protocol || ''
  }
}

const loadCmdTree = async () => {
  const res = await getLotCmdTree()
  if (res.code === 0) fullCmdTree.value = res.data || []
}

const loadBoundIds = async () => {
  const res = await getProductCmdIds({ productId: queryProductId })
  if (res.code === 0) {
    boundIds.value = new Set((res.data || []).map(Number))
  }
}

// selection 变化（含级联）时同步 selectedIds
const handleSelect = (selection) => {
  selectedIds.value = new Set((selection || []).map(r => r.ID))
}

// 初始勾选：父在 boundIds 则勾父（级联勾子），否则递归查子
const initSelection = () => {
  const walk = (nodes) => {
    ;(nodes || []).forEach(node => {
      if (boundIds.value.has(node.ID)) {
        cmdTableRef.value?.toggleRowSelection(node, true)
      } else if (node.children && node.children.length) {
        walk(node.children)
      }
    })
  }
  walk(filteredCmdTree.value)
}

const save = async () => {
  btnLoading.value = true
  const res = await bindProductCmds({ productId: queryProductId, cmdIds: [...selectedIds.value] })
  btnLoading.value = false
  if (res.code === 0) {
    ElMessage({ type: 'success', message: '保存成功' })
  }
}

const isExpandAll = ref(true)
const toggleTree = (expanded) => {
  const walk = (nodes) => {
    ;(nodes || []).forEach(node => {
      if (node.children && node.children.length) {
        cmdTableRef.value?.toggleRowExpansion(node, expanded)
        walk(node.children)
      }
    })
  }
  walk(filteredCmdTree.value)
}
const expandAll = () => { isExpandAll.value = true; toggleTree(true) }
const collapseAll = () => { isExpandAll.value = false; toggleTree(false) }

const init = async () => {
  await Promise.all([loadProductInfo(), loadCmdTree(), loadBoundIds()])
  await nextTick()
  initSelection()
}
init()
</script>

<style scoped lang="scss">
.gva-btn-list {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
}
.header-info {
  margin-bottom: 12px;
  font-size: 14px;
  color: #606266;
}
.checked-count {
  margin-left: 16px;
}
</style>
