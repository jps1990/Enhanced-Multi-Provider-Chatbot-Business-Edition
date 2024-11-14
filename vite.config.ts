import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/cohere': {
        target: 'https://api.cohere.ai/v1/generate',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cohere/, '')
      }
    }
  }
});