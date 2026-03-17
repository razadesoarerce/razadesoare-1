import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    exclude: ['react-quill'],
  },
  plugins: [
    react(),
    // When Vercel returns 404 for /admin/login etc., it may serve 404.html instead. This loads the SPA so React Router can handle the route.
    {
      name: 'copy-404',
      closeBundle() {
        const src = resolve(__dirname, 'dist', 'index.html')
        const dest = resolve(__dirname, 'dist', '404.html')
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest)
          console.log('404.html generated')
        } else {
          console.warn('index.html not found, skipping 404 copy')
        }
      },
    },
  ],
})
