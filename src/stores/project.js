import { defineStore } from 'pinia'

const KEY = 'homepage_projects'

export const useProjectStore = defineStore('project', {
  state: () => {
    const saved = localStorage.getItem(KEY)
    return {
      list: saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              name: '个人主页',
              desc: '记录生活、读书和随笔的个人博客',
              status: '进行中',
              date: '2024-05-01'
            },
            {
              id: 2,
              name: '读书笔记整理',
              desc: '把这两年读过的书整理成一份清单，写下每本的读后感',
              status: '已完成',
              date: '2024-05-15'
            },
            {
              id: 3,
              name: '学做菜',
              desc: '每周学一道新菜，记录下成功的和失败的',
              status: '进行中',
              date: '2024-05-20'
            }
          ]
    }
  },
  getters: {
    total: (s) => s.list.length,
    done: (s) => s.list.filter((p) => p.status === '已完成').length
  },
  actions: {
    persist() { localStorage.setItem(KEY, JSON.stringify(this.list)) },
    addProject(project) {
      const id = this.list.length ? Math.max(...this.list.map((p) => p.id)) + 1 : 1
      this.list.unshift({ id, date: new Date().toISOString().slice(0, 10), status: '进行中', ...project })
      this.persist()
    },
    updateProject(id, payload) {
      const i = this.list.findIndex((p) => p.id === id)
      if (i !== -1) {
        this.list[i] = { ...this.list[i], ...payload }
        this.persist()
      }
    },
    removeProject(id) {
      this.list = this.list.filter((p) => p.id !== id)
      this.persist()
    }
  }
})