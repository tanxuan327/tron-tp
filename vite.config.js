// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'window',
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
    },
  },
});
