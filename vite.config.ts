import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: '.vitest/config',
    include: ['**/test.{ts,tsx}']
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url))
      },
      {
        find: '@core',
        replacement: fileURLToPath(new URL('./core', import.meta.url))
      }
    ]
  }
})
