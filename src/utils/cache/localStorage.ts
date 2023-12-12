// TODO 统一到store逻辑里
/** 统一处理 localStorage */
import type { ThemeName } from '@/hooks/useTheme'

const SYSTEM_NAME = !import.meta.env.VITE_APP_SYSTEM_NAME || 'vue-admin'

/** 缓存数据时用到的 Key */
const CacheKey = {
  SIDEBAR_STATUS: `${SYSTEM_NAME}-sidebar-status-key`,
  ACTIVE_THEME_NAME: `${SYSTEM_NAME}-active-theme-name-key`,
}

export function getActiveThemeName() {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName
}

export function setActiveThemeName(themeName: ThemeName) {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName)
}
