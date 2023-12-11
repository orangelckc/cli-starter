<script lang="ts" setup>
import { AppMain, NavigationBar, RightPanel, Settings, Sidebar, TagsView } from './components'
import useResize from './hooks/useResize'

import { DeviceType, useAppStore, useSettingsStore, useUserStore } from '@/store'

const { settings } = storeToRefs(useSettingsStore())
const { sidebar, device, closeSidebar } = useAppStore()

useResize()

// 动态控制 layout 样式
const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.opened,
    openSidebar: sidebar.opened,
    withoutAnimation: sidebar.withoutAnimation,
    mobile: device === DeviceType.Mobile,
  }
})

const { getUserInfo } = useUserStore()

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 手机端按钮 -->
    <div v-if="classObj.mobile && classObj.openSidebar" class="drawer-bg" @click="closeSidebar(false)" />

    <!-- 侧边栏 -->
    <Sidebar class="sidebar-container" />

    <div :class="{ hasTagsView: settings.showTagsView }" class="main-container">
      <!-- 头部 -->
      <div :class="{ 'fixed-header': settings.fixedHeader }">
        <!-- 导航栏 -->
        <NavigationBar />

        <!-- 标签 -->
        <TagsView v-show="settings.showTagsView" />
      </div>

      <!-- 主体 -->
      <AppMain />

      <!-- 右侧面板 -->
      <RightPanel v-if="settings.showSettings">
        <Settings />
      </RightPanel>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/mixins";

.app-wrapper {
  @include clearfix;

  position: relative;
  width: 100%;
}

.drawer-bg {
  position: absolute;
  z-index: 999;
  top: 0;

  width: 100%;
  height: 100%;

  opacity: .3;
  background-color: #000;
}

.main-container {
  position: relative;
  min-height: 100%;
  margin-left: var(--v3-sidebar-width);
  transition: margin-left .28s;
}

.sidebar-container {
  position: fixed;
  z-index: 1001;
  top: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;

  width: var(--v3-sidebar-width) !important;
  height: 100%;

  font-size: 0px;

  transition: width .28s;
}

.fixed-header {
  position: fixed;
  z-index: 9;
  top: 0;
  right: 0;

  width: calc(100% - var(--v3-sidebar-width));

  transition: width .28s;
}

.hideSidebar {
  .main-container {
    margin-left: var(--v3-sidebar-hide-width);
  }

  .sidebar-container {
    width: var(--v3-sidebar-hide-width) !important;
  }

  .fixed-header {
    width: calc(100% - var(--v3-sidebar-hide-width));
  }
}

// for mobile response 适配移动端
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    width: var(--v3-sidebar-width) !important;
    transition: transform .28s;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transform: translate3d(calc(0px - var(--v3-sidebar-width)), 0, 0);
      transition-duration: .3s;
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container, .sidebar-container {
    transition: none;
  }
}
</style>
