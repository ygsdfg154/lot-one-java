
<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
      <el-form-item label="创建日期" prop="createdAtRange">
      <template #label>
        <span>
          创建日期
          <el-tooltip content="搜索范围是开始日期（包含）至结束日期（不包含）">
            <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
        </span>
      </template>

      <el-date-picker
            v-model="searchInfo.createdAtRange"
            class="!w-380px"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
       </el-form-item>
      

        <template v-if="showAllQuery">
          <!-- 将需要控制显示状态的查询条件添加到此范围内 -->
        </template>

        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
          <el-button icon="refresh" @click="onReset">重置</el-button>
          <el-button link type="primary" icon="arrow-down" @click="showAllQuery=true" v-if="!showAllQuery">展开</el-button>
          <el-button link type="primary" icon="arrow-up" @click="showAllQuery=false" v-else>收起</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
        <div class="gva-btn-list">
            <el-button  type="primary" icon="plus" @click="openDialog()">新增</el-button>
            <el-button  icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="onDelete">删除</el-button>
            
        </div>
        <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
        >
        <el-table-column type="selection" width="55" />
        
        <el-table-column sortable align="left" label="日期" prop="CreatedAt" width="180">
            <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        
            <el-table-column align="left" label="告警编码" prop="alarmCode" width="120" show-overflow-tooltip/>

            <el-table-column align="left" label="告警名称" prop="alarmName" width="120" show-overflow-tooltip/>

            <el-table-column align="left" label="告警类型" width="120" show-overflow-tooltip>
              <template #default="scope">{{ getAlarmTypeText(scope.row.alarmType) }}</template>
            </el-table-column>

            <el-table-column align="left" label="告警描述" prop="alarmDesc" width="120" show-overflow-tooltip/>

            <el-table-column align="left" label="推送类型" width="120" show-overflow-tooltip>
              <template #default="scope">{{ getPushTypeText(scope.row.pushType) }}</template>
            </el-table-column>

            <el-table-column align="left" label="是否有告警值" width="110">
              <template #default="scope">
                <el-switch v-model="scope.row.isAlarmValue" :active-value="0" :inactive-value="1" active-text="是" inactive-text="否" inline-prompt disabled />
              </template>
            </el-table-column>

            <el-table-column align="left" label="默认告警值" prop="defaultAlarmValue" width="120" />

        <el-table-column align="left" label="操作" fixed="right" :min-width="appStore.operateMinWith">
            <template #default="scope">
            <el-button  type="primary" link class="table-button" @click="getDetails(scope.row)"><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>查看</el-button>
            <el-button  type="primary" link icon="edit" class="table-button" @click="updateLotAlarmRuleFunc(scope.row)">编辑</el-button>
            <el-button   type="primary" link icon="delete" @click="deleteRow(scope.row)">删除</el-button>
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
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            />
        </div>
    </div>
    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="dialogFormVisible" :show-close="false" :before-close="closeDialog">
       <template #header>
              <div class="flex justify-between items-center">
                <span class="text-lg">{{type==='create'?'新增':'编辑'}}</span>
                <div>
                  <el-button :loading="btnLoading" type="primary" @click="enterDialog">确 定</el-button>
                  <el-button @click="closeDialog">取 消</el-button>
                </div>
              </div>
            </template>

          <el-form :model="formData" label-position="top" ref="elFormRef" :rules="rule" label-width="80px">
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
            <el-form-item label="告警描述:" prop="alarmDesc">
    <el-input v-model="formData.alarmDesc" :clearable="true" placeholder="请输入告警描述" />
</el-form-item>
            <el-form-item label="推送类型:" prop="pushType">
    <el-select v-model="formData.pushType" clearable filterable placeholder="请选择推送类型">
      <el-option v-for="item in pushTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</el-form-item>
            <el-form-item label="是否有告警值:" prop="isAlarmValue">
    <el-switch v-model="formData.isAlarmValue" :active-value="0" :inactive-value="1" active-text="是" inactive-text="否" />
</el-form-item>
            <template v-if="formData.isAlarmValue === 0">
              <el-form-item label="默认告警值:" prop="defaultAlarmValue">
                <el-input v-model="formData.defaultAlarmValue" :clearable="true" placeholder="请输入默认告警值" />
              </el-form-item>
              <el-form-item label="默认告警单位:" prop="alarmValueUnit">
                <el-input v-model="formData.alarmValueUnit" :clearable="true" placeholder="请输入默认告警单位" />
              </el-form-item>
            </template>
          </el-form>
    </el-drawer>

    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="detailShow" :show-close="true" :before-close="closeDetailShow" title="查看">
            <el-descriptions :column="1" border>
                    <el-descriptions-item label="告警编码">
    {{ detailForm.alarmCode }}
</el-descriptions-item>
                    <el-descriptions-item label="告警名称">
    {{ detailForm.alarmName }}
</el-descriptions-item>
                    <el-descriptions-item label="告警类型">
    {{ getAlarmTypeText(detailForm.alarmType) }}
</el-descriptions-item>
                    <el-descriptions-item label="告警描述">
    {{ detailForm.alarmDesc }}
</el-descriptions-item>
                    <el-descriptions-item label="推送类型">
    {{ getPushTypeText(detailForm.pushType) }}
</el-descriptions-item>
                    <el-descriptions-item label="是否有告警值">
    {{ detailForm.isAlarmValue === 0 ? '是' : '否' }}
