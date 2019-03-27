import Vue from 'vue'

import App from './App'
import router from './router'

// bootstrap-vueを使えるようにimportする
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-honoka/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
