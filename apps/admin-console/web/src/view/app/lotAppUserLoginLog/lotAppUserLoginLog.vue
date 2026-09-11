
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
      
            <el-form-item label="用户ID" prop="userId">
  <el-input v-model.number="searchInfo.userId" placeholder="搜索条件" />
</el-form-item>
            
            <el-form-item label="登录账号" prop="account">
  <el-input v-model="searchInfo.account" placeholder="搜索条件" />
</el-form-item>
            
            <el-form-item label="登录方式" prop="loginType">
  <el-select v-model="searchInfo.loginType" clearable placeholder="请选择登录方式">
    <el-option label="密码登录" value="password" />
    <el-option label="短信验证码" value="sms" />
    <el-option label="微信登录" value="wechat" />
    <el-option label="Apple登录" value="apple" />
  </el-select>
</el-form-item>
            
            <el-form-item label="结果" prop="status">
  <el-select v-model="searchInfo.status" clearable placeholder="请选择">
    <el-option key="true" label="是" value="true"></el-option>
    <el-option key="false" label="否" value="false"></el-option>
  </el-select>
</el-form-item>
            
            <el-form-item label="登录IP" prop="ip">
  <el-input v-model="searchInfo.ip" placeholder="搜索条件" />
</el-form-item>
            
            <el-form-item label="UA" prop="userAgent">
  <el-input v-model="searchInfo.userAgent" placeholder="搜索条件" />
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
        
            <el-table-column align="left" label="用户ID" prop="userId" width="120" />

            <el-table-column align="left" label="登录账号" prop="account" width="120" />

            <el-table-column align="left" label="登录方式" prop="loginType" width="120">
    <template #default="scope">{{
          scope.row.loginType === 'password' ? '密码登录' :
          scope.row.loginType === 'sms' ? '短信验证码' :
          scope.row.loginType === 'wechat' ? '微信登录' :
          scope.row.loginType === 'apple' ? 'Apple登录' : scope.row.loginType}}</template>
</el-table-column>

            <el-table-column align="left" label="结果" prop="status" width="120">
    <template #default="scope">{{ formatBoolean(scope.row.status) }}</template>
</el-table-column>
            <el-table-column align="left" label="失败原因/备注" prop="msg" width="120" />

            <el-table-column align="left" label="登录IP" prop="ip" width="120" />

            <el-table-column align="left" label="UA" prop="userAgent" min-width="180" show-overflow-tooltip />

        <el-table-column align="left" label="操作" fixed="right" :min-width="appStore.operateMinWith">
            <template #default="scope">
            <el-button  type="primary" link class="table-button" @click="getDetails(scope.row)"><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>查看</el-button>
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


    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="detailShow" :show-close="true" :before-close="closeDetailShow" title="查看">
            <el-descriptions :column="1" border>
                    <el-descriptions-item label="用户ID">
    {{ detailForm.userId }}
</el-descriptions-item>
                    <el-descriptions-item label="登录账号">
    {{ detailForm.account }}
</el-descriptions-item>
                    <el-descriptions-item label="登录方式">
    {{
    detailForm.loginType === 'password' ? '密码登录' :
    detailForm.loginType === 'sms' ? '短信验证码' :
    detailForm.loginType === 'wechat' ? '微信登录' :
    detailForm.loginType === 'apple' ? 'Apple登录' : detailForm.loginType
    }}
</el-descriptions-item>
                    <el-descriptions-item label="结果">
    {{ detailForm.status === 1 ? '成功' : '失败' }}
</el-descriptions-item>
                    <el-descriptions-item label="失败原因/备注">
    {{ detailForm.msg }}
</el-descriptions-item>
                    <el-descriptions-item label="登录IP">
    {{ detailForm.ip }}
</el-descriptions-item>
                    <el-descriptions-item label="UA">
    {{ detailForm.userAgent }}
</el-descriptions-item>
            </el-descriptions>
        </el-drawer>

  </div>
</template>

<script setup>
import {
  findLotAppUserLoginLog,
  getLotAppUserLoginLogList
} from '@/api/app/lotAppUserLoginLog'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict ,filterDataSource, returnArrImg, onDownloadFile } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { useAppStore } from "@/pinia"




defineOptions({
    name: 'LotAppUserLoginLog'
})

// 提交按钮loading
const appStore = useAppStore()

// 控制更多查询条件显示/隐藏状态
const showAllQuery = ref(false)




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
    if (searchInfo.value.status === ""){
        searchInfo.value.status=null
    }
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
  const table = await getLotAppUserLoginLogList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
  const res = await findLotAppUserLoginLog({ ID: row.ID })
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
