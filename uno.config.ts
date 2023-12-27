// uno.config.ts
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetDaisy({
      themes: ['garden'],
    }),
  ],
  shortcuts: {
    'center': 'flex items-center justify-center',
    'center-col': 'center flex-col',
    'text': 'text-lg font-bold lg:text-4xl md:text-3xl sm:text-2xl',
  },
  transformers: [
    transformerDirectives(),
  ],
})
