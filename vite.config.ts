import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        manualChunks: (id) => {
          if (id.includes('vite/modulepreload-polyfill.js') || id.includes('commonjsHelpers.js')) {
            return 'vite-helper'
          }

          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react'
          }

          return undefined
        },
      }
    }
  }
})
