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

            <el-form-item label="手机号" prop="phone">
  <el-input v-model="searchInfo.phone" placeholder="搜索条件" />
</el-form-item>

            <el-form-item label="昵称" prop="nickname">
  <el-input v-model="searchInfo.nickname" placeholder="搜索条件" />
</el-form-item>


        <template v-if="showAllQuery">
          <el-form-item label="状态" prop="status">
            <el-select v-model="searchInfo.status" placeholder="请选择" clearable style="width:140px">
              <el-option label="正常" :value="true" />
              <el-option label="禁用" :value="false" />
            </el-select>
          </el-form-item>
          <el-form-item label="注册渠道" prop="registerChannel">
            <el-select v-model="searchInfo.registerChannel" placeholder="请选择" clearable style="width:140px">
              <el-option v-for="item in channelOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-tree-select v-model="searchInfo.sex" placeholder="请选择" :data="genderOptions" style="width:140px" :clearable="true" check-strictly />
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

        <el-table-column sortable align="left" label="日期" prop="CreatedAt" width="180">
            <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>

            <el-table-column align="left" label="手机号" prop="phone" width="120" />

            <el-table-column align="left" label="昵称" prop="nickname" width="120" />

            <!-- 修复6：头像列 - 从文本URL改为图像预览 -->
            <el-table-column align="center" label="头像" prop="avatar" width="80">
                <template #default="scope">
                    <el-image
                        :src="scope.row.avatar || defaultAvatar"
                        style="width: 40px; height: 40px; border-radius: 50%; cursor: pointer;"
                        fit="cover"
                        :preview-src-list="[scope.row.avatar].filter(Boolean)"
                    >
                        <template #error>
                            <el-image :src="defaultAvatar" style="width: 40px; height: 40px; border-radius: 50%;" fit="cover" />
                        </template>
                    </el-image>
                </template>
            </el-table-column>

            <el-table-column align="left" label="性别" prop="sex" width="120">
    <template #default="scope">
    {{ filterDict(scope.row.sex,genderOptions) }}
    </template>
