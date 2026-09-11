<template>
  <el-dialog
    v-model="visible"
    title="选择店铺"
    width="600px"
    destroy-on-close
    @open="onOpen"
  >
    <div class="shop-dialog">
      <el-input
        v-model="keyword"
        placeholder="输入店铺名称搜索..."
        clearable
        style="margin-bottom: 12px"
        @input="filterShops"
      />
      <el-table
        ref="tableRef"
        highlight-current-row
        :data="filteredShops"
        style="width: 100%"
        height="300"
        @row-click="selectRow"
      >
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="shopName" label="店铺名称" min-width="160" show-overflow-tooltip />
        <el-table-column prop="contactPhone" label="联系电话" width="140" />
        <el-table-column prop="address" label="地址" min-width="180" show-overflow-tooltip />
      </el-table>
    </div>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :disabled="!selectedId" @click="onConfirm">确认选择</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getShopList } from '@/api/lot/lotOrder'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'confirm'])

const visible = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

const shops = ref([])
const keyword = ref('')
const selectedId = ref(null)

const filteredShops = computed(() => {
  if (!keyword.value) return shops.value
  return shops.value.filter(s => (s.shopName || '').includes(keyword.value))
})

const onOpen = async () => {
  keyword.value = ''
  selectedId.value = null
  const res = await getShopList()
  if (res.code === 0) shops.value = res.data || []
}

const selectRow = (row) => { selectedId.value = row.ID }
const filterShops = () => { selectedId.value = null }
const onConfirm = () => {
  if (selectedId.value) emit('confirm', selectedId.value)
}
</script>

<style scoped>
.shop-dialog {
  max-height: 400px;
}
</style>
