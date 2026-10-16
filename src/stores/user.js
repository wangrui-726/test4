import { defineStore } from 'pinia'

const KEY = 'homepage_user'

export const useUserStore = defineStore('user', {
  state: () => {
    const saved = localStorage.getItem(KEY)
    return saved ? JSON.parse(saved) : { isLogin: false, username: '', token: '' }
  },
  getters: {
    logged: (s) => s.isLogin && !!s.token,
    displayName: (s) => s.username || '游客'
  },
  actions: {
    persist() { localStorage.setItem(KEY, JSON.stringify(this.$state)) },
    login(username, token) {
      Object.assign(this, { isLogin: true, username, token })
      this.persist()
    },
    logout() {
      Object.assign(this, { isLogin: false, username: '', token: '' })
      this.persist()
    }
  }
})