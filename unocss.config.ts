import { presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

export default {
  presets: [
    presetWeapp(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  /**
   * 自定义快捷语句
   * @see https://github.com/unocss/unocss#shortcuts
   */
  shortcuts: [
    ['center', 'flex justify-center items-center'],
    ['tag-primary', 'center px-16rpx rounded-full border border-solid border-primary text-primary'],
    ['tag-secondary', 'center px-16rpx rounded-full border border-solid border-secondary text-secondary'],
  ],
  /**
   * 自定义主题，全局变量
   */
  theme: {
    colors: {
      primary: '#19AD19',
      secondary: '#FF9933',
      danger: '#FF5A5A',
      default: '#333333',
    },
    fontSize: {
      base: '24rpx',
      medium: '28rpx',
      large: '32rpx',
    },
  },

  transformers: [
    transformerDirectives(), // 启用 @apply 功能
    transformerVariantGroup(), // 启用 () 分组功能
    transformerAttributify(), // 启用 [attr] 功能
    transformerClass(),
  ],
}
