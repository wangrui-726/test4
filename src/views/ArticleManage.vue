<template>
  <div class="page">
    <div class="page-header">
      <h2 class="page-title">✏️ 文章管理 <el-tag>共 {{ list.length }} 篇</el-tag></h2>
      <el-button type="primary" size="large" @click="openAdd">+ 新增文章</el-button>
    </div>

    <el-card shadow="never">
      <el-table :data="list" stripe border style="width:100%">
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="title" label="标题" min-width="180" />
        <el-table-column prop="content" label="正文" min-width="260" show-overflow-tooltip />
        <el-table-column prop="author" label="作者" width="110" align="center" />
        <el-table-column label="标签" width="120" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.tag" type="success" effect="light" round>{{ row.tag }}</el-tag>
            <span v-else>—</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="140" align="center" />
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="openEdit(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="remove(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="visible" :title="editId ? '编辑文章' : '新增文章'" width="620px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题"><el-input v-model="form.title" placeholder="请输入标题" /></el-form-item>
        <el-form-item label="正文">
          <el-input v-model="form.content" type="textarea" :rows="6" placeholder="请输入正文" />
        </el-form-item>
        <el-form-item label="标签"><el-input v-model="form.tag" placeholder="生活 / 随笔 / 读书…" /></el-form-item>
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
import { useArticleStore } from '../stores/article'

const store = useArticleStore()
const { list } = storeToRefs(store)
const visible = ref(false)
const editId = ref(null)
const form = reactive({ title: '', content: '', tag: '' })

function openAdd() {
  editId.value = null
  Object.assign(form, { title: '', content: '', tag: '' })
  visible.value = true
}

function openEdit(row) {
  editId.value = row.id
  Object.assign(form, { title: row.title, content: row.content, tag: row.tag || '' })
  visible.value = true
}

function save() {
  if (!form.title || !form.content) return ElMessage.warning('标题和正文不能为空')
  if (editId.value) {
    store.updateArticle(editId.value, { ...form })
    ElMessage.success('修改成功')
  } else {
    store.addArticle({ ...form, author: '王芮' })
    ElMessage.success('添加成功')
  }
  visible.value = false
}

function remove(id) {
  ElMessageBox.confirm('确定删除这篇文章吗？', '提示', { type: 'warning' })
    .then(() => {
      store.removeArticle(id)
      ElMessage.success('已删除')
    })
    .catch(() => {})
}
</script>