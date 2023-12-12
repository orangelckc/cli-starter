export const useAppStore = defineStore('app', () => {
  const appName = ref('uniapp-kc-starter')

  return {
    appName,
  }
}, {
  unistorage: {
    paths: ['appName'],
  },
})
