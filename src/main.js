import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire } from 'vuefire'

import App from './App.vue'
import router from './router'
import firebaseApp from '@/firebase/index'
import { Quasar, Notify, Loading } from 'quasar'

import './assets/main.css'

import 'quasar/dist/quasar.css'
import 'quasar/dist/quasar.addon.css'
import '@quasar/extras/material-icons/material-icons.css'

import 'animate.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, {
  firebaseApp
})
app.use(Quasar, {
  plugins: {
    Notify,
    Loading
  },
  config: {
    framework: 'all'
  }
})

app.mount('#app')
