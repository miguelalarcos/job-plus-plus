//import dotenv from 'dotenv'
//dotenv.config({path: '/home/casa/dev/vue-projects/programming-jobs/..env'})
//console.log('base url==>', process.env)

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import BootstrapVue from 'bootstrap-vue'
import VueRx from 'vue-rx'

Vue.use(VueRx)
Vue.use(BootstrapVue)

import '../public/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
