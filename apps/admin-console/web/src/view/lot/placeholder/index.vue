<template>
  <div class="gva-placeholder">
    <div class="gva-placeholder-content">
      <el-icon class="gva-placeholder-icon" :size="80"><Setting /></el-icon>
      <h2>{{ pageTitle || '功能开发中' }}</h2>
      <p>此页面正在建设中，敬请期待。</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Setting } from '@element-plus/icons-vue'

const route = useRoute()
const pageTitle = computed(() => route.meta?.title || '')
</script>

<style scoped lang="scss">
.gva-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  &-content {
    text-align: center;
    color: #909399;
    h2 { margin: 20px 0 10px; font-size: 24px; font-weight: 500; }
    p { font-size: 14px; }
  }
  &-icon { color: #c0c4cc; }
}
</style>
