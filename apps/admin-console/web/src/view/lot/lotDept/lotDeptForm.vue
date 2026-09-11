
<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="组织类型:" prop="orgType">
    <el-select v-model="formData.orgType" clearable placeholder="请选择组织类型">
      <el-option v-for="item in orgTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</el-form-item>
        <el-form-item label="父部门ID:" prop="parentId">
    <el-input v-model.number="formData.parentId" :clearable="true" placeholder="请输入父部门ID" />
</el-form-item>
        <el-form-item label="祖级列表:" prop="ancestors">
    <el-input v-model="formData.ancestors" :clearable="true" placeholder="请输入祖级列表" />
</el-form-item>
        <el-form-item label="部门名称:" prop="deptName">
    <el-input v-model="formData.deptName" :clearable="true" placeholder="请输入部门名称" />
</el-form-item>
        <el-form-item label="显示顺序:" prop="orderNum">
    <el-input v-model.number="formData.orderNum" :clearable="true" placeholder="请输入显示顺序" />
</el-form-item>
        <el-form-item label="负责人:" prop="leader">
    <el-input v-model="formData.leader" :clearable="true" placeholder="请输入负责人" />
</el-form-item>
        <el-form-item label="联系电话:" prop="phone">
    <el-input v-model="formData.phone" :clearable="true" placeholder="请输入联系电话" />
</el-form-item>
        <el-form-item label="邮箱:" prop="email">
    <el-input v-model="formData.email" :clearable="true" placeholder="请输入邮箱" />
</el-form-item>
        <el-form-item label="状态:" prop="status">
    <el-switch v-model="formData.status" active-value="0" inactive-value="1" active-text="正常" inactive-text="停用" />
</el-form-item>
        <el-form-item label="创建者:" prop="createBy">
    <el-input v-model="formData.createBy" :clearable="true" placeholder="请输入创建者" />
</el-form-item>
        <el-form-item label="更新者:" prop="updateBy">
    <el-input v-model="formData.updateBy" :clearable="true" placeholder="请输入更新者" />
</el-form-item>
        <el-form-item label="备注:" prop="remark">
    <el-input v-model="formData.remark" :clearable="true" placeholder="请输入备注" />
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
  createLotDept,
  updateLotDept,
  findLotDept
} from '@/api/lot/lotDept'

defineOptions({
    name: 'LotDeptForm'
})

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const orgTypeOptions = ref([])
getDictFunc('org_type').then(opts => { if (opts && opts.length) orgTypeOptions.value = opts })

const route = useRoute()
const router = useRouter()

// 提交按钮loading
const btnLoading = ref(false)

const type = ref('')
const formData = ref({
            orgType: 'dept',
            parentId: 0,
            ancestors: '',
            deptName: '',
            orderNum: 0,
            leader: '',
            phone: '',
            email: '',
            status: '',
            createBy: '',
            updateBy: '',
            remark: '',
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findLotDept({ ID: route.query.id })
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
               res = await createLotDept(formData.value)
               break
             case 'update':
               res = await updateLotDept(formData.value)
               break
             default:
               res = await createLotDept(formData.value)
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
