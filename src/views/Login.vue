<template>
  <div class="login-page">
    <el-card class="login-card" shadow="always">
      <el-avatar :size="120" :src="`${base}img.jpg`" class="login-avatar" />
      <h2>欢迎回来</h2>
      <p>请登录以继续</p>

      <el-form :model="form" label-position="top" @submit.prevent>
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" clearable size="large" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password size="large" />
        </el-form-item>
        <el-button type="primary" size="large" class="login-btn" @click="handleLogin">登 录</el-button>
      </el-form>
      <el-text size="small" type="info">演示：任意用户名密码即可登录</el-text>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'

const base = import.meta.env.BASE_URL
const form = reactive({ username: '王芮', password: '' })
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

function handleLogin() {
  if (!form.username) return ElMessage.warning('请输入用户名')
  userStore.login(form.username, 'token-' + Date.now())
  ElMessage.success('登录成功')
  router.push(route.query.redirect || '/')
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 88px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #f5f7fb 100%);
}
.login-card {
  width: 100%;
  max-width: 640px;
  text-align: center;
  padding: 64px 56px;
}
.login-avatar { margin-bottom: 20px; }
.login-card h2 { margin: 0 0 10px; font-size: 34px; font-weight: 800; }
.login-card p { color: var(--text-light); font-size: 18px; margin: 0 0 32px; }
.login-card :deep(.el-form-item__label) { justify-content: flex-start; font-weight: 600; font-size: 18px; }
.login-card :deep(.el-input__inner) { height: 54px !important; font-size: 18px !important; }
.login-btn { width: 100%; height: 56px !important; font-size: 20px !important; margin-top: 8px; }
.login-card :deep(.el-text) { font-size: 15px !important; margin-top: 8px; display: inline-block; }
</style>