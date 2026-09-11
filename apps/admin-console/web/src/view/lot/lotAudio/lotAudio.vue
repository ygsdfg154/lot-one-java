<template>
  <div class="gva-table-box">
    <div class="gva-search-box">
      <el-form :inline="true" :model="query" @keyup.enter="onSubmit">
        <el-form-item label="设备编号">
          <el-input v-model="query.deviceId" clearable placeholder="请输入设备编号" />
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="tableData" v-loading="loading" border>
      <el-table-column label="设备编号" prop="deviceId" min-width="140" show-overflow-tooltip />
      <el-table-column label="事件ID" prop="eventId" min-width="160" show-overflow-tooltip />
      <el-table-column label="文件大小" width="110">
        <template #default="{ row }">{{ formatFileSize(row.sizeBytes) }}</template>
      </el-table-column>
      <el-table-column label="上传时间" prop="uploadedAt" min-width="160" />
      <el-table-column label="操作" fixed="right" width="140">
        <template #default="{ row }">
          <el-button v-if="isSafeAudioUrl(row.url)" type="primary" link icon="video-play" @click="openPlayer(row)">播放</el-button>
          <a v-if="isSafeAudioUrl(row.url)" :href="row.url" target="_blank" rel="noopener" style="margin-left: 8px">下载</a>
        </template>
      </el-table-column>
    </el-table>
    <div class="gva-pagination">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="page"
        :page-size="pageSize"
        :page-sizes="[10, 30, 50, 100]"
        :total="total"
        @current-change="val => { page = val; loadRecords() }"
        @size-change="val => { pageSize = val; loadRecords() }"
      />
    </div>

    <el-dialog v-model="playerVisible" title="音频播放" width="480px" destroy-on-close>
      <div v-if="playerRow">
        <p>设备编号:{{ playerRow.deviceId }}</p>
        <p>上传时间:{{ playerRow.uploadedAt }}</p>
        <!-- 原生 audio 控件在窄容器(比如表格单元格)里会被 Chrome 折叠成
             只剩播放键+更多菜单、且播放键点击区域不可靠,所以放到弹窗里给足宽度。 -->
        <audio v-if="isSafeAudioUrl(playerRow.url)" :src="playerRow.url" controls autoplay style="width: 100%" @error="onPlaybackError" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getLotAudioRecords } from '@/api/lot/lotAudio'
import { ElMessage } from 'element-plus'
import { onActivated, onMounted, ref } from 'vue'

defineOptions({ name: 'LotAudio' })

const query = ref({ deviceId: '' })
const timeRange = ref([])
const loading = ref(false)
const tableData = ref([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const playerVisible = ref(false)
const playerRow = ref(null)

const openPlayer = (row) => {
  playerRow.value = row
  playerVisible.value = true
}

const onPlaybackError = () => {
  ElMessage.error('音频加载失败,请检查文件地址是否可访问')
}

// url 来自后端拼接的对象存储直链，这里只信任 http/https，拒绝 javascript:/data: 等
// 伪协议，避免一旦上游拼接逻辑被污染就能通过 <a href>/<audio src> 触发脚本执行。
const isSafeAudioUrl = (url) => typeof url === 'string' && /^https?:\/\//i.test(url)

const clean = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== '' && v !== undefined && v !== null))

const queryParams = () => clean({
  ...query.value,
  startTime: timeRange.value?.[0],
  endTime: timeRange.value?.[1]
})

const formatFileSize = (sizeBytes) => {
  if (sizeBytes === null || sizeBytes === undefined) return '--'
  if (sizeBytes < 1024) return `${sizeBytes} B`
  if (sizeBytes < 1024 * 1024) return `${(sizeBytes / 1024).toFixed(1)} KB`
  return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`
}

const loadRecords = async() => {
  loading.value = true
  try {
    const res = await getLotAudioRecords({ page: page.value, pageSize: pageSize.value, ...queryParams() })
    if (res.code === 0) {
      tableData.value = res.data?.list || []
      total.value = res.data?.total || 0
    }
  } finally {
    loading.value = false
  }
}

const onSubmit = () => {
  page.value = 1
  loadRecords()
}

const onReset = () => {
  query.value = { deviceId: '' }
  timeRange.value = []
  page.value = 1
  loadRecords()
}

onMounted(loadRecords)
onActivated(loadRecords)
</script>
