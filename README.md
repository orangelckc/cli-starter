# cli-starter

基于vue3生态的个人脚手架工具（2023版）

## vite-ts 起手模版

### 技术栈

- [x] eslint
- [x] typescript
- [x] vite
- [x] vitest

打包后可直接上传`npm`发布
也可以在monorepo项目中添加使用，注意修改对应的包名，如果需要同时发布，请添加一下代码在`package.json`中

```json
{
  "private": false,
  "publishConfig": {
    "access": "public"
  }
}
```
