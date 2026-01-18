import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@react-app/ui': path.resolve(__dirname, 'libs/ui/src/index.ts'),
      '@react-app/hooks': path.resolve(__dirname, 'libs/hooks/src/index.ts'),
      '@react-app/i18n': path.resolve(__dirname, 'libs/i18n/src/index.ts'),
    },
  },
})
