export const useAppStore = defineStore('app', () => {
  const appName = ref('Vite App')

  return {
    appName,
  }
}, {
  persist: {
    paths: ['appName'],
  },
})