</el-table-column>
            <el-table-column align="left" label="状态" prop="status" width="120">
                <template #default="scope">
                    <el-tag :type="scope.row.status ? 'success' : 'danger'" effect="plain">
                        {{ scope.row.status ? '正常' : '禁用' }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column align="left" label="注册渠道" prop="registerChannel" width="120">
                <template #default="scope">
                    <el-tag size="small" type="info" effect="plain">{{ getChannelLabel(scope.row.registerChannel) }}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="left" label="注册IP" prop="registerIp" width="120" show-overflow-tooltip />

            <el-table-column align="left" label="最后登录IP" prop="lastLoginIp" width="120" show-overflow-tooltip />

            <el-table-column align="left" label="最后登录时间" prop="lastLoginTime" width="180">
   <template #default="scope">{{ formatDate(scope.row.lastLoginTime) }}</template>
</el-table-column>
            <el-table-column align="left" label="当前绑定设备数" prop="deviceCount" width="125" />

        <el-table-column align="left" label="操作" fixed="right" :min-width="305">
            <template #default="scope">
            <el-button  type="primary" link class="table-button" @click="getDetails(scope.row)"><el-icon style="margin-right: 5px"><InfoFilled /></el-icon>查看</el-button>
            <el-button  type="primary" link icon="edit" class="table-button" @click="updateLotAppUserFunc(scope.row)">编辑</el-button>
            <el-button  type="primary" link icon="magic-stick" class="table-button" @click="resetPasswordFunc(scope.row)">重置密码</el-button>
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

    <!-- 重置密码对话框 -->
    <el-dialog
      v-model="resetPwdDialog"
      title="重置密码"
      width="500px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form :model="resetPwdInfo" ref="resetPwdForm" label-width="100px">
        <el-form-item label="用户手机号">
          <el-input v-model="resetPwdInfo.phone" disabled />
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="resetPwdInfo.nickname" disabled />
        </el-form-item>
        <el-form-item label="新密码">
          <div class="flex w-full">
            <el-input class="flex-1" v-model="resetPwdInfo.password" placeholder="请输入新密码" show-password />
            <el-button type="primary" @click="generateRandomPassword" style="margin-left: 10px">
              生成随机密码
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeResetPwdDialog">取 消</el-button>
          <el-button type="primary" @click="confirmResetPassword">确 定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 修复6：编辑/新增弹窗 - 头像改为上传组件 -->
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
            <el-form-item label="手机号:" prop="phone">
    <el-input v-model="formData.phone" :clearable="true" placeholder="请输入手机号" />
</el-form-item>
            <el-form-item label="昵称:" prop="nickname">
    <el-input v-model="formData.nickname" :clearable="true" placeholder="请输入昵称" />
</el-form-item>
            <!-- 头像上传组件 -->
            <el-form-item label="头像:" prop="avatar">
                <div class="avatar-upload-wrapper">
                    <el-upload
                        class="avatar-uploader"
                        :action="uploadAction"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-error="handleUploadError"
                        :headers="uploadHeaders"
                        accept="image/*"
                        name="file"
                    >
                        <div v-if="formData.avatar" class="avatar-preview-container">
                            <img :src="formData.avatar" class="avatar-preview-img" />
                            <div class="avatar-overlay" @click.stop>
                                <el-button type="danger" circle size="small" class="avatar-delete-btn" @click="removeAvatar">
                                    <el-icon><Delete /></el-icon>
                                </el-button>
                            </div>
                        </div>
                        <div v-else class="avatar-upload-placeholder">
                            <el-icon class="avatar-upload-icon"><Plus /></el-icon>
                            <span class="avatar-upload-text">点击上传</span>
                        </div>
                    </el-upload>
                    <div class="avatar-tip">支持 jpg、png 格式，大小不超过 2MB</div>
                    <!-- 备选：手动输入URL -->
                    <el-input
                        v-model="formData.avatar"
                        :clearable="true"
                        placeholder="或直接输入图片URL"
                        class="avatar-url-input"
                        size="small"
                    />
                </div>
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
    <el-tree-select v-model="formData.sex" placeholder="请选择性别" :data="genderOptions" style="width:100%" filterable :clearable="true" check-strictly></el-tree-select>
</el-form-item>
            <el-form-item label="状态:" prop="status">
                <el-select v-model="formData.status" placeholder="请选择用户状态" style="width:100%" clearable>
                    <el-option label="正常" :value="true" />
                    <el-option label="禁用" :value="false" />
                </el-select>
            </el-form-item>
            <el-form-item label="注册渠道:" prop="registerChannel">
                <el-select v-model="formData.registerChannel" placeholder="请选择注册渠道" style="width:100%" clearable>
                    <el-option v-for="item in channelOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="当前绑定设备数:" prop="deviceCount">
    <el-input v-model.number="formData.deviceCount" :clearable="true" placeholder="请输入当前绑定设备数" />
</el-form-item>
          </el-form>
    </el-drawer>

    <!-- 修复3、4、5：查看详情弹窗 - 性别转换、时间格式化、渠道空值保护 -->
    <el-drawer destroy-on-close :size="appStore.drawerSize" v-model="detailShow" :show-close="true" :before-close="closeDetailShow" title="查看">
            <el-descriptions :column="1" border>
                    <el-descriptions-item label="手机号">
    {{ detailForm.phone }}
</el-descriptions-item>
                    <el-descriptions-item label="昵称">
    {{ detailForm.nickname }}
</el-descriptions-item>
                    <el-descriptions-item label="头像">
                        <el-image
                            :src="detailForm.avatar || defaultAvatar"
                            style="width: 80px; height: 80px; border-radius: 50%;"
                            fit="cover"
                            :preview-src-list="[detailForm.avatar].filter(Boolean)"
                        >
                            <template #error>
                                <el-image :src="defaultAvatar" style="width: 80px; height: 80px; border-radius: 50%;" fit="cover" />
                            </template>
                        </el-image>
                    </el-descriptions-item>
                    <el-descriptions-item label="性别">
                        <!-- 修复3：使用 filterDict 转换性别 -->
                        {{ filterDict(detailForm.sex, genderOptions) }}
                    </el-descriptions-item>
                    <el-descriptions-item label="状态">
                      <el-tag :type="detailForm.status ? 'success' : 'danger'" effect="plain">
                            {{ detailForm.status ? '正常' : '禁用' }}
                        </el-tag>
</el-descriptions-item>
                    <el-descriptions-item label="注册渠道">
                        <!-- 修复5：getChannelLabel 已增加空值保护 -->
                        <el-tag size="small" type="info" effect="plain">{{ getChannelLabel(detailForm.registerChannel) }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="注册IP">
    {{ detailForm.registerIp }}
</el-descriptions-item>
                    <el-descriptions-item label="最后登录IP">
    {{ detailForm.lastLoginIp }}
</el-descriptions-item>
                    <el-descriptions-item label="最后登录时间">
                        <!-- 修复4：使用 formatDate 格式化时间 -->
                        {{ formatDate(detailForm.lastLoginTime) }}
                    </el-descriptions-item>
                    <el-descriptions-item label="当前绑定设备数">
    {{ detailForm.deviceCount }}
</el-descriptions-item>
            </el-descriptions>
        </el-drawer>

  </div>
</template>

<script setup>
import {
  createLotAppUser,
  deleteLotAppUser,
  deleteLotAppUserByIds,
  updateLotAppUser,
  findLotAppUser,
  getLotAppUserList,
  resetLotAppUserPassword
} from '@/api/app/lotAppUser'

// 全量引入格式化工具 请按需保留
import { getDictFunc, formatDate, formatBoolean, filterDict ,filterDataSource, returnArrImg, onDownloadFile } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import { useAppStore } from "@/pinia"
// 新增：头像上传需要的图标
import { Plus, Delete } from '@element-plus/icons-vue'

defineOptions({
    name: 'LotAppUser'
})

// 提交按钮loading
const btnLoading = ref(false)
const appStore = useAppStore()

// 控制更多查询条件显示/隐藏状态
const showAllQuery = ref(false)

// ===== 注册渠道选项 =====
const channelOptions = [
    { label: '手机号', value: 'phone' },
    { label: '微信', value: 'wechat' },
    { label: 'Apple ID', value: 'apple' }
]
// 修复5：辅助方法 - 增加空值保护，返回'未知'
const getChannelLabel = (value) => {
    if (!value) return '未知'
    const found = channelOptions.find(item => item.value === value)
    return found ? found.label : value
}

// ===== 头像上传配置 =====
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
// 上传接口地址（请根据实际项目调整）
const uploadAction = ref('/api/fileUploadAndDownload/upload')
const uploadHeaders = ref({
    'x-token': localStorage.getItem('x-token') || ''
})

// 上传成功回调
const handleAvatarSuccess = (response, uploadFile) => {
    if (response.code === 0) {
        const url = response.data?.url || response.data?.fileUrl || response.data
        if (url) {
            formData.value.avatar = url
            ElMessage.success('头像上传成功')
        } else {
            ElMessage.error('上传成功但未获取到图片地址，请检查接口返回格式')
        }
    } else {
        ElMessage.error('上传失败：' + (response.message || '未知错误'))
    }
}
// 上传失败回调
const handleUploadError = (error) => {
    ElMessage.error('上传失败：' + (error.message || '网络错误'))
}
// 上传前校验
const beforeAvatarUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isImage) {
        ElMessage.error('只能上传图片文件！')
        return false
    }
    if (!isLt2M) {
        ElMessage.error('图片大小不能超过 2MB！')
        return false
    }
    return true
}
// 删除头像
const removeAvatar = () => {
    formData.value.avatar = ''
    ElMessage.success('已移除头像')
}

