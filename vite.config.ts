import process from 'node:process'

import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import webExtension from 'vite-plugin-web-extension'
import zipPack from 'vite-plugin-zip-pack'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    webExtension({
      manifest: 'manifest.json',
      browser: process.env.TARGET ?? 'chrome',
      disableAutoLaunch: true,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
      ],
      dts: 'src/types/auto-imports.d.ts',
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
    zipPack({
      inDir: 'dist',
      outDir: '.',
      outFileName: 'extension.zip',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src/popup/',
    },
  },
})
