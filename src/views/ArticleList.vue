<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">📚 文章列表 <el-tag>共 {{ total }} 篇</el-tag></h2>
      <div class="filter">
        <el-input v-model="keyword" placeholder="🔍 搜索标题或正文" clearable style="width:300px" />
        <el-select v-model="activeTag" placeholder="全部标签" clearable style="width:180px">
          <el-option v-for="t in tags" :key="t" :label="t" :value="t" />
        </el-select>
      </div>
    </div>

    <el-empty v-if="!filtered.length" description="暂无匹配的文章" />

    <el-row v-else :gutter="28">
      <el-col v-for="item in filtered" :key="item.id" :xs="24" :md="12" :lg="8">
        <article class="card-item">
          <div class="card-top">
            <span class="card-idx">#{{ item.id }}</span>
            <el-tag v-if="item.tag" type="success" effect="light" round>{{ item.tag }}</el-tag>
            <span class="card-date">{{ item.date }}</span>
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
          <div class="card-footer">
            <el-avatar :size="40" :src="`${base}img.jpg`" />
            <span>{{ item.author }}</span>
          </div>
        </article>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '../stores/article'

const base = import.meta.env.BASE_URL
const { list, total, tags } = storeToRefs(useArticleStore())
const keyword = ref('')
const activeTag = ref('')

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return list.value.filter((a) => {
    const matchKw = !kw || a.title?.toLowerCase().includes(kw) || a.content?.toLowerCase().includes(kw)
    const matchTag = !activeTag.value || a.tag === activeTag.value
    return matchKw && matchTag
  })
})
</script>

<style scoped>
.filter { display: flex; gap: 12px; }

.card-item {
  position: relative;
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 28px;
  margin-bottom: 28px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: transform 0.25s, box-shadow 0.25s;
  overflow: hidden;
}
.card-item::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 5px;
  background: linear-gradient(180deg, var(--primary), var(--primary-dark));
  opacity: 0;
  transition: opacity 0.25s;
}
.card-item:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
.card-item:hover::before { opacity: 1; }

.card-top { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.card-idx {
  font-size: 14px;
  font-weight: 700;
  color: var(--primary);
  background: rgba(79, 110, 247, 0.12);
  padding: 4px 12px;
  border-radius: 999px;
}
.card-date { margin-left: auto; font-size: 14px; color: var(--text-light); }

.card-item h3 { margin: 0 0 10px; font-size: 20px; font-weight: 700; }
.card-item p {
  color: var(--text-light);
  font-size: 16px;
  line-height: 1.8;
  margin: 0 0 18px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-footer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  font-size: 15px;
  color: var(--text-light);
}
</style>