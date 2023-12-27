import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import 'vue3-toastify/dist/index.css'

const store = createPinia().use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(store).use(router)

router.isReady().then(() => {
  app.mount('#app')
})
