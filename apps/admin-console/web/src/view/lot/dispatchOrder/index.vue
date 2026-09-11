<template>
  <div class="dispatch-order">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <span class="card-header">扫码输入</span>
          </template>
          <div class="scan-area">
            <el-input
              ref="scanInputRef"
              v-model="scanCode"
              placeholder="请使用扫码枪扫描设备IMEI..."
              size="large"
              clearable
              @keyup.enter="onScanSubmit"
            >
              <template #prefix>
                <el-icon><Scan /></el-icon>
              </template>
            </el-input>
            <el-button type="primary" size="large" @click="onScanSubmit" style="margin-top: 12px; width: 100%">
              查询订单
            </el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card v-if="orderInfo" shadow="hover">
          <template #header>
            <span class="card-header">订单信息</span>
          </template>
          <el-descriptions :column="1" border size="large">
            <el-descriptions-item label="订单号">
              <el-tag>{{ orderInfo.orderNo }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="设备IMEI">{{ orderInfo.deviceId }}</el-descriptions-item>
            <el-descriptions-item label="设备名称">{{ orderInfo.deviceName }}</el-descriptions-item>
            <el-descriptions-item label="状态">
              <el-tag :type="statusType(orderInfo.orderStatus)">{{ orderInfo.orderStatusText }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="快递单号">{{ orderInfo.trackingNo || '-' }}</el-descriptions-item>
            <el-descriptions-item label="购买人">{{ orderInfo.buyerName || '-' }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ orderInfo.buyerPhone || '-' }}</el-descriptions-item>
            <el-descriptions-item label="收货地址">{{ orderInfo.shippingAddress || '-' }}</el-descriptions-item>
            <el-descriptions-item label="金额">{{ formatMoney(orderInfo.payAmount) }}</el-descriptions-item>
          </el-descriptions>

          <div style="margin-top: 16px; text-align: center">
            <el-button type="success" size="large" :disabled="orderInfo.orderStatus !== 1" @click="showShopDialog">
              确认发货
            </el-button>
          </div>
        </el-card>

        <el-card v-else shadow="hover">
          <template #header><span class="card-header">订单信息</span></template>
          <el-empty description="请先扫描设备IMEI查询待发货订单" />
        </el-card>
      </el-col>
    </el-row>

    <!-- 店铺选择弹窗 -->
    <ShopSelectDialog
      v-model="shopDialogVisible"
      @confirm="onShopConfirm"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { getPendingOrder, dispatchOrder } from '@/api/lot/lotOrder'
import ShopSelectDialog from './components/ShopSelectDialog.vue'

defineOptions({ name: 'DispatchOrder' })

const scanInputRef = ref()
const scanCode = ref('')
const orderInfo = ref(null)
const shopDialogVisible = ref(false)

const statusType = (v) => ({ 1: 'warning', 5: 'success', 6: 'info', 7: 'danger' }[v] || 'info')
const formatMoney = (v) => (v || v === 0) ? `￥${Number(v).toFixed(2)}` : '-'

const onScanSubmit = async () => {
  const code = scanCode.value.trim()
  if (!code) {
    ElMessage.warning('请输入设备IMEI')
    return
  }
  const res = await getPendingOrder(code)
  if (res.code === 0 && res.data) {
    orderInfo.value = res.data
  } else {
    orderInfo.value = null
    ElMessage.warning('未找到该设备的待发货订单')
  }
}

const showShopDialog = () => {
  if (!orderInfo.value || orderInfo.value.orderStatus !== 1) {
    ElMessage.warning('当前订单不是待发货状态')
    return
  }
  shopDialogVisible.value = true
}

const onShopConfirm = async (shopId) => {
  shopDialogVisible.value = false
  const res = await dispatchOrder({
    orderId: orderInfo.value.id,
    deviceId: orderInfo.value.deviceId,
    shopId
  })
  if (res.code === 0) {
    ElMessage.success('发货成功')
    orderInfo.value = null
    scanCode.value = ''
  }
}

onMounted(() => {
  nextTick(() => { scanInputRef.value?.focus() })
})
</script>

<style scoped>
.dispatch-order {
  padding: 4px;
}
.card-header {
  font-weight: bold;
}
.scan-area {
  padding: 24px 0;
  text-align: center;
}
</style>
