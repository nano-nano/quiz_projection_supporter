import Vue from 'vue'
import VueRouter from 'vue-router'
import MainScreen from '@/views/MainScreen.vue'
import ProjectionScreen from '@/views/ProjectionScreen.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main-screen',
    component: MainScreen
  },
  {
    path: '/pj',
    name: 'projection-screen',
    component: ProjectionScreen
  },
]

const router = new VueRouter({
  routes
})

export default router
