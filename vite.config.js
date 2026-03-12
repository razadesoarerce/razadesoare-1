import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Copy index.html to 404.html so Vercel serves the SPA for unknown paths (e.g. /admin)
    {
      name: 'copy-404',
      closeBundle() {
        const outDir = resolve(__dirname, 'dist')
        copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
      },
    },
  ],
})
