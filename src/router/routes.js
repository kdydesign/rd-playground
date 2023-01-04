import { pagesList } from './pages'

function load(component) {
  return pagesList[`../views/${component}.vue`]
}

function component(path) {
  return {
    path: '/' + path.slice(9, path.length - 4),
    component: pagesList[path]
  }
}

const routes = [{ path: '/', component: load('LoginForm') }]

for (const key in pagesList) {
  routes.push(component(key))
}

export default routes
