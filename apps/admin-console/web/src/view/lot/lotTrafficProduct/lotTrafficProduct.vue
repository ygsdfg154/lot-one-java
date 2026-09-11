
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
      
            <el-form-item label="产品名称" prop="name">
  <el-input v-model="searchInfo.name" placeholder="搜索条件" />
</el-form-item>
            
            <el-form-item label="是否上架" prop="isActive">
              <el-select v-model="searchInfo.isActive" clearable placeholder="请选择状态">
                <el-option label="上架" :value="1" />
                <el-option label="下架" :value="0" />
              </el-select>
            </el-form-item>

            <el-form-item label="周期类型" prop="periodType">
              <el-select v-model="searchInfo.periodType" clearable placeholder="请选择周期">
                <el-option label="月" :value="1" />
                <el-option label="季" :value="2" />
                <el-option label="年" :value="3" />
                <el-option label="天" :value="4" />
              </el-select>
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

        <el-table-column sortable align="left" label="ID" prop="ID" width="80" />
        
        <el-table-column  align="left" label="日期" prop="CreatedAt" width="180">
            <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        
            <el-table-column align="left" label="产品名称" prop="name" width="120" show-overflow-tooltip />

            <el-table-column align="left" label="展示总额度(MB)" prop="trafficMb" width="150" />

            <el-table-column align="left" label="售价" prop="price" width="100" />

            <el-table-column align="left" label="成本价" prop="costPrice" width="100" />

            <el-table-column align="left" label="换算比率" prop="conversionRatio" width="100" />

            <el-table-column align="left" label="固定额度(MB)" prop="fixedAmount" width="120" />

            <el-table-column align="left" label="原价/划线价" prop="originalPrice" width="120" />

            <el-table-column align="left" label="周期" prop="periodType" width="100">
              <template #default="scope">
                <el-tag v-if="scope.row.periodType === 1" type="warning">月</el-tag>
                <el-tag v-else-if="scope.row.periodType === 2" type="primary">季</el-tag>
                <el-tag v-else-if="scope.row.periodType === 3" type="success">年</el-tag>
                <el-tag v-else-if="scope.row.periodType === 4" type="info">天</el-tag>
                <span v-else>{{ scope.row.periodType }}</span>
              </template>
            </el-table-column>

            <el-table-column align="left" label="有效期类型" prop="validityType" width="120">
              <template #default="scope">
                <el-tag v-if="scope.row.validityType === 1" type="warning">当月有效</el-tag>
                <el-tag v-else-if="scope.row.validityType === 2" type="primary">固定天数</el-tag>
                <span v-else>{{ scope.row.validityType }}</span>
              </template>
            </el-table-column>

            <el-table-column align="left" label="有效期天数" prop="validityDays" width="120" />

            <el-table-column align="left" label="购买说明" prop="purchaseNotes" width="120" show-overflow-tooltip />

            <el-table-column align="left" label="是否上架" prop="isActive" width="120">
              <template #default="scope">
                <el-tag v-if="scope.row.isActive === 1" type="success">上架</el-tag>
                <el-tag v-else type="danger">下架</el-tag>
              </template>
            </el-table-column>

            <el-table-column align="left" label="排序权重（数值越大越靠前）" prop="sortOrder" width="120" />

        <el-table-column align="left" label="操作" fixed="right" :min-width="appStore.operateMinWith">
            <template #default="scope">
            <el-button  type="primary" link class="table-button" @click="getDetails(scope.row)"><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>查看</el-button>
            <el-button  type="primary" link icon="edit" class="table-button" @click="updateLotTrafficProductFunc(scope.row)">编辑</el-button>
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
            <el-form-item label="产品名称:" prop="name">
    <el-input v-model="formData.name" :clearable="true" placeholder="请输入产品名称" />
</el-form-item>
            <el-form-item label="流量大小:" prop="trafficMb">
    <el-input v-model.number="formData.trafficMb" :clearable="true" placeholder="请输入流量大小" />
</el-form-item>
            <el-form-item label="售价:" prop="price">
    <el-input-number v-model="formData.price" style="width:100%" :precision="2" :clearable="true" />
</el-form-item>
            <el-form-item label="原价/划线价:" prop="originalPrice">
    <el-input-number v-model="formData.originalPrice" style="width:100%" :precision="2" :clearable="true" />
</el-form-item>
            <el-form-item label="有效期类型:" prop="validityType">
              <el-select v-model="formData.validityType" clearable placeholder="请选择有效期类型" style="width:100%">
                <el-option label="当月有效" :value="1" />
                <el-option label="固定天数" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="有效期天数:" prop="validityDays">
    <el-input v-model.number="formData.validityDays" :clearable="true" placeholder="请输入有效期天数" />
</el-form-item>
            <el-form-item label="周期类型:" prop="periodType">
              <el-select v-model="formData.periodType" clearable placeholder="请选择周期类型" style="width:100%">
                <el-option label="月" :value="1" />
                <el-option label="季" :value="2" />
                <el-option label="年" :value="3" />
                <el-option label="天" :value="4" />
              </el-select>
            </el-form-item>
            <el-form-item label="成本价:" prop="costPrice">
    <el-input-number v-model="formData.costPrice" style="width:100%" :precision="2" :clearable="true" />
</el-form-item>
            <el-form-item label="换算比率:" prop="conversionRatio">
    <el-input-number v-model="formData.conversionRatio" style="width:100%" :precision="4" :min="0" :clearable="true" />
    <div v-if="formData.conversionRatio > 0 && formData.trafficMb > 0" class="text-gray-400 text-xs mt-1">
      预计真实流量预算 ≈ {{ (formData.trafficMb / formData.conversionRatio).toFixed(1) }} MB
      <span v-if="formData.costPrice > 0">，毛利率 ≈ {{ ((1 - formData.costPrice / formData.price) * 100).toFixed(0) }}%</span>
    </div>
