import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import monkey, { cdn, util } from 'vite-plugin-monkey'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        '@vueuse/core',
        util.unimportPreset,
      ],
      dts: 'src/types/auto-imports.d.ts',
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },

    }),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: '油猴脚本插件起手模版',
        namespace: 'monkey-plugin-starter',
        version: '0.0.1',
        icon: 'https://api.iconify.design/carbon:notebook-reference.svg',
        description: '油猴脚本插件起手模版',
        match: ['https://www.bilibili.com/video/*'],
        license: 'MIT',
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js')
            .concat(await util.fn2dataUrl(() => {
              // eslint-disable-next-line ts/ban-ts-comment
              // @ts-expect-error
              window.Vue = Vue
            })),
          axios: cdn.jsdelivr('axios', 'dist/axios.min.js'),
          dayjs: cdn.jsdelivr('dayjs', 'dayjs.min.js'),
          localforage: cdn.jsdelivr('localforage', 'dist/localforage.min.js'),
        },
        externalResource: {
          'splitpanes@3.1.5/dist/splitpanes.min.css': cdn.jsdelivr(),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
