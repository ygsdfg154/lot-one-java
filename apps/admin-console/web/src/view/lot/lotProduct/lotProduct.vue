
<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="elSearchFormRef" :inline="true" :model="searchInfo" class="demo-form-inline" @keyup.enter="onSubmit">
        <el-form-item label="产品编码" prop="code">
          <el-input v-model="searchInfo.code" :clearable="true" placeholder="请输入产品编码" />
        </el-form-item>
        <el-form-item label="产品分类" prop="productCategoryType">
          <el-select v-model="searchInfo.productCategoryType" clearable filterable placeholder="请选择产品分类">
            <el-option v-for="item in productCategoryOptions" :key="item.value" :label="item.label" :value="Number(item.value)" />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词" prop="keyword">
      <el-input v-model="searchInfo.keyword" :clearable="true" placeholder="请输入产品编码/备注关键词" />
    </el-form-item>
        <template v-if="showAllQuery">
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
        
        <el-table-column align="left" label="序号" type="index" width="60" />

            <el-table-column align="left" label="产品编号" prop="code" width="150" />

            <el-table-column align="left" label="接入协议" prop="protocol" width="100">
              <template #default="scope">{{ scope.row.protocol || '-' }}</template>
            </el-table-column>

            <el-table-column align="left" label="产品分类" width="100">
              <template #default="scope">{{ getProductCategoryText(scope.row.productCategoryType) }}</template>
            </el-table-column>

            <el-table-column align="left" label="产品类型" width="100" show-overflow-tooltip>
          <template #default="scope">{{ getProductTypeText(scope.row.productType) }}</template>
        </el-table-column>

            <el-table-column sortable align="left" label="创建时间" prop="CreatedAt" width="180">
              <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
            </el-table-column>
            
            <el-table-column sortable align="left" label="更新时间" prop="UpdatedAt" width="180">
              <template #default="scope">{{ formatDate(scope.row.UpdatedAt) }}</template>
            </el-table-column>

            <el-table-column align="left" label="备注" prop="remark" min-width="150" show-overflow-tooltip />

        <el-table-column align="left" label="操作" fixed="right" min-width="300">
  <template #default="scope">
    <div class="flex flex-nowrap items-center gap-1">
      <el-button type="primary" link icon="edit" class="flex-shrink-0" @click="updateLotProductFunc(scope.row)">编辑</el-button>
      <el-button type="primary" link class="flex-shrink-0" @click="toAlarmConfig(scope.row)">告警配置</el-button>
      <el-button type="primary" link class="flex-shrink-0" @click="toCmdList(scope.row)">指令配置</el-button>
      <el-button type="primary" link class="flex-shrink-0" @click="getDetails(scope.row)">查看</el-button>
      <el-button type="primary" link icon="delete" class="flex-shrink-0" @click="deleteRow(scope.row)">删除</el-button>
    </div>
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
            <el-form-item label="产品编码:" prop="code">
    <el-input v-model="formData.code" :clearable="true" placeholder="请输入产品编码" />
</el-form-item>
            <el-form-item label="接入协议:" prop="protocol">
    <el-select v-model="formData.protocol" clearable filterable placeholder="请选择接入协议">
      <el-option v-for="item in protocolOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</el-form-item>
            <el-form-item label="产品分类:" prop="productCategoryType">
    <el-select v-model="formData.productCategoryType" clearable filterable placeholder="请选择产品分类">
      <el-option v-for="item in productCategoryOptions" :key="item.value" :label="item.label" :value="Number(item.value)" />
    </el-select>
</el-form-item>
            <el-form-item label="备注:" prop="remark">
    <el-input v-model="formData.remark" :clearable="true" placeholder="请输入备注" />
</el-form-item>
            <el-form-item label="定位方式:" prop="posType">
    <el-select v-model="posTypeArr" multiple clearable filterable placeholder="请选择定位方式" @change="onPosTypeChange">
      <el-option v-for="item in posTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</el-form-item>
            <el-form-item label="产品配置:" prop="config">
    // 此字段为json结构，可以前端自行控制展示和数据绑定模式 需绑定json的key为 formData.config 后端会按照json的类型进行存取
    {{ formData.config }}
</el-form-item>
            <el-form-item label="客服链接:" prop="serviceLink">
    <el-input v-model="formData.serviceLink" :clearable="true" placeholder="请输入客服链接" />
</el-form-item>
            <el-form-item label="产品类型:" prop="productType">
    <el-select v-model="formData.productType" clearable filterable placeholder="请选择产品类型">
      <el-option v-for="item in productTypeOptions" :key="item.value" :label="item.label" :value="Number(item.value)" />
    </el-select>
</el-form-item>
          </el-form>
    </el-drawer>

    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="detailShow" :show-close="true" :before-close="closeDetailShow" title="查看">
            <el-descriptions :column="1" border>
                    <el-descriptions-item label="产品编码">
    {{ detailForm.code }}
