import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['react-quill'],
  },
  plugins: [
    react(),
    // When Vercel returns 404 for /admin/login etc., it may serve 404.html instead. This loads the SPA so React Router can handle the route.
    {
      name: 'copy-404',
      closeBundle() {
        const outDir = resolve(__dirname, 'dist')
        copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
      },
    },
  ],
})
