import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'


import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'


const app = createApp(App)

// ✅ register plugins
app.use(createPinia())
app.use(router)
app.use(Vue3Toastify, {
  autoClose: 3000,
  theme: 'dark',
  position: 'top-right',
  transition: 'bounce',
})


app.mount('#app')


export { toast }
