<template>
  <div class="home">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-glow"></div>
      <el-avatar :size="130" src="/img.jpg" class="hero-avatar" />
      <div class="hero-text">
        <h1>你好，<span class="highlight">王芮</span> 欢迎回来！</h1>
        <p class="subtitle">文章 · 项目 · 生活 · 记录每一天</p>
      </div>
      <div class="hero-actions">
        <el-button v-if="!logged" type="primary" size="large" @click="router.push('/login')">立即登录</el-button>
        <el-button v-else type="primary" size="large" @click="router.push('/wangrui/articles')">进入管理</el-button>
        <el-button size="large" @click="router.push('/articles')">浏览文章</el-button>
      </div>
    </section>

    <!-- 统计 -->
    <el-row :gutter="28" class="stats">
      <el-col :span="8">
        <div class="stat-card stat-blue">
          <div class="stat-icon">📝</div>
          <div>
            <div class="stat-num">{{ articleTotal }}</div>
            <div class="stat-label">篇文章</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="stat-card stat-green">
          <div class="stat-icon">📦</div>
          <div>
            <div class="stat-num">{{ projectTotal }}</div>
            <div class="stat-label">个项目（{{ projectDone }} 已完成）</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="stat-card" :class="logged ? 'stat-orange' : 'stat-gray'">
          <div class="stat-icon">🔐</div>
          <div>
            <div class="stat-num">{{ logged ? '已登录' : '未登录' }}</div>
            <div class="stat-label">当前状态</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 时间线 -->
    <div class="timeline-wrap">
      <div class="tl-header">
        <span class="tl-title">📅 我的足迹</span>
        <span class="tl-sub">记录成长的每一步</span>
      </div>
      <el-timeline class="tl-list">
        <el-timeline-item
          v-for="(item, i) in timeline"
          :key="i"
          :timestamp="item.date"
          :type="item.type"
          placement="top"
        >
          <div class="tl-item">
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { useArticleStore } from '../stores/article'
import { useProjectStore } from '../stores/project'

const router = useRouter()
const { logged } = storeToRefs(useUserStore())
const { total: articleTotal } = storeToRefs(useArticleStore())
const { total: projectTotal, done: projectDone } = storeToRefs(useProjectStore())

const timeline = [
  { date: '2026-10-16', title: '个人主页全面升级', desc: '引入 Element Plus，重构页面结构与交互', type: 'primary' },
  { date: '2026-09-20', title: '发布第一篇文章', desc: '《周末的早晨》上线，开启记录生活的习惯', type: 'success' },
  { date: '2026-08-15', title: '完成第一个项目', desc: '读书笔记整理上线，整理这两年读过的书', type: 'info' }
]
</script>

<style scoped>
/* 一屏容器 */
.home {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 48px;
  height: calc(100vh - 88px);
  display: flex;
  flex-direction: column;
  gap: 26px;
  overflow: hidden;
}

/* Hero —— 放大 */
.hero {
  position: relative;
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 40px 48px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 60%, #f5f7fb 100%);
  box-shadow: var(--shadow);
  overflow: hidden;
  flex-shrink: 0;
}
.hero-glow {
  position: absolute;
  top: -120px;
  right: -120px;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(79, 110, 247, 0.25), transparent 70%);
}
.hero-avatar {
  border: 5px solid #fff;
  box-shadow: 0 12px 32px rgba(79, 110, 247, 0.3);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
.hero-text { flex: 1; position: relative; z-index: 1; }
.hero-text h1 { font-size: 38px; margin: 0 0 10px; font-weight: 800; }
.highlight {
  background: linear-gradient(135deg, #4f6ef7, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.subtitle { font-size: 18px; color: var(--text-light); margin: 0; }
.hero-actions { display: flex; gap: 14px; position: relative; z-index: 1; }

/* 统计 —— 放大 */
.stats { flex-shrink: 0; }
.stat-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 30px 34px;
  border-radius: var(--radius-lg);
  color: #fff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s;
}
.stat-card:hover { transform: translateY(-5px); }
.stat-blue   { background: linear-gradient(135deg, #4f6ef7, #3a55d9); }
.stat-green  { background: linear-gradient(135deg, #10b981, #059669); }
.stat-orange { background: linear-gradient(135deg, #f59e0b, #d97706); }
.stat-gray   { background: linear-gradient(135deg, #6b7280, #4b5563); }
.stat-icon {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  flex-shrink: 0;
}
.stat-num { font-size: 38px; font-weight: 800; line-height: 1.15; }
.stat-label { font-size: 16px; opacity: 0.92; margin-top: 4px; }

/* 时间线 —— 放大 */
.timeline-wrap {
  flex: 1;
  background: #fff;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  padding: 28px 36px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.tl-header { display: flex; align-items: baseline; gap: 16px; margin-bottom: 18px; }
.tl-title { font-size: 24px; font-weight: 700; }
.tl-sub { font-size: 15px; color: var(--text-light); }
.tl-list { flex: 1; overflow: hidden; padding-left: 4px; }
.tl-item {
  padding: 16px 24px;
  background: #fafbff;
  border-radius: var(--radius);
  border-left: 4px solid var(--primary);
}
.tl-item h4 { margin: 0 0 6px; font-size: 19px; }
.tl-item p { margin: 0; font-size: 15px; color: var(--text-light); }

.timeline-wrap :deep(.el-timeline-item) { padding-bottom: 20px; }
.timeline-wrap :deep(.el-timeline-item__timestamp) { font-size: 15px; }
.timeline-wrap :deep(.el-timeline-item__node) { width: 16px; height: 16px; }
</style>