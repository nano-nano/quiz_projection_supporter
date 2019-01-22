import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

// bootstrapを使えるようにimportする
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-honoka/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
