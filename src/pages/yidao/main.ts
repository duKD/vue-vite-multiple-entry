import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import '@/styles/global.less'
;(async () => {
  const app = createApp(App)
  //初始化 pinia
  // app.use(store);

  //初始化 router
  setupRouter(app)
  app.mount('#app')
})()