</el-descriptions-item>
                    <el-descriptions-item label="默认告警值">
    {{ detailForm.defaultAlarmValue }}
</el-descriptions-item>
                    <el-descriptions-item label="默认告警单位">
    {{ detailForm.alarmValueUnit }}
</el-descriptions-item>
            </el-descriptions>
        </el-drawer>

  </div>
</template>

<script setup>
import {
  createLotAlarmRule,
  deleteLotAlarmRule,
  deleteLotAlarmRuleByIds,
  updateLotAlarmRule,
  findLotAlarmRule,
  getLotAlarmRuleList
} from '@/api/lot/lotAlarmRule'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive, watch } from 'vue'
import { useRouteQueryValue } from '@/hooks/useRouteQuery'
import { useAppStore } from "@/pinia"

const alarmTypeOptions = ref([])
const pushTypeOptions = ref([])
const getAlarmTypeText = (val) => {
  const option = alarmTypeOptions.value.find(item => String(item.value) === String(val))
  return option?.label || val || '-'
}
const getPushTypeText = (val) => {
  const option = pushTypeOptions.value.find(item => String(item.value) === String(val))
  return option?.label || val || '-'
}




defineOptions({
    name: 'LotAlarmRule'
})

// 提交按钮loading
const btnLoading = ref(false)
const appStore = useAppStore()

// 从URL读取产品ID（从产品列表跳转过来）
const queryProductId = useRouteQueryValue('product_id', v => parseInt(v))

// 控制更多查询条件显示/隐藏状态
const showAllQuery = ref(false)

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
            productId: queryProductId || 0,
            alarmCode: '',
            alarmName: '',
            alarmType: '',
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
const elSearchFormRef = ref()

// 切换到"否"时清空默认告警值和默认告警单位
watch(() => formData.value.isAlarmValue, (val) => {
  if (val !== 0) {
    formData.value.defaultAlarmValue = ''
    formData.value.alarmValueUnit = ''
  }
})

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({
  productId: queryProductId || undefined,
})
// 重置
const onReset = () => {
  searchInfo.value = { productId: queryProductId || undefined }
  getTableData()
}

// 搜索
const onSubmit = () => {
  elSearchFormRef.value?.validate(async(valid) => {
    if (!valid) return
    page.value = 1
    getTableData()
  })
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

// 修改页面容量
const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {
  const table = await getLotAlarmRuleList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async () =>{
  const results = await Promise.allSettled([
    getDictFunc('alarm_type'),
    getDictFunc('push_type')
  ])
  const [alarm, push] = results.map(r => r.status === 'fulfilled' ? r.value : null)
  if (alarm && alarm.length) alarmTypeOptions.value = alarm
  if (push && push.length) pushTypeOptions.value = push
}

// 获取需要的字典 可能为空 按需保留
setOptions()


// 多选数据
const multipleSelection = ref([])
// 多选
const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

// 删除行
const deleteRow = (row) => {
    ElMessageBox.confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
            deleteLotAlarmRuleFunc(row)
        })
    }

// 多选删除
const onDelete = async() => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async() => {
      const IDs = []
      if (multipleSelection.value.length === 0) {
        ElMessage({
          type: 'warning',
          message: '请选择要删除的数据'
        })
        return
      }
      multipleSelection.value &&
        multipleSelection.value.map(item => {
          IDs.push(item.ID)
        })
      const res = await deleteLotAlarmRuleByIds({ IDs })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        if (tableData.value.length === IDs.length && page.value > 1) {
          page.value--
        }
        getTableData()
      }
      })
    }

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updateLotAlarmRuleFunc = async(row) => {
    const res = await findLotAlarmRule({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data
        dialogFormVisible.value = true
    }
}


// 删除行
const deleteLotAlarmRuleFunc = async (row) => {
    const res = await deleteLotAlarmRule({ ID: row.ID })
    if (res.code === 0) {
        ElMessage({
                type: 'success',
                message: '删除成功'
            })
            if (tableData.value.length === 1 && page.value > 1) {
            page.value--
        }
        getTableData()
    }
}

// 弹窗控制标记
const dialogFormVisible = ref(false)

// 打开弹窗
const openDialog = () => {
    type.value = 'create'
    formData.value = {
        productId: queryProductId || 0,
        alarmCode: '',
        alarmName: '',
        alarmType: '',
        alarmValueUnit: '',
        alarmDesc: '',
        pushType: '',
        isAlarmValue: 0,
        defaultAlarmValue: '',
    }
    dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
        productId: queryProductId || 0,
        alarmCode: '',
        alarmName: '',
        alarmType: '',
        alarmValueUnit: '',
        alarmDesc: '',
        pushType: '',
        isAlarmValue: 0,
        defaultAlarmValue: '',
        }
}
// 弹窗确定
const enterDialog = async () => {
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
                closeDialog()
                getTableData()
              }
      })
}

const detailForm = ref({})

// 查看详情控制标记
const detailShow = ref(false)


// 打开详情弹窗
const openDetailShow = () => {
  detailShow.value = true
}


// 打开详情
const getDetails = async (row) => {
  // 打开弹窗
  const res = await findLotAlarmRule({ ID: row.ID })
  if (res.code === 0) {
    detailForm.value = res.data
    openDetailShow()
  }
}


// 关闭详情弹窗
const closeDetailShow = () => {
  detailShow.value = false
  detailForm.value = {}
}


</script>

<style>

</style>
