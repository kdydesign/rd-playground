import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { Quasar } from 'quasar'

// import './assets/main.css'
import 'quasar/dist/quasar.css'
import 'quasar/dist/quasar.addon.css'
// import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {})

app.mount('#app')
