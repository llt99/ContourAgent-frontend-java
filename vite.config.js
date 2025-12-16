import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  base: './', // 替代 publicPath

  server: {
    host: '0.0.0.0', // 可外部访问
    port: 3003,
    // 开发阶段直接访问 Python 后端，不需要 proxy
    // proxy: {...} 可以删除
  },

  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },

  // 如果需要 ESLint，可单独添加 vite-plugin-eslint
});
