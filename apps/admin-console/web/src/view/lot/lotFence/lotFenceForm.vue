<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="120px">
        <el-form-item label="所属部门:" prop="deptId">
          <el-tree-select
            v-model="formData.deptId"
            :data="deptTreeData"
            :props="{ label: 'deptName', value: 'ID', children: 'children' }"
            :check-strictly="true"
            clearable
            filterable
            placeholder="请选择所属部门"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="围栏名称:" prop="fenceName">
          <el-input v-model="formData.fenceName" :clearable="true" placeholder="请输入围栏名称" :maxlength="50" />
        </el-form-item>

        <el-form-item label="围栏形状:" prop="fenceShapeType">
          <el-radio-group v-model="formData.fenceShapeType">
            <el-radio :value="1">圆形</el-radio>
            <el-radio :value="2">多边形</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="formData.fenceShapeType === 1" label="围栏半径(m):" prop="fenceRadius">
          <el-input-number v-model="formData.fenceRadius" :min="100" :max="5000" :step="50" placeholder="请输入围栏半径" style="width: 100%" />
        </el-form-item>

        <el-form-item v-if="formData.fenceShapeType === 1" label="中心点坐标:" prop="centerCoord">
          <div style="display:flex;gap:10px;width:100%">
            <el-input v-model.number="formData.centerLng" placeholder="经度(lng)" style="flex:1">
              <template #prepend>经度</template>
            </el-input>
            <el-input v-model.number="formData.centerLat" placeholder="纬度(lat)" style="flex:1">
              <template #prepend>纬度</template>
            </el-input>
          </div>
        </el-form-item>

        <el-form-item v-if="formData.fenceShapeType === 2" label="多边形顶点:" prop="polygonPointsText">
          <el-input
            v-model="formData.polygonPointsText"
            type="textarea"
            :rows="5"
            placeholder="请输入顶点坐标，每行一个点，格式：经度,纬度&#10;例如：&#10;113.123,23.456&#10;113.234,23.567&#10;113.345,23.678"
          />
          <div style="color:#909399;font-size:12px;margin-top:4px">每行一个顶点，格式：经度,纬度（至少3个顶点）</div>
        </el-form-item>

        <el-form-item label="进入围栏告警:" prop="enterAlarmEnable">
          <el-switch v-model="formData.enterAlarmEnable" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" />
        </el-form-item>

        <el-form-item label="走出围栏告警:" prop="getOutAlarmEnable">
          <el-switch v-model="formData.getOutAlarmEnable" :active-value="1" :inactive-value="0" active-text="开启" inactive-text="关闭" />
        </el-form-item>

        <el-form-item label="是否启用:" prop="enabled">
          <el-switch v-model="formData.enabled" active-text="启用" inactive-text="禁用" />
        </el-form-item>

        <el-form-item label="备注:" prop="remark">
          <el-input v-model="formData.remark" :clearable="true" placeholder="请输入备注" :maxlength="500" type="textarea" :rows="3" />
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
  createMongoFence,
  updateMongoFence,
  getMongoFence
} from '@/api/lot/lotFence'
import { getLotDeptTree } from '@/api/lot/lotDept'
import { getDeptDisplayName } from '@/utils/deptHelper'

defineOptions({
  name: 'LotFenceForm'
})

import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()

const btnLoading = ref(false)
const deptTreeData = ref([])

const type = ref('')
const formData = ref({
  fenceId: '',
  fenceName: '',
  fenceShapeType: 1,
  fenceRadius: 100,
  centerLng: null,
  centerLat: null,
  polygonPointsText: '',
  deptId: null,
  enterAlarmEnable: 1,
  getOutAlarmEnable: 1,
  enabled: true,
  remark: ''
})

const rule = reactive({
  fenceName: [{ required: true, message: '请输入围栏名称', trigger: 'blur' }],
  deptId: [{ required: true, message: '请选择所属部门', trigger: 'change' }],
  fenceShapeType: [{ required: true, message: '请选择围栏形状', trigger: 'change' }]
})

const elFormRef = ref()

const loadDeptTree = async () => {
  try {
    const res = await getLotDeptTree()
    if (res.code === 0 && res.data) {
      deptTreeData.value = res.data
    }
  } catch { /* ignore */ }
}

const init = async () => {
  await loadDeptTree()
  if (route.query.id) {
    const res = await getMongoFence(route.query.id)
    if (res.code === 0) {
      const data = res.data
      formData.value = {
        fenceId: data.fenceId || data.id || '',
        fenceName: data.fenceName || '',
        fenceShapeType: data.fenceShapeType || 1,
        fenceRadius: data.fenceRadius || data.radius || 100,
        centerLng: data.center?.lng || data.fencePoints?.[0]?.lng || null,
        centerLat: data.center?.lat || data.fencePoints?.[0]?.lat || null,
        polygonPointsText: (data.fencePoints || data.points || []).map(p => `${p.lng},${p.lat}`).join('\n'),
        deptId: data.deptId || null,
        enterAlarmEnable: data.enterAlarmEnable ?? 1,
        getOutAlarmEnable: data.getOutAlarmEnable ?? 1,
        enabled: data.enabled !== false,
        remark: data.remark || ''
      }
      type.value = 'update'
    }
  } else {
    type.value = 'create'
  }
}

const buildPoints = () => {
  if (formData.value.fenceShapeType === 1) {
    if (formData.value.centerLng != null && formData.value.centerLat != null) {
      return [{ lng: formData.value.centerLng, lat: formData.value.centerLat }]
    }
    return []
  }
  const text = (formData.value.polygonPointsText || '').trim()
  if (!text) return []
  return text.split('\n').filter(Boolean).map(line => {
    const parts = line.trim().split(',').map(Number)
    return { lng: parts[0] || 0, lat: parts[1] || 0 }
  })
}

const save = async () => {
  btnLoading.value = true
  elFormRef.value?.validate(async (valid) => {
    if (!valid) { btnLoading.value = false; return }

    const points = buildPoints()
    if (formData.value.fenceShapeType === 1 && points.length === 0) {
      ElMessage.warning('请输入中心点坐标')
      btnLoading.value = false
      return
    }
    if (formData.value.fenceShapeType === 2 && points.length < 3) {
      ElMessage.warning('多边形至少需要3个顶点')
      btnLoading.value = false
      return
    }

    const payload = {
      deptId: formData.value.deptId,
      fenceName: formData.value.fenceName,
      fenceShapeType: formData.value.fenceShapeType,
      fenceRadius: formData.value.fenceShapeType === 1 ? formData.value.fenceRadius : 0,
      fencePoints: points,
      enterAlarmEnable: formData.value.enterAlarmEnable,
      getOutAlarmEnable: formData.value.getOutAlarmEnable,
      enabled: formData.value.enabled,
      remark: formData.value.remark
    }

    try {
      let res
      if (type.value === 'update') {
        res = await updateMongoFence(formData.value.fenceId, payload)
      } else {
        res = await createMongoFence(payload)
      }
      btnLoading.value = false
      if (res.code === 0) {
        ElMessage.success(type.value === 'update' ? '更新成功' : '创建成功')
        router.go(-1)
      }
    } catch {
      btnLoading.value = false
    }
  })
}

const back = () => {
  router.go(-1)
}

onMounted(() => {
  init()
})
</script>

<style>
</style>
