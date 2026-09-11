<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="formData.phone" :clearable="true" placeholder="请输入手机号" />
        </el-form-item>

        <el-form-item label="昵称:" prop="nickname">
          <el-input v-model="formData.nickname" :clearable="true" placeholder="请输入昵称" />
        </el-form-item>

        <!-- 修改1：头像 - 文本输入改为上传组件 -->
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
          <el-tree-select
            v-model="formData.sex"
            placeholder="请选择性别"
            :data="genderOptions"
            style="width:100%"
            filterable
            :clearable="true"
            check-strictly
          />
        </el-form-item>

        <!-- 修改2：状态 - 开关改为下拉选择 -->
        <el-form-item label="状态:" prop="status">
          <el-select v-model="formData.status" placeholder="请选择用户状态" style="width:100%" clearable>
            <el-option label="正常" :value="true" />
            <el-option label="禁用" :value="false" />
          </el-select>
        </el-form-item>

        <!-- 修改3：注册渠道 - 文本输入改为下拉选择 -->
        <el-form-item label="注册渠道:" prop="registerChannel">
          <el-select v-model="formData.registerChannel" placeholder="请选择注册渠道" style="width:100%" clearable>
            <el-option v-for="item in channelOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <!-- 修改4：注册IP 和 最后登录IP - 改为只读/隐藏（由后端自动记录） -->
        <!-- 如果完全不想显示，可以注释掉；这里保留但设为只读 -->
        <el-form-item label="注册IP:" prop="registerIp">
          <el-input v-model="formData.registerIp" :clearable="true" placeholder="由系统自动记录" disabled />
        </el-form-item>

        <el-form-item label="最后登录IP:" prop="lastLoginIp">
          <el-input v-model="formData.lastLoginIp" :clearable="true" placeholder="由系统自动记录" disabled />
        </el-form-item>

        <el-form-item label="最后登录时间:" prop="lastLoginTime">
          <el-date-picker
            v-model="formData.lastLoginTime"
            type="date"
            style="width:100%"
            placeholder="选择日期"
            :clearable="true"
            disabled
          />
        </el-form-item>

        <el-form-item label="当前绑定设备数:" prop="deviceCount">
          <el-input v-model.number="formData.deviceCount" :clearable="true" placeholder="请输入当前绑定设备数" />
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
  createLotAppUser,
  updateLotAppUser,
  findLotAppUser
} from '@/api/app/lotAppUser'
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
// 头像上传需要的图标
import { Plus, Delete } from '@element-plus/icons-vue'

defineOptions({
  name: 'LotAppUserForm'
})

const route = useRoute()
const router = useRouter()

// 提交按钮loading
const btnLoading = ref(false)

const type = ref('')
const genderOptions = ref([])

// ===== 注册渠道选项 =====
const channelOptions = [
  { label: '手机号', value: 'phone' },
  { label: '微信', value: 'wechat' },
  { label: 'Apple ID', value: 'apple' }
]

// ===== 头像上传配置 =====
const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const uploadAction = ref('/api/fileUploadAndDownload/upload')
const uploadHeaders = ref({
  'x-token': localStorage.getItem('x-token') || ''
})

// 上传成功回调
const handleAvatarSuccess = (response) => {
  if (response.code === 0) {
    const url = response.data?.url || response.data?.fileUrl || response.data
    if (url) {
      formData.value.avatar = url
      ElMessage.success('头像上传成功')
    } else {
      ElMessage.error('上传成功但未获取到图片地址')
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

// ===== 表单数据 =====
// 修改5：状态默认值改为 true（正常）
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

// ===== 验证规则 =====
const rule = reactive({
  phone: [{
    required: true,
    message: '请输入手机号',
    trigger: ['input', 'blur'],
  }],
  // 可选：增加注册渠道必填
  registerChannel: [{
    required: true,
    message: '请选择注册渠道',
    trigger: ['change', 'blur'],
  }],
})

const elFormRef = ref()

// ===== 初始化 =====
const init = async () => {
  if (route.query.id) {
    const res = await findLotAppUser({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data
      type.value = 'update'
    }
  } else {
    type.value = 'create'
  }
  genderOptions.value = await getDictFunc('gender')
}

init()

// ===== 保存按钮 =====
const save = async () => {
  btnLoading.value = true
  elFormRef.value?.validate(async (valid) => {
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
        message: type.value === 'create' ? '创建成功' : '更新成功'
      })
      // 保存成功后返回列表
      router.go(-1)
    }
  })
}

// ===== 返回按钮 =====
const back = () => {
  router.go(-1)
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