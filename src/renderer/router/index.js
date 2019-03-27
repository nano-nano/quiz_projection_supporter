import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // メイン画面
    {
      path: '/',
      name: 'main-screen',
      component: require('@/components/MainScreen').default
    },
    // 投影画面
    {
      path: '/projection',
      name: 'projection-screen',
      component: require('@/components/ProjectionScreen').default
    },
    // 起動時のリダイレクト設定
    // これにより、起動時にメイン画面が開くようになる
    {
      path: '*',
      redirect: '/'
    }
  ]
})
