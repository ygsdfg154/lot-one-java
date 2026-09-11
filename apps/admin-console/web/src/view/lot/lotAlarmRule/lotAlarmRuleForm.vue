
<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="产品id:" prop="productId">
    <el-input v-model.number="formData.productId" :clearable="true" placeholder="请输入产品id" />
</el-form-item>
        <el-form-item label="告警编码:" prop="alarmCode">
    <el-input v-model="formData.alarmCode" :clearable="true" placeholder="请输入告警编码" />
</el-form-item>
        <el-form-item label="告警名称:" prop="alarmName">
    <el-input v-model="formData.alarmName" :clearable="true" placeholder="请输入告警名称" />
</el-form-item>
        <el-form-item label="告警类型:" prop="alarmType">
    <el-select v-model="formData.alarmType" clearable filterable placeholder="请选择告警类型">
      <el-option v-for="item in alarmTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</el-form-item>
        <el-form-item label="告警单位:" prop="alarmValueUnit">
    <el-input v-model="formData.alarmValueUnit" :clearable="true" placeholder="请输入告警单位" />
</el-form-item>
        <el-form-item label="告警描述:" prop="alarmDesc">
    <el-input v-model="formData.alarmDesc" :clearable="true" placeholder="请输入告警描述" />
</el-form-item>
        <el-form-item label="推送类型:" prop="pushType">
    <el-select v-model="formData.pushType" clearable filterable placeholder="请选择推送类型">
      <el-option v-for="item in pushTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</el-form-item>
        <el-form-item label="是否告警:" prop="isAlarmValue">
    <el-switch v-model="formData.isAlarmValue" :active-value="0" :inactive-value="1" active-text="是" inactive-text="否" />
</el-form-item>
        <el-form-item label="默认告警值:" prop="defaultAlarmValue">
    <el-input v-model="formData.defaultAlarmValue" :clearable="true" placeholder="请输入默认告警值" />
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
  createLotAlarmRule,
  updateLotAlarmRule,
  findLotAlarmRule
} from '@/api/lot/lotAlarmRule'

defineOptions({
    name: 'LotAlarmRuleForm'
})

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'

const alarmTypeOptions = ref([])
const pushTypeOptions = ref([])
onMounted(async () => {
  const results = await Promise.allSettled([
    getDictFunc('alarm_type'),
    getDictFunc('push_type')
  ])
  const [alarm, push] = results.map(r => r.status === 'fulfilled' ? r.value : null)
  if (alarm && alarm.length) alarmTypeOptions.value = alarm
  if (push && push.length) pushTypeOptions.value = push
})


const route = useRoute()
const router = useRouter()

// 提交按钮loading
const btnLoading = ref(false)

const type = ref('')
const formData = ref({
            productId: 0,
            alarmCode: '',
            alarmName: '',
            alarmType: 0,
            alarmValueUnit: '',
            alarmDesc: '',
            pushType: '',
            isAlarmValue: 0,
            defaultAlarmValue: '',
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findLotAlarmRule({ ID: route.query.id })
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
               res = await createLotAlarmRule(formData.value)
               break
             case 'update':
               res = await updateLotAlarmRule(formData.value)
               break
             default:
               res = await createLotAlarmRule(formData.value)
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
