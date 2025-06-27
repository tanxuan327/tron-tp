import { defineConfig } from 'vite';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

export default defineConfig({
  resolve: {
    alias: {
      // 添加 buffer 的别名，指向浏览器版本
      buffer: 'buffer/',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  build: {
    rollupOptions: {
      plugins: [
        rollupNodePolyFill()
      ],
    },
  },
});