// ===== 定义初始搜索对象（修复2：重置时恢复初始值） =====
const initSearchInfo = {
    createdAtRange: [],
    phone: '',
    nickname: '',
    status: null,
    registerChannel: '',
    sex: ''
}

// 自动化生成的字典（可能为空）以及字段
const genderOptions = ref([])
// 修复1：状态默认值改为 true（正常）
const formData = ref({
            phone: '',
            nickname: '',
            avatar: '',
            sex: '',
            status: true,
            registerChannel: '',
            registerIp: '',
            lastLoginIp: '',
            lastLoginTime: new Date(),
            deviceCount: undefined,
        })

// 验证规则
const rule = reactive({
               phone : [{
                   required: true,
                   message: '',
                   trigger: ['input','blur'],
               },
               {
                   whitespace: true,
                   message: '不能只输入空格',
                   trigger: ['input', 'blur'],
              }
              ],
})

const elFormRef = ref()
const elSearchFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
// 修复2：使用初始搜索对象
const searchInfo = ref({ ...initSearchInfo })

// 修复2：重置时恢复初始搜索条件
const onReset = () => {
  searchInfo.value = { ...initSearchInfo }
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
  const table = await getLotAppUserList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    genderOptions.value = await getDictFunc('gender')
}

setOptions()

