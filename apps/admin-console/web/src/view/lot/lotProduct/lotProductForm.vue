
<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="产品编码:" prop="code">
    <el-input v-model="formData.code" :clearable="true" placeholder="请输入产品编码" />
</el-form-item>
        <el-form-item label="产品分类:" prop="productCategoryType">
    <el-select v-model="formData.productCategoryType" clearable filterable placeholder="请选择产品分类">
      <el-option v-for="item in productCategoryOptions" :key="item.value" :label="item.label" :value="Number(item.value)" />
    </el-select>
</el-form-item>
        <el-form-item label="备注:" prop="remark">
    <el-input v-model="formData.remark" :clearable="true" placeholder="请输入备注" />
</el-form-item>
        <el-form-item label="定位方式:" prop="posType">
    <el-select v-model="formData.posType" clearable filterable placeholder="请选择定位方式">
      <el-option v-for="item in posTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</el-form-item>
        <el-form-item label="产品配置:" prop="config">
    // 此字段为json结构，可以前端自行控制展示和数据绑定模式 需绑定json的key为 formData.config 后端会按照json的类型进行存取
    {{ formData.config }}
</el-form-item>
        <el-form-item label="客服链接:" prop="serviceLink">
    <el-input v-model="formData.serviceLink" :clearable="true" placeholder="请输入客服链接" />
</el-form-item>
        <el-form-item label="产品类型:" prop="productType">
    <el-select v-model="formData.productType" clearable filterable placeholder="请选择产品类型">
      <el-option v-for="item in productTypeOptions" :key="item.value" :label="item.label" :value="Number(item.value)" />
    </el-select>
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
  createLotProduct,
  updateLotProduct,
  findLotProduct
} from '@/api/lot/lotProduct'
defineOptions({
    name: 'LotProductForm'
})

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'

const productCategoryOptions = ref([])
const posTypeOptions = ref([])
const productTypeOptions = ref([])
const loadOptions = async () => {
  const results = await Promise.allSettled([
    getDictFunc('product_category'),
    getDictFunc('product_positioning'),
    getDictFunc('product_type')
  ])
  const [cat, pos, type] = results.map(r => r.status === 'fulfilled' ? r.value : null)
  if (cat && cat.length) productCategoryOptions.value = cat
  if (pos && pos.length) posTypeOptions.value = pos
  if (type && type.length) productTypeOptions.value = type
}
onMounted(() => { loadOptions() })


const route = useRoute()
const router = useRouter()

// 提交按钮loading
const btnLoading = ref(false)

const type = ref('')
const formData = ref({
            code: '',
            productCategoryType: 0,
            remark: '',
            posType: '',
            config: {},
            serviceLink: '',
            productType: 0,
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findLotProduct({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
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
               res = await createLotProduct(formData.value)
               break
             case 'update':
               res = await updateLotProduct(formData.value)
               break
             default:
               res = await createLotProduct(formData.value)
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
