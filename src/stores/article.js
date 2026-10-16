import { defineStore } from 'pinia'

const KEY = 'homepage_articles'

export const useArticleStore = defineStore('article', {
  state: () => {
    const saved = localStorage.getItem(KEY)
    return {
      list: saved
        ? JSON.parse(saved)
        : [
            {
              id: 1,
              title: '周末的早晨',
              content:
                '今天难得没有闹钟，一觉睡到自然醒。拉开窗帘，阳光正好斜斜地洒进来，落在书桌上。煮了一杯咖啡，坐在窗边发呆，看楼下的老人遛狗，看对面的小孩追着鸽子跑。这样什么都不做的早晨，好像已经很久没有过了。',
              author: '王芮',
              tag: '生活',
              date: '2024-05-04'
            },
            {
              id: 2,
              title: '和老朋友吃饭',
              content:
                '晚上和高中同学约了顿饭，两年没见，见面还是像昨天才分开一样。聊起当年班主任的口头禅，聊起谁谁谁的近况，聊着聊着就笑出了声。散场的时候有点舍不得，但也知道，能这样偶尔见一面已经很好了。',
              author: '王芮',
              tag: '生活',
              date: '2024-05-11'
            },
            {
              id: 3,
              title: '一次失败的烘焙',
              content:
                '心血来潮想做一次戚风蛋糕。照着视频一步步来，蛋清打了半天也没打到硬性发泡，最后烤出来塌成了一个大饼。尝了一口，味道居然还行。就当是交学费了吧，下次继续。',
              author: '王芮',
              tag: '随笔',
              date: '2024-05-18'
            },
            {
              id: 4,
              title: '下雨天读书',
              content:
                '外面下了一整天的雨，索性哪儿也没去，窝在沙发里把《活着》又读了一遍。第二次读，比第一次更难受。富贵失去的东西太多了，可他还是活着，还是牵着那头老牛慢慢往前走。合上书的时候，窗外雨停了，天边露出一点亮色。',
              author: '王芮',
              tag: '读书',
              date: '2024-05-25'
            },
            {
              id: 5,
              title: '一个人看了一场电影',
              content:
                '下午临时起意，一个人去看了场电影。散场的时候天已经黑了，街上人来人往。以前总觉得一个人看电影有点孤单，今天发现其实还好。不用迁就别人想看的片子，哭和笑都随心，走出影院的时候，心里很平静。',
              author: '王芮',
              tag: '随笔',
              date: '2024-06-01'
            }
          ]
    }
  },
  getters: {
    total: (s) => s.list.length,
    tags: (s) => [...new Set(s.list.map((a) => a.tag).filter(Boolean))]
  },
  actions: {
    persist() { localStorage.setItem(KEY, JSON.stringify(this.list)) },
    addArticle(article) {
      const id = this.list.length ? Math.max(...this.list.map((a) => a.id)) + 1 : 1
      this.list.unshift({ id, date: new Date().toISOString().slice(0, 10), ...article })
      this.persist()
    },
    updateArticle(id, payload) {
      const i = this.list.findIndex((a) => a.id === id)
      if (i !== -1) {
        this.list[i] = { ...this.list[i], ...payload }
        this.persist()
      }
    },
    removeArticle(id) {
      this.list = this.list.filter((a) => a.id !== id)
      this.persist()
    }
  }
})