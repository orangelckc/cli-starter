export const useAppStore = defineStore('app', () => {
  const counter = ref(0)
  const add = () => {
    counter.value++
  }

  const minus = () => {
    counter.value--
  }

  return {
    counter,
    add,
    minus,
  }
}, {
  persist: {
    paths: ['counter'],
  },
})
