import Vue from 'vue'
import VueRouter from 'vue-router'
import MainScreen from '@/views/MainScreen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main-screen',
    component: MainScreen
  },
]

const router = new VueRouter({
  routes
})

export default router
