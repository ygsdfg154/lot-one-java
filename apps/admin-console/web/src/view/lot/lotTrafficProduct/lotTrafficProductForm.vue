
<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="产品名称:" prop="name">
    <el-input v-model="formData.name" :clearable="true" placeholder="请输入产品名称" />
</el-form-item>
        <el-form-item label="流量大小:" prop="trafficMb">
    <el-input v-model.number="formData.trafficMb" :clearable="true" placeholder="请输入流量大小" />
</el-form-item>
        <el-form-item label="售价:" prop="price">
    <el-input-number v-model="formData.price" style="width:100%" :precision="2" :clearable="true" />
</el-form-item>
        <el-form-item label="原价/划线价:" prop="originalPrice">
    <el-input-number v-model="formData.originalPrice" style="width:100%" :precision="2" :clearable="true" />
</el-form-item>
        <el-form-item label="有效期类型:" prop="validityType">
    <el-input v-model.number="formData.validityType" :clearable="true" placeholder="请输入有效期类型" />
</el-form-item>
        <el-form-item label="有效期天数:" prop="validityDays">
    <el-input v-model.number="formData.validityDays" :clearable="true" placeholder="请输入有效期天数" />
</el-form-item>
        <el-form-item label="购买说明:" prop="purchaseNotes">
    <el-input v-model="formData.purchaseNotes" :clearable="true" placeholder="请输入购买说明" />
</el-form-item>
        <el-form-item label="是否上架:" prop="isActive">
    <el-input v-model.number="formData.isActive" :clearable="true" placeholder="请输入是否上架" />
</el-form-item>
        <el-form-item label="排序权重（数值越大越靠前）:" prop="sortOrder">
    <el-input v-model.number="formData.sortOrder" :clearable="true" placeholder="请输入排序权重（数值越大越靠前）" />
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
  createLotTrafficProduct,
  updateLotTrafficProduct,
  findLotTrafficProduct
} from '@/api/lot/lotTrafficProduct'

defineOptions({
    name: 'LotTrafficProductForm'
})

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'


const route = useRoute()
const router = useRouter()

// 提交按钮loading
const btnLoading = ref(false)

const type = ref('')
const formData = ref({
            name: '',
            trafficMb: undefined,
            price: 0,
            originalPrice: 0,
            validityType: undefined,
            validityDays: undefined,
            purchaseNotes: '',
            isActive: undefined,
            sortOrder: undefined,
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findLotTrafficProduct({ ID: route.query.id })
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
               res = await createLotTrafficProduct(formData.value)
               break
             case 'update':
               res = await updateLotTrafficProduct(formData.value)
               break
             default:
               res = await createLotTrafficProduct(formData.value)
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
