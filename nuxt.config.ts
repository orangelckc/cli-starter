export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@element-plus/nuxt',
    'dayjs-nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],

  imports: {
    dirs: [
      'stores',
      'utils',
    ],
  },

  srcDir: 'src/',

  css: [
    '@unocss/reset/tailwind-compat.css',
    'element-plus/dist/index.css',
    'element-plus/theme-chalk/display.css',
    '~/assets/style/global.scss',
  ],

  dayjs: {
    locales: ['zh'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'zh',
    defaultTimezone: 'Asia/Shanghai',
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },
})