// 多选数据
const multipleSelection = ref([])
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
            deleteLotAppUserFunc(row)
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
      const res = await deleteLotAppUserByIds({ IDs })
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
const updateLotAppUserFunc = async(row) => {
    const res = await findLotAppUser({ ID: row.ID })
    type.value = 'update'
    if (res.code === 0) {
        formData.value = res.data
        dialogFormVisible.value = true
    }
}


// 删除行
const deleteLotAppUserFunc = async (row) => {
    const res = await deleteLotAppUser({ ID: row.ID })
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

// 修复1：关闭弹窗时重置状态为 true（正常）
const closeDialog = () => {
    dialogFormVisible.value = false
    formData.value = {
        phone: '',
        nickname: '',
        avatar: '',
        sex: '',
        status: true,
        registerChannel: '',
        registerIp: '',
        lastLoginIp: '',
        lastLoginTime: new Date(),
        deviceCount: undefined,
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
                  res = await createLotAppUser(formData.value)
                  break
                case 'update':
                  res = await updateLotAppUser(formData.value)
                  break
                default:
                  res = await createLotAppUser(formData.value)
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
const detailShow = ref(false)

const openDetailShow = () => {
  detailShow.value = true
}

const getDetails = async (row) => {
  const res = await findLotAppUser({ ID: row.ID })
  if (res.code === 0) {
    detailForm.value = res.data
    openDetailShow()
  }
}

const closeDetailShow = () => {
  detailShow.value = false
  detailForm.value = {}
}

// ===== 重置密码 =====
const resetPwdDialog = ref(false)
const resetPwdForm = ref(null)
const resetPwdInfo = ref({
  ID: '',
  phone: '',
  nickname: '',
  password: ''
})

const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  resetPwdInfo.value.password = password
  navigator.clipboard.writeText(password).then(() => {
    ElMessage({ type: 'success', message: '密码已复制到剪贴板' })
  })
}

const resetPasswordFunc = (row) => {
  resetPwdInfo.value.ID = row.ID
  resetPwdInfo.value.phone = row.phone || ''
  resetPwdInfo.value.nickname = row.nickname || ''
  resetPwdInfo.value.password = ''
  resetPwdDialog.value = true
}

const confirmResetPassword = async () => {
  if (!resetPwdInfo.value.password) {
    ElMessage({ type: 'warning', message: '请输入或生成密码' })
    return
  }
  const res = await resetLotAppUserPassword({
    ID: resetPwdInfo.value.ID,
    password: resetPwdInfo.value.password
  })
  if (res.code === 0) {
    ElMessage({ type: 'success', message: res.msg || '密码重置成功' })
    resetPwdDialog.value = false
  } else {
    ElMessage({ type: 'error', message: res.msg || '密码重置失败' })
  }
}

const closeResetPwdDialog = () => {
  resetPwdInfo.value.password = ''
  resetPwdDialog.value = false
}

</script>

<style scoped>
/* ===== 头像上传样式 ===== */
.avatar-upload-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.avatar-uploader {
    display: inline-block;
}

.avatar-uploader .avatar-preview-container {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px dashed #d9d9d9;
    cursor: pointer;
    transition: border-color 0.3s;
}

.avatar-uploader .avatar-preview-container:hover {
    border-color: #409eff;
}

.avatar-preview-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.avatar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.avatar-preview-container:hover .avatar-overlay {
    opacity: 1;
}

.avatar-delete-btn {
    width: 32px;
    height: 32px;
    padding: 0;
    font-size: 14px;
}

.avatar-upload-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 2px dashed #d9d9d9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: border-color 0.3s;
    background: #fafafa;
}

.avatar-upload-placeholder:hover {
    border-color: #409eff;
}

.avatar-upload-icon {
    font-size: 28px;
    color: #8c939d;
}

.avatar-upload-text {
    font-size: 12px;
    color: #8c939d;
    margin-top: 4px;
}

.avatar-tip {
    font-size: 12px;
    color: #909399;
    line-height: 1.5;
}

.avatar-url-input {
    max-width: 320px;
}
</style>