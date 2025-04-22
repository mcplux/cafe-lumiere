import '@/assets/main.css'
import 'vue-toastification/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import { plugin, defaultConfig } from '@formkit/vue'

import App from './App.vue'
import router from './router'
import { formKitConfig } from '../formkit.config'

const app = createApp(App)

app.use(createPinia())
app.use(plugin, defaultConfig(formKitConfig))
app.use(router)
app.use(Toast)

app.mount('#app')
