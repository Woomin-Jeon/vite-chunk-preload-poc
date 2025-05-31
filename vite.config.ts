import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const injectPreloadPlugin = () => {
  return {
    name: 'inject-preload',
    transformIndexHtml: {
      enforce: 'post' as const,
      transform(html: string, ctx: { bundle?: Record<string, unknown> }) {
        if (!ctx.bundle) {
          return html
        }
        
        const preloadChunk = Object.keys(ctx.bundle).find(fileName => 
          fileName.includes('preload') && fileName.endsWith('.js')
        )

        if (preloadChunk) {
          return html.replace(
            '<head>',
            `<head>
    <script src="/${preloadChunk}" async></script>`
          )
        }

        return html
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), injectPreloadPlugin()],
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: './index.html',
        preload: './src/preload.ts',
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
