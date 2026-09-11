
<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="指令标题:" prop="cmdTitle">
    <el-input v-model="formData.cmdTitle" :clearable="true" placeholder="请输入指令标题" />
</el-form-item>
        <el-form-item label="指令状态:" prop="cmdStatus">
    <el-switch v-model="formData.cmdStatus" :active-value="1" :inactive-value="0" active-text="生效" inactive-text="失效" />
</el-form-item>
        <el-form-item label="指令描述:" prop="cmdDesc">
    <el-input v-model="formData.cmdDesc" :clearable="true" placeholder="请输入指令描述" />
</el-form-item>
        <el-form-item label="排序:" prop="cmdIndex">
    <el-input v-model.number="formData.cmdIndex" :clearable="true" placeholder="请输入排序" />
</el-form-item>
        <el-form-item label="指令标识:" prop="canOffline">
    <el-switch v-model="formData.canOffline" :active-value="1" :inactive-value="0" active-text="实时指令" inactive-text="离线指令" />
</el-form-item>
        <el-form-item label="父级id:" prop="parentId">
    <el-input v-model.number="formData.parentId" :clearable="true" placeholder="请输入父级id" />
</el-form-item>
        <el-form-item label="指令内容:" prop="cmdContent">
    <el-input v-model="formData.cmdContent" :clearable="true" placeholder="请输入指令内容" />
</el-form-item>
        <el-form-item label="产品分类:" prop="productCategoryType">
    <el-select v-model="formData.productCategoryType" clearable filterable placeholder="请选择产品分类">
      <el-option v-for="item in productCategoryOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</el-form-item>
        <el-form-item label="祖级列表:" prop="ancestors">
    <el-input v-model="formData.ancestors" :clearable="true" placeholder="请输入祖级列表" />
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
  createLotCmd,
  updateLotCmd,
  findLotCmd
} from '@/api/lot/lotCmd'

defineOptions({
    name: 'LotCmdForm'
})

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'

const productCategoryOptions = ref([])

onMounted(async () => {
  const catOpts = await getDictFunc('product_category')
  if (catOpts) productCategoryOptions.value = catOpts
})


const route = useRoute()
const router = useRouter()

// 提交按钮loading
const btnLoading = ref(false)

const type = ref('')
const formData = ref({
            cmdTitle: '',
            cmdStatus: 0,
            cmdDesc: '',
            cmdIndex: 0,
            canOffline: 0,
            parentId: 0,
            cmdContent: '',
            productCategoryType: '',
            ancestors: '',
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findLotCmd({ ID: route.query.id })
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
               res = await createLotCmd(formData.value)
               break
             case 'update':
               res = await updateLotCmd(formData.value)
               break
             default:
               res = await createLotCmd(formData.value)
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
