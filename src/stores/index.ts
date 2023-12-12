export const useAppStore = defineStore(
  'app',
  () => {
    const appName = ref('kc-app')
    return {
      appName,
    }
  },
  {
    persist: {
      paths: ['appName'],
    },
  },
)
