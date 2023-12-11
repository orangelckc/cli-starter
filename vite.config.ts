import { resolve } from 'node:path'
import process from 'node:process'

import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'

/** 配置项文档：https://cn.vitejs.dev/config */
export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true, // host: "0.0.0.0"
      /** 端口号 */
      port: 3333,
      /** 是否自动打开浏览器 */
      open: true,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      // proxy: {
      //   '/api/v1': {
      //     target: 'http://localhost:8868/api/v1',
      //     ws: true,
      //     /** 是否允许跨域 */
      //     changeOrigin: true,
      //     rewrite: path => path.replace('/api/v1', ''),
      //   },
      // },
    },
    build: {
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** 打包后静态资源目录 */
      assetsDir: 'static',
    },
    /** Vite 插件 */
    plugins: [
      VueDevTools(),
      vue(),
      /** UnoCSS */
      UnoCSS(),
      /** DefineOptions 可以更简单的注册组件名称 */
      DefineOptions(),
      /** 自动按需引入 (已更改为完整引入，所以注释了) */
      AutoImport({
        dts: './types/auto-imports.d.ts',
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
        /** 自动按需导入 Element Plus 相关函数，比如 ElMessage */
        resolvers: [ElementPlusResolver()],
        /** 根据自动按需导入的相关 API，生成 .eslintrc-auto-import.json 文件供 Eslint 识别 */
        eslintrc: {
          enabled: true, // 默认 false
          filepath: './types/.eslintrc-auto-import.json', // 默认 "./.eslintrc-auto-import.json"
          globalsPropValue: true, // 默认 true (true | false | "readonly" | "readable" | "writable" | "writeable")
        },
      }),
      Components({
        dts: './types/components.d.ts',
        /** 自动按需导入 Element Plus 组件 */
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
}
