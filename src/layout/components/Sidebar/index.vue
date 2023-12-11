<script lang="ts" setup>
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'

import { useAppStore, useSettingsStore, useUserStore } from '@/store'
import { getCssVariableValue } from '@/utils/tools'

const v3SidebarMenuBgColor = getCssVariableValue('--v3-sidebar-menu-bg-color')
const v3SidebarMenuTextColor = getCssVariableValue('--v3-sidebar-menu-text-color')
const v3SidebarMenuActiveTextColor = getCssVariableValue('--v3-sidebar-menu-active-text-color')

const route = useRoute()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const { userMenu } = useUserStore()

const { settings } = storeToRefs(settingsStore)

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu)
    return meta.activeMenu

  return path
})

const isCollapse = computed(() => {
  return !appStore.sidebar.opened
})
</script>

<template>
  <div :class="{ 'has-logo': settings.showSidebarLogo }">
    <!-- 侧边栏LOGO -->
    <SidebarLogo v-if="settings.showSidebarLogo" :collapse="isCollapse" />

    <!-- 侧边栏菜单列表 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="v3SidebarMenuBgColor"
        :text-color="v3SidebarMenuTextColor"
        :active-text-color="v3SidebarMenuActiveTextColor"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="item in userMenu"
          :key="item.path"
          :item="item"
          :base-path="item.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: "";

    position: absolute;
    top: 0;
    left: 0;

    width: 2px;
    height: 100%;

    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - var(--v3-header-height));
  }
}

.el-scrollbar {
  height: 100%;

  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;

    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}

.el-menu {
  width: 100% !important;
  min-height: 100%;
  border: none;
}

:deep(.el-menu-item), :deep(.el-sub-menu__title), :deep(.el-sub-menu .el-menu-item) {
  display: block;
  height: var(--v3-sidebar-menu-item-height);
  line-height: var(--v3-sidebar-menu-item-height);

  &.is-active, &:hover {
    background-color: var(--v3-sidebar-menu-hover-bg-color);
  }

  * {
    vertical-align: middle;
  }
}

:deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
}

.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        @include tip-line;

        color: var(--v3-sidebar-menu-active-text-color) !important;
      }
    }
  }
}
</style>
