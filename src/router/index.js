import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

Router.beforeEach((to, from) => {
  return true
})

export default Router
