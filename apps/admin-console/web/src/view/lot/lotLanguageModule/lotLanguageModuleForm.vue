
<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="value:" prop="languageValue">
    <el-input v-model="formData.languageValue" :clearable="true" placeholder="请输入value" />
</el-form-item>
        <el-form-item label="语言类型:" prop="languageType">
    <el-select v-model="formData.languageType" clearable filterable placeholder="请选择语言类型">
      <el-option v-for="item in languageTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</el-form-item>
        <el-form-item label="模块类型:" prop="moduleType">
    <el-select v-model="formData.moduleType" clearable filterable placeholder="请选择模块类型">
      <el-option v-for="item in moduleTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</el-form-item>
        <el-form-item label="关联id:" prop="correlationId">
    <el-input v-model.number="formData.correlationId" :clearable="true" placeholder="请输入关联id" />
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
  createLotLanguageModule,
  updateLotLanguageModule,
  findLotLanguageModule
} from '@/api/lot/lotLanguageModule'

defineOptions({
    name: 'LotLanguageModuleForm'
})

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'

const languageTypeOptions = ref([])
const moduleTypeOptions = ref([])
onMounted(async () => {
  const results = await Promise.allSettled([
    getDictFunc('language_type'),
    getDictFunc('module_type')
  ])
  const [lang, mod] = results.map(r => r.status === 'fulfilled' ? r.value : null)
  if (lang && lang.length) languageTypeOptions.value = lang
  if (mod && mod.length) moduleTypeOptions.value = mod
})


const route = useRoute()
const router = useRouter()

// 提交按钮loading
const btnLoading = ref(false)

const type = ref('')
const formData = ref({
            languageValue: '',
            languageType: '',
            moduleType: '',
            correlationId: 0,
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findLotLanguageModule({ ID: route.query.id })
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
               res = await createLotLanguageModule(formData.value)
               break
             case 'update':
               res = await updateLotLanguageModule(formData.value)
               break
             default:
               res = await createLotLanguageModule(formData.value)
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
