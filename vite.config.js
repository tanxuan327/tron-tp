import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    terserOptions: {
      mangle: {
        reserved: ['tronWeb']
      }
    }
  }
});
