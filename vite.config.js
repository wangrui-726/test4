import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  base: '/test4/',           // ⚠️ 必须是 /test4/，和仓库名一致
  css: {
    transformer: 'postcss'
  }
})