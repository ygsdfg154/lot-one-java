
<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="订单号:" prop="orderNo">
    <el-input v-model="formData.orderNo" :clearable="true" placeholder="请输入订单号" />
</el-form-item>
        <el-form-item label="用户ID:" prop="userId">
    <el-input v-model.number="formData.userId" :clearable="true" placeholder="请输入用户ID" />
</el-form-item>
        <el-form-item label="产品类型:" prop="productType">
    <el-input v-model.number="formData.productType" :clearable="true" placeholder="请输入产品类型" />
</el-form-item>
        <el-form-item label="产品ID:" prop="productId">
    <el-input v-model.number="formData.productId" :clearable="true" placeholder="请输入产品ID" />
</el-form-item>
        <el-form-item label="购买时设备ID:" prop="deviceId">
    <el-input v-model="formData.deviceId" :clearable="true" placeholder="请输入购买时设备ID" />
</el-form-item>
        <el-form-item label="快照：产品名称:" prop="productName">
    <el-input v-model="formData.productName" :clearable="true" placeholder="请输入快照：产品名称" />
</el-form-item>
        <el-form-item label="快照：产品单价:" prop="productPrice">
    <el-input-number v-model="formData.productPrice" style="width:100%" :precision="2" :clearable="true" />
</el-form-item>
        <el-form-item label="实付金额:" prop="payAmount">
    <el-input-number v-model="formData.payAmount" style="width:100%" :precision="2" :clearable="true" />
</el-form-item>
        <el-form-item label="支付渠道:" prop="payChannel">
    <el-input v-model.number="formData.payChannel" :clearable="true" placeholder="请输入支付渠道" />
</el-form-item>
        <el-form-item label="订单状态:" prop="orderStatus">
    <el-input v-model.number="formData.orderStatus" :clearable="true" placeholder="请输入订单状态" />
</el-form-item>
        <el-form-item label="备注:" prop="remark">
    <el-input v-model="formData.remark" :clearable="true" placeholder="请输入备注" />
</el-form-item>
        <el-form-item label="支付完成时间:" prop="paidAt">
    <el-date-picker v-model="formData.paidAt" type="date" style="width:100%" placeholder="选择日期" :clearable="true" />
</el-form-item>
        <el-form-item label="订单过期时间（待支付超时）:" prop="expiredAt">
    <el-date-picker v-model="formData.expiredAt" type="date" style="width:100%" placeholder="选择日期" :clearable="true" />
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
  createLotOrder,
  updateLotOrder,
  findLotOrder
} from '@/api/lot/lotOrder'

defineOptions({
    name: 'LotOrderForm'
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
            orderNo: '',
            userId: undefined,
            productType: undefined,
            productId: undefined,
            deviceId: '',
            productName: '',
            productPrice: 0,
            payAmount: 0,
            payChannel: undefined,
            orderStatus: undefined,
            remark: '',
            paidAt: new Date(),
            expiredAt: new Date(),
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findLotOrder({ ID: route.query.id })
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
               res = await createLotOrder(formData.value)
               break
             case 'update':
               res = await updateLotOrder(formData.value)
               break
             default:
               res = await createLotOrder(formData.value)
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
