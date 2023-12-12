import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'pinia',
      ],
      dts: './types/auto-imports.d.ts',
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },

    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    open: true,
    host: '0.0.0.0',
  },
})
