import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../view/home.vue'
import { App } from 'vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../view/main.vue')
  }
]

//app router
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  //每次进入新路由 滚动条都会初始化
  scrollBehavior: () => ({ left: 0, top: 0 })
})

//init router
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
