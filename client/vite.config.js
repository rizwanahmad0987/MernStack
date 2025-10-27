import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Listen on all network interfaces for Docker
    proxy: {
      '/api': process.env.VITE_API_PROXY || 'http://server:5000',
      '/uploads': process.env.VITE_API_PROXY || 'http://server:5000'
    }
  }
})


