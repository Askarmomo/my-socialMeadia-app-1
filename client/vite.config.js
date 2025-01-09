import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV = 'development' ? "http://localhost:4000" : 'https://my-socialmeadia-app-1server.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
