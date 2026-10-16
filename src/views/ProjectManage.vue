<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">📦 项目管理 <el-tag>共 {{ total }} 个 · {{ done }} 已完成</el-tag></h2>
      <el-button type="primary" size="large" @click="openAdd">+ 新增项目</el-button>
    </div>

    <el-empty v-if="!list.length" description="暂无项目" />

    <el-row v-else :gutter="28">
      <el-col v-for="item in list" :key="item.id" :xs="24" :md="12" :lg="8">
        <div class="project-card">
          <div class="project-top">
            <span class="status" :class="statusClass(item.status)">{{ item.status }}</span>
            <span class="date">{{ item.date }}</span>
          </div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.desc || '暂无描述' }}</p>
          <div class="project-actions">
            <el-button size="small" @click="openEdit(item)">编辑</el-button>
            <el-button size="small" type="danger" @click="remove(item.id)">删除</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog v-model="visible" :title="editId ? '编辑项目' : '新增项目'" width="520px">
      <el-form :model="form" label-width="70px">
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.desc" /></el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" style="width:100%">
            <el-option label="进行中" value="进行中" />
            <el-option label="已完成" value="已完成" />
            <el-option label="已暂停" value="已暂停" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="large" @click="visible = false">取消</el-button>
        <el-button size="large" type="primary" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useProjectStore } from '../stores/project'

const store = useProjectStore()
const { list, total, done } = storeToRefs(store)
const visible = ref(false)
const editId = ref(null)
const form = reactive({ name: '', desc: '', status: '进行中' })

const statusClass = (s) => (s === '已完成' ? 'done' : s === '已暂停' ? 'paused' : 'doing')

function openAdd() {
  editId.value = null
  Object.assign(form, { name: '', desc: '', status: '进行中' })
  visible.value = true
}

function openEdit(item) {
  editId.value = item.id
  Object.assign(form, { name: item.name, desc: item.desc, status: item.status })
  visible.value = true
}

function save() {
  if (!form.name) return ElMessage.warning('请输入项目名称')
  if (editId.value) {
    store.updateProject(editId.value, { ...form })
    ElMessage.success('修改成功')
  } else {
    store.addProject({ ...form })
    ElMessage.success('添加成功')
  }
  visible.value = false
}

function remove(id) {
  ElMessageBox.confirm('确定删除该项目吗？', '提示', { type: 'warning' })
    .then(() => {
      store.removeProject(id)
      ElMessage.success('已删除')
    })
    .catch(() => {})
}
</script>

<style scoped>
.project-card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 28px;
  margin-bottom: 28px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: transform 0.25s, box-shadow 0.25s;
}
.project-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }

.project-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.status { font-size: 14px; font-weight: 600; padding: 5px 14px; border-radius: 999px; }
.status.doing  { color: var(--warning); background: rgba(245, 158, 11, 0.12); }
.status.done   { color: var(--success); background: rgba(16, 185, 129, 0.12); }
.status.paused { color: var(--text-light); background: #f3f4f6; }
.date { font-size: 14px; color: var(--text-light); }

.project-card h3 { margin: 0 0 10px; font-size: 20px; font-weight: 700; }
.project-card p { color: var(--text-light); font-size: 16px; line-height: 1.8; min-height: 52px; margin: 0 0 18px; }

.project-actions { display: flex; gap: 10px; padding-top: 16px; border-top: 1px solid var(--border); }
</style>