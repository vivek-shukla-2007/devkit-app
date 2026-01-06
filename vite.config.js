import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          'ui-libs': [
            '@heroicons/react',
            'react-color',
          ],
          'processing': [
            'react-easy-crop',
            'canvas-confetti',
            'markdown-it',
            'sql-formatter',
            'diff',
          ]
        }
      }
    },
    // Optimize for production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    // Improve caching
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@heroicons/react',
    ],
  },
})