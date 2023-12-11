import type { ILayoutSettings } from '@/config/layout'

export const useSettingsStore = defineStore('settings', () => {
  const settings = reactive<ILayoutSettings>({
    showSettings: false,
    showTagsView: true,
    fixedHeader: true,
    showSidebarLogo: true,
    showNotify: false,
    showThemeSwitch: false,
    showScreenfull: false,
  })

  return {
    settings,
  }
}, {
  persist: true,
})
