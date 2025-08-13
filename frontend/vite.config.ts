import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined,
        inlineDynamicImports: true
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  optimizeDeps: {
    exclude: [],
    include: ['react', 'react-dom', 'react-router-dom']
  },
  esbuild: {
    target: 'es2020'
  }
})
