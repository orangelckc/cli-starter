import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import App from './App.vue'
import router from './router'

const store = createPinia().use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(store).use(router)

router.isReady().then(() => {
  app.mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')

    window.ipcRenderer.on('main-process-message', (_event, message) => {
      console.info(message)
    })
  })
})
