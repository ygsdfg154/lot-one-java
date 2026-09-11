
<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="商店名称:" prop="shopName">
    <el-input v-model="formData.shopName" :clearable="true" placeholder="请输入商店名称" />
</el-form-item>
        <el-form-item label="所属部门:" prop="deptId">
    <el-tree-select v-model="formData.deptId" placeholder="请选择所属部门" :data="deptTreeData" filterable style="width:100%" :clearable="true" check-strictly :props="{ label: 'fullDeptName', value: 'ID', children: 'children' }" />
</el-form-item>
        <el-form-item label="商店Logo:" prop="shopLogo">
    <el-input v-model="formData.shopLogo" :clearable="true" placeholder="请输入商店Logo" />
</el-form-item>
        <el-form-item label="联系电话:" prop="contactPhone">
    <el-input v-model="formData.contactPhone" :clearable="true" placeholder="请输入联系电话" />
</el-form-item>
        <el-form-item label="详细地址:" prop="address">
    <el-input v-model="formData.address" :clearable="true" placeholder="请输入详细地址" />
</el-form-item>
        <el-form-item label="排序权重:" prop="sortOrder">
    <el-input v-model.number="formData.sortOrder" :clearable="true" placeholder="请输入排序权重" />
</el-form-item>
        <el-form-item label="状态:" prop="status">
    <el-tree-select v-model="formData.status" placeholder="请选择状态" :data="common_statusOptions" style="width:100%" filterable :clearable="true" check-strictly></el-tree-select>
</el-form-item>
        <el-form-item label="备注:" prop="remark">
    <RichEdit v-model="formData.remark"/>
</el-form-item>
        <el-form-item>
          <el-button :loading="btnLoading" type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {
    getLotShopDataSource,
  createLotShop,
  updateLotShop,
  findLotShop
} from '@/api/lot/lotShop'
import { getLotDeptList, getLotDeptTree } from '@/api/lot/lotDept'
import { deptListToOptions } from '@/utils/deptHelper'

defineOptions({
    name: 'LotShopForm'
})

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
// 富文本组件
import RichEdit from '@/components/richtext/rich-edit.vue'
// 数组控制组件
import ArrayCtrl from '@/components/arrayCtrl/arrayCtrl.vue'


const route = useRoute()
const router = useRouter()

// 提交按钮loading
const btnLoading = ref(false)

const type = ref('')
const common_statusOptions = ref([])
const deptOptions = ref([])
const deptTreeData = ref([])
const formData = ref({
            shopName: '',
            deptId: undefined,
            shopLogo: '',
            contactPhone: '',
            address: '',
            sortOrder: undefined,
            status: '',
            remark: '',
        })
// 验证规则
const rule = reactive({
               shopName : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
               deptId : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               }],
})

const elFormRef = ref()
  const dataSource = ref([])
  const getDataSourceFunc = async()=>{
    const res = await getLotShopDataSource()
    if (res.code === 0) {
      dataSource.value = res.data
    }
  }
  getDataSourceFunc()
  // 加载部门选项（与设备列表"所属组织"一致）
  const loadDeptOptions = async () => {
    try {
      const res = await getLotDeptList({ page: 1, pageSize: 1000 })
      if (res.code === 0) deptOptions.value = deptListToOptions(res.data?.list)
    } catch { /* 部门数据加载失败不影响主流程 */ }
  }
  loadDeptOptions()
  // 加载部门树形数据（用于树形部门选择器，后端已按数据权限过滤）
  const loadDeptTreeData = async () => {
    try {
      const res = await getLotDeptTree()
      if (res.code === 0) deptTreeData.value = res.data || []
    } catch { /* 部门树数据加载失败不影响主流程 */ }
  }
  loadDeptTreeData()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findLotShop({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
    common_statusOptions.value = await getDictFunc('common_status')
}

init()
// 保存按钮
const save = async() => {
      btnLoading.value = true
      elFormRef.value?.validate( async (valid) => {
         if (!valid) return btnLoading.value = false
            let res
           switch (type.value) {
             case 'create':
               res = await createLotShop(formData.value)
               break
             case 'update':
               res = await updateLotShop(formData.value)
               break
             default:
               res = await createLotShop(formData.value)
               break
           }
           btnLoading.value = false
           if (res.code === 0) {
             ElMessage({
               type: 'success',
               message: '创建/更改成功'
             })
           }
       })
}

// 返回按钮
const back = () => {
    router.go(-1)
}

</script>

<style>
</style>
