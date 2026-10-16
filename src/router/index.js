import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/login', component: () => import('../views/Login.vue') },
  { path: '/articles', component: () => import('../views/ArticleList.vue') },
  {
    path: '/wangrui/articles',
    component: () => import('../views/ArticleManage.vue'),
    meta: { requiresAuth: true, title: '文章管理' }
  },
  {
    path: '/wangrui/projects',
    component: () => import('../views/ProjectManage.vue'),
    meta: { requiresAuth: true, title: '项目管理' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.logged) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router