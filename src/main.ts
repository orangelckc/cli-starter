import { createApp } from 'vue'

import App from './App.vue'

import 'virtual:uno.css'
import 'vue3-toastify/dist/index.css'
import '@unocss/reset/tailwind.css'

createApp(App)
  .use(createPinia())
  .mount(
    (() => {
      const app = document.createElement('div')
      document.body.append(app)
      return app
    })(),
  )
