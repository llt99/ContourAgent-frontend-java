import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  // Vite 中需要用 `base` 替代 `publicPath`
  base: './',

  // Vite 中移除了 `lintOnSave`，需通过 ESLint 插件单独配置
  // 推荐使用 vite-plugin-eslint

  server: {
    host: '0.0.0.0',
    port: 3003,
    proxy: {
      '/api': {
        target: 'http://localhost:8079/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Vite 用 `rewrite` 替代 `pathRewrite`
      },

      '/nlp': {
        // target: 'http://10.242.171.158:8999',
        target: 'http://10.242.175.87:8999',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nlp/, ''),
      },
    }
  },

  build: {
    target: 'esnext',
    // 可添加其他构建优化选项
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },

  // 可选：配置 ESLint
  // esbuild: {
  //   jsxInject: `import React from 'react'` // 如果需要 JSX
  // }
})
