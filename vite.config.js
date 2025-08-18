import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemaps for faster builds
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          onchainkit: ['@coinbase/onchainkit'],
          lucide: ['lucide-react']
        }
      }
    },
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000
  },
  base: './',
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@coinbase/onchainkit', 'lucide-react']
  }
})
