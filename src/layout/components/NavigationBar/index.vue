<script lang="ts" setup>
import Breadcrumb from '../Breadcrumb/index.vue'
import Hamburger from '../Hamburger/index.vue'

import Notify from '@/components/Notify/index.vue'
import Screenfull from '@/components/Screenfull/index.vue'
import ThemeSwitch from '@/components/ThemeSwitch/index.vue'
import { useAppStore, useSettingsStore, useUserStore } from '@/store'

defineOptions({
  name: 'NavigationBar',
})
const { sidebar, toggleSidebar } = useAppStore()
const { settings } = storeToRefs(useSettingsStore())
const { userInfo, logout } = useUserStore()
</script>

<template>
  <div class="navigation-bar">
    <!-- 侧边栏展开/关闭按钮 -->
    <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar(false)" />

    <!-- 面包屑 -->
    <Breadcrumb class="breadcrumb" />

    <div class="right-menu">
      <!-- 全屏按钮 -->
      <Screenfull v-if="settings.showScreenfull" class="right-menu-item" />

      <!-- 主题切换按钮 -->
      <ThemeSwitch v-if="settings.showThemeSwitch" class="right-menu-item" />

      <!-- 通知按钮 -->
      <Notify v-if="settings.showNotify" class="right-menu-item" />

      <!-- 用户头像下拉框 -->
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :src="userInfo.avatar">
            <template #default>
              <el-icon class="i-ep-avatar" :size="30" />
            </template>
          </el-avatar>
          <span>{{ userInfo.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">
              <span class="block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  overflow: hidden;
  height: var(--v3-navigationbar-height);
  background: #fff;

  .hamburger {
    cursor: pointer;

    float: left;
    display: flex;
    align-items: center;

    height: 100%;
    padding: 0 15px;
  }

  .breadcrumb {
    float: left;
    // 参考 Bootstrap 的响应式设计 WIDTH = 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }

  .right-menu {
    float: right;
    display: flex;
    align-items: center;

    height: 100%;
    margin-right: 10px;

    color: #606266;

    .right-menu-item {
      cursor: pointer;
      padding: 0 10px;

      .right-menu-avatar {
        display: flex;
        align-items: center;

        .el-avatar {
          margin-right: 10px;
        }

        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
