/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  build: {
    // Optimize for LCP - Inline small assets to reduce HTTP requests
    assetsInlineLimit: 4096,
    // Enable CSS code splitting for better caching
    cssCodeSplit: true,
    // Minification settings for optimal performance
    minify: 'esbuild',
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Rollup options for chunk optimization
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
    // Report compressed file sizes
    reportCompressedSize: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
});