</el-form-item>
            <el-form-item label="固定额度(MB):" prop="fixedAmount">
    <el-input-number v-model="formData.fixedAmount" style="width:100%" :precision="2" :min="0" :clearable="true" />
</el-form-item>
            <el-form-item label="购买说明:" prop="purchaseNotes">
    <el-input v-model="formData.purchaseNotes" :clearable="true" placeholder="请输入购买说明" />
</el-form-item>
            <el-form-item label="是否上架:" prop="isActive">
              <el-select v-model="formData.isActive" clearable placeholder="请选择状态" style="width:100%">
                <el-option label="上架" :value="1" />
                <el-option label="下架" :value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="排序权重（数值越大越靠前）:" prop="sortOrder">
    <el-input v-model.number="formData.sortOrder" :clearable="true" placeholder="请输入排序权重（数值越大越靠前）" />
</el-form-item>
          </el-form>
    </el-drawer>

    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="detailShow" :show-close="true" :before-close="closeDetailShow" title="查看">
            <el-descriptions :column="1" border>
                    <el-descriptions-item label="产品名称">
    {{ detailForm.name }}
</el-descriptions-item>
                    <el-descriptions-item label="展示总额度(MB)">
    {{ detailForm.trafficMb }}
</el-descriptions-item>
                    <el-descriptions-item label="售价">
    {{ detailForm.price }}
</el-descriptions-item>
                    <el-descriptions-item label="成本价">
    {{ detailForm.costPrice || '-' }}
</el-descriptions-item>
                    <el-descriptions-item label="换算比率">
    {{ detailForm.conversionRatio || '-' }}
</el-descriptions-item>
                    <el-descriptions-item label="固定额度(MB)">
    {{ detailForm.fixedAmount || '-' }}
</el-descriptions-item>
                    <el-descriptions-item label="周期">
                        <el-tag v-if="detailForm.periodType === 1" type="warning">月</el-tag>
                        <el-tag v-else-if="detailForm.periodType === 2" type="primary">季</el-tag>
                        <el-tag v-else-if="detailForm.periodType === 3" type="success">年</el-tag>
                        <el-tag v-else-if="detailForm.periodType === 4" type="info">天</el-tag>
                        <span v-else>{{ detailForm.periodType }}</span>
                      </el-descriptions-item>
                    <el-descriptions-item label="原价/划线价">
    {{ detailForm.originalPrice }}
</el-descriptions-item>
                    <el-descriptions-item label="有效期类型">
                        <el-tag v-if="detailForm.validityType === 1" type="warning">当月有效</el-tag>
                        <el-tag v-else-if="detailForm.validityType === 2" type="primary">固定天数</el-tag>
                        <span v-else>{{ detailForm.validityType }}</span>
                      </el-descriptions-item>
                    <el-descriptions-item label="有效期天数">
    {{ detailForm.validityDays }}
</el-descriptions-item>
                    <el-descriptions-item label="购买说明">
    {{ detailForm.purchaseNotes }}
</el-descriptions-item>
                    <el-descriptions-item label="是否上架">
                        <el-tag v-if="detailForm.isActive === 1" type="success">上架</el-tag>
                        <el-tag v-else type="danger">下架</el-tag>
                      </el-descriptions-item>
                    <el-descriptions-item label="排序权重（数值越大越靠前）">
    {{ detailForm.sortOrder }}
</el-descriptions-item>
            </el-descriptions>
        </el-drawer>

  </div>
</template>

<script setup>
import {
  createLotTrafficProduct,
  deleteLotTrafficProduct,
  deleteLotTrafficProductByIds,
  updateLotTrafficProduct,
  findLotTrafficProduct,
  getLotTrafficProductList
} from '@/api/lot/lotTrafficProduct'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict ,filterDataSource, returnArrImg, onDownloadFile } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { useAppStore } from "@/pinia"




defineOptions({
    name: 'LotTrafficProduct'
})

// 提交按钮loading
const btnLoading = ref(false)
const appStore = useAppStore()

// 控制更多查询条件显示/隐藏状态
const showAllQuery = ref(false)

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
            name: '',
            trafficMb: undefined,
            price: 0,
            originalPrice: 0,
            validityType: undefined,
            validityDays: undefined,
            periodType: undefined,
            costPrice: 0,
            conversionRatio: 1.0,
            fixedAmount: 0,
            purchaseNotes: '',
            isActive: undefined,
            sortOrder: undefined,
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
  const table = await getLotTrafficProductList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
            deleteLotTrafficProductFunc(row)
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
      const res = await deleteLotTrafficProductByIds({ IDs })
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
const updateLotTrafficProductFunc = async(row) => {
    const res = await findLotTrafficProduct({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data
        dialogFormVisible.value = true
    }
}


// 删除行
const deleteLotTrafficProductFunc = async (row) => {
    const res = await deleteLotTrafficProduct({ ID: row.ID })
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
    dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
        name: '',
        trafficMb: undefined,
        price: 0,
        originalPrice: 0,
        validityType: undefined,
        validityDays: undefined,
        periodType: undefined,
        costPrice: 0,
        conversionRatio: 1.0,
        fixedAmount: 0,
        purchaseNotes: '',
        isActive: undefined,
        sortOrder: undefined,
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
                  res = await createLotTrafficProduct(formData.value)
                  break
                case 'update':
                  res = await updateLotTrafficProduct(formData.value)
                  break
                default:
                  res = await createLotTrafficProduct(formData.value)
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
  const res = await findLotTrafficProduct({ ID: row.ID })
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
