<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="设备 IMEI:" prop="deviceId">
          <el-input v-model="formData.deviceId" :clearable="true" placeholder="请输入设备 IMEI" />
        </el-form-item>
        <el-form-item label="设备名称:" prop="deviceName">
          <el-input v-model="formData.deviceName" :clearable="true" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="设备类型:" prop="deviceType">
          <el-input v-model="formData.deviceType" :clearable="true" placeholder="请输入设备类型" />
        </el-form-item>
        <el-form-item label="部门ID:" prop="deptId">
          <el-input v-model.number="formData.deptId" :clearable="true" placeholder="请输入部门ID" />
        </el-form-item>
        <el-form-item label="标签:" prop="labels">
          <el-input v-model="formData.labels" :clearable="true" placeholder="请输入标签" />
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="formData.status" clearable placeholder="请选择状态">
            <el-option label="在线" :value="1" />
            <el-option label="离线" :value="2" />
            <el-option label="故障" :value="3" />
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
import { createLotDeviceInfo, updateLotDeviceInfo, findLotDeviceInfo } from '@/api/lot/lotDeviceInfo'

defineOptions({ name: 'LotDeviceInfoForm' })

import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const route = useRoute()
const router = useRouter()
const btnLoading = ref(false)
const type = ref('')
const formData = ref({
  deptId: 0,
  deviceId: '',
  deviceName: '',
  deviceType: '',
  proxyCode: '',
  labels: '',
  status: 1,
})
const rule = reactive({})
const elFormRef = ref()

const init = async () => {
  if (route.query.id) {
    const res = await findLotDeviceInfo({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data
      type.value = 'update'
    }
  } else {
    type.value = 'create'
  }
}

init()

const save = async() => {
  btnLoading.value = true
  elFormRef.value?.validate(async (valid) => {
    if (!valid) return btnLoading.value = false
    let res
    switch (type.value) {
      case 'create': res = await createLotDeviceInfo(formData.value); break
      case 'update': res = await updateLotDeviceInfo(formData.value); break
      default: res = await createLotDeviceInfo(formData.value); break
    }
    btnLoading.value = false
    if (res.code === 0) { ElMessage({ type:'success', message:'创建/更改成功' }) }
  })
}

const back = () => { router.go(-1) }
</script>

<style>
</style>
