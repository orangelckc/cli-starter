<script lang="ts" setup>
import zhCN from 'element-plus/es/locale/lang/zh-cn'

import { useTheme } from '@/hooks/useTheme'

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
/** 将 Element Plus 的语言设置为中文 */
const locale = zhCN
</script>

<template>
  <ElConfigProvider :locale="locale">
    <RouterView />
  </ElConfigProvider>
</template>