</el-descriptions-item>
                    <el-descriptions-item label="产品分类">
    {{ getProductCategoryText(detailForm.productCategoryType) }}
</el-descriptions-item>
                    <el-descriptions-item label="备注">
    {{ detailForm.remark }}
</el-descriptions-item>
                    <el-descriptions-item label="定位方式">
    {{ getPosTypeText(detailForm.posType) }}
</el-descriptions-item>
                    <el-descriptions-item label="产品配置">
    {{ detailForm.config }}
</el-descriptions-item>
                    <el-descriptions-item label="客服链接">
    {{ detailForm.serviceLink }}
</el-descriptions-item>
                    <el-descriptions-item label="产品类型">
    {{ getProductTypeText(detailForm.productType) }}
</el-descriptions-item>
            </el-descriptions>
        </el-drawer>

  </div>
</template>

<script setup>
import {
  createLotProduct,
  deleteLotProduct,
  deleteLotProductByIds,
  updateLotProduct,
  findLotProduct,
  getLotProductList
} from '@/api/lot/lotProduct'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict ,filterDataSource, returnArrImg, onDownloadFile } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from "@/pinia"

const productCategoryOptions = ref([])
const posTypeOptions = ref([])
const productTypeOptions = ref([])
const getProductCategoryText = (val) => {
  const option = productCategoryOptions.value.find(item => String(item.value) === String(val))
  return option?.label || val || '-'
}
const getPosTypeText = (val) => {
  const option = posTypeOptions.value.find(item => String(item.value) === String(val))
  return option?.label || val || '-'
}
const getProductTypeText = (val) => {
  const option = productTypeOptions.value.find(item => String(item.value) === String(val))
  return option?.label || val || '-'
}

// 定位方式多选
const posTypeArr = ref([])
const onPosTypeChange = (vals) => {
  formData.value.posType = (vals || []).join(',')
}




defineOptions({
    name: 'LotProduct'
})

// 提交按钮loading
const btnLoading = ref(false)
const appStore = useAppStore()
const router = useRouter()

// 跳转到告警规则模板页
const toAlarmConfig = (row) => {
  router.push({ name: 'alarmRule', query: { product_id: row.ID } })
}
// 跳转到产品指令配置页
const toCmdList = (row) => {
  router.push({ name: 'productCmd', query: { product_id: row.ID } })
}

// 控制更多查询条件显示/隐藏状态
const showAllQuery = ref(false)

// 自动化生成的字典（可能为空）以及字段
// protocol 取值对齐 contracts/enums/registry.yaml 的 ProtocolId，
// 决定该产品能下发哪些指令（support-matrix.yaml 是按协议声明支持性的）。
const protocolOptions = [
  { label: 'HLXT（鸿联信通 3G）', value: 'HLXT' },
  { label: 'JT808（车网 JT/T 808）', value: 'JT808' },
]

const formData = ref({
            code: '',
            protocol: '',
            productCategoryType: 0,
            remark: '',
            posType: '',
            config: {},
            serviceLink: '',
            productType: 0,
        })



// 验证规则
const rule = reactive({
})

const elFormRef = ref()
const elSearchFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})
// 重置
const onReset = () => {
  searchInfo.value = {}
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
  const table = await getLotProductList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// ============== 表格控制部分结束 ===============

// 获取需要的字典
const setOptions = async () =>{
  const results = await Promise.allSettled([
    getDictFunc('product_category'),
    getDictFunc('product_positioning'),
    getDictFunc('product_type')
  ])
  const [cat, pos, type] = results.map(r => r.status === 'fulfilled' ? r.value : null)
  if (cat && cat.length) productCategoryOptions.value = cat
  if (pos && pos.length) posTypeOptions.value = pos
  if (type && type.length) productTypeOptions.value = type
}

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
            deleteLotProductFunc(row)
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
      const res = await deleteLotProductByIds({ IDs })
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
const updateLotProductFunc = async(row) => {
    const res = await findLotProduct({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data
        posTypeArr.value = (res.data.posType || '').split(',',).filter(Boolean)
        dialogFormVisible.value = true
    }
}


// 删除行
const deleteLotProductFunc = async (row) => {
    const res = await deleteLotProduct({ ID: row.ID })
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
    posTypeArr.value = []
    dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
    dialogFormVisible.value = false
    posTypeArr.value = []
    formData.value = {
        code: '',
        protocol: '',
        productCategoryType: 0,
        remark: '',
        posType: '',
        config: {},
        serviceLink: '',
        productType: 0,
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
                  res = await createLotProduct(formData.value)
                  break
                case 'update':
                  res = await updateLotProduct(formData.value)
                  break
                default:
                  res = await createLotProduct(formData.value)
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
  const res = await findLotProduct({ ID: row.ID })
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
