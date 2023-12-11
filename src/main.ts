// core
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import App from '@/App.vue'
import { loadDirectives } from '@/directives'
import router from '@/router'

// load

// css
import 'uno.css'
import '@/styles/index.scss'

const app = createApp(App)

/** 加载自定义指令 */
loadDirectives(app)

const store = createPinia().use(piniaPluginPersistedstate)

app.use(store).use(router)

router.isReady().then(() => {
  app.mount('#app')
})
