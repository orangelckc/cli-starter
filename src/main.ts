import * as Pinia from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
import { createSSRApp } from 'vue'

import App from './App.vue'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  const store = Pinia.createPinia()
  store.use(createUnistorage())
  app.use(store)
  return {
    app,
    Pinia,
  }
}
