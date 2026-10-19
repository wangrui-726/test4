<template>
  <el-menu
    mode="horizontal"
    :default-active="route.path"
    router
    class="nav"
    :ellipsis="false"
  >
    <el-menu-item index="/" class="brand">🏠 王芮的个人主页</el-menu-item>

    <div class="links">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/articles">文章列表</el-menu-item>
      <el-menu-item index="/wangrui/articles">文章管理</el-menu-item>
      <el-menu-item index="/wangrui/projects">项目管理</el-menu-item>
    </div>

    <div class="right">
      <el-dropdown v-if="logged" @command="handleCommand">
        <span class="user">
          <el-avatar :size="40" :src="`${base}img.jpg`" />
          <span class="name">{{ displayName }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button v-else type="primary" size="large" @click="router.push('/login')">登录</el-button>
    </div>
  </el-menu>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const base = import.meta.env.BASE_URL
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { logged, displayName } = storeToRefs(userStore)

function handleCommand(cmd) {
  if (cmd === 'logout') {
    userStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.nav {
  padding: 0 48px !important;
  height: 88px !important;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
}
.brand { font-size: 22px; font-weight: 800; }
.links { display: flex; margin-left: 40px; }
.right { margin-left: auto; display: flex; align-items: center; gap: 16px; padding-right: 8px; }
.user { display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 0 12px; }
.name { font-size: 18px; font-weight: 700; color: var(--text); }
</style>