import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: [
    {
      // 颜色
      'bg-1': 'bg-[var(--el-bg-color)]',
      'bg-2': 'bg-[var(--el-fill-color-light)]',

      // 定位
      'tl': 'top-0 left-0',
      'tr': 'top-0 right-0',
      'bl': 'bottom-0 left-0',
      'br': 'bottom-0 right-0',
      'pa-center': 'pa top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',

      // flex 布局
      'flex-center': 'flex justify-center items-center',

      // 边框
      'bordered': 'border border-solid border-[var(--el-border-color)]',
      'bordered-t': 'border-t border-solid border-[var(--el-border-color)]',
      'bordered-l': 'border-l border-solid border-[var(--el-border-color)]',
      'bordered-b': 'border-b border-solid border-[var(--el-border-color)]',
      'bordered-r': 'border-r border-solid border-[var(--el-border-color)]',

      // 自定义
      'word-query': 'text-green-500 font-bold',
    },
  ],
})
