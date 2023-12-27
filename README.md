## cli-starter
基于vue3生态的个人脚手架工具（2023版）

## vue3-chrome-extension 起手模版

### 技术栈
- [x] vue3
- [x] vue-router
- [x] eslint
- [x] unocss
- [x] pinia+pinia-plugin-persistedstate
- [x] daisyui
- [x] vue3-toastify

### 提示
1. 本地开发时，需要在chrome浏览器中开启开发者模式，然后加载dist文件夹
2. 打包时，会自动生成对应插件的 `zip` 压缩包，可直接上传至 `chrome` 应用商店，压缩包的生成位置在 `vite.config.ts` 中的 `zipPack.outdir` 中配置
