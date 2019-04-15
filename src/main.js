// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import global from './global'
Vue.use(global)

import lib from './lib'
Vue.use(lib)

import api from './api'
Vue.use(api)

import "./global/css/common.css"

import constCom from './global/const'
Vue.prototype.constCom = constCom;

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: global.router,
  components: { App },
  template: '<App/>'
})
