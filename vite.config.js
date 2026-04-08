import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
      '/api/wb': {
        target: 'https://search.wb.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wb/, ''),
        headers: {
          'Origin': 'https://www.wildberries.ru',
          'Referer': 'https://www.wildberries.ru/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
      }
    }
  }
})
