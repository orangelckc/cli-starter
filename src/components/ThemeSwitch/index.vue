<script lang="ts" setup>
import { useTheme } from '@/hooks/useTheme'

defineOptions({
  name: 'ThemeSwitch',
})

const { themeList, activeThemeName, setTheme } = useTheme()
</script>

<template>
  <el-dropdown trigger="click" @command="setTheme">
    <div>
      <el-tooltip effect="dark" content="主题模式" placement="bottom">
        <el-icon :size="24" class="i-ep-sunny" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(theme, index) in themeList"
          :key="index"
          :disabled="activeThemeName === theme.name"
          :command="theme.name"
        >
          <span>{{ theme.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
