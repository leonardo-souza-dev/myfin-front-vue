import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { BootstrapVue } from 'bootstrap-vue'
import VueDatasBr from 'vue-datas-br'
import VueMsgProducer from '../node_modules/vue-msg-producer'
import Storage from 'vue-web-storage'

import { routes } from './routes'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.use(VueDatasBr)
Vue.use(VueMsgProducer)
//Vue.use(Storage)

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})